const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    const fill = context.createLinearGradient(0, 0, width, height); // Gradient foreground
    fill.addColorStop(0.0, "red");
    fill.addColorStop(0.3, "orange");
    fill.addColorStop(0.5, "yellow");
    fill.addColorStop(0.7, "green");
    fill.addColorStop(0.8, "blue");
    fill.addColorStop(0.92, "indigo");
    fill.addColorStop(1.0, "purple");

    context.fillStyle = fill;
    context.fillRect(0, 0, 1080, 1080);

    for (var i = 0; i < 44; i++) {
      for (var j = 0; j < 44; j++) {
        context.strokeStyle = "rgba(255, 0, 255, 0.5)";
        context.beginPath();
        context.arc(2.5 + j * 25, 2.5 + i * 25, 20, 0, Math.PI * 2, true);
        context.stroke();
      }
    }

    context.lineWidth = 30;
    context.strokeStyle = "#FFFFFF"; // Wall
    context.strokeRect(270, 370, 540, 540);
    context.strokeRect(440, 610, 200, 300); // Door
    context.beginPath(); // Roof
    context.moveTo(230, 370);
    context.lineTo(540, 160);
    context.lineTo(850, 370);
    context.closePath();
    context.stroke();
  };
};

canvasSketch(sketch, settings); // Start the sketch
