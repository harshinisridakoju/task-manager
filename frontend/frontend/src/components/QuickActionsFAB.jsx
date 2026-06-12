import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./quickactions.css";

export default function QuickActionsFAB({ onAction }) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: "📝", label: "New Task", action: "new-task" },
    { icon: "📅", label: "New Event", action: "new-event" },
    { icon: "🎯", label: "Set Goal", action: "set-goal" },
    { icon: "📊", label: "Analytics", action: "analytics" },
    { icon: "⚙️", label: "Settings", action: "settings" },
  ];

  return (
    <div className="quick-actions-fab">
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fab-menu" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {actions.map((action, idx) => (
              <motion.button
                key={action.action}
                className="fab-item"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: Math.cos((idx / actions.length) * 2 * Math.PI) * 80,
                  y: Math.sin((idx / actions.length) * 2 * Math.PI) * 80
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  onAction?.(action.action);
                  setIsOpen(false);
                }}
                title={action.label}
              >
                <span>{action.icon}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fab-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        ➕
      </motion.button>
    </div>
  );
}
