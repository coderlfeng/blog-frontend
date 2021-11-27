<template>
    <div class="nav-input h-2">
        <input type="text" class="nav-input" :style="{width: inputWidth}" @focus="focusHandle" @blur="blurHandle"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputWidth: '100px'
            }
        },
        methods: {
            focusHandle(){
                this.inputWidth = '200px'
            },
            blurHandle() {
                this.inputWidth = '100px'
            }
        }
    }
</script>

<style lang="less" scoped>
.nav-input {
    position: relative;
    display: flex;
    align-items: center;
    &::after {
        content: url(../../assets/images/search.png);
        position: absolute;
        width: 0.75rem;
        // height: 16px;
        right: 0;
        top: 0;
    }
    input {
        transition: all 0.3s;
        outline: none;
        display: block;
        height: 100%;
        padding-right: 0.75rem;
    }
}
</style>