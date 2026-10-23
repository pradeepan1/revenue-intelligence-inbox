const fs = require('fs');
const path = require('path');

const initialData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/01_initial.json'), 'utf8'));
const updateData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/02_update.json'), 'utf8'));

// Build the redesigned single-page application with modern light-workspace, charcoal rail, and magenta accent
const appHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpendNest — Revenue Intelligence Inbox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Base & Surfaces */
      --bg-app: #f8fafc;
      --bg-surface: #ffffff;
      --bg-surface-subtle: #f1f5f9;
      --bg-surface-hover: #f8fafc;
      --border-subtle: #e2e8f0;
      --border-focus: #e11d48;
      
      /* Navigation Rail (Dark Charcoal) */
      --nav-bg: #0f172a;
      --nav-surface: #1e293b;
      --nav-text: #94a3b8;
      --nav-text-hover: #f8fafc;
      --nav-border: #334155;
      
      /* Primary Magenta / Rose Accent */
      --primary: #e11d48;
      --primary-hover: #be185d;
      --primary-active: #9f1239;
      --primary-light: #fff1f2;
      --primary-border: #fecdd3;
      
      /* Typography Colors */
      --text-heading: #0f172a;
      --text-body: #334155;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      
      /* Accessible Semantic Badges */
      --emerald-text: #047857;
      --emerald-bg: #ecfdf5;
      --emerald-border: #a7f3d0;
      
      --amber-text: #b45309;
      --amber-bg: #fffbeb;
      --amber-border: #fde68a;
      
      --rose-text: #be123c;
      --rose-bg: #fff1f2;
      --rose-border: #fecdd3;
      
      --sky-text: #0369a1;
      --sky-bg: #f0f9ff;
      --sky-border: #bae6fd;
      
      --purple-text: #6d28d9;
      --purple-bg: #f5f3ff;
      --purple-border: #ddd6fe;

      --slate-text: #475569;
      --slate-bg: #f1f5f9;
      --slate-border: #cbd5e1;
      
      /* Fonts & Layout */
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
      
      --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
      --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04);
      --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-app);
      color: var(--text-body);
      font-family: var(--font-sans);
      font-size: 13px;
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      overflow-x: hidden;
    }

    /* Left Navigation Rail */
    aside.nav-rail {
      width: 240px;
      background-color: var(--nav-bg);
      color: var(--nav-text);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100vh;
      position: sticky;
      top: 0;
      z-index: 40;
      border-right: 1px solid var(--nav-border);
      transition: width 0.2s ease;
    }
    .rail-header {
      padding: 20px 18px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .brand-mark {
      width: 32px;
      height: 32px;
      background: var(--primary);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(225, 29, 72, 0.4);
    }
    .brand-title {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.2px;
      line-height: 1.2;
    }
    .brand-sub {
      font-size: 11px;
      color: var(--nav-text);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }
    .brand-pill {
      background: rgba(225, 29, 72, 0.2);
      color: #fda4af;
      font-size: 9px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .rail-menu {
      padding: 16px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      overflow-y: auto;
    }
    .rail-heading {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 8px 10px 4px;
    }
    .rail-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 9px 12px;
      border-radius: var(--radius-sm);
      color: var(--nav-text);
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s ease;
      border-left: 3px solid transparent;
    }
    .rail-item:hover {
      color: var(--nav-text-hover);
      background: rgba(255, 255, 255, 0.05);
    }
    .rail-item.active {
      color: #ffffff;
      background: rgba(225, 29, 72, 0.14);
      border-left-color: var(--primary);
    }
    .rail-item-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .rail-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
    }
    .rail-item.active .rail-badge {
      background: var(--primary);
      color: #fff;
    }

    .rail-footer {
      padding: 14px 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.2);
    }
    .date-tag {
      font-size: 11px;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .status-indicator-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
    }

    /* Main Application Wrapper */
    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      height: 100vh;
      overflow-y: auto;
    }

    /* Top Action Bar */
    header.top-bar {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: 12px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      position: sticky;
      top: 0;
      z-index: 30;
      box-shadow: var(--shadow-xs);
    }
    .breadcrumb-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .breadcrumb-root { color: var(--text-muted); }
    .breadcrumb-sep { color: var(--text-muted); font-size: 11px; }
    .breadcrumb-current { font-weight: 700; color: var(--text-heading); }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Buttons */
    .btn {
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-body);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .btn:hover {
      background: var(--bg-surface-subtle);
      border-color: #cbd5e1;
      color: var(--text-heading);
    }
    .btn:active { transform: translateY(1px); }
    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
      box-shadow: 0 1px 2px rgba(225, 29, 72, 0.2);
    }
    .btn-primary:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
      color: #ffffff;
    }
    .btn-subtle {
      background: transparent;
      border-color: transparent;
      color: var(--text-secondary);
    }
    .btn-subtle:hover {
      background: var(--bg-surface-subtle);
      color: var(--text-heading);
    }
    .btn-sm { padding: 4px 10px; font-size: 11px; }

    /* Replay Quick Actions Toolbar */
    .replay-control-bar {
      background: #ffffff;
      border-bottom: 1px solid var(--border-subtle);
      padding: 10px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .replay-info-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .replay-step-buttons {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Content Area */
    .content-area {
      padding: 24px 28px;
      flex: 1;
    }

    /* Cards */
    .card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      padding: 20px;
      margin-bottom: 20px;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .card-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-heading);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Overview Stat Cards Grid */
    .stat-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xs);
      padding: 18px 20px;
      position: relative;
      transition: all 0.15s ease;
    }
    .stat-card:hover {
      box-shadow: var(--shadow-md);
      border-color: #cbd5e1;
    }
    .stat-card-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .stat-card-value {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-heading);
      line-height: 1.1;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }
    .stat-card-sub {
      font-size: 11px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Badges & Tags */
    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      line-height: 1.4;
    }
    .badge-emerald { background: var(--emerald-bg); color: var(--emerald-text); border: 1px solid var(--emerald-border); }
    .badge-amber { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
    .badge-rose { background: var(--rose-bg); color: var(--rose-text); border: 1px solid var(--rose-border); }
    .badge-sky { background: var(--sky-bg); color: var(--sky-text); border: 1px solid var(--sky-border); }
    .badge-purple { background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
    .badge-slate { background: var(--slate-bg); color: var(--slate-text); border: 1px solid var(--slate-border); }

    /* Insight Finding Cards */
    .finding-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-bottom: 14px;
      border-left: 4px solid var(--primary);
      box-shadow: var(--shadow-xs);
      transition: all 0.15s ease;
    }
    .finding-card:hover { box-shadow: var(--shadow-sm); border-color: #cbd5e1; border-left-color: var(--primary); }
    .finding-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .finding-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .finding-meta {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--font-mono);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .finding-desc {
      font-size: 12px;
      color: var(--text-body);
      line-height: 1.5;
      margin-bottom: 8px;
    }
    .finding-action {
      background: var(--bg-surface-subtle);
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      color: var(--text-heading);
      border-left: 3px solid var(--emerald-text);
    }

    /* Intelligence Inbox - Three Panel Layout */
    .inbox-layout {
      display: grid;
      grid-template-columns: 230px 380px 1fr;
      gap: 16px;
      height: calc(100vh - 170px);
      min-height: 600px;
    }
    @media (max-width: 1280px) {
      .inbox-layout { grid-template-columns: 210px 330px 1fr; }
    }
    @media (max-width: 1024px) {
      .inbox-layout { grid-template-columns: 1fr; height: auto; }
    }

    /* Panel 1: Filter Sidebar */
    .inbox-filters-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      overflow-y: auto;
      box-shadow: var(--shadow-xs);
    }
    .filter-section-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 14px 0 8px;
    }
    .filter-section-title:first-child { margin-top: 0; }
    .filter-btn-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .filter-btn {
      width: 100%;
      text-align: left;
      padding: 7px 10px;
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 12px;
      color: var(--text-body);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.12s ease;
    }
    .filter-btn:hover { background: var(--bg-surface-subtle); color: var(--text-heading); }
    .filter-btn.active { background: var(--primary-light); color: var(--primary); font-weight: 700; }
    .filter-count { font-size: 10px; font-weight: 700; opacity: 0.8; }

    /* Panel 2: Conversation List */
    .inbox-list-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: var(--shadow-xs);
    }
    .inbox-list-search {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
    }
    .search-input-wrap {
      position: relative;
    }
    .search-input {
      width: 100%;
      padding: 7px 12px 7px 32px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 12px;
      color: var(--text-heading);
      outline: none;
      transition: all 0.15s ease;
    }
    .search-input:focus {
      background: #ffffff;
      border-color: var(--border-focus);
      box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.1);
    }
    .search-icon-svg {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }
    .inbox-scroll-list {
      flex: 1;
      overflow-y: auto;
    }
    .conv-row {
      padding: 13px 16px;
      border-bottom: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: all 0.12s ease;
      position: relative;
    }
    .conv-row:hover { background: var(--bg-surface-subtle); }
    .conv-row.active {
      background: #fff1f2;
      border-left: 3px solid var(--primary);
    }
    .conv-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .conv-ref-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--text-heading);
      background: var(--bg-surface-subtle);
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid var(--border-subtle);
    }
    .conv-row-time {
      font-size: 11px;
      color: var(--text-muted);
    }
    .conv-row-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-heading);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .conv-row-meta {
      font-size: 11px;
      color: var(--text-secondary);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .conv-row-badges {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }

    /* Panel 3: Details & Evidence Workspace */
    .inbox-detail-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: var(--shadow-xs);
    }
    .detail-top-card {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
    }
    .detail-heading-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 8px;
    }
    .detail-main-title {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-heading);
      letter-spacing: -0.3px;
    }
    .detail-sub-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: var(--text-secondary);
      flex-wrap: wrap;
    }

    /* Override Action Card */
    .override-action-card {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid var(--amber-text);
      padding: 12px 18px;
      margin: 16px 24px 0;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .override-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .select-input {
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: #ffffff;
      color: var(--text-heading);
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 500;
      outline: none;
    }
    .select-input:focus { border-color: var(--border-focus); }

    /* Tabs Inside Detail View */
    .detail-nav-tabs {
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
      gap: 4px;
    }
    .detail-tab-btn {
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      padding: 12px 14px;
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.12s ease;
    }
    .detail-tab-btn:hover { color: var(--text-heading); }
    .detail-tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    .detail-tab-content {
      padding: 24px;
      flex: 1;
    }

    /* Analysis Sections Inside Workspace */
    .section-block {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      margin-bottom: 16px;
      box-shadow: var(--shadow-xs);
    }
    .section-block-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 10px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .evidence-callout {
      background: #fff1f2;
      border-left: 3px solid var(--primary);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 12px 16px;
      font-size: 12px;
      line-height: 1.6;
      color: #881337;
      margin: 10px 0;
    }

    /* Transcript Turns Display */
    .turns-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .turn-card {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      box-shadow: var(--shadow-xs);
    }
    .turn-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 11px;
    }
    .turn-author {
      font-weight: 700;
      color: var(--text-heading);
    }
    .turn-time-stamp {
      font-family: var(--font-mono);
      color: var(--text-muted);
    }
    .turn-speech {
      font-size: 12px;
      color: var(--text-body);
      line-height: 1.5;
    }

    /* Tables */
    .table-container {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow-x: auto;
      box-shadow: var(--shadow-xs);
    }
    table.custom-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    table.custom-table th {
      background: var(--bg-surface-subtle);
      padding: 10px 14px;
      font-weight: 700;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-subtle);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 11px;
    }
    table.custom-table td {
      padding: 11px 14px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-body);
    }
    table.custom-table tr:hover td {
      background: var(--bg-surface-subtle);
    }

    /* Toast Notification */
    .toast-box {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 18px;
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-lg);
      font-size: 12px;
      font-weight: 500;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  </style>
