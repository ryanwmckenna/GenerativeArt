const canvasSketch = require("canvas-sketch");
const _ = require("lodash");
const p5 = require("p5");

const preload = (p5) => {
  // Can p5.loadImage() here and so forth
};

const settings = {
  dimensions: [1080, 1080],
  p5: { p5, preload },
};

// Artwork function
const sketch = () => {
  return ({ p5, width, height }) => {
    const hexToRgb = (hex) =>
      hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));

    const colors = `#708FA3
  #486F88
  #29526D
  #123852
  #032236
  #FFC0AA
  #D4856A
  #AA5639
  #803015
  #551600
  #FFE9AA
  #D4B96A
  #AA8C39
  #806415
  #553F00`
      .split("\n")
      .map((hex) => hexToRgb(hex));

    const generate = (x, y) => {
      p5.translate(x, y);
      const borderColors = _.sampleSize(colors, 2);
      const cellCount = 6;
      const cellSide = 1080;
      const startPoint = -(cellSide * (cellCount - 1)) / 2;
      for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
          x = startPoint + colIndex * cellSide;
          y = startPoint + rowIndex * cellSide;

          element(x, y, borderColors);
        }
      }
    };

    p5.keyReleased = () => {
      if (p5.key === "g") generate();
    };

    const element = (x, y, borderColors) => {
      const context = p5.drawingContext;
      const squareSideDotsCount = 30;

      p5.noStroke();

      const squareVertices = [];
      let startAngle = 45;
      for (let i = 0; i < 4; i += 1) {
        squareVertices.push({
          x: 400 * p5.cos(startAngle),
          y: 400 * p5.sin(startAngle),
        });
        startAngle += 360 / 4;
      }

      const square = [];
      for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < squareSideDotsCount; j += 1) {
          const x = p5.lerp(
            squareVertices[i].x,
            squareVertices[(i + 1) % squareVertices.length].x,
            j / squareSideDotsCount
          );
          const y = p5.lerp(
            squareVertices[i].y,
            squareVertices[(i + 1) % squareVertices.length].y,
            j / squareSideDotsCount
          );
          square.push({ x, y });
        }
      }

      p5.push();
      p5.translate(x, y);
      for (let i = 0; i < square.length; i += 1) {
        p5.push();
        p5.noStroke();
        if (i % 2 === 0) {
          p5.fill(borderColors[0]);
        } else {
          p5.fill(borderColors[1]);
        }
        p5.beginShape();
        p5.vertex(square[i].x, square[i].y);
        p5.vertex(0, 0);
        p5.vertex(
          square[(i + 1) % square.length].x,
          square[(i + 1) % square.length].y
        );
        p5.endShape(p5.CLOSE);
        p5.pop();
      }

      const innerRectSide = 540;
      const cellCount = 12;
      const grid = [];
      const cellSide = innerRectSide / cellCount;
      const startPoint = -(cellSide * (cellCount - 1)) / 2;
      for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
          grid.push({
            x: startPoint + colIndex * cellSide,
            y: startPoint + rowIndex * cellSide,
          });
        }
      }

      for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
          const x = grid[rowIndex * cellCount + colIndex].x;
          const y = grid[rowIndex * cellCount + colIndex].y;
          const halfWidth = cellSide / 2;

          p5.push();
          p5.fill(255);
          p5.rect(x, y, cellSide, cellSide);
          p5.pop();

          if (rowIndex % 2 === 1 && colIndex % 2 === 1) {
            const r = p5.random(10);

            p5.push();
            p5.fill(_.sample(colors));
            p5.rect(x, y, cellSide, cellSide);
            p5.pop();

            if (p5.random(1) > 0.5) {
              p5.push();
              p5.fill(_.sample(colors.map((c) => `rgba(98,96,230, 0.4)`)));
              p5.fill(_.sample(colors));
              p5.rect(x + r, y + r, 25, 25);
              p5.pop();
            }

            p5.push();
            p5.fill(_.sample(colors));
            p5.rect(x, y, 25, 25);
            p5.pop();

            p5.push();
            p5.fill(_.sample(colors));
            p5.rect(x, y, 2, 2);
            p5.pop();
          } else {
            const r = p5.random(7);
            p5.noStroke();
            p5.push();
            const gradientColors = _.sampleSize(
              colors.map((c) => `rgba(240,56,75, 0.2)`),
              2
            );
            makeLinearGradient(
              context,
              x - halfWidth,
              y - halfWidth,
              x + halfWidth,
              y - halfWidth,
              [0, 1],
              gradientColors
            );
            p5.triangle(
              x - halfWidth,
              y - halfWidth,
              x + halfWidth,
              y - halfWidth,
              x + halfWidth,
              y + halfWidth
            );
            p5.pop();

            p5.push();
            p5.fill(_.sample(colors.map((c) => `rgba(240,56,75, 0.1)`)));
            p5.triangle(
              x - halfWidth,
              y - halfWidth,
              x - halfWidth,
              y + halfWidth,
              x + halfWidth,
              y + halfWidth
            );
            p5.pop();

            if (p5.random(1) > 0.6) {
              p5.push();
              p5.strokeWeight(2);
              p5.stroke(_.sample(colors));
              p5.line(x - halfWidth, y, x + halfWidth, y);
              p5.pop();
            }

            if (p5.random(1) > 0.7) {
              p5.push();
              p5.strokeWeight(2);
              p5.stroke(_.sample(colors));
              p5.line(x, y - halfWidth, x, y + halfWidth);
              p5.pop();
            }

            if (p5.random(1) > 0.8) {
              p5.push();
              p5.fill(_.sample(colors));
              p5.circle(x, y, 30);
              p5.pop();
            }

            if (p5.random(1) > 0.4) {
              p5.push();
              p5.fill(_.sample(colors));
              p5.circle(x, y, 3);
              p5.pop();

              if (p5.random(1) > 0.3) {
                p5.push();
                p5.fill(_.sample(colors.map((c) => `rgba(100,0,200, 0.3)`)));
                p5.circle(x + r, y + r, 5);
                p5.pop();
              }
            }
          }
        }
      }

      p5.pop();
    };

    const makeLinearGradient = (
      context,
      x1,
      y1,
      x2,
      y2,
      colorStops,
      colors
    ) => {
      const gradient = context.createLinearGradient(x1, y1, x2, y2);
      colorStops.forEach((stop, i) => gradient.addColorStop(stop, colors[i]));
      context.fillStyle = gradient;
      return gradient;
    };

    function setup() {
      p5.createCanvas(width, height);
      p5.angleMode(p5.ANGLES);
      p5.rectMode(p5.CENTER);

      const x = width / 2;
      const y = height / 2;
      p5.rotate(45);
      generate(x, y);
    }

    setup();
  };
};

canvasSketch(sketch, settings);
