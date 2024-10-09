<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
  const route = useRouter();
</script>

<template>
  <div>
    <header>


<nav v-if="route.currentRoute.value.path !== '/login'">
  <RouterLink to="/">Home</RouterLink>
  <!-- <RouterLink to="/login">Login</RouterLink> -->

</nav>
</header>

<RouterView />
  </div>
</template>

