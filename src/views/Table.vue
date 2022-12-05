<template>
  <v-container>
    <h1>Mesas</h1>
    <!-- <v-container>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="4">
          <v-btn
            class="mx-15 ma-3"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(1, this.activeTables)"
            @click="
              (suborderDialog = true),
                (actualTable = 1),
                (actuaIDOrder = orden_correct[0]['value']),
                getSuborders(1, orden_correct[0]['value']),
                (newSuborder.id_order = orden_correct[0]['value'])
            "
          >
            Mesa 1 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[0]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(2, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '2'),
                    (actuaIDOrder = orden_correct[1]['value']),
                    getSuborders(2, orden_correct[1]['value']),
                    (newSuborder.id_order = orden_correct[1]['value'])
                "
              >
                Mesa 2 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[1]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(3, this.activeTables)"
                @click="
                  actualTable = '3';

                  (actuaIDOrder = orden_correct[2]['value']),
                    getSuborders(3, orden_correct[2]['value']),
                    (suborderDialog = true),
                    (newSuborder.id_order = orden_correct[2]['value']);
                "
              >
                Mesa 3 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[2]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(4, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '4'),
                    (actuaIDOrder = orden_correct[3]['value']),
                    getSuborders(4, orden_correct[3]['value']),
                    (newSuborder.id_order = orden_correct[3]['value'])
                "
              >
                Mesa 4 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[3]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(5, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '5'),
                    (actuaIDOrder = orden_correct[4]['value']),
                    getSuborders(5, orden_correct[4]['value']),
                    (newSuborder.id_order = orden_correct[4]['value'])
                "
              >
                Mesa 5 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[4]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-btn
            class="mx-15"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(6, this.activeTables)"
            @click="
              (suborderDialog = true), (actualTable = '6');

              (actuaIDOrder = orden_correct[5]['value']),
                getSuborders(6, orden_correct[5]['value']),
                (newSuborder.id_order = orden_correct[5]['value']);
            "
          >
            Mesa 6 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[5]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>
      </v-row>

      <v-row max-height="50%">
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(7, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '7'),
                    (actuaIDOrder = orden_correct[6]['value']),
                    getSuborders(7, orden_correct[6]['value']),
                    (newSuborder.id_order = orden_correct[6]['value'])
                "
              >
                Mesa 7 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[6]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(8, this.activeTables)"
                @click="
                  actualTable = '8';

                  (actuaIDOrder = orden_correct[7]['value']),
                    getSuborders(8, orden_correct[7]['value']),
                    (newSuborder.id_order = orden_correct[7]['value']);
                "
              >
                Mesa 8 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[7]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(9, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '9'),
                    (actuaIDOrder = orden_correct[8]['value']),
                    getSuborders(9, orden_correct[8]['value']),
                    (newSuborder.id_order = orden_correct[8]['value'])
                "
              >
                Mesa 9 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[8]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(10, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '10'),
                    (actuaIDOrder = orden_correct[9]['value']),
                    getSuborders(10, orden_correct[9]['value']),
                    (newSuborder.id_order = orden_correct[9]['value'])
                "
              >
                Mesa 10 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[9]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-btn
            class="mx-15"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(11, this.activeTables)"
            @click="
              (suborderDialog = true), (actualTable = '11');
              (actuaIDOrder = orden_correct[10]['value']),
                getSuborders(11, orden_correct[10]['value']),
                (newSuborder.id_order = orden_correct[10]['value']);
            "
          >
            Mesa 11 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[10]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(12, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '12'),
                    (actuaIDOrder = orden_correct[11]['value']),
                    getSuborders(12, orden_correct[11]['value']),
                    (newSuborder.id_order = orden_correct[11]['value'])
                "
              >
                Mesa 12 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[11]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(13, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '13'),
                    (actuaIDOrder = orden_correct[12]['value']),
                    getSuborders(13, orden_correct[12]['value']),
                    (newSuborder.id_order = orden_correct[12]['value'])
                "
              >
                Mesa 13 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[12]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(14, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '14'),
                    (actuaIDOrder = orden_correct[13]['value']),
                    getSuborders(14, orden_correct[13]['value']),
                    (newSuborder.id_order = orden_correct[13]['value'])
                "
              >
                Mesa 14 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[13]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(15, this.activeTables)"
                @click="
                  (suborderDialog = true),
                    (actualTable = '15'),
                    (actuaIDOrder = orden_correct[14]['value']),
                    getSuborders(15, orden_correct[14]['value']),
                    (newSuborder.id_order = orden_correct[14]['value'])
                "
              >
                Mesa 15 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[14]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->

    <v-card color="grey lighten-4">
      <v-toolbar dark flat dense color="primary">
        <v-toolbar-title>Agregar mesa</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="container-inside">
        <template>
          <v-row justify="center" align="center" align-content="center">
            <v-col cols="10">
              <v-text-field
                class="mt-5"
                v-model="newTable.b_tag"
                background-color="white"
                label="Nombre o etiqueta de la mesa"
                flat
                solo
                required
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn
                class="mb-2"
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
      </v-card-text>
    </v-card>
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

    <v-container>
      <v-row>
        <v-col>
          <!-- <v-data-table
            :headers="headers"
            :items="tables"
            :sort-by="['calories', 'fat']"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
          ></v-data-table> -->
          <v-data-table
            :headers="headersTables"
            :items="tables"
            multi-sort
            class="elevation-1"
          >
            <template v-slot:[`item.b_disponibility`]="{ item }">
              <v-chip :color="getDisponibilityColor(item)">
                {{ getDisponibilityText(item) }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                v-if="item.b_disponibility != 'a'"
                @click="openSuborderDialog(item)"
                small
              >
                fas fa-eye
              </v-icon>
              <v-icon @click="updateTable(item)" small> fas fa-pen </v-icon>
              <v-icon @click="deleteTable(item)" small> fas fa-trash </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      class="toolbar-subtitle"
      v-model="suborderDialog"
      max-width="1000"
    >
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title> Mesa {{ this.actualTag }} </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          class="container-inside"
          :headers="headersTable"
          :items="suborders"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="deleteSuborder(item)" small> fas fa-trash </v-icon>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeSubordersDialog()">
            Cerrar
          </v-btn>
          <v-btn color="green darken-1" text @click="openNewSuborderDialog()">
            Agregar Suborden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      class="toolbar-subtitle"
      v-model="newSuborderDialog"
      max-width="500"
    >
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title> Nuevo pedido </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field v-model="newSuborder.s_tag" label="Etiqueta">
                </v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="products"
                  label="Producto"
                  v-model="newSuborder.id_product"
                >
                </v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="newSuborder.s_cuantity"
                  label="Cantidad"
                  type="Number"
                  min="1"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="cancelarAddSub()">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="addSuborder()">
            Agregar
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
        { text: "Estado", value: "b_disponibility", class: "primary" },
        { text: "Acciones", value: "actions", class: "primary" },
      ],
      headersTable: [
        { text: "Etiqueta", value: "s_tag" },
        { text: "Comida", value: "p_name" },
        { text: "Cantidad", value: "s_cuantity" },
        { text: "Costo", value: "s_price" },
        { text: "Acciones", value: "actions" },
      ],
      posicion: "0",
      newSuborder: {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      },
      newTable: {
        b_tag: "",
      },

      actualTable: "",
      actualTag: "",
      actuaIDOrder: 0,

      tables: [],
      activeTables: [],
      spaces: [],
      suborders: [],
      products: [],
      orden_correct: [],

      suborderDialog: false,
      newSuborderDialog: false,
      loader: null,
      loadingAddTable: false,
      alertNewTable: false,
      alertEmptyNewTable: false,
    };
  },

  created() {
    /* this.getSpacesTables(); */
    this.getTables();
    this.getActiveTables();
    this.getAllProducts();
    this.getTableOrders();
  },

  watch: {
    suborderDialog(isOpen) {
      if (!isOpen) this.closeSubordersDialog();
    },

    newSuborderDialog(isOpen) {
      if (!isOpen) this.cancelarAddSub();
    },
    alertNewTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewTable = false), 3000);
    },

    alertEmptyNewTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyNewTable = false), 3000);
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

    async updateTable(table) {
      // open dialog
      /* this.updatingEmployee.e_name = empleado.e_name;
      this.updatingEmployee.e_password = empleado.e_password;
      this.updatingEmployee.e_email = empleado.e_email;
      this.updatingEmployee.e_status = empleado.e_status;
      this.updatingEmployee.e_phone = empleado.e_phone;
      this.updatingEmployee.e_admin = empleado.e_admin;
      this.updatingEmployee.id_employee = empleado.id_employee;

      this.updatingEmployee.e_status == "a"
        ? (this.updateStatusSwitch = true)
        : (this.updateStatusSwitch = false);

      this.updateDialog = true; */
    },

    async deleteTable(table) {
      // dialog de confirmación
      /* this.updatingEmployee.id_employee = empleado.id_employee;

      this.updatingEmployee.e_status == "a"
        ? (this.updateStatusSwitch = true)
        : (this.updateStatusSwitch = false);

      this.updateDialog = true; */
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

    /* async getSpacesTables() {
      this.spaces = [];
      const apiData = await this.axios.get("table/filledSpacesTables/");

      apiData.data.forEach((space) =>
        this.spaces.push({
          text: space.id_board,
          value: space.cupo,
        })
      );
    }, */

    async getSuborders(id_board, id_order) {
      const apiData = await this.axios.get(
        "table/allSuborders/" + id_board.toString() + "/" + id_order.toString()
      );

      /* this.getSpacesTables(); */

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

    /* viewActivityTables(i, t) {
      for (let step = 0; step < t.length; step++) {
        if (i == t[step]["value"]) {
          return false;
        }
      }
      return true;
    }, */

    async getAllProducts() {
      const apiData = await this.axios.get("product/allProducts");

      apiData.data.forEach((product) => {
        if (product.p_status == "a") {
          this.products.push({
            text: product.p_name,
            value: product.id_product,
          });
        }
      });
    },

    async addSuborder() {
      await this.axios.post("table/addSuborder/", this.newSuborder);

      this.getSuborders(this.actualTable, this.actuaIDOrder);
      /* this.getSpacesTables(); */
      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };
      this.newSuborderDialog = false;
    },

    async openSuborderDialog(table) {
      let id_order = await this.getTableOrder(table.id_board);
      this.actuaIDOrder = id_order;

      this.getTableTag(table.id_board);
      this.getSuborders(table.id_board, id_order);

      this.suborderDialog = true;
      this.actualTable = table.id_board;
      this.newSuborder.id_order = this.actuaIDOrder;
    },

    openNewSuborderDialog() {
      this.newSuborderDialog = true;
    },

    cancelarAddSub() {
      this.newSuborderDialog = false;
      /* this.getSpacesTables(); */
    },

    closeSubordersDialog() {
      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };
      this.suborderDialog = false;
      this.actualTable = "";
      this.actuaIDOrder = "";
      /* this.getSpacesTables(); */
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

    async deleteSuborder(item) {
      const data = {
        id_suborder: item.id_suborder,
      };
      await this.axios.post("table/deleteSuborder", data);
      this.getSuborders(this.actualTable, this.actuaIDOrder);
      /* this.getSpacesTables(); */
    },

    getDisponibilityText(table) {
      return table.b_disponibility != "a" ? "Ocupada" : "Disponible";
    },

    getDisponibilityColor(table) {
      return table.b_disponibility != "a" ? "yellow" : "green";
    },
  },

  components: {},
};
</script>
