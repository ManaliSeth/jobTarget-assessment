import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../api/jobs";
import "../styles.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const getJob = async (id) => {
    const job = await getJobById(id);
    setJob(job);
  }

  useEffect(() => {
    getJob(id);
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details">
      <h1>{job.req_name}</h1>
      <p><strong>Location:</strong> {job.location.city}, {job.location.state}, {job.location.country}</p>
      <p className={job.status === "Active" ? "active" : "inactive"}>
        <strong className="text">Status: </strong>
        {job.status}
      </p>
      <p><strong>Description:</strong> {job.description}</p>

      <h2>Job Postings</h2>
      <ul>
        {job.postings.map(posting => (
          <li key={posting.id}>{posting.sitename} - {posting.duration} days</li>
        ))}
      </ul>

      <Link to="/" className="back-link">Back to Job Listings</Link>
    </div>
  );
};

export default JobDetails;