import axios, { AxiosError } from "axios";
import { dataIsnotSent } from "~/constants/commonErrorsMessages";
import { postsUrl } from "~/constants/urls";
import SendDataError from "~/errors/SendDataError";
import type Post from "~/types/Post";


const createPost  = async (data: Omit<Post, "id" | "created_at">) => {
    const payload = {
        ...data,
        created_at: new Date().toISOString()
        }
    const config =  {method: "POST", headers: {
                'Content-Type': 'application/json',
            }}
        try {
            const response = await axios.post<Post>(postsUrl, payload,config)
            console.log(response)
            return response.data
        } catch (error) {
             const axiosErr = (error as AxiosError)
        const internalError = {op: "createPost", "code": axiosErr.code, "message": axiosErr.message}
        console.error(internalError)
        throw new SendDataError(axiosErr.status, dataIsnotSent)
    }
}

export default createPost


