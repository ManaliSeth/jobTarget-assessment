import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/jobs")
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => console.error("Error fetching jobs:", error));
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
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
