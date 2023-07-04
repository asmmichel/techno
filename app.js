new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
  },
  methods: {
    async fazerFetchGithub() {
      this.arrayOBJProdutos = await (await fetch("./api/produtos.json")).json()
    },
  },
  created() {
    this.fazerFetchGithub();
  },
})