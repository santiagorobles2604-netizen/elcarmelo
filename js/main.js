// ==========================================================================
// 1. LISTAS PARA GUARDAR LA INFORMACIÓN (Cargadas desde LocalStorage)
// ==========================================================================
let animales = JSON.parse(localStorage.getItem('animales')) || [];
let vacunas = JSON.parse(localStorage.getItem('vacunas')) || [];
let enfermedades = JSON.parse(localStorage.getItem('enfermedades')) || [];
let reproduccion = JSON.parse(localStorage.getItem('reproduccion')) || [];
let bajas = JSON.parse(localStorage.getItem('bajas')) || [];

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
                    <button class="btn btn-info btn-sm text-white me-1" onclick="verPerfilAnimal('${ani.arete}')" style="border-radius: 8px; padding: 4px 10px;">
                        <i class="bi bi-file-earmark-person"></i> Perfil
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarAnimal(${index})" style="border-radius: 8px; padding: 4px 10px;">
                        <i class="bi bi-trash3"></i> Eliminar
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

function mostrarReproduccion() {
    const tabla = document.getElementById('tabla-reproduccion');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    reproduccion.forEach(rep => {
        let claseCelo = rep.celo === 'No' ? 'bg-secondary' : 'bg-danger';
        tabla.innerHTML += `
            <tr>
                <td><strong>#${rep.arete}</strong></td>
                <td>${rep.nacimiento}</td>
                <td><span class="badge ${claseCelo}">${rep.celo}</span></td>
                <td><span class="badge bg-primary">${rep.estado}</span></td>
                <td>${rep.meses} meses</td>
            </tr>`;
    });
}

function mostrarBajas() {
    const tabla = document.getElementById('tabla-bajas');
    if (!tabla) return;
    
    tabla.innerHTML = '';
    bajas.forEach(baja => {
        let badgeColor = baja.tipo === 'Venta' ? 'bg-success' : 'bg-dark';
        tabla.innerHTML += `
            <tr>
                <td><span class="fw-bold text-secondary">#${baja.arete}</span></td>
                <td><span class="badge ${badgeColor}">${baja.tipo}</span></td>
                <td>${baja.detalle}</td>
            </tr>`;
    });
}

// ==========================================================================
// 3. FUNCIÓN MAESTRA: VER HOJA DE VIDA COMPLETA (MODAL + IMPRIMIR)
// ==========================================================================
function verPerfilAnimal(arete) {
    const animal = animales.find(a => a.arete === arete);
    if (!animal) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se encontró información base de este animal.' });
        return;
    }

    // Filtrar todo el historial correspondiente a este arete
    const misVacunas = vacunas.filter(v => v.arete === arete);
    const misEnfs = enfermedades.filter(e => e.arete === arete);
    const miRepro = reproduccion.find(r => r.arete === arete);
    const miBaja = bajas.find(b => b.arete === arete);

    // Armar el diseño interno del Modal de forma elegante
    let html = `
        <div class="container-fluid">
            <div class="row mb-3 bg-light p-3 rounded align-items-center">
                <div class="col-md-6">
                    <h5 class="mb-1 text-success fw-bold">ID Arete: #${animal.arete}</h5>
                    <p class="mb-1"><strong>Tipo:</strong> ${animal.tipo} | <strong>Raza:</strong> ${animal.raza || 'No especificada'}</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-1"><strong>Estado Operativo:</strong></p>
                    ${miBaja ? `<span class="badge bg-danger">Dada de baja (${miBaja.tipo})</span>` : `<span class="badge bg-success">Activo en Corral</span>`}
                </div>
            </div>
            
            <div class="row">
                <!-- Columna Enfermedades -->
                <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-danger border-bottom pb-2"><i class="bi bi-heart-pulse"></i> Historial Clínico</h6>
                    <div class="p-2 border rounded bg-white" style="max-height: 150px; overflow-y: auto;">
                        ${misEnfs.length > 0 ? 
                            `<ul class="list-group list-group-flush">${misEnfs.map(e => `<li class="list-group-item small p-1"><strong>${e.nombre}:</strong> ${e.tratamiento || 'Sin tratamiento'}</li>`).join('')}</ul>` 
                            : `<p class="text-muted small mb-0 p-1">Sin enfermedades reportadas.</p>`}
                    </div>
                </div>
                <!-- Columna Vacunas -->
                <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-primary border-bottom pb-2"><i class="bi bi-capsule"></i> Esquema Sanitario</h6>
                    <div class="p-2 border rounded bg-white" style="max-height: 150px; overflow-y: auto;">
                        ${misVacunas.length > 0 ? 
                            `<ul class="list-group list-group-flush">${misVacunas.map(v => `<li class="list-group-item small p-1"><i class="bi bi-patch-check text-primary"></i> ${v.nombre} (${v.fecha})</li>`).join('')}</ul>` 
                            : `<p class="text-muted small mb-0 p-1">Ninguna vacuna registrada.</p>`}
                    </div>
                </div>
            </div>

            <!-- Fila Repro -->
            <div class="row mt-2">
                <div class="col-12">
                    <h6 class="fw-bold text-warning border-bottom pb-2"><i class="bi bi-gender-ambiguous"></i> Datos Reproductivos y Cronología</h6>
                    <div class="p-3 bg-light rounded">
                        ${miRepro ? `
                            <div class="row text-dark small">
                                <div class="col-md-6 mb-2"><strong>Fecha de Nacimiento:</strong> ${miRepro.nacimiento}</div>
                                <div class="col-md-6 mb-2"><strong>¿Reporta Celo?:</strong> ${miRepro.celo}</div>
                                <div class="col-md-6"><strong>Estado Gestacional:</strong> ${miRepro.estado}</div>
                                <div class="col-md-6"><strong>Tiempo transcurrido:</strong> ${miRepro.meses} meses</div>
                            </div>
                        ` : `<p class="text-muted small mb-0 text-center">No se han ingresado fichas reproductivas o de edad todavía.</p>`}
                    </div>
                </div>
            </div>

            ${miBaja ? `
            <div class="row mt-3">
                <div class="col-12">
                    <div class="alert alert-warning small mb-0">
                        <i class="bi bi-exclamation-triangle-fill"></i> <strong>Detalle de Salida:</strong> ${miBaja.detalle}
                    </div>
                </div>
            </div>` : ''}

            <hr>
            <div class="text-end print-none">
                <button class="btn btn-secondary shadow-sm px-3" onclick="window.print()" style="border-radius: 8px;">
                    <i class="bi bi-printer"></i> Descargar Ficha Técnica (PDF)
                </button>
            </div>
        </div>
    `;

    document.getElementById('contenido-perfil').innerHTML = html;
    const modalElement = document.getElementById('modalPerfilAnimal');
    const instanciaModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    instanciaModal.show();
}

