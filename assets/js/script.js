
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
    return `
        <div class="ig-card">
            <div class="ig-header">
                <div class="user-info">
                    <img src="https://via.placeholder.com/32" class="profile-pic" alt="Immagine profilo fotografo">
                    <span class="username">${photo.author}</span>
                </div>
                <div class="options">•••</div>
            </div>
            <div class="ig-media">
                <img src="${photo.src.tiny}" alt="${photo.alt}">
            </div>
            <div class="ig-actions">
                <div class="left-actions">
                    <span class="icon">
                        <i class="fa-regular fa-heart"></i>
                    </span>                
                </div>
                <div class="right-actions">
                    <span class="icon">
                        <i class="fa-regular fa-bookmark"></i>
                    </span>                
                </div>
            </div>
            <div class="ig-likes">
                Piace a <strong>1.234 persone</strong>
            </div>
            <div class="ig-caption">
                <strong>${photo.author}</strong> ${photo.alt} </div>
            </div>
        </div>
    `
}

const renderCards = (str) => {
    const container = document.querySelector(".card-container")
    container.innerHTML = str
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
                const cards = []
                photos.forEach(photo => cards.push(createCard(photo)))
                const cardsStr = cards.reduce((acc, curr) => {
                    acc += curr
                    return acc
                }, '')
                renderCards(cardsStr)

                //Event listener on the card buttons 
                const cardList = document.querySelectorAll('.ig-card')
                cardList.forEach(card => {
                    card.addEventListener('click', (e) => {
                        console.log(e.target)
                        if (e.target.classList.contains('fa-heart') || e.target.classList.contains('fa-bookmark'))
                            switchCLass(e.target, 'fa-regular', 'fa-solid')
                    })
                })

            })
    } else {
        showSnackbar('Il campo input non puó essere vuoto')
    }
})

const showSnackbar = (message) => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//Event listener on go back btn
const goBack = document.getElementById('go-back')
goBack.addEventListener('click', () => {
    console.log('ciao')
    changeVisibility('.card-container', "none")
    changeVisibility('form', "block")
    changeVisibility('#go-back', "none")
    clearScreen()
})
