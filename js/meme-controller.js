
let gElCanvas
let gCtx
let gImg

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
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
        const x = 50
        const y = 50 + idx * (gElCanvas.height / gMeme.lines.length)

        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
        const txt = line.txt.toUpperCase()
        gCtx.fillText(txt, x, y)

        if (showHighlight && idx === gMeme.selectedLineIdx) {
            drawFrame(x, y, gCtx.measureText(txt).width, line.size)
        }
    })
}

function drawFrame(x, y, txtWidth, fontSize) {
    const pad = 5
    gCtx.strokeStyle = 'gold'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x - pad, y - fontSize, txtWidth + pad * 2, fontSize + pad * 2)
}

function onTextInputChange(ev, idx) {
    const txt = ev.target.value
    if (gCtx.measureText(txt.toUpperCase()).width > gElCanvas.width - 50) {
        ev.target.value = ev.target.value.slice(0, -1)
        return
    }
    gMeme.selectedLineIdx = idx
    setLineTxt(txt)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
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
    let idx = gMeme.lines.length - 1
    const lineHtml = `<span>Line ${idx + 1}:</span>
     <input type="text" class="text-input"
     placeholder="Enter text here"
    oninput="onTextInputChange(event,${idx})">`
    const elControls = document.querySelector('.controls-lines')
    elControls.insertAdjacentHTML('beforeend', lineHtml)

    renderMeme()

}