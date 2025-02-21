import MessangerLinkPreview from "@/components/link/MessangerLinkPreview";
import { cn } from "@/lib/utils";
import { extractLinks } from "@/services/genaral/messageUtils";
import React from "react";

interface Props {
  text: string;
  wonMessage: boolean;
}

const MessagePreview: React.FC<Props> = ({ text, wonMessage }) => {
  const extractText = extractLinks(text);
  return (
    <div
      className={cn("rounded-lg", wonMessage ? "bg-[#0084ff]" : "bg-[#292932]")}
    >
      <p
        dangerouslySetInnerHTML={{ __html: extractText.originalString }}
        className="px-4 py-2 flex flex-wrap"
      />
      {extractText.links.length > 0 ? (
        <MessangerLinkPreview url={extractText.links[0]} />
      ) : null}

    </div>
  );
};

export default MessagePreview;
