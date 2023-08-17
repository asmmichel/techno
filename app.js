new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    dadosProduto: false,
    carrinho: [],
    carrinhoTotal: 0,
    carrinhoAtivo: false,
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
      this.carrinho.push(this.dadosProduto.nome)
    },
  },
  filters: {
    precoFormatado(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  created() {
    this.fazerFetchGithub();
  },
})