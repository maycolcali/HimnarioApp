const contenedor = document.getElementById('category_hymn');
const selectCategorias = document.getElementById('categoryFilter');

let himnosGlobal = [];
let categoriasGlobal = {};

fetch('data/hymns.json')
    .then(res => res.json())
    .then(himnos => {
        himnosGlobal = himnos;
        categoriasGlobal = agruparPorCategorias(himnos);
        llenarSelectCategorias(categoriasGlobal);
        renderPorCategorias(categoriasGlobal);
    })
    .catch(err => {
        console.error('Error cargando hymns.json', err);
    });

function agruparPorCategorias(himnos) {
    const categoriasMap = {};

    himnos.forEach(himno => {
        let categorias = [];

        if (Array.isArray(himno.categoria)) {
            categorias = himno.categoria;
        } else if (typeof himno.categoria === 'string') {
            categorias = [himno.categoria];
        } else {
            categorias = ['SIN CATEGORÍA'];
        }

        categorias.forEach(cat => {
            if (!categoriasMap[cat]) {
                categoriasMap[cat] = [];
            }
            categoriasMap[cat].push(himno);
        });
    });

    return categoriasMap;
}

function llenarSelectCategorias(categoriasMap) {
    Object.keys(categoriasMap)
        .sort()
        .forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            selectCategorias.appendChild(option);
        });
}

function renderPorCategorias(categoriasMap, filtro = 'ALL') {
    contenedor.innerHTML = '';

    Object.keys(categoriasMap)
        .sort()
        .forEach(categoria => {
            if (filtro !== 'ALL' && categoria !== filtro) return;

            const titulo = document.createElement('h2');
            titulo.className = 'categoria_titulo';
            titulo.textContent = categoria;
            contenedor.appendChild(titulo);

            categoriasMap[categoria].forEach(himno => {
                const link = document.createElement('a');
                link.className = 'himno_content';
                link.href = `hymns.html?hymn=${himno.id}`;
                link.textContent = `${himno.id} - ${himno.titulo}`;
                contenedor.appendChild(link);
            });
        });
}

selectCategorias.addEventListener('change', e => {
    renderPorCategorias(categoriasGlobal, e.target.value);
});