"use client";

import { MessageCircle, RotateCcw, SendHorizontal, X } from "lucide-react";
import { Maximize2, Minimize2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

type StreamEvent = {
  type?: string;
  content?: string;
};

const CHAT_STORAGE_KEY = "abu_chat_id";
const CHAT_MESSAGES_STORAGE_KEY = "abu_chat_messages";
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT ?? "";

const getWelcomeMessage = (locale: string) => {
  const normalizedLocale = locale.toLowerCase();

  if (normalizedLocale === "kk" || normalizedLocale === "kz") {
    return "Сәлеметсіз бе! Сұрағыңызды жазыңыз, мен сізге қабылдау бойынша көмектесемін.";
  }

  if (normalizedLocale === "en") {
    return "Hello! Write your question and I will help you with the admission process.";
  }

  return "Здравствуйте! Напишите ваш вопрос, и я помогу вам по вопросам поступления.";
};

const getChatSubtitle = (locale: string) => {
  const normalizedLocale = locale.toLowerCase();

  if (normalizedLocale === "kk" || normalizedLocale === "kz") {
    return "Қабылдау мәселелері бойынша онлайн-кеңесші";
  }

  if (normalizedLocale === "en") {
    return "Online admission consultant";
  }

  return "Онлайн-консультант по вопросам поступления";
};

const createChatId = () => {
  return Math.floor(Date.now() * 1000 + Math.random() * 1000).toString();
};

const parseStreamLine = (line: string): StreamEvent | null => {
  const normalized = line.trim();
  if (!normalized) {
    return null;
  }

  const jsonPayload = normalized.startsWith("data:")
    ? normalized.slice(5).trim()
    : normalized;

  if (!jsonPayload || jsonPayload === "[DONE]") {
    return null;
  }

  try {
    return JSON.parse(jsonPayload) as StreamEvent;
  } catch {
    return null;
  }
};

export const ChatWidget = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const isAdminRoute = useMemo(() => {
    if (!pathname) {
      return false;
    }

    return /\/admin(?:\/|$)/.test(pathname);
  }, [pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldRenderChat, setShouldRenderChat] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeAnimationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeAnimationTimeoutRef.current) {
        window.clearTimeout(closeAnimationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (closeAnimationTimeoutRef.current) {
      window.clearTimeout(closeAnimationTimeoutRef.current);
    }

    if (isOpen) {
      setShouldRenderChat(true);
      return;
    }

    closeAnimationTimeoutRef.current = window.setTimeout(() => {
      setShouldRenderChat(false);
      closeAnimationTimeoutRef.current = null;
    }, 300);
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedId = window.localStorage.getItem(CHAT_STORAGE_KEY);
    const nextId = storedId || createChatId();

    if (!storedId) {
      window.localStorage.setItem(CHAT_STORAGE_KEY, nextId);
    }

    const storedMessages = window.localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(
            parsed
              .filter(
                (item): item is ChatMessage =>
                  Boolean(item) &&
                  (item.role === "user" || item.role === "assistant") &&
                  typeof item.content === "string",
              )
              .map((item) => ({ ...item, isStreaming: false })),
          );
        }
      } catch {
        window.localStorage.removeItem(CHAT_MESSAGES_STORAGE_KEY);
      }
    }

    setChatId(nextId);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (messages.length === 0) {
      window.localStorage.removeItem(CHAT_MESSAGES_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [isHydrated, messages]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading || !chatId || !CHAT_ENDPOINT) {
      return;
    }

    const assistantId = `assistant-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: Number(chatId),
          message: trimmed,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      let streamFinished = false;
      while (!streamFinished) {
        const { value, done } = await reader.read();
        if (done) {
          streamFinished = true;
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const rawLine of lines) {
          const event = parseStreamLine(rawLine);
          if (!event || event.type !== "item" || !event.content) {
            continue;
          }

          setMessages((prev) =>
            prev.map((item) =>
              item.id === assistantId
                ? { ...item, content: item.content + event.content }
                : item,
            ),
          );
        }
      }

      const trailingEvent = parseStreamLine(buffer);
      if (trailingEvent?.type === "item" && trailingEvent.content) {
        setMessages((prev) =>
          prev.map((item) =>
            item.id === assistantId
              ? { ...item, content: item.content + trailingEvent.content }
              : item,
          ),
        );
      }

      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantId ? { ...item, isStreaming: false } : item,
        ),
      );
    } catch {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                content:
                  item.content ||
                  "Сервис временно недоступен. Попробуйте отправить сообщение позже.",
                isStreaming: false,
              }
            : item,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    const freshChatId = createChatId();
    setChatId(freshChatId);
    window.localStorage.setItem(CHAT_STORAGE_KEY, freshChatId);

    setMessages([]);
    window.localStorage.removeItem(CHAT_MESSAGES_STORAGE_KEY);

    setMessage("");
    setIsLoading(false);
  };

  const handleCloseChat = () => {
    setIsExpanded(false);
    setIsOpen(false);
  };

  const toggleChatVisibility = () => {
    if (isOpen) {
      handleCloseChat();
      return;
    }

    setIsOpen(true);
  };

  if (isAdminRoute) {
    return null;
  }

  const isCenteredLayout = isExpanded && shouldRenderChat;

  return (
    <div
      className={
        isCenteredLayout
          ? "chat-widget-no-focus fixed inset-0 z-[9999] flex items-center justify-center p-6"
          : "chat-widget-no-focus fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4"
      }
    >
      {isCenteredLayout ? (
        <div
          className={`absolute inset-0 bg-black/25 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {shouldRenderChat ? (
        <div
          className={`relative transition-all duration-300 ease-out ${
            isExpanded
              ? "h-[80vh] w-[min(90vw,900px)] md:w-[min(50vw,900px)]"
              : "h-[560px] w-[340px]"
          } ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0"
          }`}
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#e8ded7] bg-white shadow-2xl">
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundColor: "var(--abu-primary)" }}
          >
            <div>
              <p className="text-lg font-semibold leading-none">ABU AI CHAT</p>
              <p className="mt-1 text-xs text-[#f7ebe5]">
                {getChatSubtitle(locale)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20 focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 md:flex"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-label={isExpanded ? "Свернуть чат" : "Развернуть чат"}
                title={isExpanded ? "Свернуть чат" : "Развернуть чат"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20 focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0"
                onClick={resetChat}
                aria-label="Очистить чат"
                title="Начать новый чат"
              >
                <RotateCcw size={18} />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20 focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0"
                onClick={handleCloseChat}
                aria-label="Закрыть чат"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="mr-auto max-w-[85%] rounded-2xl border border-[#eadfd8] bg-[#faf6f3] px-3 py-2 text-sm leading-6 text-[#3d312c]">
                {getWelcomeMessage(locale)}
              </div>
            ) : null}

            {messages.map((item) => {
              const isUser = item.role === "user";
              return (
                <div
                  key={item.id}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    isUser
                      ? "ml-auto text-white"
                      : "mr-auto border border-[#eadfd8] bg-[#faf6f3] text-[#3d312c]"
                  }`}
                  style={
                    isUser
                      ? { backgroundColor: "var(--abu-primary)" }
                      : undefined
                  }
                >
                  {item.content}
                  {item.isStreaming && (
                    <span className="ml-1 inline-block animate-pulse align-middle">
                      |
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#eadfd8] p-3">
            <div className="flex items-center gap-2 rounded-full border border-[#e2d5ce] bg-[#fcfbfa] px-3 py-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                className="h-6 flex-1 bg-transparent text-sm text-[#2d2623] outline-none placeholder:text-[#b2a39b] focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0"
                placeholder="Введите сообщение..."
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={!message.trim() || isLoading}
                className="rounded-full p-1 text-[#7a5b4e] transition hover:bg-[#f0e7e2] focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Отправить сообщение"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggleChatVisibility}
        className={`relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 ${
          isOpen || shouldRenderChat ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        <span className="absolute inset-0 rounded-full bg-abu_primary" />
        <MessageCircle size={24} className="relative z-10" />
      </button>
    </div>
  );
};
