<template>
  <svg class="knife-icon"
    aria-hidden="true">
    <use :xlink:href="xlink"></use>
  </svg>
</template>
<script>
/**
 * sample:
 * <m-icon xlink="#icon-close"></m-icon>
 */
export default {
  name: 'm-icon',
  props: ['xlink']
};
</script>
