//Grey BG Random Turned Circles with Wedges Cut out - Quartz

const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080],
};

var niceColours = [];
for (let index = 0; index < 3; index++) {
  niceColours.push(random.pick(random.pick(palettes)));
}

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 10;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const X = count <= 1 ? 0.5 : x / (count - 1);
        const V = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: random.pick([10, 20, 30]),
          rotation: random.pick([0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]),
          position: [X, V],
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 0;

  const drawRect = (context) => {
    context.beginPath();
    context.rect(0, 0, 120, 120);
    context.fillStyle = random.pick(niceColours);
    context.fill();
  };

  const drawRectAlt = (context) => {
    context.beginPath();
    context.rect(0, 0, 120, 120);
    context.fillStyle = random.pick(niceColours);
    context.fill();
  };

  const drawTri = (context) => {
    context.rotate(rotation);
    context.beginPath();
    context.moveTo(120, 120);
    context.lineTo(0, 120);
    context.lineTo(0, 0);
    context.fillStyle = random.pick(niceColours);
    context.fill();
  };

  const drawEllipse = (context) => {
    context.beginPath();
    context.ellipse(60, 60, 60, 60, 0, 0, 2 * Math.PI);
    context.fillStyle = random.pick(niceColours);
    context.fill();
  };

  const drawDoubleEllipse = (context) => {
    context.beginPath();
    context.ellipse(30, 30, 30, 30, 0, 0, 2 * Math.PI);
    context.fillStyle = random.pick(niceColours);
    context.fill();
    context.beginPath();
    context.ellipse(90, 90, 30, 30, 0, 0, 2 * Math.PI);
    context.fillStyle = random.pick(niceColours);
    context.fill();
  };

  return ({ context, width, height }) => {
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0.0, "#fffcdb");
    fill.addColorStop(1.0, "#e3e0be");

    context.fillStyle = fill;
    context.fillRect(0, 0, width, height);

    console.log(points);
    points.forEach((data) => {
      const { rotation, position } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.save();
      context.translate(x, y);

      const randomValue = random.value();

      if (randomValue <= 0.2) {
        drawTri(context);
      } else if (randomValue >= 0.2 && randomValue <= 0.4) {
        drawRectAlt(context);
      } else if (randomValue >= 0.4 && randomValue <= 0.6) {
        drawEllipse(context);
      } else if (randomValue >= 0.6 && randomValue <= 0.8) {
        drawDoubleEllipse(context);
      } else if (randomValue >= 0.8 && randomValue <= 1) {
        drawRect(context);
      }

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
