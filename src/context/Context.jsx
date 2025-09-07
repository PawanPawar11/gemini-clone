"use client";

import { createContext, useState, useRef } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animationRef = useRef(null);
  const stopGenerationRef = useRef(false);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setIsGenerating(false);
    stopGenerationRef.current = false;
  };

  const stopGeneration = () => {
    stopGenerationRef.current = true;
    setIsGenerating(false);
    setLoading(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setIsGenerating(true);
    stopGenerationRef.current = false;
    
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    if (stopGenerationRef.current) {
      return;
    }

    setLoading(false);

    // Animate by characters instead of words to preserve Markdown formatting
    let index = 0;
    const animateText = () => {
      if (stopGenerationRef.current) {
        setIsGenerating(false);
        return;
      }
      
      if (index < response.length) {
        setResultData(response.slice(0, index + 1));
        index++;
        animationRef.current = setTimeout(animateText, 20); // Faster animation (20ms per character)
      } else {
        setIsGenerating(false);
      }
    };
    animateText();
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    isGenerating,
    stopGeneration,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;