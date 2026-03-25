import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Send, Bot, User, Loader2, ImagePlus, Leaf, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface ChatbotProps {
  compact?: boolean;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL?.replace("/chat", "")
  ?? "http://localhost:3001/api";

// ── Simple markdown renderer ─────────────────────────────────────────────────
// Handles: **bold**, *italic*, line breaks, and strips stray leading " — " dashes.
const MarkdownText = ({ content }: { content: string }) => {
  // Remove leading " — " or "— " at the very start of the string or after a newline
  const cleaned = content.replace(/(^|\n)\s*—\s*/g, "$1");

  // Split into lines, then parse inline markdown per line
  const lines = cleaned.split("\n");

  return (
    <span className="space-y-1 block">
      {lines.map((line, li) => {
        // Parse **bold** and *italic* inline
        const parts: React.ReactNode[] = [];
        // Regex: **bold** or *italic*
        const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
        let last = 0;
        let match;

        while ((match = regex.exec(line)) !== null) {
          // Text before match
          if (match.index > last) {
            parts.push(line.slice(last, match.index));
          }
          if (match[0].startsWith("**")) {
            parts.push(<strong key={`${li}-${match.index}`} className="font-semibold">{match[2]}</strong>);
          } else {
            parts.push(<em key={`${li}-${match.index}`}>{match[3]}</em>);
          }
          last = match.index + match[0].length;
        }
        // Remaining text
        if (last < line.length) parts.push(line.slice(last));

        return (
          <span key={li} className="block leading-relaxed">
            {parts.length > 0 ? parts : "\u00A0" /* preserve blank lines */}
          </span>
        );
      })}
    </span>
  );
};

const Chatbot = ({ compact }: ChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Hello 👋, I am **Dr.DRS**, your AI-powered viticulture expert. From pest and disease diagnosis to nutrition and crop management, I’m here to help you grow healthier vines and achieve better yields. Ask me anything about your grape farm!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("image/jpeg");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showAnalysisChoice, setShowAnalysisChoice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showAnalysisChoice]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setSelectedMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setSelectedImage(result.split(",")[1]);
      setShowAnalysisChoice(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setShowAnalysisChoice(false);
  };

  const sendImageAnalysis = async (analysisType: "disease" | "pesticide") => {
    if (!selectedImage) return;
    setShowAnalysisChoice(false);
    setIsLoading(true);

    const label = analysisType === "disease" ? "🌿 Disease Analysis" : "🧪 Pesticide Analysis";
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: `Please analyze this image for ${analysisType === "disease" ? "grape diseases or pests" : "pesticide information"}.`,
      image: imagePreview ?? undefined,
    };
    setMessages((prev) => [...prev, userMessage]);

    const imageToSend = selectedImage;
    const mimeToSend = selectedMimeType;
    clearImage();

    try {
      const res = await fetch(`${BACKEND_URL}/analyze-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageToSend, mimeType: mimeToSend, analysisType }),
      });
      const data = await res.json();
      if (!data.valid) {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: data.message ?? "Please upload a grape-related image only." }]);
        return;
      }
      const detected = data.detected ? `**${label}** — Detected: *${data.detected}*\n\n` : `**${label}**\n\n`;
      const severity = data.severity ? `Severity: ${data.severity}\n\n` : "";
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: `${detected}${severity}${data.message}` }]);
    } catch {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "Sorry, image analysis failed. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch(import.meta.env.VITE_BACKEND_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const raw = await res.text();
      let data: { message?: string; error?: string };
      try { data = raw ? JSON.parse(raw) : {}; } catch { throw new Error("Server returned invalid response."); }
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: data.message ?? "No response." }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: `Sorry, something went wrong: ${message}.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const content = (
    <>
      {!compact && (
        <CardHeader className="border-b py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">GrowGrape AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Ask about viticulture, pests, diseases, or upload an image</p>
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className={cn("flex flex-col flex-1 min-h-0", compact && "p-0")}>
        <ScrollArea className={cn("flex-1", compact ? "px-2" : "px-4")}>
          <div className={cn("space-y-4", compact ? "py-2" : "py-4")}>
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="rounded-full bg-primary/10 p-1.5 shrink-0 h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[85%] rounded-lg px-4 py-2.5 text-sm space-y-2",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="rounded-md max-h-40 object-cover w-full" />
                  )}
                  {/* Use MarkdownText for assistant, plain for user */}
                  {msg.role === "assistant"
                    ? <MarkdownText content={msg.content} />
                    : <p className="whitespace-pre-wrap">{msg.content}</p>
                  }
                </div>
                {msg.role === "user" && (
                  <div className="rounded-full bg-primary p-1.5 shrink-0 h-8 w-8 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {showAnalysisChoice && imagePreview && !isLoading && (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 justify-start">
                  <div className="rounded-full bg-primary/10 p-1.5 shrink-0 h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3 space-y-3 max-w-[85%]">
                    <img src={imagePreview} alt="Preview" className="rounded-md max-h-36 object-cover w-full" />
                    <p className="text-sm font-medium">What would you like to analyze?</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 gap-1.5" onClick={() => sendImageAnalysis("disease")}>
                        <Leaf className="h-4 w-4 text-green-600" />Disease
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-1.5" onClick={() => sendImageAnalysis("pesticide")}>
                        <FlaskConical className="h-4 w-4 text-blue-600" />Pest
                      </Button>
                    </div>
                    <button onClick={clearImage} className="text-xs text-muted-foreground underline w-full text-center">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex gap-2">
                <div className="rounded-full bg-primary/10 p-1.5 shrink-0 h-8 w-8 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg px-4 py-2.5 bg-muted flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className={cn("border-t flex gap-2 items-end", compact ? "p-2" : "p-4")}>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          <Button
            variant="outline" size="icon" className="h-11 w-11 shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || showAnalysisChoice}
            title="Upload grape image for analysis"
          >
            <ImagePlus className="h-5 w-5" />
          </Button>
          <Textarea
            placeholder="Ask about grape farming, pests, diseases..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] overflow-hidden resize-none"
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon" className="h-11 w-11 shrink-0">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </>
  );

  if (compact) return <div className="flex flex-col flex-1 min-h-0">{content}</div>;
  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px] border-primary/20 bg-card/95">
      {content}
    </Card>
  );
};

export default Chatbot;