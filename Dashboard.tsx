 "use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, Bell, BrainCircuit, Bug, ChevronDown, CircleHelp,
  Clock3, Command, FileBarChart2, Fingerprint, Gauge, LayoutDashboard,
  LockKeyhole, Menu, Network, Radar, Search, Settings, Shield, ShieldAlert,
  ShieldCheck, Siren, Terminal, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

type EventItem = { id: number; title: string; detail: string; severity: "Critical" | "High" | "Medium" | "Low"; time: string; source: string };
const initialEvents: EventItem[] = [
  { id: 1, title: "Unusual outbound traffic", detail: "Possible data exfiltration from workstation", severity: "Critical", time: "2 min ago", source: "Network IDS" },
  { id: 2, title: "Repeated authentication failures", detail: "Multiple failed logins from 185.220.101.4", severity: "High", time: "11 min ago", source: "Identity Monitor" },
  { id: 3, title: "Suspicious PowerShell activity", detail: "Encoded command detected on endpoint", severity: "High", time: "24 min ago", source: "Endpoint Agent" },
  { id: 4, title: "Privilege escalation attempt", detail: "Unexpected role change request", severity: "Medium", time: "38 min ago", source: "Cloud Audit" },
  { id: 5, title: "New device observed", detail: "Unrecognized device joined internal network", severity: "Low", time: "1 hr ago", source: "Asset Monitor" }
];
const trend = [
  { time: "00:00", alerts: 18 }, { time: "04:00", alerts: 12 }, { time: "08:00", alerts: 27 },
  { time: "12:00", alerts: 21 }, { time: "16:00", alerts: 39 }, { time: "20:00", alerts: 30 },
  { time: "24:00", alerts: 34 }
];
const nav = [
  { label: "Overview", icon: LayoutDashboard }, { label: "Vulnerability Scans", icon: Radar },
  { label: "SIEM Logs", icon: Terminal }, { label: "APT Detection", icon: Fingerprint },
  { label: "AI Analyst", icon: BrainCircuit }, { label: "Security Reports", icon: FileBarChart2 }
];

function severityClass(s: string) {
  return s === "Critical" ? "critical" : s === "High" ? "high" : s === "Medium" ? "medium" : "low";
}

