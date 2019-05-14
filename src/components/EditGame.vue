<template>
  <div v-if="game" class="edit-game container">
    <h2>Edit {{ game.title }}</h2>
    <form @submit.prevent="EditGame()">
      <div class="field title">
        <label for="title">Title</label>
        <input class="white-text" type="text" name="title" v-model="game.title">
      </div>
      <div v-for="(fac, index) in game.faction" :key="index" class="field white-text">
        <label for="factions">Factions</label>
        <input class="white-text" type="text" name="factions" v-model="game.faction[index]">
        <i class="material-icons delete" @click="deleteFac(fac)">delete</i>
      </div>
      <div class="field add-faction"></div>
      <label for="add-faction">Update a Faction</label>
      <input
        class="white-text"
        type="text"
        name="add-faction"
        @keydown.tab.prevent="addFac"
        v-model="another"
      >
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn grey">Update Game</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditGame",
  data() {
    return {
      game: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    EditGame() {
      // console.log(this.game.title, this.game.factions)
      if (this.game.title) {
        this.feedback = null;
        this.game.slug = slugify(this.game.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("games")
          .doc(this.game.id)
          .update({
            title: this.game.title,
            faction: this.game.faction,
            slug: this.game.slug
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
        this.game.faction.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.faction);
      } else {
        this.feedback = "Please Enter a Faction";
      }
    },
    deleteFac(fac) {
      this.game.faction = this.game.faction.filter(faction => {
        return faction != fac;
      });
    }
  },
  created() {
    let ref = db
      .collection("games")
      .where("slug", "==", this.$route.params.game_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.game = doc.data();
        this.game.id = doc.id;
      });
    });
  }
};
</script>
<style>
html {
  background-image: url("../assets/tilebackground.png");
}
.edit-game {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-game h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-game .field {
  margin: 20px auto left right;
  position: relative;
}
.edit-game .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
