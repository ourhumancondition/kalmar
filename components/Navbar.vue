<template>
    <div>
        <nav class="fixed top-0 left-0 w-full border-gray-200 z-50" :class="navbarBg">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../assets/logo.png" class="h-8" alt="Flowbite Logo" />
                </a>
                <button @click="visibleRight = true" data-collapse-toggle="navbar-default" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="flex gap-5 text-zinc-100 font-bold">

                        <li v-if="otherPages.length !== 0" @mouseenter="othersDropdown = true" @click="othersDropdown = !othersDropdown" class="cursor-pointer">
                            <div>Others</div>
                            <ul @mouseleave="othersDropdown = false" :class="othersDropdown ? 'grid' : 'hidden'"
                                class="w-[200px] py-3 bg-zinc-700/50 mt-3 fixed top-[68px] justify-center gap-1 rounded-md">

                                <li v-for="page in otherPages" :key="page?.id" class="p-3 w- hover:bg-zinc-600/50 rounded-md">
                                    <NuxtLink :to="`/${page?.pageRoute}`">{{ page?.pageTitle }}</NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <li v-if="categoryPages.length !== 0" @mouseenter="categoriesDropdown = true" @click="categoriesDropdown = !categoriesDropdown" class="cursor-pointer">
                            <div>Categories</div>
                            <ul @mouseleave="categoriesDropdown = false" :class="categoriesDropdown ? 'grid' : 'hidden'"
                                class="w-[200px] py-3 bg-zinc-700/50 mt-3 fixed top-[68px] justify-center gap-1 rounded-md">

                                <li v-for="page in categoryPages" :key="page?.id" class="p-3 hover:bg-zinc-600/50 rounded-md">
                                    <NuxtLink :to="`/${page?.pageRoute}`">{{ page?.pageTitle }}</NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NuxtLink to="/blog">Blog</NuxtLink>
                        </li>

                        <li>
                            <NuxtLink to="/">Home</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- eslint-disable -->
        <Drawer v-model:visible="visibleRight" header="" position="right" class="w-[200px]">

            <ul class="flex flex-col text-zinc-600 dark:text-zinc-100 font-bold">
                <li class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md">
                    <NuxtLink to="/">Home</NuxtLink>
                </li>

                <li class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md">
                    <NuxtLink to="/blog">Blog</NuxtLink>
                </li>

                <li v-if="categoryPages.length !== 0" @click="categoriesDropdown = !categoriesDropdown"
                    class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer">Categories</li>
                <li v-if="categoriesDropdown" v-for="page in categoryPages" :key="page?.id"
                    class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer">
                    <NuxtLink :to="`/${page?.pageRoute}`">{{ page?.pageTitle }}</NuxtLink>
                </li>

                <li v-if="otherPages.length !== 0" @click="othersDropdown = !othersDropdown"
                    class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer">Others</li>
                <li v-if="othersDropdown" v-for="page in otherPages" :key="page?.id"
                    class="py-3 flex justify-center hover:bg-zinc-100 dark:bg-zinc-700 rounded-md cursor-pointer">
                    <NuxtLink :to="`/${page?.pageRoute}`">{{ page?.pageTitle }}</NuxtLink>
                </li>
            </ul>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import { usePagesStore } from '~/stores/pages';

const pagesStore = usePagesStore();
const { selectedPage, categoryPages, otherPages } = storeToRefs(pagesStore);

const topOfPage = ref(true);
const visibleRight = ref(false);

const categoriesDropdown = ref(false);
const othersDropdown = ref(false);

watch(categoriesDropdown, () => {
    if (categoriesDropdown.value) {
        othersDropdown.value = false;
    }
});
watch(othersDropdown, () => {
    if (othersDropdown.value) {
        categoriesDropdown.value = false;
    }
});


const route = useRoute();

const handleScroll = () => {
    if (window.scrollY > 0) {
        if (topOfPage.value) topOfPage.value = false
    } else {
        if (!topOfPage.value) topOfPage.value = true
    }
}

onBeforeMount(() => {
    window.addEventListener('scroll', handleScroll);
})

onMounted(() => {
    window.scrollY > 0 ? topOfPage.value = false : topOfPage.value = true;
})



const navbarBg = computed(() => {
    if (route.path === "/" || selectedPage.value?.hasBanner) {
        if (!topOfPage.value) {
            return "bg-zinc-800/70";
        }
    } else {
        return "bg-zinc-800/70";
    }
})

//When page info doesn't exist, the statement above will run else block
watch(
    () => route.fullPath,
    () => {
        // console.log("route fullPath updated", route.fullPath);

        if (route.fullPath.includes("blog") || route.fullPath.includes("posts") || route.fullPath.includes("search")) {
            selectedPage.value = {};
        }
    }
);
</script>

<style scoped></style>