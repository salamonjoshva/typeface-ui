import React from 'react'
import styles from "../project/Project.module.css";
import { Link } from "react-router-dom";
import { fetchImage } from '../../api/projectDetails';
import { useState,useEffect } from 'react';
import LoadingSpinner from '../reusable/LoadingSpinner';

const ProjectDetail = React.forwardRef(({ project }, ref) => {
  const [imageURL,setImageURL] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(() => {
      const imageData = fetchImage('https://picsum.photos/350/200');
      imageData
        .then((url) =>  {
          setImageURL(url)
          setIsLoading(false)
        })
        .catch((error) => console.error('Error fetching images:', error));
        return () => {
          URL.revokeObjectURL(imageURL);
        };  
  }, []);

  const projectDetail = (
    <div key={project.id}>
      <Link
        className={`inline-block relative max-w-sm ${styles["min-w-350"]} bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer`}
        to={`../project/${project.id}`}
        key={project.id}
      >
        <div className="overflow-x-hidden rounded-2xl relative">
          <div
            className="h-50 rounded-2xl w-full object-cover justify-center"
            style={{
              color: "white",
            }}
          >
            {!isLoading &&  <img src={imageURL}></img> }
            {isLoading &&  <LoadingSpinner></LoadingSpinner> }
          </div>
          
        </div>
        
        <div className="mt-4 pl-2 mb-2 flex justify-between ">
          <div>
            <p className="text-lg font-semibold text-gray-900 mb-0">
              {project.projectName}
            </p>
            <p className="text-sm text-gray-700 mt-0">{project.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
  const content = ref ? (
    <article ref={ref}>{projectDetail}</article>
  ) : (
    <article>{projectDetail}</article>
  );
  return content;
});

export default ProjectDetail;
