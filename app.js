new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    dadosProduto: false,
    carrinho: [],
    carrinhoTotal: 0,
    carrinhoAtivo: true,
  },
  methods: {
    async fazerFetchGithub() {
      this.arrayOBJProdutos = await (await fetch("./api/produtos.json")).json()
    },
    async fazerFetchPastaProdutos(objProdutoId) {
      this.dadosProduto = await (await fetch(`./api/produtos/${objProdutoId}/dados.json`)).json()
    },
    abrirOModal(objProdutoId) {
      this.fazerFetchPastaProdutos(objProdutoId);
      window.scrollTo({top: 0, behavior: "smooth"})
    },
    fecharOModal({target, currentTarget}) {
      if(target === currentTarget) this.dadosProduto = false;
    },
    fecharOCarrinhoModal({target, currentTarget}) {
      if(target === currentTarget) this.carrinhoAtivo = false;
    },
    adicionarNoCarrinho() {
      const { id, nome, preco } = this.dadosProduto
      this.carrinho.push({ id, nome, preco })
    },
    puxarLocalStorage() {
      if(window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },
  filters: {
    precoFormatado(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  created() {
    this.fazerFetchGithub();
    this.puxarLocalStorage();
  },
})