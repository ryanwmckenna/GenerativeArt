//P5 Green Maze

const canvasSketch = require("canvas-sketch");
const p5 = require("p5");

const preload = (p5) => {
  // Can p5.loadImage() here and so forth
};

const settings = {
  dimensions: [1080, 1080],
  p5: { p5, preload },
};

canvasSketch(() => {
  return ({ p5, width, height }) => {
    p5.background(240, 240, 240);
    var step = 100;

    for (var x = 0; x < width; x = x + step) {
      for (var y = 0; y < height; y = y + step) {
        p5.stroke("#00b51a");
        p5.strokeWeight(30);
        if (p5.random() > 0.5) {
          p5.line(x, y, x + step, y + step);
        } else {
          p5.line(x + step, y, x, y + step);
        }
      }
    }
  };
}, settings);

function setup() {
  createCanvas(windowWidth, windowHeight);
}
