import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_KEY } from "../utils/constants";

const ChatApp = ({ onSendMessage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm your assistant. How can I help you today?",
        sender: "Bot",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      text: newMessage,
      sender: "User",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setLoading(true);

    if (onSendMessage) onSendMessage(userMessage);

    try {
      const response = await fetch(API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userMessage.text }] }],
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process your request. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          text: aiResponse,
          sender: "Bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "An error occurred. Please try again.",
          sender: "Bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 z-0 opacity-15">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl animate-spin-slow-reverse"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "User" ? "justify-end" : "justify-start"
            } group`}
          >
            <div
              className={`relative max-w-[85%] rounded-3xl p-5 transition-all duration-300 ${
                msg.sender === "User"
                  ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow-xl hover:shadow-2xl"
                  : "bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl border border-white/20"
              }`}
            >
              <p className="text-base leading-relaxed font-medium tracking-wide">
                {msg.text}
              </p>
              <div
                className={`mt-3 text-xs flex items-center gap-2 ${
                  msg.sender === "User" ? "text-purple-100" : "text-gray-500"
                }`}
              >
                <span className="opacity-70">{msg.timestamp}</span>
                <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                <span className="font-medium opacity-90">{msg.sender}</span>
              </div>

              {msg.sender === "User" && (
                <div className="absolute -bottom-4 right-0 w-8 h-8 bg-purple-600/20 backdrop-blur-sm rounded-full transform rotate-45"></div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="max-w-[85%] bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-lg border border-white/20">
              <div className="flex space-x-3 items-center">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 p-4 bg-white/80 backdrop-blur-lg border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]  z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="w-full px-6 py-4 border-2 border-purple-100 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 placeholder-gray-400/80 bg-white/70 text-gray-700 transition-all pr-20"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-xs text-center text-gray-600/90 mt-3 px-4 flex items-center justify-center gap-2">
          <span className="inline-block transform translate-y-0.5">🌈</span>
          <span>AI-Powered Conversations • Secure & Private</span>
          <span className="inline-block transform translate-y-0.5">🚀</span>
        </p>
      </div>
    </div>
  );
};

ChatApp.propTypes = {
  onSendMessage: PropTypes.func,
};

export default ChatApp;
