
let gImgs = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    url: `resources/meme-imgs-square/${i + 1}.jpg`,
    keywords: ['funny', 'cat']
}))

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
        txt: `But when i do, it's cause i saw it somewhere`,
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

function setLineTxt(txt) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.txt = txt.toUpperCase()
}


function setColor(color) {
    gMeme.lines.forEach(line => line.color = color)
}

function setFontSize(size) {
    gMeme.lines.forEach(line => line.size = size)
}
