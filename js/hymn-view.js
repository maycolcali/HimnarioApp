function applyHymnScale() {
    const hymnScale = parseFloat(localStorage.getItem('hymnScale')) || 1;
    document.documentElement.style.setProperty('--hymn-scale', hymnScale);
}

applyHymnScale();

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        applyHymnScale();
    }
});

window.addEventListener('pageshow', () => {
    applyHymnScale();
});

const resultContainer = document.querySelector('.hymnObtained');

const params = new URLSearchParams(window.location.search);
const hymnNumber = parseInt(params.get('hymn'), 10);

if (!hymnNumber) {
    resultContainer.innerHTML = '<p>Himno no válido</p>';
} else {
    fetch('./data/hymns.json')
        .then(res => res.json())
        .then(hymns => {
            const hymn = hymns.find(h => h.id === hymnNumber);

            if (!hymn) {
                resultContainer.innerHTML = '<p>Himno no encontrado</p>';
                return;
            }

            renderHymn(hymn);
        })
        .catch(err => {
            console.error(err);
            resultContainer.innerHTML = '<p>Error al cargar el himno</p>';
        });
}

function renderHymn(hymn) {
    resultContainer.innerHTML = '';

    const hymnTitle = document.createElement('h2');
    hymnTitle.className = 'hymnTitle';
    hymnTitle.innerText = `${hymn.id} - ${hymn.titulo}`;
    resultContainer.appendChild(hymnTitle);

    hymn.partes.forEach(parte => {
        const separator = document.createElement('span');
        separator.className = 'separators';
        separator.innerText = parte.label;
        resultContainer.appendChild(separator);

        const paragraph = document.createElement('p');
        paragraph.innerText = parte.texto;
        resultContainer.appendChild(paragraph);
    });
}