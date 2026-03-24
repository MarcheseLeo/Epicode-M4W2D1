
//Pexels APi Key
const apiKey = 'KdB8W1kSBa67xETPBs4cR2sKhWda854mhaSwe371iGIxfCXoea43XBuk'

//Async function to get photos by query search
const getPhotos = async (search) => {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${search}`, {
            method: 'GET',
            headers: {
                "Authorization": apiKey,
            }
        })

        return response.json()
    } catch (e) {
        console.log(e)
    }
}

//Function to create Cards
const createCard = (photo) => {
    const container = document.querySelector(".card-container")

    const card = document.createElement('div')
    card.classList.add('ig-card')

    const igHeader = document.createElement('div')
    igHeader.classList.add('ig-header')
    card.appendChild(igHeader)

    const userInfo = document.createElement('div')
    userInfo.classList.add('user-info')
    igHeader.append(userInfo)

    const profileImg = document.createElement('img')
    profileImg.src = "https://via.placeholder.com/32"
    profileImg.alt = "Immagine profilo fotografo"
    profileImg.classList.add('profile-pic')
    userInfo.appendChild(profileImg)

    const name = document.createElement('span')
    name.classList.add('username')
    name.innerText = photo.author
    userInfo.appendChild(name)

    const options = document.createElement('div')
    options.classList.add('options')
    options.innerText = '•••'
    igHeader.appendChild(options)

    const igMedia = document.createElement('div')
    igMedia.classList.add('ig-media')
    card.appendChild(igMedia)

    const img = document.createElement('img')
    img.src = photo.src.tiny
    img.alt = photo.alt
    igMedia.appendChild(img)

    const igActions = document.createElement('div')
    igActions.classList.add('ig-actions')
    card.appendChild(igActions)

    const leftActions = document.createElement('div')
    leftActions.classList.add('left-actions')
    igActions.appendChild(leftActions)

    const heartSpan = document.createElement('span')
    heartSpan.classList.add('icon')
    leftActions.appendChild(heartSpan)

    const heartIcon = document.createElement('i')
    if (photo.liked)
        heartIcon.classList.add('fa-solid', 'fa-heart')
    else
        heartIcon.classList.add('fa-regular', 'fa-heart')
    heartSpan.appendChild(heartIcon)

    const rightActions = document.createElement('div')
    rightActions.classList.add('right-actions')
    igActions.appendChild(rightActions)

    const savedSpan = document.createElement('span')
    savedSpan.classList.add('icon')
    rightActions.appendChild(savedSpan)

    const savedIcon = document.createElement('i')
    savedIcon.classList.add('fa-regular', 'fa-bookmark')
    savedSpan.appendChild(savedIcon)

    const igLikes = document.createElement('div')
    igLikes.classList.add('ig-likes')
    igLikes.innerHTML = `Piace a <strong>1.234 persone</strong>`
    card.appendChild(igLikes)

    const igCaption = document.createElement('div')
    igCaption.classList.add('ig-caption')
    igCaption.innerHTML = `<strong>${photo.author}</strong> ${photo.alt} </div>`
    card.appendChild(igCaption)

    heartIcon.addEventListener('click', () => {
        switchCLass(heartIcon, 'fa-regular', 'fa-solid')
    })

    savedIcon.addEventListener('click', () => {
        switchCLass(savedIcon, 'fa-regular', 'fa-solid')
    })
    container.appendChild(card)
}

//Function to check if a button has a class, and switch it with another
const switchCLass = (el, classToCheck, change) => {
    if (el.classList.contains(classToCheck)) {
        el.classList.remove(classToCheck)
        el.classList.add(change)
    } else {
        el.classList.add(classToCheck)
        el.classList.remove(change)
    }
}

//Function to change visibility
const changeVisibility = (container, display) => {
    const block = document.querySelector(container)
    console.log(block)
    block.style.display = display

}

//Function to clear the previous research on the screen 
const clearScreen = () => {
    document.querySelector('.card-container').innerHTML = ''
}
//Event listener on the search
const search = (document.getElementById('searchBtn'))
search.addEventListener('click', async (e) => {
    const input = document.querySelector('input')

    if (input.value.length > 0) {
        getPhotos(input.value)
            .then(data => {
                const photos = data.photos.map(photo => {
                    return {
                        liked: photo.liked,
                        src: photo.src,
                        author: photo.photographer,
                        author_url: photo.photographer_url,
                        alt: photo.alt,
                    }
                })
                changeVisibility('.card-container', "grid")
                changeVisibility('form', "none")
                changeVisibility('#go-back', "block")
                photos.forEach(photo => createCard(photo))

            })
    }
})


//Event listener on go back btn
const goBack = document.getElementById('go-back')
goBack.addEventListener('click', () => {
    console.log('ciao')
    changeVisibility('.card-container', "none")
    changeVisibility('form', "block")
    changeVisibility('#go-back', "none")
    clearScreen()
})


