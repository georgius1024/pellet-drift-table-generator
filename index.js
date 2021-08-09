const { jsPDF } = require("jspdf");

const doc = new jsPDF({orientation: 'l'});

const bullsEye = 30.6;
const diameters = [0.5, 5.5, 10.5, 15.5, 20.5, 25.5, 30.5, 35.5, 40.5, 45.5];
const font = "fonts/JetBrainsMono-Regular.ttf";

doc.addFont(font, "JBM", "normal");
doc.setFont("JBM");

function drawTarget(x, y) {
  doc.setLineWidth(0.1);

  doc.setFontSize(4);

  doc.setFillColor("#000000");
  doc.circle(x, y, bullsEye / 2, "F");

  doc.setFillColor("#ffffff");
  doc.circle(x, y, diameters[0] / 2, "F");

  diameters.forEach((diameter, index) => {
    if (index < 7) {
      doc.setFillColor("#ffffff");
      doc.setTextColor("#ffffff");
      doc.setDrawColor("#ffffff");
    } else {
      doc.setFillColor("#000000");
      doc.setTextColor("#000000");
      doc.setDrawColor("#000000");
    }
    doc.circle(x, y, diameter / 2, "D");
    if (index > 1) {
      const label = String(10 - index);
      dx = 2.5 / 2;
      doc.text(label, x - diameter / 2 + dx, y, {
        align: "center",
        baseline: "middle",
      });
      doc.text(label, x + diameter / 2 - dx, y, {
        align: "center",
        baseline: "middle",
      });

      doc.text(label, x, y - diameter / 2 + dx, {
        align: "center",
        baseline: "middle",
      });
      doc.text(label, x, y + diameter / 2 - dx, {
        align: "center",
        baseline: "middle",
      });
    }
  });
}
for(let y = 0; y < 4; y++) {
  for(let x = 0; x < 5; x++) {
    drawTarget(37 + x * 47, 30 + y * 50)  
    doc.setFillColor("#000000");
    doc.setDrawColor("#000000");
    doc.rect(10 + x, 30 + y * 50 + 25, 5 * 47 + 40, 0.2, 'DF')
}
}
doc.save("10-m-targets.pdf");
