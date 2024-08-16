const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const messages1 = document.getElementById('errors1');
const messages2 = document.getElementById('errors2');

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    if(email && password){
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        if(response.ok){
            document.location.replace('/');
        }else{
            messages1.innerHTML ='';
            messages1.innerHTML ='email or password is wrong'
        }


    }else{
        messages1.innerHTML ='';
        messages1.innerHTML ='email or password is wrong'
    }
}
async function signup(event) {
    event.preventDefault();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const username = document.getElementById('username-signup').value.trim();
    if(email && password && username){
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
        if(response.ok){
            document.location.replace('/');
        }else{
            messages2.innerHTML ='';
            messages2.innerHTML ='an account with an email already exists or password is too short'
        }


    }else{
        messages2.innerHTML ='';
        messages2.innerHTML ='make sure everything is filled out'
    }
}


loginBtn.addEventListener('click',login);
signupBtn.addEventListener('click', signup);