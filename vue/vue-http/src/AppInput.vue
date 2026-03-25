<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="change"
    />
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],

  props: {
    label: String,
    type: String,
    placeholder: String,
    modelValue: String
  },

  data() {
    return {
      id: 'input' + Math.random()
    }
  },

  methods: {
    change(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
