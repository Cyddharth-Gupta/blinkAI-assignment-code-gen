"use client";

import { useState, useRef } from "react";

import ChatInput from "@/components/chat-input";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy } from "lucide-react";
import { Button } from "./ui/button";

type ChatContentProps = {
  content?: string;
  session: any;
};

export default function ChatContent() {
  const [assisnantResponse, setAssistantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleSubmit = async (value: string, file?: File) => {
    setIsLoading(true);
    setAssistantResponse("");

    let body = "";
    
      body = JSON.stringify({ question: value });

    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch("http://localhost:8000/api/v1/codegen/generate-code", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }

      const reader = res.body.getReader();

      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();

        const text = decoder.decode(value);

        setAssistantResponse((currentValue) => currentValue + text);

        if (done) {
          break;
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
      }
    }
    abortControllerRef.current = null;
    setIsLoading(false);
  };

  const handleStop = () => {
    if (!abortControllerRef.current) {
      return;
    }
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  };
  const copyMarkdownToClipboard = () => {
    try {
      navigator.clipboard.writeText(assisnantResponse);
    } catch (error) {
      console.error("Failed to copy content: ", error);
    }
  };
  const handleCopyClick = async () => {
    await copyMarkdownToClipboard();
    setCopyButtonText("Copied...");
    setTimeout(() => setCopyButtonText("Copy"), 1000);
  };
  
  
  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-4xl w-full max-h-[70vh] mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-scroll custom-scrollbar prose dark:prose-invert">
        {(assisnantResponse) && (
          <div className="flex justify-end">
            <Button onClick={handleCopyClick}>
              <Copy size={24} />
              <span className="ml-2">{copyButtonText}</span>
            </Button>
          </div>
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  <div className="overflow-y-auto">{children}</div>
                </code>
              );
            },
          }}
        >
          {assisnantResponse }
        </Markdown>
        {!assisnantResponse && !false && (
          <div className="text-center text-gray-400 flex flex-col gap-4">
            <span>Ask me anything related to Code-gen! 🚀 </span>
            <span>Enjoy the experience! 🎉</span>
          </div>
        )}
      </div>
      <ChatInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />

<div data-pym-src="https://www.jdoodle.com/embed/v1/bfc7bb21de838428">
          </div>
        <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript"> </script>
    </div>
  );
}