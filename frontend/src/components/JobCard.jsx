const JobCard = ({ job }) => (
<div className="job-card">
<h3>{job.title}</h3>
<p className="company">{job.company}</p>
<p className="meta">{job.location} • {job.type}</p>
<button className="primary-btn">Apply Now</button>
</div>
);
5
export default JobCard;