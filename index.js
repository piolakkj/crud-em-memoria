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

  const novoUsuario = {
    nome: nome,
    email: email,
    id: ultimoId + 1,
  };
  usuarios.push(novoUsuario);
  ultimoId += 1;

  res.status(201).json(novoUsuario.id);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const idNumerico = parseInt(id);

  if(isNaN(idNumerico)) {
    return res.status(400).json({ mensagem: "ID inválido, precisa ser um número" });
  }

  let usuarioIndex = usuarios.findIndex(usuario => usuario.id === idNumerico);

  if(usuarioIndex === -1) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  usuarios.splice(usuarioIndex, 1);
  res.status(204).send();

  
});

app.listen(3000);