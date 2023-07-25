import ProjectDetail from "./ProjectDetail";
import { useRef, useCallback, useState } from "react";
import useProject from "../../hooks/useProject";
import LoadingSpinner from "../reusable/LoadingSpinner";

const Project = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, data, hasNextPage, nextOffset } = useProject(pageNum);

  const intObserver = useRef();
  const lastProjectRef = useCallback(
    (project) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((project) => {
        if (project[0].isIntersecting && hasNextPage) {
          console.log("last project");
          setPageNum(prev => prev + 1);
        }
      });

      if (project) intObserver.current.observe(project);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  const projectDetail = data.map((project, i) => {
    if (data.length === i + 1) {
      return (
        <ProjectDetail
          ref={lastProjectRef}
          key={project.id}
          project={project}
        ></ProjectDetail>
      );
    }
    return <ProjectDetail key={project.id} project={project}></ProjectDetail>;
  });

  return (
    <>
      {projectDetail}
      {isLoading && <LoadingSpinner></LoadingSpinner>}
    </>
  );
};

export default Project;
