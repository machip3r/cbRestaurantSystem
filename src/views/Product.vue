<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Productos</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense color="primary">
          <v-toolbar-title class="toolbar-title">
            Agregar producto
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row align="center" align-content="center" justify="center">
                <v-col cols="5">
                  <v-row justify="center" align="center" align-content="center">
                    <!-- <v-col cols="3" class="text-right mt-n3">
                      <h3 class="black--text">Nombre</h3>
                    </v-col> -->
                    <v-col cols="10">
                      <v-text-field
                        class="mb-n3"
                        v-model="newProduct.p_name"
                        :rules="[(v) => !!v || 'El nombre es obligatorio']"
                        background-color="white"
                        label="Nombre"
                        flat
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="3" class="text-right mt-n6">
                      <h3 class="black--text">Categoría</h3>
                    </v-col> -->
                    <v-col cols="10">
                      <v-select
                        class="my-n4"
                        v-model="newProduct.id_category"
                        :items="categories"
                        :rules="[
                          (v) => !!v || 'Debe seleccionar una categoria',
                        ]"
                        label="Seleccionar categoria"
                        background-color="white"
                        required
                        flat
                        solo
                      ></v-select>
                    </v-col>
                    <!-- <v-col cols="3" class="text-right mt-n6">
                      <h3 class="black--text">Precio</h3>
                    </v-col> -->
                    <v-col cols="10">
                      <v-text-field
                        class="mt-n3 mb-n6 pb-n6"
                        v-model="newProduct.p_price"
                        :rules="priceRules"
                        prefix="$"
                        label="Precio de la comida"
                        background-color="white"
                        flat
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="5">
                  <v-row>
                    <!-- <v-col cols="4" class="text-right mt-3">
                      <h3 class="black--text">Descripción</h3>
                    </v-col> -->
                    <v-col cols="10">
                      <v-textarea
                        rows="4"
                        label="Descripción"
                        v-model="newProduct.p_description"
                        background-color="white"
                        class="mb-n6 pb-n6"
                        no-resize
                        flat
                        solo
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <!-- <v-col cols="4" class="text-right mt-3">
                      <h3 class="black--text">Stock</h3>
                    </v-col> -->
                    <v-col cols="10">
                      <v-text-field
                        label="Cantidad del producto"
                        v-model="newProduct.p_stock"
                        background-color="white"
                        class="mb-n6 pb-n6"
                        type="number"
                        flat
                        solo
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
              <v-col cols="2" class="mx-0 my-n5">
                <v-icon small @click="editProduct(item)"> fas fa-pen </v-icon>
              </v-col>
              <v-col cols="2" class="mx-0 my-n5">
                <v-icon small @click="openDeleteProductDialog(item)">
                  fas fa-trash
                </v-icon>
              </v-col>
              <v-col cols="2" class="mx-0 my-n5">
                <v-switch
                  v-model="item.p_status"
                  color="success"
                  false-value="i"
                  true-value="a"
                  dense
                  @change="changeProductState(item)"
                ></v-switch>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog v-model="deleteProductDialog" max-width="300">
      <v-card>
        <v-card-title class="text-h5"> ¿Estás seguro? </v-card-title>
        <v-card-text> Esta acción es irreversible. </v-card-text>
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
    valid: false,
    dialog: false,
    updateMode: false,
    deleteProductDialog: false,
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
      this.$refs.form.reset();
    },

    async updateProduct() {
      await this.axios.post("product/updateProduct", this.newProduct);
      this.getAllProducts();
      this.newProduct = {};
      this.updateMode = false;
      this.$refs.form.reset();
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

    editProduct(item) {
      this.updateMode = true;
      this.newProduct = item;
    },

    cancelEditProduct() {
      this.updateMode = false;
      this.newProduct = {};
      this.$refs.form.reset();
    },

    submitForm() {
      if (this.$refs.form.validate())
        this.updateMode ? this.updateProduct() : this.addProduct();
    },

    openDeleteProductDialog(item) {
      this.actualProduct = item;
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
