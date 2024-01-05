import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IReactionDoc,
  OnlyReactionName,
  ReactionName,
} from "@/interfaces/reaction.interface";
import SingleReactionItem from "@/components/models/item/SingleReactionItem";
import SingleReactionData from "@/components/models/item/SingleReactionData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IPostDoc } from "@/interfaces/post.interface";
import { PostUtils } from "@/services/utils/postUtils";
import { api } from "@/services/http/api";
import { useToast } from "../ui/use-toast";
import { ReactionIconMap, reactionColorMap } from "@/services/utils/map";
import { Check } from "lucide-react";

interface Props {
  reactionType: ReactionName;
  post: IPostDoc;
}

const ReactionModel: React.FC<Props> = ({ post, reactionType }) => {
  const filersReactions = PostUtils.filterReactions(post.reactions, 7);
  const [activeType, setActiveType] = useState(reactionType);
  const [reactionData, setReactionData] = useState<IReactionDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { toast } = useToast();
  const resetAll = () => {
    setTotalPages(1);
    setPageNumber(1);
    setLoading(false);
    setReactionData([]);
  };

  useEffect(() => {
    const apiUrl =
      activeType && activeType !== "all"
        ? `/post/reaction/${post?._id}?type=${activeType}&&page=${pageNumber}`
        : `/post/reactions/${post?._id}?page=${pageNumber}`;

    const callApi = async () => {
      const { numberOfPages, reactions } = await api.getPostReactions(
        apiUrl,
        toast,
        setLoading
      );
      if (pageNumber === 1) {
        setReactionData(reactions);
      } else {
        setReactionData((prev) => [...new Set([...prev, ...reactions])]);
      }
      setTotalPages(numberOfPages);
    };

    activeType !== "more" && callApi();
  }, [activeType, pageNumber, post?._id, toast]);

  const observer = useRef<IntersectionObserver | null>(null);
  // Inside your component
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (pageNumber >= totalPages) return;
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, pageNumber, totalPages]
  );

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg bg-[#1C1C24]">
        <div className="w-full flex items-center justify-center text-white p-2">
          <SingleReactionItem
            type="all"
            active={"all" === activeType}
            setActiveType={setActiveType}
            postCount={14500}
            resetAll={resetAll}
          />
          {filersReactions.slice(0, 3).map((item, index: number) => (
            <SingleReactionItem
              type={item[0]}
              active={item[0] === activeType}
              key={index}
              setActiveType={setActiveType}
              postCount={item[1]}
              resetAll={resetAll}
            />
          ))}
          <SingleReactionItem
            type="more"
            active={"more" === activeType}
            setActiveType={setActiveType}
            postCount={1520}
            resetAll={resetAll}
          />
        </div>
        <div className="w-full text-white my-2 h-[calc(100%-65px)] ">
          <ScrollArea className="h-full w-full">
            <div className="relative w-full h-full flex flex-col gap-0 p-2">
              {reactionData.length > 0 &&
                reactionData.map((item: IReactionDoc, index: number) => (
                  <React.Fragment key={index}>
                    {reactionData.length === index + 1 ? (
                      <SingleReactionData
                        key={index}
                        reaction={item}
                        active={false}
                        ref={lastElementRef}
                      />
                    ) : (
                      <SingleReactionData
                        key={index}
                        reaction={item}
                        active={false}
                      />
                    )}
                  </React.Fragment>
                ))}
              {activeType === "more" && (
                <div className="w-[200px] h-[200px] bg-rose-400 absolute top-10 right-24">
                  ddddd
                </div>
              )}

              {loading && (
                <p className="w-full text-center text-[18px] pb-4">
                  Loading...
                </p>
              )}
            </div>
            {activeType === "more" && (
              <div className="w-[200px] bg-[#292932] absolute top-0 right-24 rounded-lg">
                {filersReactions.slice(3, 7).map((item, index) => (
                  <div
                    className="flex items-center justify-between gap-1 py-3 w-[60%] mx-auto"
                    key={index}
                    onClick={() => setActiveType(item[0] as OnlyReactionName)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={ReactionIconMap[item[0] as OnlyReactionName]}
                        alt={item[0]}
                        className="w-6 h-6"
                      />
                      <span
                        style={{
                          color: reactionColorMap[item[0] as OnlyReactionName],
                        }}
                      >
                        {item[1]}
                      </span>
                    </div>
                    {item[0] === activeType && <Check className="w-5" />}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ReactionModel;
