<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button color="danger">
          <ion-icon
            md="caret-back"
            ios="chevron-back-circle-outline"
          ></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="secondary">
            <i class="fas fa-home"></i>
          </ion-fab-button>
          <ion-fab-button color="secondary">
            <i class="fas fa-user"></i>
          </ion-fab-button>
          <ion-fab-button color="secondary">
            <i class="fas fa-user-cog"></i>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <img class="questimg" :src="image" alt="" />
      <div class="quest">
        <h3>pregunta 1</h3>
      </div>
      <div class="answer">
        <h3>respuesta 1</h3>
      </div>
      <div class="answer">
        <h3>respuesta 2</h3>
      </div>
      <div class="answer">
        <h3>respuesta 3</h3>
      </div>
      <div class="answer">
        <h3>respuesta 4</h3>
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
  name: "Tab2",
  data() {
    return {
      data: new Data(),
      datos: [],
      expuser,
      expuserid,
      username: "",
      userlastname: "",
      image: "",
      img1: "assets/img/047-trophyx.png",
      img2: "assets/img/043-stadiumx.png",
      img3: "assets/img/040-foam handx.png",
      img4: "assets/img/021-soccer jerseyx.png",
      img5: "assets/img/004-trophyx.png",
      img6: "assets/img/001-soccer ballx.png",
      img1q: "assets/img/047-trophy.png",
      img2q: "assets/img/043-stadium.png",
      img3q: "assets/img/040-foam hand.png",
      img4q: "assets/img/021-soccer jersey.png",
      img5q: "assets/img/004-trophy.png",
      img6q: "assets/img/001-soccer ball.png",
      preselect: true,
      seclibertadores: false,
      secestadios: false,
      secclasicos: false,
      secidolos: false,
      secmundiales: false,
      secchampions: false,
      quest: false,
      questimg: false,
      answer: false,
    };
  },
  created() {
    // this.load();
  },
  methods: {
    load() {
      fetch("https://fanaticos.herokuapp.com/api", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          this.datos = data;
          for (let i = 0; i < this.datos.length; i++) {
            const element = this.datos[i];
            if (element._id == this.expuserid) {
              this.username = element.username;
              this.userlastname = element.userlastname;
              break;
            }
          }
          if (this.expuserid == "" || this.expuserid == undefined) {
            this.$router.push("/");
          }
        });
    },
    libertadores() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img1q;
      this.questimg = true;
    },
    estadios() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img2q;
      this.questimg = true;
    },
    clasicos() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img3q;
      this.questimg = true;
    },
    idolos() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img4q;
      this.questimg = true;
    },
    mundiales() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img5q;
      this.questimg = true;
    },
    champions() {
      this.preselect = false;
      this.quest = true;
      this.answer = true;
      this.image = this.img6q;
      this.questimg = true;
    },
  },
  components: { IonContent, IonPage },
};
</script>