'use client';

import { useState, useEffect, useRef } from 'react';
import { InterviewState, InterviewPhase, StartSessionResponse } from '@/types';
import { ProgressBar } from './ProgressBar';
import { ToolsPanel } from './ToolsPanel';
import { DataWorkspace } from './DataWorkspace';
import { AvatarPanel } from './AvatarPanel';
import { CompactChat } from './CompactChat';

interface WorkspaceLayoutProps {
  sessionData: StartSessionResponse;
  state: InterviewState;
  onEndSession: () => void;
  onSendMessage: (content: string) => void;
  onPushToTalkStart: () => void;
  onPushToTalkStop: () => void;
  pushToTalkEnabled?: boolean;
}

const DEFAULT_INTERVIEW_DURATION = 20 * 60;

export function WorkspaceLayout({
  sessionData,
  state,
  onEndSession,
  onSendMessage,
  onPushToTalkStart,
  onPushToTalkStop,
  pushToTalkEnabled = true,
}: WorkspaceLayoutProps) {
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_INTERVIEW_DURATION);
  const [activeTool, setActiveTool] = useState<string | null>('sql');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const interviewerName = 'Sarah';

  useEffect(() => {
    if (state.phase !== InterviewPhase.IDLE && state.phase !== InterviewPhase.COMPLETED) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.phase]);

  useEffect(() => {
    if (state.phase === InterviewPhase.COMPLETED && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [state.phase]);

  const controlsDisabled =
    state.phase === InterviewPhase.EVALUATION ||
    state.phase === InterviewPhase.COMPLETED;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="workspace-layout">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <img src="/rizma-logo.png" alt="Rizma" className="logo" />
          <ProgressBar currentPhase={state.phase} />
        </div>
        <div className="header-center">
          <span className="timer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="header-right">
          <span className={`connection-status ${state.isConnected ? 'connected' : ''}`}>
            <span className="status-dot" />
            {state.isConnected ? 'Connected' : 'Connecting...'}
          </span>
          <button className="settings-btn" title="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <button className="end-btn" onClick={onEndSession}>
            End Session
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Left: Data Workspace */}
        <section className="workspace-section">
          <DataWorkspace
            onQueryExecute={(query) => {
              console.log('Query executed:', query);
            }}
          />
        </section>

        {/* Right: Assistant Panel */}
        <aside className="assistant-panel">
          <div className="tools-section">
            <ToolsPanel
              activeTool={activeTool}
              onToolSelect={setActiveTool}
            />
          </div>

          <div className="avatar-section">
            <AvatarPanel
              heygenToken={sessionData.heygenToken}
              avatarId={sessionData.avatarId}
              interviewerName={interviewerName}
              isMicActive={state.isPushToTalkActive}
              onMicStart={onPushToTalkStart}
              onMicStop={onPushToTalkStop}
              pushToTalkEnabled={pushToTalkEnabled}
              onUserTranscript={(text) => {
                console.log('User transcript:', text);
                onSendMessage(text);
              }}
              controlsDisabled={controlsDisabled}
            />
          </div>

          <div className="chat-section">
            <CompactChat
              interviewerName={interviewerName}
              messages={state.transcript}
              onSendMessage={onSendMessage}
              currentPhase={state.phase}
            />
          </div>
        </aside>
      </main>

      {/* Results Overlay */}
      {state.phase === InterviewPhase.COMPLETED && state.evaluationScore !== null && (
        <div className="results-overlay">
          <div className="results-card">
            <h2>Session Complete</h2>
            <div className={`score ${state.passed ? 'passed' : 'failed'}`}>
              {state.evaluationScore}
            </div>
            <p className="result-text">
              {state.passed
                ? 'Great work! You passed the assessment.'
                : 'Score below passing threshold of 80.'}
            </p>
            <button onClick={onEndSession}>Start New Session</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .workspace-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--bg-primary);
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          gap: 20px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }
        .logo {
          width: 32px;
          height: 32px;
          border-radius: 6px;
        }
        .header-center {
          display: flex;
          justify-content: center;
        }
        .timer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          font-family: monospace;
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          justify-content: flex-end;
        }
        .connection-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
        }
        .connection-status.connected .status-dot {
          background: var(--success);
        }
        .connection-status.connected {
          color: var(--success);
        }
        .settings-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .settings-btn:hover {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        .end-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--error);
          border-radius: 6px;
          color: var(--error);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .end-btn:hover {
          background: var(--error);
          color: white;
        }

        /* Main Content */
        .main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 16px;
          padding: 16px;
          overflow: hidden;
        }

        /* Workspace Section */
        .workspace-section {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        /* Assistant Panel */
        .assistant-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
        }
        .tools-section {
          flex-shrink: 0;
        }
        .avatar-section {
          flex-shrink: 0;
        }
        .chat-section {
          flex: 1;
          min-height: 200px;
          display: flex;
          flex-direction: column;
        }

        /* Results Overlay */
        .results-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .results-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          max-width: 400px;
        }
        .results-card h2 {
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        .score {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .score.passed {
          color: var(--success);
        }
        .score.failed {
          color: var(--error);
        }
        .result-text {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .results-card button {
          padding: 0.75rem 1.5rem;
          background: var(--accent);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          transition: opacity 0.2s;
        }
        .results-card button:hover {
          opacity: 0.9;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .main {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }
          .assistant-panel {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
          }
          .tools-section {
            flex: 1;
            min-width: 200px;
          }
          .avatar-section {
            flex: 1;
            min-width: 200px;
          }
          .chat-section {
            flex: 2;
            min-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .header {
            flex-wrap: wrap;
            gap: 12px;
          }
          .header-left {
            order: 1;
            flex: 1;
          }
          .header-center {
            order: 3;
            flex-basis: 100%;
          }
          .header-right {
            order: 2;
          }
          .main {
            padding: 12px;
            gap: 12px;
          }
          .assistant-panel {
            flex-direction: column;
          }
          .chat-section {
            min-height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
