// src/pages/dashboard/EmployerDashboard.js
import React, { useState } from "react";
import jobs from "../../services/DummyJobs";


export default function EmployerDashboard() {
const [list, setList] = useState(jobs);


const deleteJob = id => setList(list.filter(j => j.id !== id));


return (
<div className="container">
<h2>Employer Dashboard</h2>
{list.map(job => (
<div key={job.id} className="job-card">
<h3>{job.title}</h3>
<button onClick={() => deleteJob(job.id)}>Delete</button>
</div>
))}
</div>
);
}