<template>
    <MainLayout :title="pageTitle">
        <RouterView />
    </MainLayout>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import MainLayout from "./MainLayout.vue";

const route = useRoute();

const pageTitle = computed(() => route.meta.title || "Overview");
</script>
