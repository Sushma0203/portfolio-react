'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { MessageCircle, X, Send, Minus } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');
    const chatIntervalRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => {
        if (isOpen) {
            setIsOpen(false);
            if (chatIntervalRef.current) clearInterval(chatIntervalRef.current);
        } else {
            setIsOpen(true);
            loadMessages();
            chatIntervalRef.current = setInterval(loadMessages, 5000);
        }
    };

    const loadMessages = async () => {
        try {
            const response = await axios.get('/api/public/chats');
            const newMessages = response.data;
            setMessages(newMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const msg = inputText.trim();
        setInputText('');

        try {
            await axios.post('/api/public/chats', { message: msg });
            loadMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        return () => {
            if (chatIntervalRef.current) clearInterval(chatIntervalRef.current);
        };
    }, []);

    const chatWindowStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '350px',
        height: '500px',
        backdropFilter: 'blur(15px)',
        borderRadius: '24px',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        zIndex: 10000,
        transition: 'all 0.3s ease',
    };

    return (
        <div id="chat-widget" className="fixed bottom-6 right-6 z-[9999]">
            <button
                id="chat-button"
                onClick={toggleChat}
                className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 active:scale-95"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            <div id="chat-window" style={chatWindowStyle} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10">
                <div id="chat-header" className="p-4 bg-purple-600 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="font-bold">Chat with me</span>
                    </div>
                    <button className="p-1 hover:bg-white/20 rounded-full transition-colors" onClick={toggleChat}>
                        <Minus size={20} />
                    </button>
                </div>

                <div id="chat-messages" className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                    {messages.length === 0 ? (
                        <div className="self-start bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 p-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm shadow-sm">
                            Hello! I am Sushma. How can I help you today?
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "p-3 rounded-2xl max-w-[85%] text-sm shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2",
                                    msg.is_admin
                                        ? "self-start bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                                        : "self-end bg-purple-600 text-white rounded-br-sm"
                                )}
                            >
                                {msg.message}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div id="chat-input-area" className="p-4 bg-white/50 dark:bg-black/20 border-t border-black/5 dark:border-white/10 flex gap-2">
                    <input
                        type="text"
                        id="chat-input"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors disabled:opacity-50"
                        onClick={sendMessage}
                        disabled={!inputText.trim()}
                    >
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
