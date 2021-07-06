<template>
    <div class="draggable-table">
        <table>
            <tr v-for="d in data" :key="d[0].id">
                <td v-for="{value,id} in d" :key="id" :data-id="id" draggable="true" @dragstart="dragstart" @dragend="dragend"
                    @dragenter="dragenter" @dragleave="dragleave"
                    @dragover="dragover" @drop="drop">
                    {{value}}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import array from "lodash/array";

    export default {
        name: "DraggableTable",
        data() {
            return {
                data: [
                    [{id: 1, value: 1}, {id: 2, value: 2}, {id: 3, value: 3}],
                    [{id: 4, value: 4}, {id: 5, value: 5}, {id: 6, value: 6}],
                    [{id: 7, value: 7}, {id: 8, value: 8}, {id: 9, value: 9}]
                ]
            }
        },
        methods: {
            dragstart(e) {
                // 保存拖动元素的引用(ref.)
                let sourceEl = e.target;
                // 使其半透明
                sourceEl.classList.add('dragged');
                let id = sourceEl.dataset.id;
                e.dataTransfer.setData('id', id);
            },
            dragend(e) {
                // 保存拖动元素的引用(ref.)
                let sourceEl = e.target;
                // 使其半透明
                sourceEl.classList.remove('dragged');
                let id = sourceEl.dataset.id;
                e.dataTransfer.setData('id', id);
            },
            dragenter(e) {
                let target = e.target;
                target.classList.add('dragenter');
            },
            dragover(e) {
                e.preventDefault();
            },
            dragleave(e) {
                let dragged = e.target;
                dragged.classList.remove('dragenter');
            },
            // eslint-disable-next-line no-unused-vars
            drop(e) {
                let target = e.target;
                target.classList.remove('dragenter');

                let tid = parseInt(target.dataset.id);
                let sid = parseInt(e.dataTransfer.getData('id'));
                let temp = array.flatten(this.data);

                // remove source & append source to target
                let tIndex = array.findIndex(temp, o => o.id === tid);
                let sItem = temp.find(o => o.id === sid);
                array.remove(temp, o => o.id === sid);
                temp.splice(tIndex, 0, sItem);

                this.data = array.chunk(temp, this.data[0].length);
            }
        },
    }
</script>

<style>
    td {
        cursor: pointer;
        padding: 3em;
        background-color: #8BC6EC;
        background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
        box-sizing: border-box;
    }

    .dragged {
        opacity: .5;
    }

    .dragenter {
        box-shadow: inset 0 0 10px 10px #4caf50;
    }

    .container {
        width: 300px;
        height: 200px;
        background-color: #FF3CAC;
        background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);

    }
</style>
