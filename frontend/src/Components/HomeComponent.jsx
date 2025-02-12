import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./HomeComponent.css";

const HomeComponent = () => {
  const [date, setDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [expandedSpecializations, setExpandedSpecializations] = useState({});

  // Specialization mapping based on weekdays
  const specializationByDay = {
    Monday: ["C#", "Project Managers", "BA", "DevOps", "AI & Data Science"],
    Tuesday: ["Python", "BCMS", "Chatbot"],
    Wednesday: ["PHP", "UI/UX", "WordPress"],
    Thursday: ["Java", "PowerProx"],
    Friday: ["React", "MERN", "QA"],
  };

  // Sample trainees (Grouped by Specialization)
  const allTrainees = [
    { id: 101, name: "Alice Johnson", specialization: "C#" },
    { id: 102, name: "Michael Brown", specialization: "Project Managers" },
    { id: 103, name: "David Smith", specialization: "BA" },
    { id: 104, name: "Sophia Martinez", specialization: "DevOps" },
    { id: 105, name: "Chris Wilson", specialization: "AI & Data Science" },
    { id: 201, name: "Emma Davis", specialization: "Python" },
    { id: 202, name: "Noah Thomas", specialization: "BCMS" },
    { id: 203, name: "Olivia White", specialization: "Chatbot" },
    { id: 301, name: "Liam Roberts", specialization: "PHP" },
    { id: 302, name: "Emily Clark", specialization: "UI/UX" },
    { id: 303, name: "Ethan Hall", specialization: "WordPress" },
    { id: 401, name: "Mason Scott", specialization: "Java" },
    { id: 402, name: "Ava Lewis", specialization: "PowerProx" },
    { id: 501, name: "James Walker", specialization: "React" },
    { id: 502, name: "Isabella Young", specialization: "MERN" },
    { id: 503, name: "Benjamin Allen", specialization: "QA" },
  ];

  // Get the selected weekday name
  const getDayOfWeek = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  // Filter trainees based on selected date's specializations
  const [trainees, setTrainees] = useState([]);
  useEffect(() => {
    const day = getDayOfWeek(date);
    const allowedSpecializations = specializationByDay[day] || [];
    const filteredTrainees = allTrainees.filter((t) =>
      allowedSpecializations.includes(t.specialization)
    );
    setTrainees(filteredTrainees);
  }, [date]);

  // Get attendance for the selected date
  const attendance = attendanceRecords[date.toDateString()] || {};

  // Handle attendance checkboxes (only one selectable per trainee)
  const handleAttendanceChange = (id, status) => {
    setAttendanceRecords((prevRecords) => {
      const updatedRecords = { ...prevRecords };
      const selectedDate = date.toDateString();

      if (!updatedRecords[selectedDate]) {
        updatedRecords[selectedDate] = {};
      }
      updatedRecords[selectedDate][id] = status;

      return updatedRecords;
    });
  };

  // Handle specialization dropdown toggle
  const toggleSpecialization = (specialization) => {
    setExpandedSpecializations((prev) => ({
      ...prev,
      [specialization]: !prev[specialization],
    }));
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <Calendar onChange={setDate} value={date} />
        <div className="summary">
          <p>Total Trainees: {trainees.length}</p>
          <p>Present: {Object.values(attendance).filter((a) => a === "Present").length}</p>
          <p>Absent: {Object.values(attendance).filter((a) => a === "Absent").length}</p>
        </div>
      </div>

      <div className="main-content">
        <h2>{getDayOfWeek(date)}'s Trainees</h2>

        {Object.keys(specializationByDay).map((day) => {
          if (day !== getDayOfWeek(date)) return null;

          return specializationByDay[day].map((spec) => (
            <div key={spec} className="specialization-group">
              <div
                className="specialization-header"
                onClick={() => toggleSpecialization(spec)}
              >
                <h3>{spec}</h3>
                <span>{expandedSpecializations[spec] ? "▼" : "▶"}</span>
              </div>

              {expandedSpecializations[spec] && (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Present / Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainees
                      .filter((t) => t.specialization === spec)
                      .map((trainee) => (
                        <tr key={trainee.id}>
                          <td>{trainee.id}</td>
                          <td>{trainee.name}</td>
                          <td>{trainee.specialization}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={attendance[trainee.id] === "Present"}
                              onChange={() => handleAttendanceChange(trainee.id, "Present")}
                            /> ✅
                            <input
                              type="checkbox"
                              checked={attendance[trainee.id] === "Absent"}
                              onChange={() => handleAttendanceChange(trainee.id, "Absent")}
                            /> ❌
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          ));
        })}

        <button className="save-btn">Save Attendance</button>
      </div>
    </div>
  );
};

export default HomeComponent;
