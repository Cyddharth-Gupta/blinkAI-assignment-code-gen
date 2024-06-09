import ChatContent from "../components/chat-content";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="max-h-screen">
      <ChatContent />
      <div data-pym-src="https://www.jdoodle.com/embed/v1/bfc7bb21de838428"></div>
    </main>
  );
}
