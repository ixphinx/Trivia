<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab horizontal="end" vertical="bottom" slot="fixed" v-if="button">
        <ion-fab-button color="danger">
          <img src="assets/img/logo.png" width="40" alt="" />
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="secondary" @click="fnpanelusuario()">
            <i class="fas fa-user"></i>
          </ion-fab-button>
          <ion-fab-button
            color="secondary"
            v-if="musica"
            @click="musica = false"
          >
            <i class="fas fa-volume-up"></i>
          </ion-fab-button>
          <ion-fab-button
            color="secondary"
            v-if="!musica"
            @click="musica = true"
          >
            <i class="fas fa-volume-mute"></i>
          </ion-fab-button>
          <!--
          <ion-fab-button color="secondary" @click="fnreglas()">
            <i class="far fa-question-circle"></i>
          </ion-fab-button>
          -->
        </ion-fab-list>
      </ion-fab>
      <audio
        src="assets/audio/sonidoestadio.mp3"
        autoplay
        loop
        v-if="musica"
      ></audio>
      <audio
        src="assets/audio/SWOOSHSoundEffect.mp3"
        autoplay
        v-if="gameclick"
        @ended="gameclick = false"
      ></audio>
      <audio
        src="assets/audio/Right AnswerSoundEffect.mp3"
        autoplay
        v-if="gamegood"
        @ended="gamegood = false"
      ></audio>
      <audio
        src="assets/audio/WrongAnswerSoundEffect.mp3"
        autoplay
        v-if="gamewrong"
        @ended="gamewrong = false"
      ></audio>
      <audio
        src="assets/audio/CrowdAwwSoundEffect.mp3"
        autoplay
        v-if="gamelose"
        @ended="gamelose = false"
      ></audio>
      <img
        src="assets/img/finger.gif"
        width="150"
        alt=""
        v-if="loader"
        style="margin-top: 50%; margin-left: 30%"
      />
      <div class="banner" v-if="preselect">
        <p style="font-size: 150%; margin-bottom: -1%">
          {{ usuarioalias }} - Versión de prueba
        </p>
        <p style="text-align: left">
          Vidas: <i class="fas fa-futbol" v-if="incorrectos >= 1"></i
          ><i class="fas fa-futbol" v-if="incorrectos >= 2"></i
          ><i class="fas fa-futbol" v-if="incorrectos >= 3"></i
          ><i class="fas fa-futbol" v-if="incorrectos >= 4"></i
          ><i class="fas fa-futbol" v-if="incorrectos >= 5"></i>
        </p>
        <div class="row">
          <div class="col">
            <p>Puntaje: {{ usuariopuntaje }}</p>
          </div>
          <div class="col">
            <p>
              <img src="assets/img/copa_bronce.png" width="25" alt="" />
              bronce <br />
              X {{ usuariocopasbronce }}
            </p>
          </div>
          <div class="col">
            <p>
              <img src="assets/img/copa_plata.png" width="25" alt="" /> <br />
              plata <br />
              X {{ usuariocopasplata }}
            </p>
          </div>
          <div class="col">
            <p>
              <img src="assets/img/copa_oro.png" width="25" alt="" /> <br />
              oro
              <br />
              X {{ usuariocopasoro }}
            </p>
          </div>
        </div>
      </div>

      <video
        autoplay
        preload="metadata"
        class="video"
        v-if="sponsor"
        @ended="fnvideoend()"
      >
        <source :src="sponsorvideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style="margin-top: 15%" v-if="game">
        <div v-if="reloj">
          <div
            class="container"
            style="
              text-align: center;
              color: #12ee30;
              font-size: 250%;
              font-weight: bold;
            "
            v-if="timer > 10"
          >
            <p>{{ timer }}</p>
          </div>
          <div
            class="container"
            style="
              text-align: center;
              color: #ff1616;
              font-size: 250%;
              font-weight: bold;
            "
            v-if="timer < 11"
          >
            <p>{{ timer }}</p>
          </div>
        </div>
        <div
          class="container"
          style="
            text-align: center;
            color: white;
            font-size: 100%;
            font-weight: bold;
          "
          v-if="siguientepregunta"
        >
          <p>siguiente pregunta en {{ timer }}</p>
        </div>
        <div
          class="container"
          style="
            text-align: center;
            color: white;
            font-size: 250%;
            font-weight: bold;
          "
        >
          <p>{{ titulopais }}</p>
        </div>
        <img class="questimg" :src="image" alt="" />
        <img class="bonusimg" :src="imagebonus" alt="" />
        <div class="trofeocat">
          <i class="fas fa-check" style="color: green"></i> x
          {{ preguntascorrectas }} -
          <i class="fas fa-times" style="color: red"></i> X
          {{ incorrectos }}
        </div>
        <div class="quest">
          <h3>{{ gamepregunta }}</h3>
        </div>
        <div class="answer" v-if="eleccion1">
          <h3 @click="fnseleccion(gameeleccion1, 1)">{{ gameeleccion1 }}</h3>
        </div>
        <div class="correctanswer" v-if="correct1">
          <h3>{{ gameeleccion1 }}</h3>
        </div>
        <div class="wronganswer" v-if="incorrect1">
          <h3>{{ gameeleccion1 }}</h3>
        </div>
        <div class="answer" v-if="eleccion2">
          <h3 @click="fnseleccion(gameeleccion2, 2)">{{ gameeleccion2 }}</h3>
        </div>
        <div class="correctanswer" v-if="correct2">
          <h3>{{ gameeleccion2 }}</h3>
        </div>
        <div class="wronganswer" v-if="incorrect2">
          <h3>{{ gameeleccion2 }}</h3>
        </div>
        <div class="answer" v-if="eleccion3">
          <h3 @click="fnseleccion(gameeleccion3, 3)">{{ gameeleccion3 }}</h3>
        </div>
        <div class="correctanswer" v-if="correct3">
          <h3>{{ gameeleccion3 }}</h3>
        </div>
        <div class="wronganswer" v-if="incorrect3">
          <h3>{{ gameeleccion3 }}</h3>
        </div>
        <div class="answer" v-if="eleccion4">
          <h3 @click="fnseleccion(gameeleccion4, 4)">{{ gameeleccion4 }}</h3>
        </div>
        <div class="correctanswer" v-if="correct4">
          <h3>{{ gameeleccion4 }}</h3>
        </div>
        <div class="wronganswer" v-if="incorrect4">
          <h3>{{ gameeleccion4 }}</h3>
        </div>
      </div>
      <div class="container" v-if="preselect">
        <img
          src="assets/img/logo.png"
          class="heartbeat"
          @click="inicializar()"
          alt=""
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
ion-content {
  --background: linear-gradient(to right, #283c86, #45a247);
  --background: url(/assets/img/soccerfield2.jpg) 0 0/100% 100% no-repeat;
}
.video {
  margin-top: 50%;
  width: 100%;
  height: auto;
}
.container {
  margin-top: 0%;
  margin-left: 0%;
}
.item {
  margin: 10%;
  width: 30%;
  position: relative;
  animation: ease-in;
  animation-name: icon-animated;
  animation-duration: 4s;
}

.heartbeat {
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
}

@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes icon-animated {
  0% {
    left: 0px;
    top: 0px;
  }
  25% {
    left: 200px;
    top: 0px;
  }
  50% {
    left: 200px;
    top: 200px;
  }
  75% {
    left: 0px;
    top: 200px;
  }
  100% {
    left: 0px;
    top: 0px;
  }
}
.banner {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 100%;
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
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.bonusimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
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
.questtutorial {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(
    90deg,
    rgba(230, 206, 135, 1) 0%,
    rgba(240, 190, 49, 1) 30%
  );
  border-radius: 15px;
  padding: 5px;
  margin-top: 0%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 20%;
}

.questimgtutorial {
  display: block;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.answertutorial {
  color: rgb(22, 21, 21);
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(
    90deg,
    rgba(240, 190, 49, 1) 10%,
    rgba(230, 206, 135, 1) 0%
  );
  border-radius: 20px;
  padding: 1px;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 2%;
}

.correctanswer {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(90deg, rgb(6, 252, 59) 0%, rgb(65, 143, 63) 50%);
  border-radius: 15px;
  padding: 1px;
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}

.wronganswer {
  color: white;
  text-align: center;
  font-family: "Bebas Neue", cursive;
  font-size: 200%;
  background: linear-gradient(rgb(243, 33, 33) 0%, rgb(95, 17, 17) 50%);
  border-radius: 15px;
  padding: 1px;
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}

.nextq {
  margin-top: 5%;
  margin-left: 22%;
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
  background-color: #599bb3;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 100%;
  font-weight: bold;
  padding: 7px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #3d768a;
}
.nextq:hover {
  background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
  background-color: #408c99;
}
.nextq:active {
  position: relative;
  top: 1px;
}
.trofeocat {
  margin-left: 36.6%;
  color: white;
  font-weight: bold;
}
</style>

<script>
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  alertController,
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
import axios from "axios";
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
    rate,
    img
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
    this.img = img;
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
      imagebonus: undefined,
      reloj: true,
      image: "",
      libertadores: "assets/img/047-trophyx.png",
      estadios: "assets/img/043-stadiumx.png",
      clasicos: "assets/img/040-foam handx.png",
      idolos: "assets/img/021-soccer jerseyx.png",
      mundiales: "assets/img/004-trophyx.png",
      champions: "assets/img/001-soccer ballx.png",
      img1q: "assets/img/047-trophy.png",
      img2q: "assets/img/043-stadium.png",
      img3q: "assets/img/040-foam hand.png",
      img4q: "assets/img/021-soccer jersey.png",
      img5q: "assets/img/004-trophy.png",
      img6q: "assets/img/001-soccer ball.png",
      preselect: false,
      game: false,
      loader: false,
      btnsiguiente: false,
      siguientepregunta: false,
      api: "https://fanaticos.herokuapp.com/api",

      // tutorial
      tutorial: false,
      tutorialpregunta: undefined,
      tutorialrespuesta: undefined,
      tutorialeleccion1: undefined,
      tutorialeleccion2: undefined,
      tutorialeleccion3: undefined,
      tutorialeleccion4: undefined,

      //juego
      timer: 20,
      gamepregunta: undefined,
      gamerespuesta: undefined,
      gameeleccion1: undefined,
      gameeleccion2: undefined,
      gameeleccion3: undefined,
      gameeleccion4: undefined,
      gamecategoria: undefined,
      correct1: false,
      correct2: false,
      correct3: false,
      correct4: false,
      incorrect1: false,
      incorrect2: false,
      incorrect3: false,
      incorrect4: false,
      eleccion1: true,
      eleccion2: true,
      eleccion3: true,
      eleccion4: true,
      contestado: false,
      incorrectos: 5,
      preguntascorrectas: 0,
      iodoloscorrectos: 0,
      mundialescorrectos: 0,
      championscorrectos: 0,
      clasicoscorrectos: 0,
      libertadorescorrectos: 0,
      estadioscorrectos: 0,
      conteocategoria: 0,
      copacategoria: 0,
      contsponsor: 0,
      button: true,
      contpregunta: 0,
      bonus: 0,
      contsiguiente: 6,
      contadorsiguiente: undefined,
      gameclick: false,
      gamegood: false,
      gamewrong: false,
      gamelose: false,
      musica: true,
      juego: true,
      tutorialpais: 3,
      tutorialequipo: 3,
      titulopais: "",

      //sponsors
      sponsorvideo: "",
      sponsor: false,
      sponsor1: "assets/videos/mercadopago.mp4",
      sponsor2: "assets/videos/pedidosya.mp4",
      sponsor3: "assets/videos/vinos_roses.mp4",
      sponsor4: "assets/videos/tigo.mp4",

      //videos incorrecto

      vidincorrecto1: "assets/videos/incorrecto1.mp4",
      vidincorrecto2: "assets/videos/incorrecto2.mp4",
      vidincorrecto3: "assets/videos/incorrecto3.mp4",
      vidincorrecto4: "assets/videos/incorrecto4.mp4",
      vidincorrecto5: "assets/videos/incorrecto5.mp4",
      vidincorrecto6: "assets/videos/incorrecto6.mp4",

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

      // triiva
      bonusq: false,
      categorias: [
        "Ídolos",
        "Mundiales",
        "Champions League",
        "Clásicos",
        "Copa Libertadores",
        "Estadios",
      ],
      categoriaspais: [
        "Argentina",
        "Bolivia",
        "Brasil",
        "Chile",
        "Colombia",
        "Ecuador",
        "Guyana",
        "Panamá",
        "Paraguay",
        "Perú",
        "Surinam",
        "Trinidad y Tobago",
        "Uruguay",
        "Venezuela",
        "Mexico",
      ],
      categoriaequipo: [],
      preguntas: [{ main: String, pregunta: String, ranswer: String }],
      seleccion: [],
      intervalo: undefined,
    };
  },
  created() {
    this.load();
    this.presentAlert();
  },
  methods: {
    fntimer() {
      this.timer--;
      if (this.timer < 1 || this.timer === 0) {
        clearInterval(this.intervalo);
        this.fnseleccion("tiempo fuera", 0);
      }
    },
    load() {
      this.loader = true;
      axios.get(this.api).then((res)=>{
        this.datos = res.data;
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
          if (this.usuariopuntaje == undefined) {
            this.usuariopuntaje = 0;
          }
          if (this.usuariocopasbronce == undefined) {
            this.usuariocopasbronce = 0;
          }
          if (this.usuariocopasplata == undefined) {
            this.usuariocopasplata = 0;
          }
          if (this.usuariocopasoro == undefined) {
            this.usuariocopasoro = 0;
          }
          if (this.usuarioexp == undefined) {
            this.usuarioexp = 0;
          }
          if (this.expuserid == "" || this.expuserid == undefined) {
            this.$router.push("/");
          }
          this.chekuser();
          this.loader = false;
      });
    },
    chekuser() {
      if (this.usuarionuevo) {
        this.preselect = true;
      } else {
        this.preselect = true;
      }
    },
    async presentAlert() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Listo para jugar?",
        subHeader: "",
        message:
          "Toca el corazón palpitante de Fanáticos y comienza a sumar puntos!!!",
        buttons: ["Estoy listo!"],
      });
      return alert.present();
    },
    async fnplata() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Felicidades!!!",
        subHeader: "+1 LVL",
        message:
          "Has completado 10 preguntas correctas! Pero has cometido algunos errores y has obtenido una Copa de Plata, seguro la próxima sale la de ORO",
        buttons: ["OK"],
      });
      return alert.present();
    },
    async fnbronze() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Felicidades!!!",
        subHeader: "+1 LVL",
        message:
          "Has completado 8 preguntas correctas! Sigue ganando, la copa de Plata y Oro te esperan!!!",
        buttons: ["OK"],
      });
      return alert.present();
    },
    async fnoro() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Eres un genio!!!",
        subHeader: "+1 LVL",
        message:
          "Has contestado 10 preguntas correctas! Y sin fallar ninguna! Has ganado una Copa de Oro",
        buttons: ["OK"],
      });
      return alert.present();
    },
    async fnlose() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Ups!... Lo siento...",
        subHeader: "",
        message:
          "Has fallado todos los intentos, vuelve a comenzar que seguro la proxima irá mejor!",
        buttons: ["Estoy listo!"],
      });
      return alert.present();
    },
    inicializar() {
      this.titulopais = "";
      this.eleccion4 = true;
      this.preselect = false;
      this.contestado = false;
      this.game = true;
      const rndcategoriapais = 0;
      let rndcategorias = 0;
      let rndpregunta = 0;
      let rndsponsor = 0;
      this.timer = 20;
      this.preguntas = [];
      this.seleccion = [];

      this.contsponsor++;

      if (this.contsponsor == 10) {
        this.button = false;
        this.preselect = false;
        this.game = false;
        this.sponsor = true;
        clearInterval(this.intervalo);

        rndsponsor = Math.floor(Math.random() * (4 - 0) + 0);

        switch (rndsponsor) {
          case 0:
            this.sponsor = true;
            this.sponsorvideo = this.sponsor1;
            break;
          case 1:
            this.sponsor = true;
            this.sponsorvideo = this.sponsor2;
            break;
          case 2:
            this.sponsor = true;
            this.sponsorvideo = this.sponsor3;
            break;
          case 3:
            this.sponsor = true;
            this.sponsorvideo = this.sponsor4;
            break;

          default:
            break;
        }

        this.contsponsor = 0;
      }

      if (this.incorrectos == 3 && this.bonus == 0) {
        console.log("pregunta de bonus");
        this.bonus++;
        this.image = "";
        this.fnbonus();
      }

      if (this.usuarionuevo) {
        console.log("usuario nuevo");
        this.fntutorialpais();
      }

      if (!this.bonusq && this.juego && !this.usuarionuevo) {
        this.imagebonus = "";
        console.log("categorias");
        console.log(this.bonusq);
        rndcategorias = Math.floor(
          Math.random() * (this.categorias.length - 0) + 0
        );
        console.log(rndcategorias);

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.main == this.categorias[rndcategorias]) {
            this.preguntas.push({
              main: element.main,
              pregunta: element.pregunta,
              ranswer: element.ranswer,
            });
          }
        }

        switch (this.categorias[rndcategorias]) {
          case "Ídolos":
            this.image = this.idolos;
            this.gamecategoria = "idolos";
            this.conteocategoria = this.iodoloscorrectos;
            break;
          case "Mundiales":
            this.image = this.mundiales;
            this.gamecategoria = "mundiales";
            this.conteocategoria = this.mundialescorrectos;
            break;
          case "Champions League":
            this.image = this.champions;
            this.gamecategoria = "champions";
            this.conteocategoria = this.championscorrectos;
            break;
          case "Clásicos":
            this.image = this.clasicos;
            this.gamecategoria = "clasicos";
            this.conteocategoria = this.clasicoscorrectos;
            break;
          case "Copa Libertadores":
            this.image = this.libertadores;
            this.gamecategoria = "libertadores";
            this.conteocategoria = this.libertadorescorrectos;
            break;
          case "Estadios":
            this.image = this.estadios;
            this.gamecategoria = "estadios";
            this.conteocategoria = this.estadioscorrectos;
            break;

          default:
            break;
        }

        rndpregunta = Math.floor(
          Math.random() * (this.preguntas.length - 0) + 0
        );

        this.contpregunta = rndpregunta;

        this.gamepregunta = this.preguntas[rndpregunta].pregunta;
        this.gamerespuesta = this.preguntas[rndpregunta].ranswer;

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.answerid == this.gamepregunta) {
            this.seleccion.push({
              answer: element.answer,
              answerid: element.answerid,
            });
          }
        }

        this.gameeleccion1 = this.seleccion[0].answer;
        this.gameeleccion2 = this.seleccion[1].answer;
        this.gameeleccion3 = this.seleccion[2].answer;
        this.gameeleccion4 = this.seleccion[3].answer;
      }
      this.intervalo = setInterval(this.fntimer, 1000);
    },
    fntutorialpais() {
      let rndpregunta = 0;
      this.preguntas = [];
      this.seleccion = [];
      console.log(this.tutorialpais);

      if (this.tutorialpais < 1) {
        this.fntutorialequipo();
      }

      this.imagebonus = "";
      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.main == this.usuariopais) {
          this.preguntas.push({
            main: element.main,
            pregunta: element.pregunta,
            ranswer: element.ranswer,
          });
        }
      }

      if (this.preguntas.length == 0 ) {
        this.usuarionuevo = false;
        clearInterval(this.intervalo);
        this.data.newuser = this.usuarionuevo;
        axios.put(this.api + "/" + this.expuserid, this.data).then((res)=>{
          console.log(res);
        });
        this.fnhome();
      } else if (this.tutorialpais > 0) {
        console.log(this.preguntas.length);
        rndpregunta = Math.floor(
          Math.random() * (this.preguntas.length - 0) + 0
        );

        this.contpregunta = rndpregunta;

        this.gamepregunta = this.preguntas[rndpregunta].pregunta;
        this.gamerespuesta = this.preguntas[rndpregunta].ranswer;

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.answerid == this.gamepregunta) {
            this.seleccion.push({
              answer: element.answer,
              answerid: element.answerid,
            });
          }
        }

        this.gameeleccion1 = this.seleccion[0].answer;
        this.gameeleccion2 = this.seleccion[1].answer;
        this.gameeleccion3 = this.seleccion[2].answer;
        this.gameeleccion4 = this.seleccion[3].answer;
        this.titulopais = this.usuariopais;

        this.tutorialpais--;
      }
    },
    fntutorialequipo() {
      let rndpregunta = 0;
      this.preguntas = [];
      this.seleccion = [];

      console.log(this.usuarioequipo);

      if (this.tutorialequipo < 1) {
        this.usuarionuevo = false;
        clearInterval(this.intervalo);
        this.data.newuser = this.usuarionuevo;
        axios.put(this.api + "/" + this.expuserid, this.data).then((res)=>{
          console.log(res);
        });
        this.fnhome();
      }

      this.preguntas = [];

      this.imagebonus = "";
      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.main == this.usuarioequipo) {
          this.preguntas.push({
            main: element.main,
            pregunta: element.pregunta,
            ranswer: element.ranswer,
          });
        }
      }

      console.log(this.preguntas.length);

      if (this.preguntas.length == 0) {
        this.usuarionuevo = false;
        clearInterval(this.intervalo);
        this.data.newuser = this.usuarionuevo;
        axios.put(this.api + "/" + this.expuserid, this.data).then((res)=>{
          console.log(res);
        });
        this.titulopais = "";
        this.inicializar();
      } else {
        rndpregunta = Math.floor(
          Math.random() * (this.preguntas.length - 0) + 0
        );

        this.contpregunta = rndpregunta;

        this.gamepregunta = this.preguntas[rndpregunta].pregunta;
        this.gamerespuesta = this.preguntas[rndpregunta].ranswer;

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.answerid == this.gamepregunta) {
            this.seleccion.push({
              answer: element.answer,
              answerid: element.answerid,
            });
          }
        }

        this.gameeleccion1 = this.seleccion[0].answer;
        this.gameeleccion2 = this.seleccion[1].answer;
        this.gameeleccion3 = this.seleccion[2].answer;
        this.eleccion4 = false;
        this.titulopais = this.usuarioequipo;

        this.tutorialequipo--;
      }
    },
    fnbonus() {
      this.bonusq = true;
      let rndpregunta = 0;
      this.timer = 20;
      this.preguntas = [];
      this.seleccion = [];

      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.main == "Bonus") {
          this.preguntas.push({
            main: element.main,
            pregunta: element.pregunta,
            ranswer: element.ranswer,
            img: element.img,
          });
        }
      }

      rndpregunta = Math.floor(Math.random() * (this.preguntas.length - 0) + 0);

      this.imagebonus = this.preguntas[rndpregunta].img;
      console.log(this.preguntas[rndpregunta].img);
      this.gamepregunta = this.preguntas[rndpregunta].pregunta;
      console.log(this.preguntas[rndpregunta].pregunta);
      this.gamerespuesta = this.preguntas[rndpregunta].ranswer;
      console.log(this.preguntas[rndpregunta].ranswer);

      for (let i = 0; i < this.datos.length; i++) {
        const element = this.datos[i];
        if (element.answerid == this.gamepregunta) {
          this.seleccion.push({
            answer: element.answer,
            answerid: element.answerid,
          });
        }
      }

      this.gameeleccion1 = this.seleccion[0].answer;
      this.gameeleccion2 = this.seleccion[1].answer;
      this.gameeleccion3 = this.seleccion[2].answer;
      this.eleccion4 = false;
      //this.intervalo = setInterval(this.fntimer, 1000);
    },
    fnseleccion(respuesta, resnum) {
      clearInterval(this.intervalo);
      if (!this.contestado) {
        if (this.gamerespuesta == respuesta) {
          switch (resnum) {
            case 1:
              this.gamegood = true;
              this.eleccion1 = false;
              this.correct1 = true;
              break;
            case 2:
              this.gamegood = true;
              this.eleccion2 = false;
              this.correct2 = true;
              break;
            case 3:
              this.gamegood = true;
              this.eleccion3 = false;
              this.correct3 = true;
              break;
            case 4:
              this.gamegood = true;
              this.eleccion4 = false;
              this.correct4 = true;
              break;
            default:
              break;
          }
          this.respuestacorrecta();
        } else {
          switch (resnum) {
            case 1:
              this.gamewrong = true;
              this.eleccion1 = false;
              this.incorrect1 = true;
              break;
            case 2:
              this.gamewrong = true;
              this.eleccion2 = false;
              this.incorrect2 = true;
              break;
            case 3:
              this.gamewrong = true;
              this.eleccion3 = false;
              this.incorrect3 = true;
              break;
            case 4:
              this.gamewrong = true;
              this.eleccion4 = false;
              this.incorrect4 = true;
              break;
            default:
              break;
          }
          this.respuestaincorrecta();
        }
        this.contestado = true;
        this.btnsiguiente = true;
      }
    },
    respuestacorrecta() {
      this.bonusq = false;
      this.usuariopuntaje = this.usuariopuntaje + 15;
      this.preguntascorrectas++;

      if (this.preguntascorrectas == 8 && this.incorrectos <= 5) {
        this.usuariocopasbronce++;
        this.usuarioexp++;
        this.incorrectos = 5;
        this.conteocategoria = 0;
        this.copacategoria = 0;
        this.preselect = true;
        this.game = false;
        this.fnbronze();
      }
      if (this.preguntascorrectas == 10 && this.incorrectos < 5) {
        this.usuariocopasplata++;
        this.usuarioexp++;
        this.incorrectos = 5;
        this.conteocategoria = 0;
        this.copacategoria = 0;
        this.preselect = true;
        this.game = false;
        this.fnplata();
      }
      if (this.preguntascorrectas == 10 && this.incorrectos == 5) {
        this.usuariocopasoro++;
        this.usuarioexp++;
        this.incorrectos = 5;
        this.conteocategoria = 0;
        this.copacategoria = 0;
        this.preselect = true;
        this.game = false;
        this.fnoro();
      }

      this.data.userscore = this.usuariopuntaje;
      this.data.userbrzcup = this.usuariocopasbronce;
      this.data.usersilvcup = this.usuariocopasplata;
      this.data.usergoldcup = this.usuariocopasoro;
      this.data.userexp = this.usuarioexp;

      axios.put(this.api + "/" + this.expuserid, this.data).then((res)=>{
        console.log(res);
      });
      this.contadorsiguiente = setInterval(this.fntimersiguiente, 1000);
    },
    respuestaincorrecta() {
      this.incorrectos--;

      if (this.usuarionuevo) {
        this.incorrectos++;
      }

      clearInterval(this.intervalo);

      let rndsponsor = Math.floor(Math.random() * (20 - 0) + 0);

      if (this.incorrectos > 2) {
        switch (rndsponsor) {
          case 0:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto1;
            console.log(this.vidincorrecto1);
            break;
          case 3:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto2;
            console.log(this.vidincorrecto2);
            break;
          case 9:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto3;
            console.log(this.vidincorrecto3);
            break;
          case 14:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto4;
            console.log(this.vidincorrecto4);
            break;
          case 17:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto5;
            console.log(this.vidincorrecto5);
            break;
          case 20:
            this.button = false;
            this.preselect = false;
            this.game = false;
            this.sponsor = true;
            this.sponsorvideo = this.vidincorrecto6;
            console.log(this.vidincorrecto6);
            break;

          default:
            break;
        }
      }
      rndsponsor = 0;

      if (this.incorrectos < 1) {
        this.incorrectos = 5;
        this.preguntascorrectas = 0;
        this.conteocategoria = 0;
        this.copacategoria = 0;
        this.bonus = 0;
        this.preselect = true;
        this.game = false;
        this.correct1 = false;
        this.correct2 = false;
        this.correct3 = false;
        this.correct4 = false;
        this.incorrect1 = false;
        this.incorrect2 = false;
        this.incorrect3 = false;
        this.incorrect4 = false;
        this.eleccion1 = true;
        this.eleccion2 = true;
        this.eleccion3 = true;
        this.eleccion4 = true;
        this.contestado = false;
        this.btnsiguiente = false;
        this.gamewrong = false;
        this.gamelose = true;
        this.fnlose();
      } else {
        this.contadorsiguiente = setInterval(this.fntimersiguiente, 1000);
      }
    },
    fntimersiguiente() {
      this.reloj = false;
      this.siguientepregunta = true;
      this.contsiguiente--;
      this.timer = this.contsiguiente;
      if (this.contsiguiente < 1) {
        this.contsiguiente = 6;
        clearInterval(this.contadorsiguiente);
        this.reloj = true;
        this.siguientepregunta = false;
        this.fnsiguiente();
      }
    },
    fnsiguiente() {
      this.bonusq = false;
      this.correct1 = false;
      this.correct2 = false;
      this.correct3 = false;
      this.correct4 = false;
      this.incorrect1 = false;
      this.incorrect2 = false;
      this.incorrect3 = false;
      this.incorrect4 = false;
      this.eleccion1 = true;
      this.eleccion2 = true;
      this.eleccion3 = true;
      this.eleccion4 = true;
      this.contestado = false;
      this.btnsiguiente = false;
      this.categoriaequipo = [];
      this.preguntas = [];
      this.seleccion = [];
      this.titulopais = "";
      this.inicializar();
    },
    fnhome() {
      clearInterval(this.intervalo);
      this.game = false;
      this.preselect = true;
    },
    fnvideoend() {
      this.timer = 20;
      this.game = true;
      this.sponsor = false;
      this.preselect = false;
      this.button = true;
      let rndcategorias = 0;
      //let rndpregunta = 0;
      this.reloj = true;
      this.siguientepregunta = false;

      if (this.usuarionuevo) {
        this.fntutorialpais();
      }

      if (this.game && !this.usuarionuevo) {
        rndcategorias = Math.floor(
          Math.random() * (this.categorias.length - 0) + 0
        );
        console.log(rndcategorias);

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.main == this.categorias[rndcategorias]) {
            this.preguntas.push({
              main: element.main,
              pregunta: element.pregunta,
              ranswer: element.ranswer,
            });
          }
        }

        switch (this.categorias[rndcategorias]) {
          case "Ídolos":
            this.image = this.idolos;
            this.gamecategoria = "idolos";
            this.conteocategoria = this.iodoloscorrectos;
            break;
          case "Mundiales":
            this.image = this.mundiales;
            this.gamecategoria = "mundiales";
            this.conteocategoria = this.mundialescorrectos;
            break;
          case "Champions League":
            this.image = this.champions;
            this.gamecategoria = "champions";
            this.conteocategoria = this.championscorrectos;
            break;
          case "Clásicos":
            this.image = this.clasicos;
            this.gamecategoria = "clasicos";
            this.conteocategoria = this.clasicoscorrectos;
            break;
          case "Copa Libertadores":
            this.image = this.libertadores;
            this.gamecategoria = "libertadores";
            this.conteocategoria = this.libertadorescorrectos;
            break;
          case "Estadios":
            this.image = this.estadios;
            this.gamecategoria = "estadios";
            this.conteocategoria = this.estadioscorrectos;
            break;

          default:
            break;
        }
        /*--
        rndpregunta = Math.floor(
          Math.random() * (this.preguntas.length - 0) + 0
        );

        this.contpregunta = rndpregunta;

        this.gamepregunta = this.preguntas[rndpregunta].pregunta;
        this.gamerespuesta = this.preguntas[rndpregunta].ranswer;

        for (let i = 0; i < this.datos.length; i++) {
          const element = this.datos[i];
          if (element.answerid == this.gamepregunta) {
            this.seleccion.push({
              answer: element.answer,
              answerid: element.answerid,
            });
          }
        }

        this.gameeleccion1 = this.seleccion[0].answer;
        this.gameeleccion2 = this.seleccion[1].answer;
        this.gameeleccion3 = this.seleccion[2].answer;
        this.gameeleccion4 = this.seleccion[3].answer;
        --*/
      }
    },
    fnpanelusuario() {
      clearInterval(this.intervalo);
      this.$router.push("/panelusuario");
    },
    async fnreglas() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Reglamento de juego",
        subHeader: "",
        message:
          "El objetivo del juego consiste en obtener copas doradas. Para estas debes contestar 10 preguntas correctamente de cada categoria o más sin equivocarte (dispones de 5 intentos), si te equivocas obtendrás una copa de plata. Cáda vez que completes 10 preguntas correctas de una categoría en una misma ronda recibirás una copa de bronce, así mismo cada respuesta correcta equivale a 15 puntos. Las categorías son: Mundiales, Ídolos, Estadios, Libertadores, Champions, Clásicos",
        buttons: ["Entendido"],
      });
      return alert.present();
    },
  },
  components: { IonContent, IonPage },
};
</script>