
let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    addEventListener('resize', () => {
        console.log('resizing')
        resizeCanvas()
        renderMeme()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.editor-container')
    gElCanvas.width = elContainer.clientWidth
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