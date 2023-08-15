new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    dadosProduto: {},
  },
  methods: {
    async fazerFetchGithub() {
      this.arrayOBJProdutos = await (await fetch("./api/produtos.json")).json()
    },
    async fazerFetchPastaProdutos(objProdutoId) {
      this.dadosProduto = await (await fetch(`./api/produtos/${objProdutoId}/dados.json`)).json()
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