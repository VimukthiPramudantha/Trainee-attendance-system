import React, { useState, useEffect } from "react";
import "./HistoryComponent.css"; // Ensure you have a CSS file for styling

const HistoryComponent = () => {
  const [history, setHistory] = useState([
    
  ]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const today = new Date();
    const updatedHistory = history.filter((item) => {
      const timeDiff = today - item.date;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      if (daysDiff > 30) {
        setReports((prev) => [...prev, item]);
        return false; // Move to Reports
      }
      return true;
    });
    setHistory(updatedHistory);
  }, []);

  return (
    <div className="history-container">
      <h3 className="history-header">
        After a Month, history will be moved to Reports
      </h3>
      {history.map((item) => (
        <div key={item.id} className="history-item">
          <span className="date-range">"📅" {item.range}</span>
          <span className={`status ${item.editable ? "editable" : "locked"}`}>
            {item.editable ? "✔ Editable" : " Locked"}
          </span>
          <div className="actions">
            <button className="view-btn">VIEW</button>
            <button
              className={`edit-btn ${item.editable ? "" : "disabled"}`}
              disabled={!item.editable}
            >
              EDIT
            </button>
          </div>
        </div>
      ))}
      {reports.length > 0 ? (
        reports.map((item) => (
          <div key={item.id} className="history-item locked">
            <div className="history-details">
              <span className="date-range"> {item.range}</span>
              <span className="status locked"> Locked </span>
            </div>
            <div className="history-actions">
              <button className="view-btn">VIEW</button>
              {item.editable && <button className="edit-btn">EDIT</button>}
            </div>
          </div>
        ))
      ) : (
        <p>No reports yet.</p>
      )}
    </div>
  );
};

export default HistoryComponent;
