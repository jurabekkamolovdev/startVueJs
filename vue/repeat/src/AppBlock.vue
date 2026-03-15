<template>
  <div class="card">
    <slot name="header"></slot>
    <slot v-if="$slots.footer" name="footer"></slot>
    <slot></slot>
  </div>
</template>

<script></script>
