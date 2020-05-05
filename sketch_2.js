//Grey BG Random Turned Circles with Wedges Cut out - Quartz

const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 10;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const X = count <= 1 ? 0.5 : x / (count - 1);
        const V = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: random.pick(["#FFFFFF", "#F1F1F1"]),
          radius: random.pick([10, 20, 30]),
          rotation: random.pick([0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]),
          position: [X, V],
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 100;

  return ({ context, width, height }) => {
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0.0, "#CCCCCC");
    fill.addColorStop(1.0, "#DDDDDD");

    context.fillStyle = fill;
    context.fillRect(0, 0, 1080, 1080);

    points.forEach((data) => {
      const { color, radius, rotation, position } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.save();
      context.fillStyle = color;
      context.translate(x, y);
      context.rotate(rotation);

      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 1.5, false);
      context.lineTo(0, 0);
      context.lineTo(0 + radius, 0);
      context.fill();

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
