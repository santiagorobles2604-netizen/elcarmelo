// ==========================================================================
// 1. LISTAS PARA GUARDAR LA INFORMACIÓN (Cargadas desde LocalStorage)
// ==========================================================================
let animales = JSON.parse(localStorage.getItem('animales')) || [];
let vacunas = JSON.parse(localStorage.getItem('vacunas')) || [];
let enfermedades = JSON.parse(localStorage.getItem('enfermedades')) || [];

// ==========================================================================
// 2. FUNCIONES PARA PINTAR LOS DATOS EN LAS TABLAS Y PANELES
// ==========================================================================

function mostrarAnimales() {
    const tabla = document.getElementById('tabla-animales');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    animales.forEach((ani, index) => {
        tabla.innerHTML += `
            <tr>
                <td><strong>${ani.arete}</strong></td>
                <td><span class="badge bg-success bg-opacity-10 text-success px-2 py-1">${ani.tipo}</span></td>
                <td>${ani.raza || 'No especificada'}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarAnimal(${index})" style="border-radius: 8px; padding: 4px 10px;">
                        🗑️ Eliminar
                    </button>
                </td>
            </tr>`;
    });

    calcularLotes();
}

function calcularLotes() {
    const contenedor = document.getElementById('contenedor-lotes');
    if (!contenedor) return;

    const conteoLotes = {
        'Vacas': 0,
        'Toros': 0,
        'Terneros': 0,
        'Caballos': 0,
        'Otros': 0
    };

    animales.forEach(ani => {
        if (ani.tipo === 'Vaca') conteoLotes['Vacas']++;
        else if (ani.tipo === 'Toro') conteoLotes['Toros']++;
        else if (ani.tipo === 'Ternero') conteoLotes['Terneros']++;
        else if (ani.tipo === 'Caballo') conteoLotes['Caballos']++;
        else conteoLotes['Otros']++;
    });

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

function mostrarVacunas() {
    const tabla = document.getElementById('tabla-vacunas');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    vacunas.forEach(vac => {
        tabla.innerHTML += `<tr><td><span class="fw-bold text-secondary">#${vac.arete}</span></td><td>${vac.nombre}</td><td>${vac.fecha}</td></tr>`;
    });
}

function mostrarEnfermedades() {
    const tabla = document.getElementById('tabla-enfermedades');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    enfermedades.forEach(enf => {
        tabla.innerHTML += `<tr><td><span class="fw-bold text-danger">#${enf.arete}</span></td><td><span class="text-danger fw-semibold">${enf.nombre}</span></td><td>${enf.tratamiento || 'Ninguno'}</td></tr>`;
    });
}

// ==========================================================================
// 3. FUNCIÓN: ELIMINAR ANIMAL
// ==========================================================================
function eliminarAnimal(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este animal de los registros?")) {
        animales.splice(index, 1);
        localStorage.setItem('animales', JSON.stringify(animales));
        mostrarAnimales();
    }
}

// ==========================================================================
// 4. CAPTURADORES DE EVENTOS (FORMULARIOS)
// ==========================================================================

if (document.getElementById('form-animal')) {
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
}

if (document.getElementById('form-vacuna')) {
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
}

if (document.getElementById('form-enfermedad')) {
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
}

// ==========================================================================
// 5. CARGA AUTOMÁTICA AL ABRIR LA PÁGINA
// ==========================================================================
mostrarAnimales();
mostrarVacunas();
mostrarEnfermedades();