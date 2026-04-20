<template>
    <AppToast />
    <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import AppToast from "@shared/components/ui/Toast/AppToast.vue";
</script>
