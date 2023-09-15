// components
import ProjectsTable from "components/Projects/ProjectsTable";
// layout for page
import AdminProjects from "layouts/AdminProjects";
//Functions
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [poolRequests, setPoolRequests] = useState([]);

  /** 
   * useEffect is a hook that gets called when the Page is mounted is mounted.
   */
  useEffect(() => {
    console.log("Fetching projects from API ");
    getProjects()
      .then(data => {
        console.log("Fetched projects:", data);
        setProjects(data);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  /**
   * Fetch projects from API
   */
  function getProjects() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/projects", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetching projects from API response", response);
          resolve(data);
        } else {
          // Handle non-ok response (e.g., reject with an error message)
          reject(new Error(`Failed to fetch projects. Status: ${response.status}`));
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }


  /**
   * Render the page
   */
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ProjectsTable projects={projects} />

        </div>

      </div>
    </>
  );
}

Projects.layout = AdminProjects;
