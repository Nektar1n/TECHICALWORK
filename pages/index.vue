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
        :items="medicalData"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
      <v-card-title>
        <v-card class="total">
          <v-card-title>
            Итоговое количество: {{medicalData.totalNumber}} |
            Итоговая цена: {{medicalData.totalPrice}} |
            Итоговые затраты: {{medicalData.totalExpenses}}
          </v-card-title>
        </v-card>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>


import * as XLSX from "xlsx";
import TableLoader from "@/components/UI/TableLoader";

export default {
  components: {TableLoader},
  mounted() {
    this.medicalData=this.$store.getters["tablexlsx/medData"]

    this.medicalData.totalNumber=0
    this.medicalData.totalPrice=0
    this.medicalData.totalExpenses=0

    this.medicalData.forEach(el=>{
      el.expenses=Math.round(el['Количество']*el['Цена'])
    })
    for (let i=0; i<this.medicalData.length; i++){
      this.medicalData.totalNumber+=this.medicalData[i]['Количество']
      this.medicalData.totalPrice+=Math.round(this.medicalData[i]['Цена'])
      this.medicalData.totalExpenses+=this.medicalData[i]['expenses']
    }
    console.log(this.medicalData)
    this.loading=false
  },
  data () {
    return {
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
