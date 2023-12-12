const fs = require("fs");

fs.readFile("Input.txt", (err, data) => {
  if (err) throw err;
  const inputs = data.toString().split("\n");
  let total = 0;

  inputs.forEach((input) => {
    let firstNum, lastNum;
    [...input].forEach((char, index) => {
      if (!isNaN(parseInt(char))) {
        if (!firstNum) firstNum = char;
        lastNum = char;
      }
      if (index === input.length - 1 && firstNum) {
        total += lastNum
          ? parseInt(firstNum + lastNum)
          : parseInt(firstNum + firstNum);

        console.log(total);
      }
    });
  });
});
