'use client';

import { AvatarView } from '@/components/Avatar';

interface AvatarPanelProps {
  heygenToken: string;
  avatarId: string;
  agentName: string;
  isMicActive: boolean;
  onMicStart: () => void;
  onMicStop: () => void;
  pushToTalkEnabled?: boolean;
  onUserTranscript?: (text: string) => void;
  controlsDisabled?: boolean;
}

export function AvatarPanel({
  heygenToken,
  avatarId,
  agentName,
  isMicActive,
  onMicStart,
  onMicStop,
  pushToTalkEnabled = true,
  onUserTranscript,
  controlsDisabled = false,
}: AvatarPanelProps) {
  return (
    <div className="avatar-panel">
      <div className="avatar-header">
        <span className="avatar-name">{agentName}</span>
        <span className={`avatar-status ${!controlsDisabled ? 'active' : ''}`}>
          {controlsDisabled ? 'Offline' : 'Online'}
        </span>
      </div>

      <div className="avatar-video">
        <AvatarView
          heygenToken={heygenToken}
          avatarId={avatarId}
          onUserTranscript={onUserTranscript}
          isPushToTalkActive={pushToTalkEnabled ? isMicActive : false}
          pushToTalkEnabled={pushToTalkEnabled}
        />
      </div>

      <div className="avatar-controls">
        <button
          className={`mic-btn ${isMicActive ? 'active' : ''}`}
          onMouseDown={onMicStart}
          onMouseUp={onMicStop}
          onMouseLeave={isMicActive ? onMicStop : undefined}
          disabled={controlsDisabled}
          title={pushToTalkEnabled ? 'Hold to talk' : 'Microphone'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        <span className="mic-hint">
          {isMicActive ? 'Listening...' : pushToTalkEnabled ? 'Hold to speak' : 'Auto-detect'}
        </span>
      </div>

      <style jsx>{`
        .avatar-panel {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .avatar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border);
        }
        .avatar-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .avatar-status {
          font-size: 11px;
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border-radius: 10px;
          color: var(--text-muted);
        }
        .avatar-status.active {
          background: rgba(74, 222, 128, 0.15);
          color: var(--success);
        }
        .avatar-video {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--bg-primary);
          overflow: hidden;
        }
        .avatar-video :global(video) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .avatar-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-top: 1px solid var(--border);
        }
        .mic-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 50%;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mic-btn:hover:not(:disabled) {
          background: var(--bg-primary);
          border-color: var(--accent);
          color: var(--text-primary);
        }
        .mic-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
          animation: pulse 1.5s infinite;
        }
        .mic-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .mic-hint {
          font-size: 11px;
          color: var(--text-muted);
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(100, 100, 160, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(100, 100, 160, 0);
          }
        }
      `}</style>
    </div>
  );
}
