const extractTagsFromGitString = (gitTagArray: string[]): string[] => {
  const versions: string[] = gitTagArray.reduce((a, c) => {
    const regex: RegExp = new RegExp("(^[a-f0-9]+)\trefs/tags/(.*$)");
    const match = c.match(regex);
    if (match) {
      return [...a, match[2]];
    }
    return a;
  }, []);
  return versions;
};

export { extractTagsFromGitString };
