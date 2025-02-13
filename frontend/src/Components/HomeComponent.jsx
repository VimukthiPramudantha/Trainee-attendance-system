import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "./HomeComponent.css";
import { API_PREFIX } from "../Config/Api";

const HomeComponent = () => {
  const [date, setDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [expandedSpecializations, setExpandedSpecializations] = useState({});
  const [trainees, setTrainees] = useState([]);

  // Specialization mapping based on weekdays
  const specializationByDay = {
    Monday: ["C#", "Project Managers", "BA", "DevOps", "AI & Data Science"],
    Tuesday: ["Python", "BCMS", "Chatbot"],
    Wednesday: ["PHP", "UI/UX", "WordPress"],
    Thursday: ["Java", "PowerProx"],
    Friday: ["React", "MERN", "QA"],
  };

  // Get the selected weekday name
  const getDayOfWeek = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  // Fetch trainees from the database
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await axios.get(`${API_PREFIX}trainees/all`); 
        const allTrainees = response.data;

        const day = getDayOfWeek(date);
        const allowedSpecializations = specializationByDay[day] || [];

        // Filter trainees based on specialization
        const filteredTrainees = allTrainees.filter((t) =>
          allowedSpecializations.includes(t.specialization)
        );
        setTrainees(filteredTrainees);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };

    fetchTrainees();
  }, [date]);

  // Get attendance for the selected date
  const attendance = attendanceRecords[date.toDateString()] || {};

  // Handle attendance checkboxes
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

    // Submit attendance
    const saveAttendance = async () => {
      try {
        const date = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)
  
        // Convert attendance object into an array of records
        const attendanceRecords = Object.keys(attendance).map((traineeID) => ({
          traineeID,
          date,
          status: attendance[traineeID],
        }));
  
        // Send attendance data to the backend
        await Promise.all(
          attendanceRecords.map(record =>
            axios.post(`${API_PREFIX}attendance/mark`, record)
          )
        );
  
        alert("Attendance marked successfully!");
      } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Failed to mark attendance.");
      }
    };


  return (
    <div className="home-container">
      <div className="sidebar">
        <Calendar onChange={setDate} value={date} />
        <div className="summary">
          <p>Total Trainees: {trainees.length}</p>
          <p>
            Present: {Object.values(attendance).filter((a) => a === "Present").length}
          </p>
          <p>
            Absent: {Object.values(attendance).filter((a) => a === "Absent").length}
          </p>
        </div>
      </div>

      <div className="main-content">
        <h2>{getDayOfWeek(date)}'s Trainees</h2>

        {Object.keys(specializationByDay).map((day) => {
          if (day !== getDayOfWeek(date)) return null;

          return specializationByDay[day].map((spec) => (
            <div key={spec} className="specialization-group">
              <div className="specialization-header" onClick={() => toggleSpecialization(spec)}>
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
                        <tr key={trainee.traineeID}>
                          <td>{trainee.traineeID}</td>
                          <td>{trainee.name}</td>
                          <td>{trainee.specialization}</td>
                          <td>
                            <div>
                              <input
                                type="checkbox"
                                className="attendance-checkbox attendance-present"
                                checked={attendance[trainee.traineeID] === "Present"}
                                onChange={() => handleAttendanceChange(trainee.traineeID, "Present")}
                              />
                              <input
                                type="checkbox"
                                className="attendance-checkbox attendance-absent"
                                checked={attendance[trainee.traineeID] === "Absent"}
                                onChange={() => handleAttendanceChange(trainee.traineeID, "Absent")}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          ));
        })}

        <button onClick={saveAttendance} className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default HomeComponent;
