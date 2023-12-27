const fs = require("fs");

let gearRatio = [];

const checkAdjacent = (
  specialCharNumbers,
  lineIndex,
  num,
  inputs,
  trailingDigits
) => {
  if (specialCharNumbers[lineIndex].includes(num)) {
    // console.log(inputs[lineIndex][num], trailingDigits);
    gearRatio.push([lineIndex, num]);
    return lineIndex;
  }

  if (lineIndex > 0 && specialCharNumbers[lineIndex - 1].includes(num)) {
    // console.log(inputs[lineIndex - 1][num], trailingDigits);
    gearRatio.push([lineIndex - 1, num]);

    return lineIndex - 1;
  }

  if (
    lineIndex < specialCharNumbers.length - 1 &&
    specialCharNumbers[lineIndex + 1].includes(num)
  ) {
    // console.log(inputs[lineIndex + 1][num], trailingDigits);
    gearRatio.push([lineIndex + 1, num]);

    return lineIndex + 1;
  }
  return 0;
};

fs.readFile("Input3.txt", (err, data) => {
  if (err) throw err;
  let engineLine = [];
  let engineNumbers = [];
  let specialChar = [];
  let specialCharNumbers = [];
  let trailingDigits = [];
  let finalPartNumbers = [];
  let symbolFoundCount = [];

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
    let symbolFound = [];

    nums.forEach((num) => {
      if (isNaN(parseInt(num)) && isPartNumber) {
        let partNumberJoined = "";
        trailingDigits.forEach((partNumIndex) => {
          partNumberJoined += inputs[lineIndex][partNumIndex];
        });
        finalPartNumbers.push(parseInt(partNumberJoined));
      }

      if (!isNaN(parseInt(num))) {
        trailingDigits.push(num);
      } else if (isNaN(parseInt(num))) {
        isPartNumber && console.log(trailingDigits, symbolFound);
        if (isPartNumber) {
          symbolFoundCount.push(symbolFound);
        }
        trailingDigits = [];
        isPartNumber = false;
      }
      let hasAdjacent = checkAdjacent(
        specialCharNumbers,
        lineIndex,
        num,
        inputs,
        trailingDigits
      );
      if (hasAdjacent) symbolFound = [hasAdjacent, num];

      if (!hasAdjacent) {
        hasAdjacent = checkAdjacent(
          specialCharNumbers,
          lineIndex,
          num + 1,
          inputs,
          trailingDigits
        );
        if (hasAdjacent) symbolFound = [hasAdjacent, num + 1];
      }

      if (!hasAdjacent) {
        hasAdjacent = checkAdjacent(
          specialCharNumbers,
          lineIndex,
          num - 1,
          inputs,
          trailingDigits
        );
        if (hasAdjacent) symbolFound = [hasAdjacent, num - 1];
      }

      if (hasAdjacent && !isPartNumber) {
        isPartNumber = true;
      }
    });
  });
  console.log(finalPartNumbers, symbolFoundCount);
  console.log(finalPartNumbers.reduce((a, b) => a + b, 0));
});
