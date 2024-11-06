let bancoDeDados =[
    {
        nomeCompleto: {
            nome: "Matheus",
            sobrenome: "Aguiar"
        },
        email: "matheus@gmail.com",
        cpf: "12345678912",
        telefone: "946123714",
        idade: 20
    },
    {
        nomeCompleto: {
            nome: "João",
            sobrenome: "Silva"
        },
        email: "joao.silva@email.com",
        cpf: "12345678900",
        telefone: "987654321",
        idade: 25
    },
    {
        nomeCompleto: {
            nome: "Maria",
            sobrenome: "Santos"
        },
        email: "maria.santos@email.com",
        cpf: "23456789011",
        telefone: "976543210",
        idade: 30
    },
    {
        nomeCompleto: {
            nome: "Carlos",
            sobrenome: "Oliveira"
        },
        email: "carlos.oliveira@email.com",
        cpf: "34567890122",
        telefone: "965432109",
        idade: 28
    }
];
const cadastrar = document.getElementById("cadastrar");
const deletar = document.getElementById("excluir");
const editar = document.getElementById("editar");

const listaAlunos = document.querySelector(".lista-alunos");

const formulario = document.getElementById("secao-form-cad");
const formularioDeletar = document.getElementById("secao-form-deletar");
const telaEditar = document.getElementById("secao-form-editar");
const cpfFormularioEditar = document.getElementById("encontrar-cpf");
const formularioEditar = document.getElementById("editar-info");

const cadBtn = document.getElementById("cad-btn");
const delBtn = document.getElementById("del-btn");
const selecionarBtn = document.getElementById("selecionar-btn");
const edtBtn = document.getElementById("editar-btn");
const cancelarCadBtn= document.getElementById("cancelar-cad");
const cancelarDelBtn = document.getElementById("cancelar-del");
const voltarEditarBtn = document.getElementById("voltar-editar");

const botoes = document.querySelectorAll(".btn-academia");


function tratarCpf(cpf) {
    return cpf.replace(/[^\d]/g, "");
} 

function cpfValido(cpf) {
    cpf = tratarCpf(cpf);

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) 
        return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

function atualizarListaAlunos() {
    listaAlunos.innerHTML = '';

    bancoDeDados.forEach(aluno => {
        const nomeCompleto = `${aluno.nomeCompleto.nome} ${aluno.nomeCompleto.sobrenome}`;
        const email = aluno.email;
        const cpf = aluno.cpf;
        const tel = aluno.telefone;
        const idade = aluno.idade;
            
        const li = document.createElement("li");

        li.innerHTML = `<div id="nome">
            <p .class="nome-aluno">${nomeCompleto}</p>
            <img src="./src/assets/images/mais.png" class="mais-imagem">
        </div>
        <div class="informacao-aluno">
            <div>
                <div><strong>Cpf:</strong> ${cpf}</div>
                <div><strong>E-mail:</strong> ${email}</div>
            </div>
            <div>
                <div><strong>Número:</strong> ${tel} </div>
                <div> <strong>Idade: </strong>${idade}</div>
            </div>
    
        </div>`;
        listaAlunos.appendChild(li);
    });
}

class aluno{
    constructor(nome, sobrenome, email, cpf, telefone, idade) {
        this.nomeCompleto = {
            nome,
            sobrenome
        }
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone
        this.idade = idade;
    }

    static cadastrarAluno(bancoDeDados, aluno) {
        bancoDeDados.push(aluno);
    }

    static excluirAluno(bancoDeDados, index) {
        bancoDeDados.splice(index, 1);
    }

    static editarAluno(bancoDeDados, index, nomeEditar,sobrenomeEditar, emailEditar, telefoneEditar, idadeEditar){
        bancoDeDados[index] = {
            nomeCompleto: {
                nome: nomeEditar,
                sobrenome: sobrenomeEditar
            },
            email: emailEditar,
            telefone: telefoneEditar,
            idade: idadeEditar
        }  
    }
}

cadastrar.addEventListener("click", () => {
    listaAlunos.style.display = "none";
    botoes.forEach((element) => element.style.display = 'none');
    formulario.style.display = "flex"
});

deletar.addEventListener("click", () => {
    listaAlunos.style.display = "none";
    botoes.forEach((element) => element.style.display = 'none');
    formularioDeletar.style.display = "flex";
});

editar.addEventListener("click", () => {
    listaAlunos.style.display = "none";
    botoes.forEach((element) => element.style.display = 'none');
    telaEditar.style.display = "flex"
});

cadBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    const nome = document.getElementById('input-nome');
    const sobrenome = document.getElementById('input-sobrenome');
    const email = document.getElementById('input-email');
    const cpf = document.getElementById('input-cpf');
    const tel = document.getElementById('input-tel');
    const idade = document.getElementById('input-idade');
    const mensagemErro = document.getElementById('mensagem-erro');
    const id = bancoDeDados.length;

    if(!nome.value || !sobrenome.value || !email.value || !cpf.value || !tel.value || !idade.value){
        mensagemErro.innerText = "Preencha todos os campos do formulário de cadastro.";
        mensagemErro.style.display = "block";
        setTimeout(()=> {
            mensagemErro.style.display = 'none';
        }, 5000);
        return;
    }

    const cpfExistente = bancoDeDados.find((element) =>element.cpf === cpf.value);
    
    if(cpfExistente) {
        mensagemErro.innerText = "Aluno já cadastrado.";
        mensagemErro.style.display = "block";
        setTimeout(()=> {
            mensagemErro.style.display = 'none';
        }, 5000);
        return;
    }

    cpfValido(cpf.value);

    

    const novoAluno = new aluno(nome.value, sobrenome.value, email.value, cpf.value, tel.value, idade.value);
    aluno.cadastrarAluno(bancoDeDados, novoAluno);

    nome.value = '';
    sobrenome.value = '';
    email.value = '';
    cpf.value = '';
    tel.value = '';
    idade.value = '';


    atualizarListaAlunos();
    
    listaAlunos.style.display = "flex";
    botoes.forEach((element) => element.style.display = 'flex');
    formulario.style.display = "none"

})

