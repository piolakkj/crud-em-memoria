import express from "express";

const app = express();
app.use(express.json());

let ultimoId = 1;

const usuario_admin = [
    {nome: "admin", email: "admin@admin",}
];

let usuarios = [usuario_admin]

app.get("/usuarios", (req, res) => {
    res.json(usuarios).status(200);
});

app.post("/usuarios", (req, res) => {
  //pegar nome e email
  //do body
  const { nome, email } = req.body;
  console.log(nome);
  console.log(email);
  if(!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
  }

  //definir o id dele
  //adicionar ele a lista/banco de dados
  //atualizar o ultimo id
  //retornar pro front se deu sucesso (status 201)
});

app.listen(3000);

/**
 * crud em memória
 * criar uma rota para pegar todos os usuarios
 * criar  uma rota para cadastrar um novo usuario
 * criar uma rota para deletar um usuario
 * criar uma rota para atualizar um usuario
 */
