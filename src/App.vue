<template>
    <div id="app">
        <DraggableTable/>
    </div>
</template>

<script>
    import DraggableTable from "./components/DraggableTable";

    export default {
        name: 'App',
        components: {
            DraggableTable,
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        background-image: radial-gradient( circle farthest-corner at -4% -12.9%,  rgba(74,98,110,1) 0.3%, rgba(30,33,48,1) 90.2% );
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
