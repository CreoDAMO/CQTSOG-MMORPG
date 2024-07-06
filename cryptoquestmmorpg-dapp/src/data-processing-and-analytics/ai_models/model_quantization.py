import torch
from transformers import GPT2Model, GPT2Tokenizer

# Load pre-trained model and tokenizer
model = GPT2Model.from_pretrained("gpt2")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Quantize the model (example for 8-bit quantization)
model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# Example input text
text = "Hello, world!"

# Tokenize and generate outputs
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)
print(outputs)
