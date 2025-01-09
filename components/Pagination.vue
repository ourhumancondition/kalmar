<template>
    <ul class="flex gap-1">
        <button @click="router.push(`/${props.path}/${currentPageNumber - 1}`)"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :disabled="currentPageNumber === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path fill="currentPageNumberColor" d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" />
            </svg>
        </button>
        <button v-for="btn in btns" :key="btn" @click="router.push(`/${props.path}/${btn}`)"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :class="currentPageNumber === btn ? 'bg-zinc-800 text-white' : ''" :disabled="btn > Math.ceil(thisAllPosts.length / perPage)">
            {{ btn }}
        </button>
        <button @click="router.push(`/${props.path}/${currentPageNumber + 1}`)"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :disabled="btns[btns.length - 1] + 1 > Math.ceil(thisAllPosts.length / perPage)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path fill="currentPageNumberColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z" />
            </svg>
        </button>
    </ul>


    <!-- <ul class="flex gap-1">
        <button @click="emit('changePage', currentPageNumber - 1, updateThreeMults)"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :disabled="currentPageNumber === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path fill="currentPageNumberColor" d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z" />
            </svg>
        </button>
        <button v-for="btn in btns" :key="btn" @click="emit('changePage', btn, () => { })"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :class="currentPageNumber === btn ? 'bg-zinc-800 text-white' : ''" :disabled="btn > Math.ceil(allPosts.length / perPage)">
            {{ btn }}
        </button>
        <button @click="emit('changePage', currentPageNumber + 1, updateThreeMults)"
            class="border border-zinc-400 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer disabled:bg-slate-300 disabled:opacity-50 disabled:cursor-auto"
            :disabled="btns[btns.length - 1] + 1 > Math.ceil(allPosts.length / perPage)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path fill="currentPageNumberColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z" />
            </svg>
        </button>
    </ul> -->
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts';

const router = useRouter();
const route = useRoute();

const postsStore = usePostsStore();

const { allPosts } = storeToRefs(postsStore);

const thisAllPosts = ref<any[]>([]);

const props = defineProps<{
    currentPageNumber: number,
    perPage: number,
    path: string
}>()

if (route.path.includes("blog")) {
    thisAllPosts.value = allPosts.value;

} else if (route.path.includes("search")) {
    thisAllPosts.value = allPosts.value.filter((post: any) => post?.title.toLowerCase().includes(route.params?.word) || post?.description.toLowerCase().includes(route.params?.word) || post?.category.toLowerCase().includes(route.params?.word) || post?.tags.includes(route.params?.word));
    
} else {
    thisAllPosts.value = allPosts.value.filter((post: any) => post?.blogName === route.params?.page);
}


const emit = defineEmits<{
    changePage: [newPage: number, updateThreeMults: Function]
}>()

const btns = ref<number[]>([]);

const updateThreeMults = (page: number) => {
    let threeMults: number[] = [];
    for (let i = 1; i < page + 3; i++) {
        if (i % 3 === 0) {
            threeMults.push(i);
        }
    }
    let lastThreeMult = threeMults[threeMults.length - 1];
    btns.value = [lastThreeMult - 2, lastThreeMult - 1, lastThreeMult];
}
updateThreeMults(props.currentPageNumber);
</script>

<style scoped></style>