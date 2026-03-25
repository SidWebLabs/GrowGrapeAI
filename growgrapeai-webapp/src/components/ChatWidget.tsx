import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Sparkles } from "lucide-react";
import Chatbot from "./Chatbot";
import { cn } from "@/lib/utils";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBubbleDismissed(false);
  };

  // When user clicks × on bubble, hide it but bring it back after 8 seconds
  const handleDismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubbleDismissed(true);
    setTimeout(() => setBubbleDismissed(false), 8000);
  };

  return (
    <>
      {/* Speech bubble prompt — shown whenever chat is closed and not manually dismissed */}
      {!open && !bubbleDismissed && (
        <div
          className="fixed bottom-[88px] right-6 z-40 cursor-pointer animate-fade-in-up"
          style={{ animationDuration: "0.35s" }}
          onClick={handleOpen}
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-lg px-4 py-3 max-w-[210px]">
            <p className="text-sm font-semibold text-foreground leading-snug">
              🍇 Got grape questions?
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Ask me about pests, diseases, or farming tips!
            </p>

            {/* Bubble tail pointing toward the button (bottom-right) */}
            <svg
              className="absolute -bottom-[10px] right-4 text-card"
              width="20"
              height="10"
              viewBox="0 0 20 10"
              fill="none"
            >
              <path
                d="M0 0 L10 10 L20 0"
                fill="currentColor"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* White fill to cover border */}
              <path d="M1 0 L10 9 L19 0" fill="currentColor" />
            </svg>

            {/* Dismiss × */}
            <button
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleDismissBubble}
              aria-label="Dismiss"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating chat button — always pulsing when closed to attract attention */}
      <button
        onClick={handleOpen}
        aria-label="Open chat"
        className={cn(
          "fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center",
          "bg-primary text-primary-foreground hover:scale-110 hover:shadow-2xl active:scale-95",
          open && "scale-0 opacity-0 pointer-events-none",
        )}
      >
        {/* Continuous pulse ring to attract user */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
        <MessageCircle className="h-6 w-6 relative z-10" />
      </button>

      {/* Chat window — fully rounded */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden border bg-card shadow-2xl",
          "rounded-3xl",
          "w-[370px] lg:w-[400px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-6rem)]",
          "transition-all duration-300 origin-bottom-right",
          open
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none"> Dr. DRS</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                Online · AI-Powered Crop Doctor for Grapes
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close chat"
            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <Chatbot compact />
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
