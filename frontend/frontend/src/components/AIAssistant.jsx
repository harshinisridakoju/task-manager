import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./aiassistant.css";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your productivity assistant. How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const prompts = [
    "📊 Suggest next task",
    "🎯 Quick productivity tips",
    "📈 Analyze my productivity",
    "💡 Get inspiration",
  ];

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { id: messages.length + 1, text, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "That's a great question! Here's my suggestion...",
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <>
      <motion.button
        className="ai-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="AI Assistant"
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-panel"
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ai-header">
              <h4>🤖 AI Assistant</h4>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="ai-messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  className={`message ${msg.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <div className="ai-prompts">
              {prompts.map((prompt) => (
                <motion.button
                  key={prompt}
                  className="prompt-btn"
                  onClick={() => handleSendMessage(prompt)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>

            <div className="ai-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder="Ask me anything..."
              />
              <button onClick={() => handleSendMessage(input)}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
