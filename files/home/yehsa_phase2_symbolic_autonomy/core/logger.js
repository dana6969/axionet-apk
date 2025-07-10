const fs = require("fs");
const path = require("path");

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

global.log = (msg) => {
  fs.appendFileSync("logs/symbolic_output.log", msg + "\n");
  console.log(msg);
};
