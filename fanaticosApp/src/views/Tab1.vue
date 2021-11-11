<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content>
          <div class="logo" v-if="logo">
            <video
            width="200"
            preload="metadata"
            loop
            autoplay
          >
            <source src="assets/img/logowhite.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          <div class="logo">
            <video
            width="200"
            preload="metadata"
            autoplay
            @ended="autoclose()"
            v-if="video"
          >
            <source :src= videox type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          <ion-item>
            <ion-label position="floating">Nombre de usuario</ion-label>
            <ion-input v-model="user"></ion-input>
          </ion-item>
          <ion-item v-if="versionok">
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="pass" @keyup.enter="entrar()"></ion-input>
          </ion-item>
          <div class="register">
            <a href="http://fanaticosfest.com">No tienes cuenta? Registrate aqui.</a>
          </div>
          <div style="text-align: center; margin-top: 20px" v-if="versionok">
            <a class="btnentrar" @click="entrar()">entrar</a>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,300&display=swap");
ion-toolbar {
  text-align: center;
  color: white;
  --background: #02796f;
}
ion-content {
  --background: linear-gradient(to right, #283c86, #45a247);
  --background: url(/assets/img/soccerfield2.jpg) 0 0/100% 100% no-repeat;
}
ion-card {
  margin-top: 5%;
  margin-left: 30px;
  margin-right: 30px;
  --color: "warning";
  border-radius: 50px;
}

.logo {
  text-align: center;
  margin-top: 0%;
  margin-bottom: 8%;
}

.btnentrar {
  box-shadow: inset 0px 0px 14px -3px #f2fadc;
  background: linear-gradient(to bottom, #dbe6c4 5%, #9ba892 100%);
  background-color: #dbe6c4;
  border-radius: 6px;
  border: 1px solid #b2b8ad;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ced9bf;
}
.btnentrar:hover {
  background: linear-gradient(to bottom, #9ba892 5%, #dbe6c4 100%);
  background-color: #9ba892;
}
.btnentrar:active {
  position: relative;
  top: 1px;
}

.register {
  text-align: left;
  margin-top: 30%;
  margin-left: 9%;
  color: rgb(55, 53, 167);
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
</style>

<script>
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  alertController,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Modal from "./modal.vue";
import axios from "axios";
export let expuser = "";
export let expuserid = "";

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

export default {
  components: {
    IonPage,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
  },
  data() {
    return {
      data: new Data(),
      datos: [],
      name: "",
      email: "",
      isOpen: false,
      modal: null,
      user: "",
      pass: "",
      expuserid1: "",
      video: true,
      logo: false,
      versionok: true,
      versionx: 1,
      api: "https://fanaticos.herokuapp.com/api",

      // videos
      videox: "",
      video1: "assets/videos/bienvenido.mp4",
      video2: "assets/videos/bienvenido2.mp4",
      video3: "assets/videos/bienvenido3.mp4",
      video4: "assets/videos/bienvenido4.mp4",
      video5: "assets/videos/bienvenido5.mp4",
    };
  },
  name: "Tab1",

  created() {
    this.load();
  },
  methods: {
    load() {
      let random = 0;

      random = Math.floor(Math.random() * (5 - 0) + 0);

      switch (random) {
        case 0:
          this.videox = this.video1;          
          break;
        case 1:
          this.videox = this.video2;
          break;
        case 2:
          this.videox = this.video3;
          break;
        case 3:
          this.videox = this.video4;
          break
      
        default:
          this.videox = this.video1;
          break;
      }

      axios.get(this.api).then((res)=>{
        this.datos = res.data;
      });
     
    },
    entrar() {
      let chekuser = false;
      let chekpass = false;
      let passid = undefined;
      let pass = undefined;

      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.user == this.user) {
          chekuser = true;
          passid = element._id;
          expuserid = element._id;
          expuser = element.user;
          break;
        }
      }

      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element._id == passid) {
          pass = element.password;
          break;
        }
      }

      if (pass == this.pass) {
        chekpass = true;
      }

      if (!chekpass && !chekuser) {
        this.presentAlert(
          "Atencion",
          "Error de login",
          "Usuario o Contraseña incorrectos, intentelo de nuevo."
        );
      } else {
        this.$router.push("/tab2");
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

    async openModal() {
      this.modal = await modalController.create({
        component: Modal,
        cssClass: "my-custom-class",
        componentProps: {
          data: {
            content: "New Content",
          },
          propsData: {
            title: "New title",
          },
        },
      });
      return this.modal.present();
    },
    autoclose() {
      this.video = false;
      this.logo = true;
    },
  },

  computed: {
    
  },
};
</script>