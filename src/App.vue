<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-size: 16px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
.d-flex {
  display: flex !important;
}
.flex-grow-0 {
  flex-grow: 0 !important;
}
.flex-grow-1 {
  flex-grow: 1 !important;
}
.justify-content-between {
  justify-content: space-between !important;
}
.justify-content-around {
  justify-content: space-around !important;
}
.align-items-center {
  align-items: center !important;
}
.pointer {
  cursor: pointer;
}
</style>
