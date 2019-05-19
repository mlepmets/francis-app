<template>
  <div id="app">
    <nav class="header">
      <div class="tab player">
        <p>Player</p>
      </div>
      <div class="tab francis">
        <p>Francis</p>
      </div>
    </nav>
    <div class="main">
      <div class="tracks">
        <Instrument
          v-for="instrument in instruments"
          :beat="beat"
          :name="instrument.name"
          :tracks="[instrument.name + '-1.mp3', instrument.name + '-2.mp3']"
          class="first-track"
          :key="instrument.name"
        >{{ instrument.displayName }}</Instrument>
      </div>
      <div class="controls">
        <Chord
          v-for="chord in chords"
          @click.native="setActiveChord(chord)"
          :data-name="chord"
          :class="chord === activeChord ? 'active-chord' : ''"
          :key="chord"
        >{{ chord }}</Chord>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Instrument from './components/Instrument.vue';
import Chord from './components/Chord.vue';

export default {
  name: 'app',
  components: {
    Instrument,
    Chord
  },
  data() {
    return {
      interval: 500, // 500 ms is the length of a 1/4 note at 120 bpm
      counter: 0,
      instruments: [
        { displayName: 'Guitar1', name: 'guitar1' },
        { displayName: 'Guitar2', name: 'guitar2' },
        { displayName: 'Bass', name: 'bass' },
        { displayName: 'Drums', name: 'drums' }
      ],
      chords: ['Am', 'C', 'Dm', 'Em', 'F', 'G']
    };
  },
  computed: mapState(['activeChord', 'beat', 'instrumentsPlayingCount']),
  methods: {
    setActiveChord(chord) {
      this.$store.dispatch('setActiveChord', { chord });
    }
  },
  created() {
    setInterval(() => {
      if (this.beat === 4 && this.instrumentsPlayingCount > 0) {
        this.$store.dispatch('setBeat', { beat: 1 });
      } else if (this.instrumentsPlayingCount > 0) {
        this.$store.dispatch('setBeat', { beat: this.beat + 1 });
      } else if (this.instrumentsPlayingCount === 0 && this.beat > 1) {
        this.$store.dispatch('setBeat', { beat: 1 });
      }
      console.log(this.beat);
    }, this.interval);
  },
  updated() {}
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,700|Expletus+Sans');
@media screen and (max-width: 450px)
  body
    padding: 0
    margin: 0
  div
    box-sizing: border-box
  #app
    background: black
    width: 100vw
    height: 100vh
  .header 
    width: 100%
    display: flex
    flex-direction: row
    background: white
  .header div
    width: 50%
    text-align: center
  .header div:active
  .tab p
    font-size: 7vw
    margin: 10px
    font-size: 10vw
    font-family: 'Expletus Sans'
  .main
    width: 100%
    
    padding: 40px
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
  .tracks
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  
  .controls
    display: flex
    flex-direciton: row
    flex-wrap: wrap
    justify-content: center
    margin-top: 20px
    width: 90vw

</style>
