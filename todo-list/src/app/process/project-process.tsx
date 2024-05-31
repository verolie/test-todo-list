import { FormEvent } from "react";

type Project = {
  project_name: string;
  project_desc: string;
};

type ProjectEdit = {
  id: string;
  project_name: string;
  project_desc: string;
};

export async function onSubmitInsert(event: FormEvent<HTMLFormElement>) {
  let projectNameInput = document.getElementById(
    "insert_project_name"
  ) as HTMLInputElement;
  let projectDescInput = document.getElementById(
    "insert_project_desc"
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

export async function onSubmitEdit(event: FormEvent<HTMLFormElement>) {
  let idProjInput = document.getElementById("id") as HTMLInputElement;
  let projectNameInput = document.getElementById(
    "project_names"
  ) as HTMLInputElement;
  let projectDescInput = document.getElementById(
    "project_descs"
  ) as HTMLInputElement;
  const id_proj = idProjInput.value;
  const projectName = projectNameInput.value;
  const projectDesc = projectDescInput.value;
  console.log(projectNameInput);
  console.log(projectName);

  event.preventDefault();

  const projectData: ProjectEdit = {
    id: id_proj,
    project_name: projectName,
    project_desc: projectDesc,
  };

  console.log(projectData);

  const response = fetch("/api/project/edit", {
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

export async function onSubmitDelete(event: FormEvent<HTMLFormElement>) {
  console.log("masil");
  let idProjInput = document.getElementById("hidden-id") as HTMLInputElement;
  const id_proj = idProjInput.value;
  console.log(id_proj);

  event.preventDefault();

  const response = fetch("/api/project/delete/" + id_proj, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // // Handle response if necessary
  const data = await response;
  console.log("Response data:", data);
  // ...
}
