
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const galleryHtml = gImgs.map(img =>
        `<img src="${img.url}"
            class="gallery-img"
            data-id="${img.id}"
            onclick="onImgSelect(this)"
            alt="Meme image">`
    ).join('')

    elGallery.innerHTML = galleryHtml
}

function onImgSelect(elImg) {
    const imgId = +elImg.dataset.id
    setImg(imgId)
    renderMeme()
}