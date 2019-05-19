import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    instrumentsPlayingCount: 0,
    activeChord: 'Am',
    beat: 0
  },
  mutations: {
    INCREMENT_INSTRUMENTS_PLAYING_COUNT(state) {
      state.instrumentsPlayingCount += 1;
    },
    DECREMENT_INSTRUMENTS_PLAYING_COUNT(state) {
      state.instrumentsPlayingCount -= 1;
    },
    SET_ACTIVE_CHORD(state, { chord }) {
      state.activeChord = chord;
    },
    SET_BEAT(state, { beat }) {
      state.beat = beat;
    }
  },
  actions: {
    incrementInstrumentsPlayingCount({ commit }) {
      commit('INCREMENT_INSTRUMENTS_PLAYING_COUNT');
    },
    decrementInstrumentsPlayingCount({ commit, state }) {
      if (state.instrumentsPlayingCount >= 0)
        commit('DECREMENT_INSTRUMENTS_PLAYING_COUNT');
    },
    setActiveChord({ commit }, chord) {
      commit('SET_ACTIVE_CHORD', chord);
    },
    setBeat({ commit }, beat) {
      commit('SET_BEAT', beat);
    }
  }
});
