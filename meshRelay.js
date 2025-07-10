const fs = require('fs');

const path = './mesh.outbox.json';

function send(packet) {
  // This is where LoRa/BLE real broadcast goes (replace with native lib if needed)
  console.log('[LoRa/BLE] Transmitting:', JSON.stringify(packet));
}

if (fs.existsSync(path)) {
  try {
    const outbox = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (Array.isArray(outbox) && outbox.length) {
      outbox.forEach((pkt, i) => {
        send(pkt);
      });

      // Clear outbox after transmission
      fs.writeFileSync(path, JSON.stringify([]));
      console.log(`[Relay] ${outbox.length} packets dispatched and outbox cleared.`);
    } else {
      console.log('[Relay] Outbox empty.');
    }
  } catch (e) {
    console.log('[Relay Error]', e.message);
  }
} else {
  console.log('[Relay] No mesh.outbox.json file found.');
}
