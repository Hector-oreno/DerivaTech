/*
========================================
UI.JS
----------------------------------------
Manejo visual de:

- Ejemplos
- Pruebas
- Reglas
- Modo oscuro
- Estadísticas
========================================
*/

/* ====================================
   EJEMPLOS RÁPIDOS
==================================== */

const EJEMPLOS = [

    "3x^2+2x+7",
    "5x^3-2x-1",
    "4sinx+3cosx",
    "e^2x+5",
    "x^3+7x-secx",
    "-4x^2-cosx"

];

/* ====================================
   PRUEBAS DEL PROYECTO
==================================== */

const PRUEBAS = [

    {
        fn:"5x^3-2x-1",
        tipo:"Polinomial"
    },

    {
        fn:"3sinx+4x^2",
        tipo:"Trigonométrica"
    },

    {
        fn:"e^2x+5",
        tipo:"Exponencial"
    },

    {
        fn:"-4x^2-cosx",
        tipo:"Mixta"
    },

    {
        fn:"x^3+7x-secx",
        tipo:"Mixta"
    }

];

/* ====================================
   REGLAS IMPLEMENTADAS
==================================== */

const REGLAS = [

    {
        nombre:"Constante",
        formula:"d/dx(c)=0"
    },

    {
        nombre:"Potencia",
        formula:"d/dx(axⁿ)=n·a·xⁿ⁻¹"
    },

    {
        nombre:"Seno",
        formula:"d/dx(sinx)=cosx"
    },

    {
        nombre:"Coseno",
        formula:"d/dx(cosx)=-sinx"
    },

    {
        nombre:"Tangente",
        formula:"d/dx(tanx)=sec²x"
    },

    {
        nombre:"Secante",
        formula:"d/dx(secx)=secx·tanx"
    },

    {
        nombre:"Cosecante",
        formula:"d/dx(cscx)=-cscx·cotx"
    },

    {
        nombre:"Cotangente",
        formula:"d/dx(cotx)=-csc²x"
    },

    {
        nombre:"Exponencial",
        formula:"d/dx(e^(ax))=a·e^(ax)"
    }

];

/* ====================================
   CARGAR PRUEBAS
==================================== */

function cargarPruebas() {

    const grid =
        document.getElementById(
            "testsGrid"
        );

    if (!grid) return;

    grid.innerHTML = "";

    PRUEBAS.forEach(prueba => {

        const card =
            document.createElement("div");

        card.className =
            "test-row";

        card.innerHTML = `

            <strong>
                ${prueba.tipo}
            </strong>

            <br><br>

            <code>
                ${prueba.fn}
            </code>

        `;

        card.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "funcInput"
                    )
                    .value =
                    prueba.fn;

                derivar();

            }
        );

        grid.appendChild(card);

    });

}

/* ====================================
   CARGAR REGLAS
==================================== */

function cargarReglas() {

    const grid =
        document.getElementById(
            "rulesGrid"
        );

    if (!grid) return;

    grid.innerHTML = "";

    REGLAS.forEach(regla => {

        const card =
            document.createElement("div");

        card.className =
            "rule-card";

        card.innerHTML = `

            <strong>
                ${regla.nombre}
            </strong>

            <br><br>

            <code>
                ${regla.formula}
            </code>

        `;

        grid.appendChild(card);

    });

}

/* ====================================
   ESTADÍSTICAS
==================================== */

function generarEstadisticas(
    parseados
){

    let poly = 0;
    let trig = 0;
    let exp = 0;
    let constante = 0;

    parseados.forEach(t => {

        if(!t) return;

        switch(t.tipo){

            case "poly":
                poly++;
                break;

            case "trig":
                trig++;
                break;

            case "exp":
                exp++;
                break;

            case "const":
                constante++;
                break;
        }

    });

    return {

        total:
            parseados.length,

        poly,
        trig,
        exp,
        constante

    };

}

/* ====================================
   MODO OSCURO
==================================== */

function toggleDarkMode(){

    document.body.classList.toggle(
        "dark-mode"
    );

}

/* ====================================
   INICIALIZAR UI
==================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarPruebas();

        cargarReglas();

    }
);

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarPruebas();

        cargarReglas();

        const input =
            document.getElementById(
                "funcInput"
            );

        document
            .querySelectorAll(
                ".symbol-btn"
            )
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    () => {

                        const start = input.selectionStart;
                        const end = input.selectionEnd;

                        input.value =
                            input.value.substring(0, start) +
                            btn.dataset.symbol +
                            input.value.substring(end);

                        input.selectionStart =
                        input.selectionEnd =
                            start + btn.dataset.symbol.length;

                        input.focus();

                    }
                );

            });

    }
);

