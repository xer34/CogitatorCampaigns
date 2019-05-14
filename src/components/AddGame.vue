<template>
  <div class="add-game container">
    <h2 class="center-align white-text">Add A Recent Game</h2>
    <form @submit.prevent="AddGame()">
      <div class="field title">
        <label for="title">Title</label>
        <input class="white-text" type="text" name="title" v-model="title">
      </div>
      <div v-for="(fac, index) in faction" :key="index" class="field white-text">
        <label for="factions">Factions</label>
        <input class="white-text" type="text" name="factions" v-model="faction[index]">
        <i class="material-icons delete" @click="deleteFac(fac)">delete</i>
      </div>
      <div class="field add-faction"></div>
      <label for="add-faction">Add a Faction</label>
      <input
        class="white-text"
        type="text"
        name="add-faction"
        @keydown.tab.prevent="addFac"
        v-model="another"
      >
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn grey">Add Game</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddCampaign",
  data() {
    return {
      title: null,
      another: null,
      faction: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddGame() {
      console.log(this.title, this.factions);
      if (this.title) {
        this.feedback = null;
        //create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
        db.collection("games")
          .add({
            title: this.title,
            faction: this.faction,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
            console.log(this.slug);
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You must enter a title";
      }
    },
    addFac() {
      if (this.another) {
        this.faction.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.faction);
      } else {
        this.feedback = "Please Enter a Faction";
      }
    },
    deleteFac(fac) {
      this.faction = this.faction.filter(faction => {
        return faction != fac;
      });
    }
  }
};
</script>
<style>
html {
  background-image: url("../assets/tilebackground.png");
}
.add-game {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-game h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-game .field {
  margin: 20px auto left right;
  position: relative;
}
.add-game .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
