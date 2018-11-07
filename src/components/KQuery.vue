<template>
  <div class="field-query">
    <div class="field-query-block" layout="row" layout-align="space-between stretch">
      <input type="text" @focus="openPanel($event.target.value)" @blur="hidePanel"
            :placeholder="value" @input="search($event.target.value)"/>
      <span class="label-icon"
        @click.stop="show = true"
        layout="row"
        layout-align="center center">
        <k-icon xlink="#icon-search"></k-icon>
      </span>
    </div>
    <table class="select-box"
      v-show="show">
      <tr v-for="(item, index) in searchList"
        @click="choose(item)"
        :key="index">{{ item.name }}
        <td v-for="(cell, i) in fields"
          :key="i"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import knife from '@/knife';
export default {
  name: 'k-query',
  props: {
    value: {
    },
    fields: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      show: false,
      searchList: [],
      dataList: [
        {
          id: 4,
          name: 'jczzq4',
          age: 24,
          gender: 1,
          grade: 5,
          No: 78
        },
        {
          id: 2,
          name: 'Evan You',
          age: 38,
          gender: 0,
          grade: '2',
          No: 64
        },
        {
          id: 3,
          name: '坂田银时',
          age: 58,
          gender: 1,
          grade: 5,
          No: 60
        }
      ]
    };
  },
  methods: {
    openPanel(val) {
      this.show = true;
    },
    hidePanel: knife.debounce(function() {
      this.show = false;
    }, 300),
    choose(item) {
      this.$emit('choose', item);
    },
    search: knife.debounce(function(val) {
      if (val == '') {
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
  .select-box {
    background-color: white;
    width: 100%;
    position: absolute;
    list-style: none;
    margin: 0;
    border: 1px solid @ExtraLightGray;
    box-shadow: 0 10px 15px 1px #eee;
    z-index: 67;
    li {
      cursor: pointer;
      border-bottom: 1px solid @ExtraLightGray;
      height: 35px;
      line-height: 35px;
      padding: 0 8px;
    }
    li:hover {
      background-color: @DarkWhite;
    }
  }
}
</style>

