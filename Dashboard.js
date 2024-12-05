import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dashboard', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Projects: {stats.total_projects}</p>
      <p>Tasks Completed: {stats.completed_tasks}</p>
      <p>Tasks In Progress: {stats.in_progress_tasks}</p>
      <p>Tasks Not Started: {stats.not_started_tasks}</p>
    </div>
  );
};

export default Dashboard;
