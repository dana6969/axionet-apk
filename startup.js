const { exec } = require('child_process');

// Run BLE handler
exec('node reactionHandler.js', (err, stdout, stderr) => {
  if (err) console.error('[Startup] BLE Handler error:', err.message);
  if (stdout) console.log('[Startup] BLE Handler:', stdout);
  if (stderr) console.error('[Startup] stderr:', stderr);
});

// Run Mesh Relay
exec('node meshRelay.js', (err, stdout, stderr) => {
  if (err) console.error('[Startup] Mesh Relay error:', err.message);
  if (stdout) console.log('[Startup] Mesh Relay:', stdout);
  if (stderr) console.error('[Startup] stderr:', stderr);
});
