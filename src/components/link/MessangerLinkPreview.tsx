import { ILinkPreviewMetadata } from "@/interfaces/http.interface";
import { useGetMetadataQuery } from "@/store/rtk/link/linkSlice";
import { ImageOff, Loader2, ShieldAlert } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  url: string;
}

const MessangerLinkPreview: React.FC<Props> = ({ url }) => {
  const { data, isLoading, isError } = useGetMetadataQuery(
    encodeURIComponent(url)
  );

  const metadata = data as ILinkPreviewMetadata;

  return (
    <Link to={url} target="_blank" rel="noreferrer">
      {metadata && (
        <div className="relative group hover:text-[#646cff] flex flex-col md:flex-row bg-white text-black">
          <div className="w-full md:w-[150px]">
            {data?.image?.url ? (
              <img
                src={data?.image?.url}
                alt={data?.title}
                className="w-full h-full object-cover"
                title={metadata.title}
              />
            ) : (
              <div className="bg-[#464653] w-full h-[150px] md:h-full flex justify-center items-center">
                <ImageOff className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 py-3 px-4 flex flex-col justify-center gap-2">
            <header title={metadata.title} className="font-bold">
              {metadata?.title.length > 40
                ? metadata.title.slice(0, 40) + "..."
                : metadata.title}
            </header>
            <section
              className="text-sm"
              title={
                metadata?.description.length > 90
                  ? metadata.description.slice(0, 90) + "..."
                  : metadata.description
              }
            >
              {metadata?.description.length > 90
                ? metadata.description.slice(0, 90) + "..."
                : metadata.description}
            </section>
            <footer
              className="flex items-center justify-between gap-2 text-xs w-full"
              title={metadata.domain}
            >
              {metadata.domain} | {metadata.lang}
              <img
                src={metadata.logo?.url}
                alt={metadata.logo?.type}
                className="w-5"
              />
            </footer>
          </div>
        </div>
      )}
      {isLoading && (
        <p className="flex items-center justify-center gap-2 p-4 bg-white text-black">
          Loading...
          <Loader2 className="animate-spin" size={20} />
        </p>
      )}
      {isError && (
        <p className="flex items-center justify-center gap-2 p-4 bg-rose-300 text-rose-700">
          <ShieldAlert /> Somthing went wrong!
        </p>
      )}
    </Link>
  );
};

export default MessangerLinkPreview;

{
  /* <div>
            {data?.image?.url && (
              <img
                src={data?.image?.url}
                alt={data?.title}
                className="bg-[#292932] rounded-lg"
                title={metadata.url}
              />
            )}
            {!data?.image?.url && (
              <div className="flex items-center gap-2 py-2 h-[100px] md:h-[150px] justify-center bg-[#292932] rounded-lg">
                <ImageOff />
                <span>No Image Found!</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold pt-2" title={data?.title}>
              {data?.title}
            </h3>
            <p className="text-sm" title={data?.description}>
              {data?.description}
            </p>
          </div> */
}
