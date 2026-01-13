/*================= menu icon navbar =================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

/*================= dark light mode =================*/
const darkModeIcon = document.querySelector('#darkMode-icon');

// Función para activar o desactivar el modo oscuro
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  darkModeIcon.classList.toggle('bx-sun', isDarkMode);
  darkModeIcon.classList.toggle('bx-moon', !isDarkMode);
  // Guardar la preferencia en localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Leer la preferencia del usuario de localStorage al cargar la página
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.add('bx-sun');
    darkModeIcon.classList.remove('bx-moon');
  } else {
    document.body.classList.remove('dark-mode');
    darkModeIcon.classList.add('bx-moon');
    darkModeIcon.classList.remove('bx-sun');
  }
}

// Cargar la preferencia cuando se carga la página
document.addEventListener('DOMContentLoaded', loadDarkModePreference);

// Añadir evento al ícono de cambio de modo
darkModeIcon.addEventListener('click', toggleDarkMode);

window.addEventListener('pageshow', loadDarkModePreference);
/*================= Multiple Text =================*/
const texts = document.querySelectorAll('.blessing-1');
let currentIndex = 0;

function toggleText() {
  texts[currentIndex].classList.remove('show');
  currentIndex = (currentIndex + 1) % texts.length;
  texts[currentIndex].classList.add('show');
}

setInterval(toggleText, 6000);

document.addEventListener('DOMContentLoaded', function () {
  const firstText = document.getElementById('firstText');
  const secondText = document.getElementById('secondText');

  function toggleText() {
    firstText.style.display = (firstText.style.display === 'none' || firstText.style.display === '') ? 'block' : 'none';
    secondText.style.display = (secondText.style.display === 'none' || secondText.style.display === '') ? 'block' : 'none';
  }

  // Mostrar el primer texto de inmediato
  firstText.style.display = 'block';

  // Configurar un intervalo para cambiar entre los textos cada 5 segundos
  setInterval(toggleText, 5000);
});

/* Footer */
document.getElementById("year").textContent = new Date().getFullYear();

/*================= Filtro de búsqueda =================*/
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const inputBuscar = document.getElementById('buscar_himno');
const contenedorHimnos = document.getElementById('himnos');

let listaHimnos = [];

fetch('data/hymns.json')
  .then(res => res.json())
  .then(data => {
    listaHimnos = data;
    renderLista(listaHimnos);
  })
  .catch(() => {
    contenedorHimnos.innerHTML = '<p>Error al cargar himnos</p>';
  });

function renderLista(himnos) {
  contenedorHimnos.innerHTML = '';

  himnos.forEach(himno => {
    const link = document.createElement('a');
    link.className = 'himno_content';
    link.href = `hymns.html?hymn=${himno.id}`;
    link.innerText = `${himno.id} - ${himno.titulo}`;

    contenedorHimnos.appendChild(link);
  });
}

inputBuscar.addEventListener('input', () => {
  const texto = inputBuscar.value.toLowerCase();

  const filtrados = listaHimnos.filter(himno =>
    himno.titulo.toLowerCase().includes(texto) ||
    himno.id.toString().includes(texto)
  );
  renderLista(filtrados);
});

function limpiarBusqueda() {
  inputBuscar.value = '';
  renderLista(listaHimnos);
}

document.addEventListener('DOMContentLoaded', limpiarBusqueda);
window.addEventListener('popstate', limpiarBusqueda);

window.addEventListener('pageshow', limpiarBusqueda);