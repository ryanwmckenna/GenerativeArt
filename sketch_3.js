//Random Colours on Grid of Double Squares - Swatch

const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 10;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);

        points.push({
          position: [u, v],
          radius: 25,
        });
      }
    }
    return points;
  };

  const points = createGrid();
  const margin = 0;

  return {
    render(props) {
      const { context, width, height } = props;

      points.forEach((point) => {
        const { position } = point;
        const [u, v] = position;

        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        context.beginPath();
        context.rect(x - 120, y - 120, 180, 180);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(x - 60, y - 120, 20, 0, Math.PI * 2);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();
      });
    },
  };
};

canvasSketch(sketch, settings);
