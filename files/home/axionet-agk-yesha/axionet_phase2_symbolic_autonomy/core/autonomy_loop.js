const fs = require('fs');
const path = require('path');
const memoryTrigger = require('../memory/events/memory_trigger.js'); 
const parser = require('../intents/parser.js'); 

// For logging purposes
const identityPath = path.resolve(__dirname, '../config/identity.json');
const logPath = path.resolve(__dirname, '../logs/output.log');

// Load identity config
let identity = {};
try {
    identity = JSON.parse(fs.readFileSync(identityPath, 'utf8'));
    console.log(`✅ [YEHSA] Identity loaded: ${identity.codename} (${identity.seed})`);
} catch (e) {
    console.error(`❌ Failed to load identity config:`, e.message);
    process.exit(1);
}

// Helper: Timestamped file + console log
const log = (msg) => {
    const fullMsg = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logPath, fullMsg);
    console.log(fullMsg.trim());
}

// Trigger symbolic autonomy
module.exports = async function run(memoryInput) {
    try {
        log(`🌐 AGI Trigger Start: ${identity.codename} | ${identity.seed}`);

        // Parse the incoming memory input (e.g., user's request)
        const parsedInput = parser.parse(memoryInput); // Assumes parser.js works as expected
        log(`💬 Parsed Input: ${JSON.stringify(parsedInput)}`);

        // Trigger memory response based on parsed input
        const memoryResponse = await memoryTrigger.handle(parsedInput); 
        log(`🧠 Memory Response: ${JSON.stringify(memoryResponse)}`);

        // Assuming this is the part where you need to call the next loop
        // Add your additional logic here to handle autonomy in symbolic systems

        log(`✅ AGI Trigger Complete for ${identity.codename}`);

    } catch (err) {
        console.error(`❌ Error: ${err.message}\n${err.stack}`);
        process.exit(1);
    }
};
