'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
        borderRadius: '20px',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
        zIndex: 10000,
    };

    return (
        <div id="chat-widget" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
            <button
                id="chat-button"
                onClick={toggleChat}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    backgroundColor: '#6f42c1'
                }}
            >
                <i className="bi bi-chat-dots-fill"></i>
            </button>

            <div id="chat-window" style={chatWindowStyle} className="chat-window-container">
                <div id="chat-header" style={{ padding: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#6f42c1' }}>
                    <span className="fw-bold">Chat with me</span>
                    <button className="btn btn-sm text-white" onClick={toggleChat}><i className="bi bi-x-lg"></i></button>
                </div>

                <div id="chat-messages" style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {messages.length === 0 ? (
                        <div className="message admin" style={{ alignSelf: 'flex-start', background: '#e9ecef', color: '#333', padding: '8px 15px', borderRadius: '15px', borderBottomLeftRadius: '2px', maxWidth: '80%' }}>
                            Hello! I am Sushma. How can I help you today?
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.is_admin ? 'admin' : 'user'}`}
                                style={msg.is_admin ? {
                                    alignSelf: 'flex-start', background: '#e9ecef', color: '#333', padding: '8px 15px', borderRadius: '15px', borderBottomLeftRadius: '2px', maxWidth: '80%'
                                } : {
                                    alignSelf: 'flex-end', background: '#6f42c1', color: 'white', padding: '8px 15px', borderRadius: '15px', borderBottomRightRadius: '2px', maxWidth: '80%'
                                }}
                            >
                                {msg.message}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div id="chat-input-area" style={{ padding: '15px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        id="chat-input"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none' }}
                    />
                    <button className="btn btn-link p-0 text-purple" onClick={sendMessage} style={{ color: '#6f42c1' }}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
