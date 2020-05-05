const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#112112";
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    context.lineWidth = 38;

    var amplitude = rangeFloor(20, 30);
    var frequency = rangeFloor(30, 70);
    var colors = [
      "#FFB713",
      "#009F45",
      "#FF3A5C",
      "#4646DF",
      "#F44918",
      "#FEAC00",
      "#FF5630",
      "#396C7D",
      "#83757D",
      "#2C3F54",
      "#F0F0EC",
      "#2A2A41",
      "#766B4F",
      "#F4AAAB",
      "#CF3B45",
      "#4F94CF",
      "#E51D20",
      "#2C416E",
      "#EE751A",
      "#FECF1A",
    ];

    let x = 0;

    while (x < width + 3) {
      let color = pick(colors);
      drawSine(x, color);
      x = x + 80;
    }

    function drawSine(x, color) {
      let waveY = -10;
      context.beginPath();
      while (waveY < height + 1080) {
        // Draw a very short line to the next point output by the sine function
        let waveX = x + amplitude * Math.sin(waveY / frequency);
        context.lineTo(waveX, waveY);
        waveY++;
      }
      context.strokeStyle = color;
      context.stroke();
    }

    function rangeFloor(min, max) {
      // Return a random whole number between min and max
      return Math.floor(Math.random() * (max - min) + min);
    }

    function pick(array) {
      // Pick a random item out of an array
      if (array.length === 0) return undefined;
      return array[rangeFloor(0, array.length)];
    }
  };

  // FUNCTIONS ************************
};

canvasSketch(sketch, settings); // Start the sketch
