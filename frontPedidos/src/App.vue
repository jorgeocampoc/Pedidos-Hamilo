<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
const route = useRouter();
</script>

<template>
  <div>
    <header>
      <nav v-if="route.currentRoute.value.path !== '/login'">
        <!-- <RouterLink to="/login">Login</RouterLink> -->
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

