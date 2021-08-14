const { jsPDF } = require("jspdf");
const { drawTarget } = require("./target");
const { drawArrow } = require("./arrow");
const { dragTable } = require("./drag");
const doc = new jsPDF({ orientation: "l", unit: "mm" });

const font = "fonts/JetBrainsMono-Regular.ttf";
doc.addFont(font, "JBM", "normal");
doc.setFont("JBM");

const baseSize = 20;
const pairs = [
  [12, 6],
  [1, 11],
  [2, 10],
  [3, 9],
  [4, 8],
  [5, 7],
];
const inclination = [10, 20, 40, 60, 80];
const windage = [
  "0,3-1.5m/c",
  "1,6-3.3m/c",
  "3.4-5.4m/c",
  "5,5-7.9m/c",
  "8,0-10.7m/c",
];

function drawTableHeaderRow(x, y) {
  doc.setFontSize(12);
  pairs.forEach((pair, index) => {
    const baseOffset = x + (index * 2 + 1) * baseSize;
    doc.setLineWidth(0.6);
    doc.rect(baseOffset, y, baseSize * 2, baseSize, "S");
    doc.setLineWidth(0.1);
    doc.rect(baseOffset, y, baseSize, baseSize, "S");
    pair.forEach((h, index) => {
      const label = `${h}ч`;
      doc.text(
        label,
        baseOffset + (index + 0.5) * baseSize,
        y + baseSize * 0.8,
        {
          align: "center",
        }
      );
      drawArrow(
        doc,
        baseOffset + (index + 0.5) * baseSize,
        y + baseSize * 0.4,
        baseSize,
        h * 30
      );
    });
  });
}
function drawTableHeaderCol(x, y) {
  doc.setFontSize(8);
  for (let row = 0; row < 5; row++) {
    const label = `${windage[row]}`;
    const baseOffset = y + (row + 1) * baseSize;
    doc.setLineWidth(0.1);
    doc.rect(x, baseOffset, baseSize, baseSize, "S");
    doc.setLineWidth(0.1);
    doc.text(label, x + baseSize / 2, baseOffset + baseSize * 0.3, {
      align: "center",
    });
    drawArrow(
      doc,
      x + baseSize / 2,
      baseOffset + baseSize * 0.7,
      baseSize,
      inclination[row] + 180
    );
  }
}

function drawTableCells(x, y) {
  for (let row = 0; row < 5; row++) {
    const label = `${windage[row]}`;
    const baseOffset = y + (row + 1) * baseSize;
    doc.setLineWidth(0.1);
    doc.rect(x + baseSize, baseOffset, baseSize * 12, baseSize, "S");
    doc.setLineWidth(0.1);
  }
  pairs.forEach((pair, index) => {
    const baseOffsetX = x + (index * 2 + 1) * baseSize;
    doc.setLineWidth(0.6);
    doc.rect(baseOffsetX, y + baseSize, baseSize * 2, baseSize * 5, "S");
    doc.setLineWidth(0.1);
    doc.rect(baseOffsetX, y + baseSize, baseSize, baseSize * 5, "S");
    for (let row = 0; row < 5; row++) {
      const baseOffsetY = y + (row + 1) * baseSize;
      
      const scale = row < 3 ? 0.4 : (row === 3 ? 0.3 : 0.2);
      drawTarget(
        doc,
        baseOffsetX + baseSize / 2,
        baseOffsetY + baseSize / 2,
        scale
      );
      drawTarget(
        doc,
        baseOffsetX + baseSize * 1.5,
        baseOffsetY + baseSize / 2,
        scale
      );
      pair.forEach((hour, index) => {
        const dragRow = dragTable[row];
        const cell = dragRow[hour - 1];
        const center = {
          x: baseOffsetX + baseSize / 2 + index * baseSize - cell.x * scale,
          y: baseOffsetY + baseSize / 2 + cell.y * scale,
        };
        const stroke = 4.5 * 0.3;
        doc.circle(center.x, center.y, 4.5 * scale, "D");
        doc.circle(center.x, center.y, 0.5 * scale, "DF");
        doc.line(
          center.x,
          center.y - stroke,
          center.x,
          center.y + stroke,
          "DF"
        );
        doc.line(
          center.x - stroke,
          center.y,
          center.x + stroke,
          center.y,
          "DF"
        );
      });
    }
  });
}

function drawTable(x, y) {
  doc.setLineWidth(0.1);
  doc.setFontSize(8);
  doc.setDrawColor("#000000");
  doc.setTextColor("#000000");
  doc.setFillColor("#ffffff");
  drawTableHeaderCol(x, y);
  drawTableHeaderRow(x, y);
  drawTableCells(x, y);
  return;

  for (let col = 0; col < 12 + 1; col++) {
    for (let row = 0; row < 6; row++) {
      doc.rect(x + col * size, y + row * size, size, size, "S");
    }
  }

  for (let col = 1; col < 12 + 1; col++) {
    for (let row = 1; row < 6; row++) {
      drawTarget(
        doc,
        x + col * size + size / 2,
        y + row * size + size / 2,
        0.3
      );
    }
  }

  for (let row = 1; row < 6; row++) {
    const label = `${inclination[row - 1]}°`;
    doc.text(label, x + size * 0.3, y + row * size + size * 0.3, {
      align: "center",
      baseline: "middle",
    });
    drawArrow(
      doc,
      x + size * 0.6,
      y + row * size + size * 0.6,
      size,
      inclination[row - 1] + 180
    );
  }
  for (let col = 1; col < 12 + 1; col++) {
    const label = `${col}ч`;
    doc.text(label, x + col * size + size * 0.3, y + size * 0.3, {
      align: "center",
      baseline: "middle",
    });
    drawArrow(doc, x + col * size + size * 0.6, y + size * 0.6, size, col * 30);
  }

  doc.setDrawColor("#333333");
  doc.setLineWidth(0.1);
  for (let col = 1; col < 12 + 1; col++) {
    for (let row = 1; row < 6; row++) {
      const dragRow = dragTable[row - 1];
      const cell = dragRow[col - 1];
      const center = {
        x: x + col * size + size / 2 - cell.x * 0.3,
        y: y + row * size + size / 2 + cell.y * 0.3,
      };
      const stroke = 4.5 * 0.3;
      doc.circle(center.x, center.y, 4.5 * 0.3, "D");
      doc.circle(center.x, center.y, 0.5 * 0.3, "DF");
      doc.line(center.x, center.y - stroke, center.x, center.y + stroke, "DF");
      doc.line(center.x - stroke, center.y, center.x + stroke, center.y, "DF");
    }
  }
}
drawTable(20, 20);
doc.save("t2.pdf");
