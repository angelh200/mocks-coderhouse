const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(loginForm);
    let obj = {};
    data.forEach((value, key) => obj[key]=value);

    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => {
        if(data.status === 'error') {
            window.location = `/faillogin?msg=${data.error}`;
        }else {
            window.location = "/";
        }
    });
});