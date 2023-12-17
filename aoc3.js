const fs = require("fs");

const checkAdjacent = (specialCharNumbers, lineIndex, num, inputs, actual) => {
  if (specialCharNumbers[lineIndex].includes(num)) {
    return true;
  }

  if (lineIndex > 0 && specialCharNumbers[lineIndex - 1].includes(num)) {
    return true;
  }

  if (
    lineIndex < specialCharNumbers.length - 1 &&
    specialCharNumbers[lineIndex + 1].includes(num)
  ) {
    return true;
  }
  return false;
};

fs.readFile("Input3.txt", (err, data) => {
  if (err) throw err;
  let engineLine = [];
  let engineNumbers = [];
  let specialChar = [];
  let specialCharNumbers = [];
  let trailingDigits = [];
  let finalPartNumbers = [];
  const inputs = data.toString().split(/\r?\n/);

  inputs.forEach((inputLine, index) => {
    [...inputLine].forEach((char, charIndex) => {
      if (!isNaN(parseInt(char))) engineLine.push(charIndex);
      if (isNaN(parseInt(char)) && char === ".") engineLine.push(".");
      if (isNaN(parseInt(char)) && char !== ".") {
        specialChar.push(charIndex);
        engineLine.push(char);
      }
    });
    engineNumbers[index] = engineLine;
    specialCharNumbers[index] = specialChar;
    specialChar = [];
    engineLine = [];
  });

  engineNumbers.forEach((nums, lineIndex) => {
    let isPartNumber = false;

    nums.forEach((num) => {
      if (isNaN(parseInt(num)) && isPartNumber) {
        let partNumberJoined = "";
        trailingDigits.forEach((partNumIndex) => {
          partNumberJoined += inputs[lineIndex][partNumIndex];
        });
        console.log(partNumberJoined);
        finalPartNumbers.push(parseInt(partNumberJoined));
      }

      if (!isNaN(parseInt(num))) {
        trailingDigits.push(num);
      } else if (isNaN(parseInt(num))) {
        trailingDigits = [];
        isPartNumber = false;
      }
      let hasAdjacent = checkAdjacent(
        specialCharNumbers,
        lineIndex,
        num,
        inputs,
        num
      );

      if (!hasAdjacent)
        hasAdjacent = checkAdjacent(
          specialCharNumbers,
          lineIndex,
          num + 1,
          inputs,
          num
        );

      if (!hasAdjacent)
        hasAdjacent = checkAdjacent(
          specialCharNumbers,
          lineIndex,
          num - 1,
          inputs,
          num
        );

      if (hasAdjacent && !isPartNumber) isPartNumber = true;
    });
  });
  console.log(finalPartNumbers.reduce((a, b) => a + b, 0));
});
