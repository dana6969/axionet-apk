const fs = require("fs");
const sharp = require("sharp");
const appJson = require("./app.json");

async function makeSquareIcon(path) {
  const output = path.replace(".png", "_square.png");
  const meta = await sharp(path).metadata();
  const size = Math.max(meta.width, meta.height);
  await sharp(path)
    .resize(size, size, { fit: "contain", background: "#FFFFFF" })
    .toFile(output);
  return output;
}

(async () => {
  const iconPath = appJson.icon || "./assets/icon.png";
  const newIconPath = await makeSquareIcon(iconPath);
  appJson.icon = newIconPath;

  if (appJson.android?.adaptiveIcon?.foregroundImage) {
    const fg = appJson.android.adaptiveIcon.foregroundImage;
    const newFg = await makeSquareIcon(fg);
    appJson.android.adaptiveIcon.foregroundImage = newFg;
  }

  fs.writeFileSync("app.json", JSON.stringify(appJson, null, 2));
  console.log("✅ Icons fixed and app.json updated");
})();
