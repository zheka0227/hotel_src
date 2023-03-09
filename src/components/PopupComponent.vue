<template>
    <div id="wrapperInfo" v-if="isVisible">
      <div id="info">
        <div id="message" v-html="this.message"></div>
        <div id="buttons">
          <button @click="OK()">{{ this.$store.getters.GET_DICTIONARY.popup_ok }}</button>
          <button v-if="this.confirm" @click="CANCEL()">{{ this.$store.getters.GET_DICTIONARY.popup_cancel }}</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  data: () => ({
    message: undefined,
    type: undefined,
    resolvePromise: undefined,
    rejectPromise: undefined,
    isVisible:false
  }),
  methods:{
    show(message, confirm=false) {
      message = message.replaceAll('\n','<br>')
      this.message = message
      this.confirm = confirm
      this.isVisible = true
      return new Promise((resolve, reject) => {
          this.resolvePromise = resolve
          this.rejectPromise = reject
      })
    },
    OK(){
      this.isVisible = false
      this.resolvePromise(true)
    },
    CANCEL(){
      this.isVisible = false
      this.resolvePromise(false)
    }
  }
}

</script>


<style scoped lang="scss">

#wrapperInfo{
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left:0;
  top:0;
  background: rgba(0, 0 ,0, 0.5);
  z-index: 1000;
}

#info{
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 400px;
  background: rgba(255, 255 ,255, 1);
  border: 4px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  
}

#message{
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  overflow-y: scroll;
  font-size: 18px;
}

#buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}

button{
  width: 95px;
  height: 35px;
}

@media (max-width: 600px){
  #info{
    width: 85%;
    height: 40%;
  }
}

</style>
