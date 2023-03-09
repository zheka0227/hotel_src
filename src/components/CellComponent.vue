<template>
  <div id="cell" v-bind:style="{width:this.params.width+'px', left:this.params.left-3+'px', height:this.params.height-4+'px', top:this.params.top+1+'px', padding:this.params.padding+'px 5px' }" 
    @click="this.$router.push({ name: 'reg', params: { user: JSON.stringify(man) }})" 
    v-bind:title="man.name + '\nс ' + man.date_zaezda.replace('T',' ') + ' по ' + man.date_viezda.replace('T',' ')"
    v-bind:class="{ bron: man.status=='bron', zaselen: man.status=='zaselen', replaceText:replaceText, cell:true}"
    ref="cell">
      <div>{{man.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'CellComponent',
  data(){
    return {
      replaceText: false,
    }
  },
  props: {
    params: Object,
    table_numbers_coord: Object
  },
  computed:{
    man(){
      let hotel = this.$store.getters.GET_HOTEL
      let id = this.params.id
      let man = hotel.find(obj => obj.id==id)
      return man
    }
  },
  methods:{
    handleScroll(){
      let x_num = this.table_numbers_coord.width
      let x_cell = this.$refs.cell?.getBoundingClientRect().x
      this.replaceText = x_cell < x_num ? true : false
    }
  },
  mounted(){
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll); 
  }
}
</script>

<style scoped lang="scss">
    .replaceText>div{
      display: flex;
      justify-content: flex-end;
    }
</style>
