const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(registerForm);
    let obj = {};
    data.forEach((value, key) => obj[key]=value);

    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => {
        if(data.status === 'error') {
            window.location = `/failregister?msg=${data.error}`;
            console.log(data.error);
        }else {
            window.location="/login"
            console.log(data);
        }
    });
});