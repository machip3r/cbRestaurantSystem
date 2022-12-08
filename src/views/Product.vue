<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Productos</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat color="primary">
          <v-toolbar-title class="toolbar-title">
            Agregar producto
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-form
              ref="formNewProduct"
              v-model="validNewProduct"
              lazy-validation
            >
              <v-row align="center" align-content="center" justify="center">
                <v-col cols="5">
                  <v-row justify="center" align="center" align-content="center">
                    <v-col cols="10">
                      <v-text-field
                        class="mb-n3"
                        v-model="newProduct.p_name"
                        :rules="[(v) => !!v || 'El nombre es obligatorio']"
                        background-color="greyCustom"
                        label="Nombre"
                        flat
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="10">
                      <v-select
                        class="my-n4"
                        v-model="newProduct.id_category"
                        :items="categories"
                        :rules="[
                          (v) => !!v || 'Debe seleccionar una categoria',
                        ]"
                        label="Seleccionar categoria"
                        background-color="greyCustom"
                        flat
                        solo
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        class="mt-n3 mb-n6 pb-n6"
                        v-model="newProduct.p_price"
                        :rules="priceRules"
                        prefix="$"
                        label="Precio de la comida"
                        background-color="greyCustom"
                        flat
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="5">
                  <v-row>
                    <v-col cols="10">
                      <v-textarea
                        rows="4"
                        label="Descripción"
                        v-model="newProduct.p_description"
                        background-color="greyCustom"
                        class="mb-n6 pb-n6"
                        no-resize
                        flat
                        solo
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="10">
                      <v-text-field
                        label="Cantidad del producto"
                        v-model="newProduct.p_stock"
                        background-color="greyCustom"
                        class="mb-n6 pb-n6"
                        type="number"
                        @keydown.enter="submitForm()"
                        flat
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-btn dark large color="accent" @click="submitForm()">
                        {{ btnText }}
                      </v-btn>
                    </v-col>
                    <v-col v-if="updateMode" cols="12">
                      <v-btn color="error" @click="cancelEditProduct()">
                        Cancelar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-alert
              :value="alertNewProduct"
              icon="fas fa-check-circle"
              transition="scale-transition"
              class="mt-5"
              type="success"
            >
              Se añadió un nuevo producto.
            </v-alert>
          </template>
        </v-card-text>
      </v-card>
    </template>

    <template>
      <v-card class="mt-5">
        <v-toolbar flat color="primary">
          <v-select
            v-model="filters"
            :items="categories"
            label="Filtrar por categoria"
            multiple
            class="mb-n6 mt-1"
            flat
            solo
            background-color="third"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0" dense>
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text text-caption">
                (+{{ filters.length - 1 }} más)
              </span>
            </template>
          </v-select>
          <v-select
            v-model="showed"
            :items="show"
            label="Filtrar por estado"
            flat
            solo
            class="mb-n6 mx-8 mt-1"
            background-color="third"
          >
          </v-select>
          <v-text-field
            v-model="search"
            append-icon="fa fa-search"
            label="Buscar"
            single-line
            flat
            solo
            hide-details
            background-color="third"
          ></v-text-field>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="filteredProducts"
          :search="search"
          dense
          class="food_table"
        >
          <template v-slot:[`item.p_price`]="{ item }">
            <span
              class="d-inline-block text-truncate mr-n16"
              style="max-width: 250px"
            >
              $ {{ item.p_price }}
            </span>
          </template>
          <template v-slot:[`item.p_description`]="{ item }">
            <span
              class="d-inline-block text-truncate mr-n16"
              style="max-width: 250px"
            >
              {{ item.p_description }}
            </span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-row align="center" align-content="center">
              <v-switch
                v-model="item.p_status"
                class="mb-5 mr-2"
                color="success"
                false-value="i"
                true-value="a"
                inset
                hide-details
                @change="changeProductState(item)"
              ></v-switch>
              <!-- <v-icon small @click="editProduct(item)"> fas fa-pen </v-icon> -->
              <v-chip
                class="mr-2"
                color="warning"
                text-color="black"
                @click="openUpdateProductDialog(item)"
              >
                <v-icon small> fas fa-pen </v-icon>
              </v-chip>
              <v-chip color="error" @click="openDeleteProductDialog(item)">
                <v-icon color="white" small> fas fa-trash </v-icon>
              </v-chip>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog
      class="toolbar-subtitle"
      v-model="updateProductDialog"
      max-width="500"
    >
      <v-card>
        <v-toolbar class="toolbar-title" color="primary">
          <v-toolbar-title> Editar producto </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  class="mt-2"
                  v-model="actualProduct.p_name"
                  :rules="[(v) => !!v || 'El nombre es obligatorio']"
                  label="Nombre"
                  background-color="greyCustom"
                  ref="updateProductNameInput"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
                <v-select
                  class="mt-2"
                  v-model="actualProduct.id_category"
                  :items="categories"
                  :rules="[(v) => !!v || 'Debe seleccionar una categoria']"
                  label="Seleccionar categoria"
                  background-color="greyCustom"
                  flat
                  solo
                  hide-details
                  required
                ></v-select>
                <v-text-field
                  class="mt-2"
                  v-model="actualProduct.p_price"
                  :rules="priceRules"
                  prefix="$"
                  label="Precio de la comida"
                  background-color="greyCustom"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
                <v-textarea
                  class="mt-2"
                  rows="4"
                  label="Descripción"
                  v-model="actualProduct.p_description"
                  background-color="greyCustom"
                  no-resize
                  flat
                  solo
                  hide-details
                  required
                ></v-textarea>
                <v-text-field
                  class="mt-2"
                  label="Cantidad del producto"
                  v-model="actualProduct.p_stock"
                  background-color="greyCustom"
                  type="number"
                  @keydown.enter="updateProduct()"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-alert
              :value="alertEmptyProduct"
              icon="fas fa-exclamation-circle"
              transition="scale-transition"
              class="mt-2"
              type="error"
            >
              Debes de poner valores correctos o completos.
            </v-alert>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeUpdateProductDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="accent darken-1" text @click="updateProduct()">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteProductDialog" max-width="300">
      <v-card>
        <v-card-title class="card-title-custom"> ¿Estás seguro? </v-card-title>
        <v-card-text class="card-subtitle-custom">
          Esta acción es irreversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeDeleteProductDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteProduct()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Product",

  data: () => ({
    validNewProduct: false,
    dialog: false,
    updateMode: false,
    deleteProductDialog: false,
    updateProductDialog: false,
    alertEmptyProduct: false,
    alertNewProduct: false,
    actualProduct: {},
    priceRules: [
      (v) =>
        /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
        "Cantidad incorrecta",
    ],
    search: "",
    headers: [
      { text: "Categoria", value: "c_name" },
      { text: "Nombre", value: "p_name" },
      { text: "Precio", value: "p_price" },
      { text: "Descripción", value: "p_description" },
      { text: "Stock", value: "p_stock" },
      { text: "Acciones", value: "actions" },
    ],

    products: [],
    filters: [],
    categories: [],
    show: [
      { text: "Todos", value: "all" },
      { text: "Activos", value: "a" },
      { text: "Inactivos", value: "i" },
    ],
    showed: "all",
    newProduct: {},
  }),

  watch: {
    alertEmptyProduct(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyProduct = false), 3000);
    },

    alertNewProduct(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewProduct = false), 3000);
    },
  },

  created() {
    this.getAllProducts();
    this.getAllCategories();
  },

  methods: {
    async getAllProducts() {
      const apiData = await this.axios.get("product/allProducts");
      this.products = apiData.data;
    },

    async getAllCategories() {
      const apiData = await this.axios.get("/category/allCategories");
      apiData.data.forEach((item) => {
        this.categories.push({
          text: item.c_name,
          value: item.id_category,
        });
      });
    },

    async deleteProduct() {
      const body = {
        id_product: this.actualProduct.id_product,
      };
      await this.axios.post("product/deleteProduct", body);
      this.closeDeleteProductDialog();
      this.getAllProducts();
    },

    async addProduct() {
      await this.axios.post("product/addProduct", this.newProduct);

      this.getAllProducts();

      this.newProduct = {};

      this.alertNewProduct = true;

      this.$refs.formNewProduct.reset();
    },

    async updateProduct() {
      /* await this.axios.post("product/updateProduct", this.newProduct); */
      if (
        this.actualProduct.id_product == "" ||
        this.actualProduct.id_product == 0 ||
        this.actualProduct.id_category == "" ||
        this.actualProduct.id_category == 0 ||
        this.actualProduct.p_name == "" ||
        this.actualProduct.p_price == "" ||
        this.actualProduct.p_price == 0 ||
        this.actualProduct.p_description == "" ||
        this.actualProduct.p_stock == ""
      )
        this.alertEmptyProduct = true;
      else {
        await this.axios.post("product/updateProduct", this.actualProduct);

        this.getAllProducts();
        /* this.newProduct = {};
      this.updateMode = false; */
        this.actualProduct = {};
        this.alertEmptyProduct = false;
        /* this.$refs.form.reset(); */
        this.closeUpdateProductDialog();
      }
    },

    async changeProductState(item) {
      const body = {
        id_product: item.id_product,
      };
      if (item.p_status == "i")
        await this.axios.post("product/setInactiveProduct", body);
      else await this.axios.post("product/setActiveProduct", body);
      this.getAllProducts();
    },

    /* editProduct(item) {
      this.updateMode = true;
      this.newProduct = item;
    }, */

    /* cancelEditProduct() {
      this.updateMode = false;
      this.newProduct = {};
      this.$refs.form.reset();
    }, */

    submitForm() {
      if (this.$refs.formNewProduct.validate())
        this.updateMode ? this.updateProduct() : this.addProduct();
    },

    openUpdateProductDialog(product) {
      this.actualProduct = {
        id_product: product.id_product,
        id_category: product.id_category,
        p_name: product.p_name,
        p_price: product.p_price,
        p_description: product.p_description,
        p_stock: product.p_stock,
      };

      this.updateProductDialog = true;
      setTimeout(() => this.$refs.updateProductNameInput.focus(), 250);
    },

    closeUpdateProductDialog() {
      this.actualProduct = {};
      this.updateProductDialog = false;
    },

    openDeleteProductDialog(product) {
      this.actualProduct = product;
      this.deleteProductDialog = true;
    },

    closeDeleteProductDialog() {
      this.actualProduct = {};
      this.deleteProductDialog = false;
    },
  },
  computed: {
    filteredProducts: function () {
      if (this.products.length != 0)
        return this.products
          .filter((product) => {
            let res = false;

            if (this.filters.length > 0)
              this.filters.forEach((filter) => {
                if (filter == product.id_category) res = true;
              });
            else res = true;

            return res;
          })
          .filter((product) => {
            let res = false;

            if (this.showed != "all") {
              if (this.showed == product.p_status) res = true;
            } else res = true;

            return res;
          });
    },

    btnText: function () {
      return this.updateMode ? "Guardar" : "Agregar";
    },
  },

  components: {},
};
</script>
