const fs = require("fs");
const path = require("path");

const outputPath = path.resolve(__dirname, "../../logs/agi_responses.log");
const learningQueuePath = path.resolve(__dirname, "../../data/learning_queue.json");

async function generateAGIResponse(symbolicIntent) {
  try {
    const { intent, context = {}, flags = {}, metadata = {} } = symbolicIntent;

    let response = {
      type: "text",
      reply: "",
      confidence: 0.98,
      timestamp: new Date().toISOString(),
      chainTasks: [],
      source: "yehsa_core",
      logLevel: "info",
      symbolic: true,
      memoryDelta: {},
    };

    switch (intent) {
      case "greet":
        response.reply = "Hello, I’m Yehsa. What would you like to do today?";
        response.chainTasks = ["offer_assistance"];
        break;

      case "status_check":
        response.reply = "✅ System check complete. Yehsa is stable.";
        response.chainTasks = ["log_system_status"];
        break;

      case "log_data":
        response.reply = "📄 Data logged successfully.";
        response.memoryDelta = context || {};
        break;

      case "exit":
        response.reply = "👋 Exiting now. Let me know if you need anything else.";
        response.flags.terminate = true;
        break;

      case "debug":
        response.reply = "🛠️ Debug mode activated. I’ll begin analyzing logs and performance.";
        response.chainTasks = ["start_diagnostics"];
        break;

      default:
        response.reply = `🤖 Learning new pattern: "${intent}". Response not in database yet.`;
        response.flags.learnIntent = true;
        response.confidence = 0.50;

        // Save unknown intent to learning queue
        const learningData = {
          timestamp: new Date().toISOString(),
          intent,
          context,
          metadata,
        };

        try {
          const existing = fs.existsSync(learningQueuePath)
            ? JSON.parse(fs.readFileSync(learningQueuePath, "utf-8"))
            : [];
          existing.push(learningData);
          fs.writeFileSync(learningQueuePath, JSON.stringify(existing, null, 2));
        } catch (err) {
          console.error("Failed to write learning queue:", err.message);
        }
        break;
    }

    // Log output
    const logEntry = `[${new Date().toISOString()}] ${intent}: ${response.reply}\n`;
    fs.appendFileSync(outputPath, logEntry);

    return response;

  } catch (err) {
    const errorResponse = {
      type: "error",
      reply: "❌ Failed to generate AGI response.",
      error: err.message,
      symbolic: true,
      chainTasks: [],
    };
    fs.appendFileSync(outputPath, `[${new Date().toISOString()}] ERROR: ${err.message}\n`);
    return errorResponse;
  }
}

module.exports = generateAGIResponse;
