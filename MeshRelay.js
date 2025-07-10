const fs = require("fs");
const dgram = require("dgram");
const relay = dgram.createSocket("udp4");
const meshID = fs.readFileSync("./mesh.id", "utf8").trim();
const port = 4569;

relay.on("message", (msg, rinfo) => {
  try {
    const data = JSON.parse(msg.toString());
    if (data.to && data.to !== meshID) return;
    console.log(`[Axionet Relay] 📩 From: ${data.from} ➜ ${data.cmd}`);
    fs.appendFileSync("relay.log", `[${new Date().toISOString()}] ${data.from} ➜ ${data.cmd}\n`);
    if (data.cmd?.toLowerCase() === "ping") {
      const reply = JSON.stringify({ from: meshID, to: data.from, cmd: "pong" });
      relay.send(reply, 0, reply.length, rinfo.port, rinfo.address);
    }
  } catch (err) {
    console.error("[Axionet Relay] ⚠️ Invalid packet received.");
  }
});

relay.bind(port, () => {
  console.log(`[Axionet Relay] 🔁 Listening on UDP port ${port} as ${meshID}`);
});
