'use client';

import { useState } from 'react';

interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'data' | 'analysis' | 'export' | 'integration';
}

const AVAILABLE_TOOLS: Tool[] = [
  { id: 'sql', name: 'SQL Query', icon: 'database', description: 'Execute SQL queries on connected databases', category: 'data' },
  { id: 'python', name: 'Python', icon: 'code', description: 'Run Python scripts for data analysis', category: 'analysis' },
  { id: 'charts', name: 'Charts', icon: 'chart', description: 'Create visualizations from your data', category: 'analysis' },
  { id: 'export', name: 'Export', icon: 'download', description: 'Export data to CSV, JSON, or Excel', category: 'export' },
  { id: 'api', name: 'API', icon: 'globe', description: 'Connect to external APIs', category: 'integration' },
  { id: 'sheets', name: 'Sheets', icon: 'table', description: 'Import/export Google Sheets', category: 'integration' },
];

interface ToolsPanelProps {
  onToolSelect?: (toolId: string) => void;
  activeTool?: string | null;
}

export function ToolsPanel({ onToolSelect, activeTool }: ToolsPanelProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'database':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case 'code':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'chart':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'download':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case 'globe':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case 'table':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tools-panel">
      <div className="tools-header">
        <span className="tools-title">MCP Tools</span>
        <span className="tools-count">{AVAILABLE_TOOLS.length} available</span>
      </div>
      <div className="tools-grid">
        {AVAILABLE_TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolSelect?.(tool.id)}
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
            title={tool.description}
          >
            <span className="tool-icon">{renderIcon(tool.icon)}</span>
            <span className="tool-name">{tool.name}</span>
          </button>
        ))}
      </div>
      {hoveredTool && (
        <div className="tool-tooltip">
          {AVAILABLE_TOOLS.find((t) => t.id === hoveredTool)?.description}
        </div>
      )}

      <style jsx>{`
        .tools-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
        }
        .tools-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .tools-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .tools-count {
          font-size: 11px;
          color: var(--text-muted);
        }
        .tools-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tool-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-secondary);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tool-btn:hover {
          background: var(--bg-primary);
          border-color: var(--accent);
          color: var(--text-primary);
        }
        .tool-btn.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .tool-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }
        .tool-name {
          white-space: nowrap;
        }
        .tool-tooltip {
          margin-top: 8px;
          padding: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
