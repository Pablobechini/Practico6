const hojasDeEstilo = ['estilos.css', 'estilos-urbano.css', 'estilos-retro.css'];
let indiceActual = 0;


window.onload = function() {
    const estiloGuardado = localStorage.getItem('estiloRecordado');
    const selector = document.getElementById('selectorEstilos');
    const radios = document.querySelectorAll('input[name="estilo"]');
    const enlaceEstilo = document.getElementById('estilo');

    if (estiloGuardado) {
        enlaceEstilo.href = estiloGuardado;

        const botonRecordar = document.getElementById('recordarEstilo');
        botonRecordar.classList.add('hundido');

        // marcar option del select
        selector.value = estiloGuardado.endsWith('css') ? estiloGuardado : '';

        // marcar radio
        radios.forEach(radio => {
            if (radio.value === estiloGuardado) {
                radio.checked = true;
            }
        });
    }
};

function alternarEstilo() {
    indiceActual = (indiceActual + 1) % hojasDeEstilo.length;
    const enlaceEstilo = document.getElementById('estilo');
    enlaceEstilo.href = hojasDeEstilo[indiceActual];
}

function aplicarEstiloAleatorio() {
    const enlaceEstilo = document.getElementById('estilo');
    const aleatorio = Math.floor(Math.random() * (hojasDeEstilo.length + 1));
    if (aleatorio === hojasDeEstilo.length) {
        enlaceEstilo.removeAttribute('href');
    } else {
        enlaceEstilo.href = hojasDeEstilo[aleatorio];
    }
}

function recordarEstilo() {
    const enlaceEstilo = document.getElementById('estilo');
    const botonRecordar = document.getElementById('recordarEstilo');

    if (localStorage.getItem('estiloRecordado')) {
        localStorage.removeItem('estiloRecordado');
        botonRecordar.classList.remove('hundido');
    } else {
        localStorage.setItem('estiloRecordado', enlaceEstilo.href);
        botonRecordar.classList.add('hundido');
    }
}

// bonus3 apartado del select
function seleccionarEstilo(event) {
    const enlaceEstilo = document.getElementById('estilo');
    const estiloSeleccionado = event.target.value;
    const radios = document.querySelectorAll('input[name="estilo"]');
    const botonRecordar = document.getElementById('recordarEstilo');

    if (estiloSeleccionado) {
        enlaceEstilo.href = estiloSeleccionado;
    } else {
        enlaceEstilo.removeAttribute('href');
    }

    // para sincronizar el racdio juntoy el select a la vez
    radios.forEach(radio => {
        radio.checked = (radio.value === estiloSeleccionado);
    });

    if (botonRecordar.classList.contains('hundido')) {
        if (estiloSeleccionado) {
            localStorage.setItem('estiloRecordado', estiloSeleccionado);
        } else {
            localStorage.removeItem('estiloRecordado');
        }
    }
}

// radios
function seleccionarEstiloRadio(event) {
    const enlaceEstilo = document.getElementById('estilo');
    const estiloSeleccionado = event.target.value;
    const selector = document.getElementById('selectorEstilos');
    const botonRecordar = document.getElementById('recordarEstilo');

    if (estiloSeleccionado) {
        enlaceEstilo.href = estiloSeleccionado;
    } else {
        enlaceEstilo.removeAttribute('href');
    }


    selector.value = estiloSeleccionado;

    if (botonRecordar.classList.contains('hundido')) {
        if (estiloSeleccionado) {
            localStorage.setItem('estiloRecordado', estiloSeleccionado);
        } else {
            localStorage.removeItem('estiloRecordado');
        }
    }
}

const boton = document.getElementById('cambiarEstilo');
boton.addEventListener('click', alternarEstilo);

const botonAleatorio = document.getElementById('botonAleatorio');
botonAleatorio.addEventListener('click', aplicarEstiloAleatorio);

const botonRecordar = document.getElementById('recordarEstilo');
botonRecordar.addEventListener('click', recordarEstilo);

const selector = document.getElementById('selectorEstilos');
selector.addEventListener('change', seleccionarEstilo);

const radios = document.querySelectorAll('input[name="estilo"]');
radios.forEach(radio => {
    radio.addEventListener('change', seleccionarEstiloRadio);
});
