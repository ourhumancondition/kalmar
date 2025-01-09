import { pb } from "~/pocketbase";

export const usePagesStore = defineStore("pages", () => {
    const categoryPages = ref<any[]>([]);
    const otherPages = ref<any[]>([]);
    const selectedPage = ref<any>({});

    const getAllPages = async (collectionName: string) => {
        await pb.collection(collectionName).getFullList({
            sort: '-created',
            filter: "showPage = " + "" + true + "" + ""
        })
        .then((data: any) => {
            if (collectionName === "categoryPages") {
                categoryPages.value = data;
            } else if (collectionName === "otherPages") {
                otherPages.value = data;
            }
        })
    }

    const getPage = (route: string, collectionName: string) => {
        // await pb.collection(collectionName).getFullList({
        //     sort: '-created',
        //     filter: "showPage = " + "" + true + "" + " && " + "" + "pageRoute = " + '"' + route + '"' + ""
        // })
        // .then((data: any) => selectedPage.value = data[0])

        if (collectionName === "categoryPages") {
            selectedPage.value = categoryPages.value.find((page: any) => page?.pageRoute === route);

        } else if (collectionName === "otherPages") {
            selectedPage.value = otherPages.value.find((page: any) => page?.pageRoute === route);
        }
    }

    const getIndexPage = async () => {
        await pb.collection('indexPage')
        .getFullList()
        .then((data: any) => selectedPage.value = data[0]);
    }

    return { selectedPage, categoryPages, otherPages, getPage, getAllPages, getIndexPage };
})