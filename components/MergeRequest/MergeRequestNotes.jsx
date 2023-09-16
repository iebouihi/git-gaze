import { useState, useEffect } from 'react';

const MergeRequestNotes = ({ projectId, mergeRequestIID }) => {
  const [notesCount, setNotesCount] = useState(0);
  const [lastNote, setLastNote] = useState("");

  useEffect(() => {
    getMergeRequestNotes(projectId, mergeRequestIID)
      .then(data => {
        setNotesCount(data.length);
        if (data.length > 0) {
          setLastNote(data[0].author.username);
        }

      })
      .catch(error => {
        console.error("Error fetching merge requests for project :", projectId, error);
      });
  }, [projectId, mergeRequestIID]);

  function getMergeRequestNotes(projectId, mergeRequestIID) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/projects/" + projectId + "/merge_requests/" + mergeRequestIID + "/notes", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch merge request notes. Status: ${response.status}`));
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });




  }
  return (
    <div>Notes : {notesCount}
      <br />
      {notesCount > 0 ? "Last " + lastNote : ""}</div>
  );
}

export default MergeRequestNotes;