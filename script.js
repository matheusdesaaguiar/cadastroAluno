let bancoDeDados =[
    {
        nomeCompleto: {
            nome: "Matheus",
            sobrenome: "Aguiar"
        },
        email: "matheus@gmail.com",
        cpf: "123456789-12",
        telefone: "946123714",
        idade: 20
    },
    {
        nomeCompleto: {
            nome: "João",
            sobrenome: "Silva"
        },
        email: "joao.silva@email.com",
        cpf: "123456789-00",
        telefone: "987654321",
        idade: 25
    },
    {
        nomeCompleto: {
            nome: "Maria",
            sobrenome: "Santos"
        },
        email: "maria.santos@email.com",
        cpf: "234567890-11",
        telefone: "976543210",
        idade: 30
    },
    {
        nomeCompleto: {
            nome: "Carlos",
            sobrenome: "Oliveira"
        },
        email: "carlos.oliveira@email.com",
        cpf: "345678901-22",
        telefone: "965432109",
        idade: 28
    }
];
const cadastrar = document.getElementById("cadastrar")


const listaAlunos = document.getElementById("lista-alunos");
cadastrar.addEventListener("click", () => {
    const botoes = document.querySelectorAll(".btn-academia");
    botoes.forEach((element) => element.style.display = 'none');
});

class pessoa{
    constructor(nome, sobrenome, email, cpf,telefone, idade) {
        this.nomeCompleto = {
            nome,
            sobrenome
        }
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone
        this.idade = idade;
    }
}

class aluno extends pessoa{
    constructor(nome, sobrenome, email, cpf, telefone, idade, plano) {
        super(nome, sobrenome, email, cpf, telefone, idade);
        this.plano = plano;
    }
    static cadastrarAluno(bancoDeDados, aluno) {
        bancoDeDados.push(aluno);
    }
    static excluirAluno(bancoDeDados, nome, sobrenome) {
        const alunoExcluir= bancoDeDados.nomeCompleto.indexof(nome + ' ' + sobrenome);
        
        //bancoDeDados.splice(alunoExcluir, 1);
    }
}

const cadBtn = document.getElementById("cad-btn");

function atualizarListaAlunos() {
    listaAlunos.innerHTML = '';

    bancoDeDados.forEach(aluno => {
        const nomeCompleto = `${aluno.nomeCompleto.nome} ${aluno.nomeCompleto.sobrenome}`;
        
        const li = document.createElement("li");
        li.innerText = ` ${nomeCompleto}`;
        listaAlunos.appendChild(li);
    });
}

cadBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    const nome = document.getElementById('input-nome');
    const sobrenome = document.getElementById('input-sobrenome');
    const email = document.getElementById('input-email');
    const cpf = document.getElementById('input-cpf');
    const tel = document.getElementById('input-tel');
    const idade = document.getElementById('input-idade');
    const plano = document.getElementById('input-plano');
    const mensagemErro = document.getElementById('mensagem-erro');

    if(!nome.value || !sobrenome.value || !email.value || !cpf.value || !tel.value || !idade.value || !plano.value){
        mensagemErro.innerText = "Preencha todos os campos do formulário de cadastro.";
        mensagemErro.style.display = "block";
        return;
    }

    setTimeout(()=> {
        mensagemErro.style.display = 'none';
    }, 3000);

    const novoAluno = new aluno(nome.value, sobrenome.value, email.value, cpf.value, tel.value, idade.value, plano.value)
    console.log(novoAluno);

    aluno.cadastrarAluno(bancoDeDados, novoAluno);
    console.log(bancoDeDados);

    nome.value = '';
    sobrenome.value = '';
    email.value = '';
    cpf = '';
    tel.value = '';
    idade.value = '';
    plano.value = '';
})
atualizarListaAlunos();