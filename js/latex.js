/*
========================================
LATEX.JS
----------------------------------------
Convierte expresiones normales a formato
MathJax para mostrarlas de forma elegante.
========================================
*/

function aLatex(raw) {

    if (!raw) {
        return "$$0$$";
    }

    let s = raw.trim();

    /*
    ========================================
    EXPONENCIALES
    ========================================
    */

    s = s.replace(

        /e\^\(([^)]+)\)/g,

        (_, exp) => `e^{${exp}}`

    );

    s = s.replace(

        /e\^([a-z0-9]+)/g,

        (_, exp) => `e^{${exp}}`

    );

    /*
    ========================================
    POTENCIAS
    ========================================
    */

    s = s.replace(

        /([0-9]*)x\^([0-9]+)/g,

        '$1x^{$2}'

    );

    /*
    ========================================
    FUNCIONES TRIGONOMÉTRICAS COMPUESTAS
    ========================================
    */

    s = s.replace(

        /secxtanx/g,

        '\\sec x\\tan x'

    );

    s = s.replace(

        /cscxcotx/g,

        '\\csc x\\cot x'

    );

    s = s.replace(

        /sec\^2x/g,

        '\\sec^2 x'

    );

    s = s.replace(

        /csc\^2x/g,

        '\\csc^2 x'

    );

    /*
    ========================================
    FUNCIONES TRIGONOMÉTRICAS SIMPLES
    ========================================
    */

    s = s.replace(/sinx/g, '\\sin x');

    s = s.replace(/cosx/g, '\\cos x');

    s = s.replace(/tanx/g, '\\tan x');

    s = s.replace(/secx/g, '\\sec x');

    s = s.replace(/cscx/g, '\\csc x');

    s = s.replace(/cotx/g, '\\cot x');

    /*
    ========================================
    ENVOLVER EN MATHJAX
    ========================================
    */

    return `$$${s}$$`;
}

/*
========================================
RENDERIZAR MATHJAX
----------------------------------------
Fuerza el refresco visual cuando cambia
una fórmula.
========================================
*/

function renderMath() {

    if (window.MathJax) {

        MathJax.typesetPromise()

            .catch(err => {

                console.error(
                    "Error MathJax:",
                    err
                );

            });
    }
}
