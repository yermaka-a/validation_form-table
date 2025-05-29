import type Post from "./Post";

export default interface ResponseInfinite {
  "data": Post[],
  "first": number,
  "items": number,
  "last": number,
  "next": number,
  "pages": number
  "prev": null
}
