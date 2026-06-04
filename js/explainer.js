function mostrarExplicacion(
    expresion,
    tokens,
    parseados,
    derivados,
    resultado
){

    const contenedor =
        document.getElementById(
            "algorithmFlow"
        );

    if(!contenedor) return;

    const clasificaciones =
        parseados.map(t => {

            if(!t) return "No reconocido";

            switch(t.tipo){

                case "poly":
                    return "Polinomial";

                case "trig":
                    return "Trigonométrica";

                case "exp":
                    return "Exponencial";

                case "const":
                    return "Constante";

                default:
                    return "Desconocido";
            }

        });

    const derivadas =
        derivados.map(d => d.paso);

    contenedor.innerHTML = `

        <div class="flow-step">
            <strong>1. Entrada</strong>
            <br><br>
            ${expresion}
        </div>

        <div class="flow-step">
            <strong>2. Tokenización</strong>
            <br><br>
            ${tokens.join("<br>")}
        </div>

        <div class="flow-step">
            <strong>3. Clasificación</strong>
            <br><br>
            ${clasificaciones.join("<br>")}
        </div>

        <div class="flow-step">
            <strong>4. Aplicación de reglas</strong>
            <br><br>
            ${derivadas.join("<br>")}
        </div>

        <div class="flow-step">
            <strong>5. Resultado Final</strong>
            <br><br>
            <span style="
                color:#22c55e;
                font-weight:bold;
                font-size:1.1rem;
            ">
                f'(x) = ${resultado}
            </span>
        </div>

    `;

}

/*
========================================
ESTADÍSTICAS VISUALES
========================================
*/

function mostrarEstadisticas(
    estadisticas
){

    const contenedor =
        document.getElementById(
            "algorithmFlow"
        );

    if(!contenedor) return;

    const bloque = document.createElement(
        "div"
    );

    bloque.className = "flow-step";

    bloque.innerHTML = `

        <strong>
            Información del análisis
        </strong>

        <br><br>

        Total términos:
        ${estadisticas.total}

        <br>

        Polinomiales:
        ${estadisticas.poly}

        <br>

        Trigonométricos:
        ${estadisticas.trig}

        <br>

        Exponenciales:
        ${estadisticas.exp}

        <br>

        Constantes:
        ${estadisticas.constante}

    `;

    contenedor.appendChild(
        bloque
    );

}