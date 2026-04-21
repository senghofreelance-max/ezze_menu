<template>
    <MainLayout :title="pageTitle" :app_title="app_title">
        <RouterView />
    </MainLayout>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import MainLayout from "./MainLayout.vue";

const route = useRoute();
const app_title = computed(() => localStorage.getItem("ezze-menu-admin-app-title") || "Admin Panel");
const pageTitle = computed(() => route.meta.title || "Overview");
</script>
