<template>
    <div v-if="game" class="edit-game container">
        <h2>
            Edit {{ game.title }}
        </h2>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: "EditGame",
    data(){
        return {
            game: null,
        }
    },
    created(){
        let ref = db.collection('games').where('slug', '==', this.$route.params.game_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.game = doc.data()
                this.game.id =  doc.id
            })
        })
    }
}
</script>

<style>

</style>

