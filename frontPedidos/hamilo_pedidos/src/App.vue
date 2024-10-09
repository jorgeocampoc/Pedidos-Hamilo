<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>


<nav>
  <RouterLink to="/">Home</RouterLink>
</nav>
</header>

<RouterView />
  </div>
</template>

