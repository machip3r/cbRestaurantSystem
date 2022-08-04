<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Empleados</h1>
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title class="toolbar-title">
            Agregar empleado
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-container>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    class="mb-n8"
                    v-model="newEmployee.e_name"
                    background-color="white"
                    label="Nombre"
                    solo
                    dense
                    required
                    flat
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    class="mb-n8"
                    v-model="newEmployee.e_phone"
                    background-color="white"
                    label="Teléfono"
                    solo
                    flat
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    class="mb-n8"
                    v-model="newEmployee.e_email"
                    background-color="white"
                    label="Correo electrónico"
                    solo
                    flat
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    class="mb-n8"
                    v-model="newEmployee.e_password"
                    background-color="white"
                    label="Contraseña"
                    type="password"
                    solo
                    dense
                    flat
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2" align-self="center">
                  <v-row>
                    <v-btn
                      class="ml-16"
                      dark
                      large
                      color="accent"
                      @click="submit()"
                    >
                      Agregar
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-switch
                    v-model="newEmployee.e_admin"
                    inset
                    label="Administrador"
                  ></v-switch>
                </v-col>
                <!-- <v-col cols="5">
                  <v-file-input
                    class="mb-n5"
                    label="Seleccione su archivo"
                    filled
                    v-model="newEmployee.mro_foto"
                    prepend-icon="fas fa-camera"
                    background-color="white"
                    dense
                    solo
                    flat
                  ></v-file-input>
                </v-col> -->
              </v-row>
            </v-container>
          </template>
        </v-card-text>
      </v-card>
    </template>
    <template>
      <v-container fluid>
        <v-data-iterator
          :items="employees"
          item-key="id_employee"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="primary" class="mb-1">
              <v-select
                v-model="employeeFilter"
                flat
                solo-inverted
                hide-details
                :items="keys"
                @change="cambio"
                prepend-inner-icon="fa fa-search"
              ></v-select>
            </v-toolbar>
          </template>
          <template>
            <v-row>
              <v-col
                v-for="item in employees"
                :key="item.id_employee"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card align="center" align-content="center" justify="center">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ma-1"
                      v-on:click="lanzarEditable(item)"
                      white
                      icon
                      color="primary"
                    >
                      <v-icon dark> fas fa-pencil-alt </v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-card-text align="center" justify="center">
                    <p align-self="center">
                      <v-avatar
                        class="hgcursor"
                        align-self="center"
                        size="200"
                        v-on:click="moreinformation(item)"
                      >
                        <div
                          style="
                            width: 100px;
                            height: 100px;
                            background-color: black;
                          "
                        ></div>
                      </v-avatar>
                    </p>
                    <h2>{{ item.e_name }}</h2>
                    <h4>{{ item.e_password }}</h4>

                    <v-chip
                      class="ma-2"
                      color="green"
                      text-color="white"
                      v-if="item.e_status === 'a'"
                    >
                      Activo
                    </v-chip>
                    <v-chip class="ma-2" color="red" text-color="white" v-else>
                      Inactivo
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Cargando...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>

    <v-dialog v-model="updateDialog" max-width="800">
      <v-card>
        <v-toolbar dark class="mb-2 text-h5" color="primary">
          <v-toolbar-title>Editar empleado</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Nombre</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="updatingEmployee.e_name"
                      background-color="white"
                      label="Nombre"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Dirección</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="updatingEmployee.e_phone"
                      background-color="white"
                      label="Direccion"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Correo electrónico</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="updatingEmployee.e_email"
                      background-color="white"
                      label="Correo"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Numéro de teléfono</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="updatingEmployee.e_password"
                      background-color="white"
                      label="Telefono"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Administrador</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-switch
                      v-model="updatingEmployee.e_admin"
                      inset
                    ></v-switch>
                  </v-col>
                  <!-- <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Foto</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-file-input
                      class="mb-n5"
                      label="Seleccione su archivo"
                      filled
                      v-model="updatingEmployee.file"
                      prepend-icon="fas fa-camera"
                      dense
                      solo
                      outlined
                    ></v-file-input>
                  </v-col> -->
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-switch
            v-model="updateStatusSwitch"
            label="Activo"
            key="editar"
            color="success"
            hide-details
          >
          </v-switch>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            class="l-14"
            v-on:click="eliminarEmpleado()"
            color="error"
          >
            Eliminar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            class="l-14"
            v-on:click="actualizarEmpleado()"
            color="primary"
          >
            Guardar informacion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="employeeDialog" max-width="300" max-height="300">
      <v-card align="center" align-content="center" justify="center">
        <v-toolbar dark class="mb-2 text-h5" color="primary">
          <v-toolbar-title>{{ selectedEmployee.e_name }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text align-self="center">
          <p class="font-weight-black">
            {{ selectedEmployee.e_phone }}
          </p>
          <a href="mailto:`${selectedEmployee.e_email}`" target="_blank">
            {{ selectedEmployee.e_email }}
          </a>
          <p class="font-weight-black">
            {{ selectedEmployee.e_password }}
          </p>
          <p>
            {{ selectedEmployee.e_admin }}
          </p>
          <p>
            <v-switch
              v-model="activo_inactivo"
              label="Activo"
              color="success"
              hide-details
              @click="cambiarEstado"
            >
            </v-switch>
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="employeeDialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Employee",

  data: () => ({
    employees: [],
    newEmployee: {
      e_name: "",
      e_phone: "",
      e_email: "",
      e_password: "",
      e_admin: false,
    },
    selectedEmployee: {
      e_name: "",
      e_phone: "",
      e_email: "",
      e_password: "",
      e_admin: false,
    },
    updatingEmployee: {
      e_name: "",
      e_phone: "",
      e_email: "",
      e_password: "",
      e_admin: false,
    },
    loadingDialog: false,
    employeeDialog: false,
    activo_inactivo: true,
    updateDialog: false,
    updateStatusSwitch: true,
    employeeFilter: "Todos",
    keys: ["Todos", "Activos", "Inactivos"],
  }),

  created() {
    this.getMeseros();
  },
  methods: {
    cambio(event) {
      this.getMeseros();
    },
    moreinformation(empleado) {
      this.selectedEmployee.e_name = empleado.e_name;
      this.selectedEmployee.e_password = empleado.e_password;
      this.selectedEmployee.e_email = empleado.e_email;
      this.selectedEmployee.e_status = empleado.e_status;
      this.selectedEmployee.e_phone = empleado.e_phone;
      this.selectedEmployee.e_admin = empleado.e_admin;
      this.selectedEmployee.id_employee = empleado.id_employee;
      if (this.selectedEmployee.e_status == "a") {
        this.activo_inactivo = true;
      } else {
        this.activo_inactivo = false;
      }
      this.employeeDialog = true;
    },
    limpiarEmpeladoSe() {
      this.selectedEmployee.e_name = "";
      this.selectedEmployee.e_password = "";
      this.selectedEmployee.e_email = "";
      this.selectedEmployee.e_status = "";
      this.selectedEmployee.e_phone = "";
      this.selectedEmployee.e_admin = "";
      this.selectedEmployee.id_employee = "";
    },
    async cambiarEstado() {
      let status = "";

      this.selectedEmployee.e_status == "a" ? (status = "i") : (status = "a");

      await this.axios.put("/employee/setStatusEmployee", {
        id_employee: this.selectedEmployee.id_employee,
        e_status: status,
      });

      this.getMeseros();
      this.employeeDialog = false;
    },
    lanzarEditable(empleado) {
      this.updatingEmployee.e_name = empleado.e_name;
      this.updatingEmployee.e_password = empleado.e_password;
      this.updatingEmployee.e_email = empleado.e_email;
      this.updatingEmployee.e_status = empleado.e_status;
      this.updatingEmployee.e_phone = empleado.e_phone;
      this.updatingEmployee.e_admin = empleado.e_admin;
      this.updatingEmployee.id_employee = empleado.id_employee;

      this.updatingEmployee.e_status == "a"
        ? (this.updateStatusSwitch = true)
        : (this.updateStatusSwitch = false);

      this.updateDialog = true;
    },
    async actualizarEmpleado() {
      this.loadingDialog = true;

      this.updateStatusSwitch
        ? (this.updatingEmployee.e_status = "a")
        : (this.updatingEmployee.e_status = "i");

      await this.axios.put("/employee/updateEmployee", {
        e_name: this.updatingEmployee.e_name,
        e_phone: this.updatingEmployee.e_phone,
        e_email: this.updatingEmployee.e_email,
        e_password: this.updatingEmployee.e_password,
        e_admin: this.updatingEmployee.e_admin,
        e_status: this.updatingEmployee.e_status,
        id_employee: this.updatingEmployee.id_employee,
      });

      this.getMeseros();
      this.loadingDialog = false;
      this.updateDialog = false;
    },

    async eliminarEmpleado() {
      this.loadingDialog = true;

      await this.axios.post("/employee/deleteEmployee", {
        id_employee: this.updatingEmployee.id_employee,
      });

      this.getMeseros();
      this.loadingDialog = false;
      this.updateDialog = false;
    },

    async getMeseros() {
      let apiData;

      if (this.employeeFilter == "Todos") {
        apiData = await this.axios.get("/employee/allEmployees");
        this.employees = apiData.data;
      } else if (this.employeeFilter == "Activos") {
        apiData = await this.axios.get("/employee/activeEmployees");
        this.employees = apiData.data;
      } else {
        apiData = await this.axios.get("/employee/inactiveEmployees");
        this.employees = apiData.data;
      }
    },

    async submit() {
      this.loadingDialog = true;

      await this.axios.post("/employee/addEmployee", {
        e_name: this.newEmployee.e_name,
        e_phone: this.newEmployee.e_phone,
        e_email: this.newEmployee.e_email,
        e_password: this.newEmployee.e_password,
        e_admin: this.newEmployee.e_admin,
      });

      this.newEmployee.e_name = "";
      this.newEmployee.e_phone = "";
      this.newEmployee.e_email = "";
      this.newEmployee.e_password = "";
      this.newEmployee.e_admin = false;

      this.getMeseros();
      this.loadingDialog = false;
    },
  },
  components: {},
};
</script>
