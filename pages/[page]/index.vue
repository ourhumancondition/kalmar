<template>
    <div>

        <NotFound v-if="!selectedPage?.showPage" />

        <Jumbotron v-if="selectedPage?.hasBanner" :page="selectedPage" />

        <section v-if="selectedPage?.hasPosts" id="next"
            class="w-full pt-40 pb-12 min-h-screen flex flex-col justify-center items-center">
            <Suspense>
                <div class="flex flex-col justify-center items-center">
                    <Posts :page="page" :perPage="6" :keyWord="pageRoute" />

                    <Pagination v-if="posts.length !== 0" :currentPageNumber="page" :perPage="6" :path="pageRoute"
                        @changePage="changePage" class="mt-12" />
                </div>

                <template #fallback>
                    <Spinner />
                </template>
            </Suspense>
        </section>

        <section v-if="selectedPage?.hasCustomContent" id="CustomContent" class="w-full min-h-screen mt-32 px-5 flex flex-col justify-center items-center">

        </section>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';
import { usePagesStore } from '~/stores/pages';

const route = useRoute();

const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

const pagesStore = usePagesStore();
const { selectedPage, categoryPages, otherPages } = storeToRefs(pagesStore);
const { getPage, getAllPages } = pagesStore;

const pageRoute = `${route.params?.page}`;
const page = ref(1);

try {
    if (categoryPages.value.length !== 0 && otherPages.value.length !== 0) {
        for (let page of categoryPages.value) {
            if (page?.pageRoute === pageRoute) {
                getPage(pageRoute, "categoryPages");
            }
        }

        for (let page of otherPages.value) {
            if (page?.pageRoute === pageRoute) {
                getPage(pageRoute, "otherPages");
            }
        }


    } else {
        await getAllPages("categoryPages")
            .then(async () => await getAllPages("otherPages"))
            .then(() => {
                for (let page of categoryPages.value) {
                    if (page?.pageRoute === pageRoute) {
                        getPage(pageRoute, "categoryPages");
                    }
                }

                for (let page of otherPages.value) {
                    if (page?.pageRoute === pageRoute) {
                        getPage(pageRoute, "otherPages");
                    }
                }
            })
    }
    
} catch (err: any) {
    null;
}

const changePage = (newPage: number, updateThreeMults: Function) => {
    page.value = newPage;
    updateThreeMults(page.value);
}

onMounted(() => {
    document.querySelector("#CustomContent")?.insertAdjacentHTML("afterbegin", selectedPage.value?.customContent);
})

useHead({
    title: `${selectedPage.value?.showPage ? selectedPage.value?.pageTitle : 'Not Found'} - KALMAR`,
    meta: [
        { name: "KALMAR", content: "Designer, Song Writer, Enterpreneur; a Polymath" },
        { name: selectedPage.value?.pageTitle, content: selectedPage.value?.pageDescription }
    ]
})
</script>

<style scoped>
#CustomContent iframe {
    width: 100%;
    aspect-ratio: 16/9;
}

#CustomContent img {
    width: 100%;
    aspect-ratio: normal;
}

#CustomContent video {
    width: 100%;
    aspect-ratio: normal;
}
</style>