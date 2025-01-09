import { pb } from "~/pocketbase"

export default function () {
    
    const sendMessage = async (data: any) => {
        await pb.collection("messages")
        .create(data)
    }

    return { sendMessage };
}