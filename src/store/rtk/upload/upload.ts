import api from "@/store/rtk/BaseQuery";

export const uploadFileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      query: ({data,params}:{data: string | ArrayBuffer | null,params:string}) => ({
        url: `/upload?${params}`,
        method: "POST",
        body: data,
        headers: {
            'Content-Type': 'application/octet-stream',
        }
      }),
    }),
})
});

export const {
  useUploadSingleFileMutation
} = uploadFileApi;