export default function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [events, setEvents] = useState(initialEvents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [scanning, setScanning] = useState(false);
  const [notice, setNotice] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [analystPrompt, setAnalystPrompt] = useState("");
  const [analystAnswer, setAnalystAnswer] = useState("I can help interpret alerts, summarize suspicious activity, and suggest investigation steps. Connect an LLM endpoint to enable live AI analysis.");

  const visibleEvents = useMemo(() => events.filter(e =>
    (filter === "All" || e.severity === filter) &&
    `${e.title} ${e.detail} ${e.source}`.toLowerCase().includes(query.toLowerCase())
  ), [events, filter, query]);

  function runScan() {
    setScanning(true); setNotice("Scan started. This demo uses simulated scan results.");
    window.setTimeout(() => {
      setScanning(false);
      setNotice("Scan completed: 2 informational findings and 0 new critical findings.");
    }, 1400);
  }

  function askAnalyst() {
    if (!analystPrompt.trim()) return;
    setAnalystAnswer(`Demo analysis for: “${analystPrompt}”\n\n1. Review the affected asset and its recent activity.\n2. Correlate the event with identity and network logs.\n3. Preserve relevant evidence before remediation.\n\nThis is a placeholder response. Connect a trusted LLM and your security data pipeline for production analysis.`);
    setAnalystPrompt("");
  }

  const SidebarContent = () => <><div className="brand"><div className="brand-mark"><Shield size={21}/></div><div><b>DARKRA</b><span>SECURITY INTELLIGENCE</span></div></div>
    <div className="workspace"><span className="pulse-dot"/> LIVE ENVIRONMENT <ChevronDown size={13}/></div>
    <div className="nav-label">WORKSPACE</div>
    {nav.map(item => <button key={item.label} onClick={() => { setActive(item.label); setMobileOpen(false); }} className={`nav-item ${active === item.label ? "selected" : ""}`}><item.icon size={17}/><span>{item.label}</span>{item.label === "SIEM Logs" && <i className="nav-count">8</i>}</button>)}
    <div className="nav-label tools-label">TOOLS</div>
    <button className="nav-item" onClick={() => setNotice("Demo target settings are not connected.")}><Network size={17}/><span>Demo Target</span></button>
    <button className="nav-item" onClick={() => setNotice("Settings are a UI placeholder in this starter project.")}><Settings size={17}/><span>Settings</span></button>
    <div className="sidebar-bottom"><div className="secure-card"><div className="secure-icon"><LockKeyhole size={16}/></div><b>System protected</b><span>All monitoring systems operational</span><div className="secure-line"><i/></div></div><div className="profile"><div className="avatar">DA</div><div><b>Demo Admin</b><span>Security Analyst</span></div><ChevronDown size={15}/></div></div></>;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}><SidebarContent/></aside>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><div className="top-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div></div><div className="top-actions"><div className="system-status"><i/> All systems normal</div><button className="icon-btn" onClick={() => setNotice("You're all caught up on notifications.")}><Bell size={18}/><i className="notification-dot"/></button><button className="icon-btn" onClick={() => setNotice("Help centre is not connected in this demo.")}><CircleHelp size={18}/></button></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow"><span/> THREAT OPERATIONS CENTER</div><h1>{active === "Overview" ? "Security Overview" : active}</h1><p>Monitor your security posture, detect threats, and respond with confidence.</p></div><div className="heading-actions"><span className="updated"><Clock3 size={14}/> Updated just now</span><button className="primary-btn" onClick={runScan} disabled={scanning}><Zap size={15}/>{scanning ? "Scanning..." : "Run security scan"}</button></div></div>
        {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice("")}><X size={15}/></button></div>}
        {active !== "Overview" && <div className="section-note"><Activity size={18}/><div><b>{active} workspace</b><span>This section is represented by the dashboard starter UI. Connect its data source and workflow to enable production functionality.</span></div></div>}
        <section className="metric-grid">
          <Metric icon={<ShieldCheck/>} label="Security Score" value="92" unit="/100" change="+4.8%" note="vs. last week" color="green"/>
          <Metric icon={<AlertTriangle/>} label="Active Threats" value="07" change="-12.5%" note="vs. last 24 hours" color="orange"/>
          <Metric icon={<Bug/>} label="Vulnerabilities" value="14" change="-8.2%" note="vs. last scan" color="violet"/>
          <Metric icon={<Activity/>} label="Events Analyzed" value="24.8K" change="+18.6%" note="vs. last 24 hours" color="cyan"/>
        </section>
        <section className="middle-grid">
          <div className="panel chart-panel"><div className="panel-heading"><div><h2>Threat activity</h2><p>Security events detected over the last 24 hours</p></div><button className="select-btn">Last 24 hours <ChevronDown size={14}/></button></div><div className="chart-legend"><span><i/> Detected events</span><b>181 <small>total events</small></b></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{top: 8, right: 8, left: -20, bottom: 0}}><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#55d5e7" stopOpacity={0.25}/><stop offset="95%" stopColor="#55d5e7" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#1c293b" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="time" tick={{fill:"#72839d",fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"#72839d",fontSize:11}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:"#101827",border:"1px solid #26364d",borderRadius:8,color:"#e8eef8"}}/><Area type="monotone" dataKey="alerts" stroke="#55d5e7" strokeWidth={2} fill="url(#areaFill)"/></AreaChart></ResponsiveContainer></div></div>
          <div className="panel posture-panel"><div className="panel-heading"><div><h2>Threat posture</h2><p>Current risk distribution</p></div><button className="more-btn">•••</button></div><div className="score-ring"><div><strong>LOW</strong><span>Overall risk</span></div></div><div className="risk-list"><Risk color="#ff637b" label="Critical" count="02" width="18%"/><Risk color="#ffad62" label="High" count="05" width="42%"/><Risk color="#e6cf70" label="Medium" count="09" width="68%"/><Risk color="#55d5e7" label="Low" count="18" width="100%"/></div></div>
        </section>
        <section className="panel events-panel"><div className="panel-heading events-heading"><div><h2>Recent security events</h2><p>Review and investigate the latest detected activity</p></div><button className="text-btn" onClick={() => {setActive("SIEM Logs"); window.scrollTo({top:0,behavior:"smooth"});}}>View all events <span>→</span></button></div><div className="event-controls"><div className="search-box"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events..."/></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div><div className="table-scroll"><table><thead><tr><th>EVENT</th><th>SOURCE</th><th>SEVERITY</th><th>TIME</th><th/></tr></thead><tbody>{visibleEvents.map(event=><tr key={event.id}><td><div className="event-title"><span className={`event-symbol ${severityClass(event.severity)}`}><ShieldAlert size={15}/></span><div><b>{event.title}</b><span>{event.detail}</span></div></div></td><td className="source-cell">{event.source}</td><td><span className={`severity ${severityClass(event.severity)}`}>{event.severity}</span></td><td className="time-cell">{event.time}</td><td><button className="row-more" onClick={()=>setNotice(`Selected event: ${event.title}. Investigation workflow is a demo placeholder.`)}>•••</button></td></tr>)}</tbody></table>{visibleEvents.length===0&&<div className="empty-state">No events match your search.</div>}</div></section>
        <div className="bottom-grid"><div className="panel insight-panel"><div className="insight-icon"><BrainCircuit size={19}/></div><div><div className="eyebrow">DARKRA AI INSIGHT</div><h3>Unusual activity pattern detected</h3><p>Multiple authentication failures followed by outbound traffic may indicate a compromised account. Review the related events and validate the source device.</p><button className="text-btn" onClick={()=>setActive("AI Analyst")}>Open AI Analyst <span>→</span></button></div></div><div className="panel quick-panel"><div><h2>Quick actions</h2><p>Common security workflows</p></div><div className="quick-actions"><button onClick={runScan}><Radar size={17}/> Start scan</button><button onClick={()=>setActive("Security Reports")}><FileBarChart2 size={17}/> Generate report</button></div></div></div>
        {active === "AI Analyst" && <section className="panel analyst-panel"><div className="panel-heading"><div><h2><BrainCircuit size={18}/> AI Security Analyst</h2><p>Ask questions about alerts and investigation workflows</p></div></div><div className="analyst-answer">{analystAnswer}</div><div className="analyst-input"><input value={analystPrompt} onChange={e=>setAnalystPrompt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAnalyst()} placeholder="Ask about a suspicious event..."/><button className="primary-btn" onClick={askAnalyst}>Ask analyst</button></div></section>}
        <footer><span>© 2026 DARKRA Security Intelligence</span><span><i/> Monitoring active <b>•</b> Demo environment</span></footer>
      </div>
    </main>
  </div>;
}

function Metric({icon,label,value,unit,change,note,color}:{icon:React.ReactNode;label:string;value:string;unit?:string;change:string;note:string;color:string}) {
  return <div className="panel metric-card"><div className="metric-top"><span className={`metric-icon ${color}`}>{icon}</span><span className={`change ${change.startsWith("+") ? "positive" : "negative"}`}>{change}</span></div><div className="metric-value">{value}<small>{unit}</small></div><div className="metric-label">{label}</div><div className="metric-note">{note}</div></div>;
}
function Risk({color,label,count,width}:{color:string;label:string;count:string;width:string}) {
  return <div className="risk-row"><span className="risk-name"><i style={{background:color}}/>{label}</span><div className="risk-track"><i style={{background:color,width}}/></div><b>{count}</b></div>;
}
