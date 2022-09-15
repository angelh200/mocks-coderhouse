process.on('message', cant => {
    let randArray = [];
    for (let i = 0; i < cant; i++) {
        let rand = Math.floor(Math.random() * 1000 + 1);
        randArray.push(rand);
    }

    const result = {};
    randArray.forEach(el => {
        if(!result[el]) {
            result[el] = 1;
        } else {
            result[el]++;
        }
    });

    process.send(result);
});