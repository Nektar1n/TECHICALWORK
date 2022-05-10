<template>
  <div>
    <TableLoader v-if="loading"/>
    <v-card v-else>
      <v-card-title>
        МНН
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск МНН"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="uniqueMedicalData"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
      <v-card-title>
        <v-card class="total">
          <v-card-title>
            Итоговое количество: {{uniqueMedicalData.totalNumber}} |
            Итоговая цена: {{uniqueMedicalData.totalPrice}} |
            Итоговые затраты: {{uniqueMedicalData.totalExpenses}}
          </v-card-title>
        </v-card>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>



import TableLoader from "@/components/UI/TableLoader";

export default {
  name:'uniquemnn',
  components: {TableLoader},
  mounted() {
    this.uniqueMedicalData=JSON.parse(JSON.stringify(this.$store.getters["tablexlsx/medData"]))


    let result = [];
    this.uniqueMedicalData.forEach((item, index) => {
    item.expenses=Math.round(item['Количество']*item['Цена'])
      const temp = result.filter(e=>{return e['Международное непатентованное наименование'] === item['Международное непатентованное наименование']});
      if(temp.length > 0){
        result[result.findIndex(e=>{return e['Международное непатентованное наименование'] ===item['Международное непатентованное наименование']})]['Количество'] += item['Количество'];
        result[result.findIndex(e=>{return e['Международное непатентованное наименование'] ===item['Международное непатентованное наименование']})]['Торговое наименование'] += ' || '+ item['Торговое наименование']+ '  \n';
        result[result.findIndex(e=>{return e['Международное непатентованное наименование'] ===item['Международное непатентованное наименование']})]['Форма выпуска'] += item['Форма выпуска'];
        result[result.findIndex(e=>{return e['Международное непатентованное наименование'] ===item['Международное непатентованное наименование']})]['expenses'] += item['expenses'];
        result[result.findIndex(e=>{return e['Международное непатентованное наименование'] ===item['Международное непатентованное наименование']})]['Цена'] += item['Цена'];
      }
      else{
        result.push(item);
      }
    });

    this.uniqueMedicalData=result

    this.uniqueMedicalData.totalNumber=0
    this.uniqueMedicalData.totalPrice=0
    this.uniqueMedicalData.totalExpenses=0

    for (let i=0; i<this.uniqueMedicalData.length; i++){
      this.uniqueMedicalData.totalNumber+=this.uniqueMedicalData[i]['Количество']
      this.uniqueMedicalData.totalPrice+=Math.round(this.uniqueMedicalData[i]['Цена'])
      this.uniqueMedicalData.totalExpenses+=this.uniqueMedicalData[i]['expenses']
    }


    console.log(this.uniqueMedicalData)

    this.loading=false
  },
  data () {
    return {
      uniqueMedicalData:[],
      medicalData:[],
      loading:true,
      search: '',
      headers: [
        {
          text: 'Международное непатентованное наименование',
          align: 'start',
          sortable: false,
          value: 'Международное непатентованное наименование',
        },
        { text: 'Торговое наименование', value: 'Торговое наименование' },
        { text: 'Форма выпуска', value: 'Форма выпуска' },
        { text: 'Количество', value: 'Количество' },
        { text: 'Цена', value: 'Цена' },
        { text: 'Затраты', value: 'expenses'},
      ],
    }
  },
}
</script>

<style scoped>
.total{
  position: absolute;
  right: 0;
  background-color: deepskyblue;
}
</style>
