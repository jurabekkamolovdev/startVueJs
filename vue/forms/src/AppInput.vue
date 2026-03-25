<template>
  <div class="form-control" :class="{ invalid: error }">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
    />
    <small v-if="error">{{ error }}</small>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],

  props: {
    type: String,
    label: String,
    placeholder: {
      type: String,
      required: false
    },
    error: String,
    modelValue: [String, Number]
  },

  data() {
    return {
      id: 'input-' + Math.random()
    }
  },

  methods: {
    change(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.form-control small {
  font-size: 18px;
  color: red;
}

.form-control.invalid input {
  border-color: red;
}
</style>
