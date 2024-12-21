import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "katex/dist/katex.min.css";
import { Components } from "react-markdown";

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
  const components: Components = {
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
      if (!className) {
        return (
          <span className="rounded bg-base-200/50 px-1 py-0.5 font-mono">
            {children}
          </span>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return (
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
      );
    },

    h1: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),
    h2: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),
    h3: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),
    h4: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),
    h5: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),
    h6: ({ children }: CustomComponentProps) => (
      <span className="my-2 block font-bold">{children}</span>
    ),

    blockquote: ({ children }: CustomComponentProps) => (
      <span className="my-2 block">{children}</span>
    ),

    p: ({ children }: CustomComponentProps) => (
      <p className="my-2">{children}</p>
    ),

    ul: ({ children }: CustomComponentProps) => (
      <ul className="my-2 list-disc pl-6">{children}</ul>
    ),
    ol: ({ children }: CustomComponentProps) => (
      <ol className="my-2 list-decimal pl-6">{children}</ol>
    ),
    li: ({ children }: CustomComponentProps) => (
      <li className="my-1">{children}</li>
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
