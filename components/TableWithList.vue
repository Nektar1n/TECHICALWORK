<template>
  <div>
      <v-card color="blue">
        <v-card-title color="blue" width="100%">ЛС в перечне ЖНВЛП</v-card-title>
      </v-card>
      <v-simple-table
        fixed-header
        height="400px"
        dense
      >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              №
            </th>
            <th class="text-left">
              МНН
            </th>
            <th class="text-left">
              ТН
            </th>
            <th class="text-left">
              ЖНВ ЛП
            </th>
          </tr>
          </thead>
          <tbody>
          <Loader v-if="!filteredVenList.length"/>
          <tr
            v-for="item in filteredVenList"
            :key="item.name"
            v-else
          >
            <td>{{item.id}}</td>
            <td>{{ item.MNN }}</td>
            <td><span v-for="ItemTN in item.TNList">{{ItemTN.TN}} <br></span></td>
            <td>{{ item.VEN===true? 'V': 'N' }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
  </div>
</template>

<script>
import Loader from "@/components/UI/Loader";
export default {
  data:()=>({
    headers:[
      {
        text: '№',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'МНН', value: 'MNN' },
      { text: 'ТН', value: 'TN' },
      { text: 'ЖНВ ЛП', value: 'Количество' },
      { text: 'Цена', value: 'Цена' },
      { text: 'Затраты', value: 'expenses'},
    ],
  }),
  name: "TableWithList",
  props:['filteredVenList'],
  components:{Loader}
}
</script>

