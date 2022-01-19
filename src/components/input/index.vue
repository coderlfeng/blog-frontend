<template>
    <div class="__input_container">
        <input type="text" class="__input" v-model="self_value" v-bind="$attrs" />
    </div>
</template>

<script>
import isPC from "@/utils/isPC";
if (isPC()) {
	import("./index-PC.less");
} else {
	import("./index-mobile.less");
}

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
</style>