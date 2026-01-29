'use client';

import { InterviewPhase } from '@/types';

interface ProgressBarProps {
  currentPhase: InterviewPhase;
}

const PHASES = [
  { key: InterviewPhase.GREETING, label: 'Introduction', step: 1 },
  { key: InterviewPhase.TECHNICAL, label: 'Technical', step: 2 },
  { key: InterviewPhase.EVALUATION, label: 'Evaluation', step: 3 },
  { key: InterviewPhase.COMPLETED, label: 'Complete', step: 4 },
];

export function ProgressBar({ currentPhase }: ProgressBarProps) {
  const currentStep = PHASES.find((p) => p.key === currentPhase)?.step ?? 0;
  const progress = currentPhase === InterviewPhase.IDLE ? 0 : ((currentStep - 1) / (PHASES.length - 1)) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-label">
        <span className="progress-text">Progress</span>
        <span className="progress-step">
          Step {Math.max(1, currentStep)} of {PHASES.length}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="progress-markers">
          {PHASES.map((phase, index) => (
            <div
              key={phase.key}
              className={`marker ${currentStep > index + 1 ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
              title={phase.label}
            />
          ))}
        </div>
      </div>
      <div className="phase-labels">
        {PHASES.map((phase) => (
          <span
            key={phase.key}
            className={`phase-label ${currentPhase === phase.key ? 'active' : ''}`}
          >
            {phase.label}
          </span>
        ))}
      </div>

      <style jsx>{`
        .progress-bar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 400px;
          max-width: 500px;
          flex: 1;
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .progress-text {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .progress-step {
          font-size: 12px;
          color: var(--text-muted);
        }
        .progress-track {
          position: relative;
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: visible;
        }
        .progress-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%);
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        .progress-markers {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 2px;
        }
        .marker {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 2px solid var(--border);
          transition: all 0.3s ease;
        }
        .marker.completed {
          background: var(--accent);
          border-color: var(--accent);
        }
        .marker.active {
          background: var(--accent-light);
          border-color: var(--accent-light);
          box-shadow: 0 0 8px var(--accent-light);
        }
        .phase-labels {
          display: flex;
          justify-content: space-between;
          padding: 0 2px;
        }
        .phase-label {
          font-size: 10px;
          color: var(--text-muted);
          text-align: center;
          flex: 1;
        }
        .phase-label.active {
          color: var(--accent-light);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
