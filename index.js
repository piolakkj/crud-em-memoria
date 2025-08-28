import express from "express";
const app = express();
app.use(express.json());

/**
 * crud em memória
 * criar uma rota para pegar todos os usuarios -> feito
 * criar  uma rota para cadastrar um novo usuario -> feito
 * criar uma rota para deletar um usuario
 * criar uma rota para atualizar um usuario
 */

let ultimoId = 1;

const usuario_admin = {
    id: ultimoId,
    nome: "admin", 
    email: "email@gmail.com"
};

const usuario_comum = {
    id: ultimoId,
    nome: "comum",
    email: "email2@gmail.com"
};

let usuarios = [usuario_admin, usuario_comum];

app.get("/usuarios", (req, res) => {
    res.json(usuarios).status(200);
});

app.post("/usuarios", (req, res) => {

  //pegar nome e email
  //do body
    const {nome, email} = req.body;
    console.log(nome);
    console.log(email);
    if (!nome||!email) {
       return res.status(400).json({mensagem: "Nome e email são obrigatórios"})
    };

  //definir o id dele
  //adicionar ele a lista/banco de dados

  //atualizar o ultimo id
  //retornar pro front se deu sucesso (status 201)

  const novoUsuario = {
    id: ultimoId++,
    nome: nome,
    email: email
  };

  usuarios.push(novoUsuario);
  ultimoId += 1;

  res.status(201).json(novoUsuario.id);
});

app.delete("/usuarios/:id", (req, res) => {

  const id  = req.params.id;
  const idNumerico = parseInt(id);

  if (isNaN(idNumerico)) {
    return res.status(400).json({mensagem: "ID inválido"});
  }

  let usuarioIndex = usuarios.findIndex(usuario => usuario.id === idNumerico);

  if (usuarioIndex === -1) {
    return res.status(404).json({mensagem: "Usuário não encontrado"});
  };

  usuarios.splice(usuarioIndex, 1);
  res.status(204).send();
}); 

app.patch("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  const { nome, email } = req.body;

  if (!usuario && !email) {
    return res.status(404).json({ mensagem: "nome e email são obrigatórios" });
  };

  if (email) {
    let email_existe = usuarios.findIndex(usuario => usuario.email === email);

    if (email_existe !== -1) {
      return res.status(409).json({ mensagem: "Email já cadastrado" });
    }

    usuario.email = email;
    console.log("Email atualizado:", usuario.email);
  }

  if (nome) {
    let nome_existe = usuarios.findIndex(usuario => usuario.nome === nome);

    if (nome_existe !== -1) {
      return res.status(409).json({ mensagem: "Nome já cadastrado" });
    }

    usuario.nome = nome;
    console.log("Nome atualizado:", usuario.nome);
  }

  res.status(200).json(usuario);
});

app.listen(3000)