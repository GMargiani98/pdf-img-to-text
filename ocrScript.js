const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const { convert } = require('pdf-poppler');

const pdfInputDir = path.join(__dirname, 'pdfToTextInput');
const textOutputDir = path.join(__dirname, 'pdfToTextOutput');
const imageOutputDir = path.join(__dirname, 'imageOutput');

if (!fs.existsSync(textOutputDir)) {
  fs.mkdirSync(textOutputDir, { recursive: true });
}
if (!fs.existsSync(imageOutputDir)) {
  fs.mkdirSync(imageOutputDir, { recursive: true });
}

let opts = {
  format: 'jpeg',
  out_dir: imageOutputDir,
  out_prefix: 'page',
  page: null,
};

function performOCR(imagePath, outputTextFile) {
  Tesseract.recognize(imagePath, 'eng', { logger: (m) => console.log(m) })
    .then(({ data: { text } }) => {
      fs.appendFileSync(outputTextFile, text + '\n\n---\n\n');
      console.log(
        `Text from ${imagePath} has been written to ${outputTextFile}`
      );
    })
    .catch((error) => {
      console.error(`Failed to process image ${imagePath}`, error);
    });
}

fs.readdirSync(pdfInputDir).forEach((pdfFile) => {
  if (path.extname(pdfFile).toLowerCase() === '.pdf') {
    let pdfPath = path.join(pdfInputDir, pdfFile);
    let baseName = path.basename(pdfFile, path.extname(pdfFile));

    convert(pdfPath, opts)
      .then(() => {
        console.log(`PDF ${pdfFile} pages converted to images successfully!`);
        let outputTextFile = path.join(textOutputDir, `${baseName}.txt`);
        fs.writeFileSync(outputTextFile, '');

        const imageFiles = fs
          .readdirSync(imageOutputDir)
          .filter((file) => file.startsWith(opts.out_prefix));
        imageFiles.forEach((imageFile) => {
          let imagePath = path.join(imageOutputDir, imageFile);
          performOCR(imagePath, outputTextFile);
        });
      })
      .catch((err) => {
        console.error(`Error converting PDF ${pdfFile} to images:`, err);
      });
  }
});
