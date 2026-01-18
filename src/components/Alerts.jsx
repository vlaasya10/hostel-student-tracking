import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, Button, Badge, Alert, Table } from "react-bootstrap";
import { TelephoneFill, PeopleFill, BellFill, ClockFill, CheckCircleFill, Telephone } from "react-bootstrap-icons";

function Alerts() {
  const [students, setStudents] = useState([]);
  const [swipes, setSwipes] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const WARNING_MINUTES = 60;
  const CRITICAL_MINUTES = 120;
  const ESCALATION_MINUTES = 180;

  // Fetch students & swipes
  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        fetch("http://localhost:4000/students").then((res) => res.json()),
        fetch("http://localhost:3000/swipes").then((res) => res.json()),
      ])
        .then(([studentsData, swipesData]) => {
          setStudents(studentsData);
          setSwipes(swipesData);
        })
        .catch(console.error);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Process alerts
  useEffect(() => {
    if (!students?.length || !swipes?.length) return;

    const now = new Date("2026-01-15T10:00:00Z"); // fixed current time

    const swipesByCard = {};
    swipes.forEach((s) => {
      if (!swipesByCard[s.cardUID]) swipesByCard[s.cardUID] = [];
      swipesByCard[s.cardUID].push(s);
    });

    const newAlerts = [];

    students.forEach((student) => {
      const sSwipes = swipesByCard[student.cardUID];
      if (!sSwipes) return;

      const sorted = [...sSwipes].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      const lastExit = [...sorted].reverse().find((s) => s.location === "hostel_exit");
      if (!lastExit) return;

      const nextEntry = sorted.find(
        (s) => s.location === "college_entry" && new Date(s.timestamp) > new Date(lastExit.timestamp)
      );

      const checkoutTime = new Date(lastExit.timestamp);
      const checkinTime = nextEntry ? new Date(nextEntry.timestamp) : now;

      const durationMins = Math.floor((checkinTime - checkoutTime) / (1000 * 60));

      let status = null;
      let contacted = [];

      if (durationMins >= ESCALATION_MINUTES) {
        status = "escalated";
        contacted = ["Warden", "Parents", "Security"];
      } else if (durationMins >= CRITICAL_MINUTES) {
        status = "critical";
        contacted = ["Warden", "Parents"];
      } else if (durationMins >= WARNING_MINUTES) {
        status = "warning";
        contacted = ["Warden"];
      }

      if (status) {
        newAlerts.push({
          studentId: student.studentId,
          name: student.name,
          rollNo: student.rollNo,
          room: student.room,
          phone: student.phone,
          parentPhone: student.parentPhone,
          durationMins,
          status,
          contacted,
        });
      }
    });

    setAlerts(newAlerts);
  }, [students, swipes]);

  const getBadgeVariant = (status) => {
    switch (status) {
      case "escalated":
        return "dark";
      case "critical":
        return "danger";
      case "warning":
        return "warning";
      default:
        return "secondary";
    }
  };
  const getBgColor = (status) => {
  switch (status) {
    case "escalated":
      return "#d3d3d3"; // light gray for escalated card/table background
    case "critical":
      return "#f8d7da"; // light red
    case "warning":
      return "#fff3cd"; // light yellow
    default:
      return "#f8f9fa"; // default light gray
  }
};

const getTextColor = (status) => {
  switch (status) {
    case "escalated":
      return "text-dark"; // black
    case "critical":
      return "text-danger"; // red
    case "warning":
      return "text-warning"; // yellow
    default:
      return "text-secondary"; // gray
  }
};


  return (
    <div className="container-fluid mt-5 px-4">
      
      {alerts.length === 0 && (
        <Alert variant="success">
          ✅ No students exceeding time limits.
        </Alert>
      )}

      {alerts && alerts.length > 0 && (
  <Alert
    variant="danger"
    className="d-flex align-items-center mb-4"
  >
    <div>
      <strong>Critical:</strong> {alerts.filter(a => a.status === 'critical').length} student(s) require immediate attention. <br />
      <strong>Warning:</strong> {alerts.filter(a => a.status === 'warning').length} high priority alert(s) pending.
    </div>
  </Alert>
)}


      {alerts.map((alert) => (
        <Card
  key={`${alert.studentId}-${alert.status}`}
  className="mb-3 border-start border-2 shadow-sm w-100"
  style={{ backgroundColor: getBgColor(alert.status) }}
  border={
    alert.status === "escalated"
      ? "dark"
      : alert.status === "critical"
      ? "danger"
      : "warning"
  }
>
  <Card.Body className="p-3 w-100">
    <Card.Title>
      {alert.name} <small className="text-muted">({alert.studentId})</small>
    </Card.Title>

    <Card.Subtitle className="mb-2 text-muted">
      ⏱ Duration outside: <strong>{alert.durationMins} mins</strong>
    </Card.Subtitle>
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
    <p><Telephone /> - {alert.phone}</p>
    </div>
    <div className="flex items-center gap-2">
    <p><PeopleFill /> - Parent: {alert.parentPhone}</p>
    </div>
    </div>
    <div
  className="mb-3 p-3 rounded border"
  style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
>
  <p className="small text-muted mb-2 fw-semibold">
    Escalation Status:
  </p>

  <div className="d-flex flex-wrap gap-2 mb-2">
    {/* SECURITY LEVEL */}
    {alert.status === "escalated" && (
      <>
        <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
          <BellFill /> Warden Notified
        </Badge>

        <Badge bg="danger" className="d-flex align-items-center gap-1">
          <PeopleFill /> Parents Contacted
        </Badge>

        <Badge bg="dark" className="d-flex align-items-center gap-1">
          <ShieldFill /> Security Alerted
        </Badge>
      </>
    )}

    {/* PARENTS LEVEL */}
    {alert.status === "critical" && (
      <>
        <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
          <BellFill /> Warden Notified
        </Badge>

        <Badge bg="danger" className="d-flex align-items-center gap-1">
          <PeopleFill /> Parents Contacted
        </Badge>
      </>
    )}

    {/* WARDEN LEVEL */}
    {alert.status === "warning" && (
      <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1">
        <BellFill /> Warden Notified
      </Badge>
    )}
  </div>

 
</div>


    <div className="d-flex gap-2 flex-wrap mt-3">
      <Button
        variant="primary"
        size="sm"
        onClick={() =>
          toast.info(`📞 Contacting ${alert.name} at ${alert.phone}`)
        }
      >
        Contact Student
      </Button>

      <Button
        variant="success"
        size="sm"
        onClick={() =>
          toast.success(`✅ Alert for ${alert.name} resolved`)
        }
      >
        Mark Resolved
      </Button>
    </div>
  </Card.Body>
</Card>

      ))}
    </div>
  );
}

export default Alerts;