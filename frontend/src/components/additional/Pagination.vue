<template>
  <ul class="pagination" :class="[justify(), scale()]" v-if="pages > 0">
    <li>
      <button
        class="page-link round-left"
        :class="able(1)"
        :disabled="modelValue === 1 ? true : false"
        @click="change(1)"
      >
        «
      </button>
    </li>
    <li>
      <button
        class="page-link"
        :class="able(1)"
        :disabled="modelValue === 1 ? true : false"
        @click="calcChange(-1)"
      >
        ‹
      </button>
    </li>
    <li v-for="i in series" :key="i">
      <button
        class="page-link"
        :class="[modelValue === i ? 'selectPage' : '', able(i)]"
        :disabled="modelValue === i || i === '...' ? true : false"
        @click="change(i)"
      >
        {{ i }}
      </button>
    </li>
    <li>
      <button
        class="page-link"
        :class="able(pages)"
        :disabled="modelValue === pages ? true : false"
        @click="calcChange(1)"
      >
        ›
      </button>
    </li>
    <li>
      <button
        class="page-link round-right"
        :class="able(pages)"
        :disabled="modelValue === pages ? true : false"
        @click="change(pages)"
      >
        »
      </button>
    </li>
  </ul>
</template>
 
<script>
export default {
  name: "c-pagination",
  props: {
    size: String,
    align: String,
    modelValue: Number,
    totalRows: Number,
    perPage: Number,
  },
  emits: ["update:modelValue"],
  data() {
    return {
      pages: 0,
    };
  },
  methods: {
    change(page) {
      if (page !== "...") {
        this.value = page;
      }
    },
    calcChange(page) {
      this.value = this.value + page;
    },
    able(model) {
      return model == this.value || model === "..." ? "disabled" : "";
    },
    justify() {
      let align = "";
      if (this.align === "center") {
        align = "justify-center";
      } else if (this.align === "right") {
        align = "justify-right";
      }
      return align;
    },
    scale() {
      let size = "";
      if (this.size === "sm") {
        size = "size-sm";
      } else if (this.size === "lg") {
        size = "size-lg";
      }
      return size;
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    series() {
      const limit = 5;
      let list = [];
      const max = this.pages > limit ? limit : this.pages;
      if (max < this.pages) {
        list.push(1);
        if (this.value < limit - 1) {
          for (let i = 2; i < max; i++) {
            list.push(i);
          }
          list.push("...");
        } else if (this.value > this.pages - limit + 2) {
          list.push("...");
          for (let i = this.pages - limit + 2; i < this.pages; i++) {
            list.push(i);
          }
        } else {
          list.push("...");
          for (let i = this.value - 1; i <= this.value + 1; i++) {
            list.push(i);
          }
          list.push("...");
        }
        list.push(this.pages);
      } else {
        for (let i = 1; i <= max; i++) {
          list.push(i);
        }
      }
      return list;
    },
  },
  watch: {
    totalRows() {
      this.pages = Math.ceil(this.totalRows / this.perPage);
    },
  },
};
</script>

<style>
.pagination {
  list-style-type: none;
  background-color: white !important;
  border: 0px !important;
  display: flex;
  align-items: center;
  justify-content: left;
}
.page-link {
  color: #007bff;
  border: 1px solid #dee2e6;
  margin-left: -1px;
}
.page-link:hover {
  background-color: #e9ecef;
  color: #0056b3;
}
.selectPage,
.selectPage:hover {
  background-color: #007bff;
  color: white !important;
  border: 1px solid #007bff;
  outline: #b4d2ff8c 4px solid;
  z-index: 10;
}
.round-left {
  border-radius: 4px 0px 0px 4px;
}
.round-right {
  border-radius: 0px 4px 4px 0px;
}
.justify-center {
  justify-content: center;
}
.justify-right {
  justify-content: flex-end;
}
.size-sm {
  font-size: 0.75rem;
}
.size-lg {
  font-size: 1.5rem;
}
.disabled {
  color: black;
}
</style>
