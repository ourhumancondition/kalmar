<template>
    <div>
        <div class="w-full py-40 min-h-screen flex flex-col justify-center items-center">
            <Suspense>
                <div class="flex flex-col justify-center items-center">
                    <SearchedPosts :page="page" :perPage="6" :keyWord="keyWord" />

                    <Pagination v-if="posts.length !== 0" :currentPageNumber="page" :path="`search/${keyWord}`" :perPage="6" @changePage="changePage" class="mt-12" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const route = useRoute();

const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

const keyWord = `${route.params?.word}`;
const page = ref(+route.params?.id);

const changePage = (newPage: number, updateThreeMults: Function) => {
    page.value = newPage;
    updateThreeMults(page.value);
}

useHead({
    title: `Search For ${keyWord} - KALMAR`,
    meta: [
        { name: "KALMAR", content: "Designer, Song Writer, Enterpreneur; a Polymath" }
    ]
})
</script>

<style scoped>

</style>