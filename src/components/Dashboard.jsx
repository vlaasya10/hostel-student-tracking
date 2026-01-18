import '../Dashboard.css';

const stats = [
  {
    title: "Total Students",
    value: "450",
    icon: "👥",
    color: "blue",
  },
  {
    title: "In College",
    value: "385",
    sub: "+12 from yesterday",
    icon: "✅",
    color: "green",
  },
  {
    title: "Outside Campus",
    value: "45",
    sub: "+5 in last hour",
    icon: "🚶",
    color: "orange",
  },
  {
    title: "Critical Alerts",
    value: "8",
    sub: "Needs attention",
    icon: "⚠️",
    color: "red",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* TOP STATS */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div>
              <p className="stat-title">{item.title}</p>
              <h2>{item.value}</h2>
              {item.sub && <span className="stat-sub">{item.sub}</span>}
            </div>
            <div className={`stat-icon ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CRITICAL ALERT */}
      <div className="critical-alert">
        <strong>⚠ Critical Alerts</strong>
        <p>
          8 students have been outside for more than 2 hours without approval.
          Immediate attention required.
        </p>
      </div>

      {/* LOWER SECTION */}
      <div className="bottom-grid">
        {/* STUDENTS AT RISK */}
        <div className="card">
          <h3>
            Students at Risk <span className="badge">4</span>
          </h3>

          <RiskItem
            name="Rahul Kumar"
            id="HS2023001"
            location="City Center Mall"
            time="2 hours ago"
            level="high"
          />
          <RiskItem
            name="Priya Sharma"
            id="HS2023042"
            location="Railway Station"
            time="3 hours ago"
            level="high"
          />
          <RiskItem
            name="Amit Patel"
            id="HS2023089"
            location="Local Market"
            time="1 hour ago"
            level="medium"
          />
          <RiskItem
            name="Sneha Reddy"
            id="HS2023156"
            location="Bus Stand"
            time="45 mins ago"
            level="medium"
          />
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card">
          <h3>Recent Activity</h3>

          <ActivityItem
            name="Vikram Singh"
            action="Checked out - Medical Store"
            time="5 mins ago"
            status="approved"
          />
          <ActivityItem
            name="Anita Desai"
            action="Checked in - From College"
            time="12 mins ago"
            status="normal"
          />
          <ActivityItem
            name="Rohan Mehta"
            action="Checked out - Unknown"
            time="25 mins ago"
            status="unauthorized"
          />
          <ActivityItem
            name="Divya Nair"
            action="Checked in - From Library"
            time="32 mins ago"
            status="normal"
          />
          <ActivityItem
            name="Karan Joshi"
            action="Checked out - Approved Leave"
            time="1 hour ago"
            status="approved"
          />
        </div>
      </div>
    </div>
  );
}

/* -------- SMALL COMPONENTS -------- */

function RiskItem({ name, id, location, time, level }) {
  return (
    <div className="risk-item">
      <div>
        <p className="name">{name}</p>
        <span className="id">{id}</span>
        <div className="meta">
          📍 {location} • ⏱ {time}
        </div>
      </div>
      <span className={`tag ${level}`}>{level}</span>
    </div>
  );
}

function ActivityItem({ name, action, time, status }) {
  return (
    <div className="activity-item">
      <div>
        <p className="name">{name}</p>
        <span className="action">{action}</span>
        <div className="time">{time}</div>
      </div>
      <span className={`status ${status}`}>{status}</span>
    </div>
  );
}
