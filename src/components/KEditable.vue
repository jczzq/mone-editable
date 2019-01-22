<template>
  <div class="k_e">
    <table class="k_e_t"
           colspan="0">
      <thead>
        <tr>
          <th class="w50">行号</th>
          <th class="w150">操作</th>
          <th draggable
              @dragstart="handleDragstart"
              @dragenter="handleDragenter"
              @dragleave="handleDragleave"
              @dragend="handleDrop"
              :data-field="field.name"
              v-for="(field) in fields"
              :key="field.id"
              :data-key="field.id">
            {{field.label}}
          </th>
        </tr>
      </thead>

      <tbody>
        <!--1.回显数据行-->
        <tr v-for="(row, rowIndex) in dataList"
            :key="row[config.primaryKey]"
            :data-key="row[config.primaryKey]">
          <th class="row-no">{{rowIndex+1}}</th>
          <th>
            <a class="btn"
               @click.stop="addRow(row, rowIndex, $event)">新增一行</a>
            <a class="btn"
               @click.stop="deleteRow(row, rowIndex, $event)">删除此行</a>
          </th>
          <td v-for="(cell, cellIndex) in fields"
              :key="cell.id"
              :data-key="cell.id">
            <k-field :data-key="cell.id"
                     :row-index="rowIndex"
                     :cell-index="cellIndex"
                     :table="table[cell.name]"
                     :type="cell.type"
                     :value.sync="row[cell.name]"
                     :len="0"
                     :list-slots="list[cell.name]"
                     @on-choose="onChoose">
            </k-field>
          </td>
        </tr>
        <!--回显数据行-->
      </tbody>
    </table>
  </div>
</template>

<script>
import KField from "./KField";
export default {
  name: "k-editable",
  props: {
    config: {
      type: Object,
      required: true
    },
    dataList: {
      type: Array
    }
  },
  components: {
    KField
  },
  computed: {
    hideFields() {
      const hf = this.config.hideFields;
      return hf ? (typeof hf === "string" ? hf.split("|") : hf) : [];
    },
    fields() {
      if (this.config.fields) {
        let list = this.config.fields.filter(f => {
          return !this.hideFields.includes(f.name);
        });
        return list.sort((v1, v2) => {
          return v1.id - v2.id;
        });
      } else {
        return [];
      }
    },
    list() {
      return this.config.list || {};
    },
    table() {
      return this.config.table || {};
    },
    query() {
      return this.config.query || {};
    }
  },
  data() {
    return {
      currentCell: null,
      currentRow: null,
      lastElement: null,
      dragField: null,
      dropField: null
    };
  },
  methods: {
    onChoose(row, rowIndex) {
      // 比较主键
      let keys = this.dataList.map(x => {
        return x[this.config.primaryKey];
      });
      if (keys.includes(row[this.config.primaryKey])) {
        alert("已经存在");
        return;
      }
      this.currentRow = JSON.parse(JSON.stringify(row));
      this.dataList.splice(rowIndex, 1, this.currentRow);
    },
    addRow(row, rowIndex, $event) {
      this.$emit("add-row", rowIndex);
    },
    deleteRow(row, rowIndex, $event) {
      this.$emit("del-row", rowIndex);
    },
    // 拖拽相关
    handleDragstart(e) {
      this.dragField = e.target.dataset.field;
      //   console.log("drag: ", this.dragField);
    },
    handleDragenter(e) {
      //   e.preventDefault();
      if (e.target.dataset.field === this.dragField) return;
      this.dropField = e.target.dataset.field;
      //   console.log("enter: ", e.target.dataset.field);
      e.target.style.backgroundColor = "red";
    },
    handleDragleave(e) {
      //   console.log("leave: ", e.target.dataset.field);
      e.target.style.backgroundColor = "#F9FAFC";
    },
    handleDrop(e) {
      //   console.log("drop: ", this.dropField);
      // 更新拖拽数据
      if (this.dragField && this.dropField) {
        let f = this.config.fields;
        let dragItem = f.find(x => x.name === this.dragField);
        let dropItem = f.find(x => x.name === this.dropField);
        const dragItemId = dragItem.id;
        dragItem.id = dropItem.id;
        dropItem.id = dragItemId;

        this.dragField = null;
        this.dropField = null;
      }
    }
  }
};
</script>

<style lang="less">
@import "~@/assets/less/_global.less";
[layout="row"] {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  word-break: break-all;
}

[layout="column"] {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

[flex-wrap="wrap"] {
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.flex(@a, @b) {
  justify-content: @a;
  -webkit-justify-content: @a;
  align-items: @b;
  -webkit-align-items: @b;
}

[layout-align="space-between stretch"] {
  .flex(space-between, stretch);
}
[layout-align="center center"] {
  .flex(center, center);
}
[flex] {
  -webkit-flex: 1;
  flex: 1;
}
.k_e_t {
  border-spacing: 0;
  border-collapse: collapse;
  min-width: 100%;
  font-size: 14px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  thead {
    tr {
      background-color: @DarkWhite;
    }
  }
}
.k_e_t > tbody > tr > td,
.k_e_t > tbody > tr > th,
.k_e_t > tfoot > tr > td,
.k_e_t > tfoot > tr > th,
.k_e_t > thead > tr > td,
.k_e_t > thead > tr > th {
  height: @cell-height;
  box-sizing: border-box;
  padding: 0;
  border-top: 1px solid #ddd;
  vertical-align: middle;
  border-left: 1px solid #ddd;
  white-space: nowrap;
}
.k_e_t > thead > tr > td,
.k_e_t > thead > tr > th {
  padding: 0 8px;
  user-select: none;
  &[draggable="true"] {
    cursor: -webkit-grab;
  }
}
.k_e_t {
  .w50 {
    width: 50px;
  }
  .w150 {
    width: 150px;
  }
}
</style>
