const socket = io();

// Renderiza los items recibidos con handlebars
socket.on('items', (items) => {
  fetch('/api/productos-test').then(res => {
    return res.json();
  }).then(data => {
    render('table.hbs', {items: data.concat(items)}, 'table');
  });
});

socket.on('msgs', msgs => {
  // Se le da formato a la fecha
  const dateFormat = msgs.map(msg => {
    return {
      ...msg,
      date: moment(msg.date).format('DD/MM/YYYY HH:MM:SS')
    }
  });

  render('mensajes.hbs', {msgs: dateFormat}, 'msg-center');
});

// Renderiza el template con la informacion y lo pone dentro del elemento con el id
function render(template, data, wrapperId) {
  fetch(template).then(res => {
    return res.text();
  }).then(temp => {
    let template = Handlebars.compile(temp);
    document.getElementById(wrapperId).innerHTML = template(data);
  });
}

function addItems(e) {
  const newItem = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  };

  socket.emit('new-item', newItem);
  document.getElementById('title').value = '';
  document.getElementById('price').value = '';
  document.getElementById('thumbnail').value = '';
  return false;
}

function addMsg(e) {
  const mail = document.getElementById('mail').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const edad = document.getElementById('edad').value;
  const text = document.getElementById('text').value;

  if(!mail || !text) {
    return false;
  }

  const newMsg = {
    author: {
      id: mail,
      nombre,
      apellido,
      edad
    },
    text: text
  }

  socket.emit('new-msg', newMsg);
  document.getElementById('text').value = '';

  return false;
}