# PDF and Image OCR Converter

## What It Does

This project comprises two main scripts that serve the purpose of Optical Character Recognition (OCR) to convert text from images and PDF files into editable text files.

- `imagestotxt.js`: This script reads image files from a specified input directory, performs OCR to extract text, and writes the text into an output directory as text files.

- `ocrScript.js`: This script converts PDF documents into image files, performs OCR on these images, and outputs the extracted text into text files.

The OCR process is powered by Tesseract.js, which is an open-source OCR engine.

## How to Set It Up

### Prerequisites

- Node.js must be installed on your system.
- The `tesseract.js` and `pdf-poppler` libraries must be installed via npm.
- The directories for input and output must exist or will be created by the scripts.

### Installation

1. Clone the repository or download the scripts to your local machine.
2. Navigate to the project's root directory in your terminal.
3. Run `npm install` to install the dependencies.

## How to Use It

### Using `imagestotxt.js`

1. Place the image files you want to OCR into the `imgToTextInput` directory.
2. Run the script using the command `node imagestotxt.js`.
3. The script will process all images in the input directory and output the extracted text files into the `imgToTextOutput` directory.

### Using `ocrScript.js`

1. Place the PDF files you want to OCR into the `pdfToTextInput` directory.
2. Run the script using the command `node ocrScript.js`.
3. The script will convert PDFs to images, perform OCR, and then output the extracted text files into the `pdfToTextOutput` directory.

## Language Support

The OCR process supports multiple languages. To use a specific language, you must download the corresponding `.traineddata` file from the Tesseract tessdata repository.

### Adding Language Support

1. Visit the [tesseract-ocr tessdata repository](https://github.com/tesseract-ocr/tessdata).
2. Download the `.traineddata` file for the language you wish to use. For example, for English, download `eng.traineddata`; for Turkish, download `tur.traineddata`.
3. Place the downloaded `.traineddata` file(s) in the `tessdata` directory within your Tesseract installation path.

### Specifying the Language in Scripts

- In `imagestotxt.js` and `ocrScript.js`, set the language option in the `Tesseract.recognize` function call to the language prefix of your `.traineddata` file. For example, use `'eng'` for English and `'tur'` for Turkish.

## Notes

- The output text files are named after the input image or PDF file, preserving a logical and traceable naming convention.
- Both scripts provide console logs for tracking the process and errors, if any occur.
- Ensure that the language prefix you use matches the filename of the `.traineddata` file.
- If you need to OCR text in multiple languages simultaneously, Tesseract allows you to specify multiple languages by joining their prefixes with a plus sign, like `'eng+tur'`.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.
