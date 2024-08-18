const acceptBtn = document.getElementById('accept');
const denyBtn = document.getElementById('deny');

async function accept(event) {
    const response = await fetch('/api/fortrade/status',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            trade: true,
            tradeid: event.target.parentElement.dataset.tradeid
        })
    });
    if(response.ok){
        document.location.reload();
    }
}
async function deny(event) {
    const response = await fetch('/api/fortrade/status',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            trade: true,
            tradeid: event.target.parentElement.dataset.tradeid
        })
    });
    if(response.ok){
        document.location.reload();
    }
}

acceptBtn.addEventListener('click', accept);
denyBtn.addEventListener('click', deny);