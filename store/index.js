import { createStore } from 'vuex'
import hotel from './data/hotel'
import dict from './data/dictionary'
import numbers from './data/numbers'

export const store = createStore({
  state () {
    return {
      dictionary: dict,
      allNumbers: numbers,
      hotel: unzip(hotel),
      users:getUsers()
    }
  },
  getters: {
    GET_USERS: state=>{
      return state.users
    },
    GET_DICTIONARY: state=>{
      return state.dictionary
    },
    GET_NUMBERS: state=>{
      return state.allNumbers
    },
    GET_HOTEL: state=>{
      return state.hotel
    }
  },
  mutations: {
    /*
    SET_DICTIONARY: (state, payload) => {
      state.dictionary = payload;
    }
    */
  },
  actions: {
    /*
    SET_DICTIONARY: async (context, payload) => {
      let dictionary = (await axios.get('dictionary')).data
      context.commit('SET_DICTIONARY', dictionary);
    }
    */
  }
})

function getUsers(){
  return [
    {name:'',role:'guest',fio:'Гость'},
    {name:'admin',role:'admin',fio:'Администратор'}
  ]
}