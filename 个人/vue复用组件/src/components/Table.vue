<template>
  <div class="data-table">
    <div class="data-table__tool">
      <el-popover placement="bottom" trigger="click">
        <div style="padding: 10px;">
          <el-checkbox-group v-model="keys">
            <el-checkbox v-for="key in originKeys" :label="key" :key="key">{{key}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button slot="reference" type="primary" size="mini">筛选</el-button>
      </el-popover>
      <el-button style="margin-left: 10px;" type="primary" size="mini" @click="handleSaveExcel">导出Excel</el-button>
    </div>
    <el-table
      border
      height="300px"
      style="margin: 10px 0;"
      :data="list">
        <el-table-column v-for="key in keys" :prop="key" :key="key" :label="key" align="center"></el-table-column>
      </el-table>
    <div class="data-table__footer">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { downloadExcel } from '../assets/js/util'

export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    listDate: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      keys: [],
      checkedKey: [],
      originKeys: [],
    }
  },
  watch: {
    list: {
      handler(newValue) {
        if (newValue.length) {
          this.originKeys = Object.keys(newValue[0])
          this.keys = this.originKeys
        }
      },
      immediate: true,
    },
    listDate: {
      handler(newValue) {
        if (newValue.length) {
          this.listDate = newValue
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('page-change', page)
    },
    handleSaveExcel() {
      console.log(this.keys)
      const tHeader = [this.keys]
      const tbody = this.list.map(({商品类型, 数量}) => [商品类型, 数量])
      const data = tHeader.concat(tbody)
      downloadExcel(data, '表', '表.xlsx')
    },
  },
}

</script>

<style lang="scss">
.data-table {
  background: #FFF;
  padding: 20px;
}
.data-table__tool {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.data-table__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
