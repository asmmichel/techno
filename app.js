new Vue({
  el: "#app",
  data: {
    arrayOBJProdutos: [],
    dadosProduto: false,
    carrinho: [],
    carrinhoAtivo: true,
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
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho)
    }
  },
  filters: {
    precoFormatado(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
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
    },
    removerDoCarinho(index) {
      this.carrinho.splice(index, 1)
    },
  },
  created() {
    this.fazerFetchGithub();
    this.puxarLocalStorage();
  },
})