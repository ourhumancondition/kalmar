<template>
  <div class="w-full min-h-screen mx-auto grid items-center" v-motion :initial="{ opacity: 0, scale: 0.7 }"
    :visible-once="{ opacity: 1, scale: 1 }" :delay="200" :duration="1200">
    <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%] flex content-start mx-auto">
      <div class="md:w-[80%] sm:w-[100%] max-sm:w-[100%]">
        <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
          <h2 class="mb-5 font-bold text-lg tracking-wider">Contact Me</h2>
        </div>
        <form @submit.prevent="submit">
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
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
const name = ref("");
const email = ref("");
const message = ref("");

const { sendMessage } = useContact();

const submit = async () => {
  try {
    await sendMessage({
      name: name.value,
      email: email.value,
      message: message.value
    })
      .then(() => {
        name.value = "";
        email.value = "";
        message.value = "";
      })
  } catch (err: any) {
    null;
  }
}
</script>