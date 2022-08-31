setTimeout(() => {
    fetch('/api/sessions/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => window.location.replace('/'));
}, 2000);