import axios, { AxiosError } from "axios";
import { postsUrl } from "~/constants/urls";
import {_per_page} from  "~/constants/params"
import type ResponseInfinite from "~/types/ResponseInfinite";
import FetchDataError from "~/errors/FetchDataError";
import { dataIsnotFetch } from "~/constants/commonErrorsMessages";

const fetchPosts = async (pageParam = 1) => {
  try {
  const options =  {
    method: "GET",
    params: {
      _page: pageParam,
      _per_page: _per_page
    }
  }
  const response = await axios.get<ResponseInfinite>(postsUrl,options)
  console.log("fetchPosts", response.data)
  return response.data
} catch(error){
  const axiosErr = error as AxiosError 
  const internalError = {op: "fetchPosts", "code": axiosErr.code, "message": axiosErr.message}
  console.error(internalError)
  throw new FetchDataError(axiosErr.status, dataIsnotFetch)
}
};

export default fetchPosts
