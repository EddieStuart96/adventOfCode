const fs = require("fs");

fs.readFile("Input.txt", (err, data) => {
  if (err) throw err;
  const inputs = data.toString().split("\n");
  let total = 0;
  const validDigits = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  inputs.forEach((input) => {
    let firstNum, lastNum, textNum;
    [...input].forEach((char, index) => {
      if (!isNaN(parseInt(char))) {
        if (!firstNum) firstNum = char;
        lastNum = char;
      } else if (isNaN(parseInt(char))) {
        textNum += char;
        const textToNum = validDigits.findIndex((digit) =>
          textNum.includes(digit)
        );
        if (textToNum > -1) {
          if (!firstNum) firstNum = textToNum.toString();
          lastNum = textToNum.toString();
          textNum = textNum.slice(-1);
        }
      }
      if (index === input.length - 1 && firstNum) {
        total += lastNum
          ? parseInt(firstNum + lastNum)
          : parseInt(firstNum + firstNum);
      }
    });
  });
  console.log("total", total);
});
