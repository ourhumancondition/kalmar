<template>
    <span class="flex items-center gap-1 cursor-pointer" @click="like">
        <svg v-if="isLiked" class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
            viewBox="0 0 24 24">
            <path fill="currentColor"
                d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837t2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575t2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25t-.525-.125t-.425-.375m.95 4.725" />
        </svg>
    </span>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();

const { selectedPost, allPosts } = storeToRefs(postsStore);
const { likePost } = postsStore;

const isLiked = computed(() => JSON.parse(localStorage.getItem("likedPosts") as any).includes(selectedPost.value?.id));

const like = async () => {
    let likes = 0;

    if (JSON.parse(localStorage.getItem("likedPosts") as any).includes(selectedPost.value?.id)) {
        likes = +selectedPost.value?.likes - 1;
    } else {
        likes = +selectedPost.value?.likes + 1;
    }

    try {
        await likePost(selectedPost.value, likes)
            .then(() => {
                if (JSON.parse(localStorage.getItem("likedPosts") as any).includes(selectedPost.value?.id)) {
                    localStorage.setItem("likedPosts", JSON.stringify([...JSON.parse(localStorage.getItem("likedPosts") as any)].filter((l: any) => l !== selectedPost.value?.id)));
                } else {
                    localStorage.setItem("likedPosts", JSON.stringify([...JSON.parse(localStorage.getItem("likedPosts") as any), selectedPost.value?.id]));
                }

                selectedPost.value = { ...selectedPost.value, likes: likes };

                allPosts.value.filter((post: any) => {
                    if (post?.id === selectedPost.value?.id) {
                        post.likes = selectedPost.value?.likes;
                    }
                });
            })

    } catch (err: any) {
        null;
    }
}
</script>

<style scoped></style>