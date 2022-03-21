<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 1s;
}
</style>
