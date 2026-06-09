let gImgs = [{
    id: 1,
    url: 'resources/meme-imgs-square/1.jpg',
    keywords: ['funny', 'cat']
}]

let gMeme = {
    selectedImgId: 1,
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