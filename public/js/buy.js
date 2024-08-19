const buyBtn = document.querySelector('.grid');

async function buy(event) {
    if(event.target.id){
        console.log(event.target.parentElement.parentElement.dataset.forsaleid)
    
    const response = await fetch('/api/forsale/buy',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            saleid: event.target.parentElement.parentElement.dataset.forsaleid
        })
    });
    if(response.ok){
        document.location.replace('/profile');
    }
}
}

buyBtn.addEventListener('click', buy);