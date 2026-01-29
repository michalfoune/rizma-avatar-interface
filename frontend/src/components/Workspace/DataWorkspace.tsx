'use client';

import { useState } from 'react';

interface DataRow {
  id: number;
  name: string;
  department: string;
  region: string;
  manager: string;
  revenue: number;
  expenses: number;
  profit: number;
  growth: number;
  customers: number;
  employees: number;
  satisfaction: number;
  status: 'active' | 'pending' | 'inactive';
  lastUpdated: string;
}

const SAMPLE_DATA: DataRow[] = [
  { id: 1, name: 'North Division', department: 'Sales', region: 'NA-East', manager: 'J. Smith', revenue: 1250000, expenses: 890000, profit: 360000, growth: 12.5, customers: 2340, employees: 45, satisfaction: 4.2, status: 'active', lastUpdated: '2024-01-15' },
  { id: 2, name: 'South Division', department: 'Sales', region: 'NA-South', manager: 'M. Johnson', revenue: 980000, expenses: 720000, profit: 260000, growth: 8.2, customers: 1890, employees: 38, satisfaction: 4.5, status: 'active', lastUpdated: '2024-01-14' },
  { id: 3, name: 'East Division', department: 'Sales', region: 'NA-East', manager: 'S. Williams', revenue: 1120000, expenses: 950000, profit: 170000, growth: -2.1, customers: 2100, employees: 42, satisfaction: 3.8, status: 'pending', lastUpdated: '2024-01-13' },
  { id: 4, name: 'West Division', department: 'Sales', region: 'NA-West', manager: 'R. Brown', revenue: 1450000, expenses: 1020000, profit: 430000, growth: 15.8, customers: 2780, employees: 52, satisfaction: 4.7, status: 'active', lastUpdated: '2024-01-15' },
  { id: 5, name: 'Central Ops', department: 'Operations', region: 'NA-Central', manager: 'L. Davis', revenue: 670000, expenses: 580000, profit: 90000, growth: 5.4, customers: 890, employees: 28, satisfaction: 4.0, status: 'active', lastUpdated: '2024-01-12' },
  { id: 6, name: 'HQ Admin', department: 'Admin', region: 'Corporate', manager: 'K. Wilson', revenue: 230000, expenses: 210000, profit: 20000, growth: 1.2, customers: 0, employees: 15, satisfaction: 4.1, status: 'inactive', lastUpdated: '2024-01-10' },
  { id: 7, name: 'Remote Tech', department: 'Technology', region: 'Global', manager: 'A. Taylor', revenue: 890000, expenses: 620000, profit: 270000, growth: 22.3, customers: 1560, employees: 35, satisfaction: 4.8, status: 'active', lastUpdated: '2024-01-15' },
  { id: 8, name: 'Partner Network', department: 'Partnerships', region: 'NA-West', manager: 'C. Anderson', revenue: 560000, expenses: 380000, profit: 180000, growth: 18.7, customers: 720, employees: 12, satisfaction: 4.3, status: 'pending', lastUpdated: '2024-01-14' },
  { id: 9, name: 'EMEA Division', department: 'Sales', region: 'EMEA', manager: 'P. Martinez', revenue: 2100000, expenses: 1650000, profit: 450000, growth: 9.8, customers: 3200, employees: 68, satisfaction: 4.1, status: 'active', lastUpdated: '2024-01-15' },
  { id: 10, name: 'APAC Division', department: 'Sales', region: 'APAC', manager: 'H. Lee', revenue: 1890000, expenses: 1420000, profit: 470000, growth: 14.2, customers: 2950, employees: 55, satisfaction: 4.4, status: 'active', lastUpdated: '2024-01-15' },
  { id: 11, name: 'LATAM Division', department: 'Sales', region: 'LATAM', manager: 'G. Santos', revenue: 780000, expenses: 620000, profit: 160000, growth: 11.5, customers: 1450, employees: 32, satisfaction: 4.0, status: 'active', lastUpdated: '2024-01-14' },
  { id: 12, name: 'Support Center', department: 'Support', region: 'Global', manager: 'N. Patel', revenue: 450000, expenses: 520000, profit: -70000, growth: -3.2, customers: 8500, employees: 85, satisfaction: 3.9, status: 'pending', lastUpdated: '2024-01-13' },
  { id: 13, name: 'R&D Lab', department: 'Technology', region: 'Corporate', manager: 'D. Chen', revenue: 0, expenses: 890000, profit: -890000, growth: 0, customers: 0, employees: 42, satisfaction: 4.6, status: 'active', lastUpdated: '2024-01-15' },
  { id: 14, name: 'Marketing Hub', department: 'Marketing', region: 'NA-East', manager: 'E. Garcia', revenue: 320000, expenses: 480000, profit: -160000, growth: 25.4, customers: 0, employees: 22, satisfaction: 4.2, status: 'active', lastUpdated: '2024-01-14' },
  { id: 15, name: 'Finance Dept', department: 'Finance', region: 'Corporate', manager: 'F. Thompson', revenue: 180000, expenses: 150000, profit: 30000, growth: 2.1, customers: 0, employees: 18, satisfaction: 4.0, status: 'active', lastUpdated: '2024-01-12' },
  { id: 16, name: 'HR Services', department: 'HR', region: 'Corporate', manager: 'V. Robinson', revenue: 0, expenses: 320000, profit: -320000, growth: 0, customers: 0, employees: 12, satisfaction: 4.3, status: 'active', lastUpdated: '2024-01-11' },
  { id: 17, name: 'Legal Team', department: 'Legal', region: 'Corporate', manager: 'B. Clark', revenue: 120000, expenses: 280000, profit: -160000, growth: 5.5, customers: 0, employees: 8, satisfaction: 4.1, status: 'active', lastUpdated: '2024-01-10' },
  { id: 18, name: 'Quality Assurance', department: 'Operations', region: 'Global', manager: 'T. Lewis', revenue: 0, expenses: 420000, profit: -420000, growth: 0, customers: 0, employees: 24, satisfaction: 4.4, status: 'active', lastUpdated: '2024-01-13' },
  { id: 19, name: 'Supply Chain', department: 'Operations', region: 'Global', manager: 'Y. Walker', revenue: 0, expenses: 1200000, profit: -1200000, growth: -1.8, customers: 0, employees: 65, satisfaction: 3.7, status: 'pending', lastUpdated: '2024-01-14' },
  { id: 20, name: 'Enterprise Sales', department: 'Sales', region: 'NA-East', manager: 'Z. Hall', revenue: 3200000, expenses: 1800000, profit: 1400000, growth: 28.9, customers: 45, employees: 28, satisfaction: 4.9, status: 'active', lastUpdated: '2024-01-15' },
];

