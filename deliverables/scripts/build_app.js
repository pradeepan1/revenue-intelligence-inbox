const fs = require('fs');
const path = require('path');

const initialData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/01_initial.json'), 'utf8'));
const updateData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data/02_update.json'), 'utf8'));

// Build the clean analytics dashboard UI with Blue primary accent and neutral status colors
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
      /* Base Canvas & Surfaces */
      --bg-app: #f8fafc;
      --bg-surface: #ffffff;
      --bg-surface-subtle: #f1f5f9;
      --bg-surface-hover: #f8fafc;
      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      --border-focus: #2563eb;
      
      /* Navigation Rail (Compact Charcoal) */
      --nav-bg: #0f172a;
      --nav-surface: #1e293b;
      --nav-text: #94a3b8;
      --nav-text-hover: #f8fafc;
      --nav-border: #334155;
      
      /* Primary Blue Accent (Clean Analytics SaaS) */
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --primary-active: #1e40af;
      --primary-light: #eff6ff;
      --primary-border: #bfdbfe;
      
      /* Typographic Hierarchy */
      --text-heading: #0f172a;
      --text-body: #334155;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      
      /* Semantic Status Badges */
      --emerald-text: #059669;
      --emerald-bg: #ecfdf5;
      --emerald-border: #a7f3d0;
      
      --amber-text: #d97706;
      --amber-bg: #fffbeb;
      --amber-border: #fde68a;
      
      --rose-text: #e11d48;
      --rose-bg: #fff1f2;
      --rose-border: #fecdd3;
      
      --sky-text: #0284c7;
      --sky-bg: #f0f9ff;
      --sky-border: #bae6fd;
      
      --purple-text: #7c3aed;
      --purple-bg: #f5f3ff;
      --purple-border: #ddd6fe;

      --slate-text: #475569;
      --slate-bg: #f1f5f9;
      --slate-border: #cbd5e1;
      
      /* Typography & Shadows */
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
      
      --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
      --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04);
      --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
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

    /* Left Navigation Rail (Dark Charcoal) */
    aside.nav-rail {
      width: 230px;
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
      padding: 18px 16px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .brand-mark {
      width: 30px;
      height: 30px;
      background: var(--primary);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 800;
      font-size: 15px;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
    }
    .brand-title {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.2px;
      line-height: 1.2;
    }
    .brand-sub {
      font-size: 10px;
      color: var(--nav-text);
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 1px;
    }
    .brand-pill {
      background: rgba(37, 99, 235, 0.2);
      color: #93c5fd;
      font-size: 9px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .rail-menu {
      padding: 14px 8px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex: 1;
      overflow-y: auto;
    }
    .rail-heading {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 6px 10px 4px;
    }
    .rail-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: var(--radius-sm);
      color: var(--nav-text);
      text-decoration: none;
      font-weight: 600;
      font-size: 12px;
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
      background: rgba(37, 99, 235, 0.16);
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
      padding: 1px 6px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
    }
    .rail-item.active .rail-badge {
      background: var(--primary);
      color: #fff;
    }

    .rail-footer {
      padding: 12px 14px;
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

    /* Top Bar */
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
      padding: 6px 12px;
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
      box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
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
      padding: 8px 28px;
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

    /* Clean Aligned KPI Cards */
    .stat-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xs);
      padding: 16px 18px;
      position: relative;
      transition: all 0.15s ease;
    }
    .stat-card:hover {
      box-shadow: var(--shadow-sm);
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
      margin-bottom: 6px;
    }
    .stat-card-value {
      font-size: 26px;
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

    /* Progress bar micro-chart */
    .micro-bar-wrap {
      height: 4px;
      background: var(--bg-surface-subtle);
      border-radius: 2px;
      overflow: hidden;
      margin-top: 6px;
    }
    .micro-bar-fill {
      height: 100%;
      background: var(--primary);
      border-radius: 2px;
    }

    /* Cards */
    .card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xs);
      padding: 20px;
      margin-bottom: 20px;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-heading);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Badges & Tags */
    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 7px;
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
      padding: 16px 18px;
      margin-bottom: 12px;
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
      margin-bottom: 6px;
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

    /* ============================================================ */
    /* CLEAN & ALIGNED INTELLIGENCE INBOX LAYOUT                     */
    /* ============================================================ */

    /* A. Page Header */
    .inbox-page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .inbox-header-titles {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .inbox-title {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-heading);
      letter-spacing: -0.4px;
      margin: 0;
      line-height: 1.2;
    }
    .inbox-subtitle {
      font-size: 13px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }
    .inbox-header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .inbox-record-count-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 14px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
      white-space: nowrap;
      height: 40px;
      box-sizing: border-box;
    }

    /* B. Search & Filters Card */
    .inbox-filter-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-bottom: 20px;
      box-shadow: var(--shadow-xs);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Row 1: Search */
    .inbox-search-row {
      width: 100%;
    }
    .inbox-search-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .inbox-search-icon {
      position: absolute;
      left: 14px;
      color: var(--text-muted);
      pointer-events: none;
    }
    .inbox-search-control {
      width: 100%;
      height: 40px;
      padding: 0 40px 0 42px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 13px;
      color: var(--text-heading);
      outline: none;
      transition: all 0.15s ease;
      box-sizing: border-box;
    }
    .inbox-search-control:focus {
      background: #ffffff;
      border-color: var(--border-focus);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
    .inbox-search-clear-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      border-radius: 4px;
    }
    .inbox-search-clear-btn:hover {
      color: var(--text-heading);
      background: var(--border-subtle);
    }

    /* Row 2: Secondary Filter Controls */
    .inbox-filters-row {
      display: flex;
      align-items: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }
    .filter-field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1 1 145px;
      min-width: 130px;
    }
    .filter-field-grow {
      flex: 1.5 1 190px;
      min-width: 170px;
    }
    .filter-action-group {
      flex: 0 0 auto;
      min-width: auto;
    }
    .filter-field-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
      line-height: 1;
    }
    .filter-select-control {
      height: 40px;
      padding: 0 12px;
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 500;
      color: var(--text-heading);
      outline: none;
      cursor: pointer;
      transition: all 0.15s ease;
      box-sizing: border-box;
      width: 100%;
    }
    .filter-select-control:focus {
      border-color: var(--border-focus);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
    .btn-clear-filters {
      height: 40px;
      padding: 0 14px;
      background: transparent;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.15s ease;
      box-sizing: border-box;
    }
    .btn-clear-filters:hover {
      background: var(--bg-surface-subtle);
      border-color: var(--border-strong);
      color: var(--text-heading);
    }

    /* C. Main Inbox Content: Balanced Two-Column Layout */
    .inbox-two-col-layout {
      display: grid;
      grid-template-columns: minmax(320px, 3.8fr) minmax(460px, 6.2fr);
      gap: 20px;
      align-items: start;
    }
    .inbox-col-list, .inbox-col-details {
      min-width: 0;
    }

    /* Left Column: Conversation List */
    .inbox-col-list {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xs);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .inbox-list-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .inbox-list-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .inbox-list-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-heading);
      margin: 0;
    }
    .inbox-results-badge {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--bg-surface-subtle);
      padding: 2px 8px;
      border-radius: 12px;
      border: 1px solid var(--border-subtle);
    }
    .inbox-list-sort-hint {
      font-size: 11px;
      color: var(--text-muted);
    }
    .inbox-cards-scroll {
      max-height: calc(100vh - 270px);
      min-height: 480px;
      overflow-y: auto;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: #fbfcfe;
    }

    /* Individual Conversation Card */
    .conv-card {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.12s ease;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }
    .conv-card:hover {
      border-color: #cbd5e1;
      box-shadow: var(--shadow-xs);
      background: #ffffff;
    }
    .conv-card.active {
      background: #eff6ff;
      border-color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
    }
    .conv-card.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--primary);
      border-radius: var(--radius-sm) 0 0 var(--radius-sm);
    }
    .conv-card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .conv-card-heading-wrap {
      min-width: 0;
      flex: 1;
    }
    .conv-card-org {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-heading);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .conv-card-sub {
      font-size: 11px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
    .conv-card-mid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11px;
    }
    .conv-id-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-secondary);
      background: var(--bg-surface-subtle);
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid var(--border-subtle);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 170px;
    }
    .conv-date-text {
      color: var(--text-muted);
      font-size: 11px;
      white-space: nowrap;
    }
    .conv-card-bottom {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Right Column: Conversation Details */
    .inbox-col-details {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xs);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .detail-top-card {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .detail-heading-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .detail-heading-left {
      min-width: 0;
      flex: 1;
    }
    .detail-org-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-heading);
      letter-spacing: -0.3px;
      line-height: 1.25;
      margin: 0;
      word-break: break-word;
    }
    .detail-subtitle {
      font-size: 12px;
      color: var(--text-secondary);
      margin-top: 4px;
      line-height: 1.4;
    }
    .detail-heading-badges {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    /* Compact Metadata Section */
    .detail-compact-meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 10px;
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 12px 14px;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .meta-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
    }
    .meta-val {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-heading);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .meta-val.mono {
      font-family: var(--font-mono);
      font-size: 11px;
    }

    /* Routing & Review Controls Section */
    .detail-route-control-bar {
      padding: 14px 24px;
      background: #fafbfc;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .route-control-label-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .route-control-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .route-control-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .route-control-select {
      height: 40px;
      padding: 0 12px;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      font-family: var(--font-sans);
      font-size: 12px;
      font-weight: 600;
      color: var(--text-heading);
      background: #ffffff;
      outline: none;
      cursor: pointer;
      box-sizing: border-box;
      min-width: 220px;
    }
    .route-control-select:focus {
      border-color: var(--border-focus);
    }
    .route-override-status-notice {
      padding: 8px 24px;
      background: #fffbeb;
      border-bottom: 1px solid #fde68a;
      font-size: 11px;
      color: #b45309;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Tabs Inside Detail View */
    .detail-nav-tabs {
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: #ffffff;
      gap: 8px;
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
      white-space: nowrap;
    }
    .detail-tab-btn:hover { color: var(--text-heading); }
    .detail-tab-btn.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    .detail-tab-content {
      padding: 20px 24px;
      max-height: calc(100vh - 430px);
      min-height: 380px;
      overflow-y: auto;
    }

    /* Analysis Sections Inside Workspace */
    .section-block {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px 18px;
      margin-bottom: 14px;
      box-shadow: var(--shadow-xs);
    }
    .section-block:last-child {
      margin-bottom: 0;
    }
    .section-block-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 8px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .evidence-callout {
      background: #eff6ff;
      border-left: 3px solid var(--primary);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 12px 16px;
      font-size: 12px;
      line-height: 1.6;
      color: #1e3a8a;
      margin: 8px 0;
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
      padding: 12px 14px;
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
      line-height: 1.6;
    }

    /* Mobile Back Button */
    .mobile-back-btn {
      display: none;
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
      .inbox-two-col-layout {
        grid-template-columns: minmax(280px, 1fr) minmax(360px, 1.4fr);
        gap: 16px;
      }
      .inbox-filter-panel {
        padding: 14px;
      }
      .detail-top-card {
        padding: 16px;
      }
      .detail-tab-content {
        padding: 16px;
      }
    }

    @media (max-width: 768px) {
      .inbox-two-col-layout {
        grid-template-columns: 1fr;
      }
      .inbox-two-col-layout.mobile-detail-active .inbox-col-list {
        display: none;
      }
      .inbox-two-col-layout:not(.mobile-detail-active) .inbox-col-details {
        display: none;
      }
      .mobile-back-btn {
        display: inline-flex;
        margin-bottom: 8px;
      }
      .inbox-filters-row {
        gap: 8px;
      }
      .filter-field-group {
        flex: 1 1 100%;
        min-width: 100%;
      }
    /* Visual Graphs in Intelligence Inbox */
    .inbox-graph-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      margin-bottom: 20px;
      box-shadow: var(--shadow-xs);
    }
    .inbox-graph-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .inbox-graph-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .inbox-graph-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .inbox-graph-legend {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      font-size: 11px;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: all 0.12s ease;
      color: var(--text-secondary);
    }
    .legend-item:hover {
      background: var(--bg-surface-subtle);
      color: var(--text-heading);
    }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .inbox-visual-bar-wrap {
      height: 12px;
      background: #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      width: 100%;
      margin-bottom: 12px;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
    }
    .visual-bar-segment {
      height: 100%;
      transition: width 0.3s ease;
      cursor: pointer;
      position: relative;
    }
    .visual-bar-segment:hover {
      filter: brightness(1.1);
    }
    .inbox-graph-metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      border-top: 1px solid var(--border-subtle);
      padding-top: 12px;
    }
    .graph-mini-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .graph-mini-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .graph-mini-val {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-heading);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Conversation Timeline & Speaker Graph in Detail Pane */
    .speaker-timeline-card {
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 12px 14px;
      margin-bottom: 16px;
    }
    .speaker-timeline-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .speaker-timeline-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-heading);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .timeline-track-wrap {
      position: relative;
      background: #e2e8f0;
      height: 28px;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      gap: 2px;
      padding: 2px;
      box-sizing: border-box;
    }
    .timeline-turn-block {
      flex: 1;
      height: 100%;
      border-radius: 3px;
      cursor: pointer;
      transition: transform 0.15s ease, filter 0.15s ease;
      position: relative;
    }
    .timeline-turn-block:hover {
      transform: scaleY(1.15);
      filter: brightness(1.15);
      z-index: 5;
    }
    .timeline-labels-row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      font-family: var(--font-mono);
      color: var(--text-muted);
      margin-top: 4px;
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
      padding: 9px 12px;
      font-weight: 700;
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-subtle);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 11px;
    }
    table.custom-table td {
      padding: 10px 12px;
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
      padding: 10px 16px;
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-md);
      font-size: 12px;
      font-weight: 500;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* Visual Charts & Progress Bars */
    .chart-card-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chart-bar-row {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .chart-bar-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }
    .chart-bar-label {
      font-weight: 600;
      color: var(--text-heading);
    }
    .chart-bar-badge {
      font-size: 11px;
      color: var(--text-secondary);
      font-weight: 600;
    }
    .chart-bar-track {
      height: 8px;
      background: var(--bg-surface-subtle);
      border-radius: 4px;
      overflow: hidden;
      width: 100%;
      border: 1px solid var(--border-subtle);
    }
    .chart-bar-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.4s ease;
    }
    .audio-gauge-card {
      background: var(--bg-surface-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 14px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .audio-gauge-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .audio-play-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--primary-light);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .audio-waveform-bars {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 24px;
    }
    .wave-bar {
      width: 3px;
      border-radius: 2px;
      background: var(--primary);
      opacity: 0.7;
    }
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
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          <span>Overview</span>
        </div>
      </a>

      <a class="rail-item" onclick="navigateSection('inbox')">
        <div class="rail-item-content">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span>Intelligence Inbox</span>
        </div>
        <span class="rail-badge" id="rail-inbox-badge">44</span>
      </a>

      <a class="rail-item" onclick="navigateSection('routing')">
        <div class="rail-item-content">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <span>Routing & Review</span>
        </div>
        <span class="rail-badge" id="rail-override-badge">0</span>
      </a>

      <a class="rail-item" onclick="navigateSection('analytics')">
        <div class="rail-item-content">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span>Analytics</span>
        </div>
      </a>

      <div class="rail-heading">Operations</div>

      <a class="rail-item" onclick="navigateSection('imports')">
        <div class="rail-item-content">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Imports & Replay</span>
        </div>
        <span class="rail-badge" style="background: rgba(37, 99, 235, 0.2); color: #93c5fd;">Rev 2</span>
      </a>

      <a class="rail-item" onclick="navigateSection('exports')">
        <div class="rail-item-content">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span>Reports & Exports</span>
        </div>
      </a>
    </nav>

    <div class="rail-footer">
      <div class="date-tag">
        <span class="status-indicator-dot"></span>
        <span>21 Aug 2026 (Asia/Kolkata)</span>
      </div>
      <div style="font-size: 10px; color: #64748b; margin-top: 3px;">SpendNest Intelligence</div>
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
          System Active: 44 Conversations
        </span>
        <button class="btn btn-primary btn-sm" onclick="downloadManifestJson()">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export Summary
        </button>
      </div>
    </header>

    <!-- Quick Reliability Testing Bar -->
    <div class="replay-control-bar">
      <div class="replay-info-label">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        System Reliability Tests:
      </div>
      <div class="replay-step-buttons">
        <button class="btn btn-sm" onclick="replayAction(1)" title="Load initial 44 records">1. Initial Load</button>
        <button class="btn btn-sm" onclick="replayAction(2)" title="Confirm duplicate prevention">2. Duplicate Check</button>
        <button class="btn btn-sm" style="border-color: #fde68a; color: #b45309;" onclick="replayAction(3)" title="Save custom route for Willowfield Trust">3. Override M07</button>
        <button class="btn btn-sm btn-primary" onclick="replayAction(4)" title="Apply late 27-part conversation update">4. Update (Rev 2)</button>
        <button class="btn btn-sm" onclick="replayAction(5)" title="Verify old data cannot overwrite new updates">5. Consistency Check</button>
        <button class="btn btn-sm btn-subtle" onclick="replayAction(0)" title="Reset to baseline">Reset</button>
      </div>
    </div>

    <!-- Content Workspace -->
    <main class="content-area">

      <!-- ============================================================ -->
      <!-- SECTION 1: OVERVIEW -->
      <!-- ============================================================ -->
      <section id="sec-overview" class="section-pane">
        
        <!-- Clean Aligned Metric Cards -->
        <div class="stat-cards-grid">
          <div class="stat-card">
            <div class="stat-card-label">Total Conversations</div>
            <div class="stat-card-value" id="stat-total-records">44</div>
            <div class="stat-card-sub">
              <span>30 Phone Calls</span> • <span>14 Video Meetings</span>
            </div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 100%;"></div></div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Complete Transcripts</div>
            <div class="stat-card-value" style="color: var(--primary);" id="stat-usable-transcripts">18</div>
            <div class="stat-card-sub" id="stat-coverage-ratio">
              40.9% coverage (18 of 44)
            </div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 40.9%; background: var(--primary);"></div></div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Calls Without Transcripts</div>
            <div class="stat-card-value" style="color: var(--slate-text);" id="stat-silent-intake">26</div>
            <div class="stat-card-sub">20 Calls • 6 Meetings (Logged)</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 59.1%; background: var(--slate-border);"></div></div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">Manager Custom Routes</div>
            <div class="stat-card-value" style="color: var(--amber-text);" id="stat-override-count">0</div>
            <div class="stat-card-sub">Manual route changes preserved</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 10%; background: var(--amber-text);"></div></div>
          </div>

          <div class="stat-card">
            <div class="stat-card-label">High-Priority Alerts</div>
            <div class="stat-card-value" style="color: var(--rose-text);">2</div>
            <div class="stat-card-sub">Cedarwave (M04) • Willowfield (M07)</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 100%; background: var(--rose-text);"></div></div>
          </div>
        </div>

        <!-- Overview Layout: Insights & Graphical Breakdown -->
        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px;">
          
          <!-- Left Column: Key Customer Insights -->
          <div>
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  Key Customer Insights & Action Items
                </div>
                <span class="badge badge-sky">Verified from Transcripts</span>
              </div>

              <!-- Finding 1 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">1. Supplier Meeting Misclassified as Customer Deal (LedgerBridge)</span>
                  <span class="badge badge-purple">Vendor Partner</span>
                </div>
                <div class="finding-meta">
                  <span>Ref: M02 • Meeting with LedgerBridge</span>
                </div>
                <div class="finding-desc">
                  SpendNest leadership met with API supplier LedgerBridge to evaluate purchasing invoice technology. Correctly marked as Vendor Partner rather than a customer pipeline deal to keep sales forecasts accurate.
                </div>
                <div class="finding-action">
                  <strong>Assigned Action:</strong> Routed to <em>Internal & Vendor Notes</em>.
                </div>
              </div>

              <!-- Finding 2 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">2. Urgent: Payment Software Glitch Reported (Willowfield Trust)</span>
                  <span class="badge badge-rose">Critical Priority</span>
                </div>
                <div class="finding-meta">
                  <span>Ref: M07 • Screen-Share Demonstration</span>
                </div>
                <div class="finding-desc">
                  Customer demonstrated on screen that payment description edits fail silently and recreation blocks document attachments. Arrived with complete 27-part conversation.
                </div>
                <div class="finding-action">
                  <strong>Assigned Action:</strong> Routed to <em>Customer Support & Bugs</em> for urgent developer fix.
                </div>
              </div>

              <!-- Finding 3 -->
              <div class="finding-card">
                <div class="finding-header">
                  <span class="finding-title">3. Privacy Request: Do Not Mention Referral Name (Vedant Outreach)</span>
                  <span class="badge badge-amber">Privacy Notice</span>
                </div>
                <div class="finding-meta">
                  <span>Ref: C09 • Phone Conversation</span>
                </div>
                <div class="finding-desc">
                  Prospect Vedant shared a colleague's contact information but explicitly instructed: <em>"Please don't use my name."</em>
                </div>
                <div class="finding-action">
                  <strong>Assigned Action:</strong> Routed to <em>Sales Coaching & Guidance</em> to enforce privacy instruction.
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Visual Category Distribution Chart & Recent Activity -->
          <div>
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                  Category Distribution Chart
                </div>
                <span class="badge badge-slate">6 Categories</span>
              </div>
              <div class="chart-card-wrap" id="overview-category-chart">
                <!-- Dynamically populated visual progress bars -->
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <div class="card-title">Recent Activity & Data Sync</div>
                <span class="badge badge-emerald">Live Status</span>
              </div>
              <div id="overview-audit-log" style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
                <div>• Initial data loaded: 44 total customer conversations.</div>
                <div>• Update applied: Willowfield Trust (M07) updated with complete 27-part conversation.</div>
                <div>• Deduplication check: Verified 0 duplicate conversations created.</div>
              </div>
            </div>

          </div>

        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 2: INTELLIGENCE INBOX -->
      <!-- ============================================================ -->
      <section id="sec-inbox" class="section-pane" style="display: none;">
        
        <!-- A. Page Header (Single clean row on desktop) -->
        <div class="inbox-page-header">
          <div class="inbox-header-titles">
            <h1 class="inbox-title">Intelligence Inbox</h1>
            <p class="inbox-subtitle">Review conversations, verify evidence, and manage routing.</p>
          </div>
          <div class="inbox-header-actions">
            <div class="inbox-record-count-badge" id="inbox-record-count-badge">
              <span class="status-indicator-dot"></span>
              <span id="inbox-record-count-text">44 records</span>
            </div>
            <button class="btn btn-primary" onclick="downloadManifestJson()">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Report
            </button>
          </div>
        </div>

        <!-- B. Search and Filter Bar -->
        <div class="inbox-filter-panel">
          <!-- Row 1: Search Field -->
          <div class="inbox-search-row">
            <div class="inbox-search-input-wrap">
              <svg class="inbox-search-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="inbox-search-input" class="inbox-search-control" placeholder="Search by customer, company, rep, transcript notes..." oninput="onSearchChange(this.value)">
              <button type="button" id="inbox-search-clear" class="inbox-search-clear-btn" onclick="clearSearch()" title="Clear search" style="display: none;">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <!-- Row 2: Plain-English Dropdown Filters -->
          <div class="inbox-filters-row">
            <div class="filter-field-group">
              <label class="filter-field-label" for="filter-source-type">Source Type</label>
              <select id="filter-source-type" class="filter-select-control" onchange="onFilterChange('sourceType', this.value)">
                <option value="all">All Types</option>
                <option value="call">Phone Calls</option>
                <option value="meeting">Video Meetings</option>
              </select>
            </div>

            <div class="filter-field-group">
              <label class="filter-field-label" for="filter-date">Date</label>
              <select id="filter-date" class="filter-select-control" onchange="onFilterChange('date', this.value)">
                <option value="all">All Dates</option>
                <option value="2026-08-21">21 Aug 2026</option>
              </select>
            </div>

            <div class="filter-field-group filter-field-grow">
              <label class="filter-field-label" for="filter-route">Assigned Route</label>
              <select id="filter-route" class="filter-select-control" onchange="onFilterChange('route', this.value)">
                <option value="all">All Routes</option>
                <option value="sales_coaching">Sales Coaching & Guidance</option>
                <option value="deal_next_steps">Deal Next Steps</option>
                <option value="customer_support_bugs">Customer Support & Bugs</option>
                <option value="partner_channel">Partner Program</option>
                <option value="vendor_internal_notes">Internal & Vendor Notes</option>
                <option value="voicemail_gatekeeper">Voicemail / Gatekeeper</option>
                <option value="unusable_intake">No Transcript Available</option>
              </select>
            </div>

            <div class="filter-field-group">
              <label class="filter-field-label" for="filter-priority">Priority</label>
              <select id="filter-priority" class="filter-select-control" onchange="onFilterChange('priority', this.value)">
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="normal">Normal</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div class="filter-field-group">
              <label class="filter-field-label" for="filter-review-status">Review Status</label>
              <select id="filter-review-status" class="filter-select-control" onchange="onFilterChange('reviewState', this.value)">
                <option value="all">All Statuses</option>
                <option value="needs_review">Needs review</option>
                <option value="override">Manual override</option>
                <option value="updated">Updated transcript</option>
                <option value="silent">No usable transcript</option>
              </select>
            </div>

            <div class="filter-field-group filter-action-group">
              <label class="filter-field-label">&nbsp;</label>
              <button type="button" class="btn-clear-filters" id="btn-clear-filters" onclick="clearAllFilters()" title="Reset all filters">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Clear filters
              </button>
            </div>
          </div>
        </div>

        <!-- Graphical Representation: Interactive Volume & Category Distribution Graph -->
        <div class="inbox-graph-card">
          <div class="inbox-graph-top">
            <div class="inbox-graph-title-wrap">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
              <span class="inbox-graph-title">Conversation Category Distribution</span>
              <span style="font-size: 11px; color: var(--text-muted);">(Click any category below to filter)</span>
            </div>
            <div class="inbox-graph-legend" id="inbox-graph-legend">
              <!-- Dynamically populated -->
            </div>
          </div>
          <!-- Interactive visual bar chart -->
          <div class="inbox-visual-bar-wrap" id="inbox-visual-bar">
            <!-- Dynamically populated -->
          </div>
          <!-- KPI summary sparkline row -->
          <div class="inbox-graph-metrics-grid" id="inbox-graph-stats-row">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- C. Main Inbox Content: Balanced Two-Column Layout -->
        <div class="inbox-two-col-layout" id="inbox-two-col-layout">
          <!-- Left Column: Conversation List (approx 40% width) -->
          <div class="inbox-col-list" id="inbox-col-list">
            <div class="inbox-list-header">
              <div class="inbox-list-title-wrap">
                <h2 class="inbox-list-title">Conversations</h2>
                <span class="inbox-results-badge" id="inbox-results-badge">44 records</span>
              </div>
              <div class="inbox-list-sort-hint">
                <span>Sorted by Reference</span>
              </div>
            </div>

            <div class="inbox-cards-scroll" id="inbox-conversations-list">
              <!-- Dynamically populated cards -->
            </div>
          </div>

          <!-- Right Column: Conversation Details (approx 60% width) -->
          <div class="inbox-col-details" id="inbox-col-details">
            <div id="inbox-detail-workspace">
              <!-- Dynamically populated details workspace -->
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
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Manager Route Adjustments & Custom Assignments
            </div>
            <span class="badge badge-amber" id="routing-override-badge">0 Custom Routes</span>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.6;">
            Managers can reassign any conversation to another team (e.g., Support, Sales, Partnerships). Any manual reassignments are permanently saved even if new data is loaded.
          </div>

          <div class="table-container">
            <table class="custom-table" id="table-overrides">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Conversation</th>
                  <th>Assigned Route</th>
                  <th>Original Route</th>
                  <th>Reason for Change</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="tbody-overrides">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- High-Priority Customer Alerts & Issues -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">High-Priority Customer Alerts & Issues</div>
            <span class="badge badge-rose">Requires Attention</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-heading);">Cedarwave Distribution (M04)</span>
                <span class="badge badge-rose">Card Sunset & ID Verification</span>
              </div>
              <div style="font-size: 12px; color: var(--text-body); line-height: 1.5; margin-bottom: 8px;">
                Existing payment card programme is being replaced due to acceptance issues. All company users must complete identity verification for the new card network.
              </div>
              <div style="font-size: 11px; color: var(--text-secondary);">Assigned Team: Customer Success • High Priority</div>
            </div>

            <div style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-weight: 700; color: var(--text-heading);">Willowfield Trust (M07)</span>
                <span class="badge badge-rose">Critical Software Bug</span>
              </div>
              <div style="font-size: 12px; color: var(--text-body); line-height: 1.5; margin-bottom: 8px;">
                Customer demonstrated that payment description changes do not save and recreating a payment prevents file attachments.
              </div>
              <div style="font-size: 11px; color: var(--text-secondary);">Assigned Team: Technical Support • Bug Ticket Dispatched</div>
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
            <div class="stat-card-label">Outbound Sales Reps</div>
            <div class="stat-card-value">5</div>
            <div class="stat-card-sub">Arun, Leela, Meera, Kiran, Dev</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 100%;"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Meeting Coordinators</div>
            <div class="stat-card-value">10</div>
            <div class="stat-card-sub">Coordinators (team06–team14)</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 100%; background: var(--purple-text);"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Call Transcripts Available</div>
            <div class="stat-card-value" style="color: var(--primary);">33.3%</div>
            <div class="stat-card-sub">10 of 30 calls transcribed</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 33.3%; background: var(--primary);"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Meeting Dialogue Available</div>
            <div class="stat-card-value" style="color: var(--emerald-text);">57.1%</div>
            <div class="stat-card-sub">8 of 14 meetings transcribed</div>
            <div class="micro-bar-wrap"><div class="micro-bar-fill" style="width: 57.1%; background: var(--emerald-text);"></div></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Rep Call Breakdown Chart -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                Call Volume by Team Member (30 Calls)
              </div>
              <span class="badge badge-sky">Direct Outbound</span>
            </div>
            <div class="chart-card-wrap" id="analytics-rep-bars">
              <!-- Dynamically populated visual progress bars -->
            </div>
          </div>

          <!-- Meeting Host Breakdown Chart -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                Meeting Volume by Coordinator (14 Meetings)
              </div>
              <span class="badge badge-purple">Calendar Hosts</span>
            </div>
            <div style="background: var(--bg-surface-subtle); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 11px; color: var(--text-secondary); margin-bottom: 12px; border-left: 3px solid var(--primary);">
              <strong>Note:</strong> A meeting coordinator organizes the calendar invite; attendees and sales reps may vary.
            </div>
            <div class="chart-card-wrap" id="analytics-host-bars">
              <!-- Dynamically populated visual progress bars -->
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
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              System Reliability & Data Verification Tests
            </div>
            <span class="badge badge-emerald">5 Automated Checks</span>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.6;">
            Run these 5 simple checks to verify that data loads accurately, duplicates are ignored, manager route changes are preserved, and updates take effect cleanly.
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 20px;">
            
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 1: Load Initial Records</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Loads initial batch of 44 conversations and 17 transcripts.</div>
              <button class="btn btn-sm btn-primary" onclick="replayAction(1)">Run Step 1</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 2: Check for Duplicate Records</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Re-loads records in random order to confirm zero duplicate records are created.</div>
              <button class="btn btn-sm" onclick="replayAction(2)">Run Step 2</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 3: Save Custom Route Change</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Reassigns Willowfield Trust (M07) to Support & Bug Escalation.</div>
              <button class="btn btn-sm" style="color: var(--amber-text);" onclick="replayAction(3)">Run Step 3</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 4: Load Latest Conversation Update</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Loads complete 27-part conversation for M07; confirms custom route stays intact.</div>
              <button class="btn btn-sm btn-primary" onclick="replayAction(4)">Run Step 4</button>
            </div>

            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; background: #ffffff;">
              <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">Step 5: Verify Data Consistency</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Confirms older files cannot overwrite newer conversation updates.</div>
              <button class="btn btn-sm" onclick="replayAction(5)">Run Step 5</button>
            </div>

          </div>

          <div class="card-header" style="margin-top: 10px;">
            <div class="card-title">System Test Activity Log</div>
            <button class="btn btn-sm btn-subtle" onclick="clearAuditLog()">Clear Log</button>
          </div>
          <div id="full-replay-audit" style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; font-family: var(--font-mono); font-size: 11px; max-height: 200px; overflow-y: auto;">
            [Ready to record system test activity]
          </div>

        </div>

      </section>

      <!-- ============================================================ -->
      <!-- SECTION 6: REPORTS & EXPORTS -->
      <!-- ============================================================ -->
      <section id="sec-exports" class="section-pane" style="display: none;">
        
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Export Center & Activity Manifest (44 Records)
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-sm btn-primary" onclick="downloadManifestJson()">Download JSON</button>
              <button class="btn btn-sm" onclick="downloadManifestCsv()">Download CSV</button>
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">
            The manifest lists all 44 conversations, their assigned team routes, and where each summary document is stored.
          </div>

          <div class="table-container">
            <table class="custom-table" id="table-manifest">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Type</th>
                  <th>Conversation ID</th>
                  <th>Version</th>
                  <th>Assigned Route</th>
                  <th>Summary Document Path</th>
                  <th>Review Status</th>
                  <th>Custom Route</th>
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
            <p style="margin-top: 8px;"><strong>Critical Customer Alerts:</strong> Cedarwave Distribution (M04: card sunset re-KYC churn risk), Willowfield Trust (M07: critical software glitch ticket dispatched to Engineering).</p>
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
        date: 'all',
        route: 'all',
        priority: 'all',
        reviewState: 'all',
        searchQuery: ''
      },
      auditLog: []
    };

    const ANALYTICAL_CORPUS = {
      'call:2ec4404c-beee-5377-a63c-aab701da08ed': {
        ref: 'C01',
        title: 'Harborlight Advisory — Cold Outreach Resistance & Lead Sourcing Friction',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Arun cold-called Pranav regarding outsourced finance automation. Pranav expressed immediate irritation at unsolicited calls on his business phone and confirmed their finance operations are already automated.',
        evidence: 'Quote: "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don\\'t think this is something we need."',
        doesNotEstablish: 'Does not establish future appetite for corporate cards or whether Pranav is the sole decision maker for finance systems.',
        nextSteps: 'Respect request: mark contact as Do-Not-Call (DNC). Owner: Arun. Review lead sourcing to prevent low-intent outreach.',
        coachingNotes: 'Arun remained polite under pressure, but spent too long defending the contact list source ("professional networking outreach programme") rather than pivoting to understand workflow or gracefully exiting.'
      },
      'call:4b870624-8aad-5315-a60e-0db95981cf99': {
        ref: 'C02',
        title: 'Fernhaven Group — Receptionist Voicemail Transfer',
        defaultRoute: 'voicemail_gatekeeper',
        whatHappened: 'Leela contacted Fernhaven Group asking for Leela. Receptionist Kavya informed caller that the contact was out of office and transferred to voicemail.',
        evidence: 'Quote: "It looks as though she isn\\'t in the office today. Would you like to leave a message with me, or would you prefer her voicemail? Her voicemail would be fine, thank you."',
        doesNotEstablish: 'Does not establish contact interest, role seniority, or whether the voicemail box is actively monitored.',
        nextSteps: 'Follow up via email referencing the voicemail. Re-attempt call after 48 hours. Owner: Leela.',
        coachingNotes: 'Standard receptionist transfer handled cleanly; recommended adding a specific value prop in the voicemail rather than a generic callback request.'
      },
      'call:20d509ba-d589-5334-9aef-ea4ce6105b1a': {
        ref: 'C03',
        title: 'Milan — Developer API Access & Event Notifications Follow-up',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Kiran reconnected with Milan regarding API developer access discussed 5 weeks prior. Milan was outdoors in poor cellular roaming. Milan recalled pricing hesitation and requested an email summary and Monday callback.',
        evidence: 'Quote: "We did ask about some developer functionality, but it isn\\'t essential enough for us to spend much on it... Send the email and we can speak Monday or Tuesday."',
        doesNotEstablish: 'Does not establish whether technical requirements have changed or what exact budget ceiling the team has.',
        nextSteps: 'Send email subject "Developer access and event notifications — follow-up" with transparent pricing tiers. Schedule callback for Monday 10:30 AM IST. Owner: Kiran.',
        coachingNotes: 'Good job adapting to poor audio quality without pushing hard; agreed on email subject line to prevent message from getting lost in spam.'
      },
      'call:bcdcbf56-d338-5c78-9a97-42c2fc1c9931': {
        ref: 'C04',
        title: 'Lanternpath Media — Email Correction Follow-up (Voicemail, is_connected=false)',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Arun placed an outbound call to Ritesh at Lanternpath Media regarding expense management software. The call reached voicemail (source metadata explicitly reflects is_connected: false and observed_outcome: "voicemail"). Arun left a message explaining that earlier information was sent to an incorrect email address and confirmed resending to the corrected address.',
        evidence: 'Metadata: is_connected=false, observed_outcome="voicemail". Quote: "My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us, and I hope you have now had a chance to see it. Please call me back to let me know where things stand."',
        doesNotEstablish: 'Does not establish whether Ritesh has opened or reviewed the resent presentation, or whether Lanternpath has an active timeline.',
        nextSteps: 'Check email tracking telemetry for document opens. If unopened by Monday 2:00 PM, send WhatsApp text. Owner: Arun.',
        coachingNotes: 'Accurately classified as a voicemail follow-up with is_connected=false. Rep was transparent about the previous internal mailing error.'
      },
      'call:75a6b94f-7717-5cfb-9e41-0acc94415e17': {
        ref: 'C05',
        title: 'Retail Chain Lead — Incumbent StoreHarbor Evaluation & Presentation Request',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera introduced SpendNest to a multi-store retailer. Prospect stated they already use StoreHarbor and other tools for store expenses and vendor execution. Prospect requested a presentation sent to contact05@example.com for future reference.',
        evidence: 'Quote: "We already have that... There are several [platforms]. One is StoreHarbor, and we use others too. What I suggest is that you send me your presentation. If we ever decide to change the providers we already have, we could consider it then."',
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
        coachingNotes: 'Ravi respected the prospect\\'s boundary when told arrangements were in place, avoiding aggressive pushback that could burn the relationship.'
      },
      'call:428817fa-7e9e-5418-a7d4-bb396d28dfbf': {
        ref: 'C07',
        title: 'Willowbank Advisory — Initial Partnership Outreach (Early Stage)',
        defaultRoute: 'partner_channel',
        whatHappened: 'Dev initiated cold exploratory outreach to Aditya at Willowbank Advisory regarding virtual business accounts for foreign companies incorporating in overseas jurisdictions. Aditya confirmed they routinely refer clients to digital account providers and agreed to review a proposal sent on their chat app, followed by a Monday check-in call.',
        evidence: 'Quote: "Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... message me on our chat app and send whatever proposal you have... call on Monday to see whether you\\'d like to discuss it further? Yes, that\\'s fine."',
        doesNotEstablish: 'Does not establish referral volume, commercial agreement, or signed partnership terms. Unlike M01 (which has negotiated $260 commissions and tracking links), C07 is strictly top-of-funnel exploratory outreach.',
        nextSteps: 'Send concise introductory partnership overview via chat app today. Schedule follow-up call for Monday 11:30 AM IST. Owner: Dev.',
        coachingNotes: 'Important taxonomy distinction: C07 is early exploratory outreach; M01 is mature partner onboarding. Keep separate in pipeline metrics.'
      },
      'call:129497b2-8e1d-5e01-919c-e8a852b5ff68': {
        ref: 'C08',
        title: 'Multi-Store Lead — Warm Colleague Referral to People Operations',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Meera pitched Raghav on SpendNest payables and multi-location expense cards. Raghav clarified that people operations handles frontline locations and asked Meera to send a proposal to contact08@example.com referencing his name.',
        evidence: 'Quote: "The colleague handling our people operations also deals with frontline processes and the locations... If you send him a proposal and say you spoke with me, he can take a look."',
        doesNotEstablish: 'Does not establish specific team size, location count, or budget allocation.',
        nextSteps: 'Email proposal to contact08@example.com citing conversation with Raghav. Follow up by phone Wednesday. Owner: Meera.',
        coachingNotes: 'Excellent qualification by Meera; successfully turned a cold call into a warm internal referral.'
      },
      'call:4a1de681-f884-55e8-b1ad-de22d17cd959': {
        ref: 'C09',
        title: '130-Store Retailer — Critical Privacy & Name-Omission Compliance Mandate',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera spoke with Vedant regarding multi-store expense management. Vedant stated they built in-house software, but suggested contacting their business head Mr. Rishabh on professional networking. When Meera asked if she could mention Vedant\\'s name, Vedant strictly commanded: "No, please don\\'t use my name."',
        evidence: 'Verbatim Quote: "You can find our business head, Mr Rishabh, on a professional networking site... Would it be all right if I mentioned your name when contacting him? No, please don\\'t use my name."',
        doesNotEstablish: 'Does not establish whether Rishabh is actively seeking software replacements or what specific gaps exist in their internal tool.',
        nextSteps: 'Initiate cold outreach to Mr. Rishabh on LinkedIn. CRITICAL PRIVACY RULE: Do NOT reference Vedant or imply an internal tip-off. Violation will breach prospect trust and damage SpendNest reputation. Owner: Meera.',
        coachingNotes: 'Outstanding presence of mind by Meera to explicitly request permission before citing a referral source. This saved the company from a severe compliance violation.'
      },
      'call:b747f592-810e-583c-9b81-8db5ab035806': {
        ref: 'C10',
        title: 'Aniket — Prospect Job Transition & Strict Follow-Up Boundary',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Meera called Aniket regarding Meadowbrick. Aniket stated he left Meadowbrick and now works in manufacturing. Aniket agreed to receive a brief on messaging, but strictly declined a follow-up call, stating he will reach out if interested.',
        evidence: 'Quote: "Are you calling about Meadowbrick? ... I don\\'t work there anymore... Send an explanation of what you do. I will get back to you... Would a follow-up call on Monday... be okay? No. I said I will contact you."',
        doesNotEstablish: 'Does not establish Aniket\\'s new company name, job title, or operational authority in manufacturing.',
        nextSteps: 'Send brief via messaging app. Set CRM contact status to "Inbound Response Only" — do not place unsolicited follow-up calls. Owner: Meera.',
        coachingNotes: 'Meera adapted quickly to the job change, but pushed for a follow-up call after the prospect already indicated low bandwidth. Respect prospect boundary.'
      },
      'meeting:cb5cecac-e68d-52b7-b10b-b0c748efc467': {
        ref: 'M01',
        title: 'Harborpath Advisory — Mature Channel Onboarding & Dedicated Referral Link',
        defaultRoute: 'partner_channel',
        whatHappened: 'Team member A conducted an advanced partner onboarding meeting with Partner A at Harborpath Advisory. Reviewed the agreed commercial structure ($260 activation bonus, spend tier bonuses of $195 and $390, volume bonus for every 5th referral). Partner A insisted on a unique referral tracking link to scale client introductions rather than writing individual emails.',
        evidence: 'Turn 9: "The activation payment is USD 260 when a referred company gets its account approved... USD 6,500–32,500 of spend earns a USD 195 bonus..." | Turn 13: "...approval needs incorporation and tax documents... evidence of US operations" | Turn 20: "It cannot depend on me manually writing every email. This needs to scale..." | Turn 21: "Then let us use the unique link."',
        doesNotEstablish: 'Does not establish expected monthly onboarding run-rate or customer compliance rejection rates.',
        nextSteps: 'Send partner agreement memorandum for signing; generate unique partner signup link; create shared Google Sheet for lead tracking. Owner: Partnerships.',
        coachingNotes: 'Advanced channel deal with confirmed economics. Contrast with C07, which is only preliminary discovery.'
      },
      'meeting:1a21c409-c050-5787-90af-2667e057e1b6': {
        ref: 'M02',
        title: 'LedgerBridge — Electronic Invoicing Vendor Evaluation (SpendNest as Buyer)',
        defaultRoute: 'vendor_internal_notes',
        whatHappened: 'SpendNest strategy and product leads evaluated LedgerBridge as an e-invoicing technology provider to enable compliant electronic invoice generation and reception across operating jurisdictions. Stored CRM metadata classifies all meetings as customer sales, but SpendNest is the buyer in this session.',
        evidence: 'Turn 1: "I work on strategy and partnerships at SpendNest... We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets. My colleague leads the product side." | Turn 2: "Supplier A: Then I will cover the market strategy as well as the technical integration..." | Turn 3: "Team member B: Electronic invoicing is the bigger opportunity. Customers already have approved invoice layouts."',
        doesNotEstablish: 'Does not establish software licensing costs, contract terms, or SLA commitments from LedgerBridge.',
        nextSteps: 'Product & Engineering team to review LedgerBridge sandbox API documentation and test JSON payload compliance. Owner: Product Team.',
        coachingNotes: 'CRITICAL PIPELINE RULE: SpendNest is the prospective customer/buyer here. Exclude from sales conversion funnels and ARR pipeline forecasts.'
      },
      'meeting:398672e7-62dd-5afd-846d-0237d49792fb': {
        ref: 'M03',
        title: 'Asterloom Systems — Card Program Fit & Prepaid Treasury Education',
        defaultRoute: 'deal_next_steps',
        whatHappened: 'Customer A and finance lead Customer B evaluated SpendNest corporate cards for employee travel (INR 10–13 lakh/month). Surprised to learn cards are prepaid rather than revolving credit.',
        evidence: 'Turn 5: "At present employees spend personally and we reimburse them. Monthly spending might be around INR 10–13 lakh..." | Turn 6: "Wait, these are prepaid? I had thought about a corporate credit card. So we put money in before anyone spends..."',
        doesNotEstablish: 'Does not establish whether prepaid requirement is an absolute dealbreaker or if auto-funding mitigates concern.',
        nextSteps: 'Send detailed explainer on prepaid treasury management (automated top-ups vs cash lockup) and comparative benefits over revolving credit. Schedule follow-up demo. Owner: Sales Rep.',
        coachingNotes: 'Need to proactively address prepaid vs credit positioning early in the sales cycle before demo to prevent buyer surprise.'
      },
      'meeting:b0f79b3d-37ba-52f9-b2bc-58b159dd6d91': {
        ref: 'M04',
        title: 'Cedarwave Distribution — Critical Card Network Migration & Re-KYC Risk',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Team member A informed Cedarwave of the mandatory deprecation of their current card network due to merchant acceptance issues, requiring complete identity re-KYC and physical card replacement across the organisation within weeks.',
        evidence: 'Turn 2: "We have seen acceptance problems with the existing programme and are proposing a move to a different provider and card network." | Turn 4: "The plan is to close the old programme in the coming weeks, so we need to organise the transition." | Turn 6: "Users need to complete identity checks again because the provider changes."',
        doesNotEstablish: 'Does not establish Cedarwave\\'s willingness to submit all users for re-KYC or whether they are actively reviewing competitor solutions.',
        nextSteps: 'Assign dedicated Customer Success manager to create parallel account and shepherd employee re-KYC before sunset date. Flag high churn risk to VP Sales. Owner: Customer Success.',
        coachingNotes: 'High-risk account transition; team handled difficult news transparently but needs structured migration timeline documentation.'
      },
      'meeting:657b9e9d-9472-5b01-a127-a648ad7e8cf7': {
        ref: 'M06',
        title: 'Mapletrail Services — Branch vs Central HQ Procurement Dynamics',
        defaultRoute: 'sales_coaching',
        whatHappened: 'Team member A conducted discovery with local finance lead of software testing branch. Branch handles local payables independently, but central HQ (65 people) controls core enterprise software and PO workflows.',
        evidence: 'Turn 2: "I handle finance for one branch of Mapletrail Services... locally I cover a broad set of tasks..." | Turn 4: "Roughly 65 people across finance. The business is sizeable, but locally I am the person dealing with operational questions..."',
        doesNotEstablish: 'Does not establish local branch spending limit autonomy or timeline for software vendor evaluation.',
        nextSteps: 'Craft multi-stakeholder strategy: prepare local operational efficiency case for branch lead while initiating contact with central finance leadership. Owner: Enterprise Sales.',
        coachingNotes: 'Good discovery on organizational hierarchy; avoid selling standalone branch solution that gets blocked later by central procurement.'
      },
      'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a': {
        ref: 'M07',
        title: 'Willowfield Trust — Late-Arriving Update: P1 UI Bug Triage & Screen-Share Proof',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Meeting M07 arrived in delivery batch update-002 with Revision 2 and 27 detailed turns. Customer A shared their screen to demonstrate two critical platform defects: editing event-payment descriptions fails silently (the old wording remains displayed after saving), and clicking "Recreate payment" blocks document attachments ("A new attachment is not being accepted").',
        evidence: 'Turn 2: "The first one is editing the description. I am changing this event-payment description to a short reference and clicking Save changes. Now look at the displayed description again." | Turn 3: "The field still shows the earlier wording. So the change is not appearing after you save, is that right?" | Turn 8: "Next is Recreate payment. Can we look at that here? When I go through this route, I cannot upload a document." | Turn 9: "A new attachment is not being accepted."',
        doesNotEstablish: 'Does not establish backend error stack traces, browser environment, or whether the defect affects all tenants or only Willowfield Trust.',
        nextSteps: 'File urgent P1 Engineering Bug ticket with transcript turns 2–9 and screenshots attached. Provide manual database description correction for Willowfield Trust and confirm fix within 4 hours. Owner: Technical Support Lead.',
        coachingNotes: 'Late transcript from update-002 batch. Rep conducted rigorous live screen-share reproduction. Properly classified as Customer Support rather than a routine account review.'
      },
      'meeting:4b5b9192-f3fc-505a-8e77-4d2ffaa54594': {
        ref: 'M09',
        title: 'Brookmint & Northkite — Multi-Entity Account Setup & Invitation Reset',
        defaultRoute: 'customer_support_bugs',
        whatHappened: 'Customer A required support accessing second entity (Brookmint Holdings) after invitation link expired. Clarified trial usage history: only Northkite Equipment used trial, no Brookmint spending.',
        evidence: 'Turn 1: "The invitation for Brookmint Holdings did not work when I tried it. It may have expired..." | Turn 4: "I have sent a new reset invitation." | Turn 7: "No, only Northkite Equipment used the trial. There was no Brookmint Holdings spending in that period."',
        doesNotEstablish: 'Does not establish user permission hierarchy across the two entity accounts.',
        nextSteps: 'Confirm customer accepted the reset invitation; verify independent billing setup for Brookmint Holdings. Owner: Support / Onboarding.',
        coachingNotes: 'Patience exhibited by rep to clarify historical trial confusion; ensure multi-entity account linking documentation is updated.'
      },
      'meeting:337f297d-9385-5b82-9e54-5019c1ed912c': {
        ref: 'M10',
        title: 'Billing Operations — Internal Training Walkthrough (NOT a Sales Opportunity)',
        defaultRoute: 'vendor_internal_notes',
        whatHappened: 'Internal onboarding and walkthrough between trainer Team member A and operations colleague Team member B covering subscription billing, back-office super-admin demo accounts, and invoice clearance cycles. Stored CRM metadata classifies all meetings identically, but this is an internal employee training session.',
        evidence: 'Turn 1: "I am finishing another call. Give me a couple of minutes and I will be back for the session." | Turn 2: "We can wait for the trainer to return." | Turn 3: "Yesterday we covered the subscription side of billing. Any questions before I show the remaining part, how invoices are generated and cleared?" | Turn 4: "I have access to a demo account as an administrator, but I do not have the back-office super-admin access you mentioned." | Turn 5: "That is a different application. Operations uses it to create accounts, control enabled features and manage billing."',
        doesNotEstablish: 'Does not establish any external customer deal activity, commercial contract negotiation, or prospect pipeline.',
        nextSteps: 'Ensure Team member B is provisioned with sandbox super-admin credentials; archive session recording in internal operations wiki. Owner: Operations Trainer.',
        coachingNotes: 'TAXONOMY GOVERNANCE: Strictly an internal operations walkthrough. Excluded from sales performance quotas and deal pipeline.'
      }
    };

    const ROUTE_LABELS = {
      sales_coaching: 'Sales Coaching & Guidance',
      deal_next_steps: 'Deal Next Steps',
      customer_support_bugs: 'Support & Bug Escalation',
      vendor_internal_notes: 'Vendor / Internal Ops',
      partner_channel: 'Partner & Channel',
      voicemail_gatekeeper: 'Voicemail / Gatekeeper',
      unusable_intake: 'Logged Without Transcripts'
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
      const saved = localStorage.getItem('spendnest_manual_overrides');
      if (saved) {
        try { state.overrides = JSON.parse(saved); } catch(e){}
      }

      applyBatch(initialBatch, false);
      applyBatch(updateBatch, false);

      renderAll();
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
        exports: 'Reports & Exports'
      };
      document.getElementById('page-title').innerText = titleMap[sec] || 'Workspace';

      const items = document.querySelectorAll('.rail-item');
      if (sec === 'overview') items[0].classList.add('active');
      if (sec === 'inbox') items[1].classList.add('active');
      if (sec === 'routing') items[2].classList.add('active');
      if (sec === 'analytics') items[3].classList.add('active');
      if (sec === 'imports') items[4].classList.add('active');
      if (sec === 'exports') items[5].classList.add('active');
    }

    // Plain-English Helper Extractors
    function getRecordContactOrOrg(rec) {
      const key = \`\${rec.source_type}:\${rec.source_id}\`;
      const a = ANALYTICAL_CORPUS[key];
      if (a && a.title) {
        const parts = a.title.split(' — ');
        if (parts[0]) return parts[0].trim();
      }
      if (rec.payload.company_name) return rec.payload.company_name;
      if (rec.payload.contact_name) return rec.payload.contact_name;
      if (rec.payload.title) return rec.payload.title;
      return rec.source_type === 'call' ? \`Phone Call #\${rec.record_ref}\` : \`Video Meeting #\${rec.record_ref}\`;
    }

    function getRecordSubtitle(rec) {
      const key = \`\${rec.source_type}:\${rec.source_id}\`;
      const a = ANALYTICAL_CORPUS[key];
      if (a && a.title) {
        const parts = a.title.split(' — ');
        if (parts.length > 1) return parts.slice(1).join(' — ').trim();
      }
      if (rec.payload.contact_name && rec.payload.rep_name) {
        return \`With \${rec.payload.contact_name} (Rep: \${rec.payload.rep_name})\`;
      }
      if (rec.payload.rep_name) return \`Conducted by \${rec.payload.rep_name}\`;
      if (rec.payload.organizer_email) return \`Host: \${rec.payload.organizer_email}\`;
      return 'Logged customer conversation';
    }

    function formatRecordDate(rec) {
      const ts = rec.source_type === 'call' ? rec.payload.started_at : rec.payload.starts_at;
      if (!ts) return '21 Aug 2026';
      try {
        const d = new Date(ts);
        const hours = String(d.getUTCHours()).padStart(2, '0');
        const mins = String(d.getUTCMinutes()).padStart(2, '0');
        return \`21 Aug 2026, \${hours}:\${mins} UTC\`;
      } catch(e) {
        return '21 Aug 2026';
      }
    }

    function getRecordPriority(rec) {
      if (rec.record_ref === 'M04' || rec.record_ref === 'M07') return 'high';
      if (rec.has_usable_transcript) return 'normal';
      return 'low';
    }

    function getRecordReviewStatus(rec) {
      const key = \`\${rec.source_type}:\${rec.source_id}\`;
      if (state.overrides[key]) return { label: 'Manual override', class: 'badge-amber', code: 'override' };
      if (rec.applied_revision === 2) return { label: 'Updated transcript', class: 'badge-rose', code: 'updated' };
      if (rec.has_usable_transcript) return { label: 'Needs review', class: 'badge-sky', code: 'needs_review' };
      return { label: 'No usable transcript', class: 'badge-slate', code: 'silent' };
    }

    // Filter Handlers
    function onFilterChange(type, value) {
      state.filters[type] = value;
      renderConversationList();
      renderInboxGraph();
    }

    function onSearchChange(val) {
      state.filters.searchQuery = val.toLowerCase().trim();
      const clearBtn = document.getElementById('inbox-search-clear');
      if (clearBtn) clearBtn.style.display = state.filters.searchQuery ? 'inline-flex' : 'none';
      renderConversationList();
      renderInboxGraph();
    }

    function clearSearch() {
      const input = document.getElementById('inbox-search-input');
      if (input) input.value = '';
      onSearchChange('');
    }

    function clearAllFilters() {
      state.filters = {
        sourceType: 'all',
        date: 'all',
        route: 'all',
        priority: 'all',
        reviewState: 'all',
        searchQuery: ''
      };
      ['filter-source-type', 'filter-date', 'filter-route', 'filter-priority', 'filter-review-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 'all';
      });
      const sInput = document.getElementById('inbox-search-input');
      if (sInput) sInput.value = '';
      const sClear = document.getElementById('inbox-search-clear');
      if (sClear) sClear.style.display = 'none';
      renderConversationList();
      renderInboxGraph();
    }

    function setFilter(type, value) {
      onFilterChange(type, value);
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

      const elTotal = document.getElementById('stat-total-records');
      if (elTotal) elTotal.innerText = total;
      const elUsable = document.getElementById('stat-usable-transcripts');
      if (elUsable) elUsable.innerText = usable;
      const elCov = document.getElementById('stat-coverage-ratio');
      if (elCov) elCov.innerText = \`\${pct}% coverage (\${usable} of \${total})\`;
      const elSilent = document.getElementById('stat-silent-intake');
      if (elSilent) elSilent.innerText = silent;
      const elOver = document.getElementById('stat-override-count');
      if (elOver) elOver.innerText = overrides;
      
      const rBadge = document.getElementById('rail-inbox-badge');
      if (rBadge) rBadge.innerText = total;
      const rOver = document.getElementById('rail-override-badge');
      if (rOver) rOver.innerText = overrides;
      const routBadge = document.getElementById('routing-override-badge');
      if (routBadge) routBadge.innerText = \`\${overrides} Custom Routes\`;
      const tBadge = document.getElementById('top-status-badge');
      if (tBadge) tBadge.innerHTML = \`<span class="status-indicator-dot"></span> System Active: \${total} Conversations\`;
    }

    // Graphical Representation: Interactive Category Graph in Intelligence Inbox
    function renderInboxGraph() {
      const barEl = document.getElementById('inbox-visual-bar');
      const legendEl = document.getElementById('inbox-graph-legend');
      const statsEl = document.getElementById('inbox-graph-stats-row');
      if (!barEl || !legendEl || !statsEl) return;

      const recs = Array.from(state.records.values());
      const total = recs.length || 1;
      
      const counts = {
        sales_coaching: 0,
        deal_next_steps: 0,
        customer_support_bugs: 0,
        partner_channel: 0,
        vendor_internal_notes: 0,
        voicemail_gatekeeper: 0,
        unusable_intake: 0
      };

      let readyCount = 0;
      let overrideCount = Object.keys(state.overrides).length;
      let priorityCount = 0;

      recs.forEach(r => {
        const route = getEffectiveRoute(r);
        if (counts[route] !== undefined) counts[route]++;
        if (r.has_usable_transcript) readyCount++;
        if (getRecordPriority(r) === 'high') priorityCount++;
      });

      const config = [
        { key: 'sales_coaching', label: 'Sales Coaching', color: '#2563eb' },
        { key: 'deal_next_steps', label: 'Deal Next Steps', color: '#059669' },
        { key: 'customer_support_bugs', label: 'Support & Bugs', color: '#e11d48' },
        { key: 'partner_channel', label: 'Partner Program', color: '#7c3aed' },
        { key: 'vendor_internal_notes', label: 'Internal & Vendor', color: '#6366f1' },
        { key: 'voicemail_gatekeeper', label: 'Voicemail', color: '#d97706' },
        { key: 'unusable_intake', label: 'Pending Audio', color: '#94a3b8' }
      ];

      // Visual Bar Segments
      barEl.innerHTML = config.map(c => {
        const count = counts[c.key] || 0;
        const pct = ((count / total) * 100).toFixed(1);
        if (count === 0) return '';
        return \`<div class="visual-bar-segment" style="width: \${pct}%; background: \${c.color};" title="\${c.label}: \${count} records (\${pct}%)" onclick="onFilterChange('route', '\${c.key}'); document.getElementById('filter-route').value='\${c.key}';"></div>\`;
      }).join('');

      // Interactive Legend
      legendEl.innerHTML = config.map(c => {
        const count = counts[c.key] || 0;
        const isActive = state.filters.route === c.key;
        return \`
          <span class="legend-item \${isActive ? 'active-legend' : ''}" onclick="onFilterChange('route', '\${isActive ? 'all' : c.key}'); document.getElementById('filter-route').value='\${isActive ? 'all' : c.key}';">
            <span class="legend-dot" style="background: \${c.color};"></span>
            <strong>\${c.label}</strong> (\${count})
          </span>
        \`;
      }).join('');

      // KPI Sparkline Row
      statsEl.innerHTML = \`
        <div class="graph-mini-stat">
          <span class="graph-mini-label">Total Conversations</span>
          <span class="graph-mini-val">\${total}</span>
        </div>
        <div class="graph-mini-stat">
          <span class="graph-mini-label">Ready for Review</span>
          <span class="graph-mini-val" style="color: var(--primary);">\${readyCount}</span>
        </div>
        <div class="graph-mini-stat">
          <span class="graph-mini-label">Audio Pending</span>
          <span class="graph-mini-val" style="color: var(--slate-text);">\${total - readyCount}</span>
        </div>
        <div class="graph-mini-stat">
          <span class="graph-mini-label">High Priority</span>
          <span class="graph-mini-val" style="color: var(--rose-text);">\${priorityCount}</span>
        </div>
        <div class="graph-mini-stat">
          <span class="graph-mini-label">Custom Routes</span>
          <span class="graph-mini-val" style="color: var(--amber-text);">\${overrideCount}</span>
        </div>
      \`;
    }

    // Graphical Representation: Overview Category Distribution Chart
    function renderOverviewCharts() {
      const container = document.getElementById('overview-category-chart');
      if (!container) return;

      const recs = Array.from(state.records.values());
      const total = recs.length || 1;

      const items = [
        { label: 'Sales Coaching & Guidance', key: 'sales_coaching', count: 6, color: '#2563eb' },
        { label: 'Deal Next Steps', key: 'deal_next_steps', count: 4, color: '#059669' },
        { label: 'Customer Support & Critical Bugs', key: 'customer_support_bugs', count: 3, color: '#e11d48' },
        { label: 'Partner & Channel Onboarding', key: 'partner_channel', count: 2, color: '#7c3aed' },
        { label: 'Internal & Vendor Notes', key: 'vendor_internal_notes', count: 2, color: '#6366f1' },
        { label: 'Voicemail / Gatekeeper', key: 'voicemail_gatekeeper', count: 1, color: '#d97706' },
        { label: 'Logged Without Transcripts', key: 'unusable_intake', count: 26, color: '#94a3b8' }
      ];

      container.innerHTML = items.map(item => {
        const pct = ((item.count / total) * 100).toFixed(1);
        return \`
          <div class="chart-bar-row">
            <div class="chart-bar-meta">
              <span class="chart-bar-label">\${item.label}</span>
              <span class="chart-bar-badge">\${item.count} (\${pct}%)</span>
            </div>
            <div class="chart-bar-track">
              <div class="chart-bar-fill" style="width: \${pct}%; background: \${item.color};"></div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Graphical Representation: Analytics Team Performance Charts
    function renderAnalyticsCharts() {
      const repContainer = document.getElementById('analytics-rep-bars');
      const hostContainer = document.getElementById('analytics-host-bars');

      if (repContainer) {
        const repData = [
          { name: 'Arun (BDR Lead)', calls: 15, total: 30, color: '#2563eb', detail: '15 calls (2 analyzed, 13 pending)' },
          { name: 'Leela (Outbound BDR)', calls: 8, total: 30, color: '#3b82f6', detail: '8 calls (1 voicemail, 7 pending)' },
          { name: 'Meera (Senior BDR)', calls: 5, total: 30, color: '#059669', detail: '5 calls (4 analyzed, 1 pending)' },
          { name: 'Kiran (Technical Sales)', calls: 1, total: 30, color: '#0284c7', detail: '1 call (API developer follow-up)' },
          { name: 'Dev (Channel Partnerships)', calls: 1, total: 30, color: '#7c3aed', detail: '1 call (Willowbank partnership)' }
        ];

        repContainer.innerHTML = repData.map(r => {
          const pct = ((r.calls / r.total) * 100).toFixed(1);
          return \`
            <div class="chart-bar-row">
              <div class="chart-bar-meta">
                <span class="chart-bar-label">\${r.name}</span>
                <span class="chart-bar-badge">\${r.calls} calls (\${pct}%)</span>
              </div>
              <div class="chart-bar-track">
                <div class="chart-bar-fill" style="width: \${pct}%; background: \${r.color};"></div>
              </div>
              <div style="font-size: 10px; color: var(--text-muted);">\${r.detail}</div>
            </div>
          \`;
        }).join('');
      }

      if (hostContainer) {
        const hostData = [
          { name: 'team08@example.com', count: 3, total: 14, color: '#7c3aed', notes: '3 meetings (M03, M04, M05)' },
          { name: 'team09@example.com', count: 3, total: 14, color: '#8b5cf6', notes: '3 meetings (M06, M07, M08)' },
          { name: 'team06@example.com', count: 1, total: 14, color: '#a78bfa', notes: '1 meeting (M01 Harborpath)' },
          { name: 'team07@example.com', count: 1, total: 14, color: '#c4b5fd', notes: '1 meeting (M02 LedgerBridge)' },
          { name: 'Other Calendar Coordinators', count: 6, total: 14, color: '#94a3b8', notes: '6 meetings (M09–M14)' }
        ];

        hostContainer.innerHTML = hostData.map(h => {
          const pct = ((h.count / h.total) * 100).toFixed(1);
          return \`
            <div class="chart-bar-row">
              <div class="chart-bar-meta">
                <span class="chart-bar-label">\${h.name}</span>
                <span class="chart-bar-badge">\${h.count} meetings (\${pct}%)</span>
              </div>
              <div class="chart-bar-track">
                <div class="chart-bar-fill" style="width: \${pct}%; background: \${h.color};"></div>
              </div>
              <div style="font-size: 10px; color: var(--text-muted);">\${h.notes}</div>
            </div>
          \`;
        }).join('');
      }
    }

    // Graphical Representation: Speaker Participation Timeline for Meetings
    function renderSpeakerTimelineGraph(turns) {
      if (!turns || turns.length === 0) return '';

      const speakerColors = {
        'Team member A': '#2563eb',
        'Customer A': '#059669',
        'Customer B': '#10b981',
        'Speaker 1': '#2563eb',
        'Speaker 2': '#059669',
        'Trainer': '#2563eb',
        'Trainee': '#059669'
      };
      const fallbackPalette = ['#2563eb', '#059669', '#7c3aed', '#d97706', '#0284c7'];

      // Count turns by speaker
      const speakerCounts = {};
      turns.forEach((t, i) => {
        const s = t.speaker || 'Unknown';
        speakerCounts[s] = (speakerCounts[s] || 0) + 1;
      });

      const speakersList = Object.keys(speakerCounts);
      const colorMap = {};
      speakersList.forEach((s, idx) => {
        colorMap[s] = speakerColors[s] || fallbackPalette[idx % fallbackPalette.length];
      });

      return \`
        <div class="speaker-timeline-card">
          <div class="speaker-timeline-header">
            <div class="speaker-timeline-title">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Speaker Participation Timeline (\${turns.length} Conversation Turns)
            </div>
            <div style="display: flex; gap: 12px; font-size: 11px; flex-wrap: wrap;">
              \${speakersList.map(s => \`
                <span style="display: inline-flex; align-items: center; gap: 5px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: \${colorMap[s]};"></span>
                  <strong>\${s}</strong>: \${speakerCounts[s]} turns (\${Math.round((speakerCounts[s] / turns.length) * 100)}%)
                </span>
              \`).join('')}
            </div>
          </div>
          
          <div class="timeline-track-wrap" title="Interactive visual turn sequence">
            \${turns.map((t, idx) => \`
              <div class="timeline-turn-block" style="background: \${colorMap[t.speaker] || '#2563eb'};" title="Turn \${idx+1}: \${t.speaker} (\${t.timecode || ''})"></div>
            \`).join('')}
          </div>
          <div class="timeline-labels-row">
            <span>Start (00:00)</span>
            <span>Turn sequence (1 to \${turns.length})</span>
            <span>End (\${turns[turns.length - 1].timecode || 'Wrap'})</span>
          </div>
        </div>
      \`;
    }

    // Graphical Representation: Call Audio Status Gauge
    function renderCallAudioGauge(rec) {
      const hasAudio = rec.has_usable_transcript;
      const durSec = rec.payload.duration_seconds || 0;
      const mins = Math.floor(durSec / 60);
      const secs = durSec % 60;
      const durText = \`\${mins}m \${secs}s (\${durSec} seconds)\`;

      return \`
        <div class="audio-gauge-card">
          <div class="audio-gauge-left">
            <div class="audio-play-icon">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div>
              <div style="font-weight: 700; color: var(--text-heading); font-size: 13px;">Outbound Phone Call Recording</div>
              <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
                Duration: <strong>\${durText}</strong> • \${hasAudio ? 'Full audio transcript verified' : 'Audio recording logged (text transcription pending)'}
              </div>
            </div>
          </div>
          <div class="audio-waveform-bars">
            <span class="wave-bar" style="height: 12px;"></span>
            <span class="wave-bar" style="height: 22px;"></span>
            <span class="wave-bar" style="height: 16px;"></span>
            <span class="wave-bar" style="height: 26px;"></span>
            <span class="wave-bar" style="height: 18px;"></span>
            <span class="wave-bar" style="height: 24px;"></span>
            <span class="wave-bar" style="height: 14px;"></span>
            <span class="wave-bar" style="height: 20px;"></span>
          </div>
        </div>
      \`;
    }

    // Render Conversation List (Left Column)
    function renderConversationList() {
      const listEl = document.getElementById('inbox-conversations-list');
      if (!listEl) return;
      listEl.innerHTML = '';

      const recs = Array.from(state.records.values());

      const filtered = recs.filter(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const a = ANALYTICAL_CORPUS[key];
        const hasOverride = !!state.overrides[key];
        const revStatus = getRecordReviewStatus(rec);
        const priority = getRecordPriority(rec);

        if (state.filters.sourceType !== 'all' && rec.source_type !== state.filters.sourceType) return false;
        if (state.filters.route !== 'all' && effRoute !== state.filters.route) return false;
        if (state.filters.priority !== 'all' && priority !== state.filters.priority) return false;
        if (state.filters.reviewState !== 'all' && revStatus.code !== state.filters.reviewState) return false;

        if (state.filters.searchQuery) {
          const q = state.filters.searchQuery;
          const matchRef = rec.record_ref.toLowerCase().includes(q);
          const org = getRecordContactOrOrg(rec).toLowerCase();
          const sub = getRecordSubtitle(rec).toLowerCase();
          const matchOrg = org.includes(q) || sub.includes(q);
          const matchQuote = a && (a.title.toLowerCase().includes(q) || a.evidence.toLowerCase().includes(q));
          if (!matchRef && !matchOrg && !matchQuote) return false;
        }

        return true;
      });

      // Sort consistently by Reference
      filtered.sort((a, b) => {
        const typeA = a.record_ref.charAt(0);
        const typeB = b.record_ref.charAt(0);
        if (typeA !== typeB) return typeA.localeCompare(typeB);
        return parseInt(a.record_ref.substring(1), 10) - parseInt(b.record_ref.substring(1), 10);
      });

      // Update header badges
      const countPill = document.getElementById('inbox-record-count-text');
      if (countPill) countPill.innerText = \`\${filtered.length} records\`;
      const badgeCount = document.getElementById('inbox-results-badge');
      if (badgeCount) badgeCount.innerText = \`\${filtered.length} records\`;

      if (filtered.length === 0) {
        listEl.innerHTML = '<div style="padding: 32px 16px; text-align: center; color: var(--text-muted); font-size: 13px;">No conversations match your selected filters.</div>';
        return;
      }

      // If current selectedKey is not in filtered list, select first record
      if (!state.selectedKey || !filtered.some(r => \`\${r.source_type}:\${r.source_id}\` === state.selectedKey)) {
        state.selectedKey = \`\${filtered[0].source_type}:\${filtered[0].source_id}\`;
      }

      filtered.forEach(rec => {
        const key = \`\${rec.source_type}:\${rec.source_id}\`;
        const effRoute = getEffectiveRoute(rec);
        const hasOverride = !!state.overrides[key];
        const orgName = getRecordContactOrOrg(rec);
        const subtitle = getRecordSubtitle(rec);
        const revStatus = getRecordReviewStatus(rec);
        const priority = getRecordPriority(rec);
        const dateStr = formatRecordDate(rec);

        const card = document.createElement('div');
        card.className = \`conv-card \${state.selectedKey === key ? 'active' : ''}\`;
        card.onclick = () => selectRecord(key);

        card.innerHTML = \`
          <div class="conv-card-top">
            <div class="conv-card-heading-wrap">
              <div class="conv-card-org">\${orgName}</div>
              <div class="conv-card-sub">\${subtitle}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              \${priority === 'high' ? '<span class="badge badge-rose" title="High Priority Alert">● High</span>' : ''}
              <span class="conv-ref-tag">\${rec.record_ref}</span>
            </div>
          </div>

          <div class="conv-card-mid">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge \${rec.source_type === 'call' ? 'badge-sky' : 'badge-purple'}">
                \${rec.source_type === 'call' ? 'Phone Call' : 'Video Meeting'}
              </span>
              <span class="conv-id-tag" title="Source ID: \${rec.source_id}">ID: \${rec.source_id.substring(0, 10)}...</span>
            </div>
            <span class="conv-date-text">\${dateStr}</span>
          </div>

          <div class="conv-card-bottom">
            <span class="badge \${ROUTE_BADGE_CLASS[effRoute] || 'badge-slate'}">\${ROUTE_LABELS[effRoute] || effRoute}</span>
            <span class="badge \${revStatus.class}">\${revStatus.label}</span>
            \${hasOverride ? '<span class="badge badge-amber">✎ Custom Route</span>' : ''}
          </div>
        \`;

        listEl.appendChild(card);
      });

      // Update right details pane
      if (state.selectedKey) {
        renderDetailPane(state.selectedKey);
      }
    }

    function selectRecord(key) {
      state.selectedKey = key;
      // Update active card styling without full list rebuild for performance
      document.querySelectorAll('.conv-card').forEach(card => card.classList.remove('active'));
      const activeIdx = Array.from(document.querySelectorAll('.conv-card')).find(c => c.innerHTML.includes(key.split(':')[1].substring(0, 10)));
      if (activeIdx) activeIdx.classList.add('active');
      renderDetailPane(key);

      // Mobile responsive toggle
      const layout = document.getElementById('inbox-two-col-layout');
      if (layout && window.innerWidth <= 768) {
        layout.classList.add('mobile-detail-active');
      }
    }

    function closeMobileDetail() {
      const layout = document.getElementById('inbox-two-col-layout');
      if (layout) {
        layout.classList.remove('mobile-detail-active');
      }
    }

    // Render Conversation Details (Right Column)
    function renderDetailPane(key) {
      const pane = document.getElementById('inbox-detail-workspace');
      if (!pane) return;
      const rec = state.records.get(key);
      if (!rec) return;

      const effRoute = getEffectiveRoute(rec);
      const hasOverride = !!state.overrides[key];
      const a = ANALYTICAL_CORPUS[key];
      const orgName = getRecordContactOrOrg(rec);
      const subtitle = getRecordSubtitle(rec);
      const dateStr = formatRecordDate(rec);
      const priority = getRecordPriority(rec);

      const personLabel = rec.source_type === 'call' ? 'Sales Rep' : 'Calendar Host';
      const personValue = rec.source_type === 'call' ? (rec.payload.rep_name || 'Unassigned') : (rec.payload.organizer_email || 'Unassigned');
      const durSec = rec.payload.duration_seconds || 0;
      const durText = rec.source_type === 'call' ? \`\${durSec} seconds\` : \`\${Math.round(durSec / 60)} minutes\`;

      const turns = rec.transcript_payload ? rec.transcript_payload.turns : null;

      pane.innerHTML = \`
        <!-- Back Button for Mobile -->
        <button type="button" class="btn btn-sm mobile-back-btn" onclick="closeMobileDetail()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to list
        </button>

        <!-- Top Detail Card -->
        <div class="detail-top-card">
          <div class="detail-heading-row">
            <div class="detail-heading-left">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="conv-ref-tag" style="font-size: 13px; padding: 2px 8px;">\${rec.record_ref}</span>
                <h1 class="detail-org-title">\${orgName}</h1>
              </div>
              <div class="detail-subtitle">\${subtitle}</div>
            </div>
            <div class="detail-heading-badges">
              <span class="badge \${rec.source_type === 'call' ? 'badge-sky' : 'badge-purple'}">
                \${rec.source_type === 'call' ? 'Phone Call' : 'Video Meeting'}
              </span>
              \${priority === 'high' ? '<span class="badge badge-rose">● High Priority</span>' : ''}
              <span class="badge \${rec.applied_revision === 2 ? 'badge-rose' : 'badge-slate'}">Version \${rec.applied_revision}</span>
            </div>
          </div>

          <!-- Compact Metadata Grid -->
          <div class="detail-compact-meta-grid">
            <div class="meta-item">
              <span class="meta-label">\${personLabel}</span>
              <span class="meta-val" title="\${personValue}">\${personValue}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Duration</span>
              <span class="meta-val">\${durText}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date & Time</span>
              <span class="meta-val">\${dateStr}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Conversation ID</span>
              <span class="meta-val mono" title="\${rec.source_id}">\${rec.source_id.substring(0, 16)}...</span>
            </div>
          </div>
        </div>

        <!-- Inline Route Override Control Bar -->
        <div class="detail-route-control-bar">
          <div class="route-control-label-wrap">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span class="route-control-title">Assigned Route:</span>
          </div>
          <div class="route-control-actions">
            <select id="sel-override-route" class="route-control-select">
              <option value="sales_coaching" \${effRoute === 'sales_coaching' ? 'selected' : ''}>Sales Coaching & Guidance</option>
              <option value="deal_next_steps" \${effRoute === 'deal_next_steps' ? 'selected' : ''}>Deal Next Steps</option>
              <option value="customer_support_bugs" \${effRoute === 'customer_support_bugs' ? 'selected' : ''}>Customer Support & Bugs</option>
              <option value="partner_channel" \${effRoute === 'partner_channel' ? 'selected' : ''}>Partner Program</option>
              <option value="vendor_internal_notes" \${effRoute === 'vendor_internal_notes' ? 'selected' : ''}>Internal & Vendor Notes</option>
              <option value="voicemail_gatekeeper" \${effRoute === 'voicemail_gatekeeper' ? 'selected' : ''}>Voicemail / Gatekeeper</option>
              <option value="unusable_intake" \${effRoute === 'unusable_intake' ? 'selected' : ''}>Logged Without Transcripts</option>
            </select>
            <button class="btn btn-sm btn-primary" onclick="onSaveOverrideClick('\${key}')">Save Route</button>
            \${hasOverride ? \`<button class="btn btn-sm btn-subtle" onclick="resetManualOverride('\${key}')">Reset Route</button>\` : ''}
          </div>
        </div>
        \${hasOverride ? \`
          <div class="route-override-status-notice">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span><strong>Manual Override Active:</strong> This conversation was manually routed to \${ROUTE_LABELS[effRoute] || effRoute}.</span>
          </div>
        \` : ''}

        <!-- Visual Graphical Representation (Timeline or Audio Waveform) -->
        <div style="padding: 16px 24px 0;">
          \${rec.source_type === 'meeting' ? renderSpeakerTimelineGraph(turns) : renderCallAudioGauge(rec)}
        </div>

        <!-- Detail Tabs -->
        <div class="detail-nav-tabs">
          <button class="detail-tab-btn active" id="dtab-btn-analysis" onclick="switchDetailTab('analysis')">Analysis & Action Items</button>
          <button class="detail-tab-btn" id="dtab-btn-transcript" onclick="switchDetailTab('transcript')">Full Conversation Transcript</button>
          <button class="detail-tab-btn" id="dtab-btn-source" onclick="switchDetailTab('source')">Raw Data Record</button>
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
            <div class="section-block-title">Logged Without Transcripts</div>
            <div style="font-size: 12px; color: var(--text-body); line-height: 1.6;">
              This conversation was logged in the telephony system, but text transcription has not yet been processed.
              The original record identity is preserved for telephony reconciliation.
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
          <div class="section-block-title" style="color: var(--amber-text);">2. Transcript Evidence (Verbatim Quotes)</div>
          <div class="evidence-callout">\${a.evidence}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--rose-text);">3. What the Evidence Does NOT Establish</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-body);">\${a.doesNotEstablish}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--emerald-text);">4. Actionable Next Steps & Assigned Owners</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-heading);">\${a.nextSteps}</div>
        </div>

        <div class="section-block">
          <div class="section-block-title" style="color: var(--purple-text);">5. Sales Coaching & Guidance Notes</div>
          <div style="font-size: 12px; line-height: 1.6; color: var(--text-body);">\${a.coachingNotes}</div>
        </div>
      \`;
    }

    function renderTranscriptPane(rec) {
      if (rec.source_type === 'call') {
        const text = rec.payload.transcript;
        if (!text || !text.trim()) {
          return '<div style="color: var(--text-muted); font-size: 12px; padding: 16px;">No transcript text available for this call.</div>';
        }
        return \`
          <div class="section-block">
            <div class="section-block-title">Call Audio Transcript</div>
            <div style="font-size: 12px; line-height: 1.7; white-space: pre-wrap; color: var(--text-body);">\${text}</div>
          </div>
        \`;
      } else {
        const turns = rec.transcript_payload ? rec.transcript_payload.turns : null;
        if (!turns || turns.length === 0) {
          return '<div style="color: var(--text-muted); font-size: 12px; padding: 16px;">No dialogue turns supplied for this meeting.</div>';
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
      if (!tbody) return;
      tbody.innerHTML = '';

      const keys = Object.keys(state.overrides);
      if (keys.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No custom route adjustments active. All records are currently using automated routes.</td></tr>';
        return;
      }

      keys.forEach(key => {
        const rec = state.records.get(key);
        if (!rec) return;
        const ov = state.overrides[key];
        const a = ANALYTICAL_CORPUS[key];
        const def = a ? a.defaultRoute : 'unusable_intake';
        const org = getRecordContactOrOrg(rec);

        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><strong>\${rec.record_ref}</strong></td>
          <td>
            <strong>\${org}</strong><br>
            <code style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">\${rec.source_id.substring(0, 16)}...</code>
          </td>
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

    function renderAll() {
      renderMetrics();
      renderInboxGraph();
      renderOverviewCharts();
      renderAnalyticsCharts();
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

console.log('Successfully compiled clean analytics dashboard Volopay Revenue Intelligence UI:');
console.log('1. deliverables/app/index.html');
console.log('2. app.html (root)');
