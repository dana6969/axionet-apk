function parse(input) {
  try {
    const text = String(input.text || input).trim().toLowerCase();

    if (text.includes("help")) return "help";
    if (text.includes("stop")) return "terminate";
    if (text.includes("start")) return "initialize";
    if (text.includes("repeat")) return "loop";
    if (text.includes("who are you")) return "identity";

    // Symbolic triggers
    if (text.includes("🌌") || text.includes("cosmos")) return "expand";
    if (text.includes("🧠") || text.includes("memory")) return "reflect";
    if (text.includes("🔒") || text.includes("lock")) return "secure";
    if (text.includes("🧿") || text.includes("vision")) return "perceive";
    if (text.includes("🔁") || text.includes("cycle")) return "loop";

    return "unknown";
  } catch (err) {
    return "parse_error";
  }
}

module.exports = { parse };
