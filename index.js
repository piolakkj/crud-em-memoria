import express from "express";
import { imprime } from './middleware.js';

const app = express();
app.use(express.json());
app.use(imprime);

/**
 * crud em memória
 * criar uma rota para pegar todos os usuarios -> feito
 * criar  uma rota para cadastrar um novo usuario -> feito
 * criar uma rota para deletar um usuario -> feito
 * criar uma rota para atualizar um usuario -> feito
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
    res.status(200).json(usuarios);
});

app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body;

    if (!nome || !email) {
       return res.status(400).json({mensagem: "Nome e email são obrigatórios"});
    }

    const novoUsuario = {
        id: ultimoId++,
        nome,
        email
    };

    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario.id);
});

app.delete("/usuarios/:id", (req, res) => {
  const idNumerico = parseInt(req.params.id);

  if (isNaN(idNumerico)) {
    return res.status(400).json({mensagem: "ID inválido"});
  }

  const usuarioIndex = usuarios.findIndex(usuario => usuario.id === idNumerico);

  if (usuarioIndex === -1) {
    return res.status(404).json({mensagem: "Usuário não encontrado"});
  }

  usuarios.splice(usuarioIndex, 1);
  res.status(204).send();
}); 

app.patch("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);

  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  const { nome, email } = req.body;

  if (!nome && !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
  }

  if (email) {
    const email_existe = usuarios.findIndex(usuario => usuario.email === email);

    if (email_existe !== -1) {
      return res.status(409).json({ mensagem: "Email já cadastrado" });
    }

    usuario.email = email;
    console.log("Email atualizado:", usuario.email);
  }

  if (nome) {
    usuario.nome = nome;
    console.log("Nome atualizado:", usuario.nome);
  }

  res.status(200).json(usuario);
});

app.listen(3000 , () => {
    console.log("Servidor rodando na porta 3000");
});
