from transformers import BartForConditionalGeneration, BartTokenizer
import torch
import os

class TextSummarizer:
    def __init__(self, model_name="facebook/bart-large-cnn", model_dir="saved_model"):
        self.model_path = os.path.join(model_dir, model_name)
        
        # Load tokenizer
        self.tokenizer = BartTokenizer.from_pretrained(model_name)
        
        # Check if model is already saved locally
        if os.path.exists(self.model_path):
            print("Loading model from local storage.")
            self.model = BartForConditionalGeneration.from_pretrained(self.model_path)
        else:
            print("Downloading and saving the model.")
            self.model = BartForConditionalGeneration.from_pretrained(model_name)
            self.model.save_pretrained(self.model_path)
        
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def summarize(self, text, max_length=150, min_length=50):
        inputs = self.tokenizer(text, max_length=1024, return_tensors="pt", truncation=True)
        inputs = {key: val.to(self.device) for key, val in inputs.items()}  # Move input to device

        # Generate summary with anti-repetition settings
        summary_ids = self.model.generate(
            inputs["input_ids"], 
            max_length=max_length, 
            min_length=min_length, 
            length_penalty=1.0,  # Adjusts brevity vs. verbosity
            num_beams=4,         # Beam search for diversity
            repetition_penalty=2.5,  # Penalizes repetitive phrases
            no_repeat_ngram_size=3  # Prevents repeating 3-grams
        )
        
        summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary

# Example usage
if __name__ == "__main__":
    summarizer = TextSummarizer()

    text = """
    The Amazon rainforest, often referred to as the "lungs of the planet," 
    produces 20% of the world's oxygen and is home to millions of species. 
    However, deforestation and climate change threaten its existence.
    """
    
    summary = summarizer.summarize(text)
    print("Summary:", summary)
