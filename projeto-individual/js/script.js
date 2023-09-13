class Jogo {
  constructor(nome, plataforma, estoque) {
    this.nome = nome;
    this.plataforma = plataforma;
    this.estoque = estoque;
  }
}

class Loja {
  constructor() {
    this.jogos = [];
    this.modal = document.getElementById('modal');
    this.modalTitle = document.getElementById('modal-title');
    this.jogoForm = document.getElementById('jogo-form');
    this.jogosList = document.getElementById('jogos-list');
    this.adicionarBtn = document.getElementById('adicionar-btn');
    this.salvarBtn = document.getElementById('salvar-btn');
    this.cancelarBtn = document.getElementById('cancelar-btn');
    this.closeBtn = document.getElementsByClassName('close')[0];

    this.adicionarBtn.addEventListener('click', () =>
      this.mostrarModal('Adicionar Jogo')
    );
    this.cancelarBtn.addEventListener('click', () => this.fecharModal());
    this.closeBtn.addEventListener('click', () => this.fecharModal());
    this.jogoForm.addEventListener('submit', (e) => this.onSubmit(e));

    this.salvarBtn.addEventListener('click', () => {
      const novoNome = document.getElementById('nome').value;
      const novaPlataforma = document.getElementById('plataforma').value;
      const novoEstoque = parseInt(document.getElementById('estoque').value);

      if (novoNome && novaPlataforma && !isNaN(novoEstoque)) {
        const novoJogo = new Jogo(novoNome, novaPlataforma, novoEstoque);
        this.editarJogo(index, novoJogo);
        this.atualizarListaJogos();
        this.fecharModal();
      }
    });
  }

  adicionarJogo(jogo) {
    this.jogos.push(jogo);
  }

  editarJogo(index, novoJogo) {
    this.jogos[index] = novoJogo;
  }

  excluirJogo(index) {
    this.jogos.splice(index, 1);
    this.atualizarListaJogos();
  }

  listarJogos() {
    return this.jogos;
  }

  mostrarModal(titulo) {
    this.modal.style.display = 'block';
    this.modalTitle.textContent = titulo;
    this.jogoForm.reset();
  }

  fecharModal() {
    this.modal.style.display = 'none';
  }

  onSubmit(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const plataforma = document.getElementById('plataforma').value;
    const estoque = parseInt(document.getElementById('estoque').value);

    if (nome && plataforma && !isNaN(estoque)) {
      const jogo = new Jogo(nome, plataforma, estoque);
      this.adicionarJogo(jogo);
      this.atualizarListaJogos();
      this.fecharModal();
    }
  }

  atualizarListaJogos() {
    this.jogosList.innerHTML = '';
    const jogos = this.listarJogos();
    jogos.forEach((jogo, index) => {
      const item = document.createElement('div');
      item.innerHTML = `
              <p><strong>Nome:</strong> ${jogo.nome}</p>
              <p><strong>Plataforma:</strong> ${jogo.plataforma}</p>
              <p><strong>Estoque:</strong> ${jogo.estoque}</p>
              <button onclick="loja.editarJogo(${index})">Editar</button>
              <button id="cancelar-btn" onclick="loja.excluirJogo(${index})">Excluir</button>
          `;
      this.jogosList.appendChild(item);
    });
  }

  editarJogo(index) {
    this.mostrarModal('Editar Jogo');
    const jogo = this.listarJogos()[index];
    document.getElementById('nome').value = jogo.nome;
    document.getElementById('plataforma').value = jogo.plataforma;
    document.getElementById('estoque').value = jogo.estoque;

    this.jogosList.setAttribute('data-index', index);
    this.salvarBtn.removeEventListener('click', this.onSalvarClick);
    this.salvarBtn.addEventListener('click', this.onSalvarClick);
  }

  onSalvarClick() {
    const novoNome = document.getElementById('nome').value;
    const novaPlataforma = document.getElementById('plataforma').value;
    const novoEstoque = parseInt(document.getElementById('estoque').value);

    if (novoNome && novaPlataforma && !isNaN(novoEstoque)) {
      const index = this.jogosList.getAttribute('data-index');
      const novoJogo = new Jogo(novoNome, novaPlataforma, novoEstoque);
      this.editarJogo(index, novoJogo);
      this.atualizarListaJogos();
      this.fecharModal();
    }
  }

  excluirJogo(index) {
    this.jogos.splice(index, 1);
    this.atualizarListaJogos();
  }
}

const loja = new Loja();
