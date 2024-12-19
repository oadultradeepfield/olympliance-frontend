interface MessageDisplayProps {
  message: string;
  type: "error" | "success";
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  type,
}) => {
  return (
    <div className={`mt-4 text-center text-sm text-${type}`}>
      {type === "error" ? `Error: ${message}` : message}
    </div>
  );
};
