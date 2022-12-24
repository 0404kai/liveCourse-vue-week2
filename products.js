import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "darrenhsu",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          // 驗證成功，取得產品資料
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          // 若驗證失敗，則導回登入頁面
          window.location = "login.html";
        });
    },
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 取出 Token，並放入 axios 的預設配置中
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
});

app.mount("#app");
