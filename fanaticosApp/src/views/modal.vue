<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <div
          style="text-align: left; margin-top: 20px; margin-left: 20px"
        ></div>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <a href="/tab1" class="arrow"
            ><i class="fas fa-angle-double-left"></i
          ></a>
        </ion-fab-button>
      </ion-fab>
      <div
        class="form-group"
        style="margin-top: 5%; margin-left: 25%; margin-right: 10%"
      >
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          class="css-input"
          id="email"
          aria-describedby="emailHelp"
          placeholder="nombre@ejemplo.com"
          v-model="email"
        />
        <small id="emailHelp" class="form-text"
          >Recuerda nunca compartir tus datos privados.</small
        >
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="nombreusuario">Nombre de usuario</label>
        <input
          type="text"
          class="css-input"
          id="nombreusuario"
          v-model="user"
        />
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="pass">Contraseña</label>
        <input type="password" class="css-input" id="pass" v-model="pass" />
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="pass">Repetir Contraseña</label>
        <input type="password" class="css-input" id="pass" v-model="repass" />
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="name">Nombre</label> <br />
        <input type="text" class="css-input" id="name" v-model="name" />
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="name">Apellido</label><br />
        <input type="text" class="css-input" id="lastname" v-model="lastname" />
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="alias">Alias</label><br />
        <input type="text" class="css-input" id="alias" v-model="alias" />
        <small id="emailHelp" class="form-text"
          >Este es el nombre que verán otros jugadores.</small
        >
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="exampleFormControlSelect1">País</label> <br />
        <select
          class="css-input"
          id="exampleFormControlSelect1"
          v-model="selectpais"
        >
          <option value="Argentina" selected>Argentina</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Mexico">Mexico</option>
          <option value="Panamá">Panamá</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Perú">Perú</option>
          <option value="Uruguay">Uruguay</option>
          
        </select>
      </div>
      <div
        class="form-group"
        style="margin-top: 1%; margin-left: 25%; margin-right: 10%"
      >
        <label for="alias">Club que eres hincha</label><br />
        <input type="text" class="css-input" id="alias" v-model="club" />
      </div>
      
      <a @click="guardar()" class="modalGuardar"
        >Guardar
        <img src="assets/img/loader.gif" width="25" alt="" v-if="loader"
      /></a>
    </ion-content>
  </div>
</template>

<style scoped>
ion-content {
  --background: linear-gradient(to right, #334580, #434343);
  --background: url(/assets/img/soccerfield2.jpg) 0 0/100% 100% no-repeat;
  --color: rgb(255, 255, 255);
}
.css-input {
  padding: 6px;
  font-size: 14px;
  border-radius: 15px;
  border-style: solid;
  border-width: 4px;
  border-color: #e67e22;
  box-shadow: 0px 0px 5px 0px rgba(42, 42, 42, 0.75);
  width: auto;
  color: black;
}
.css-input:focus {
  outline: none;
}

.arrow {
  color: white;
  font-size: large;
}

.arrow :link {
  color: white;
}

.modalGuardar {
  box-shadow: 3px 4px 0px 0px #899599;
  background: linear-gradient(to bottom, #ededed 5%, #bab1ba 100%);
  background-color: #ededed;
  border-radius: 15px;
  border: 1px solid #d6bcd6;
  display: inline-block;
  cursor: pointer;
  color: #3a8a9e;
  font-family: Verdana;
  font-size: 17px;
  padding: 7px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #e1e2ed;
  margin-top: 1%;
  margin-left: 25%;
  margin-right: 10%;
}
.modalGuardar:hover {
  background: linear-gradient(to bottom, #bab1ba 5%, #ededed 100%);
  background-color: #bab1ba;
}
.modalGuardar:active {
  position: relative;
  top: 1px;
}

</style>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  modalController,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";

class Data {
  constructor(
    /* Usuarios */
    user,
    password,
    username,
    userlastname,
    usercountry,
    userteam,
    useralias,
    userscore,
    userexp,

    /* Trivia */
    main,
    type,
    code,
    quest,
    ranswer,
    wanswer1,
    wanswer2,
    wanswer3,
    rate
  ) {
    /* Usuarios */
    this.user = user;
    this.password = password;
    this.username = username;
    this.userlastname = userlastname;
    this.usercountry = usercountry;
    this.userteam = userteam;
    this.useralias = useralias;
    this.userscore = userscore;
    this.userexp = userexp;

    /* Trivia */
    this.main = main;
    this.type = type;
    this.code = code;
    this.quest = quest;
    this.ranswer = ranswer;
    this.wanswer1 = wanswer1;
    this.wanswer2 = wanswer2;
    this.wanswer3 = wanswer3;
    this.rate = rate;
  }
}

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Nuevo usuario " },
  },
  data() {
    return {
      content: "Content",
      datos: [],
      selectpais: "",
      club: "",
      email: "",
      user: "",
      pass: "",
      repass: "",
      name: "",
      lastname: "",
      alias: "",
      loader: false,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      fetch("https://fanaticos.herokuapp.com/api", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.datos = data;
        });
    },
    guardar() {
      this.loader = true;
      let chekpass = false;
      let chekuser = true;
      let chekform = false;

      if (
        this.selectpais != "" &&
        this.email != "" &&
        this.user != "" &&
        this.pass != "" &&
        this.repass != "" &&
        this.name != "" &&
        this.lastname != ""
      ) {
        chekform = true;
      } else {
        this.presentAlert(
          "Atencion",
          "Error de registro",
          "Debe llenar todos los campos antes de continuar"
        );
        this.loader = false;
      }

      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.user == this.user) {
          this.presentAlert(
            "Atencion",
            "Error de usuario",
            "El usuario ya existe, por favor elija uno diferente"
          );
          chekuser = false;
          this.loader = false;
          break;
        }
      }

      if (this.pass != this.repass) {
        this.presentAlert(
          "Atencion",
          "Error de contraseña",
          "Las contraseñas deben coincidir"
        );
        this.loader = false;
      } else {
        chekpass = true;
      }

      if (chekpass == true && chekuser == true && chekform == true) {
        this.data = new Data();
        this.data.user = this.user;
        this.data.password = this.pass;
        this.data.username = this.name;
        this.data.userlastname = this.lastname;
        this.data.usercountry = this.selectpais;
        this.data.userteam = this.club;
        this.data.useralias = this.alias;
        this.data.userscore = 0;
        this.data.userexp = 0;

        fetch("https://fanaticos.herokuapp.com/api", {
          method: "POST",
          body: JSON.stringify(this.data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((i) => (this.i = i));

        fetch("https://fanaticos.herokuapp.com/api", { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            this.data = new Data();
            this.datos = data;
            this.email = "";
            this.user = "";
            this.pass = "";
            this.repass = "";
            this.name = "";
            this.lastname = "";
            this.alias = "";
            this.loader = false;
            this.load();
          });
      }
    },
    async presentAlert(header, subheader, message) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: header,
        subHeader: subheader,
        message: message,
        buttons: ["OK"],
      });
      return alert.present();
    },
  },
  computed: {
    cuadrospais: function () {
      return this.datos.filter((i) => i.pais == this.selectpais);
    },
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
});
</script>