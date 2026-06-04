/*
========================================
APP.JS
----------------------------------------
Archivo principal del sistema.
Conecta todos los módulos.
========================================
*/

function derivar() {

    const input =
        document
        .getElementById("funcInput")
        .value
        .trim();

    if (!input) {
        return;
    }

    try {

        /*
        ================================
        TOKENIZACIÓN
        ================================
        */

        const tokens =
            tokenize(input);

        console.log("TOKENS:", tokens);

        /*
        ================================
        PARSER
        ================================
        */

        const parseados =
            parsearTodos(tokens);

        console.log("PARSEADOS:", parseados);

        /*
        ================================
        DERIVACIÓN
        ================================
        */

        const derivados =
            derivarTodos(parseados);

        /*
        ================================
        RESULTADO FINAL
        ================================
        */

        const pasos =
            derivados.map(
                d => d.paso
            );

        const resultado =
            unirResultados(
                pasos
            );

        /*
        ================================
        MOSTRAR RESULTADO
        ================================
        */

        const resultCard =
            document.getElementById(
                "resultCard"
            );

        resultCard.style.display =
            "block";

        resultCard.classList.add(
            "fade-in"
        );

        document.getElementById(
            "mathOriginal"
        ).innerHTML =
            aLatex(input);

        document.getElementById(
            "mathDerived"
        ).innerHTML =
            aLatex(resultado);

        document.getElementById(
            "rawResult"
        ).innerHTML =
            `f'(x) = ${resultado}`;

        /*
        ================================
        PASOS DETALLADOS
        ================================
        */

        const stepsList =
            document.getElementById(
                "stepsList"
            );

        const stepsCard =
            document.getElementById(
                "stepsCard"
            );

        stepsCard.style.display =
            "block";

        stepsList.innerHTML = "";

        parseados.forEach(
            (termino, i) => {

                if (!termino) return;

                const derivada =
                    derivados[i];

                const paso =
                    document.createElement(
                        "div"
                    );

                paso.className =
                    "step-item";

                paso.innerHTML = `

                    <div class="step-rule">
                        Paso ${i + 1}
                    </div>

                    <div>

                        Tipo:

                        ${
                            termino.tipo === "poly"

                            ? '<span class="badge badge-poly">🔵 Polinomial</span>'

                            : termino.tipo === "trig"

                            ? '<span class="badge badge-trig">🟠 Trigonométrica</span>'

                            : termino.tipo === "exp"

                            ? '<span class="badge badge-exp">🟢 Exponencial</span>'

                            : '<span class="badge badge-const">⚪ Constante</span>'
                        }

                    </div>
                    <div>
                        ${derivada.desc}
                    </div>

                    <div class="step-res">
                        → ${derivada.paso}
                    </div>

                `;

                stepsList.appendChild(
                    paso
                );

            }
        );

        /*
        ================================
        EXPLICADOR VISUAL
        ================================
        */

        mostrarExplicacion(
            input,
            tokens,
            parseados,
            derivados,
            resultado
        );

        /*
        ================================
        ESTADÍSTICAS
        ================================
        */

        const estadisticas =
            generarEstadisticas(
                parseados
            );

        mostrarEstadisticas(
            estadisticas
        );

        /*
        ================================
        MATHJAX
        ================================
        */

        renderMath();

    }
    catch(error){

        console.error(error);

        alert(
            "Error al procesar la función."
        );

    }

}

/*
========================================
ENTER PARA DERIVAR
========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const input =
            document.getElementById(
                "funcInput"
            );

        if(input){

            input.addEventListener(
                "keydown",
                event => {

                    if(
                        event.key ===
                        "Enter"
                    ){

                        derivar();

                    }

                }
            );

        }

    }
);