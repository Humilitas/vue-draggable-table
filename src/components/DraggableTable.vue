<template>
    <div class="draggable-table">
        <h1>Drag Items to Rearrange</h1>
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
                let sourceEl = e.target;
                sourceEl.classList.add('dragged');
                let id = sourceEl.dataset.id;
                e.dataTransfer.setData('id', id);
            },
            dragend(e) {
                let sourceEl = e.target;
                sourceEl.classList.remove('dragged');
                let id = sourceEl.dataset.id;
                e.dataTransfer.setData('id', id);
            },
            dragenter(e) {
                let target = e.target;
                target.classList.add('dragenter');
            },
            dragover(e) {
                // to enable drop event
                e.preventDefault();
            },
            dragleave(e) {
                let dragged = e.target;
                dragged.classList.remove('dragenter');
            },
            drop(e) {
                let target = e.target;
                target.classList.remove('dragenter');

                let tid = parseInt(target.dataset.id);
                let sid = parseInt(e.dataTransfer.getData('id'));

                if (tid === sid) {
                    return;
                }

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
    .draggable-table {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #eef;
    }

    td {
        cursor: pointer;
        padding: 2em;
        background-color: #8BC6EC;
        background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
        box-sizing: border-box;
        font-size: 2rem;
        font-weight: bold;
    }

    .dragged {
        opacity: .5;
    }

    .dragenter {
        /*box-shadow: inset 0 0 20px 1px #fff59d;*/
        animation: drag-enter-shadow 1s infinite alternate ease-in-out;
    }

    @keyframes drag-enter-shadow {
        from {
            box-shadow: inset 0 0 5px 5px #ffcfcf;
        }

        to {
            box-shadow: inset 0 0 30px 5px rgba(255, 102, 102, 0.15);
        }
    }
</style>
