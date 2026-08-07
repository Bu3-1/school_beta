import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

export function EmojiInput({ value, onChange, placeholder = "😀" }) {
  const [abierto, setAbierto] = useState(false);
  const wrapperRef = useRef(null);

  // Cierra el picker si se hace clic afuera
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="h-11 w-24 rounded-xl border border-border bg-background flex items-center justify-center text-2xl hover:border-primary/50 transition-colors"
      >
        {value || placeholder}
      </button>

      {abierto && (
        <div className="absolute z-50 mt-2">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onChange(emojiData.emoji);
              setAbierto(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
