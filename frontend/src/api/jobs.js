import { apiClient } from "./client";

export const getAllJobs = async () => {
    try {
        const res = await apiClient.get("/jobs");
        return res.data ?? [];
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}

export const getJobById = async (jobId) => {
    try {
        const res = await apiClient.get(`/jobs/${jobId}`);
        return res.data ?? null;
    } catch (error) {
        console.log("Error: ", error);
        return null;
    }
}