type ViewMode = 'table' | 'chart' | 'raw';

interface DataWorkspaceProps {
  onQueryExecute?: (query: string) => void;
}

export function DataWorkspace({ onQueryExecute }: DataWorkspaceProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [query, setQuery] = useState('SELECT * FROM regions ORDER BY revenue DESC');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === SAMPLE_DATA.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(SAMPLE_DATA.map((r) => r.id)));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatGrowth = (value: number) => {
    const prefix = value >= 0 ? '+' : '';
    return `${prefix}${value.toFixed(1)}%`;
  };

  const renderTable = () => (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th className="checkbox-col">
              <input
                type="checkbox"
                checked={selectedRows.size === SAMPLE_DATA.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Region</th>
            <th>Manager</th>
            <th className="number-col">Revenue</th>
            <th className="number-col">Expenses</th>
            <th className="number-col">Profit</th>
            <th className="number-col">Growth</th>
            <th className="number-col">Customers</th>
            <th className="number-col">Employees</th>
            <th className="number-col">Satisfaction</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_DATA.map((row) => (
            <tr
              key={row.id}
              className={selectedRows.has(row.id) ? 'selected' : ''}
              onClick={() => handleRowSelect(row.id)}
            >
              <td className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="id-col">{row.id}</td>
              <td className="name-col">{row.name}</td>
              <td>{row.department}</td>
              <td>{row.region}</td>
              <td>{row.manager}</td>
              <td className="number-col">{formatCurrency(row.revenue)}</td>
              <td className="number-col">{formatCurrency(row.expenses)}</td>
              <td className={`number-col ${row.profit >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(row.profit)}
              </td>
              <td className={`number-col ${row.growth >= 0 ? 'positive' : 'negative'}`}>
                {formatGrowth(row.growth)}
              </td>
              <td className="number-col">{row.customers.toLocaleString()}</td>
              <td className="number-col">{row.employees}</td>
              <td className="number-col">{row.satisfaction.toFixed(1)}</td>
              <td>
                <span className={`status-badge ${row.status}`}>{row.status}</span>
              </td>
              <td className="date-col">{row.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChart = () => (
    <div className="chart-container">
      <div className="chart-placeholder">
        <div className="bar-chart">
          {SAMPLE_DATA.slice(0, 5).map((row) => (
            <div key={row.id} className="bar-item">
              <div
                className="bar"
                style={{ height: `${(row.revenue / 150000) * 100}%` }}
                title={`${row.name}: ${formatCurrency(row.revenue)}`}
              />
              <span className="bar-label">{row.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">Revenue by Region (Top 5)</div>
      </div>
    </div>
  );

  const renderRaw = () => (
    <div className="raw-container">
      <pre className="raw-data">{JSON.stringify(SAMPLE_DATA, null, 2)}</pre>
    </div>
  );

  return (
    <div className="data-workspace">
      <div className="workspace-header">
        <div className="query-section">
          <div className="query-input-wrapper">
            <span className="query-prefix">Query:</span>
            <input
              type="text"
              className="query-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter SQL query..."
            />
            <button
              className="run-btn"
              onClick={() => onQueryExecute?.(query)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Run
            </button>
          </div>
        </div>
        <div className="view-tabs">
          <button
            className={`tab ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
          <button
            className={`tab ${viewMode === 'chart' ? 'active' : ''}`}
            onClick={() => setViewMode('chart')}
          >
            Chart
          </button>
          <button
            className={`tab ${viewMode === 'raw' ? 'active' : ''}`}
            onClick={() => setViewMode('raw')}
          >
            Raw
          </button>
        </div>
      </div>

      <div className="workspace-content">
        {viewMode === 'table' && renderTable()}
        {viewMode === 'chart' && renderChart()}
        {viewMode === 'raw' && renderRaw()}
      </div>

      <div className="workspace-footer">
        <span className="row-count">{SAMPLE_DATA.length} rows</span>
        {selectedRows.size > 0 && (
          <span className="selected-count">{selectedRows.size} selected</span>
        )}
      </div>

      <style jsx>{`
        .data-workspace {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .workspace-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          background: var(--bg-tertiary);
        }
        .query-section {
          display: flex;
          gap: 8px;
        }
        .query-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0 12px;
        }
        .query-prefix {
          font-size: 12px;
          color: var(--text-muted);
          font-family: monospace;
        }
        .query-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: monospace;
          font-size: 13px;
          padding: 8px 0;
        }
        .query-input:focus {
          outline: none;
        }
        .run-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: var(--accent);
          border: none;
          border-radius: 4px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .run-btn:hover {
          opacity: 0.9;
        }
        .view-tabs {
          display: flex;
          gap: 4px;
        }
        .tab {
          padding: 6px 16px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-secondary);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab:hover {
          background: var(--bg-secondary);
        }
        .tab.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        .workspace-content {
          flex: 1;
          overflow: auto;
        }
        .table-container {
          overflow: auto;
          height: 100%;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .data-table th,
        .data-table td {
          padding: 10px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .data-table th {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .data-table tbody tr {
          cursor: pointer;
          transition: background 0.15s;
        }
        .data-table tbody tr:hover {
          background: var(--bg-tertiary);
        }
        .data-table tbody tr.selected {
          background: rgba(100, 100, 160, 0.15);
        }
        .checkbox-col {
          width: 40px;
          text-align: center;
        }
        .id-col {
          color: var(--text-muted);
          font-family: monospace;
        }
        .name-col {
          font-weight: 500;
          white-space: nowrap;
        }
        .date-col {
          font-family: monospace;
          font-size: 12px;
          color: var(--text-muted);
        }
        .number-col {
          text-align: right;
          font-family: monospace;
        }
        .number-col.positive {
          color: var(--success);
        }
        .number-col.negative {
          color: var(--error);
        }
        .status-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: capitalize;
        }
        .status-badge.active {
          background: rgba(74, 222, 128, 0.15);
          color: var(--success);
        }
        .status-badge.pending {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
        }
        .status-badge.inactive {
          background: rgba(156, 163, 175, 0.15);
          color: #9ca3af;
        }
        .chart-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 24px;
        }
        .chart-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 24px;
          height: 200px;
          padding: 16px;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }
        .bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .bar {
          width: 40px;
          background: linear-gradient(180deg, var(--accent-light) 0%, var(--accent) 100%);
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }
        .bar-label {
          font-size: 11px;
          color: var(--text-muted);
        }
        .chart-legend {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .raw-container {
          height: 100%;
          overflow: auto;
          padding: 16px;
        }
        .raw-data {
          font-family: monospace;
          font-size: 12px;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 16px;
          border-radius: 8px;
          margin: 0;
          white-space: pre-wrap;
        }
        .workspace-footer {
          display: flex;
          gap: 16px;
          padding: 8px 16px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-muted);
        }
        .selected-count {
          color: var(--accent-light);
        }
        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          cursor: pointer;
          accent-color: var(--accent);
        }
      `}</style>
    </div>
  );
}
