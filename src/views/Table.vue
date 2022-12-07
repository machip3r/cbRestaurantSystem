<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Mesas</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat color="primary">
          <v-toolbar-title class="toolbar-title">
            Agregar mesa
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-row justify="center" align="center" align-content="center">
              <v-col cols="9">
                <v-text-field
                  class="my-2"
                  v-model="newTable.b_tag"
                  background-color="greyCustom"
                  label="Nombre o etiqueta de la mesa"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  :loading="loadingAddTable"
                  :disabled="loadingAddTable"
                  color="accent"
                  @click="addTable()"
                >
                  Agregar
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon size="18">fas fa-sync-alt</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <v-alert
            :value="alertNewTable"
            icon="fas fa-check-circle"
            transition="scale-transition"
            class="mt-2"
            type="success"
          >
            Se añadió una nueva mesa.
          </v-alert>
          <v-alert
            :value="alertEmptyNewTable"
            icon="fas fa-exclamation-circle"
            transition="scale-transition"
            class="mt-2"
            type="error"
          >
            Debes de asignar una etiqueta o nombre a la mesa.
          </v-alert>
        </v-card-text>
      </v-card>
    </template>

    <template>
      <v-card class="mt-5">
        <v-data-table
          :headers="headersTables"
          :items="tables"
          multi-sort
          class="elevation-1"
        >
          <template v-slot:[`item.b_disponibility`]="{ item }">
            <v-chip
              :text-color="
                getDisponibilityColor(item) != 'success' ? 'black' : 'white'
              "
              :color="getDisponibilityColor(item)"
            >
              {{ getDisponibilityText(item) }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-chip
              class="mr-2"
              color="info"
              text-color="black"
              v-if="item.b_disponibility != 'a'"
              @click="openSuborderDialog(item)"
            >
              <v-icon class="mr-2" small> fas fa-eye </v-icon>
              Ver
            </v-chip>
            <v-chip
              class="mr-2"
              color="warning"
              text-color="black"
              @click="openUpdateTableDialog(item)"
            >
              <v-icon small> fas fa-pen </v-icon>
            </v-chip>
            <v-chip
              class="mr-2"
              color="error"
              @click="openDeleteTableDialog(item)"
            >
              <v-icon small> fas fa-trash </v-icon>
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog
      class="toolbar-subtitle"
      v-model="suborderDialog"
      max-width="1000"
    >
      <v-card>
        <v-toolbar class="toolbar-title" color="primary">
          <v-toolbar-title> Mesa "{{ this.actualTag }}" </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          class="container-inside"
          :headers="headersTable"
          :items="suborders"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="openDeleteSuborderDialog(item)" small>
              fas fa-trash
            </v-icon>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeSubordersDialog()">
            Cerrar
          </v-btn>
          <v-btn color="accent darken-1" text @click="openAddSuborderDialog()">
            Agregar Suborden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class="toolbar-subtitle"
      v-model="addSuborderDialog"
      max-width="500"
    >
      <v-card>
        <v-toolbar class="toolbar-title" color="primary">
          <v-toolbar-title> Nuevo pedido </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="card-subtitle-custom">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  class="mt-2"
                  v-model="newSuborder.s_tag"
                  background-color="greyCustom"
                  label="Etiqueta"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
                <v-select
                  class="mt-2"
                  flat
                  solo-inverted
                  hide-details
                  :items="products"
                  v-model="newSuborder.id_product"
                  label="Producto"
                >
                </v-select>
                <v-text-field
                  class="mt-2"
                  v-model="newSuborder.s_cuantity"
                  background-color="greyCustom"
                  label="Cantidad"
                  type="number"
                  min="1"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeAddSuborderDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="accent darken-1" text @click="addSuborder()">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class="toolbar-subtitle"
      v-model="updateTableDialog"
      max-width="500"
    >
      <v-card>
        <v-toolbar class="toolbar-title" color="primary">
          <v-toolbar-title> Editar mesa </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  class="my-2"
                  v-model="actualTable.b_tag"
                  background-color="greyCustom"
                  label="Nombre o etiqueta de la mesa"
                  ref="updateTableInput"
                  @keydown.enter="updateTable()"
                  flat
                  solo
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-alert
              :value="alertEmptyTableTag"
              icon="fas fa-exclamation-circle"
              transition="scale-transition"
              class="mt-2"
              type="error"
            >
              Debes de asignar una etiqueta o nombre a la mesa.
            </v-alert>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeUpdateTableDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="accent darken-1" text @click="updateTable()">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteTableDialog" max-width="300">
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
            @click="closeDeleteTableDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteTable()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteSuborderDialog" max-width="300">
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
            @click="closeDeleteSuborderDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteSuborder()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Table",

  data() {
    return {
      headersTables: [
        { text: "Etiqueta", value: "b_tag", class: "primary" },
        {
          text: "Estado",
          value: "b_disponibility",
          class: "primary",
          align: "center",
        },
        {
          text: "Acciones",
          value: "actions",
          class: "primary",
          align: "end",
        },
      ],
      headersTable: [
        { text: "Etiqueta", value: "s_tag" },
        { text: "Comida", value: "p_name" },
        { text: "Cantidad", value: "s_cuantity" },
        { text: "Costo", value: "s_price" },
        { text: "Acciones", value: "actions" },
      ],
      newTable: {
        b_tag: "",
      },
      newSuborder: {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      },

      actualIDTable: 0,
      actualTag: "",
      actualTable: {},
      actuaIDOrder: 0,
      actualIDSuborder: 0,

      tables: [],
      activeTables: [],
      spaces: [],
      suborders: [],
      products: [],
      orden_correct: [],

      suborderDialog: false,
      addSuborderDialog: false,
      loader: null,
      loadingAddTable: false,
      alertNewTable: false,
      alertEmptyNewTable: false,
      alertEmptyTableTag: false,
      updateTableDialog: false,
      deleteTableDialog: false,
      deleteSuborderDialog: false,
    };
  },

  created() {
    this.getTables();
    this.getActiveTables();
    this.getAllProducts();
    this.getTableOrders();
  },

  watch: {
    updateTableDialog(isOpen) {
      if (!isOpen) this.closeUpdateTableDialog();
    },

    deleteTableDialog(isOpen) {
      if (!isOpen) this.closeDeleteTableDialog();
    },

    deleteSuborderDialog(isOpen) {
      if (!isOpen) this.closeDeleteSuborderDialog();
    },

    suborderDialog(isOpen) {
      if (!isOpen) this.closeSubordersDialog();
    },

    addSuborderDialog(isOpen) {
      if (!isOpen) this.closeAddSuborderDialog();
    },

    alertNewTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewTable = false), 3000);
    },

    alertEmptyNewTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyNewTable = false), 3000);
    },

    alertEmptyTableTag(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyTableTag = false), 3000);
    },
  },

  methods: {
    async addTable() {
      this.loader = "loadingAddTable";
      this.loadingAddTable = true;

      if (this.newTable.b_tag != "") {
        await this.axios.post("table/addTable", this.newTable);
        this.alertNewTable = true;
      } else this.alertEmptyNewTable = true;

      this.getTables();
      this.getActiveTables();
      this.newTable.b_tag = "";
      this.newTable = {};
      this.loader = null;
      this.loadingAddTable = false;
    },

    async updateTable() {
      if (this.actualTable.b_tag == "") alertEmptyTableTag = true;
      else {
        await this.axios.post("table/updateTable", this.actualTable);

        this.closeUpdateTableDialog();
        this.getTables();
        this.getActiveTables();
      }
    },

    async deleteTable() {
      const body = {
        id_board: this.actualIDTable,
      };

      await this.axios.post("table/deleteTable", body);

      this.closeDeleteTableDialog();
      this.getTables();
      this.getActiveTables();
    },

    async getTables() {
      const apiData = await this.axios.get("table/allTables/");

      this.tables = apiData.data;
    },

    async getActiveTables() {
      const apiData = await this.axios.get("table/allActiveTables/");

      apiData.data.forEach((table) =>
        this.activeTables.push({
          text: table.b_tag,
          value: table.id_board,
        })
      );
    },

    async getSuborders(id_board, id_order) {
      const apiData = await this.axios.get(
        "table/allSuborders/" + id_board.toString() + "/" + id_order.toString()
      );

      this.suborders = apiData.data;
      this.suborderDialog = true;
    },

    async getTableOrder(id_board) {
      const apiData = await this.axios.get("table/getTableOrder/" + id_board);

      return apiData.data[0]["id_order"];
    },

    async getTableTag(id_board) {
      const apiData = await this.axios.get("table/getTableTag/" + id_board);

      this.actualTag = apiData.data[0]["b_tag"];
    },

    async getAllProducts() {
      const apiData = await this.axios.get("product/allProducts");

      apiData.data.forEach((product) => {
        if (product.p_status == "a")
          this.products.push({
            text: product.p_name,
            value: product.id_product,
          });
      });
    },

    async addSuborder() {
      await this.axios.post("table/addSuborder/", this.newSuborder);

      this.getSuborders(this.actualIDTable, this.actuaIDOrder);

      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };

      this.addSuborderDialog = false;
    },

    async getTableOrders() {
      const apiData = await this.axios.get("table/orderTable/");

      apiData.data.forEach((orden_c) =>
        this.orden_correct.push({
          text: orden_c.b_tag,
          value: orden_c.id_order,
        })
      );
    },

    async deleteSuborder() {
      const data = {
        id_suborder: this.actualIDSuborder,
      };

      await this.axios.post("table/deleteSuborder", data);

      this.closeDeleteSuborderDialog();
      this.getSuborders(this.actualIDTable, this.actuaIDOrder);
    },

    getDisponibilityText(table) {
      return table.b_disponibility != "a" ? "Ocupada" : "Disponible";
    },

    getDisponibilityColor(table) {
      return table.b_disponibility != "a" ? "warning" : "success";
    },

    openUpdateTableDialog(table) {
      this.actualTable = {
        id_board: table.id_board,
        b_tag: table.b_tag,
      };

      this.updateTableDialog = true;
      setTimeout(() => this.$refs.updateTableInput.focus(), 250);
    },

    closeUpdateTableDialog() {
      this.actualTable = {};
      this.alertEmptyTableTag = false;
      this.updateTableDialog = false;
    },

    openDeleteTableDialog(table) {
      this.actualIDTable = table.id_board;
      this.deleteTableDialog = true;
    },

    closeDeleteTableDialog() {
      this.actualIDTable = 0;
      this.deleteTableDialog = false;
    },

    openDeleteSuborderDialog(suborder) {
      this.actualIDSuborder = suborder.id_suborder;
      this.deleteSuborderDialog = true;
    },

    closeDeleteSuborderDialog() {
      this.actualIDSuborder = 0;
      this.deleteSuborderDialog = false;
    },

    async openSuborderDialog(table) {
      let id_order = await this.getTableOrder(table.id_board);
      this.actuaIDOrder = id_order;

      this.getTableTag(table.id_board);
      this.getSuborders(table.id_board, id_order);

      this.suborderDialog = true;
      this.actualIDTable = table.id_board;
      this.newSuborder.id_order = this.actuaIDOrder;
    },

    closeSubordersDialog() {
      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };

      this.suborderDialog = false;
      this.actualIDTable = 0;
      this.actuaIDOrder = 0;
    },

    openAddSuborderDialog() {
      this.addSuborderDialog = true;
    },

    closeAddSuborderDialog() {
      this.addSuborderDialog = false;
    },
  },

  components: {},
};
</script>
