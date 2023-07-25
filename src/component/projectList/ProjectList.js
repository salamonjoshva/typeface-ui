import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../header/Header";

const ProjectList = (props) => {
  const { id } = useParams();

  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const fetchProjectList = async () => {
      const response = await fetch(
        "http://localhost:8080/v1/list/projectFiles",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
            projectId: id,
          },
        }
      );
      const data = await response.json();
      setProjectList(data);
    };
    fetchProjectList();
  }, []);

  const uploadFile = async () => {
    const response = await fetch(
      "http://localhost:8080/v1/upload/file",
      {
        method:'POST',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user"),
          projectId: id,
        },
      }
    );
    // const data = await response.json();
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    uploadFile()
  };

  return (
    <>
      <Header></Header>
      <div
        style={{
          margin: "10px",
        }}
      >
        <form onSubmit={uploadHandler} style={{display:'block'}}>
          <div>
            <input type="file" id="file" multiple />
          </div>
          <div style={{margin:'10px'}}>
          <button
                type="submit"
                className="group relative flex justify-center py-2 px-4 border border-transparent
              text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500"
              >
                Submit
              </button>
          </div>
        </form>
      </div>
      <table class="table-auto border-collapse border border-slate-400 border-spacing-1">
        <thead>
          <tr>
            <th class="border border-slate-400 border-spacing-1">File Name</th>
            <th class="border border-slate-400 border-spacing-1">
              Uploaded By
            </th>
          </tr>
        </thead>
        <tbody>
          {projectList.map((file) => (
            <tr>
              <td class="border border-slate-300 border-spacing-1">
                {file.name}
              </td>
              <td class="border border-slate-300 border-spacing-1">
                {file.createdBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProjectList;
