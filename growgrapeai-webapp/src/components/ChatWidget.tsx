import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "./Chatbot";
import { cn } from "@/lib/utils";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-105",
          open && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Small chat window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-xl border bg-card shadow-xl transition-all duration-200",
          "w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)]",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
          <span className="text-sm font-medium">GrowGrape AI</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <Chatbot compact />
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
