
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
    // console.log('renderMeme called')
    // console.log('gMeme:', gMeme)
    // console.log('gElCanvas:', gElCanvas)
    // console.log('gCtx:', gCtx)

    const img = getImg(gMeme.selectedImgId)
    // console.log('img:', img)
    const elImage = new Image()

    elImage.onload = () => {
        // console.log('image loaded')
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)

        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        gCtx.font = `${selectedLine.size}px Arial`
        gCtx.fillStyle = selectedLine.color
        gCtx.fillText(selectedLine.txt, 50, 50)
    }

    // elImage.onerror = () => {
    //     console.error('Failed to load image:', img.url)
    // }

    elImage.src = img.url
    // console.log('image src set to:', img.url)
}

function onTextInputChange(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    renderMeme()
}