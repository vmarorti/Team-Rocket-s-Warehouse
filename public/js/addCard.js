const addBtn = document.getElementById('addB');
const postFormArea = document.getElementById('form');
const error = document.getElementById('error');




function addPost() {
    const postForm = document.createElement('div');
    const pokemon = document.createElement('input');
    const price = document.createElement('input');
    const condition = document.createElement('select')
    const saleOrtrade = document.createElement('select')
    const submitBtn = document.createElement('button');

    //labels and options
    const option1 = document.createElement('option');
    option1.innerHTML= 'Perfect';
    const option2 = document.createElement('option');
    option2.innerHTML= 'Great';
    const option3 = document.createElement('option');
    option3.innerHTML= 'Good';
    const option4 = document.createElement('option');
    option4.innerHTML= 'Poor';
    submitBtn.innerHTML= 'Submit';
    const pokemonLabel = document.createElement('p');
    pokemonLabel.innerHTML = 'Pokemon';
    const priceLabel = document.createElement('p');
    priceLabel.innerHTML = 'Price';
    const conditionLabel = document.createElement('p');
    conditionLabel.innerHTML = 'Condition';
    const saleortradeLabel = document.createElement('p');
    saleortradeLabel.innerHTML = 'Sale or Trade';
    const sale = document.createElement('option');
    sale.innerHTML= 'Sale';
    const trade = document.createElement('option');
    trade.innerHTML= 'Trade';
    
    postForm.classList.add('card');

    condition.append(option1);
    condition.append(option2);
    condition.append(option3);
    condition.append(option4);

    saleOrtrade.append(sale);
    saleOrtrade.append(trade);

    postForm.append(pokemonLabel);
    postForm.append(pokemon);
    postForm.append(priceLabel);
    postForm.append(price);
    postForm.append(conditionLabel);
    postForm.append(condition);
    postForm.append(saleortradeLabel);
    postForm.append(saleOrtrade);
    postForm.append(submitBtn);

    postFormArea.append(postForm);


    
   

    submitBtn.addEventListener('click', async() => {
        const pokemonInfo = await (await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=1&q=name:${pokemon.value.toLowerCase()}`)).json()
        
        const response = await fetch('/api/post/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pokemon: pokemon.value.toLowerCase(),
                pokemon_image: pokemonInfo.data[0].images.small,
                price: parseInt(price.value),
                condition: condition.value,
                table: saleOrtrade.value
            })
        });
        if(response.ok){
            document.location.reload();
        }else{
            error.innerHTML ='';
            error.append('something went wrong :(');
        }
    })
        

}

addBtn.addEventListener('click', addPost);