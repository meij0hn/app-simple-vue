<template>
  <div id="app">
    <div class="container-fluid">
      <div class="col-md-12">
        <h1 class="pl-0">
          <a href="/" class="btn btn-success">Home</a> BASIC APP
        </h1>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
