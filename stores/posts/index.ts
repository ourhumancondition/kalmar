import { pb } from "~/pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const posts = ref<any[]>([]);
    const allPosts = ref<any[]>([]);
    const popularPosts = ref<any[]>([]);
    const selectedPost = ref<any>({});

    const comments = ref<any[]>([]);

    const getAllPosts = async () => {
        await pb.collection('posts').getFullList({
            sort: '-created',
            filter: "showPost = " + "" + true + "" + ""
        })
        .then((data: any) => allPosts.value = data)
    }

    const getPosts = async (page = 1, perPage = 6, keyWord: string) => {
        // await pb.collection('posts').getList(page, perPage, {
        //     sort: '-created',
        //     filter: "showPost = " + "" + true + "" + " && category ~ " + "" + '"' + keyWord + '"' + ""
        // })
        // .then((data: any) => posts.value = data?.items)
        if (keyWord === "") {
            posts.value = allPosts.value;
        } else {
            posts.value = allPosts.value.filter((post: any) => post?.category.toLowerCase() === keyWord.toLowerCase());
        }
        posts.value = posts.value.slice((perPage * (page - 1)), (perPage * (page)));
    }

    const searchPosts = async (page = 1, perPage = 6, keyWord: string) => {
        //page = 1, perPage = 6, keyWord: string
        // await pb.collection('posts').getList(page, perPage, {
        //     sort: '-created',
        //     filter: "showPost = " + "" + true + "" + " && title ~ " + "" + '"' + keyWord + '"' + "" + " || description ~ " + "" + '"' + keyWord + '"' + "" + " || category ~ " + "" + '"' + keyWord + '"' + ""
        // })
        // .then((data: any) => posts.value = data?.items)
        posts.value = allPosts.value.filter((post: any) => post?.title.toLowerCase().includes(keyWord.toLowerCase()) || post?.description.toLowerCase().includes(keyWord.toLowerCase()) || post?.category.toLowerCase().includes(keyWord.toLowerCase()) || post?.tags.includes(keyWord.toLowerCase()));
        posts.value = posts.value.slice((perPage * (page - 1)), (perPage * (page)));
    }

    const getPost = async (id: string) => {
        // await pb.collection('posts').getOne(id)
        // .then(data => selectedPost.value = data);
        selectedPost.value = allPosts.value.find((post: any) => post?.id === id);
    }

    const getPopularPosts = () => {
        popularPosts.value = 
        allPosts.value.sort((a: any, b: any) => b?.likes - a?.likes)
        .slice(0, 3)
    }

    const addViews = async (post: any) => {
        await pb.collection("posts")
        .update(post?.id, {
            views: +post?.views + 1
        })
    }

    "likedPosts" in localStorage ? null : localStorage.setItem("likedPosts", "[]");
    const likePost = async (post: any, likes: number) => {
        await pb.collection("posts")
        .update(post?.id, {
            likes: likes
        })
    }

    "commented" in localStorage ? null : localStorage.setItem("commented", "[]");
    const leaveComment = async (comment: any, post: any) => {
        return await pb.collection("comments")
        .create(comment)
        .then(async (data: any) => {
            await pb.collection("posts")
            .update(post?.id, {
                comments: [...post?.comments, data?.id]
            })
            return data;
        })
    }

    const deleteComment = async (id: string) => {
        await pb.collection("comments")
        .delete(id)
    }

    const getComment = async (id: string) => {
        return await pb.collection("comments")
        .getOne(id)
    }

    return { posts, popularPosts, selectedPost, allPosts, comments, getPosts, searchPosts, getPopularPosts, getPost, getAllPosts, addViews, likePost, leaveComment, deleteComment, getComment }
})