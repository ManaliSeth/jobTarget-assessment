import { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobs";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    const jobs = await getAllJobs();
    setJobs(jobs);
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td><Link to={`/job/${job.id}`}>{job.req_name}</Link></td>
              <td>{job.location.city}, {job.location.state}</td>
              <td className={job.status === "Active" ? "active" : "inactive"}>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
