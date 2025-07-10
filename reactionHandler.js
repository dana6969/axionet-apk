const fs = require('fs');
const exec = require('child_process').exec;

setInterval(() => {
  try {
    const reactions = JSON.parse(fs.readFileSync('agi.reactions.json', 'utf8'));
    if (!Array.isArray(reactions) || reactions.length === 0) return;

    const lastEntry = reactions[reactions.length - 1].entry;
    if (lastEntry && lastEntry.msg && lastEntry.msg.includes('BLE')) {
      console.log('[Relay] BLE matched:', lastEntry.msg);
      exec('termux-toast "BLE detected"');

      // === Relay Packet Writing ===
      const outboxPath = 'mesh.outbox.json';
      let outbox = [];
      if (fs.existsSync(outboxPath)) {
        try {
          outbox = JSON.parse(fs.readFileSync(outboxPath, 'utf8'));
        } catch (e) {
          console.log('[Relay] Outbox JSON corrupted:', e.message);
        }
      }

      outbox.push({
        ts: new Date().toISOString(),
        type: 'BLE',
        msg: lastEntry.msg
      });

      fs.writeFileSync(outboxPath, JSON.stringify(outbox, null, 2));
      console.log('[Relay] Packet written to mesh.outbox.json');
    }
  } catch (err) {
    console.log('Handler error:', err.message);
  }
}, 5000);
