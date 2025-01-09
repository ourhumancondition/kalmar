<template>
    <div>
        <div class="w-full pt-40 pb-12 min-h-screen flex flex-col justify-center items-center">
            <Suspense>
                <div class="flex flex-col justify-center items-center">
                    <Posts :page="page" :perPage="6" :keyWord="pageRoute" />

                    <Pagination v-if="posts.length !== 0" :currentPageNumber="page" :perPage="6" :path="pageRoute" @changePage="changePage" class="mt-12" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePagesStore } from '~/stores/pages';
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const route = useRoute();

const { posts } = storeToRefs(postsStore);

const pagesStore = usePagesStore();
const { selectedPage } = storeToRefs(pagesStore);

const pageRoute = `${route.params?.page}`;
const page = ref(+route.params?.id);

const changePage = (newPage: number, updateThreeMults: Function) => {
    page.value = newPage;
    updateThreeMults(page.value);
}

useHead({
    title: `${selectedPage.value?.showPage ? selectedPage.value?.pageTitle : 'Not Found'} - KALMAR`,
    meta: [
        { name: "KALMAR", content: "Designer, Song Writer, Enterpreneur; a Polymath" },
        { name: selectedPage.value?.pageTitle, content: selectedPage.value?.pageDescription }
    ]
})
</script>

<style scoped>

</style>