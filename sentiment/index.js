const natural = require("natural");

// Sentiment analyzer using the natural npm package
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

function analyzeSentiment(text) {
return analyzer.getSentiment(
text
.toLowerCase()
.split(/\s+/)
);
}

module.exports = { analyzeSentiment };
