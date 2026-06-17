

let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `I don't always write great CSS`,
            size: 22,
            color: 'white'
        }
    ]

}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function addLine() {
    const line = {
        txt: ``,
        size: 22,
        color: 'white'
    }
    gMeme.lines.push(line)
}


function getImg(imgId) {
    return gImgs.find(img => img.id === imgId)
}


function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}

function switchLine() {
    const lastIdx = gMeme.lines.length - 1
    gMeme.selectedLineIdx = gMeme.selectedLineIdx === lastIdx ? 0 : gMeme.selectedLineIdx + 1
}

function setLineTxt(txt) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.txt = txt.toUpperCase()
}


function setColor(color) {
    gMeme.lines.forEach(line => line.color = color)
}

function setFontSize(size) {
    gMeme.lines.forEach(line => line.size = +size)
}

function changeFontSize(diff) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    const size = selectedLine.size + diff
    selectedLine.size = Math.min(42, Math.max(8, size))
}
