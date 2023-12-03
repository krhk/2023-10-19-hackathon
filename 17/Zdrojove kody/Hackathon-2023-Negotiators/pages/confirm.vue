<template>
  <div>
    <p class="u-text-black">
      Redirecting...
    </p>
  </div>
</template>

<script setup>

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<style scoped>

</style>