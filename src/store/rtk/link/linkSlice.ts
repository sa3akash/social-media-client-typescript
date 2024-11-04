import api from "@/store/rtk/BaseQuery";
 
export const linkApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    getMetadata: builder.query({
      query: (url:string) => ({
        url: `/link-preview?url=${url}`,
        method: "GET",
      }),
    }),
})
})

export const { useGetMetadataQuery } = linkApi;
