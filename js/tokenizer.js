/*
========================================
TOKENIZER.JS
----------------------------------------
Separa una función matemática en términos
individuales.

Ejemplo:

3x^2+2sinx-e^2x+7

↓

[
 "+3x^2",
 "+2sinx",
 "-e^2x",
 "+7"
]

========================================
*/

function tokenize(expr) {

    // Validar entrada
    if (!expr) {
        return [];
    }

    // Eliminar espacios
    expr = expr.replace(/\s/g, "");

    // Minúsculas
    expr = expr.toLowerCase();

    const terms = [];

    let current = "";
    let sign = "+";

    for (let i = 0; i <= expr.length; i++) {

        const ch = i < expr.length
            ? expr[i]
            : null;

        /*
        Detectar si encontramos
        un nuevo término
        */

        const esSeparador =
            ch === null ||

            (
                (ch === "+" || ch === "-")
                &&
                i > 0
                &&
                expr[i - 1] !== "^"
                &&
                expr[i - 1] !== "("
            );

        if (esSeparador) {

            if (current !== "") {

                // Si el término ya inicia con + o -
                // no agregar otro signo

                        if (
                            current.startsWith("+") ||
                            current.startsWith("-")
                        ) {

                            terms.push(current);

                        } else {

                            terms.push(
                                 sign + current
                            );

                        }

                    }

            sign = ch || "";
            current = "";

        } else {

            current += ch;

        }
    }

    return terms;
}

/*
========================================
FUNCIÓN AUXILIAR
----------------------------------------
Permite mostrar visualmente la
tokenización en el explicador.

Ejemplo:

["+3x²","+2x","-7"]

↓

3x²
2x
-7
========================================
*/

function visualizarTokens(tokens) {

    return tokens.map(token => {

        return {
            termino: token
        };

    });

}