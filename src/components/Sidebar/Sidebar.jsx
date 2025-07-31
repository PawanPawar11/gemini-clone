"use client";

import { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";
import {
  Menu,
  Plus,
  MessageSquare,
  HelpCircle,
  History,
  Settings,
} from "lucide-react";

function Sidebar() {
  const [extended, setExtended] = useState(true); // Default to expanded on desktop
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const menuItems = [
    { icon: HelpCircle, label: "Help" },
    { icon: History, label: "History" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className={`sidebar ${extended ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <button
          className="menu-button"
          onClick={() => setExtended((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>

        <button className="new-chat-button" onClick={() => newChat()}>
          <Plus size={16} />
          {extended && <span>New Chat</span>}
        </button>
      </div>

      <div className="sidebar-content">
        {extended && (
          <div className="recent-section">
            <h3 className="section-title">Recent</h3>
            <div className="recent-list">
              {prevPrompts.length > 0 ? (
                prevPrompts.map((item, index) => (
                  <button
                    key={index}
                    className="recent-item"
                    onClick={() => loadPrompt(item)}
                    title={item}
                  >
                    <MessageSquare size={14} />
                    <span>
                      {item.length > 35 ? `${item.slice(0, 35)}...` : item}
                    </span>
                  </button>
                ))
              ) : (
                <div className="empty-state">
                  <p>No recent conversations</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button key={index} className="menu-item">
              <IconComponent size={14} />
              {extended && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
