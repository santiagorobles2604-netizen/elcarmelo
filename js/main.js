// 1. Listas para guardar la información (se cargan de LocalStorage si ya existen)
let animales = JSON.parse(localStorage.getItem('animales')) || [];
let vacunas = JSON.parse(localStorage.getItem('vacunas')) || [];
let enfermedades = JSON.parse(localStorage.getItem('enfermedades')) || [];

// 2. Funciones para pintar los datos en las tablas de la pantalla
function mostrarAnimales() {
    const tabla = document.getElementById('tabla-animales');
    tabla.innerHTML = '';
    animales.forEach(ani => {
        tabla.innerHTML += `<tr><td>${ani.arete}</td><td>${ani.tipo}</td><td>${ani.raza}</td></tr>`;
    });
}

function mostrarVacunas() {
    const tabla = document.getElementById('tabla-vacunas');
    tabla.innerHTML = '';
    vacunas.forEach(vac => {
        tabla.innerHTML += `<tr><td>${vac.arete}</td><td>${vac.nombre}</td><td>${vac.fecha}</td></tr>`;
    });
}

function mostrarEnfermedades() {
    const tabla = document.getElementById('tabla-enfermedades');
    tabla.innerHTML = '';
    enfermedades.forEach(enf => {
        tabla.innerHTML += `<tr><td>${enf.arete}</td><td>${enf.nombre}</td><td>${enf.tratamiento}</td></tr>`;
    });
}

// 3. Capturar datos cuando se envía el Formulario de Animales
document.getElementById('form-animal').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevoAnimal = {
        arete: document.getElementById('arete').value,
        tipo: document.getElementById('tipo').value,
        raza: document.getElementById('raza').value
    };
    animales.push(nuevoAnimal);
    localStorage.setItem('animales', JSON.stringify(animales));
    mostrarAnimales();
    this.reset();
});

// 4. Capturar datos cuando se envía el Formulario de Vacunas
document.getElementById('form-vacuna').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevaVacuna = {
        arete: document.getElementById('vacuna-arete').value,
        nombre: document.getElementById('vacuna-nombre').value,
        fecha: document.getElementById('vacuna-fecha').value
    };
    vacunas.push(nuevaVacuna);
    localStorage.setItem('vacunas', JSON.stringify(vacunas));
    mostrarVacunas();
    this.reset();
});

// 5. Capturar datos cuando se envía el Formulario de Enfermedades
document.getElementById('form-enfermedad').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevaEnfermedad = {
        arete: document.getElementById('enf-arete').value,
        nombre: document.getElementById('enf-nombre').value,
        tratamiento: document.getElementById('enf-tratamiento').value
    };
    enfermedades.push(nuevaEnfermedad);
    localStorage.setItem('enfermedades', JSON.stringify(enfermedades));
    mostrarEnfermedades();
    this.reset();
});

// 6. Cargar todo automáticamente apenas se abra la página
mostrarAnimales();
mostrarVacunas();
mostrarEnfermedades();