<template>
    <div>
        <li>
            <span @click="toggle">
                {{ model.menuName }}
            </span>
            <van-popup v-model="open" v-if="isFolder" :style="{ height: '100%', width: '100%'  }">
                 <button @click="up()">驱动</button>
                <items v-for="(item, index) in model.childTree" :model="item" :key="index"></items>
            </van-popup>
            
        </li>
       
    </div>
</template>

<script type="text/javascript">
    export default {
        // 组件递归必要条件，name属性
        name: 'items',
        props: ['model'],
        data() {
            return {
                // 控制子列表的显示隐藏
                open: false
            }
        },
        computed: {
            // 是否还有子列表需要渲染，作为v-if的判断条件
            isFolder() {
                return this.model.childTree && this.model.childTree.length
            }
        },
        methods: {
            up() {
                this.open=false;
            },
            // 切换列表显示隐藏的方法
            toggle() {
                if(this.isFolder) {
                    this.open = !this.open
                }
            },
        }
    }
</script>