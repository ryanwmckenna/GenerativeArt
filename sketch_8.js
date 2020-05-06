const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    // Backgrounds
    context.fillStyle = "#fcfcfc";
    context.fillRect(0, 0, width, height);

    // Colors
    context.strokeStyle = "#0b0b0b";
    context.lineWidth = 0.5;

    for (let i = 0; i < 12; i++) {
      context.save();
      drawGlyph(100, 90 + i * 80, 40, 3);
      drawGlyph(200, 90 + i - 1 * 80, 40, 9);
      drawGlyph(210, 90 + i - 1.1 * 80, 40, 3);
      drawGlyph(220, 90 + i - 1.2 * 80, 40, 9);
      drawGlyph(230, 90 + i - 1.3 * 80, 40, 3);
      context.restore();
    }

    function drawGlyph(x, y, radius, sides) {
      context.translate(x, y);
      let circlePoints = createCirclePoints(radius, sides);
      var lines = [];

      // Create lines to points on each side and to center
      for (let i = 0; i < circlePoints.length; i++) {
        let nextPoint;
        if (i + 1 > circlePoints.length - 1) {
          nextPoint = circlePoints[0];
        } else {
          nextPoint = circlePoints[i + 1];
        }

        let line = lineBetweenPoints(circlePoints[i], nextPoint);
        lines.push(line);

        let centerLine = lineBetweenPoints(circlePoints[i], [0, 0]);
        lines.push(centerLine);
      }

      lines.forEach((line) => {
        drawLine(line, context);
      });
    }
  };
};

// Start the sketch
canvasSketch(sketch, settings);

// FUNCTIONS ********************************************

// Draw a line between two given points
function lineBetweenPoints(firstPoint, secondPoint) {
  var line = {
    start: { x: firstPoint[0], y: firstPoint[1] },
    end: { x: secondPoint[0], y: secondPoint[1] },
    visibility: Math.random() >= 0.65,
  };

  return line;
}

// Draw a line between two given points
function drawLine(line, context) {
  const { start, end, visibility } = line;

  if (visibility) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }
}

// Create an array of n points around a circle
function createCirclePoints(radius, number) {
  var points = [];
  for (let i = 0; i < number; i++) {
    // Calculate the position of each point
    // The angle is i * (360 / number)
    let angle = i * (360 / number);
    let x = radius * Math.cos((-angle * Math.PI) / 180);
    let y = radius * Math.sin((-angle * Math.PI) / 180);

    // Add point to array
    points.push([x, y]);
  }
  return points;
}
