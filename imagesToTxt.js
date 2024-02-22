const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'imgToTextInput');
const outputTextFile = path.join(
  __dirname,
  'imgToTextOutput',
  'extractedText.txt'
);

const outputDir = path.dirname(outputTextFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputTextFile, '');

const imageFiles = fs
  .readdirSync(inputDir)
  .filter((file) => /\.(jpe?g|png|tif?f|bmp|gif)$/i.test(file))
  .sort((a, b) => parseInt(a.match(/\d+/), 10) - parseInt(b.match(/\d+/), 10)); // Sort by number in filename

const ocrPromises = imageFiles.map((imageFile) => {
  let imagePath = path.join(inputDir, imageFile);
  return Tesseract.recognize(
    imagePath,
    'tur', // Turkish language, to add options do 'tur+eng' for example
    {
      logger: (m) => console.log(m),
    }
  )
    .then(({ data: { text } }) => {
      console.log(`OCR for ${imageFile} completed.`);
      return { imageFile, text };
    })
    .catch((error) => {
      console.error(`Failed to process image ${imageFile}`, error);
      return { imageFile, text: '' };
    });
});

Promise.all(ocrPromises).then((results) => {
  results.sort((a, b) => a.imageFile.localeCompare(b.imageFile));

  results.forEach(({ imageFile, text }) => {
    fs.appendFileSync(
      outputTextFile,
      `Text from ${imageFile}:\n${text}\n\n---\n\n`
    );
    console.log(`Text from ${imageFile} has been written to ${outputTextFile}`);
  });
});
