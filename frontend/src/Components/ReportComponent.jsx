import React, { useState, useEffect } from "react";
import "./ReportComponent.css"; // Ensure you create this CSS file

const ReportComponent = () => {
  // Sample data (Replace with actual database fetch)
  const [reports, setReports] = useState([
    {
      id: 1,
      month: "February 2025",
      weeks: 2,
      lastEdit: "February 10, 2025",
      status: "Pending",
    },
    {
      id: 2,
      month: "January 2025",
      weeks: 4,
      lastEdit: "January 31, 2025",
      status: "Finalized",
    },
    {
      id: 3,
      month: "December 2024",
      weeks: 4,
      lastEdit: "December 27, 2024",
      status: "Finalized",
    },
  ]);

  return (
    <div className="report-container">
      <h3 className="report-header">Monthly Records</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Week Count</th>
            <th>Last Edit Date</th>
            <th>Status</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.month}</td>
              <td>{report.weeks}</td>
              <td>{report.lastEdit}</td>
              <td
                className={
                  report.status === "Pending" ? "pending" : "finalized"
                }
              >
                {report.status}
              </td>
              <td>
                {report.status === "Finalized" ? (
                  <button className="download-btn">Download</button>
                ) : (
                  <button className="disabled-btn" disabled>
                    Pending
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportComponent;