</head>
<body>

  <!-- Left Charcoal Navigation Rail -->
  <aside class="nav-rail">
    <div class="rail-header">
      <div class="brand-mark">V</div>
      <div>
        <div class="brand-title">SpendNest</div>
        <div class="brand-sub">
          <span>Revenue Intelligence</span>
          <span class="brand-pill">B2B</span>
        </div>
      </div>
    </div>

    <nav class="rail-menu">
      <div class="rail-heading">Workspaces</div>
      
      <a class="rail-item active" onclick="navigateSection('overview')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          <span>Overview</span>
        </div>
      </a>

      <a class="rail-item" onclick="navigateSection('inbox')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>Intelligence Inbox</span>
        </div>
        <span class="rail-badge" id="rail-inbox-badge">44</span>
      </a>

      <a class="rail-item" onclick="navigateSection('routing')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <span>Routing & Review</span>
        </div>
        <span class="rail-badge" id="rail-override-badge">0</span>
      </a>

      <a class="rail-item" onclick="navigateSection('analytics')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span>Analytics</span>
        </div>
      </a>

      <div class="rail-heading">Operations</div>

      <a class="rail-item" onclick="navigateSection('imports')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Imports & Replay</span>
        </div>
        <span class="rail-badge" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;">Rev 2</span>
      </a>

      <a class="rail-item" onclick="navigateSection('exports')">
        <div class="rail-item-content">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span>Exports & Reports</span>
        </div>
      </a>
    </nav>

    <div class="rail-footer">
      <div class="date-tag">
        <span class="status-indicator-dot"></span>
        <span>21 Aug 2026 (Asia/Kolkata)</span>
      </div>
      <div style="font-size: 10px; color: #64748b; margin-top: 4px;">Volopay Revenue Intelligence</div>
    </div>
  </aside>

  <!-- Main Application Wrapper -->
  <div class="app-main">
    
    <!-- Top Action Bar -->
    <header class="top-bar">
      <div class="breadcrumb-wrap">
        <span class="breadcrumb-root">SpendNest</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-root">Workspace</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current" id="page-title">Overview</span>
      </div>

      <div class="top-actions">
        <span class="badge badge-emerald" id="top-status-badge">
          <span class="status-indicator-dot"></span>
          Replay Active: 44 Unique Records
        </span>
        <button class="btn btn-primary btn-sm" onclick="downloadManifestJson()">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export Manifest
        </button>
      </div>
    </header>

    <!-- Replay Quick Control Bar -->
    <div class="replay-control-bar">
      <div class="replay-info-label">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        Replay Steps:
      </div>
      <div class="replay-step-buttons">
        <button class="btn btn-sm" onclick="replayAction(1)" title="Load initial batch revision 1">1. Initial (Rev 1)</button>
        <button class="btn btn-sm" onclick="replayAction(2)" title="Test duplicate replay resilience">2. Duplicate Test</button>
        <button class="btn btn-sm" style="border-color: #fde68a; color: #b45309;" onclick="replayAction(3)" title="Simulate manual route override on M07">3. Override M07</button>
        <button class="btn btn-sm btn-primary" onclick="replayAction(4)" title="Apply update batch revision 2">4. Update (Rev 2)</button>
        <button class="btn btn-sm" onclick="replayAction(5)" title="Verify revision 1 does not overwrite revision 2">5. Regress Check</button>
        <button class="btn btn-sm btn-subtle" onclick="replayAction(0)" title="Reset to clean initial baseline">Reset</button>
      </div>
    </div>

    <!-- Content Workspace -->
    <main class="content-area">

      <!-- ============================================================ -->
      <!-- SECTION 1: OVERVIEW -->
      <!-- ============================================================ -->
      <section id="sec-overview" class="section-pane">
        
        <!-- Metric Cards Grid -->
        <div class="stat-cards-grid">
          <div class="stat-card">
            <div class="stat-card-label">Total Unique Records</div>
            <div class="stat-card-value" id="stat-total-records">44</div>
            <div class="stat-card-sub">
              <span>30 Phone Calls</span> • <span>14 Meetings</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Usable Transcripts</div>
            <div class="stat-card-value" style="color: var(--emerald-text);" id="stat-usable-transcripts">18</div>
            <div class="stat-card-sub" id="stat-coverage-ratio">
              40.9% coverage (18 of 44)
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Silent Intake (No Text)</div>
            <div class="stat-card-value" style="color: var(--slate-text);" id="stat-silent-intake">26</div>
            <div class="stat-card-sub">20 Calls • 6 Meetings (Preserved)</div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Manual Overrides</div>
            <div class="stat-card-value" style="color: var(--amber-text);" id="stat-override-count">0</div>
            <div class="stat-card-sub">Human judgments preserved</div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Priority Escalations</div>
            <div class="stat-card-value" style="color: var(--rose-text);">2</div>
            <div class="stat-card-sub">Cedarwave (M04) • Willowfield (M07)</div>
          </div>
        </div>

        <!-- Overview Layout: Insights & Activity -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
          
          <!-- Left Column: Evidence-Backed Findings -->
          <div>
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Three Core Source-Backed Findings
                </div>
                <span class="badge badge-rose">Audited Evidence</span>
              </div>

              <!-- Finding 1 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">1. Buyer vs Vendor Misclassification (LedgerBridge)</span>
                  <span class="badge badge-purple">Vendor / Internal</span>
                </div>
                <div class="finding-meta">
                  <span>Source ID: 1a21c409-c050-5787-90af-2667e057e1b6 (M02)</span>
                  <span>•</span>
                  <span>Turns 1–3</span>
                </div>
                <div class="finding-desc">
                  Stored metadata routinely classifies all meetings as customer sales pipeline. However, in M02, SpendNest strategy leads are meeting with supplier LedgerBridge to evaluate purchasing e-invoicing APIs.
                </div>
                <div class="finding-action">
                  <strong>Operational Routing:</strong> Routed to <em>Vendor / Technology Partner Note</em>. Excluded from sales pipeline to avoid inflating ARR projections.
                </div>
              </div>

              <!-- Finding 2 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">2. P1 Production Bug in Late-Arriving Transcript (Willowfield Trust)</span>
                  <span class="badge badge-rose">P1 Escalation</span>
                </div>
                <div class="finding-meta">
                  <span>Source ID: 4f304fff-fd40-5cfc-a366-0a134c445c2a (M07)</span>
                  <span>•</span>
                  <span>Turns 2–8</span>
                </div>
                <div class="finding-desc">
                  M07 arrived in batch 02_update (Revision 2) with 27 turns. The screen-share reveals payment description edits fail silently (old text persists), and 'Recreate payment' blocks document attachments.
                </div>
                <div class="finding-action">
                  <strong>Operational Routing:</strong> Routed immediately to <em>Customer Support / Critical Bug Escalation</em> with turn timestamps attached for Engineering QA.
                </div>
              </div>

              <!-- Finding 3 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">3. Strict Name-Omission Compliance Mandate (Vedant Outreach)</span>
                  <span class="badge badge-amber">Compliance Alert</span>
                </div>
                <div class="finding-meta">
                  <span>Source ID: 4a1de681-f884-55e8-b1ad-de22d17cd959 (C09)</span>
                  <span>•</span>
                  <span>Verbatim Quote</span>
                </div>
                <div class="finding-desc">
                  Prospect Vedant gave rep Meera a referral to business head Rishabh on LinkedIn, but explicitly instructed: <em>"No, please don't use my name."</em>
                </div>
                <div class="finding-action">
                  <strong>Operational Routing:</strong> Embedded in <em>Sales Coaching & Guidance</em> as a mandatory compliance alert forbidding reps from referencing Vedant.
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Operational Routing Breakdown & Activity -->
          <div>
            <div class="card">
              <div class="card-header">
                <div class="card-title">Routing Summary</div>
                <span class="badge badge-slate">6 Routes</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Sales Coaching & Guidance</span>
                  <span class="badge badge-sky">6 records</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Deal Next Steps</span>
                  <span class="badge badge-emerald">4 records</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Support & Critical Escalations</span>
                  <span class="badge badge-rose">3 records</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Partner & Channel Onboarding</span>
                  <span class="badge badge-purple">2 records</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Vendor / Internal Operations</span>
                  <span class="badge badge-slate">2 records</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 12px; font-weight: 600;">Voicemail / Gatekeeper</span>
                  <span class="badge badge-amber">1 record</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
                  <span style="font-size: 12px; color: var(--text-muted);">Silent Telephony Logs</span>
                  <span class="badge badge-slate">26 records</span>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <div class="card-title">Recent Ingestion Events</div>
                <span class="badge badge-emerald">Audit Trail</span>
              </div>
              <div id="overview-audit-log" style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
                <div>• Initial batch <code>01_initial.json</code> loaded: 44 unique records.</div>
                <div>• Update batch <code>02_update.json</code> applied: M07 updated to Revision 2.</div>
                <div>• Deduplication verified: zero inflated records.</div>
              </div>
            </div>

          </div>

        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 2: INTELLIGENCE INBOX -->
      <!-- ============================================================ -->
      <section id="sec-inbox" class="section-pane" style="display: none;">
        
        <div class="inbox-layout">
          
          <!-- Panel 1: Filter Sidebar -->
          <div class="inbox-filters-panel">
            <div class="filter-section-title">Source Type</div>
            <div class="filter-btn-group">
              <button class="filter-btn active" id="filter-type-all" onclick="setFilter('sourceType', 'all')">
                <span>All Interactions</span>
                <span class="filter-count">44</span>
              </button>
              <button class="filter-btn" id="filter-type-call" onclick="setFilter('sourceType', 'call')">
                <span>Phone Calls</span>
                <span class="filter-count">30</span>
              </button>
              <button class="filter-btn" id="filter-type-meeting" onclick="setFilter('sourceType', 'meeting')">
                <span>Video Meetings</span>
                <span class="filter-count">14</span>
              </button>
            </div>

            <div class="filter-section-title">Transcript Content</div>
            <div class="filter-btn-group">
              <button class="filter-btn active" id="filter-text-all" onclick="setFilter('transcript', 'all')">
                <span>All Intake</span>
                <span class="filter-count">44</span>
              </button>
              <button class="filter-btn" id="filter-text-usable" onclick="setFilter('transcript', 'usable')">
                <span>Usable Transcripts</span>
                <span class="filter-count">18</span>
              </button>
              <button class="filter-btn" id="filter-text-silent" onclick="setFilter('transcript', 'silent')">
                <span>Silent Telephony Logs</span>
                <span class="filter-count">26</span>
              </button>
            </div>

            <div class="filter-section-title">Routing Category</div>
            <div class="filter-btn-group">
              <button class="filter-btn active" id="filter-route-all" onclick="setFilter('route', 'all')">
                <span>All Routes</span>
              </button>
              <button class="filter-btn" id="filter-route-sales_coaching" onclick="setFilter('route', 'sales_coaching')">
                <span>Sales Coaching</span>
              </button>
              <button class="filter-btn" id="filter-route-deal_next_steps" onclick="setFilter('route', 'deal_next_steps')">
                <span>Deal Next Steps</span>
              </button>
              <button class="filter-btn" id="filter-route-customer_support_bugs" onclick="setFilter('route', 'customer_support_bugs')">
                <span>Support & Bug Escalation</span>
              </button>
              <button class="filter-btn" id="filter-route-partner_channel" onclick="setFilter('route', 'partner_channel')">
                <span>Partner & Channel</span>
              </button>
              <button class="filter-btn" id="filter-route-vendor_internal_notes" onclick="setFilter('route', 'vendor_internal_notes')">
                <span>Vendor / Internal Ops</span>
              </button>
            </div>

            <div class="filter-section-title">Review State</div>
            <div class="filter-btn-group">
              <button class="filter-btn active" id="filter-rev-all" onclick="setFilter('reviewState', 'all')">
                <span>All States</span>
              </button>
              <button class="filter-btn" id="filter-rev-override" onclick="setFilter('reviewState', 'override')">
                <span>Manually Overridden</span>
              </button>
              <button class="filter-btn" id="filter-rev-updated" onclick="setFilter('reviewState', 'updated')">
                <span>Revision 2 Updated</span>
              </button>
            </div>
          </div>

          <!-- Panel 2: Conversation List -->
          <div class="inbox-list-panel">
            <div class="inbox-list-search">
              <div class="search-input-wrap">
                <svg class="search-icon-svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="inbox-search-input" class="search-input" placeholder="Search ID, title, organization, quotes..." oninput="onSearchChange(this.value)">
              </div>
            </div>

            <div class="inbox-scroll-list" id="inbox-conversations-list">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- Panel 3: Details & Evidence Workspace -->
          <div class="inbox-detail-panel" id="inbox-detail-workspace">
            <div style="padding: 40px; text-align: center; color: var(--text-muted); margin: auto;">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <div style="font-size: 14px; font-weight: 600; margin-top: 8px;">Select a conversation to inspect evidence</div>
            </div>
          </div>

        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 3: ROUTING & REVIEW -->
      <!-- ============================================================ -->
      <section id="sec-routing" class="section-pane" style="display: none;">
        
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Manager Routing Governance & Manual Overrides Queue
            </div>
            <span class="badge badge-amber" id="routing-override-badge">0 Active Overrides</span>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.6;">
            The data contract mandates that manual routing overrides made by managers must remain strictly preserved when new source revisions or repeat imports arrive.
            Below is the live registry of all active manual corrections.
          </div>

          <div class="table-container">
            <table class="custom-table" id="table-overrides">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Source ID</th>
                  <th>Current Route</th>
                  <th>Automated Default</th>
                  <th>Override Justification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="tbody-overrides">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Priority Escalations Board -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Priority Escalations & Account Risks</div>
            <span class="badge badge-rose">Attention Required</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-heading);">Cedarwave Distribution (M04)</span>
                <span class="badge badge-rose">Card Network Sunset</span>
              </div>
              <div style="font-size: 12px; color: var(--text-body); line-height: 1.5; margin-bottom: 8px;">
                SpendNest is deprecating the existing physical card programme due to acceptance failures. All company users must complete identity re-KYC for the new network.
              </div>
              <div style="font-size: 11px; color: var(--text-secondary);">Owner: Customer Success • High Defection Risk</div>
            </div>

            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-heading);">Willowfield Trust (M07)</span>
                <span class="badge badge-rose">P1 UI Bug</span>
              </div>
              <div style="font-size: 12px; color: var(--text-body); line-height: 1.5; margin-bottom: 8px;">
                Revision 2 late transcript proved payment description changes fail silently and recreate payment blocks attachments.
              </div>
              <div style="font-size: 11px; color: var(--text-secondary);">Owner: Technical Support • Bug Ticket Dispatched</div>
            </div>
          </div>
        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 4: ANALYTICS -->
      <!-- ============================================================ -->
      <section id="sec-analytics" class="section-pane" style="display: none;">
        
        <div class="stat-cards-grid">
          <div class="stat-card">
            <div class="stat-card-label">Outbound Call Reps</div>
            <div class="stat-card-value">5</div>
            <div class="stat-card-sub">Arun, Leela, Meera, Kiran, Dev</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Calendar Hosts</div>
            <div class="stat-card-value">10</div>
            <div class="stat-card-sub">Meeting Coordinators (team06–team14)</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Call Transcript Ratio</div>
            <div class="stat-card-value" style="color: var(--sky-text);">33.3%</div>
            <div class="stat-card-sub">10 of 30 calls have audio text</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Meeting Turn Ratio</div>
            <div class="stat-card-value" style="color: var(--emerald-text);">57.1%</div>
            <div class="stat-card-sub">8 of 14 meetings have turns</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Rep Call Breakdown -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Activity by Call Representative (30 Calls)</div>
              <span class="badge badge-sky">Direct Outbound</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">Arun (BDR Lead)</span>
                <span class="badge badge-slate">15 calls (2 analyzed, 13 silent)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">Leela (Outbound BDR)</span>
                <span class="badge badge-slate">8 calls (1 voicemail, 7 silent)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">Meera (Senior BDR)</span>
                <span class="badge badge-emerald">5 calls (4 analyzed, 1 silent)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">Kiran (Technical Sales)</span>
                <span class="badge badge-sky">1 call (Milan API follow-up)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                <span style="font-weight: 600;">Dev (Channel Partnerships)</span>
                <span class="badge badge-purple">1 call (Willowbank partnership)</span>
              </div>
            </div>
          </div>

          <!-- Meeting Host Breakdown -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">Activity by Calendar Host (14 Meetings)</div>
              <span class="badge badge-purple">Google Meet Hosts</span>
            </div>
            <div style="background: var(--bg-surface-subtle); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 11px; color: var(--text-secondary); margin-bottom: 12px; border-left: 3px solid var(--purple-text);">
              <strong>Important Specification Distinction:</strong> A meeting organizer is the calendar coordinator; an organizer is <em>not automatically</em> the salesperson or an attendee.
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">team08@example.com</span>
                <span class="badge badge-slate">3 meetings (M03, M04, M05)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">team09@example.com</span>
                <span class="badge badge-slate">3 meetings (M06, M07, M08)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">team06@example.com</span>
                <span class="badge badge-slate">1 meeting (M01 Harborpath)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                <span style="font-weight: 600;">team07@example.com</span>
                <span class="badge badge-slate">1 meeting (M02 LedgerBridge)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                <span style="font-weight: 600;">Other Coordinators</span>
                <span class="badge badge-slate">6 meetings (M09-M14)</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 5: IMPORTS & REPLAY -->
      <!-- ============================================================ -->
      <section id="sec-imports" class="section-pane" style="display: none;">
        
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Data Contract & Replay Verification Protocol
            </div>
            <span class="badge badge-emerald">Automated Verification Station</span>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.6;">
            Execute each step of the required verification sequence in order. The application logs the exact behavior against the contract.
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">
            
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 1: Initial Import</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">Ingest batch <code>initial-001</code> (Revision 1). Exactly 44 records loaded; 17 usable transcripts.</div>
              <button class="btn btn-sm btn-primary" onclick="replayAction(1)">Run Step 1</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 2: Duplicate Replay</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">Re-import batch 1 with shuffled array order. Verifies zero record inflation (count remains 44).</div>
              <button class="btn btn-sm" onclick="replayAction(2)">Run Step 2</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 3: Override M07</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">Manager manually changes M07 route to Support / Escalation. Saved in browser storage.</div>
              <button class="btn btn-sm" style="color: var(--amber-text);" onclick="replayAction(3)">Run Step 3</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 4: Update Batch (Rev 2)</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">Ingest batch <code>update-002</code>. M07 gets 27 turns; transcripts reach 18; manual route stays intact.</div>
              <button class="btn btn-sm btn-primary" onclick="replayAction(4)">Run Step 4</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 5: Regress Test</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">Re-import Revision 1. Confirms older revision is safely ignored; Revision 2 remains intact.</div>
              <button class="btn btn-sm" onclick="replayAction(5)">Run Step 5</button>
            </div>

          </div>

          <div class="card-header" style="margin-top: 10px;">
            <div class="card-title">Replay Execution Audit Trail</div>
            <button class="btn btn-sm btn-subtle" onclick="clearAuditLog()">Clear Log</button>
          </div>
          <div id="full-replay-audit" style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; font-family: var(--font-mono); font-size: 11px; max-height: 200px; overflow-y: auto;">
            [Ready to record replay actions]
          </div>

        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 6: EXPORTS & REPORTS -->
      <!-- ============================================================ -->
      <section id="sec-exports" class="section-pane" style="display: none;">
        
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Machine-Readable Manifest Registry (44 Records)
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-sm btn-primary" onclick="downloadManifestJson()">Download manifest.json</button>
              <button class="btn btn-sm" onclick="downloadManifestCsv()">Download manifest.csv</button>
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">
            The manifest maps every logical source record to its designated markdown output path inside <code>deliverables/exports/route_outputs/</code>.
          </div>

          <div class="table-container">
            <table class="custom-table" id="table-manifest">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Type</th>
                  <th>Source ID</th>
                  <th>Applied Rev</th>
                  <th>Route</th>
                  <th>Output Path</th>
                  <th>Review State</th>
                  <th>Override</th>
                </tr>
              </thead>
              <tbody id="tbody-manifest">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Manager Briefing Section -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Daily Manager Briefing — 21 August 2026 (Asia/Kolkata)</div>
            <button class="btn btn-sm btn-subtle" onclick="downloadFile('manager_brief_2026-08-21.md', briefingMarkdownContent)">Download Markdown</button>
          </div>
          <div style="font-size: 12px; color: var(--text-body); line-height: 1.7; max-height: 300px; overflow-y: auto; background: var(--bg-surface-subtle); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--text-heading); margin-bottom: 6px;">Executive Briefing Summary</h4>
            <p>On Friday, 21 August 2026, SpendNest logged 44 discrete interaction records across phone and conferencing systems. All recorded activity occurred within a single 24-hour cycle (UTC / IST).</p>
            <p style="margin-top: 8px;"><strong>High Priority Follow-ups:</strong> Asterloom Systems (M03: cards vs reimbursement education), Harborpath Advisory (M01: $260 referral link generation), Willowbank Advisory (C07: partnership proposal follow-up Monday), Milan (C03: API follow-up).</p>
            <p style="margin-top: 8px;"><strong>Critical Retention Alerts:</strong> Cedarwave Distribution (M04: card sunset re-KYC churn risk), Willowfield Trust (M07: P1 UI bug ticket dispatched to Engineering).</p>
          </div>
        </div>

      </section>

    </main>

  </div>

  <!-- Toast Notification Container -->
  <div id="toast-root"></div>

  <!-- Client State & Logic -->
  <script>
    const initialBatch = ${JSON.stringify(initialData)};
    const updateBatch = ${JSON.stringify(updateData)};

    // State Store
    const state = {
      records: new Map(), // key: source_type:source_id
      overrides: {},      // key -> { route, reason, timestamp }
      selectedKey: null,
      activeSection: 'overview',
      filters: {
        sourceType: 'all',
        transcript: 'all',
        route: 'all',
        reviewState: 'all',
        searchQuery: ''
      },
      auditLog: []
    };

    const ANALYTICAL_CORPUS = {
      'call:2ec4404c-beee-5377-a63c-aab701da08ed': {
        ref: 'C01',
        title: 'Harborlight Advisory — Cold Outreach Resistance',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Arun cold-called Pranav regarding outsourced finance automation. Pranav reacted negatively to unsolicited outreach on his personal work phone and stated their operations are already automated.',
        evidence: 'Quote: "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don\\'t think this is something we need."',
        doesNotEstablish: 'Does not establish future appetite for corporate cards or whether Pranav is the sole decision maker for finance systems.',
        nextSteps: 'Respect request: mark contact as Do-Not-Call (DNC). Owner: Arun. Review lead qualification sources.',
        coachingNotes: 'Arun remained polite under pressure, but spent too long defending the contact list source rather than pivoting to understand workflow or gracefully exiting.'
      },
      'call:4b870624-8aad-5315-a60e-0db95981cf99': {
        ref: 'C02',
        title: 'Fernhaven Group — Receptionist Voicemail Transfer',
        defaultRoute: 'voicemail_gatekeeper',
        whatHappened: 'Leela contacted Fernhaven Group asking for Leela. Receptionist Kavya informed caller that the contact was out of office and transferred to voicemail.',
        evidence: 'Quote: "It looks as though she isn\\'t in the office today. Would you like to leave a message with me, or would you prefer her voicemail? Her voicemail would be fine, thank you."',
        doesNotEstablish: 'Does not establish contact interest, role seniority, or whether the voicemail box is actively monitored.',
        nextSteps: 'Follow up via email referencing the voicemail. Re-attempt call after 48 hours. Owner: Leela.',
        coachingNotes: 'Standard receptionist transfer handled cleanly; recommended leaving a specific value prop in voicemail.'
      },
      'call:20d509ba-d589-5334-9aef-ea4ce6105b1a': {
        ref: 'C03',
        title: 'Milan — Developer API & Event Notifications Follow-up',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Kiran reconnected with Milan regarding API developer access discussed 5 weeks prior. Milan was outdoors in poor cellular roaming. Milan recalled pricing hesitation and requested an email summary and Monday callback.',
        evidence: 'Quote: "We did ask about some developer functionality, but it isn\\'t essential enough for us to spend much on it... Send the email and we can speak Monday or Tuesday."',
        doesNotEstablish: 'Does not establish whether technical requirements have changed or what exact budget ceiling the team has.',
        nextSteps: 'Send email subject "Developer access and event notifications — follow-up" with transparent pricing tiers. Schedule callback for Monday 10:30 AM IST. Owner: Kiran.',
        coachingNotes: 'Good job adapting to poor audio quality without pushing hard; agreed on email subject line to prevent message from getting lost.'
      },
      'call:bcdcbf56-d338-5c78-9a97-42c2fc1c9931': {
        ref: 'C04',
        title: 'Lanternpath Media — Email Address Correction Follow-up',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Arun left a voicemail for Ritesh regarding expense platform evaluation. Arun noted that earlier information was sent to an incorrect email address and confirmed resending to the corrected address.',
        evidence: 'Quote: "My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us, and I hope you have now had a chance to see it."',
        doesNotEstablish: 'Does not establish whether Ritesh has reviewed the resent deck or if Lanternpath is evaluating competitors.',
        nextSteps: 'Monitor email tracking analytics. If unopened by Monday 2 PM, send SMS/WhatsApp reminder. Owner: Arun.',
        coachingNotes: 'Clear and accountable voicemail message acknowledging the prior email error transparently.'
      },
      'call:75a6b94f-7717-5cfb-9e41-0acc94415e17': {
        ref: 'C05',
        title: 'Retail Chain Lead — Incumbent StoreHarbor Evaluation',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera introduced SpendNest to a multi-store retailer. Prospect stated they already use StoreHarbor and other tools for store expenses and vendor execution. Prospect requested a presentation sent to contact05@example.com for future reference.',
        evidence: 'Quote: "We already have that... There are several [platforms]. One is StoreHarbor, and we use others too. What I suggest is that you send me your presentation."',
        doesNotEstablish: 'Does not establish contract end date with StoreHarbor or any active dissatisfaction with incumbent tools.',
        nextSteps: 'Send presentation highlighting SpendNest\\'s unique automated vendor bank execution vs StoreHarbor. Tag lead for quarterly nurture. Owner: Meera.',
        coachingNotes: 'Meera did well asking clarifying questions on whether the incumbent system executes payments. Next time, probe on multi-location card issuance speed.'
      },
      'call:12216d5c-e254-52c6-b344-47de4c6e1ae5': {
        ref: 'C06',
        title: '120-Store Retailer — Centralized BMS & Mixed Card Model',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Ravi cold-called Nikhil regarding retail store expenses and supplier payments. Nikhil noted they have over 120 stores running a customized, mixed automation model managed directly by head office.',
        evidence: 'Quote: "We have more than a hundred and twenty stores... The essential processes are automated and connected through our business management system... If a particular need comes up later, we will reach out."',
        doesNotEstablish: 'Does not establish whether local branch managers experience friction with cash advances or expense reporting delays.',
        nextSteps: 'Log competitive architecture (in-house BMS + mixed card model). Set CRM task for 6-month check-in. Owner: Ravi.',
        coachingNotes: 'Ravi respected the prospect\\'s boundary when told arrangements were in place, avoiding aggressive pushback.'
      },
      'call:428817fa-7e9e-5418-a7d4-bb396d28dfbf': {
        ref: 'C07',
        title: 'Willowbank Advisory — Overseas Incorporation Partnership',
        defaultRoute: 'partner_channel',
        whatHappened: 'Dev pitched Aditya at Willowbank Advisory on partnering to offer SpendNest virtual accounts to foreign clients incorporating entities. Aditya confirmed they refer clients to digital account providers and agreed to review a proposal sent via chat app, followed by a Monday call.',
        evidence: 'Quote: "Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... message me on our chat app and send whatever proposal you have... call on Monday."',
        doesNotEstablish: 'Does not establish monthly volume of overseas incorporation referrals or current commission expectations.',
        nextSteps: 'Send partnership proposal via WhatsApp/messaging app today. Schedule follow-up call for Monday 11:30 AM IST. Owner: Dev.',
        coachingNotes: 'Strong discovery by Dev identifying the advisory referral motion. Ensure proposal includes clear compliance requirements.'
      },
      'call:129497b2-8e1d-5e01-919c-e8a852b5ff68': {
        ref: 'C08',
        title: 'Multi-Store Lead — Warm Colleague Referral',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Meera pitched Raghav on SpendNest payables and multi-location expense cards. Raghav clarified that people operations handles frontline locations and asked Meera to send a proposal to contact08@example.com referencing his name.',
        evidence: 'Quote: "The colleague handling our people operations also deals with frontline processes and the locations... If you send him a proposal and say you spoke with me, he can take a look."',
        doesNotEstablish: 'Does not establish specific team size, location count, or budget allocation.',
        nextSteps: 'Email proposal to contact08@example.com citing conversation with Raghav. Follow up by phone Wednesday. Owner: Meera.',
        coachingNotes: 'Excellent qualification by Meera; successfully turned a cold call into a warm internal referral.'
      },
      'call:4a1de681-f884-55e8-b1ad-de22d17cd959': {
        ref: 'C09',
        title: '130-Store Retailer — Critical Name-Omission Compliance Alert',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera spoke with Vedant (130 store locations). Vedant explained they built internal software. Vedant suggested contacting business head Mr. Rishabh on professional networking, but EXPLICITLY instructed Meera NOT to mention his name.',
        evidence: 'Quote: "You can find our business head, Mr Rishabh, on a professional networking site... Would it be all right if I mentioned your name when contacting him? No, please don\\'t use my name."',
        doesNotEstablish: 'Does not establish whether Rishabh is open to SaaS alternatives or what gaps exist in their internal software.',
        nextSteps: 'Outreach to Mr. Rishabh on LinkedIn with a fresh, cold positioning on multi-store vendor reconciliations. CRITICAL: Do NOT cite Vedant. Owner: Meera.',
        coachingNotes: 'Outstanding presence of mind by Meera to explicitly ask permission before using Vedant\\'s name. This prevented a major outreach disaster.'
      },
      'call:b747f592-810e-583c-9b81-8db5ab035806': {
        ref: 'C10',
        title: 'Aniket — Sector Change & Outreach Boundary',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera called Aniket regarding Meadowbrick. Aniket stated he left Meadowbrick and now works in manufacturing. Aniket agreed to receive a brief on messaging, but strictly declined a follow-up call, stating he will reach out if interested.',
        evidence: 'Quote: "Are you calling about Meadowbrick? ... I don\\'t work there anymore... Send an explanation of what you do. I will get back to you... Would a follow-up call on Monday... be okay? No. I said I will contact you."',
        doesNotEstablish: 'Does not establish Aniket\\'s new company name, job title, or operational authority in manufacturing.',
        nextSteps: 'Send brief via messaging app. Set CRM contact status to "Inbound Response Only" — do not place unsolicited follow-up calls. Owner: Meera.',
        coachingNotes: 'Meera adapted quickly to the job change, but pushed for a follow-up call after the prospect already indicated low bandwidth. Respect prospect boundary.'
      },
      'meeting:cb5cecac-e68d-52b7-b10b-b0c748efc467': {
        ref: 'M01',
        title: 'Harborpath Advisory — Partner Commission & Tracking Link',
        defaultRoute: 'partner_channel',
        whatHappened: 'Team member A met with Partner A at Harborpath Advisory to establish a referral channel for US virtual accounts. Reviewed $260 account activation bonus, spend bonuses, and agreed on a unique referral tracking link.',
        evidence: 'Turn 9: "The activation payment is USD 260 when a referred company gets its account approved... USD 6,500–32,500 of spend earns a USD 195 bonus..." | Turn 13: "...approval needs incorporation and tax documents... evidence of US operations" | Turn 21: "Then let us use the unique link."',
        doesNotEstablish: 'Does not establish expected monthly onboarding run-rate or customer compliance rejection rates.',
        nextSteps: 'Send partner agreement memorandum for signing; generate unique partner signup link; create shared Google Sheet for lead tracking. Owner: Partnerships.',
        coachingNotes: 'Clear commercial discussion; great explanation of compliance requirements (proof of US operations) to prevent partner friction downstream.'
      },
      'meeting:1a21c409-c050-5787-90af-2667e057e1b6': {
        ref: 'M02',
        title: 'LedgerBridge — E-Invoicing Vendor Evaluation (SpendNest Buyer)',
        defaultRoute: 'vendor_internal_notes',
        whatHappened: 'SpendNest strategy and product leads evaluated LedgerBridge as a technology supplier to provide compliant electronic invoicing APIs across operating markets.',
        evidence: 'Turn 1: "I work on strategy and partnerships at SpendNest... We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets." | Turn 3: "Electronic invoicing is the bigger opportunity. Customers already have approved invoice layouts."',
        doesNotEstablish: 'Does not establish commercial licensing costs, contract terms, or SLA guarantees from LedgerBridge.',
        nextSteps: 'Product/Engineering to review LedgerBridge sandbox API docs and test payload compliance for target jurisdictions. Owner: Product Team.',
        coachingNotes: 'Crucial classification note: SpendNest is the buyer here. Must be excluded from Sales Pipeline and Opportunity metrics.'
      },
      'meeting:398672e7-62dd-5afd-846d-0237d49792fb': {
        ref: 'M03',
        title: 'Asterloom Systems — Card Program Fit & Prepaid Education',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Customer A and finance lead Customer B evaluated SpendNest corporate cards for employee travel (INR 10–13 lakh/month). Surprised to learn cards are prepaid rather than revolving credit.',
        evidence: 'Turn 5: "At present employees spend personally and we reimburse them. Monthly spending might be around INR 10–13 lakh..." | Turn 6: "Wait, these are prepaid? I had thought about a corporate credit card. So we put money in before anyone spends..."',
        doesNotEstablish: 'Does not establish whether prepaid requirement is an absolute dealbreaker or if auto-funding mitigates concern.',
        nextSteps: 'Send detailed explainer on prepaid treasury management (automated top-ups vs cash lockup) and comparative benefits over revolving credit. Schedule follow-up demo. Owner: Sales Rep.',
        coachingNotes: 'Need to proactively address prepaid vs credit positioning early in the sales cycle before demo to prevent buyer surprise.'
      },
      'meeting:b0f79b3d-37ba-52f9-b2bc-58b159dd6d91': {
        ref: 'M04',
        title: 'Cedarwave Distribution — Critical Card Network Migration Risk',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Team member A informed Cedarwave of the mandatory deprecation of their current card network due to acceptance issues, requiring re-KYC and physical card replacement across the organisation within weeks.',
        evidence: 'Turn 2: "We have seen acceptance problems with the existing programme and are proposing a move to a different provider and card network." | Turn 4: "The plan is to close the old programme in the coming weeks, so we need to organise the transition." | Turn 6: "Users need to complete identity checks again because the provider changes."',
        doesNotEstablish: 'Does not establish Cedarwave\\'s willingness to submit all users for re-KYC or whether they are considering competitor solutions.',
        nextSteps: 'Assign dedicated Customer Success manager to create parallel account and shepherd employee re-KYC before sunset date. Flag high churn risk to VP Sales. Owner: Customer Success.',
        coachingNotes: 'High-risk account transition; team handled difficult news transparently but needs structured migration timeline documentation.'
      },
      'meeting:657b9e9d-9472-5b01-a127-a648ad7e8cf7': {
        ref: 'M06',
        title: 'Mapletrail Services — Branch vs HQ Procurement Dynamics',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Team member A conducted discovery with local finance lead of software testing branch. Branch handles local payables independently, but central HQ (65 people) controls core enterprise software and PO workflows.',
        evidence: 'Turn 2: "I handle finance for one branch of Mapletrail Services... locally I cover a broad set of tasks..." | Turn 4: "Roughly 65 people across finance. The business is sizeable, but locally I am the person dealing with operational questions..."',
        doesNotEstablish: 'Does not establish local branch spending limit autonomy or timeline for software vendor evaluation.',
        nextSteps: 'Craft multi-stakeholder strategy: prepare local operational efficiency case for branch lead while initiating contact with central finance leadership. Owner: Enterprise Sales.',
        coachingNotes: 'Good discovery on organizational hierarchy; avoid selling standalone branch solution that gets blocked later by central procurement.'
      },
      'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a': {
        ref: 'M07',
        title: 'Willowfield Trust — P1 UI Bug: Description Save & Recreate Attachment',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Screen-sharing support session with Willowfield Trust. Customer demonstrated that editing event-payment descriptions fails silently (old text persists), and clicking "Recreate payment" blocks document uploads.',
        evidence: 'Turn 2: "The first one is editing the description. I am changing this event-payment description to a short reference and clicking Save changes. Now look at the displayed description again." | Turn 3: "The field still shows the earlier wording. So the change is not appearing after you save, is that right?" | Turn 8: "Next is Recreate payment... When I go through this route, I cannot upload a document."',
        doesNotEstablish: 'Does not establish backend error codes, browser version, or scope of affected tenants.',
        nextSteps: 'File urgent P1 ticket with frontend/backend engineering referencing turns 2-8; capture network inspect logs; send status update to customer within 4 hours. Owner: Technical Support Lead.',
        coachingNotes: 'Late-arriving transcript from update-002 batch. Excellent screen-share troubleshooting by rep; captured exact reproduction steps.'
      },
      'meeting:4b5b9192-f3fc-505a-8e77-4d2ffaa54594': {
        ref: 'M09',
        title: 'Brookmint & Northkite — Multi-Tenant Onboarding & Invitation Reset',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Customer A required support accessing second entity (Brookmint Holdings) after invitation link expired. Clarified trial usage history: only Northkite Equipment used trial, no Brookmint spending.',
        evidence: 'Turn 1: "The invitation for Brookmint Holdings did not work when I tried it. It may have expired..." | Turn 4: "I have sent a new reset invitation." | Turn 7: "No, only Northkite Equipment used the trial. There was no Brookmint Holdings spending in that period."',
        doesNotEstablish: 'Does not establish user permission hierarchy across the two entity accounts.',
        nextSteps: 'Confirm customer accepted the reset invitation; verify independent billing setup for Brookmint Holdings. Owner: Support / Onboarding.',
        coachingNotes: 'Patience exhibited by rep to clarify historical trial confusion; ensure multi-entity account linking documentation is updated.'
      },
      'meeting:337f297d-9385-5b82-9e54-5019c1ed912c': {
        ref: 'M10',
        title: 'Billing Operations — Internal Subscription & Invoicing Walkthrough',
        defaultRoute: 'vendor_internal_notes',
        whatHappened: 'Internal onboarding and walkthrough between trainer Team member A and operations colleague Team member B covering subscription billing, back-office super-admin controls, and invoice clearance cycles.',
        evidence: 'Turn 1: "I will be back for the session" | Turn 2: "We can wait for the trainer to return." | Turn 4: "I have access to a demo account as an administrator, but I do not have the back-office super-admin access..." | Turn 5: "That is a different application. Operations uses it to create accounts, control enabled features and manage billing."',
        doesNotEstablish: 'Does not establish customer deal activity or external pipeline.',
        nextSteps: 'Ensure Team member B is provisioned with sandbox super-admin credentials; store session notes in internal operations wiki. Owner: Operations Trainer.',
        coachingNotes: 'Internal training session; correctly filtered out from external sales performance metrics.'
      }
    };

    const ROUTE_LABELS = {
      sales_coaching: 'Sales Coaching & Guidance',
      deal_next_steps: 'Deal Next Steps',
      customer_support_bugs: 'Support & Bug Escalation',
      vendor_internal_notes: 'Vendor / Internal Ops',
      partner_channel: 'Partner & Channel',
      voicemail_gatekeeper: 'Voicemail / Gatekeeper',
      unusable_intake: 'Silent Telephony Intake'
    };

    const ROUTE_BADGE_CLASS = {
      sales_coaching: 'badge-sky',
      deal_next_steps: 'badge-emerald',
      customer_support_bugs: 'badge-rose',
      vendor_internal_notes: 'badge-purple',
      partner_channel: 'badge-purple',
      voicemail_gatekeeper: 'badge-amber',
      unusable_intake: 'badge-slate'
    };

    function init() {
      // Load saved manual overrides
      const saved = localStorage.getItem('spendnest_manual_overrides');
      if (saved) {
        try { state.overrides = JSON.parse(saved); } catch(e){}
      }

      // Default baseline: apply initial and update
      applyBatch(initialBatch, false);
      applyBatch(updateBatch, false);

      renderAll();
      // Select C01 by default
      selectRecord('call:2ec4404c-beee-5377-a63c-aab701da08ed');
    }

    function applyBatch(batch, log = true) {
      let applied = 0;
      let ignored = 0;

      batch.records.forEach(r => {
        const key = \`\${r.source_type}:\${r.source_id}\`;
        const existing = state.records.get(key);

        if (!existing || batch.revision > existing.applied_revision) {
          state.records.set(key, {
            record_ref: r.record_ref,
            source_type: r.source_type,
            source_id: r.source_id,
            applied_revision: batch.revision,
            payload: r.payload,
            transcript_payload: r.transcript_payload,
            has_usable_transcript: checkTranscript(r)
          });
          applied++;
        } else {
          ignored++;
        }
      });

      if (log) {
        logAudit(\`Ingested batch \${batch.batch_id} (Rev \${batch.revision}): \${applied} updated, \${ignored} ignored.\`);
        showToast(\`Batch \${batch.batch_id} applied: \${applied} records updated\`, 'success');
      }
    }

    function checkTranscript(r) {
      if (r.source_type === 'call') {
        return !!(r.payload && r.payload.transcript && r.payload.transcript.trim());
      } else {
        return !!(r.transcript_payload && r.transcript_payload.turns && r.transcript_payload.turns.length > 0);
      }
    }

    function getEffectiveRoute(rec) {
      const key = \`\${rec.source_type}:\${rec.source_id}\`;
      if (state.overrides[key]) {
        return state.overrides[key].route;
      }
      const a = ANALYTICAL_CORPUS[key];
      return a ? a.defaultRoute : 'unusable_intake';
    }

    function setManualOverride(key, route, reason) {
      state.overrides[key] = {
        route: route,
        reason: reason || 'Manager UI selection',
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('spendnest_manual_overrides', JSON.stringify(state.overrides));
      logAudit(\`Manual override saved for \${key} -> \${route}\`);
      showToast('Manual route override saved & persisted.', 'success');
      renderAll();
      renderDetailPane(key);
    }

    function resetManualOverride(key) {
      delete state.overrides[key];
      localStorage.setItem('spendnest_manual_overrides', JSON.stringify(state.overrides));
      logAudit(\`Manual override cleared for \${key}\`);
      showToast('Reset to automated default route.', 'info');
      renderAll();
      renderDetailPane(key);
    }

    function replayAction(step) {
      const m07Key = 'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a';
      if (step === 1) {
        state.records.clear();
        applyBatch(initialBatch, false);
        logAudit('REPLAY STEP 1: Ingested initial batch (44 records, 17 usable transcripts).');
        showToast('Step 1: Initial batch loaded (44 records, 17 transcripts)', 'success');
      } else if (step === 2) {
        const shuffled = {
          ...initialBatch,
          records: [...initialBatch.records].sort(() => Math.random() - 0.5)
        };
        applyBatch(shuffled, false);
        logAudit('REPLAY STEP 2: Re-imported initial batch in shuffled order. 0 duplicates added.');
        showToast('Step 2: Re-import test verified (0 duplicates added, 44 records intact)', 'success');
      } else if (step === 3) {
        setManualOverride(m07Key, 'customer_support_bugs', 'Manager UI triage: P1 screen-share bug report');
        logAudit('REPLAY STEP 3: M07 route manually overridden to Customer Support / Escalation.');
        showToast('Step 3: M07 route overridden to Customer Support / Bug', 'warning');
        selectRecord(m07Key);
      } else if (step === 4) {
        applyBatch(updateBatch, false);
        logAudit('REPLAY STEP 4: Update batch applied. M07 received Rev 2 with 27 turns. Manual route preserved.');
        showToast('Step 4: Update applied (M07 updated to Rev 2 with 27 turns; override preserved)', 'success');
        selectRecord(m07Key);
      } else if (step === 5) {
        applyBatch(initialBatch, false);
        const m07 = state.records.get(m07Key);
        const ok = m07 && m07.applied_revision === 2 && m07.transcript_payload && m07.transcript_payload.turns.length === 27;
        if (ok) {
          logAudit('REPLAY STEP 5: Regression verified. Revision 1 safely rejected for M07.');
          showToast('Step 5: Regress check PASS (Revision 2 and 27 turns preserved)', 'success');
        } else {
          showToast('Step 5: Regress check FAILED', 'error');
        }
      } else if (step === 0) {
        localStorage.removeItem('spendnest_manual_overrides');
        state.overrides = {};
        state.records.clear();
        applyBatch(initialBatch, false);
        applyBatch(updateBatch, false);
        logAudit('REPLAY RESET: Workspace reset to clean post-update state.');
        showToast('Workspace reset to clean baseline', 'info');
      }
      renderAll();
    }

    function logAudit(msg) {
      const stamp = new Date().toLocaleTimeString();
      const line = \`[\${stamp}] \${msg}\`;
      state.auditLog.unshift(line);
      const el = document.getElementById('full-replay-audit');
      if (el) el.innerHTML = state.auditLog.slice(0, 30).join('<br>');
    }

    function clearAuditLog() {
      state.auditLog = [];
      const el = document.getElementById('full-replay-audit');
      if (el) el.innerHTML = '[Audit log cleared]';
    }

    function navigateSection(sec) {
      state.activeSection = sec;
      document.querySelectorAll('.section-pane').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.rail-item').forEach(el => el.classList.remove('active'));

      const secEl = document.getElementById('sec-' + sec);
      if (secEl) secEl.style.display = 'block';

      const titleMap = {
        overview: 'Overview',
        inbox: 'Intelligence Inbox',
        routing: 'Routing & Review Governance',
        analytics: 'Analytics & Team Performance',
        imports: 'Imports & Replay Verification',
        exports: 'Exports & Machine-Readable Manifests'
      };
      document.getElementById('page-title').innerText = titleMap[sec] || 'Workspace';

      // Highlight active rail button
      const items = document.querySelectorAll('.rail-item');
      if (sec === 'overview') items[0].classList.add('active');
      if (sec === 'inbox') items[1].classList.add('active');
      if (sec === 'routing') items[2].classList.add('active');
      if (sec === 'analytics') items[3].classList.add('active');
      if (sec === 'imports') items[4].classList.add('active');
      if (sec === 'exports') items[5].classList.add('active');
    }

    function setFilter(type, value) {
      state.filters[type] = value;
      // Update UI buttons in panel 1
      if (type === 'sourceType') {
        ['all', 'call', 'meeting'].forEach(v => {
          document.getElementById('filter-type-' + v).classList.toggle('active', v === value);
        });
      }
      if (type === 'transcript') {
        ['all', 'usable', 'silent'].forEach(v => {
          document.getElementById('filter-text-' + v).classList.toggle('active', v === value);
        });
      }
      if (type === 'route') {
        ['all', 'sales_coaching', 'deal_next_steps', 'customer_support_bugs', 'partner_channel', 'vendor_internal_notes'].forEach(v => {
          const btn = document.getElementById('filter-route-' + v);
          if (btn) btn.classList.toggle('active', v === value);
        });
      }
      if (type === 'reviewState') {
        ['all', 'override', 'updated'].forEach(v => {
          document.getElementById('filter-rev-' + v).classList.toggle('active', v === value);
        });
      }
      renderConversationList();
    }

    function onSearchChange(val) {
      state.filters.searchQuery = val.toLowerCase().trim();
      renderConversationList();
    }

    function renderMetrics() {
      const total = state.records.size;
      let usable = 0;
      let overrides = Object.keys(state.overrides).length;

      state.records.forEach(r => {
        if (r.has_usable_transcript) usable++;
      });

      const silent = total - usable;
      const pct = total > 0 ? ((usable / total) * 100).toFixed(1) : 0;

      document.getElementById('stat-total-records').innerText = total;
      document.getElementById('stat-usable-transcripts').innerText = usable;
      document.getElementById('stat-coverage-ratio').innerText = \`\${pct}% coverage (\${usable} of \${total})\`;
      document.getElementById('stat-silent-intake').innerText = silent;
      document.getElementById('stat-override-count').innerText = overrides;
      document.getElementById('rail-inbox-badge').innerText = total;
      document.getElementById('rail-override-badge').innerText = overrides;
      document.getElementById('routing-override-badge').innerText = \`\${overrides} Active Overrides\`;
      document.getElementById('top-status-badge').innerHTML = \`<span class="status-indicator-dot"></span> Replay Active: \${total} Unique Records\`;
    }

    function renderConversationList() {
      const listEl = document.getElementById('inbox-conversations-list');
      listEl.innerHTML = '';

      const recs = Array.from(state.records.values());

      const filtered = recs.filter(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const a = ANALYTICAL_CORPUS[key];
        const hasOverride = !!state.overrides[key];

        // Type filter
        if (state.filters.sourceType !== 'all' && rec.source_type !== state.filters.sourceType) return false;

        // Transcript filter
        if (state.filters.transcript === 'usable' && !rec.has_usable_transcript) return false;
        if (state.filters.transcript === 'silent' && rec.has_usable_transcript) return false;

        // Route filter
        if (state.filters.route !== 'all' && effRoute !== state.filters.route) return false;

        // Review State filter
        if (state.filters.reviewState === 'override' && !hasOverride) return false;
        if (state.filters.reviewState === 'updated' && rec.applied_revision !== 2) return false;

        // Search text
        if (state.filters.searchQuery) {
          const q = state.filters.searchQuery;
          const matchRef = rec.record_ref.toLowerCase().includes(q);
          const matchTitle = (rec.payload.title || rec.payload.contact_name || '').toLowerCase().includes(q);
          const matchQuote = a && (a.title.toLowerCase().includes(q) || a.evidence.toLowerCase().includes(q));
          if (!matchRef && !matchTitle && !matchQuote) return false;
        }

        return true;
      });

      // Sort naturally
      filtered.sort((a, b) => {
        const typeA = a.record_ref.charAt(0);
        const typeB = b.record_ref.charAt(0);
        if (typeA !== typeB) return typeA.localeCompare(typeB);
        return parseInt(a.record_ref.substring(1), 10) - parseInt(b.record_ref.substring(1), 10);
      });

      if (filtered.length === 0) {
        listEl.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted);">No records match criteria.</div>';
        return;
      }

      filtered.forEach(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const hasOverride = !!state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];

        const row = document.createElement('div');
        row.className = \`conv-row \${state.selectedKey === key ? 'active' : ''}\`;
        row.onclick = () => selectRecord(key);

        const title = a ? a.title : (rec.payload.title || \`Call with \${rec.payload.contact_name || 'Contact'}\`);
        const person = rec.source_type === 'call' ? \`Rep: \${rec.payload.rep_name || 'Unknown'}\` : \`Host: \${rec.payload.organizer_email || 'Unknown'}\`;
        const dur = rec.source_type === 'call' ? \`\${rec.payload.duration_seconds || 0}s\` : \`\${Math.round((rec.payload.duration_seconds||0)/60)}m\`;

        row.innerHTML = \`
          <div class="conv-row-header">
            <span class="conv-ref-tag">\${rec.record_ref}</span>
            <span class="conv-row-time">\${dur}</span>
          </div>
          <div class="conv-row-title">\${title}</div>
          <div class="conv-row-meta">
            <span>\${person}</span>
            <span>•</span>
            <span>Rev \${rec.applied_revision}</span>
          </div>
          <div class="conv-row-badges">
            <span class="badge \${rec.source_type === 'call' ? 'badge-sky' : 'badge-purple'}">\${rec.source_type}</span>
            <span class="badge \${ROUTE_BADGE_CLASS[effRoute] || 'badge-slate'}">\${ROUTE_LABELS[effRoute] || effRoute}</span>
            \${hasOverride ? '<span class="badge badge-amber">✎ Override</span>' : ''}
            \${rec.applied_revision === 2 ? '<span class="badge badge-rose">★ Rev 2</span>' : ''}
          </div>
        \`;

        listEl.appendChild(row);
      });
    }

    function selectRecord(key) {
      state.selectedKey = key;
      renderConversationList();
      renderDetailPane(key);
    }

    function renderDetailPane(key) {
      const pane = document.getElementById('inbox-detail-workspace');
      const rec = state.records.get(key);
      if (!rec) return;

      const effRoute = getEffectiveRoute(rec);
      const hasOverride = !!state.overrides[key];
      const a = ANALYTICAL_CORPUS[key];

      const personLabel = rec.source_type === 'call' ? 'Call Rep' : 'Calendar Host';
      const personValue = rec.source_type === 'call' ? rec.payload.rep_name : rec.payload.organizer_email;
      const title = a ? a.title : (rec.payload.title || 'Source Conversation Record');

      pane.innerHTML = \`
        <div class="detail-top-card">
          <div class="detail-heading-row">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="conv-ref-tag" style="font-size: 13px; padding: 2px 8px;">\${rec.record_ref}</span>
              <div class="detail-main-title">\${title}</div>
            </div>
            <div style="display: flex; gap: 6px;">
              <span class="badge \${rec.source_type === 'call' ? 'badge-sky' : 'badge-purple'}">\${rec.source_type}</span>
              <span class="badge \${rec.applied_revision === 2 ? 'badge-rose' : 'badge-slate'}">Revision \${rec.applied_revision}</span>
            </div>
          </div>
          <div class="detail-sub-meta">
            <span><strong>\${personLabel}:</strong> \${personValue}</span>
            <span>•</span>
            <span><strong>Source ID:</strong> <code style="font-family: var(--font-mono); color: var(--text-heading);">\${rec.source_id.substring(0, 18)}...</code></span>
            <span>•</span>
            <span><strong>Duration:</strong> \${rec.payload.duration_seconds || 0} seconds</span>
            <span>•</span>
            <span><strong>Time (UTC):</strong> \${rec.source_type === 'call' ? rec.payload.started_at : rec.payload.starts_at}</span>
          </div>
        </div>

        <!-- Override Bar -->
        <div class="override-action-card">
          <div style="font-size: 12px; font-weight: 700; color: var(--amber-text); display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Manager Routing Control
          </div>
          <div class="override-inputs">
            <select id="sel-override-route" class="select-input">
              <option value="sales_coaching" \${effRoute === 'sales_coaching' ? 'selected' : ''}>Sales Coaching & Guidance</option>
              <option value="deal_next_steps" \${effRoute === 'deal_next_steps' ? 'selected' : ''}>Deal Next Steps</option>
              <option value="customer_support_bugs" \${effRoute === 'customer_support_bugs' ? 'selected' : ''}>Support & Bug Escalation</option>
              <option value="partner_channel" \${effRoute === 'partner_channel' ? 'selected' : ''}>Partner & Channel</option>
              <option value="vendor_internal_notes" \${effRoute === 'vendor_internal_notes' ? 'selected' : ''}>Vendor / Internal Ops</option>
              <option value="voicemail_gatekeeper" \${effRoute === 'voicemail_gatekeeper' ? 'selected' : ''}>Voicemail / Gatekeeper</option>
              <option value="unusable_intake" \${effRoute === 'unusable_intake' ? 'selected' : ''}>Silent Telephony Intake</option>
            </select>
            <button class="btn btn-sm btn-primary" onclick="onSaveOverrideClick('\${key}')">Save Override</button>
            \${hasOverride ? \`<button class="btn btn-sm btn-subtle" onclick="resetManualOverride('\${key}')">Reset</button>\` : ''}
          </div>
        </div>

        <!-- Detail Sub-tabs -->
        <div class="detail-nav-tabs">
          <button class="detail-tab-btn active" id="dtab-btn-analysis" onclick="switchDetailTab('analysis')">Analysis & Findings</button>
          <button class="detail-tab-btn" id="dtab-btn-transcript" onclick="switchDetailTab('transcript')">Verbatim Transcript</button>
          <button class="detail-tab-btn" id="dtab-btn-source" onclick="switchDetailTab('source')">Source Envelope JSON</button>
        </div>

        <div class="detail-tab-content">
          <div id="dtab-pane-analysis">
            \${renderAnalysisPane(rec, a)}
          </div>
          <div id="dtab-pane-transcript" style="display: none;">
            \${renderTranscriptPane(rec)}
          </div>
          <div id="dtab-pane-source" style="display: none;">
            <pre style="background: var(--bg-surface-subtle); padding: 14px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 11px; overflow-x: auto; color: #334155; border: 1px solid var(--border-subtle);">\${JSON.stringify(rec, null, 2)}</pre>
          </div>
        </div>
      \`;
    }

    function switchDetailTab(t) {
      ['analysis', 'transcript', 'source'].forEach(tab => {
        const pane = document.getElementById('dtab-pane-' + tab);
        const btn = document.getElementById('dtab-btn-' + tab);
        if (pane) pane.style.display = tab === t ? 'block' : 'none';
        if (btn) btn.className = \`detail-tab-btn \${tab === t ? 'active' : ''}\`;
      });
    }

    function onSaveOverrideClick(key) {
      const sel = document.getElementById('sel-override-route');
      if (sel) {
        setManualOverride(key, sel.value, 'Manager UI override');
      }
    }

    function renderAnalysisPane(rec, a) {
      if (!a) {
        return \`
          <div class="section-block">
            <div class="section-block-title">Silent Telephony Intake</div>
            <div style="font-size: 12px; color: var(--text-body); line-height: 1.6;">
              This record arrived from upstream telephony / conferencing providers without usable audio or turns.
              Per the data contract, no substantive analysis is fabricated for silent records.
              Record identity is preserved for telephony reconciliation.
            </div>
          </div>
        \`;
      }

      return \`
        <div class="section-block">
          <div class="section-block-title" style="color: var(--primary);">1. What Happened and Why It Matters</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-heading);">\${a.whatHappened}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--amber-text);">2. Transcript Evidence Passage</div>
          <div class="evidence-callout">\${a.evidence}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--rose-text);">3. What the Evidence Does NOT Establish</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-body);">\${a.doesNotEstablish}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--emerald-text);">4. Actionable Next Steps & Stated Owners</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-heading);">\${a.nextSteps}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--purple-text);">5. Sales Coaching / Risk Guidance</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-body);">\${a.coachingNotes}</div>
        </div>
      \`;
    }

    function renderTranscriptPane(rec) {
      if (rec.source_type === 'call') {
        const text = rec.payload.transcript;
        if (!text || !text.trim()) {
          return '<div style="color: var(--text-muted); font-size: 12px;">No transcript audio provided for this call.</div>';
        }
        return \`
          <div class="section-block">
            <div class="section-block-title">Verbatim Adapted Audio Text</div>
            <div style="font-size: 12px; line-height: 1.7; white-space: pre-wrap; color: var(--text-body);">\${text}</div>
          </div>
        \`;
      } else {
        const turns = rec.transcript_payload ? rec.transcript_payload.turns : null;
        if (!turns || turns.length === 0) {
          return '<div style="color: var(--text-muted); font-size: 12px;">No turns supplied for this meeting.</div>';
        }
        return \`
          <div class="turns-list">
            \${turns.map((t, idx) => \`
              <div class="turn-card">
                <div class="turn-top">
                  <span class="turn-author">Turn \${idx + 1} • \${t.speaker}</span>
                  <span class="turn-time-stamp">\${t.timecode || ''}</span>
                </div>
                <div class="turn-speech">\${t.text}</div>
              </div>
            \`).join('')}
          </div>
        \`;
      }
    }

    function renderOverridesTable() {
      const tbody = document.getElementById('tbody-overrides');
      tbody.innerHTML = '';

      const keys = Object.keys(state.overrides);
      if (keys.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No manual overrides active. All records using automated suggestions.</td></tr>';
        return;
      }

      keys.forEach(key => {
        const rec = state.records.get(key);
        if (!rec) return;
        const ov = state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];
        const def = a ? a.defaultRoute : 'unusable_intake';

        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><strong>\${rec.record_ref}</strong></td>
          <td><code style="font-family: var(--font-mono); font-size: 11px;">\${rec.source_id.substring(0, 16)}...</code></td>
          <td><span class="badge \${ROUTE_BADGE_CLASS[ov.route]}">\${ROUTE_LABELS[ov.route] || ov.route}</span></td>
          <td><span style="font-size: 11px; color: var(--text-secondary);">\${ROUTE_LABELS[def]}</span></td>
          <td style="font-size: 11px;">\${ov.reason}</td>
          <td>
            <button class="btn btn-sm btn-subtle" onclick="resetManualOverride('\${key}')">Reset</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function renderManifestTable() {
      const tbody = document.getElementById('tbody-manifest');
      tbody.innerHTML = '';

      const recs = Array.from(state.records.values());
      recs.sort((a, b) => {
        const typeA = a.record_ref.charAt(0);
        const typeB = b.record_ref.charAt(0);
        if (typeA !== typeB) return typeA.localeCompare(typeB);
        return parseInt(a.record_ref.substring(1), 10) - parseInt(b.record_ref.substring(1), 10);
      });

      const folderMap = {
        sales_coaching: 'sales_coaching',
        deal_next_steps: 'deal_next_steps',
        customer_support_bugs: 'customer_support_bugs',
        vendor_internal_notes: 'vendor_internal_notes',
        partner_channel: 'partner_channel',
        voicemail_gatekeeper: 'voicemail_gatekeeper',
        unusable_intake: 'unusable_intake'
      };

      recs.forEach(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const hasOverride = !!state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];

        const path = \`route_outputs/\${folderMap[effRoute]}/\${rec.record_ref}_\${rec.source_type}_\${rec.source_id.substring(0,8)}.md\`;
        const revState = rec.applied_revision === 2 ? 'updated_revision_review' : (a ? 'analyzed' : 'intake_logged');

        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><strong>\${rec.record_ref}</strong></td>
          <td><span class="badge \${rec.source_type === 'call' ? 'badge-sky' : 'badge-purple'}">\${rec.source_type}</span></td>
          <td><code style="font-family: var(--font-mono); font-size: 11px;">\${rec.source_id.substring(0, 16)}...</code></td>
          <td><span class="badge \${rec.applied_revision === 2 ? 'badge-rose' : 'badge-slate'}">Rev \${rec.applied_revision}</span></td>
          <td><span class="badge \${ROUTE_BADGE_CLASS[effRoute]}">\${ROUTE_LABELS[effRoute]}</span></td>
          <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">\${path}</td>
          <td><span class="badge badge-slate">\${revState}</span></td>
          <td>\${hasOverride ? '<span class="badge badge-amber">TRUE</span>' : '<span style="color: var(--text-muted);">false</span>'}</td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function downloadManifestJson() {
      const recs = Array.from(state.records.values());
      const folderMap = {
        sales_coaching: 'sales_coaching',
        deal_next_steps: 'deal_next_steps',
        customer_support_bugs: 'customer_support_bugs',
        vendor_internal_notes: 'vendor_internal_notes',
        partner_channel: 'partner_channel',
        voicemail_gatekeeper: 'voicemail_gatekeeper',
        unusable_intake: 'unusable_intake'
      };

      const manifest = recs.map(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const hasOverride = !!state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];

        return {
          record_ref: rec.record_ref,
          source_type: rec.source_type,
          source_id: rec.source_id,
          applied_revision: rec.applied_revision,
          routes: [ROUTE_LABELS[effRoute] || effRoute],
          output_paths: [\`route_outputs/\${folderMap[effRoute]}/\${rec.record_ref}_\${rec.source_type}_\${rec.source_id.substring(0,8)}.md\`],
          processing_review_state: rec.applied_revision === 2 ? 'updated_revision_review' : (a ? 'analyzed' : 'intake_logged'),
          manual_override: hasOverride,
          analysis_freshness: rec.applied_revision === 2 ? 'fresh_rev2' : (a ? 'fresh_rev1' : 'no_transcript')
        };
      });

      downloadFile('manifest.json', JSON.stringify(manifest, null, 2), 'application/json');
    }

    function downloadManifestCsv() {
      const recs = Array.from(state.records.values());
      const folderMap = {
        sales_coaching: 'sales_coaching',
        deal_next_steps: 'deal_next_steps',
        customer_support_bugs: 'customer_support_bugs',
        vendor_internal_notes: 'vendor_internal_notes',
        partner_channel: 'partner_channel',
        voicemail_gatekeeper: 'voicemail_gatekeeper',
        unusable_intake: 'unusable_intake'
      };

      const headers = ['record_ref', 'source_type', 'source_id', 'applied_revision', 'routes', 'output_paths', 'processing_review_state', 'manual_override', 'analysis_freshness'];
      const rows = recs.map(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const hasOverride = !!state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];

        const path = \`route_outputs/\${folderMap[effRoute]}/\${rec.record_ref}_\${rec.source_type}_\${rec.source_id.substring(0,8)}.md\`;
        const revState = rec.applied_revision === 2 ? 'updated_revision_review' : (a ? 'analyzed' : 'intake_logged');
        const fresh = rec.applied_revision === 2 ? 'fresh_rev2' : (a ? 'fresh_rev1' : 'no_transcript');

        return [
          rec.record_ref,
          rec.source_type,
          rec.source_id,
          rec.applied_revision,
          \`"\${ROUTE_LABELS[effRoute]}"\`,
          \`"\${path}"\`,
          revState,
          hasOverride,
          fresh
        ].join(',');
      });

      downloadFile('manifest.csv', [headers.join(','), ...rows].join('\\n'), 'text/csv');
    }

    function downloadFile(filename, content, type = 'text/plain') {
      const blob = new Blob([content], { type: type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(\`Downloaded \${filename}\`, 'success');
    }

    function showToast(msg, type = 'info') {
      const root = document.getElementById('toast-root');
      const box = document.createElement('div');
      box.className = 'toast-box';
      box.innerHTML = \`<span>\${msg}</span>\`;
      root.appendChild(box);
      setTimeout(() => box.remove(), 3500);
    }

    const briefingMarkdownContent = \`# Executive Manager Briefing: 21 August 2026 (Asia/Kolkata)
[Available in deliverables/exports/route_outputs/manager_brief_2026-08-21.md]\`;

    function renderAll() {
      renderMetrics();
      renderConversationList();
      renderOverridesTable();
      renderManifestTable();
    }

    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
`;

// Write to deliverables/app/index.html
fs.writeFileSync(path.resolve(__dirname, '../app/index.html'), appHtml, 'utf8');

// Also update root app.html
fs.writeFileSync(path.resolve(__dirname, '../../app.html'), appHtml, 'utf8');

console.log('Successfully compiled redesigned Volopay Revenue Intelligence UI:');
console.log('1. deliverables/app/index.html');
console.log('2. app.html (root)');
