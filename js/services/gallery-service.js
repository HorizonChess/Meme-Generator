let gImgs = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    url: `resources/meme-imgs-square/${i + 1}.jpg`,
    keywords: ['funny', 'cat']
}))

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}