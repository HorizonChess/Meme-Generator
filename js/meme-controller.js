
let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}


function resizeCanvas() {
    const elContainer = document.querySelector('.editor-container')
    gElCanvas.width = elContainer.clientWidth
}

function renderMeme() {

if (!gMeme.selectedImgId) return

    const img = getImg(gMeme.selectedImgId)
    const elImage = new Image()

    elImage.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)

        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        gCtx.font = `${selectedLine.size}px Arial`
        gCtx.fillStyle = selectedLine.color
        gCtx.fillText(selectedLine.txt, 50, 50)
    }

    elImage.src = img.url
  
}

function onTextInputChange(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    renderMeme()
}