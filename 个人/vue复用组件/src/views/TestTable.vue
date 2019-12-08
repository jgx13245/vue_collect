<template>
  <div>
    <data-table
      :current-page="1"
      :total="100"
      :list="tableDate"/>
  </div>
</template>

<script>
import DataTable from '../components/Table.vue'
export default {
  data() {
    return {
      tableDate:[]
    }
  },
  components:{
    DataTable
  },
  mounted() {
    const data = [
      {"商品类型":'蛋糕','数量':12},
      {"商品类型":'骑车','数量':2}
    ]
      this.tableDate = data
  }
}
</script>

<style scoped>

</style>