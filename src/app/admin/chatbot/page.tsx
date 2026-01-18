'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Interface for Chatbot Rule
interface ChatbotRule {
    id: number | string;
    question: string;
    answer: string;
}

const ChatbotIndex = () => {
    const [rules, setRules] = useState<ChatbotRule[]>([]);
    const [loading, setLoading] = useState(true);

    const loadRules = () => {
        // setLoading(true); // Removed to avoid synchronous update in effect
        axios.get('/api/admin/chatbot')
            .then(res => {
                setRules(res.data.responses);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadRules();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Delete this rule?')) {
            setLoading(true); // Set loading state here manually for deletion
            axios.delete(`/api/admin/chatbot/${id}`)
                .then(() => {
                    loadRules();
                })
                .catch(() => {
                    alert('Error deleting rule');
                    setLoading(false);
                });
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                <h2 className="fw-bold m-0">Chatbot Rules</h2>
                <Link href="/admin/chatbot/create" className="btn btn-primary shadow-sm">
                    <i className="bi bi-plus-lg me-2"></i>Add Rule
                </Link>
            </div>

            <div className="glass-card shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle text-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Trigger Question / Keyword</th>
                                <th>Bot Response</th>
                                <th style={{ width: '120px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent border-0">
                            {rules.map((rule) => (
                                <tr key={rule.id.toString()} className="border-bottom border-secondary border-opacity-25">
                                    <td className="text-white fw-bold">{rule.question}</td>
                                    <td className="text-white opacity-75">{rule.answer}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link href={`/admin/chatbot/edit/${rule.id}`} className="btn btn-outline-info btn-sm rounded-circle p-2">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(rule.id.toString())}
                                                className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rules.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-5 text-muted">No chatbot rules found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ChatbotIndex;
