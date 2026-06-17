
let gElCanvas
let gCtx
let gImg
let gIsDragging = false
let gDragOffset = { x: 0, y: 0 }   // grab point relative to the line origin

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // passive: false so we can preventDefault the page scroll while dragging
    gElCanvas.addEventListener('touchstart', onDown, { passive: false })
    gElCanvas.addEventListener('touchmove', onMove, { passive: false })
    addEventListener('touchend', onUp)
}

// index of the topmost line under pos, or -1 (topmost first for stacked lines)
function getLineIdxAt(pos) {
    for (let idx = gMeme.lines.length - 1; idx >= 0; idx--) {
        if (isInsideBox(pos, gMeme.lines[idx].box)) return idx
    }
    return -1
}

function onDown(ev) {
    const pos = getEvPos(ev, gElCanvas)
    const idx = getLineIdxAt(pos)
    if (idx === -1) return   // nothing grabbed: let the event behave normally

    ev.preventDefault()
    setSelectedLine(idx)
    updateTextInput()
    gIsDragging = true

    const line = gMeme.lines[idx]
    const originX = line.x !== null ? line.x : line.box.x + 5
    const originY = line.y !== null ? line.y : line.box.y + line.size
    gDragOffset = { x: pos.x - originX, y: pos.y - originY }

    gElCanvas.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const pos = getEvPos(ev, gElCanvas)

    if (!gIsDragging) {
        // hover feedback: grab cursor only while over a line
        gElCanvas.style.cursor = getLineIdxAt(pos) === -1 ? 'default' : 'grab'
        return
    }

    ev.preventDefault()
    moveLine(pos.x - gDragOffset.x, pos.y - gDragOffset.y)
    renderMeme()
}

function onUp() {
    if (!gIsDragging) return
    gIsDragging = false
    gElCanvas.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.editor-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = gElCanvas.width
}

function renderMeme() {
    if (!gMeme.selectedImgId) return

    const img = getImg(gMeme.selectedImgId)
    const elImage = new Image()

    elImage.onload = () => {
        gImg = elImage
        drawMeme(elImage, true)
    }

    elImage.src = img.url
}

function drawMeme(elImage, showHighlight) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)

    gMeme.lines.forEach((line, idx) => {
        // use the dragged position if set, otherwise the index-based default
        const x = line.x !== null ? line.x : 50
        const y = line.y !== null ? line.y : 50 + idx * (gElCanvas.height / gMeme.lines.length)

        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
        const txt = line.txt.toUpperCase()
        gCtx.fillText(txt, x, y)

        // cache the rendered box (canvas space) so dragging can hit-test it
        const txtWidth = gCtx.measureText(txt).width
        line.box = { x: x - 5, y: y - line.size, width: txtWidth + 10, height: line.size + 10 }

        if (showHighlight && idx === gMeme.selectedLineIdx) {
            drawFrame(line.box)
        }
    })
}

function drawFrame(box) {
    gCtx.strokeStyle = 'gold'
    gCtx.lineWidth = 2
    gCtx.strokeRect(box.x, box.y, box.width, box.height)
}

function onTextInputChange(ev) {
    const txt = ev.target.value
    if (gCtx.measureText(txt.toUpperCase()).width > gElCanvas.width - 50) {
        ev.target.value = ev.target.value.slice(0, -1)
        return
    }
    setLineTxt(txt)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    updateTextInput()
    renderMeme()
}

// reflect the selected line's text back into the single input
function updateTextInput() {
    const elInput = document.querySelector('.text-input')
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onColorPickerChange(ev) {
    const color = ev.target.value
    setColor(color)
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    if (!gImg) return

    drawMeme(gImg, false)
    elLink.href = gElCanvas.toDataURL()
    elLink.download = 'my-img'
    drawMeme(gImg, true)
}

function onAddLine() {
    addLine()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    updateTextInput()
    renderMeme()

}

function onDeleteLine() {
    deleteLine()
    updateTextInput()
    renderMeme()
}