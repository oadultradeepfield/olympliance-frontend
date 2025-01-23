import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";
import { Components } from "react-markdown";
import { Link } from "react-router-dom";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface MarkdownProps {
  content: string;
  className?: string;
}

interface CustomComponentProps {
  children?: React.ReactNode;
  node?: any;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({
  content,
  className,
}) => {
  const processText = (text: string) => {
    const usernameRegex = /@[a-zA-Z0-9_-]+/g;

    const parts = text.split(usernameRegex);
    const matches = text.match(usernameRegex) || [];

    return parts.reduce((acc: React.ReactNode[], part, i) => {
      acc.push(part);
      if (i < matches.length) {
        acc.push(
          <Link to={`/user/${matches[i].slice(1)}`}>
            <span key={i} className="link link-secondary">
              {matches[i]}
            </span>
          </Link>,
        );
      }
      return acc;
    }, []);
  };

  const components: Components = {
    p: ({ children }: CustomComponentProps) => {
      if (typeof children === "string") {
        return <p className="my-2">{processText(children)}</p>;
      }
      return <p className="my-2">{children}</p>;
    },

    li: ({ children }: CustomComponentProps) => {
      if (typeof children === "string") {
        return <li className="my-1">{processText(children)}</li>;
      }
      return <li className="my-1">{children}</li>;
    },

    strong: ({ children }: CustomComponentProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: CustomComponentProps) => (
      <em className="italic">{children}</em>
    ),
    u: ({ children }: CustomComponentProps) => (
      <u className="underline">{children}</u>
    ),

    code: ({ children, className }: CustomComponentProps) => {
      const [isCopied, setIsCopied] = useState(false);

      if (!className) {
        return (
          <span className="rounded bg-base-300/75 p-1 font-mono">
            {children}
          </span>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      };

      return (
        <div className="group relative">
          <SyntaxHighlighter
            style={oneDark}
            language={language || "text"}
            PreTag="div"
            className="rounded-lg text-base"
            customStyle={{
              margin: "1rem 0",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded bg-gray-600 px-2 py-1 text-sm text-white transition-all duration-150 ease-in-out hover:bg-gray-500"
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <DocumentDuplicateIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      );
    },

    h1: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),
    h2: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),
    h3: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),
    h4: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),
    h5: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),
    h6: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">
        {processText(String(children))}
      </span>
    ),

    blockquote: ({ children }: CustomComponentProps) => (
      <span className="my-2 block">{children}</span>
    ),

    ul: ({ children }: CustomComponentProps) => (
      <ul className="my-2 list-disc pl-6">{children}</ul>
    ),
    ol: ({ children }: CustomComponentProps) => (
      <ol className="my-2 list-decimal pl-6">{children}</ol>
    ),
  };

  return (
    <div className={className}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
