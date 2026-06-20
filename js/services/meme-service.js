
let gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: `I don't always write great CSS`,
            size: 22,
            color: 'white',
            x: null,
            y: null
        }
    ]

}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setMeme(meme) {
    // deep copy so editing the loaded meme won't mutate the stored one
    gMeme = JSON.parse(JSON.stringify(meme))
}

function addLine() {
    const line = {
        txt: ``,
        size: 22,
        color: 'white',
        x: null,
        y: null
    }
    gMeme.lines.push(line)
}

function deleteLine() {
    if (gMeme.lines.length <= 1) return
    gMeme.lines.pop()
    const lastIdx = gMeme.lines.length - 1
    if (gMeme.selectedLineIdx > lastIdx) gMeme.selectedLineIdx = lastIdx
}

function moveLine(x, y) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.x = x
    line.y = y
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
