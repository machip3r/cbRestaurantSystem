<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Órdenes</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat color="primary">
          <v-toolbar-title class="toolbar-title">
            Agregar orden
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="container-inside">
          <template>
            <v-row justify="center" align="center" align-content="center">
              <v-col cols="6">
                <v-select
                  :items="employees"
                  v-model="newOrder.id_employee"
                  label="Mesero a cargo"
                  flat
                  solo-inverted
                  hide-details
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="tables"
                  v-model="newOrder.id_board"
                  label="Mesas disponibles"
                  flat
                  solo-inverted
                  hide-details
                >
                </v-select>
              </v-col>
              <v-col cols="1">
                <v-btn
                  class="ma-2"
                  :loading="loadingAddOrder"
                  :disabled="loadingAddOrder"
                  color="accent"
                  @click="addOrder()"
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
        :value="alertNewOrder"
        icon="fas fa-check-circle"
        transition="scale-transition"
        class="mt-2"
        type="success"
      >
        Se añadió a las órdenes pendientes
      </v-alert>
      <v-alert
        :value="alertEmptyNewOrder"
        icon="fas fa-exclamation-circle"
        transition="scale-transition"
        class="mt-2"
        type="error"
      >
        Debes seleccionar el mesero a cargo y la mesa.
      </v-alert>
    </template>
    <br />
    <template>
      <v-data-iterator :items="activeOrders" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-2" color="primary">
            <v-toolbar-title class="toolbar-title">
              Órdenes activas
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="(order, index) in activeOrders"
              v-bind:key="index"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-card dense color="primary">
                <v-card-title class="subheading font-weight-bold">
                  <v-toolbar flat color="primary">
                    <v-toolbar-title class="toolbar-title">
                      "{{ order.b_tag }}"
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-1" icon @click="openSuborderDialog(order)">
                    <v-icon>fas fa-eye</v-icon>
                  </v-btn>

                  <v-btn icon @click="openPaymentDialog(order)">
                    <v-icon size="21">fas fa-money-bill-alt</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="container-inside" color="grey lighten-4">
                  <v-list-item>
                    <v-list-item-content>Mesero a cargo:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.e_name }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Fecha y hora:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.o_datetime }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Estado:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      Activa
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Cuenta:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      ${{ parseFloat(order.o_price).toFixed(2) }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
      <br />
      <v-data-iterator :items="waitingOrders" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-2" color="secondary">
            <v-toolbar-title class="toolbar-title">
              Órdenes pendientes
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="(order, index) in waitingOrders"
              v-bind:key="index"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-card dense color="secondary">
                <v-card-title class="subheading font-weight-bold">
                  <v-toolbar flat color="secondary">
                    <v-toolbar-title class="toolbar-title">
                      "{{ order.b_tag }}"
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="openSuborderDialog(order)">
                    <v-icon>fas fa-eye</v-icon>
                  </v-btn>
                  <v-btn icon @click="openDeleteOrderDialog(order)">
                    <v-icon size="21">fas fa-trash</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="container-inside" color="grey lighten-4">
                  <v-list-item>
                    <v-list-item-content>Mesero a cargo:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.e_name }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Fecha y hora:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.o_datetime }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Estado:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      Pendiente
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

      <v-dialog v-model="deleteOrderDialog" max-width="300">
        <v-card>
          <v-card-title class="card-title-custom">
            ¿Estás seguro?
          </v-card-title>
          <v-card-text class="card-subtitle-custom">
            Esta acción es irreversible.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelDeleteOrder()">
              Cancelar
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteOrder()">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        class="toolbar-subtitle"
        v-model="suborderDialog"
        max-width="1000"
      >
        <v-card>
          <v-toolbar class="toolbar-title" color="primary">
            <v-toolbar-title> Mesa "{{ this.order.b_tag }}" </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            class="container-inside"
            :headers="headersSubordersDialog"
            :items="subordersForDialog"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="openDeleteSuborderDialog(item)" small>
                fas fa-trash
              </v-icon>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="closeSuborderDialog()">
              Cerrar
            </v-btn>
            <v-btn
              color="accent darken-1"
              text
              @click="openAddSuborderDialog()"
            >
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

      <!-- PAYMENT -->
      <v-dialog
        v-model="pDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="container-content-payment">
          <v-toolbar color="primary" class="toolbar-title">
            <v-btn icon dark9 @click="pDialog = false">
              <v-icon>fas fa-times</v-icon>
            </v-btn>

            <v-toolbar-title>
              <h3>Pago de cuenta</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container>
            <v-row>
              <v-col cols="8">
                <v-card
                  height="100%"
                  elevation="0"
                  class="pa-3"
                  style="background: transparent"
                >
                  <v-toolbar dense color="primary">
                    <v-toolbar-title class="toolbar-title">
                      Pedidos de la mesa {{ this.idTable }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-data-table
                    :headers="headers"
                    :items="subOrders"
                    hide-default-footer
                    class="container-inside"
                  >
                  </v-data-table>
                  <v-container class="pt-3">
                    <v-row no-gutters>
                      <v-col cols="8">
                        <v-card color="#F5F5F5" elevation="0" class="pa-3">
                          <v-card-text class="container-inside">
                            <v-row>
                              <h3>Subtotal:</h3>
                              <v-spacer></v-spacer>
                              <h3>${{ this.subtotal }}</h3>
                            </v-row>
                            <v-row>
                              <h2>Total:</h2>
                              <v-spacer></v-spacer>
                              <h2>${{ this.total }}</h2>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>

                      <v-col cols="4">
                        <v-card
                          color="#F5F5F5"
                          elevation="0"
                          class="pa-3"
                          height="100%"
                        >
                          <v-btn
                            class="px-7 font-weight-black"
                            color="accent"
                            rounded
                            width="100%"
                            height="100%"
                            @click="openCPaymentDialog()"
                          >
                            Pagar
                          </v-btn>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col>
                <div class="container-ticket" id="ticket">
                  <div class="header-ticket">
                    <v-icon size="40" color="black">fas fa-code</v-icon>
                    <h2>Food and Fun</h2>
                    Accesibilidad, proactividad y alimentación.<br />
                    ------------------------------------------------- <br />
                    Atendido por: {{ this.employeeName }}
                  </div>
                  <div class="content-ticket">
                    <v-row>
                      <v-col>Cantidad</v-col>
                      <v-col>Item</v-col>
                      <v-col>Total</v-col>
                    </v-row>
                    <v-row
                      v-for="(suborder, index) in subOrders"
                      v-bind:key="index"
                    >
                      <v-col>{{ suborder.s_cuantity }}</v-col>
                      <v-col>{{ suborder.p_name }}</v-col>
                      <v-col
                        >${{ parseFloat(suborder.total).toFixed(2) }}</v-col
                      >
                    </v-row>
                  </div>
                  <div class="footer-ticket">
                    -------------------------------------------------
                    <v-row>
                      <v-col>SUBTOTAL</v-col>
                      <v-spacer></v-spacer>
                      <v-col>${{ this.subtotal }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>TOTAL</v-col>
                      <v-spacer></v-spacer>
                      <v-col>${{ this.total }}</v-col>
                    </v-row>
                    <br />
                    GRACIAS POR CONSUMIR CON NOSOTROS
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cPaymentDialog" max-width="300">
        <v-card>
          <v-card-title class="card-title-custom">
            Confirmar pago
          </v-card-title>
          <v-card-text class="card-subtitle-custom">
            <v-form class="mt-3">
              Selecciona un método de pago
              <v-select
                v-model="newPayment.p_type"
                :items="paymentMethods"
                label="Método de pago"
                background-color="greyCustom"
                class="mb-3"
                flat
                solo-inverted
                hide-details
              >
              </v-select>
              Propina
              <v-text-field
                v-model="newPayment.p_tip"
                :rule="propinaRules"
                label="Propina"
                placeholder="¿Hubo propina?"
                background-color="greyCustom"
                type="number"
                flat
                solo
                hide-details
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelPayment()">
              Cancelar
            </v-btn>
            <v-btn color="success" text @click="confirmPayment()">
              Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Order",

  data: () => ({
    // ORDERS
    order: [],
    activeOrders: [],
    waitingOrders: [],
    employees: [],
    tables: [],
    newOrder: {
      id_employee: "",
      id_board: "",
    },

    deleteOrderDialog: false,
    alertNewOrder: false,
    alertEmptyNewOrder: false,
    loader: null,
    loadingAddOrder: false,

    // SUBORDERS
    headersSubordersDialog: [
      { text: "Etiqueta", value: "s_tag" },
      { text: "Comida", value: "p_name" },
      { text: "Cantidad", value: "s_cuantity" },
      { text: "Costo", value: "s_price" },
      { text: "Acciones", value: "actions" },
    ],

    newSuborder: {
      id_order: "",
      id_product: "",
      s_tag: "",
      s_cuantity: "",
    },
    products: [],
    subordersForDialog: [],

    suborderDialog: false,
    addSuborderDialog: false,

    // PAYMENTS
    headers: [
      { text: "Comida", align: "center", value: "p_name" },
      { text: "Cantidad", align: "center", value: "s_cuantity" },
      { text: "Total", align: "center", value: "total" },
    ],

    paymentMethods: [{ text: "Efectivo" }, { text: "Tarjeta" }],
    propinaRules: [
      (v) =>
        /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
        "Introduce un número",
    ],

    pDialog: false,
    cPaymentDialog: false,
    subOrders: [],
    subtotal: "",
    total: "",
    idTable: "",
    idOrder: "",
    employeeName: "",
    newPayment: {
      id_order: "",
      p_subtotal: "",
      p_total: "",
      p_tip: 0,
      p_type: "Efectivo",
    },
  }),

  watch: {
    // ORDERS
    alertNewOrder(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewOrder = false), 3000);
    },

    alertEmptyNewOrder(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyNewOrder = false), 3000);
    },

    deleteOrderDialog(isOpen) {
      if (!isOpen) this.order = [];
    },

    // SUBORDERS
    suborderDialog(isOpen) {
      if (!isOpen) this.closeSuborderDialog();
    },

    addSuborderDialog(isOpen) {
      if (!isOpen) this.closeAddSuborderDialog();
    },

    // PAYMENTS
    pDialog(isOpen) {
      if (!isOpen) {
        this.newPayment = {};
        this.subOrders = [];
        this.getActiveEmployees();
        this.getActiveTables();
        this.getActiveOrders();
        this.getWaitingOrders();
      }
    },
  },

  created() {
    // ORDERS
    this.cancelAddOrder();
    this.getActiveEmployees();
    this.getActiveTables();
    this.getActiveOrders();
    this.getWaitingOrders();
  },

  methods: {
    // ORDERS
    async getActiveOrders() {
      const apiData = await this.axios.get("order/allActiveOrders/");

      this.activeOrders = apiData.data;
    },

    async getWaitingOrders() {
      const apiData = await this.axios.get("order/allWaitingOrders/");

      this.waitingOrders = apiData.data;
    },

    async getActiveEmployees() {
      const apiData = await this.axios.get("order/allActiveEmployees/");

      apiData.data.forEach((employee) =>
        this.employees.push({
          text: employee.e_name,
          value: employee.id_employee,
        })
      );
    },

    async getActiveTables() {
      const apiData = await this.axios.get("order/allActiveTables/");

      apiData.data.forEach((table) =>
        this.tables.push({
          text: table.b_tag,
          value: table.id_board,
        })
      );
    },

    async addOrder() {
      this.loader = "loadingAddOrder";
      this.loadingAddOrder = true;

      if (
        typeof this.newOrder.id_employee !== "undefined" &&
        typeof this.newOrder.id_board !== "undefined"
      ) {
        await this.axios.post("order/addOrder/", this.newOrder);
        this.alertNewOrder = true;
        this.cancelAddOrder();
      } else this.alertEmptyNewOrder = true;

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.loader = null;
      this.loadingAddOrder = false;
    },

    async deleteOrder() {
      await this.axios.post("order/deleteOrder/", this.order);

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.cancelDeleteOrder();
      this.cancelAddOrder();
    },

    cancelAddOrder() {
      this.newOrder = {};
    },

    cancelDeleteOrder() {
      this.order = [];
      this.deleteOrderDialog = false;
    },

    openDeleteOrderDialog(order) {
      this.order = order;
      this.deleteOrderDialog = true;
    },

    // SUBORDERS

    async getSubordersByTableAndOrder(id_board, id_order) {
      this.suborderDialog = true;

      const apiData = await this.axios.get(
        "table/allSuborders/" + id_board + "/" + id_order
      );

      this.subordersForDialog = apiData.data;
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

    openSuborderDialog(order) {
      this.order = order;
      this.suborderDialog = true;
      this.getAllProducts();
      this.getSubordersByTableAndOrder(order.id_board, order.id_order);
    },

    openAddSuborderDialog() {
      this.addSuborderDialog = true;
    },

    closeAddSuborderDialog() {
      this.getActiveOrders();
      this.getWaitingOrders();
      this.addSuborderDialog = false;
    },

    closeSuborderDialog() {
      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };

      this.getActiveOrders();
      this.getWaitingOrders();
      this.suborderDialog = false;
    },

    async addSuborder() {
      this.newSuborder.id_order = this.order.id_order;

      await this.axios.post("table/addSuborder/", this.newSuborder);

      this.getSubordersByTableAndOrder(
        this.order.id_board,
        this.order.id_order
      );

      this.newSuborder = {
        id_order: "",
        id_product: "",
        s_tag: "",
        s_cuantity: "",
      };
      this.addSuborderDialog = false;
    },

    async eliminarSuborden(item) {
      const data = {
        id_suborder: item.id_suborder,
      };
      await this.axios.post("table/deleteSuborder", data);
      this.getSubordersByTableAndOrder(
        this.order.id_board,
        this.order.id_order
      );
    },

    // PAYMENTS
    async showOrdersPerTable(idOrder) {
      const apiData = await this.axios.get(
        "payment/showOrdersPerTable/" + idOrder.toString()
      );

      this.subOrders = apiData.data;
    },

    async showOrderTotal(idOrder) {
      const apiData = await this.axios.get(
        "payment/orderTotal/" + idOrder.toString()
      );
      this.idOrder = idOrder;
      this.subtotal = parseFloat(apiData.data[0].order_total).toFixed(2);
    },

    async showOrderTotalIVA(idOrder) {
      /* const apiData = await this.axios.get(
        "payment/orderTotalIVA/" + idOrder.toString()
      ); */
      const apiData = await this.axios.get(
        "payment/orderTotal/" + idOrder.toString()
      );
      this.idOrder = idOrder;
      this.total = parseFloat(apiData.data[0].order_total).toFixed(2);
    },

    async insertPayment() {
      this.newPayment.id_order = this.idOrder;
      this.newPayment.p_subtotal = this.subtotal;
      this.newPayment.p_total = this.total;

      await this.axios.post("payment/addPayment", this.newPayment);

      this.newPayment = {
        id_order: "",
        p_subtotal: "",
        p_total: "",
        p_tip: 0,
        p_type: "Efectivo",
      };

      this.getActiveEmployees();
      this.getActiveTables();
      this.getActiveOrders();
      this.getWaitingOrders();
    },

    cancelPayment() {
      this.pDialog = false;
    },

    openPaymentDialog(order) {
      this.showOrdersPerTable(order.id_order);
      this.showOrderTotal(order.id_order);
      this.showOrderTotalIVA(order.id_order);
      this.idTable = order.id_board;
      this.employeeName = order.e_name;
      this.pDialog = true;
    },

    printPageArea() {
      var printContent = document.getElementById("ticket");
      var WinPrint = window.open("", "", "width=900,height=650");
      WinPrint.document.write(printContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },

    openCPaymentDialog() {
      this.cPaymentDialog = true;
    },

    cancelPayment() {
      this.cPaymentDialog = false;
    },

    confirmPayment() {
      this.printPageArea();
      this.insertPayment();
      this.cPaymentDialog = false;
      this.pDialog = false;
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
    },
  },

  components: {},
};
</script>
