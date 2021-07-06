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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
