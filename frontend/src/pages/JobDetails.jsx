import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/jobs/${id}`)
      .then(response => setJob(response.data))
      .catch(error => console.error("Error fetching job details:", error));
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details">
      <h1>{job.req_name}</h1>
      <p><strong>Location:</strong> {job.location.city}, {job.location.state}, {job.location.country}</p>
      <p><strong>Status:</strong> {job.status}</p>
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