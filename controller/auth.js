function verificarAutorizacao(req, res, next) {
    const { tipoUsuario } = req.body;

    if (tipoUsuario === "ADM") {
        next();
    } else {
        res.status(401).json({ message: "Função não permitida para esse usuário" });

        console.log("Função não permitida para esse usuário");
    }
}

export { verificarAutorizacao };