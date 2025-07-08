import Jimp from 'jimp/es'; // Use the explicit ESM entrypoint

const fix = async () => {
  const image = await Jimp.read('./assets/icon.png');
  const resized = image.contain(1024, 1024); // Resize to square
  await resized.writeAsync('./assets/icon.png');
  console.log("✅ Icon resized to 1024x1024");
};

fix();
