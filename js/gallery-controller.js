
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const galleryHtml = gImgs.map(img =>
        `<img src="${img.url}"
            class="gallery-img"
            data-id="${img.id}"
            onclick="onSelectImg(this)"
            alt="Meme image">`
    ).join('')

    elGallery.innerHTML = galleryHtml
}