function drawTarget(doc, x, y, zoom = 1) {
  const diameters = [2, 7.5, 13.5, 21, 29, 37.5];
  const zoomed = diameters.map((d) => d * zoom);
  doc.setFillColor("#aaaaaa");
  doc.setDrawColor("#000000");
  doc.circle(x, y, zoomed[4] / 2, "DF");
  doc.setFillColor("#ffffff");
  doc.circle(x, y, zoomed[3] / 2, "DF");
  const [diameter] = zoomed.slice(-1)
  doc.line(x - diameter / 2, y, x + diameter / 2, y, "S");
  doc.line(x, y - diameter / 2, x, y + diameter / 2, "S");
  zoomed.forEach((diameter, index) => {
    doc.circle(x, y, diameter / 2, "D");
  });
}

exports.drawTarget = drawTarget