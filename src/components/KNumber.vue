<template>
    <div class="field-box field-number">
      <input
        ref="input"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
        v-on:focus="selectAll"
        v-on:blur="formatValue" 
        v-on:keyup.up="increment"
        v-on:keyup.down="diff"
      />
    </div>
</template>

<script>
    import knife from '@/knife.js';
    export default {
        name: 'k-number',
        props: {
            value: {
                default: 0
            },
            len: {
                default: 0
            }
        },
        mounted() {
            this.formatValue();
        },
        methods: {
            updateValue(value) {
                var result = knife.currencyParse(value, this.value, this.len);
                if (result.warning) {
                    this.$refs.input.value = 0;
                }
                this.$emit('change', !isNaN(result.value) ? result.value : 0);
            },
            formatValue() {
                this.$refs.input.value = knife.currencyFormat(this.value, this.len);
            },
            selectAll(event) {
                setTimeout(function() {
                    event.target.select();
                }, 0);
            },
            increment() {
                this.$emit('change', this.value + 1);
            },
            diff() {
                this.$emit('change', this.value - 1);
            }
        }
    };
</script>
