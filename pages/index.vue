<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="medicalData"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>


import * as XLSX from "xlsx";

export default {
  mounted() {
    this.medicalData=this.$store.getters["tablexlsx/medData"]
    this.medicalData.forEach(el=>{
      el.expenses=Math.round(el['Количество']*el['Цена'])
    })
  },
  data () {
    return {
      medicalData:[],
      inputData:null,
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
