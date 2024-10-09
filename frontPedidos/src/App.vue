<script setup>

import { RouterLink, RouterView } from "vue-router";

import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
  const route = useRouter();

</script>

<template>
  <div>

    <header></header>
    <main class="container mt-5">
      <RouterView />
    </main>

    <header>


<nav v-if="route.currentRoute.value.path !== '/login'">
 
  <!-- <RouterLink to="/login">Login</RouterLink> -->

</nav>
</header>

<RouterView />

  </div>
</template>

