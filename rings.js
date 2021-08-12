const { jsPDF } = require("jspdf");
Math.sqr = function (x) {
  return x * x;
};
const doc = new jsPDF({ orientation: "l", unit: "mm" });
const font = "fonts/JetBrainsMono-Regular.ttf";

function drawTarget(x, y, zoom = 1) {
  const diameters = [2, 7.5, 13.5, 21, 29, 37.5];
  const zoomed = diameters.map(d => d * zoom)
  doc.setFillColor("#aaaaaa");
  doc.setTextColor("#000000");
  doc.setDrawColor("#000000");
  doc.circle(x, y, zoomed[4] / 2, "DF");
  doc.setFillColor("#ffffff");
  doc.circle(x, y, zoomed[3] / 2, "DF");

  zoomed.forEach((diameter, index) => {
    doc.circle(x, y, diameter / 2, "D");
  });
}

doc.addFont(font, "JBM", "normal");
doc.setFont("JBM");

for (let y = 0; y < 2; y++) {
  for (let x = 0; x < 2; x++) {
    drawTarget(37 + x * 47, 30 + y * 50, 0.5);
    doc.setFillColor("#000000");
    doc.setDrawColor("#000000");
    doc.rect(10 + x, 30 + y * 50 + 25, 5 * 47 + 40, 0.2, "DF");
  }
}

doc.save("rings.pdf");
