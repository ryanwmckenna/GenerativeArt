//Random Colours on Grid of Double Squares - Swatch

const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ canvas, update }) => {
  const art = createArt(canvas, {
    onMove: () => update(),
  });

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
      context.fillStyle = "black";
      context.fillRect(0, 0, width, height);

      points.forEach((point) => {
        const { radius, position } = point;
        const [u, v] = position;

        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);
        context.beginPath();
        context.rect(x - 120, y - 120, 180, 180);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();

        context.beginPath();
        context.rect(x - 70, y - 70, radius, radius);
        context.fillStyle = random.pick(random.pick(palettes));
        context.fill();
        context.closePath();
      });
    },
    unload() {
      mouse.dispose();
    },
  };
};

canvasSketch(sketch, settings);

function createArt(canvas, opts = {}) {
  const art = {
    moved: false,
    position: [0, 0],
    normalized: [0, 0],
    dispose,
  };

  function dispose() {
    window.removeEventListener("mousemove", move);
  }
}
