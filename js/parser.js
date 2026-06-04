/*
========================================
PARSER.JS
----------------------------------------
Analiza cada término y determina:

- Tipo
- Signo
- Coeficiente
- Exponente
- Función

========================================
*/

function parsearTermino(term) {

    if (!term || term.length < 2) {
        return null;
    }

    const signo = term[0] === "+"
        ? 1
        : -1;

    const t = term.slice(1);

    if (!t) {
        return null;
    }

    /*
    ========================================
    EXPONENCIALES
    ========================================
    */

    let expMatch =
        t.match(/^(\d*)\*?e\^\(([^)]+)\)$/);

    if (!expMatch) {

        expMatch =
            t.match(/^(\d*)\*?e\^([a-z0-9+\-*]+)$/);

    }

    if (expMatch) {

        return {

            tipo: "exp",

            signo: signo,

            coef:
                expMatch[1]
                ? parseInt(expMatch[1])
                : 1,

            exp: expMatch[2]

        };
    }

    /*
    ========================================
    TRIGONOMÉTRICAS
    ========================================
    */

    const trigs = [
        "sinx",
        "cosx",
        "tanx",
        "cscx",
        "secx",
        "cotx"
    ];

    for (const fn of trigs) {

        const trigMatch =
            t.match(
                new RegExp(
                    `^(\\d*)\\*?${fn}$`
                )
            );

        if (trigMatch) {

            return {

                tipo: "trig",

                signo: signo,

                coef:
                    trigMatch[1]
                    ? parseInt(trigMatch[1])
                    : 1,

                func: fn

            };
        }
    }

    /*
    ========================================
    POLINOMIOS
    ========================================
    */
    
    let polyMatch =
        t.match(/^(\d*)x\^([0-9]+)$/);

    if (polyMatch) {

        return {

            tipo: "poly",

            signo: signo,

            coef:
                polyMatch[1] === ""
                ? 1
                : parseInt(polyMatch[1]),

            exp:
                parseInt(polyMatch[2])

        };
    }

    /*
    ========================================
    LINEALES
    ========================================
    */

    let linealMatch =
        t.match(/^(\d*)x$/);

    if (linealMatch) {

        return {

            tipo: "poly",

            signo: signo,

            coef:
                linealMatch[1] === ""
                ? 1
                : parseInt(linealMatch[1]),

            exp: 1

        };
    }

    /*
    ========================================
    CONSTANTES
    ========================================
    */

    let constanteMatch =
        t.match(/^(\d+)$/);

    if (constanteMatch) {

        return {

            tipo: "const",

            signo: signo,

            valor:
                parseInt(
                    constanteMatch[1]
                )

        };
    }

    /*
    ========================================
    NO RECONOCIDO
    ========================================
    */

    return {

        tipo: "unknown",

        signo: signo,

        texto: t

    };
}

/*
========================================
FUNCIÓN AUXILIAR
----------------------------------------
Analiza todos los tokens

Devuelve:

[
 {tipo:"poly"...},
 {tipo:"trig"...}
]

========================================
*/

function parsearTodos(tokens) {

    return tokens.map(token => {

        return parsearTermino(token);

    });

}
