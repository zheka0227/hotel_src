export default {
    name: 'AuthView',
    data(){
        return {
            name: 'admin',
            password: '',
            checkLogin: true,
            borderColor: 'green'
        }
    },
    computed:{
        dictionary: function(){
            return this.$store.getters.GET_DICTIONARY
        }
    },
    methods: {
        async submit(){
            let users = this.$store.getters.GET_USERS
            let user = users.filter(user=>user.name==this.name)
            if(user.length==1){
                this.checkLogin = true
                this.borderColor = 'green'
                this.$store.commit('SET_USER', user[0])
                this.$router.push('/chess')
            } else {
                this.checkLogin = false
                this.borderColor = 'red'
                return
            }
            return
        }
    },


}