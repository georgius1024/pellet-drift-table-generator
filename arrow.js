Math.sqr = function (x) { return x*x }

function drawArrow(doc, x, y, size, angle) {
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

exports.drawArrow = drawArrow