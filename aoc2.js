const fs = require("fs");

fs.readFile("Input2.txt", (err, data) => {
  if (err) throw err;
  let impossible = [];
  let possible = [];
  const inputs = data.toString().split("\n");

  inputs.forEach((game, index) => {
    possible.push(index + 1);
    const turns = game.split(":").slice(1);

    [...turns].forEach((turn) => {
      const gameTurn = turn.split(";");

      gameTurn.forEach((colourCube) => {
        const cubeDraw = colourCube.split(",");
        cubeDraw.forEach((draw) => {
          let red = 12,
            green = 13,
            blue = 14;
          if (draw.includes("red")) {
            if (
              red < parseInt(draw.replace(/[^0-9]/g, "")) &&
              !impossible.includes(index + 1)
            ) {
              impossible.push(index + 1);
            }
          } else if (draw.includes("green")) {
            if (
              green < parseInt(draw.replace(/[^0-9]/g, "")) &&
              !impossible.includes(index + 1)
            ) {
              impossible.push(index + 1);
            }
          } else if (draw.includes("blue")) {
            if (
              blue < parseInt(draw.replace(/[^0-9]/g, "")) &&
              !impossible.includes(index + 1)
            ) {
              impossible.push(index + 1);
            }
          }
        });
      });
    });
  });
  console.log(
    "sum of possible games",
    possible.filter((el) => !impossible.includes(el)).reduce((a, b) => a + b)
  );
});
