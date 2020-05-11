const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = random.pick(random.pick(palettes)); //"#b3cdea";
    context.fillRect(0, 0, 540, 540);
    context.fillStyle = random.pick(random.pick(palettes)); //"#dfd365";
    context.fillRect(540, 0, 540, 540);
    context.fillStyle = random.pick(random.pick(palettes)); //"#ea6e56";
    context.fillRect(0, 540, 540, 540);
    context.fillStyle = random.pick(random.pick(palettes)); //"#f5c67f";
    context.fillRect(540, 540, 540, 540);

    //Triangle
    context.beginPath();
    context.moveTo(540, 540);
    context.lineTo(0, 540);
    context.lineTo(0, 0);
    context.fillStyle = "#5bc0ba";
    context.fill();

    //Arc
    context.rotate((Math.PI / 180) * 90);
    context.beginPath();
    context.arc(810, -1080, 270, 0, Math.PI);
    context.fillStyle = random.pick(random.pick(palettes)); //"#be5ab8";
    context.fill();
    context.rotate((Math.PI / 180) * -90);

    //Square
    context.fillStyle = random.pick(random.pick(palettes)); //"#efb6d4";
    context.fillRect(135, 405 + 270, 270, 270);

    //Heart
    context.transform(4, 0, 0, 4, 510, 0);
    context.beginPath();
    context.moveTo(80, 40);
    context.bezierCurveTo(75, 37, 70, 25, 50, 25);
    context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    context.bezierCurveTo(20, 80, 40, 102, 75, 120);
    context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    context.bezierCurveTo(85, 25, 75, 37, 75, 40);

    context.fillStyle = random.pick(random.pick(palettes)); //"#f1ac7a";
    context.fill();
  };
};

canvasSketch(sketch, settings); // Start the sketch
