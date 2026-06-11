// ==========================================================================
// 1. LISTAS PARA GUARDAR LA INFORMACIÓN (Cargadas desde LocalStorage)
// ==========================================================================
let animales = JSON.parse(localStorage.getItem('animales')) || [];
let vacunas = JSON.parse(localStorage.getItem('vacunas')) || [];
let enfermedades = JSON.parse(localStorage.getItem('enfermedades')) || [];

// ==========================================================================
// 2. FUNCIONES PARA PINTAR LOS DATOS EN LAS TABLAS Y PANELES
// ==========================================================================

// PINTAR LISTA DE ANIMALES (Modificada para incluir el botón Eliminar)
function mostrarAnimales() {
    const tabla = document.getElementById('tabla-animales');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    // Usamos el índice (index) para saber exactamente cuál animal borrar después
    animales.forEach((ani, index) => {
        tabla.innerHTML += `
            <tr>
                <td><strong>${ani.arete}</strong></td>
                <td>${ani.tipo}</td>
                <td>${ani.raza || 'No especificada'}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarAnimal(${index})" style="border-radius: 8px; padding: 4px 10px;">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>`;
    });

    // Cada vez que la lista cambia, se recalculan los lotes automáticamente
    calcularLotes();
}

// NUEVA FUNCIÓN: CALCULAR LOTES Y EL CONTEO DINÁMICO
function calcularLotes() {
    const contenedor = document.getElementById('contenedor-lotes');
    if (!contenedor) return;

    // Inicializamos los contadores de cada categoría en cero
    const conteoLotes = {
        'Vacas': 0,
        'Toros': 0,
        'Terneros': 0,
        'Caballos': 0,
        'Otros': 0
    };

    // Clasificamos cada animal en su lote correspondiente
    animales.forEach(ani => {
        if (ani.tipo === 'Vaca') conteoLotes['Vacas']++;
        else if (ani.tipo === 'Toro') conteoLotes['Toros']++;
        else if (ani.tipo === 'Ternero') conteoLotes['Terneros']++;
        else if (ani.tipo === 'Caballo') conteoLotes['Caballos']++;
        else conteoLotes['Otros']++;
    });

    // Inyectamos las tarjetas visuales en la nueva pestaña del HTML
    contenedor.innerHTML = `
        <div class="col-md-4 mb-3">
            <div class="card p-3 border-start border-success border-4" style="background-color: #fafffa;">
                <h6 class="text-success fw-bold">🐄 Lote de Vacas</h6>
                <h2 class="fw-bold mt-2">${conteoLotes['Vacas']} <span style="font-size: 0.9rem;" class="text-muted">animales</span></h2>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card p-3 border-start border-primary border-4" style="background-color: #f7faff;">
                <h6 class="text-primary fw-bold">🐂 Lote de Toros</h6>
                <h2 class="fw-bold mt-2">${conteoLotes['Toros']} <span style="font-size: 0.9rem;" class="text-muted">animales</span></h2>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card p-3 border-start border-warning border-4" style="background-color: #fffdf5;">
                <h6 class="text-warning fw-bold">🌾 Lote de Terneros</h6>
                <h2 class="fw-bold mt-2">${conteoLotes['Terneros']} <span style="font-size: 0.9rem;" class="text-muted">animales</span></h2>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card p-3 border-start border-info border-4" style="background-color: #f5fcff;">
                <h6 class="text-info fw-bold">🐴 Lote de Caballos</h6>
                <h2 class="fw-bold mt-2">${conteoLotes['Caballos']} <span style="font-size: 0.9rem;" class="text-muted">animales</span></h2>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card p-3 border-start border-secondary border-4" style="background-color: #fafafa;">
                <h6 class="text-secondary fw-bold">🚜 Otros Animales</h6>
                <h2 class="fw-bold mt-2">${conteoLotes['Otros']} <span style="font-size: 0.9rem;" class="text-muted">animales</span></h2>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="card p-3 bg-success text-white">
                <h6 class="text-white-50 fw-bold">📊 TOTAL GENERAL</h6>
                <h2 class="fw-bold mt-2 text-white">${animales.length} <span style="font-size: 0.9rem;" class="text-white-50">en total</span></h2>
            </div>
        </div>
    `;
}

// PINTAR HISTORIAL DE VACUNAS
function mostrarVacunas() {
    const tabla = document.getElementById('tabla-vacunas');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    vacunas.forEach(vac => {
        tabla.innerHTML += `<tr><td>${vac.arete}</td><td>${vac.nombre}</td><td>${vac.fecha}</td></tr>`;
    });
}

// PINTAR CONTROL DE ENFERMEDADES
function mostrarEnfermedades() {
    const tabla = document.getElementById('tabla-enfermedades');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    enfermedades.forEach(enf => {
        tabla.innerHTML += `<tr><td>${enf.arete}</td><td>${enf.nombre}</td><td>${enf.tratamiento}</td></tr>`;
    });
}

// ==========================================================================
// 3. NUEVA FUNCIÓN: ELIMINAR ANIMAL
// ==========================================================================
function eliminarAnimal(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este animal de los registros?")) {
        animales.splice(index, 1); // Remueve el animal seleccionado del arreglo
        localStorage.setItem('animales', JSON.stringify(animales)); // Actualiza LocalStorage
        mostrarAnimales(); // Redibuja la tabla y recalcula los lotes automáticamente
    }
}

// ==========================================================================
// 4. CAPTURADORES DE EVENTOS (FORMULARIOS)
// ==========================================================================

// Formulario de Animales
document.getElementById('form-animal').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevoAnimal = {
        arete: document.getElementById('arete').value,
        tipo: document.getElementById('tipo').value,
        raza: document.getElementById('raza').value
    };
    animales.push(nuevoAnimal);
    localStorage.setItem('animales', JSON.stringify(animales));
    mostrarAnimales(); // Aquí ya va incluida la actualización de lotes
    this.reset();
});

// Formulario de Vacunas
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

// Formulario de Enfermedades
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

// ==========================================================================
// 5. CARGA AUTOMÁTICA AL ABRIR LA PÁGINA
// ==========================================================================
mostrarAnimales();
mostrarVacunas();
mostrarEnfermedades();