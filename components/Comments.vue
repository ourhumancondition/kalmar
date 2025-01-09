<template>
    <div class="py-3">
        <div>
            <h2 class="mb-5 font-bold text-lg tracking-wider">Comments ({{comments.length}})</h2>
        </div>
        
        <ul>
            <li v-for="comment in comments" :key="comment?.id" class="border-t py-5 box-border w-full text-wrap">
                <div class="flex justify-between">
                    <span>
                        <span class="text-sm">At {{ created(comment) }} by <span class="font-bold">{{ comment?.name }}</span></span>
                        <span class="text-xs text-zinc-500 block">{{comment?.email}}</span>
                    </span>

                    <span v-if="isCommented(comment)" class="cursor-pointer" @click="removeComment(comment)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </span>
                </div>

                <div class="w-full overflow-hidden text-zinc-700 pt-3">
                    <p class="box-border text-wrap">{{comment?.message}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const { comments, selectedPost, allPosts } = storeToRefs(postsStore);
const { getComment, deleteComment } = postsStore;

const props = defineProps<{
    post: any
}>()

const getFormattedDate = useDateFormatter();

const created = (comment: any) => getFormattedDate(comment?.created);

comments.value = [];
props.post?.comments.forEach(async (comment: any) => {
    comments.value.unshift(await getComment(comment));
})
comments.value = comments.value.sort((a: any, b: any) => b?.number - a?.number);

const isCommented = (comment: any) => JSON.parse(localStorage.getItem("commented") as any).includes(comment?.id);

const removeComment = async (comment: any) => {
    await deleteComment(comment?.id)
    .then(() => {
        let coms = JSON.parse(localStorage.getItem("commented") as any);
        coms = coms.filter((c: any) => c !== comment?.id);
        localStorage.setItem("commented", JSON.stringify(coms));
        selectedPost.value.comments = selectedPost.value?.comments.filter((c: any) => c !== comment?.id);

        comments.value = comments.value.filter((c: any) => c?.id !== comment?.id);

        allPosts.value.filter((post: any) => {
          if (post?.id === selectedPost.value?.id) {
            post.comments = selectedPost.value?.comments;
          }
        });
    })
}
</script>

<style scoped>

</style>