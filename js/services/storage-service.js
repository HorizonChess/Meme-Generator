// persistence for saved memes (localStorage, JSON-encoded)

const STORAGE_KEY = 'savedMemesDB'

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY) || []
}

// store a re-editable copy of the meme plus a flat thumbnail for display.
// returns the new entry's id.
function saveMeme(meme, dataUrl) {
    const savedMemes = getSavedMemes()
    const id = Date.now()
    const memeCopy = JSON.parse(JSON.stringify(meme))
    savedMemes.push({ id, meme: memeCopy, dataUrl })
    saveToStorage(STORAGE_KEY, savedMemes)
    return id
}

function removeMeme(id) {
    const savedMemes = getSavedMemes().filter(saved => saved.id !== id)
    saveToStorage(STORAGE_KEY, savedMemes)
}