listaAlunos.addEventListener("click", (event) => {
    const itemSelecionado = event.target.closest("li");
    if (!itemSelecionado) return;

    document.querySelectorAll(".lista-alunos li").forEach((li) => {
        li.classList.remove("selecionado");
    });

    itemSelecionado.classList.add("selecionado");
});

delBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const mensagem = document.getElementById("mensagem");
    const cpfInput = document.getElementById("input-aluno-deletar");
    const mensagemErro = document.getElementById("mensagem-erro");
    
    if(!cpfInput.value) {
        mensagemErro.innerText = "Preencha o campo cpf para deletar!";
        mensagemErro.style.display = "block";
        setTimeout(()=> {
            mensagemErro.style.display = 'none';
        }, 5000);
        return;
    }

    const cpf = tratarCpf(cpfInput.value);
    

    const index = bancoDeDados.findIndex(aluno => aluno.cpf === cpf);
    if (index !== -1) {
        mensagem.innerText = `O aluno ${bancoDeDados[index].nomeCompleto.nome} ${bancoDeDados[index].nomeCompleto.sobrenome} foi removido.`;
    } else {
        mensagemErro.innerText = "Aluno não encontrado";
    mensagemErro.style.display = "block";
    setTimeout(()=> {
        mensagemErro.style.display = 'none';
    }, 5000);
    return;
    }

    listaAlunos.style.display = "flex";
    botoes.forEach((element) => element.style.display = 'flex');
    formularioDeletar.style.display = "none";
    mensagem.style.display = "block";
    setTimeout(()=> {
        mensagem.style.display = 'none';
    }, 5000);
    aluno.excluirAluno(bancoDeDados, index);
    atualizarListaAlunos();
});

selecionarBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    let cpfEditar = document.getElementById("input-aluno-editar");

    const mensagemErro = document.getElementById("mensagem-erro");

    if(!cpfEditar.value) {
        mensagemErro.innerText = "Preencha o campo com o cpf para editar!";
        mensagemErro.style.display = "block";
        setTimeout(()=> {
            mensagemErro.style.display = 'none';
        }, 5000);
        return;
    }
    cpfEditar = tratarCpf(cpfEditar.value);

    const index = bancoDeDados.findIndex(aluno => aluno.cpf === cpfEditar);
    if (index === -1) {
        mensagemErro.innerText = "Aluno não encontrado";
        mensagemErro.style.display = "block";
        setTimeout(()=> {
            mensagemErro.style.display = 'none';
        }, 5000);
        return;
    }
    cpfFormularioEditar.style.display = "none";
    formularioEditar.style.display = "flex";

    const nomeEditar = document.getElementById("input-nome-editar");
    const sobrenomeEditar = document.getElementById("input-sobrenome-editar");
    const emailEditar = document.getElementById("input-email-editar");
    const telefoneEditar = document.getElementById("input-tel-editar");
    const idadeEditar = document.getElementById("input-idade-editar");

    nomeEditar.value = bancoDeDados[index].nomeCompleto.nome;
    sobrenomeEditar.value =  bancoDeDados[index].nomeCompleto.sobrenome;
    emailEditar.value =  bancoDeDados[index].email;
    telefoneEditar.value = bancoDeDados[index].telefone;
    idadeEditar.value = bancoDeDados[index].idade;

    edtBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        
        aluno.editarAluno(bancoDeDados, index, nomeEditar.value,sobrenomeEditar.value, emailEditar.value, telefoneEditar.value, idadeEditar.value)
        atualizarListaAlunos();
        cpfFormularioEditar.style.display = "flex";
        formularioEditar.style.display = "none";
        listaAlunos.style.display = "flex";
        telaEditar.style.display = "none";
        botoes.forEach((element) => element.style.display = 'flex');
    });
})

cancelarCadBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    listaAlunos.style.display = "flex";
    botoes.forEach((element) => element.style.display = 'flex');
    formulario.style.display = "none";
    const nome = document.getElementById('input-nome');
    const sobrenome = document.getElementById('input-sobrenome');
    const email = document.getElementById('input-email');
    const cpf = document.getElementById('input-cpf');
    const tel = document.getElementById('input-tel');
    const idade = document.getElementById('input-idade');
    const mensagemErro = document.getElementById('mensagem-erro');

    nome.value = '';
    sobrenome.value = '';
    email.value = '';
    cpf.value = '';
    tel.value = '';
    idade.value = '';
});

cancelarDelBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    listaAlunos.style.display = "flex";
    botoes.forEach((element) => element.style.display = 'flex');
    formularioDeletar.style.display = "none";

    const cpf = document.getElementById("input-aluno-deletar");
    cpf.value = "";
})

voltarEditarBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    listaAlunos.style.display = "flex";
    botoes.forEach((element) => element.style.display = 'flex');
    telaEditar.style.display = "none";
});


atualizarListaAlunos();