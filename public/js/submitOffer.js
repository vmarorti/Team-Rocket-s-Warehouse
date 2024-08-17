const pokemon = document.getElementById('pokemon');
const submitBtn = document.getElementById('submit');
const idContainer = document.querySelector('.pokemon-card-container');

async function sendOffer() {
    console.log(idContainer)
    const response = await fetch('/api/fortrade/offer',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            pokemon: pokemon.value.toLowerCase(),
            postid: idContainer.dataset.postid
        })
    });
}

submitBtn.addEventListener('click', sendOffer);