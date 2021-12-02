<template>
    <div class="__input_container">
        <input type="text" class="__input" v-model="self_value" v-bind="$attrs" />
    </div>
</template>

<script>
    export default {
        props: {
            value: [String, Number]
        },
        methods: {},
        computed: {
            self_value : {
                get() {
                    return this.value
                },
                set(newVal) {
                    this.$emit("input", newVal)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.__input_container {
    width: 100%;
    .__input {
        width: 100%;
        border: 1px solid #d9d9d9;
        outline: none;
        border-radius: 5px;
        font-size: 16px;
        padding: 0 12px;
        transition: all 0.3s;
        &::placeholder {
            margin-left: 10px;
            color: #ccc;
        }
        &:focus {
            border: 1px solid #40a9ff;
        }
    }
}
</style>