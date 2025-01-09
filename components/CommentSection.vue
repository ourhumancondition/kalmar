<template>
  <div class="w-full mx-auto grid items-center">
    <div class="w-full flex content-start mx-auto py-2">
      <div class="w-full">
        <div>
          <h2 class="mb-5 font-bold text-lg tracking-wider">Leave A Comment</h2>
        </div>
        <form @submit.prevent="leave">
          <div class="mb-4">
            <label class="block text-gray-800 mb-1" for="name">Your Name</label>
            <input v-model="name"
              class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 border border-zinc-400"
              placeholder="Enter your name" type="text" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-800 mb-1" for="email">Your Email</label>
            <input v-model="email"
              class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 border border-zinc-400"
              placeholder="Enter your email" name="email" id="email" type="email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-800 mb-1" for="message">Your Message</label>
            <textarea v-model="message"
              class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 border border-zinc-400"
              rows="4" placeholder="Enter your message" name="message" id="message" required></textarea>
          </div>
          <button
            class="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
            type="submit">
            Send Comment
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const postsStore = usePostsStore();
const { selectedPost, comments, allPosts, posts } = storeToRefs(postsStore);
const { leaveComment } = postsStore;

const name = ref("");
const email = ref("");
const message = ref("");
const number = () => selectedPost.value?.comments.length === 0 ? 1 : comments.value?.sort((a: any, b: any) => b?.number - a?.number)[0]?.number;

const leave = async () => {
  try {
    await leaveComment({
      name: name.value,
      email: email.value,
      message: message.value,
      number: number() + 1
    }
      , selectedPost.value)

      .then((data: any) => {
        localStorage.setItem("commented", JSON.stringify([...JSON.parse(localStorage.getItem("commented") as any), data?.id]));
        selectedPost.value = { ...selectedPost.value, comments: [...selectedPost.value?.comments, data?.id] };
        allPosts.value.filter((post: any) => {
          if (post?.id === selectedPost.value?.id) {
            post.comments = selectedPost.value?.comments;
          }
        });
        comments.value.unshift(data);

        name.value = "";
        email.value = "";
        message.value = "";
      })

  } catch (err: any) {
    null;
  }
}
</script>