import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaMicrophone } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import products from "../../data/Products.json";

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm your personal shopping assistant. Tap the mic to speak with me!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceInputRef = useRef("");
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const speakWithBrowserTTS = (text) => {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error("Browser doesn't support speech synthesis"));
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find((voice) => voice.lang === "en-IN");
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        reject(event);
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const speakText = async (text) => {
    const cleanText = text.replace(/[^\w\s.,!?]/g, "");
    setIsSpeaking(true);

    try {
      const response = await fetch(
        "https://api.sarvam.ai/text-to-speech/stream",
        {
          method: "POST",
          headers: {
            "api-subscription-key": import.meta.env.VITE_SARVAM_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: cleanText,
            target_language_code: "en-IN",
            speaker: "simran",
            model: "bulbul:v3",
            pace: 1.1,
            speech_sample_rate: 22050,
            output_audio_codec: "mp3",
            enable_preprocessing: true,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Sarvam API error! status: ${response.status}`);
      }

      const chunks = [];
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const blob = new Blob(chunks, { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = (error) => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        speakWithBrowserTTS(cleanText).catch(() => {});
      };

      await audio.play();
    } catch (error) {
      try {
        await speakWithBrowserTTS(cleanText);
      } catch (browserError) {
        setIsSpeaking(false);
      }
    }
  };

  const handleSend = async (shouldSpeakResponse = false) => {
    const messageToSend = shouldSpeakResponse ? voiceInputRef.current : input;

    if (!messageToSend || !messageToSend.trim()) return;

    const userMessage = {
      role: "user",
      text: messageToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    voiceInputRef.current = "";
    setIsLoading(true);
    setShowTyping(true);

    const productContext = products
      .map(
        (p) =>
          `ID: ${p._id}, Name: ${p.name}, Price: ₹${p.price}, Gender: ${p.gender}, Description: ${p.description.substring(0, 150)}, Sizes: ${p.sizes.join(", ")}`,
      )
      .join("\n\n");

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You are a friendly shopping assistant for SwiftBuy. Here are ALL available products:

${productContext}

INSTRUCTIONS:
1. When users ask for products, ALWAYS suggest specific products from the list above
2. For men's products: only suggest items with "Gender: men"
3. For women's products: only suggest items with "Gender: women"
4. For price filters: only suggest items within that price range
5. Keep responses SHORT (2-3 sentences maximum)
6. Always mention product name and price
7. Be conversational and helpful

Example response: "For men, I'd recommend the Streetwear Hoodie at ₹2500. It's got great reviews and comes in multiple sizes!"

You have 12 products total. Always provide suggestions, don't say you don't have products unless truly none match.`,
              },
              ...messages
                .slice(-5)
                .map((m) => ({ role: m.role, content: m.text })),
              { role: "user", content: messageToSend },
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 200,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Empty response from API");
      }

      if (
        !data.choices ||
        !Array.isArray(data.choices) ||
        data.choices.length === 0
      ) {
        throw new Error("No choices in API response");
      }

      if (!data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("No message content in API response");
      }

      const aiResponse = data.choices[0].message.content;

      if (!aiResponse || aiResponse.trim().length === 0) {
        throw new Error("Empty response from AI");
      }

      setShowTyping(false);

      const assistantMessage = {
        role: "assistant",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (shouldSpeakResponse) {
        await speakText(aiResponse);
      }
    } catch (error) {
      setShowTyping(false);

      let errorMessage =
        "Sorry, I'm having trouble connecting. Please try again. 😅";

      if (error.message.includes("401")) {
        errorMessage = "Authentication error. Please check API key. 🔑";
      } else if (error.message.includes("429")) {
        errorMessage = "Too many requests. Please wait a moment. ⏳";
      } else if (error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your connection. 🌐";
      } else if (error.message.includes("Empty response")) {
        errorMessage = "The AI didn't respond properly. Please try again. 🤖";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: errorMessage,
          timestamp: new Date(),
        },
      ]);

      if (shouldSpeakResponse) {
        await speakText(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
      setInput("");
      voiceInputRef.current = "";
      finalTranscript = "";
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          voiceInputRef.current = finalTranscript.trim();
          setInput(voiceInputRef.current);
          recognition.stop();
        } else {
          interimTranscript += transcript;
          setInput((finalTranscript + interimTranscript).trim());
        }
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === "no-speech") {
        setInput("");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (voiceInputRef.current && voiceInputRef.current.trim()) {
        setInput(voiceInputRef.current);
        handleSend(true);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      startListening();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl bg-white shadow-2xl flex flex-col max-[425px]:left-1/2 max-[425px]:right-auto max-[425px]:-translate-x-1/2 max-[425px]:bottom-16 max-[425px]:w-[calc(100vw-2rem)]">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 bg-linear-to-r from-gray-900 to-black text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <RiRobot2Line size={20} className="text-white" />
            </div>
            {isSpeaking && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg font-orbitron">
              SwiftBuy Assistant
            </h3>
            <p className="text-xs text-gray-300 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Online • Ready to help
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        >
          <MdClose size={20} />
        </button>
      </div>

      {/* Messages - Updated with scrollbar hiding */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-linear-to-b from-gray-50 to-white"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          overflowX: "hidden" /* Hide horizontal scrollbar */,
        }}
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                message.role === "user"
                  ? "bg-linear-to-r from-gray-900 to-black text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed wrap-break-word">
                {message.text}
              </p>
              <p
                className={`text-xs mt-1 ${message.role === "user" ? "text-gray-300" : "text-gray-400"}`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {showTyping && !isSpeaking && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1.5">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full rounded-full border-2 border-gray-200 px-4 py-2.5 pr-10 text-sm focus:border-black focus:outline-none transition-all duration-200"
              disabled={isLoading || isListening}
            />
            {input && (
              <button
                onClick={() => setInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>

          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
            }`}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            <FaMicrophone size={16} />
          </button>

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim() || isListening}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md"
          >
            <IoMdSend size={18} />
          </button>
        </div>

        {isListening && (
          <div className="mt-3 flex items-center justify-center gap-2 text-center">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
              <div
                className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <p className="text-xs text-red-500 font-medium">
              Listening... (release to send)
            </p>
          </div>
        )}

        {isSpeaking && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="relative">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <p className="text-xs text-green-600 font-medium">Speaking... 🔊</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
