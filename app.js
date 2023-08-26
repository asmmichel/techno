new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    dadosProduto: false,
    carrinho: [],
    carrinhoAtivo: false,
    alertaAtivo: false,
    alertaMensagem: "Item adicionado",
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach(item => {
          total += item.preco;
        })
      }
      return total;
    }
  },
  watch: {
    dadosProduto() {
      if(this.dadosProduto) {
        this.verificarOEstoque();
      }
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    }
  },
  filters: {
    precoFormatado(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  methods: {
    async fazerFetchGithub() {
      this.arrayOBJProdutos = await (await fetch("./api/produtos.json")).json();
    },
    async fazerFetchPastaProdutos(objProdutoId) {
      this.dadosProduto = await (await fetch(`./api/produtos/${objProdutoId}/dados.json`)).json();
    },
    abrirOModal(objProdutoId) {
      this.fazerFetchPastaProdutos(objProdutoId);
      window.scrollTo({top: 0, behavior: "smooth"});
    },
    fecharOModal({target, currentTarget}) {
      if(target === currentTarget) this.dadosProduto = false;
    },
    fecharOCarrinhoModal({target, currentTarget}) {
      if(target === currentTarget) this.carrinhoAtivo = false;
    },
    adicionarNoCarrinho() {
      this.dadosProduto.estoque--;
      const { id, nome, preco } = this.dadosProduto;
      this.carrinho.push({ id, nome, preco });
      this.aparecerAlerta(`${nome} adicionado ao carrinho.`);
    },
    verificarOEstoque() {
      this.dadosProduto.estoque -= this.carrinho.filter(({id}) => id === this.dadosProduto.id).length;
    },
    puxarLocalStorage() {
      if(window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    removerDoCarinho(index) {
      this.carrinho.splice(index, 1);
    },  
    aparecerAlerta(alertaMensagem) {
      this.alertaMensagem = alertaMensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
  },
  created() {
    this.fazerFetchGithub();
    this.puxarLocalStorage();
  },
})