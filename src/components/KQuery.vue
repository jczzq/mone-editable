<template>
  <div class="field-query">
    <div class="field-query-block"
      layout="row"
      layout-align="space-between stretch">
      <input ref="contentInput" type="text" flex @focus="openPanel($event.target.value)"
            :placeholder="value" @input="search($event.target.value)"/>
      <span class="label-icon"
        @click.stop="show = true"
        layout="row"
        layout-align="center center">
        <k-icon xlink="#icon-search"></k-icon>
      </span>
    </div>
    <div class="sl-bx"
      :style="{ zIndex: $knife.getZIndex() }"
      @mouseenter="$refs.contentInput.onblur = null"
      @mouseleave="$refs.contentInput.onblur = hidePanel"
      v-show="show">
      <table class="sl-bx-table k_e_t">
        <thead>
          <tr>
            <td v-for="(cell, i) in fields"
              :key="i">{{ cell.label }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataList"
            @click="choose(item)"
            :key="index">
            <td v-for="(cell, i) in fields"
              :key="i">{{ item[cell.name] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import knife from '@/knife';
export default {
  name: 'k-query',
  props: {
    value: {},
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    showAllInEmpty: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      searchList: []
    };
  },
  methods: {
    openPanel(val) {
      this.show = true;
      this.$refs.contentInput.onblur = this.hidePanel;
    },
    hidePanel(event) {
      this.show = false;
    },
    choose(item) {
      this.$emit('choose', item);
    },
    search: knife.debounce(function(val) {
      if (!this.showAllInEmpty && val == '') {
        this.show = false;
        this.searchList.splice(0);
        return;
      }
      this.searchList = this.dataList.filter(x => {
        return x.name.includes(val) || x.No.toString().includes(val);
      });
    }, 300)
  }
};
</script>

<style lang="less">
@import '~@/assets/less/_theme.less';
.field-query {
  width: 100%;
  height: 100%;
  position: relative;
  .field-query-block {
    height: 100%;
    input {
      height: 100%;
      padding: 0 8px;
    }
  }
  .sl-bx {
    position: absolute;
    left: 0;
    background-color: white;
    width: auto;
    overflow-x: auto;
    list-style: none;
    margin: 0;
    border: 1px solid @ExtraLightGray;
    box-shadow: 0 10px 15px 1px #eee;
    .sl-bx-table {
      tr {
        cursor: pointer;
        td,
        th {
          padding: 0 8px;
        }
        &:hover {
          background-color: @DarkWhite;
        }
      }
    }
  }
}
</style>

