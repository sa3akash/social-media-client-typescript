export const extractHashTages = (
  text: string,
  baseUrl: string
): {
  originalString: string;
  hashTag: string[];
} => {
  const hashtagRegex = /#\w+/g;
  // const matche = text.match(hashtagRegex);
  // const hash = matche ? Array.from(new Set(matche)) : [];
  const hash: string[] = [];

  // Extract URLs with matchAll
  const matches = text.matchAll(hashtagRegex);

  // Prepare the modified string
  const modifiedString = Array.from(matches).reduce((modifiedText, match) => {
    const hashTag = match[0];
    try {
      hash.push(hashTag);

      return modifiedText.replace(
        hashTag,
        `<a href="${baseUrl}/${hashTag}" target="_blank" style="text-decoration:underline; color:#6ee7b7;" rel="noopener noreferrer" title="${hashTag}">${hashTag}</a>`
      );
    } catch (error) {
      return modifiedText;
    }
  }, text);

  return {
    originalString: modifiedString,
    hashTag: hash,
  };
};
