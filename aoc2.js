const fs = require("fs");

const minCubesPossible = (minColour, draw) => {
  if (parseInt(draw.replace(/[^0-9]/g, "")) > minColour) {
    minColour = parseInt(draw.replace(/[^0-9]/g, ""));
  }
  return minColour;
};

fs.readFile("Input2.txt", (err, data) => {
  if (err) throw err;
  let sum = 0;
  const inputs = data.toString().split("\n");

  inputs.forEach((game) => {
    let minRed = 0,
      minGreen = 0,
      minBlue = 0;

    [...game.split(":").slice(1)].forEach((turn) => {
      turn.split(";").forEach((colourCube) => {
        colourCube.split(",").forEach((draw) => {
          if (draw.includes("red")) {
            minRed = minCubesPossible(minRed, draw);
          } else if (draw.includes("green")) {
            minGreen = minCubesPossible(minGreen, draw);
          } else if (draw.includes("blue")) {
            minBlue = minCubesPossible(minBlue, draw);
          }
        });
      });
    });
    sum += minRed * minBlue * minGreen;
  });
  console.log("power of minCubes", sum);
});
