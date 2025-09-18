<script setup>
// import { useQuery } from '@tanstack/vue-query'

// const { isPending, isFetching, isError, data, error } = useQuery({
//   queryKey: ['todos'],
//   queryFn: getTodos,
// })
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
