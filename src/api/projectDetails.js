export const fetchProjects = async (offset='',options) => {
    const URL = `http://localhost:8080/v1/project?nextOffset=${offset}`;
    const response = await fetch(URL, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user"),
      },
      options
    });
    const data = await response.json();
    return data;
};


export const fetchImage = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};