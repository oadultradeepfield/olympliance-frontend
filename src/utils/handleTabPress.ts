type HandleTabPress = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setContent: React.Dispatch<React.SetStateAction<any>>,
) => void;

export const createTabKeyHandler = (
  setContent: React.Dispatch<React.SetStateAction<string>>,
): HandleTabPress => {
  return (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const spaces = "    ";

      setContent(
        value.substring(0, selectionStart) +
          spaces +
          value.substring(selectionEnd),
      );

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          selectionStart + spaces.length;
        textarea.focus();
      }, 0);
    }
  };
};
