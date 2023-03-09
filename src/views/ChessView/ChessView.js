import CellComponent from '@/components/CellComponent.vue'
import NavBarComponent from '@/components/NavBarComponent.vue'
//import { matchedRouteKey } from 'vue-router'
export default {
    name: 'ChessView',
    data(){
        return {
            dates:[],
            startDate: '',
            endDate: null,
            numbers: [],
            type_korpusa: '',
            common: [],
            td_width: 40,
            td_height: 70,
            markText:this.$store.getters.GET_DICTIONARY.markCells,
            zindexCell:1,
            arrClickedTd:new Set(),
            table_numbers_width: 70,
            markTdStyle:{}
        }
    },
    methods:{
        changeKorpus(){
            let allNumbers = this.$store.getters.GET_NUMBERS
            let numbers = new Array()
            if(this.type_korpusa=='ol1'){
                numbers = allNumbers['ol1']
            }
            if(this.type_korpusa=='ol2'){
                numbers = allNumbers['ol2']
            }
            if(this.type_korpusa=='sk'){
                numbers = allNumbers['sk']
            }

            this.numbers = numbers
            let common = []
            let man
            let people = this.people.filter(man=>man.type_korpusa==this.type_korpusa)

            let intervals = []
            for (man of people){
                intervals.push({start:new Date(man.date_zaezda).getTime(), end:new Date(man.date_viezda).getTime(), number:man.number, id:man.id})
            }

            //пересечения
            const findIntersection = (intervals, start, end, number) => 
            intervals.filter(
                interval => start <= interval.end && interval.start <= end && interval.number==number
            )
            
            //расчет параметров отображения полос на шахматке
            for (man of people){
                let date_zaezda = new Date(man.date_zaezda).getTime()
                let date_viezda = new Date(man.date_viezda).getTime()
                let arr = findIntersection(intervals, date_zaezda, date_viezda, man.number)
                let left = 0
                let width = 0
                let top = 0
                let height = 0
                let padding = 0
                //width
                if(man.date_zaezda && man.date_viezda){
                    let date1 = new Date(man.date_zaezda);
                    let date2 = new Date(man.date_viezda);
            
                    let difference_In_Time = date2.getTime() - date1.getTime();
                    let difference_In_Minutes = difference_In_Time/(1000*60)
                    let difference_In_Pixels = (this.td_width/(24*60))*difference_In_Minutes
                    width = difference_In_Pixels
                }
                //indent
                if(man.date_zaezda){
                    let date1 = new Date(man.date_zaezda);
                    let hours = date1.getHours()
                    let minutes = date1.getMinutes()
                    let allMinutes = hours*60+minutes
                    left = (this.td_width/(24*60))*allMinutes
                }
                //height top padding
                arr.sort((a, b) => +a.id > +b.id ? 1 : -1)
                let manid = man.id
                let index = arr.map(e => e.id).indexOf(manid);
                let num_men = arr.length
                height = this.td_height/num_men
                top = height*(index)
                padding = num_men>1?0:5

                let from = new Date(man.date_zaezda).setHours(0, 0, 0, 0)
                let number = man.number
                if(!common[[number, from]]) common[[number, from]] = []
                common[[number, from]].push({id:man.id, width:width, left:left, height:height, top:top, padding:padding})
            }

            this.common = common
        },

        toNormDate(date){
            let d = new Date(date)
            let mm = d.getMonth()+1
            let dd = d.getDate()
            let yyyy = d.getFullYear()
            return dd + '.' + mm + '.' + yyyy
        },

        calcDates(){
            let today = new Date()
            let endDate = null
            let betweenStartEnd = 50
            let beforeStart = 30
            let visibleBeforeStart = 5
            if(this.endDate){
                endDate = new Date(this.endDate)
            } else {
                endDate = new Date(new Date(today).setDate(new Date(today).getDate() + betweenStartEnd))
            }
            let startDate = null
            if(this.startDate){
                startDate = new Date(new Date(this.startDate).setDate(new Date(this.startDate).getDate() - beforeStart))
                if(!this.endDate){
                    endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + betweenStartEnd + beforeStart))
                }
            } else {
                startDate = new Date(new Date(today).setDate(new Date(today).getDate() - (beforeStart + visibleBeforeStart)))
            }
            
            let dates = []
            for (var d = startDate; d <= endDate; d = d.setDate(d.getDate() + 1)) {
                d = new Date(d)
                dates.push(d.getTime());
            }
            this.dates = dates
            this.changeKorpus()
        },
        //отметить ячейки на шахматке
        markTd(){
            if(this.markText == this.dictionary.markCells){
                this.markText = this.dictionary.cancel
                this.zindexCell = -1
            }else if(this.markText == this.dictionary.cancel){
                this.markText = this.dictionary.markCells
                this.zindexCell = 1
            }
            let arrDates = []
            this.arrClickedTd.forEach(v => arrDates.push(+v.split(',')[1]))
            let min = Math.min(...arrDates)
            let max = Math.max(...arrDates)
            let user = {}
            user.date_put_s = new Date(new Date(min)).toJSON().slice(0,10)
            user.date_put_po = new Date(new Date(max)).toJSON().slice(0,10)
            user.date_zaezda = new Date(new Date(min).setHours(11, 0)).toJSON().slice(0,16)
            user.date_viezda = new Date(new Date(max).setHours(23, 0)).toJSON().slice(0,16)
            user.number = this.arrClickedTd.values().next().value.split(',')[0]
            user.type_korpusa = this.type_korpusa
            user.status = "bron"
            user.personalDatas = []

            this.$router.push({ name: 'reg', params: { user: JSON.stringify(user) }})
        },
        //нажатие на ячейку при нажатой кнопке Отметить ячейки
        clickTd(number, date){
            let key = new String(number)+','+new String(date)
            if(this.markText == this.dictionary.markCells) return
            
            if(this.arrClickedTd.size>0){
                let numFromArr = this.arrClickedTd.values().next().value.split(',')[0]
                if(numFromArr!=number) return

                let arrDates = []
                this.arrClickedTd.forEach(v => arrDates.push(+v.split(',')[1]))
                let min = Math.min(...arrDates)
                let max = Math.max(...arrDates)
                if(date<min){
                    if(min-date>8.64e+7) return
                }
                if(date>max){
                    if(date-max>8.64e+7) return
                }
                if(this.arrClickedTd.size>2){              
                    if(date>min && date<max) return
                }
            }
            
            if(!this.arrClickedTd.has(key)){
                this.arrClickedTd.add(key)
            } else {
                this.arrClickedTd.delete(key)
            }

            if(this.arrClickedTd.size==0){
                this.markText = this.dictionary.cancel
            } else {
                this.markText = this.dictionary.register
            }
            
        },
        //окрашивание ячейки при нажатии на нее при нажатой кнопке Отметить ячейки
        colorTd(number, date){
            let key = new String(number)+','+new String(date)
            return this.arrClickedTd.has(key)?'rgb(255, 255, 255, 0.6)':'transparent'
        },
        handleResize(){
            this.table_numbers_width = window.innerWidth < 600 ? 40 : 70
        }

    },
    computed:{
        
        dictionary: function(){
            return this.$store.getters.GET_DICTIONARY
        },
        people:function(){
            return this.$store.getters.GET_HOTEL
        },
        tableWidth: function(){
            let numDays = this.dates.length - 29 + 1
            let td_width = this.td_width
            let width = numDays * td_width
            return width
        }
        
    },
    watch:{
        type_korpusa:function(){
            this.$store.commit('SET_CHESSFILTER', {type_korpusa:this.type_korpusa, startDate:this.startDate, endDate:this.endDate});
        },
        startDate:function(){
            this.$store.commit('SET_CHESSFILTER', {type_korpusa:this.type_korpusa, startDate:this.startDate, endDate:this.endDate});
        },
        endDate:function(){
            this.$store.commit('SET_CHESSFILTER', {type_korpusa:this.type_korpusa, startDate:this.startDate, endDate:this.endDate});
        }
    },
    components:{
        NavBarComponent,
        CellComponent
    },

    async created() {
        let chessFilter = this.$store.getters.GET_CHESSFILTER
        this.type_korpusa = chessFilter.type_korpusa ? chessFilter.type_korpusa : 'sk'
        this.startDate = chessFilter.startDate
        if(!this.startDate) this.startDate = '2023-01-01'
        this.endDate = chessFilter.endDate
        this.calcDates()
    },
    mounted(){
        this.handleResize()
        window.addEventListener('resize', this.handleResize); 
    }

}