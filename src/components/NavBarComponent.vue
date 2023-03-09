<template>
  <nav>
    <div id="links" :class="{displayLinks:isDisplayLinks}">
      <router-link to="/reg">{{ this.$store.getters.GET_DICTIONARY.nav_regkont }}</router-link>
      <router-link to="/chess">{{ this.$store.getters.GET_DICTIONARY.nav_chess }}</router-link> 
      <router-link to="/report">{{ this.$store.getters.GET_DICTIONARY.nav_report }}</router-link>
    </div>
    <div id="user">
      <span>{{this.$store.getters.GET_USER.fio}}</span>
    </div>
    <div id="menuButton" style="display:none" @click="clickMenuButton()"><div></div></div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarComponent',
  data:() => ({
    isDisplayLinks:false
  }),
  methods: {
    clickMenuButton(){
      this.isDisplayLinks = this.isDisplayLinks ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 600px){
  nav {
    display: flex;
    padding: 0px 5px;
    display: flex;
    min-width: 1308px;
    height: 50px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: rgba(53, 196, 227, 0.5);
    margin: -8px -8px 30px -8px;
    justify-content: space-between;
    div:nth-child(1){
      display: flex;
      justify-content: start;
      a:nth-child(1){
        margin-left:-8px;
      }
      a {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: #2c3e50;
        padding: 0 20px;
        text-decoration: none;
        &:hover{
          background-color: rgba(53, 196, 227, 1);
        }
      }
    }
    div:nth-child(2){
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #2c3e50;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  .router-link-active{
    border-top: 7px solid rgba(53, 196, 227, 1);
    border-bottom: 7px solid rgba(53, 196, 227, 1);
  }
}
@media (max-width: 600px){
  nav{
    display: flex;
    z-index: 100;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    color: #2c3e50;
    width: 100%;
    background-color: #99E1F1;
    margin: -8px -8px 1px -8px;
    position: fixed;
    padding: 10px;
    height: 40px;
    box-sizing: border-box;
  }
  a{
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #2c3e50;
      padding: 10px 10px;
      text-decoration: none;
      &:hover{
        background-color: #99E1F1;
      }
    }
  #links{
    display: none;
  }

  #menuButton{
    display: block !important;
    padding: 5px;
    border: 1px solid hsl(210,8%,35%);
    border-radius: 4px;
    box-sizing: border-box;
    div, &::after, &::before{
      content: "";
      display: block;
      width: 16px;
      height: 2px;
      margin: 2px;
      background-color: hsl(210,8%,35%);
    }
  }


  .displayLinks{
    display: block !important;
    position: fixed;
    top: 45px;
    z-index: 100;
    background-color: #99E1F1;
    width: 100%;
    margin: 0 -8px 0 -10px;
    border-left:5px solid transparent; 
    border-right:5px solid transparent; 
    box-sizing: border-box;
    background-clip: padding-box;
  }
  .router-link-active{
    border-left: 7px solid rgba(53, 196, 227, 1);
    border-right: 7px solid rgba(53, 196, 227, 1);
  }

}
  @media print { 
    a[href^="http"]:after {
      content: " (" attr(href) ")";
    }

    nav, #date {
      display: none;
    }

  }
</style>

