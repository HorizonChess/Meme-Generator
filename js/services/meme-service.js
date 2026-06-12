
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
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getImg(imgId) {
    return gImgs.find(img => img.id === imgId)
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.txt = txt
}