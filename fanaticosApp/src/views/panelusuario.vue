<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab horizontal="end" vertical="bottom" slot="fixed" v-if="button">
        <ion-fab-button color="danger">
          <img src="assets/img/logo.png" width="40" alt="" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="secondary" @click="fnhome()">
            <i class="fas fa-home"></i>
          </ion-fab-button>
          <ion-fab-button color="secondary">
            <i class="fas fa-user"></i>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
      <img
        src="assets/img/finger.gif"
        width="150"
        alt=""
        v-if="loader"
        style="margin-top: 50%; margin-left: 30%"
      />
      <div class="panel" v-if="userpanel">
        <div class="alias">
          <div>
            <h1 style="margin-left: 15%; margin-top: 5%">{{ usuarioalias }}</h1>
          </div>
        </div>
        <div class="usuario">
          <div class="nombre">
            <p>{{ usuarionombre + " " + usuarioapellido }}</p>
          </div>
          <div class="nivel">
            <p>Nivel: {{ usuarioexp }}</p>
          </div>
          <hr color="#CDC8C8" />
          <ul class="lista">
            <li>
              <div class="trofeos"><p>Trofeos obtenidos</p></div>
            </li>
          </ul>
          <div class="copas">
            <ul class="lista">
              <li>
                <div class="copaBronce">
                  <img
                    src="/assets/img/copa_bronce.png"
                    width="25"
                    height="25"
                    alt=""
                  />
                  <p>x{{ usuariocopasbronce }}</p>
                </div>
              </li>
              <li>
                <div class="copaOro">
                  <img
                    src="/assets/img/copa_oro.png"
                    width="40"
                    height="40"
                    alt=""
                  />
                  <p>x{{ usuariocopasoro }}</p>
                </div>
              </li>
              <li>
                <div class="copaPlata">
                  <img
                    src="/assets/img/copa_plata.png"
                    width="25"
                    height="25"
                    alt=""
                  />
                  <p>x{{ usuariocopasplata }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="opciones">
            <ul>
              <hr :color="colorbtn" />
              <li  @click="cambiarnombre()"><i class="fas fa-user-edit"></i>&nbsp;Cambiar Nombre</li>
              <hr :color="colorbtn" />
              <li @click="cambiaralias()"><i class="fas fa-edit"></i>&nbsp;Cambiar Alias</li>
              <hr :color="colorbtn" />
              <li @click="cambiarpass()"><i class="fas fa-key"></i>&nbsp;Cambiar Contraseña</li>
              <hr :color="colorbtn" />
            </ul>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Goldman&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

ion-content {
  --background: linear-gradient(to right, #283c86, #45a247);
  --background: url(/assets/img/soccerfield2.jpg) 0 0/100% 100% no-repeat;
}
.panel {
  position: relative;
}
.alias {
  position: absolute;
  left: 10%;
  top: 10px;
  z-index: 2;
  width: 60%;
  border-radius: 10px;
  background: rgb(0, 0, 0);
  border: #ffffff solid;
  margin-left: 12%;
  align-content: center;
}
.alias h1 {
  font-family: "Montserrat", sans-serif;
  color: white;
}
.trofeos {
  height: 50%;
  width: 60%;
  margin: 0px auto;
  margin-left: 15%;
}
.trofeos p {
  font-family: "Russo One", sans-serif;
  color: #5c5a5a;
  text-align: center;
}
.usuario {
  position: absolute;
  left: 6%;
  top: 50px;
  z-index: 1;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  margin-left: 5%;
  width: 80%;
}
.usuario p {
  text-align: center;
}
.nombre {
  height: 50%;
  width: 50%;
  margin: 0px auto;

  margin-top: 5%;
  font-family: "Russo One", sans-serif;
  color: #5c5a5a;
  text-align: center;
}
.nivel {
  height: 50%;
  width: 50%;
  margin: 0px auto;

  margin-top: 5%;
}
.nivel p {
  font-family: "Russo One", sans-serif;
  color: #5c5a5a;
  text-align: center;
}

.copas li {
  display: inline-block;

  margin-right: 10%;
  margin-left: 10%;
}

.copas p {
  font-family: "Russo One", sans-serif;
  color: #020202;
  text-align: center;
}

.nivelCopas {
  background: rgb(226, 238, 156);
  border-radius: 10px;
}

.nivelCopas p {
  color: #020202;
}

.fondoCopas {
  background: rgb(255, 255, 255);
  border-radius: 10px;
}

.opciones {
  background: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 0%;
  margin-left: 2%;
  margin-right: 10%;
}
.opciones li {
  background: #f0f0f0;
  color: #020202;

  list-style: none;
}

.container {
  margin-top: 0%;
  margin-left: 0%;
}
.item {
  margin: 10%;
  width: 30%;
}
.banner {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(to right, #283c86, #177f83);
  border-radius: 15px;
  padding: 5px;
  margin-top: 10%;
  margin-left: 2%;
  margin-right: 2%;
}
.quest {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(to right, #614b63, #9d2ea7);
  border-radius: 15px;
  padding: 5px;
  margin-top: 0%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 20%;
}

.questimg {
  display: block;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.answer {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(to right, #c8bfca, #c77fe4);
  border-radius: 15px;
  padding: 1px;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%;
}

.lista {
  list-style: none;
}
</style>

<script>
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/vue";
import {
  add,
  arrowBackCircle,
  arrowForwardCircle,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  person,
  settings,
  share,
} from "ionicons/icons";
import { defineComponent } from "vue";
import { expuser } from "./Tab1.vue";
import { expuserid } from "./Tab1.vue";

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
    newuser,
    userbrzcup,
    usersilvcup,
    usergoldcup,

    /* Trivia */
    main,
    type,
    code,
    pregunta,
    ranswer,
    answer,
    answerid,
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
    this.newuser = newuser;
    this.userbrzcup = userbrzcup;
    this.usersilvcup = usersilvcup;
    this.usergoldcup = usergoldcup;

    /* Trivia */
    this.main = main;
    this.type = type;
    this.code = code;
    this.pregunta = pregunta;
    this.ranswer = ranswer;
    this.answer = answer;
    this.answerid = answerid;
    this.rate = rate;
  }
}

export default {
  name: "Tab2",
  data() {
    return {
      data: new Data(),
      datos: [],
      expuser,
      expuserid,
      colorbtn: "#CDC8C8",
      loader: false,
      userpanel: true,
      button: true,

      // usuario

      usuarioid: undefined,
      usuarionombre: undefined,
      usuarioapellido: undefined,
      usuarioexp: undefined,
      usuarionuevo: Boolean,
      usuariopais: undefined,
      usuarioequipo: undefined,
      usuariopuntaje: undefined,
      usuariocopasbronce: undefined,
      usuariocopasplata: undefined,
      usuariocopasoro: undefined,
      usuarioalias: undefined,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loader = true;
      this.userpanel = false;
      this.button = false;
      fetch("https://fanaticos.herokuapp.com/api", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.datos = data;
          for (let i = 0; i < this.datos.length; i++) {
            const element = this.datos[i];
            if (element._id == this.expuserid) {
              this.usuarionombre = element.username;
              this.usuarioapellido = element.userlastname;
              this.usuarioid = element.expuserid;
              this.usuarioexp = element.userexp;
              this.usuarionuevo = element.newuser;
              this.usuariopais = element.usercountry;
              this.usuarioequipo = element.userteam;
              this.usuariopuntaje = element.userscore;
              this.usuariocopasbronce = element.userbrzcup;
              this.usuariocopasplata = element.usersilvcup;
              this.usuariocopasoro = element.usergoldcup;
              this.usuarioalias = element.useralias;
              break;
            }
          }
          if (this.expuserid == "" || this.expuserid == undefined) {
            this.$router.push("/");
          }
          this.userpanel = true;
          this.loader = false;
          this.button = true;
        });
    },

    cambiarnombre(){
      let newname = prompt("Introduce un nuevo nombre, o dejalo en blanco para mantener el actual", "Atencion");
      let newlastname = prompt("Introduce un nuevo apellido, o dejalo en blanco para mantener el actual", "Atencion");

      if (newname == undefined || newname == null || newname == ""){
        newname = this.username;
      }

      if (newlastname == undefined || newlastname == null || newlastname == ""){
        newlastname = this.userlastname;
      }

      this.data = new Data();
      this.username = newname;
      this.userlastname = newlastname
      fetch("https://fanaticos.herokuapp.com/api/" + this.expuserid, {
        method: "PUT",
        body: JSON.stringify(this.data),
        headers: {
          Accept: "application/json",
          "Content-type": "application/jason",
        }
      })
      .then((res) => res.json())
      .then((i) => this.i = i);

    },
    cambiaralias(){
      const newalias = prompt("Escribe tu nueva Alias", "Atencion");

      this.data = new Data();
      this.useralias = newalias;

      fetch("https://fanaticos.herokuapp.com/api/" + this.expuserid, {
        method: "PUT",
        body: JSON.stringify(this.data),
        headers: {
          Accept: "application/json",
          "Content-type": "application/jason",
        }
      })
      .then((res) => res.json())
      .then((i) => this.i = i);

    },

    cambiarpass(){
      const newpass = prompt("Escribe tu nueva contraseña", "Atencion");

      this.data = new Data();

      if (newpass !=""){
        fetch("https://fanaticos.herokuapp.com/api/" + this.expuserid, {
        method: "PUT",
        body: JSON.stringify(this.data),
        headers: {
          Accept: "application/json",
          "Content-type": "application/jason",
        }
      })
      .then((res) => res.json())
      .then((i) => this.i = i);
      } else {
        alert("Su nueva contraseña no debe estar vacía");
      }

    },
    fnhome(){
      this.$router.push('/tab2');
    }

  },
  components: { IonContent, IonPage },
};
</script>