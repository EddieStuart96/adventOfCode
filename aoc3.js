const fs = require("fs");

fs.readFile("Input3.txt", (err, data) => {
  if (err) throw err;
  let engineLine = [];
  let engineNumbers = [];
  let specialChar = [];
  let specialCharNumbers = [];
  const inputs = data.toString().split("\n");
  //   console.log(inputs);

  //   inputs.forEach((input) => {
  //     [...input]
  //   })

  inputs.forEach((inputLine, index) => {
    // engineLine.push([...input]);
    [...inputLine].forEach((char, charIndex) => {
      if (!isNaN(parseInt(char))) engineLine.push(charIndex);
      if (isNaN(parseInt(char)) && char === ".") engineLine.push(".");
      if (isNaN(parseInt(char)) && char !== ".") specialChar.push(charIndex);
    });
    engineNumbers[index] = engineLine;
    specialCharNumbers[index] = specialChar;
    specialChar = [];
    engineLine = [];
  });
  //   console.log(engineNumbers);
  //   console.log(specialCharNumbers);

  engineNumbers.forEach((nums, lineIndex) => {
    // console.log("nums", nums, "specchar", specialCharNumbers[lineIndex]);
    nums.forEach((num) => {
      if (
        specialCharNumbers[lineIndex].includes(num) ||
        specialCharNumbers[lineIndex + 1].includes(num)
      ) {
        console.log(
          "same pos",
          inputs[lineIndex],
          specialCharNumbers[lineIndex],
          lineIndex
        );
        if (lineIndex > 0 && specialCharNumbers[lineIndex - 1].includes(num)) {
          console.log(
            "same pos",
            inputs[lineIndex],
            specialCharNumbers[lineIndex],
            lineIndex
          );
        }
      }
      if (
        specialCharNumbers[lineIndex].includes(num + 1) ||
        specialCharNumbers[lineIndex + 1].includes(num + 1)
      )
        console.log(
          "to the right",
          inputs[lineIndex],
          specialCharNumbers[lineIndex],
          lineIndex
        );
      if (
        lineIndex > 0 &&
        specialCharNumbers[lineIndex - 1].includes(num + 1)
      ) {
        console.log(
          "same pos",
          inputs[lineIndex],
          specialCharNumbers[lineIndex],
          lineIndex
        );
      }
      if (
        specialCharNumbers[lineIndex].includes(num - 1) ||
        specialCharNumbers[lineIndex + 1].includes(num - 1)
      )
        console.log(
          "to the left",
          inputs[lineIndex],
          specialCharNumbers[lineIndex],
          lineIndex
        );
      if (
        lineIndex > 0 &&
        specialCharNumbers[lineIndex - 1].includes(num - 1)
      ) {
        console.log(
          "same pos",
          inputs[lineIndex],
          specialCharNumbers[lineIndex],
          lineIndex
        );
      }
    });
  });
});
