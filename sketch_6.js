const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f0efe1";
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "multiply";
    context.lineWidth = 38;

    var amplitude = rangeFloor(20, 30);
    var frequency = rangeFloor(30, 70);
    var colors = [
      "#b4a9d1",
      "#5dbeb7",
      "#e9a3b2",
      "#2789ca",
      "#ec9e2a",
      "#de5460",
      "#6672b5",
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
        let waveX = x + amplitude * Math.sin(waveY / frequency);
        context.lineTo(waveX, waveY);
        waveY++;
      }
      context.strokeStyle = color;
      context.stroke();
    }

    function rangeFloor(min, max) {
      // Return a random whole number between min and max
      return Math.floor(Math.random() * max + min);
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
