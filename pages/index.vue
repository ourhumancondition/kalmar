<template>
    <div>
        <Jumbotron :page="selectedPage" />

        <section id="next" class="w-[85%] min-h-screen flex flex-col lg:flex-row justify-center items-center gap-16 mx-auto">
            <iframe class="max-sm:w-full sm:w-full lg:w-[70%] aspect-video" src="https://www.youtube.com/embed/iiMYiJgkcn8?si=rr28BOiBCXx84bPB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            <div class="flex flex-col gap-10 max-sm:w-full sm:w-full lg:w-[30%]">
                <div>
                    <h3 class="font-bold tracking-wider mb-3">Feels So Right [2010]</h3>
                    <audio class="w-full" controls>
                        <source type="audio/mpeg" src="../assets/Feels-So-Right.mp3">
                        Your browser does not support the audio element.
                    </audio>
                </div>

                <div>
                    <h3 class="font-bold tracking-wider mb-3">Left Behind [2010]</h3>
                    <audio class="w-full" controls>
                        <source type="audio/mpeg" src="../assets/Left-Behind-Cut.mp3">
                        Your browser does not support the audio element.
                    </audio>
                </div>

                <div>
                    <h3 class="font-bold tracking-wider mb-3">Come With Me [2010]</h3>
                    <audio class="w-full" controls>
                        <source type="audio/mpeg" src="../assets/Come-With-Me.mp3">
                        Your browser does not support the audio element.
                    </audio>
                </div>

            </div>
        </section>

        <section>
            <div class="w-full py-20 min-h-screen flex flex-col justify-center items-center">
                <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
                    <h3 class="mb-5 font-bold text-lg tracking-wider">Popular Posts</h3>
                </div>
                <PopularPosts />
            </div>
        </section>

        <section>
            <div class="w-full py-20 min-h-screen flex flex-col justify-center items-center">
                <Suspense>
                    <div class="flex flex-col justify-center items-center">
                        <div class="md:w-[80%] sm:w-[85%] max-sm:w-[90%]">
                            <h3 class="mb-5 font-bold text-lg tracking-wider">Latest Posts</h3>
                        </div>
                        <Posts :page="1" :perPage="6" :keyWord="''" />
                    </div>
    
                    <template #fallback>
                        <Spinner />
                    </template>
                </Suspense>
            </div>
        </section>

        <section v-if="selectedPage?.hasCustomContent" id="CustomContent"  class="w-full min-h-screen p-8 flex flex-col justify-center items-center">

        </section>

        <section>
            <Contact />
        </section>
    </div>
</template>

<script setup lang="ts">
import { usePagesStore } from '~/stores/pages';

const pagesStore = usePagesStore();
const { selectedPage } = storeToRefs(pagesStore);
const { getIndexPage } = pagesStore;


try {
  await getIndexPage();
} catch (err: any) {
  null;
}

onMounted(() => {
    document.querySelector("#CustomContent")?.insertAdjacentHTML("afterbegin", selectedPage.value?.customContent);
})

useHead({
    title: "KALMAR - Designer, Song Writer, Enterpreneur; a Polymath",
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