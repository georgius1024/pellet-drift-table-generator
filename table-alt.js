const { jsPDF } = require("jspdf");
const { drawTarget } = require("./target");
const { drawArrow } = require("./arrow");
const { dragTable } = require("./drag");
const doc = new jsPDF({ orientation: "l", unit: "mm" });

const font = "fonts/JetBrainsMono-Regular.ttf";
doc.addFont(font, "JBM", "normal");
doc.setFont("JBM");

const baseSize = 20;
const basePairs = [
  [12, 6],
  [1, 11],
  [2, 10],
  [3, 9],
  [4, 8],
  [5, 7],
];

const alternativePairs = [
  [12, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
];

const inclination = [10, 20, 40, 60, 80];
const windage = [
  "0,3-1.5m/c",
  "1,6-3.3m/c",
  "3.4-5.4m/c",
  "5,5-7.9m/c",
  "8,0-10.7m/c",
];


function drawTable(x, y, pairs) {
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
          y + baseSize * 0.9,
          {
            align: "center",
          }
        );
        drawArrow(
          doc,
          baseOffset + (index + 0.5) * baseSize,
          y + baseSize * 0.4,
          baseSize * 0.5,
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
        baseSize * 0.5,
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
          doc.setFillColor("#333333");
          doc.circle(center.x, center.y, 4.5 * scale, "DF");
          doc.setFillColor("#ffffff");
          doc.circle(center.x, center.y, 0.5 * scale, "DF");
        });
      }
    });
  }
  
  doc.setLineWidth(0.1);
  doc.setFontSize(8);
  doc.setDrawColor("#000000");
  doc.setTextColor("#000000");
  doc.setFillColor("#ffffff");
  drawTableHeaderCol(x, y);
  drawTableHeaderRow(x, y);
  drawTableCells(x, y);
}
drawTable(20, 20, basePairs);
doc.addPage()
drawTable(20, 20, alternativePairs);
doc.save("table-alt.pdf");