// ==========================================================================
// 4. FUNCIÓN MODERNA: ELIMINAR ANIMAL (CON SWEETALERT2)
// ==========================================================================
function eliminarAnimal(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El animal se borrará permanentemente de los registros de la finca.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd5718',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="bi bi-trash"></i> Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            animales.splice(index, 1);
            localStorage.setItem('animales', JSON.stringify(animales));
            mostrarAnimales();
            
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El registro ha sido removido con éxito.',
                icon: 'success',
                confirmButtonColor: '#1b5e20'
            });
        }
    });
}

// ==========================================================================
// 5. CAPTURADORES DE EVENTOS (FORMULARIOS)
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
        
        Swal.fire({ icon: 'success', title: '¡Guardado!', text: 'Nuevo animal registrado en el inventario.', confirmButtonColor: '#1b5e20' });
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
        
        Swal.fire({ icon: 'success', title: 'Vacuna Registrada', text: 'Historial de vacunación actualizado.', confirmButtonColor: '#dd5718' });
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
        
        Swal.fire({ icon: 'warning', title: 'Novedad Médica', text: 'Reporte sanitario guardado correctamente.', confirmButtonColor: '#dd5718' });
    });
}

if (document.getElementById('form-reproduccion')) {
    document.getElementById('form-reproduccion').addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevoRep = {
            arete: document.getElementById('rep-arete').value,
            nacimiento: document.getElementById('rep-nacimiento').value,
            celo: document.getElementById('rep-celo').value,
            estado: document.getElementById('rep-estado').value,
            meses: document.getElementById('rep-meses').value
        };
        reproduccion.push(nuevoRep);
        localStorage.setItem('reproduccion', JSON.stringify(reproduccion));
        mostrarReproduccion();
        this.reset();
        
        Swal.fire({ icon: 'success', title: 'Ficha Reproductiva', text: 'Datos de ciclo y edad actualizados.', confirmButtonColor: '#1b5e20' });
    });
}

if (document.getElementById('form-baja')) {
    document.getElementById('form-baja').addEventListener('submit', function(e) {
        e.preventDefault();
        const nuevaBaja = {
            arete: document.getElementById('baja-arete').value,
            tipo: document.getElementById('baja-tipo').value,
            detalle: document.getElementById('baja-detalle').value
        };
        bajas.push(nuevaBaja);
        localStorage.setItem('bajas', JSON.stringify(bajas));
        mostrarBajas();
        this.reset();
        
        Swal.fire({ icon: 'info', title: 'Salida Registrada', text: 'El estado operacional del animal ha cambiado.', confirmButtonColor: '#6c757d' });
    });
}

// ==========================================================================
// 6. CARGA AUTOMÁTICA AL ABRIR LA PÁGINA
// ==========================================================================
mostrarAnimales();
mostrarVacunas();
mostrarEnfermedades();
mostrarReproduccion();
mostrarBajas();

// ==========================================================================
// 7. BUSCADOR EN TIEMPO REAL INTEGRADO CON EL BOTÓN PERFIL
// ==========================================================================
if (document.getElementById('buscador-animales')) {
    document.getElementById('buscador-animales').addEventListener('keyup', function(e) {
        const texto = e.target.value.toLowerCase();
        
        const resultados = animales.filter(ani => 
            ani.arete.toLowerCase().includes(texto) || 
            ani.tipo.toLowerCase().includes(texto) || 
            (ani.raza && ani.raza.toLowerCase().includes(texto))
        );
        
        const tabla = document.getElementById('tabla-animales');
        tabla.innerHTML = '';
        
        if (resultados.length === 0) {
            tabla.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No se encontraron animales con esa búsqueda.</td></tr>`;
            return;
        }

        resultados.forEach((ani) => {
            const indexReal = animales.indexOf(ani);
            tabla.innerHTML += `
                <tr>
                    <td><strong>${ani.arete}</strong></td>
                    <td><span class="badge bg-success bg-opacity-10 text-success px-2 py-1">${ani.tipo}</span></td>
                    <td>${ani.raza || 'No especificada'}</td>
                    <td>
                        <button class="btn btn-info btn-sm text-white me-1" onclick="verPerfilAnimal('${ani.arete}')" style="border-radius: 8px; padding: 4px 10px;">
                            <i class="bi bi-file-earmark-person"></i> Perfil
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarAnimal(${indexReal})" style="border-radius: 8px; padding: 4px 10px;">
                            <i class="bi bi-trash3"></i> Eliminar
                        </button>
                    </td>
                </tr>`;
        });
    });
}