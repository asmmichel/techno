new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    testeDeGit: "Olá!"
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