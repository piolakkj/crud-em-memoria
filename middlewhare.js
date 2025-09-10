let qt = 0;

export function imprime(req, res, next) {
    qt++;
    console.log("Middleware foi chamado " + qt + " vez(es)");
    next();
}
