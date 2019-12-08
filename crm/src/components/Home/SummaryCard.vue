<template>
  <section class="summary-card">
    <header class="summary-card__header">
      <span>{{title}}</span>
      <el-tooltip effect="dark" content="指标说明" placement="left">
        <span class="icon icon-tip"></span>
      </el-tooltip>
    </header>
    <p class="summary-card__info">{{prefix}} {{info | formatAmount}}</p>
    <slot name="content"></slot>
    <p class="summary-card__tip">{{tipPrefix}} {{tip | formatAmount}}{{tipSuffix}}</p>
  </section>
</template>

<script>
import Filters from '../../assets/js/filter'

export default {
  mixins: [Filters],
  props: {
    title: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    info: {
      type: Number,
      default: 0,
    },
    tipPrefix: {
      type: String,
      default: '',
    },
    tip: {
      type: Number,
      default: 0,
    },
    tipSuffix: {
      type: String,
      default: '',
    },
  },
}
</script>
