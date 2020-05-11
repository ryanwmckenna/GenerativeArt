const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    //background
    context.fillStyle = "hsl(0, 0%, 98%)";
    context.fillRect(0, 0, width, height);
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0.8, "powderblue");
    fill.addColorStop(1, "skyblue");
    context.fillStyle = fill;
    context.fillRect(0, 0, width * 2, height * 2);

    var fibonacci = function fibonacci(result, len) {
      if (result.length >= len) {
        return result;
      }
      result.push(result[result.length - 2] + result[result.length - 1]);
      return fibonacci(result, len);
    };

    var numberInFibonacciSeq = 9;
    var petals = fibonacci([0, 1], 20)[numberInFibonacciSeq];

    drawPetals(petals);
    drawPistil();

    function drawPetals(petals) {
      var grd = context.createLinearGradient(0, 0, 100, 0);
      grd.addColorStop(0, "white");
      grd.addColorStop(1, "powderblue");

      for (let i = 0; i < petals; i++) {
        context.save();
        context.translate(width / 2, width / 2);
        context.rotate(((Math.PI * 2) / petals) * i);
        context.translate(0, random.range(-240, -180));
        context.beginPath();

        context.fillStyle = grd;
        context.ellipse(0, 0, 35, 225, 0, 0, 2 * Math.PI);
        context.fill();
        context.restore();
      }
    }

    function drawPistil() {
      for (var i = 1; i <= 200; i++) {
        var r = 14 * Math.sqrt(i);

        var angle = (Math.PI / 180) * 137.5 * i; // convert degree to radian

        var x = r * Math.cos(angle) + 540;
        var y = r * Math.sin(angle) + 540;

        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI, true);

        context.lineWidth = 2;
        context.strokeStyle = "greenyellow";
        context.stroke();

        context.fillStyle = "gold";
        context.fill();
      }
    }
  };
};

canvasSketch(sketch, settings);
