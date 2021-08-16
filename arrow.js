Math.sqr = function (x) {
  return x * x;
};

function drawArrow(doc, x, y, size, angle) {
  doc.setLineWidth(0.6)
  const sideLineAngle = (15 * 3.14) / 180;
  const sideLineSize = size * 0.5;
  const rad = ((angle - 90) * 3.14) / 180;
  const radius = size / 2;
  const pointA = {
    x: x + radius * Math.cos(rad),
    y: y + radius * Math.sin(rad),
  };
  const pointB = {
    x: x - radius * Math.cos(rad),
    y: y - radius * Math.sin(rad),
  };
  doc.line(pointA.x, pointA.y, pointB.x, pointB.y, "S");
  const pointC = {
    x: pointA.x - sideLineSize * Math.cos(rad + sideLineAngle),
    y: pointA.y - sideLineSize * Math.sin(rad + sideLineAngle),
  };
  doc.line(pointA.x, pointA.y, pointC.x, pointC.y, "S");
  const pointD = {
    x: pointA.x - sideLineSize * Math.cos(rad - sideLineAngle),
    y: pointA.y - sideLineSize * Math.sin(rad - sideLineAngle),
  };
  doc.line(pointA.x, pointA.y, pointD.x, pointD.y, "S");
  doc.setLineWidth(0.1)
  // const saved = doc.getFontSize()
  // const char = '↑'
  // doc.setFontSize(size);
  // const {w, h} = doc.getTextDimensions(char)
  // const offs = Math.sqrt(Math.sqr(w) + Math.sqr(h)) / 2
  // const dr = Math.atan2(h, w)
  // const rad = angle * 3.14 / 180 + dr
  // const dx = offs * Math.sin(rad)
  // const dy = - offs * Math.cos(rad)
  // doc.text(char, x - dx, y - dy, {
  //   align: "left",
  //   baseline: "bottom",
  //   rotationDirection: 0,
  //   angle
  // })
  // doc.setFontSize(saved);
}

exports.drawArrow = drawArrow;
