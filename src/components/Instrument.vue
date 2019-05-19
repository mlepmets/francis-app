<template>
  <div class="track-button" @click="nextTrack">
    <p class="instrument-name">
      <slot></slot>
    </p>
    <p class="instrument-status">{{ status }}</p>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex';
import { Howler, Howl } from 'howler';
// import VueHowler from 'vue-howler'
export default {
  props: {
    name: {
      required: true,
      type: String
    },
    tracks: {
      required: true,
      type: Array
    },
    beat: {
      required: true,
      type: Number
    }
  },
  // mixins: {
    // VueHowler
  // },
  data() {
    return {
      currentTrack: -1,
      howls: []
    };
  },
  computed: {
    tracksTotal: function() {
      return this.tracks.length;
    },
    status: function() {
      if (this.currentTrack === -1) {
        return 'II';
      } else {
        return this.currentTrack + 1;
      }
    },
    ...mapState(['activeChord']),
  },
  methods: {
    play() {
      if (this.beat === 1) {
        this.howls[this.currentTrack].stop();
        this.howls[this.currentTrack].play(this.activeChord);
      }
    },
    incrementCurrentTrack() {
      this.currentTrack += 1;
    },
    resetCurrentTrack() {
      this.currentTrack = -1;
    },
    nextTrack() {
      let track = this.currentTrack + 1;
      if (track === 0) {
        this.$store.dispatch('incrementInstrumentsPlayingCount');
      }

      if (track < this.tracksTotal) {
        this.incrementCurrentTrack();
      } else if (track === this.tracksTotal) {
        this.resetCurrentTrack();
        this.$store.dispatch('decrementInstrumentsPlayingCount');
      }
    }
  },
  created() {
    this.tracks.forEach(track => {
      this.howls.push(
        new Howl({
          src: `/sounds/${track}`,
          sprite: {
            Am: [0, 1999],
            C: [2000, 2999],
            Dm: [4000, 5999],
            Em: [6000, 7999],
            F: [8000, 9999],
            G: [10000, 11999]
          }
        })
      );
    });
  },
  beforeUpdate() {
    if (this.currentTrack != -1) {
      this.play();
    }
  }
};
</script>

<style scoped lang="sass">
.track-button
  width: 80vw
  height: 8vh
  font-size: 8vw
  font-family: 'Roboto'
  background: white    
  display: flex
  align-items: center
  justify-content: space-between
  margin-top: 10px
.track-button p
  box-sizing: border-box
.instrument-name
  width: 65%
  margin-left: 10px
.instrument-status
  width: 15%
</style>