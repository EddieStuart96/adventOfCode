const fs = require("fs");

fs.readFile("Input2.txt", (err, data) => {
  if (err) throw err;
  const inputs = data.toString().split("\n");
  inputs.forEach((game, index) => {
    // console.log(game.split(":").slice(1));
    // const minusGame = game.split(":").slice(1);
    const turns = game.split(":").slice(1);
    [...turns].forEach((turn) => {
      //   console.log("turn", turn);
      const gameTurn = turn.split(";");
      //   console.log(gameTurn);

      gameTurn.forEach((colourCube) => {
        // console.log(colourCube.replace(/[^0-9]/g, ";"));
        const cubeDraw = colourCube.split(",");
        console.log(index, cubeDraw);
        cubeDraw.forEach((draw) => {
          //   console.log("draw", draw);
          if (draw.includes("red")) {
            console.log("red", draw.replace(/[^0-9]/g, ""));
          } else if (draw.includes("green")) {
            console.log("green", draw.replace(/[^0-9]/g, ""));
          } else if (draw.includes("blue")) {
            console.log("blue", draw.replace(/[^0-9]/g, ""));
          }
        });
      });
    });
  });
});

// 12 red, 13 green, 14 blue
