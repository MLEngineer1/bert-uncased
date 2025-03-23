import natural from "natural";

// Function to chunk long text
function chunkText(text, chunkSize = 1000) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function for N-gram analysis (bi-grams)
function analyzeNGrams(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);
  const NGrams = natural.NGrams;
  const bigrams = NGrams.ngrams(tokens, 2);
  return bigrams;
}

// Dummy Named Entity Recognition (NER) - Replace with real logic
function performNER(text) {
  const entities = [];
  const words = text.match(/\b[A-Z][a-z]*\b/g) || [];
  words.forEach(word => {
    entities.push({ entity: word, type: "Proper Noun" });
  });
  return entities;
}

// Main analysis function
export function analyzeText(inputText) {
  if (!inputText || inputText.trim() === "") {
    return { error: "No text provided." };
  }

  const chunks = chunkText(inputText);
  const results = [];

  chunks.forEach((chunk, index) => {
    const ngrams = analyzeNGrams(chunk);
    const nerResults = performNER(chunk);
    results.push({
      chunkNumber: index + 1,
      ngrams: ngrams,
      ner: nerResults,
    });
  });

  return results;
}
