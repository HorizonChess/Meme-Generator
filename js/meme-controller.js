
let gElCanvas
let gCtx

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
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)

        gMeme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt.toUpperCase(), 50, 50 + idx * 350)
        })
    }


    elImage.src = img.url

}

function onTextInputChange(ev, idx) {
    const txt = ev.target.value
    gMeme.selectedLineIdx = idx
    setLineTxt(txt)
    renderMeme()
}

function onColorPickerChange(ev) {
    const color = ev.target.value
    setColor(color)
    renderMeme()
}

function onFontSizeChange(ev) {
    const size = ev.target.value
    setFontSize(size)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-img'
}

function onAddLine() {
    let idx = gMeme.lines.length - 1
    const lineHtml = `<span>Line ${idx + 1}:</span>
     <input type="text" class="text-input"
     placeholder="Enter text here"
    oninput="onTextInputChange(event,${idx + 1})">`
    const elControls = document.querySelector('.controls-lines')
    elControls.insertAdjacentHTML('beforeend', lineHtml)

    addLine()
    renderMeme()

}