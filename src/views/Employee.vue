<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Empleados</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat color="primary">
          <v-toolbar-title class="toolbar-title">
            Agregar empleado
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-container>
              <v-form
                ref="formNewEmployee"
                v-model="validNewEmployee"
                lazy-validation
              >
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      class="mb-n8"
                      v-model="newEmployee.e_name"
                      background-color="greyCustom"
                      label="Nombre"
                      :rules="[(v) => !!v || 'El nombre es obligatorio']"
                      solo
                      required
                      flat
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      class="mb-n8"
                      v-model="newEmployee.e_phone"
                      background-color="greyCustom"
                      label="Teléfono"
                      type="number"
                      :rules="[
                        (v) =>
                          (!!v && /^^\d{10}$/.test(v)) ||
                          'El número de teléfono es obligatorio y debe ser correcto',
                      ]"
                      solo
                      flat
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-row class="mb-2">
                      <v-switch
                        v-model="newEmployee.e_admin"
                        label="Administrador"
                        color="success"
                        inset
                        hide-details
                      ></v-switch>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      class="mb-n8"
                      v-model="newEmployee.e_email"
                      background-color="greyCustom"
                      label="Correo electrónico"
                      type="email"
                      :rules="[
                        (v) =>
                          (!!v &&
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                              v
                            )) ||
                          'El correo electrónico es obligatorio y debe ser correcto',
                      ]"
                      solo
                      flat
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      class="mb-n8"
                      v-model="newEmployee.e_password"
                      background-color="greyCustom"
                      label="Contraseña"
                      type="password"
                      :rules="[(v) => !!v || 'La contraseña es obligatoria']"
                      solo
                      flat
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" align-self="center">
                    <v-row justify="center">
                      <v-btn dark large color="accent" @click="submitForm()">
                        Agregar
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
              <v-alert
                :value="alertNewEmployee"
                icon="fas fa-check-circle"
                transition="scale-transition"
                class="mt-5"
                type="success"
              >
                Se añadió un nuevo empleado.
              </v-alert>
            </v-container>
          </template>
        </v-card-text>
      </v-card>
    </template>
    <template>
      <v-card class="mt-5">
        <v-card>
          <v-toolbar flat color="primary">
            <v-select
              v-model="employeeFilter"
              flat
              solo
              hide-details
              :items="keys"
              @change="filterChange"
              background-color="third"
            ></v-select>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="employees"
            multi-sort
            class="food_table"
          >
            <template v-slot:[`item.e_status`]="{ item }">
              <v-chip
                :text-color="
                  getStatusColor(item) != 'success' ? 'black' : 'white'
                "
                :color="getStatusColor(item)"
              >
                {{ getStatusText(item) }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-chip
                class="mr-2"
                color="info"
                text-color="black"
                @click="getEmployeeInformation(item)"
              >
                <v-icon class="mr-2" small> fas fa-eye </v-icon>
                Ver
              </v-chip>
              <v-chip
                class="mr-2"
                color="warning"
                text-color="black"
                @click="openUpdateEmployeeDialog(item)"
              >
                <v-icon small> fas fa-pen </v-icon>
              </v-chip>
              <v-chip
                class="mr-2"
                color="error"
                @click="openDeleteEmployeeDialog(item)"
              >
                <v-icon color="white" small> fas fa-trash </v-icon>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </template>

    <v-dialog v-model="updateEmployeeDialog" max-width="500">
      <v-card>
        <v-toolbar class="toolbar-title" color="primary">
          <v-toolbar-title> Editar empleado </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form
              ref="formUpdateEmployee"
              v-model="validUpdateEmployee"
              lazy-validation
            >
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="actualEmployee.e_name"
                    :rules="[(v) => !!v || 'El nombre es obligatorio']"
                    label="Nombre"
                    background-color="greyCustom"
                    ref="updateEmployeeNameInput"
                    flat
                    solo
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="actualEmployee.e_phone"
                    :rules="[
                      (v) =>
                        (!!v && /^^\d{10}$/.test(v)) ||
                        'El número de teléfono es obligatorio y debe ser correcto',
                    ]"
                    label="Teléfono"
                    background-color="greyCustom"
                    type="number"
                    flat
                    solo
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="actualEmployee.e_email"
                    :rules="[
                      (v) =>
                        (!!v &&
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                            v
                          )) ||
                        'El correo electrónico es obligatorio y debe ser correcto',
                    ]"
                    label="Correo"
                    background-color="greyCustom"
                    type="email"
                    flat
                    solo
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="actualEmployee.e_password"
                    :rules="[(v) => !!v || 'La contraseña es obligatoria']"
                    label="Contraseña"
                    background-color="greyCustom"
                    type="password"
                    flat
                    solo
                    required
                  ></v-text-field>
                  <v-row justify="center">
                    <v-switch
                      v-model="actualEmployee.e_admin"
                      class="mr-5"
                      label="Administrador"
                      color="success"
                      inset
                      hide-details
                    ></v-switch>
                    <v-switch
                      v-model="updateStatusSwitch"
                      label="Estado"
                      key="editar"
                      color="success"
                      inset
                      hide-details
                    >
                    </v-switch>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>

            <v-alert
              :value="alertEmptyEmployee"
              icon="fas fa-exclamation-circle"
              transition="scale-transition"
              class="mt-8"
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
            @click="closeUpdateEmployeeDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="accent darken-1" text @click="updateEmployee()">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteEmployeeDialog" max-width="300">
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
            @click="closeDeleteEmployeeDialog()"
          >
            Cancelar
          </v-btn>
          <v-btn color="error darken-1" text @click="deleteEmployee()">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="employeeDialog" max-width="500">
      <v-card>
        <v-card-title class="card-title-custom">
          {{ selectedEmployee.e_name }}
        </v-card-title>
        <v-card-text class="card-subtitle-custom mt-4">
          <v-row>
            <v-col><h3>Teléfono:</h3></v-col>
            <v-col>
              <h3 class="no-bold">{{ selectedEmployee.e_phone }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col><h3>Correo electrónico:</h3></v-col>
            <v-col>
              <h3 class="no-bold">{{ selectedEmployee.e_email }}</h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-switch
            v-model="activeInactive"
            class="ml-2 mb-3 card-subtitle-custom"
            label="Estado"
            color="success"
            inset
            hide-details
            @click="changeStatusEmployee"
          >
          </v-switch>
          <v-spacer></v-spacer>
          <v-btn
            class="mt-3"
            color="primary darken-1"
            text
            @click="closeEmployeeDialog()"
          >
            Cerrar
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
    headers: [
      { text: "Nombre", value: "e_name" },
      { text: "Teléfono", value: "e_phone" },
      { text: "Correo Electrónico", value: "e_email" },
      { text: "Estado", value: "e_status" },
      { text: "Acciones", value: "actions", align: "end" },
    ],

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
    actualEmployee: {
      e_name: "",
      e_phone: "",
      e_email: "",
      e_password: "",
      e_admin: false,
    },

    actualIDEmployee: 0,

    validNewEmployee: false,
    validUpdateEmployee: false,
    alertNewEmployee: false,
    alertEmptyEmployee: false,
    /* loadingDialog: false, */
    employeeDialog: false,
    activeInactive: true,
    updateEmployeeDialog: false,
    updateStatusSwitch: true,
    deleteEmployeeDialog: false,
    employeeFilter: "Todos",
    keys: ["Todos", "Activos", "Inactivos"],
  }),

  created() {
    this.getAllEmployees();
  },

  watch: {
    alertNewEmployee(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewEmployee = false), 3000);
    },
    alertEmptyEmployee(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyEmployee = false), 3000);
    },
  },

  methods: {
    filterChange() {
      this.getAllEmployees();
    },

    getEmployeeInformation(empleado) {
      this.selectedEmployee.e_name = empleado.e_name;
      this.selectedEmployee.e_password = empleado.e_password;
      this.selectedEmployee.e_email = empleado.e_email;
      this.selectedEmployee.e_status = empleado.e_status;
      this.selectedEmployee.e_phone = empleado.e_phone;
      this.selectedEmployee.e_admin = empleado.e_admin;
      this.selectedEmployee.id_employee = empleado.id_employee;
      if (this.selectedEmployee.e_status == "a") {
        this.activeInactive = true;
      } else {
        this.activeInactive = false;
      }
      this.employeeDialog = true;
    },

    clearEmployee() {
      this.selectedEmployee.e_name = "";
      this.selectedEmployee.e_password = "";
      this.selectedEmployee.e_email = "";
      this.selectedEmployee.e_status = false;
      this.selectedEmployee.e_phone = "";
      this.selectedEmployee.e_admin = false;
      this.selectedEmployee.id_employee = "";
    },

    async changeStatusEmployee() {
      let status = "";

      this.selectedEmployee.e_status == "a" ? (status = "i") : (status = "a");

      const data = {
        id_employee: this.selectedEmployee.id_employee,
        e_status: status,
      };

      await this.axios.post("employee/setStatusEmployee", data);

      this.getAllEmployees();
      this.employeeDialog = false;
    },

    async updateEmployee() {
      /* this.loadingDialog = true; */

      this.actualEmployee.e_admin
        ? (this.actualEmployee.e_admin = true)
        : (this.actualEmployee.e_admin = false);

      if (
        !this.$refs.formUpdateEmployee.validate() &&
        (this.actualEmployee.id_employee == "" ||
          this.actualEmployee.id_product == 0 ||
          this.actualEmployee.e_name == "" ||
          this.actualEmployee.e_phone == "" ||
          this.actualEmployee.e_email == "" ||
          this.actualEmployee.e_password == "")
      )
        this.alertEmptyEmployee = true;
      else {
        this.updateStatusSwitch
          ? (this.actualEmployee.e_status = "a")
          : (this.actualEmployee.e_status = "i");

        await this.axios.post("employee/updateEmployee", this.actualEmployee);

        this.$refs.formUpdateEmployee.reset();

        this.getAllEmployees();
        /* this.loadingDialog = false; */
        this.closeUpdateEmployeeDialog();
      }
    },

    closeEmployeeDialog() {
      this.employeeDialog = false;
    },

    openUpdateEmployeeDialog(employee) {
      this.actualEmployee = {
        id_employee: employee.id_employee,
        e_name: employee.e_name,
        e_phone: employee.e_phone,
        e_email: employee.e_email,
        e_password: employee.e_password,
        e_admin: employee.e_admin,
        e_status: employee.e_status,
      };

      this.actualEmployee.e_status == "a"
        ? (this.updateStatusSwitch = true)
        : (this.updateStatusSwitch = false);

      this.updateEmployeeDialog = true;
      setTimeout(() => this.$refs.updateEmployeeNameInput.focus(), 250);
    },

    closeUpdateEmployeeDialog() {
      this.actualEmployee = {};
      this.updateEmployeeDialog = false;
    },

    async deleteEmployee() {
      /* this.loadingDialog = true; */
      const data = {
        id_employee: this.actualIDEmployee,
      };

      await this.axios.post("employee/deleteEmployee", data);

      this.closeDeleteEmployeeDialog();

      this.getAllEmployees();
      /* this.loadingDialog = false; */
    },

    openDeleteEmployeeDialog(employee) {
      this.actualIDEmployee = employee.id_employee;
      this.deleteEmployeeDialog = true;
    },

    closeDeleteEmployeeDialog() {
      this.actualIDEmployee = 0;
      this.deleteEmployeeDialog = false;
    },

    async getAllEmployees() {
      let apiData;

      if (this.employeeFilter == "Todos") {
        apiData = await this.axios.get("employee/allEmployees");
        this.employees = apiData.data;
      } else if (this.employeeFilter == "Activos") {
        apiData = await this.axios.get("employee/activeEmployees");
        this.employees = apiData.data;
      } else {
        apiData = await this.axios.get("employee/inactiveEmployees");
        this.employees = apiData.data;
      }
    },

    async submitForm() {
      /* this.loadingDialog = true; */

      if (this.$refs.formNewEmployee.validate()) {
        this.newEmployee.e_admin
          ? (this.newEmployee.e_admin = true)
          : (this.newEmployee.e_admin = false);

        const data = {
          e_name: this.newEmployee.e_name,
          e_phone: this.newEmployee.e_phone,
          e_email: this.newEmployee.e_email,
          e_password: this.newEmployee.e_password,
          e_admin: this.newEmployee.e_admin,
        };

        await this.axios.post("employee/addEmployee", data);

        this.newEmployee.e_name = "";
        this.newEmployee.e_phone = "";
        this.newEmployee.e_email = "";
        this.newEmployee.e_password = "";
        this.newEmployee.e_admin = false;

        this.alertNewEmployee = true;

        this.$refs.formNewEmployee.reset();

        this.getAllEmployees();
        /* this.loadingDialog = false; */
      }
    },

    getStatusText(employee) {
      return employee.e_status == "a" ? "Activo" : "Inactivo";
    },

    getStatusColor(employee) {
      return employee.e_status == "a" ? "success" : "warning";
    },
  },
  components: {},
};
</script>
