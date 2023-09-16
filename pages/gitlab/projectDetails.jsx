// components
import ProjectsTable from "components/Projects/ProjectsTable";
// layout for page
import AdminProjectDetails from "layouts/AdminProjectDetails";
//Functions
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MergerRequestsTable from "@/components/MergeRequest/MergeRequestTable";
import ProjectStats from "@/components/Projects/ProjectStats";



export default function ProjectDetails() {


  const [project, setProject] = useState("");
  const [mergeRequests, setMergeRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [statsMap, setStatsMap] = useState(new Map());
  //Get ID from request
  const router = useRouter();
  const { id } = router.query;

  /** 
   * useEffect is a hook that gets called when the Page is mounted is mounted.
   */
  useEffect(() => {
    const statsMap = new Map();
    //Gettting the project details
    console.log("Fetching details from Gitlab API for project :", id);
    getProjectDetail(id)
      .then(data => {
        setProject(data);
      })
      .catch(error => {
        console.error("Error fetching project detail for project :", id, error);
      });
    //Gettting the merge requests
    getMergeReuests(id)
      .then(data => {
        setMergeRequests(data);
        statsMap.set("total", data.length);
        statsMap.set("merged", data.filter(mr => mr.state === "merged").length);
        statsMap.set("percent_merged", (statsMap.get("merged") / statsMap.get("total")) * 100);
        

      }).catch(error => {
        console.error("Error fetching merge requests for project :", id, error);
      });

      getProjectMembers(id)
      .then(data => {
        setMembers(data);
        statsMap.set("members", data.length);  

      }).catch(error => {
        console.error("Error fetching merge requests for project :", id, error);
      });

      setStatsMap(statsMap);

  }, []);

  /**
   * Fetch projects from API
   */
  function getProjectDetail(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/projects/" + id, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
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

  function getProjectMembers(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/projects/" + id+"/members", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          // Handle non-ok response (e.g., reject with an error message)
          reject(new Error(`Failed to fetch projects members. Status: ${response.status}`));
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }


  function getMergeReuests(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/projects/" + id + "/merge_requests", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
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
      <ProjectStats stats={statsMap} />
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">

          <MergerRequestsTable mergeRequests={mergeRequests} project={project} />

        </div>

      </div>
    </>
  );
}

ProjectDetails.layout = AdminProjectDetails;

