let bancoDeDados = [];

const cadastrar = document.getElementById("cadastrar")

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

cadBtn.addEventListener("click", ()=>{
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


