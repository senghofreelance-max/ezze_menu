<template>
    <div class="app-shell flex min-h-screen items-center justify-center px-md py-xl">
        <div class="w-55 max-w-5xl gap-xl ">

            <section class="app-panel p-xl">
                <div class="mb-lg flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[0.24em] text-muted">Sign In</p>
                        <h2 class="mt-sm text-3xl font-extrabold text-heading">Control your menu operations</h2>
                    </div>
                    <button
                        class="rounded-2xl border border-border px-md py-sm text-sm font-semibold text-body transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        @click="cycleTheme">
                        {{ theme }}
                    </button>
                </div>

                <div class="space-y-md">
                    <EzzeInput v-model="form.username" label="Username" placeholder="Administrator" />
                    <EzzeInput v-model="form.password" type="password" label="Password" placeholder="••••••••" />
                    <EzzeButton :loading="submitting" @click="submit" class="w-full">Login</EzzeButton>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { EzzeButton, EzzeInput } from "@/components/Form";
import { useDarkMode } from "@shared/composables/useDarkMode";
import { session } from "@shared/services/session";
import { applyAbilityForUser } from "../../services/ability";

const { proxy } = getCurrentInstance();
const router = useRouter();
const { cycleTheme, theme } = useDarkMode();
const submitting = ref(false);
const form = reactive({
    username: "",
    password: "",
});

async function submit() {
    console.log("submit")
    submitting.value = true;
	try {
		await session.login(form.username, form.password);
		proxy.$notify.success("Welcome back.");
		window.location.href = "/menu-admin";
	} catch (error) {
		proxy.$notify.error(
			error?.response?.data?.message || error?.message || "Unable to login.",
        );
    } finally {
        submitting.value = false;
    }
}
</script>
