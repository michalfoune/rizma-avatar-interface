'use client';

import { useEffect, useRef } from 'react';
import { TranscriptEntry, InterviewPhase } from '@/types';

interface CompactChatProps {
  interviewerName: string;
  messages: TranscriptEntry[];
  onSendMessage: (content: string) => void;
  currentPhase: InterviewPhase;
}

export function CompactChat({
  interviewerName,
  messages,
  onSendMessage,
  currentPhase,
}: CompactChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInputDisabled =
    currentPhase === InterviewPhase.EVALUATION ||
    currentPhase === InterviewPhase.COMPLETED;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input && input.value.trim()) {
      onSendMessage(input.value.trim());
      input.value = '';
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="compact-chat">
      <div className="chat-header">
        <span className="chat-title">Chat</span>
        <span className="phase-badge">{formatPhase(currentPhase)}</span>
      </div>

      <div className="messages">
        {messages.length === 0 ? (
          <div className="empty-state">Conversation will appear here...</div>
        ) : (
          messages.map((entry) => (
            <div
              key={entry.id}
              className={`message ${entry.role === 'candidate' ? 'user' : 'assistant'}`}
            >
              <div className="message-header">
                <span className="sender">
                  {entry.role === 'candidate' ? 'You' : interviewerName}
                </span>
                <span className="time">{formatTime(entry.timestamp)}</span>
              </div>
              <div className="message-content">{entry.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder={isInputDisabled ? 'Chat ended' : 'Type a message...'}
          disabled={isInputDisabled}
        />
        <button type="submit" disabled={isInputDisabled}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      <style jsx>{`
        .compact-chat {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
        }
        .chat-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .phase-badge {
          font-size: 10px;
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border-radius: 10px;
          color: var(--text-muted);
        }
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          font-size: 12px;
        }
        .message {
          max-width: 90%;
        }
        .message.user {
          align-self: flex-end;
        }
        .message.assistant {
          align-self: flex-start;
        }
        .message-header {
          display: flex;
          gap: 8px;
          align-items: baseline;
          margin-bottom: 4px;
        }
        .sender {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .time {
          font-size: 10px;
          color: var(--text-muted);
        }
        .message-content {
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.4;
        }
        .message.user .message-content {
          background: var(--chat-bubble-user);
          color: white;
          border-bottom-right-radius: 4px;
        }
        .message.assistant .message-content {
          background: var(--chat-bubble-interviewer);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }
        .input-area {
          display: flex;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid var(--border);
        }
        .input-area input {
          flex: 1;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-primary);
          font-size: 13px;
        }
        .input-area input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .input-area input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .input-area button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--accent);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .input-area button:hover:not(:disabled) {
          opacity: 0.9;
        }
        .input-area button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

function formatPhase(phase: InterviewPhase): string {
  switch (phase) {
    case InterviewPhase.IDLE:
      return 'Starting';
    case InterviewPhase.GREETING:
      return 'Intro';
    case InterviewPhase.TECHNICAL:
      return 'Technical';
    case InterviewPhase.EVALUATION:
      return 'Evaluating';
    case InterviewPhase.COMPLETED:
      return 'Done';
    default:
      return phase;
  }
}
