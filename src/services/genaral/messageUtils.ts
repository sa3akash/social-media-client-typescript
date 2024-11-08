export const extractLinks = (
  text: string,
): {
  originalString: string;
  links: string[];
} => {
  const links: string[] = [];
  const urlRegex = /https?:\/\/[^\s]+/g;

  // Extract URLs with matchAll
  const matches = text.matchAll(urlRegex);

  // Prepare the modified string
  const modifiedString = Array.from(matches).reduce((modifiedText, match) => {
    const url = match[0];
    try {
      //   const urlObject = new URL(url);
      //   const domain = urlObject.hostname;
      links.push(url);
      // Replace the first occurrence of the URL (match.index) with the anchor tag
      return modifiedText.replace(
        url,
        `<a href="${url}" target="_blank" style="text-decoration:underline; color:#E2E2EA; font-weight:500" rel="noopener noreferrer" title="${url}">${url}</a>`,
      );
    } catch (error) {
      console.error(`Invalid URL encountered: ${url}`, error);
      return modifiedText; // Return the original text if an error occurs
    }
  }, text);

  return {
    originalString: modifiedString,
    links: links,
  };
};
