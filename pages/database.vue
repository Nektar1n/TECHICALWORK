<template>
  <v-card>
    <div>
      <TableWithList :filteredVenList="filteredVenList"/>
      <OtherTableList :filteredNotVenList="filteredNotVenList"/>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "database",
  data () {
    return {
      loading:true,
      dataFirebase:[],
      filteredVenList:[],
      filteredNotVenList:[],
    }
  },
  async mounted() {
    try{
      this.dataFirebase=await this.$store.dispatch('fetchDataFirebase')

      this.filteredVenList=this.dataFirebase.spMNN.filter(item=>item.VEN===true)
      this.filteredVenList.map(item=>{
        item.TNList=this.dataFirebase.spTN.filter(e=>e.MNN===item.id)
      })

      this.filteredNotVenList=this.dataFirebase.spMNN.filter(item=>item.VEN===false)
      this.filteredNotVenList.map(item=>{
        item.TNList=this.dataFirebase.spTN.filter(e=>e.MNN===item.id)
      })

      console.log(this.filteredNotVenList)
    }catch (e) {
      throw e
    }
  }
}
</script>

<style scoped>

</style>
