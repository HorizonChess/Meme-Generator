// generic, stateless helpers (no app globals)

// convert a mouse/touch event to a canvas's PIXEL coords.
// the canvas DISPLAY size (CSS) can differ from its pixel buffer, so we
// scale the pointer position by buffer/display on each axis.
function getEvPos(ev, elCanvas) {
    const rect = elCanvas.getBoundingClientRect()
    const src = ev.touches ? ev.touches[0] : ev
    const scaleX = elCanvas.width / rect.width
    const scaleY = elCanvas.height / rect.height
    return {
        x: (src.clientX - rect.left) * scaleX,
        y: (src.clientY - rect.top) * scaleY
    }
}

// is a point inside an axis-aligned box { x, y, width, height }?
function isInsideBox(pos, box) {
    if (!box) return false
    return pos.x >= box.x && pos.x <= box.x + box.width &&
        pos.y >= box.y && pos.y <= box.y + box.height
}
