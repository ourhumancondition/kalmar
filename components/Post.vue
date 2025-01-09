<template>
    <div class="w-full mt-32 mb-24">
        <div
            class="lg:w-[60%] md:w-[75%] sm:w-[85%] max-sm:w-[90%] mx-auto p-5 bg-zinc-50 shadow-md shadow-zinc-400 box-border">
            <div class="w-full p-2 border-b text-zinc-700">
                <div class="flex text-xs gap-3 mt-1">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17" />
                        </svg>
                        {{ selectedPost?.views }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
                        </svg>
                        {{ selectedPost?.likes }}
                    </span>
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z" />
                        </svg>
                        {{ selectedPost?.comments?.length }}
                    </span>
                </div>

                <div class="flex flex-col text-xs gap-1 my-2 font-bold tracking-wider">
                    <span class="flex items-center gap-1">
                        Created at {{ manualCreated ? manualCreated : created }}<span v-if="selectedPost?.showAuthor">by {{ selectedPost?.author
                            }}</span>
                    </span>
                    <span v-if="selectedPost?.showUpdateTime" class="flex items-center gap-1">
                        Updated at {{ updated }}
                    </span>
                </div>
            </div>

            <div id="PostContent" class="box-border overflow-x-auto mt-5">

            </div>

            <div class="w-full flex justify-between p-2 text-zinc-700 mt-5">
                <div class="flex text-xs gap-3 mt-1">
                    <LikeBtn />
                    <CopyToClipBtn />
                </div>

                <div v-if="selectedPost?.category" class="w-full flex justify-end items-center">
                    <p>Category: <span class="text-yellow-500 cursor-pointer"
                            @click="router.replace(`/${selectedPost?.category}`)">{{ selectedPost?.category.split("")[0].toUpperCase()
                                + selectedPost?.category.slice(1)}}</span></p>
                </div>
            </div>

            <div v-if="selectedPost?.showTags" class="w-full mt-1">
                <button v-for="tag in selectedPost?.tags" :key="tag" @click="router.replace(`/search/${tag}`)"
                    class="border border-black mr-2 mt-2 py-1 px-2 hover:bg-black hover:text-white duration-200 rounded">{{ tag
                    }}</button>
            </div>

            <div v-if="selectedPost?.showComments" class="w-full p-2 text-zinc-700 mt-5 border-t">
                <CommentSection />
                <Comments :post="selectedPost" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const route = useRoute();
const router = useRouter();

const { selectedPost, allPosts } = storeToRefs(postsStore);
const { getPost, addViews } = postsStore;

const getFormattedDate = useDateFormatter();

const created = computed(() => getFormattedDate(selectedPost.value?.created));
const manualCreated = computed(() => selectedPost.value?.manualCreated ? getFormattedDate(selectedPost.value?.manualCreated) : "");
const updated = computed(() => getFormattedDate(selectedPost.value?.updated));

const id = route.params?.id as string;

try {
    await getPost(id)
        .then(async () => await addViews(selectedPost.value))
        .then(() => {
            selectedPost.value = { ...selectedPost.value, views: +selectedPost.value?.views + 1 };

            allPosts.value.filter((post: any) => {
                if (post?.id === selectedPost.value?.id) {
                    post.views = selectedPost.value?.views;
                }
            });
        })

} catch (err: any) {
    console.log(err?.message);
}


onMounted(() => {
    const postContentEl = document.querySelector("#PostContent") as HTMLElement;
    postContentEl.insertAdjacentHTML("afterbegin", selectedPost.value?.content);
})

useHead({
    title: `${selectedPost.value?.title} - KALMAR`,
    meta: [
        { name: "KALMAR", content: "Designer, Song Writer, Enterpreneur; a Polymath" },
        { name: selectedPost.value?.title, content: selectedPost.value?.description }
    ]
})
</script>

<style scoped>
#PostContent iframe {
    width: 100%;
    aspect-ratio: 16/9;
}

#PostContent img {
    width: 100%;
    aspect-ratio: normal;
}

#PostContent video {
    width: 100%;
    aspect-ratio: normal;
}
</style>