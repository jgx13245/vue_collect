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
      height="490"
      border
      style="margin: 10px 0;"
      :data="list">
        <el-table-column v-for="key in keysFilter"  :prop="key" :key="key" :label="key" align="center"></el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button @click="handleClickOrder(scope.row)" type="text" size="small">查看订单</el-button>
            <el-button @click="handleClickGoods(scope.row)" type="text" size="small">查看商品</el-button>
            <el-button @click="handleClickTime(scope.row)" type="text" size="small">登录时间</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="data-table__footer">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :showPagination="showPagination"
        v-if="total!==0 && showPagination"
       >
      </el-pagination>
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
    showPagination: {
      type: Boolean,
      default: true,
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
  computed: {
    keysFilter: function () {
      return this.keys.filter(function (key) {
        if (key !== 'userId') {
          return key
        }
      })
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('pagechange', page)
    },
    handleSaveExcel() {
      const tHeader = [['手机号', '昵称', '性别', '注册时间']]
      const tbody = this.list.map(({
        手机号, 昵称, 性别, 注册时间,
      }) => [手机号, 昵称, 性别, 注册时间])
      const data = tHeader.concat(tbody)
      downloadExcel(data, '数据', '数据.xlsx')
    },
    handleClickOrder(row) {
      this.$emit('handleOrderUserId', row.userId)
    },
    handleClickGoods(row) {
      this.$emit('handleGoodsUserId', row.userId)
    },
    handleClickTime(row) {
      this.$emit('handleTimeUserId', row.userId)
    },
  },
}
</script>

<style lang="scss">
.data-table {
  background: #FFF;
  padding: 10px;
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
