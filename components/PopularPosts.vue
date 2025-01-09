<template>
    <Carousel :value="popularPosts" :numVisible="1" :numScroll="1" circular :autoplayInterval="6000"
        class="mx-auto w-[90%]">
        <template #item="slotProps">
            <div>

                <div class="py-3 text-zinc-800 font-bold">
                    {{ slotProps.data?.title }}
                </div>

                <div>
                    <img v-if="slotProps.data?.showPoster" class="w-full lg:aspect-video md:aspect-video sm:aspect-square max-sm:aspect-square"
                        :src="slotProps.data?.blobPoster" :alt="slotProps.data?.title">
                        <img v-else class="w-full lg:aspect-video md:aspect-video sm:aspect-square max-sm:aspect-square"
                        src="../assets/post-default.jpg" :alt="slotProps.data?.title">
                </div>
            </div>

            <div>
                <div class="pt-3">
                    {{ slotProps.data?.description.split(" ").length > 10 ? slotProps.data?.description.split("").slice(0, 10).join(" ") + "..." : slotProps.data?.description }}
                </div>
                <div>
                    <NuxtLink :to="`/posts/${slotProps.data?.id}`">
                        <button
                            class="p-2 bg-black text-white border hover:border-black hover:bg-white hover:text-black duration-200 mt-3 tracking-wider rounded-md">Read
                            Full</button>
                    </NuxtLink>
                </div>
            </div>
        </template>
    </Carousel>
</template>

<script setup lang="ts">
import { dbUrl } from "~/pocketbase";
import { usePostsStore } from "../stores/posts";

const postsStore = usePostsStore();

const { getPopularPosts } = postsStore;
const { popularPosts } = storeToRefs(postsStore);

onBeforeMount(() => {
    getPopularPosts();

    popularPosts.value = popularPosts.value.filter(async (post: any) => {
        await fetch(`${dbUrl}api/files/posts/${post?.id}/${post?.poster}`)
            .then(response => response.blob())
            .then(blob => {
                post.blobPoster = URL.createObjectURL(blob);
            })
    })
});
</script>

<style scoped></style>