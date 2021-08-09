const { jsPDF } = require("jspdf");
Math.sqr = function (x) { return x*x }
const doc = new jsPDF({orientation: 'l', unit: "mm",});

const diameters = [0.5, 5.5, 10.5, 15.5 ];
const font = "fonts/JetBrainsMono-Regular.ttf";

doc.addFont(font, "JBM", "normal");
doc.setFont("JBM");
function arrow(x, y, size, angle) {
  const saved = doc.getFontSize()
  const char = '↑'
  doc.setFontSize(size);
  const {w, h} = doc.getTextDimensions(char)
  const offs = Math.sqrt(Math.sqr(w) + Math.sqr(h)) / 2
  const dr = Math.atan2(h, w)
  const rad = angle * 3.14 / 180 + dr
  const dx = offs * Math.sin(rad)
  const dy = - offs * Math.cos(rad)
  doc.text(char, x - dx, y - dy, {
    align: "left",
    baseline: "bottom",
    rotationDirection: 0,
    angle
  })
  doc.setFontSize(saved);
}
function drawTable(x, y) {
  const size = 20;
  doc.setLineWidth(0.1);
  doc.setFontSize(8);
  doc.setDrawColor("#000000");
  doc.setTextColor("#000000");
  doc.setFillColor("#ffffff");

  for(let col = 0; col < 12 + 1; col++) {

    for(let row = 0; row < 6; row++) {
       doc.rect(x + col * size, y + row * size, size, size, 'S');
      //  const label = `${row + 1}/${col + 1}`
      //   doc.text(label, x + col * size + size/2, y + row * size + size/2, {
      //   align: "center",
      //   baseline: "middle",
      // });
      // // arrow(x + col * size + size/2, y + row * size + size/2, size, -col * 30)
      // arrow(x + col * size + size/2, y + row * size+ size/2, size, col * 30)
    }
  }
  const inclination = [10, 20, 40, 60, 80]
  for(let row = 1; row < 6; row++) {
    const label = `${inclination[row-1]}°`
     doc.text(label, x + size * 0.3, y + row * size + size * 0.3, {
     align: "center",
     baseline: "middle",
   });
   // arrow(x + col * size + size/2, y + row * size + size/2, size, -col * 30)
   arrow(x + size * 0.6, y + row * size+ size * 0.6, size, inclination[row-1] + 180)
 }
 for(let col = 1; col < 12 + 1; col++) {
  const label = `${col}ч`
  doc.text(label, x + col * size + size * 0.3, y + size * 0.3, {
  align: "center",
  baseline: "middle",
});
arrow(x + col * size + size * 0.6, y  + size * 0.6, size, col * 30)
 }


}
drawTable(20, 20)
doc.save("t1.pdf");
// function drawTarget(x, y) {
//   doc.setLineWidth(0.1);

//   doc.setFontSize(4);

//   doc.setFillColor("#000000");
//   doc.circle(x, y, bullsEye / 2, "F");

//   doc.setFillColor("#ffffff");
//   doc.circle(x, y, diameters[0] / 2, "F");

//   diameters.forEach((diameter, index) => {
//     if (index < 7) {
//       doc.setFillColor("#ffffff");
//       doc.setTextColor("#ffffff");
//       doc.setDrawColor("#ffffff");
//     } else {
//       doc.setFillColor("#000000");
//       doc.setTextColor("#000000");
//       doc.setDrawColor("#000000");
//     }
//     doc.circle(x, y, diameter / 2, "D");
//     if (index > 1) {
//       const label = String(10 - index);
//       dx = 2.5 / 2;
//       doc.text(label, x - diameter / 2 + dx, y, {
//         align: "center",
//         baseline: "middle",
//       });
//       doc.text(label, x + diameter / 2 - dx, y, {
//         align: "center",
//         baseline: "middle",
//       });

//       doc.text(label, x, y - diameter / 2 + dx, {
//         align: "center",
//         baseline: "middle",
//       });
//       doc.text(label, x, y + diameter / 2 - dx, {
//         align: "center",
//         baseline: "middle",
//       });
//     }
//   });
// }
// for(let y = 0; y < 4; y++) {
//   for(let x = 0; x < 5; x++) {
//     drawTarget(37 + x * 47, 30 + y * 50)  
//     doc.setFillColor("#000000");
//     doc.setDrawColor("#000000");
//     doc.rect(10 + x, 30 + y * 50 + 25, 5 * 47 + 40, 0.2, 'DF')
// }
// }
// doc.save("10-m-targets.pdf");
