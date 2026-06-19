
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

function renderSavedGallery() {
    const elSaved = document.querySelector('.saved-container')
    const savedMemes = getSavedMemes()

    if (!savedMemes.length) {
        elSaved.innerHTML = `<p class="saved-empty">No saved memes yet.</p>`
        return
    }

    const savedHtml = savedMemes.map(saved =>
        `<div class="saved-item">
            <img src="${saved.dataUrl}"
                class="gallery-img"
                data-id="${saved.id}"
                onclick="onSavedMemeSelect(${saved.id})"
                alt="Saved meme">
            <button class="saved-delete" onclick="onDeleteSavedMeme(${saved.id}, event)"
                title="Delete meme">&times;</button>
        </div>`
    ).join('')

    elSaved.innerHTML = savedHtml
}

function onSavedMemeSelect(id) {
    // filled in next step
}

function onDeleteSavedMeme(id, ev) {
    // filled in next step
}

function onImgSelect(elImg) {
    const imgId = +elImg.dataset.id
    setImg(imgId)
    showView('editor')
    resizeCanvas()
    renderMeme()
}

function showView(name) {
    const elGallery = document.querySelector('.gallery-section')
    const elEditor = document.querySelector('.editor-section')
    const elSaved = document.querySelector('.saved-section')

    switch (name) {
        case 'editor':
            elGallery.classList.add('hidden')
            elSaved.classList.add('hidden')
            elEditor.classList.remove('hidden')
            break
        case 'saved':
            elGallery.classList.add('hidden')
            elEditor.classList.add('hidden')
            elSaved.classList.remove('hidden')
            renderSavedGallery()
            break
        default:
            elEditor.classList.add('hidden')
            elSaved.classList.add('hidden')
            elGallery.classList.remove('hidden')
    }

    updateActiveNav(name)
}

function updateActiveNav(name) {
    const elNavLinks = document.querySelectorAll('.nav-link')
    elNavLinks.forEach(elLink => {
        const isActive = elLink.getAttribute('onclick') === `showView('${name}')`
        elLink.classList.toggle('active', isActive)
    })
}