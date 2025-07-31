"use client";

import { useContext, useState, useEffect } from "react";
import "./Main.css";
import { Context } from "../../context/Context";
import {
  Send,
  Mic,
  Paperclip,
  User,
  Bot,
  Compass,
  MessageSquare,
  Lightbulb,
  Code,
  Sun,
  Moon,
} from "lucide-react";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const suggestionCards = [
    {
      text: "Give me phrases to learn a new language",
      icon: Compass,
      category: "Language",
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: MessageSquare,
      category: "Planning",
    },
    {
      text: "Help me understand American football",
      icon: Lightbulb,
      category: "Learning",
    },
    {
      text: "Improve the readability of the following code",
      icon: Code,
      category: "Code",
    },
  ];

  return (
    <div className="main">
      <header className="nav">
        <div className="nav-content">
          <div className="brand">
            <div className="brand-mark">
              <Bot size={20} />
            </div>
            <h1>Assistant</h1>
          </div>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              <div className="toggle-track">
                <div className="toggle-thumb">
                  {theme === "light" ? <Sun size={12} /> : <Moon size={12} />}
                </div>
              </div>
            </button>
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-container">
        {!showResult ? (
          <div className="welcome-section">
            <div className="welcome-content">
              <h2 className="welcome-title">Hello, Ash</h2>
              <p className="welcome-subtitle">How can I help you today?</p>
            </div>

            <div className="suggestions-grid">
              {suggestionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={index}
                    className="suggestion-card"
                    onClick={() => {
                      setInput(card.text);
                      onSent(card.text);
                    }}
                  >
                    <div className="card-header">
                      <span className="card-category">{card.category}</span>
                      <div className="card-icon">
                        <IconComponent size={20} />
                      </div>
                    </div>
                    <p className="card-text">{card.text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="conversation-container">
            <div className="conversation">
              <div className="message-group">
                <div className="message user-message">
                  <div className="message-header">
                    <div className="message-avatar">
                      <User size={16} />
                    </div>
                    <span className="message-label">You</span>
                  </div>
                  <div className="message-content">
                    <p>{recentPrompt}</p>
                  </div>
                </div>

                <div className="message assistant-message">
                  <div className="message-header">
                    <div className="message-avatar">
                      <Bot size={16} />
                    </div>
                    <span className="message-label">Assistant</span>
                  </div>
                  <div className="message-content">
                    {loading ? (
                      <div className="loading-indicator">
                        <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="loading-text">Thinking...</span>
                      </div>
                    ) : (
                      <div
                        className="response-content"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="input-section">
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
              onKeyPress={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onSent();
                }
              }}
            />
            <div className="input-actions">
              <button className="action-button" title="Attach file">
                <Paperclip size={18} />
              </button>
              <button className="action-button" title="Voice input">
                <Mic size={18} />
              </button>
              {input.trim() && (
                <button
                  className="send-button"
                  onClick={() => onSent()}
                  title="Send"
                >
                  <Send size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="disclaimer">
          AI responses may contain inaccuracies. Please verify important
          information.
        </p>
      </footer>
    </div>
  );
}

export default Main;
