/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import express from "express"
import qr from "qr-image";
import path from "path"
import fs from "fs"


import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve all files in the current directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

inquirer
  .prompt([
    {
    	message:"Enter the URL:",
        name: "URL",
    },
  ])
  .then((answers) => {
    console.log(answers);
    const url = answers.URL;
	var qr_svg = qr.image(url);
	qr_svg.pipe(fs.createWriteStream('qr_img.png'));
	// qr_svg.pipe(require('fs').createWriteStream('qr_img.png'));

	fs.writeFile('URL.txt', url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

app.listen(3000);