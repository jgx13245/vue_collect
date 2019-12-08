<template>
  <div class="data-table">
    <div class="data-table__tool">
      <el-popover placement="bottom" trigger="click">
        <div style="padding: 10px;">
          <el-checkbox-group v-model="keys">
            <el-checkbox v-for="key in originKeys" :label="key" :key="key">{{key}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- <el-button slot="reference" type="primary" size="mini">筛选</el-button> -->
      </el-popover>
      <!-- <el-button style="margin-left: 10px;" type="primary" size="mini" @click="handleSaveExcel">导出Excel</el-button> -->
    </div>
    <el-table
      height="400"
      border
      style="margin: 10px 0;"
      :data="list">
        <el-table-column v-for="key in keys"  :prop="key" :key="key" :label="key" align="center"></el-table-column>
        <!-- <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看订单</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看商品</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">登录时间</el-button>
          </template>
        </el-table-column> -->
    </el-table>
    <div class="data-table__footer">
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import { downloadExcel } from '../../assets/js/utils'

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
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('page-change', page)
    },
    handleSaveExcel() {
      const tHeader = [['用户Id', '登录时间']]
      const tbody = this.list.map(({ 用户Id, 登录时间 }) => [用户Id, 登录时间])
      const data = tHeader.concat(tbody)
      downloadExcel(data, '数据', '数据.xlsx')
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
