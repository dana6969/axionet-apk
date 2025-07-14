export function interpretEmotion(input) { if (!input) return "neutral"; const map = { "fear": "⚠️", "joy": "✨", "anger": "🔥", "sadness": "💧", "love": "❤️" }; return map[input.toLowerCase()] || "🌀"; }
