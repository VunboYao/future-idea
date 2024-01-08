<template>
  <div class="about">
    <h1>This is an about page{{ count.num }}</h1>
    <button @click="onClick">
      change
    </button>
  </div>
</template>

<script setup lang="ts">
const count = reactive({
  num: 0
})
function onClick() {
  count.num += 1
}
watch(() => ({...count}), (newValue, oldValue) => {
  console.log("🚀 ~ file: AboutView.vue:16 ~ watch ~ newValue:", newValue, oldValue)
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
