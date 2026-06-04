/*
========================================
DERIVATIVE.JS
----------------------------------------
Aplica las reglas de derivación a cada
término identificado por parser.js
========================================
*/

function derivarTermino(t) {

    if (!t) {

        return {
            paso: "0",
            regla: "No reconocido",
            desc: ""
        };

    }

    /*
    ========================================
    CONSTANTES
    ========================================
    */

    if (t.tipo === "const") {

        return {

            paso: "0",

            regla: "Regla de la constante",

            desc:
                "La derivada de una constante es 0"

        };

    }

    /*
    ========================================
    POTENCIA
    ========================================
    */

    if (t.tipo === "poly") {

        // ax

        if (t.exp === 1) {

            const resultado =
                t.signo * t.coef;

            return {

                paso:
                    (resultado >= 0 ? "+" : "")
                    + resultado,

                regla:
                    "Regla de la potencia",

                desc:
                    "d/dx(ax)=a"

            };

        }

        // ax^n

        const nuevoCoef =
            t.signo *
            t.coef *
            t.exp;

        const nuevoExp =
            t.exp - 1;

        let resultado = "";

        const absCoef =
            Math.abs(nuevoCoef);

        const coefStr =
            (absCoef === 1 && nuevoExp > 0)
            ? ""
            : absCoef;

        const parteX =

            nuevoExp === 0
            ? ""

            : nuevoExp === 1
            ? "x"

            : `x^${nuevoExp}`;

        resultado =
            (nuevoCoef < 0 ? "-" : "+")
            + coefStr
            + parteX;

        return {

            paso: resultado,

            regla:
                "Regla de la potencia",

            desc:
                `d/dx(ax^n)=n·a·x^(n-1)`

        };

    }

    /*
    ========================================
    TRIGONOMÉTRICAS
    ========================================
    */

    if (t.tipo === "trig") {

        const tablaTrig = {

            sinx: {
                deriv: "cosx",
                formula:
                    "d/dx(sinx)=cosx"
            },

            cosx: {
                deriv: "-sinx",
                formula:
                    "d/dx(cosx)=-sinx"
            },

            tanx: {
                deriv: "sec^2x",
                formula:
                    "d/dx(tanx)=sec²x"
            },

            secx: {
                deriv: "secxtanx",
                formula:
                    "d/dx(secx)=secx·tanx"
            },

            cscx: {
                deriv: "-cscxcotx",
                formula:
                    "d/dx(cscx)=-cscx·cotx"
            },

            cotx: {
                deriv: "-csc^2x",
                formula:
                    "d/dx(cotx)=-csc²x"
            }

        };

        const regla =
            tablaTrig[t.func];

        const derivNeg =
            regla.deriv.startsWith("-");

        const derivBase =
            derivNeg
            ? regla.deriv.substring(1)
            : regla.deriv;

        const signoFinal =

            (t.signo === 1 && !derivNeg)
            ? "+"

            : (t.signo === -1 && !derivNeg)
            ? "-"

            : (t.signo === 1 && derivNeg)
            ? "-"

            : "+";

        const coefStr =
            t.coef === 1
            ? ""
            : t.coef;

        return {

            paso:
                signoFinal +
                coefStr +
                derivBase,

            regla:
                "Derivada trigonométrica",

            desc:
                regla.formula

        };

    }

    /*
    ========================================
    EXPONENCIALES
    ========================================
    */

    if (t.tipo === "exp") {

        const matchCadena =
            t.exp.match(/^(\d+)x$/);

        const coefCadena =
            matchCadena
            ? parseInt(matchCadena[1])
            : 1;

        const coefTotal =

            t.signo *
            t.coef *
            coefCadena;

        const absCoef =
            Math.abs(coefTotal);

        const coefStr =
            absCoef === 1
            ? ""
            : absCoef;

        const expStr =

            t.exp.length > 1

            ? `(${t.exp})`

            : t.exp;

        return {

            paso:
                (coefTotal < 0 ? "-" : "+")
                + coefStr
                + `e^${expStr}`,

            regla:
                "Exponencial + Regla de la cadena",

            desc:
                `Coeficiente interno = ${coefCadena}`

        };

    }

    /*
    ========================================
    NO RECONOCIDO
    ========================================
    */

    return {

        paso: "0",

        regla:
            "Tipo no reconocido",

        desc: ""

    };
}

/*
========================================
DERIVAR TODOS LOS TÉRMINOS
========================================
*/

function derivarTodos(terminos) {

    return terminos.map(t => {

        return derivarTermino(t);

    });

}

/*
========================================
UNIR RESULTADOS
========================================
*/

function unirResultados(pasos) {

    const partes = pasos.filter(p =>

        p &&
        p !== "0" &&
        p !== "+0" &&
        p !== "-0"

    );

    if (partes.length === 0) {

        return "0";

    }

    let resultado =
        partes.join("");

    if (resultado.startsWith("+")) {

        resultado =
            resultado.substring(1);

    }

    return resultado;
}