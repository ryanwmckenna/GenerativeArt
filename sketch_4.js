//P5 Watery Bubbles - Illetes

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
  return ({ p5, time, width, height }) => {
    p5.background("BLUE");
    p5.noStroke();
    for (let i = 0; i < 1000; i++) {
      p5.fill(p5.random(255), 255, 255, p5.random(255));
      p5.ellipse(p5.random(width), p5.random(height), p5.random(100));
    }
  };
}, settings);

function setup() {
  createCanvas(windowWidth, windowHeight);
}
