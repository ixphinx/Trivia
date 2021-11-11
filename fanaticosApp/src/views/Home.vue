<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container"> 
        <img src="assets/img/logo.png" alt="" /> <br />
        <ion-button color="success" shape="round">Iniciar</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
  },
  methods: {},
  computed: {},
});
</script>

<style scoped>
ion-content{
  --ion-background-color: linear-gradient(to right, #11998e, #38ef7d);
}
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.my-custom-class {
  --background: #222;
  --spinner-color: #fff;

  color: #fff;
}

video {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>