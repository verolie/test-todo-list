import { FormEvent } from "react";

type Project = {
  project_name: string;
  project_desc: string;
};

export async function onSubmitInsert(event: FormEvent<HTMLFormElement>) {
  console.log("masil");
  let projectNameInput = document.getElementById(
    "project_name"
  ) as HTMLInputElement;
  let projectDescInput = document.getElementById(
    "project_desc"
  ) as HTMLInputElement;
  const projectName = projectNameInput.value;
  const projectDesc = projectDescInput.value;
  console.log(projectNameInput);
  console.log(projectName);

  event.preventDefault();

  const projectData: Project = {
    project_name: projectName,
    project_desc: projectDesc,
  };

  const response = fetch("/api/project/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  // // Handle response if necessary
  const data = await response;
  console.log("Response data:", data);
  // ...
}
