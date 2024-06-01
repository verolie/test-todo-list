import { FormEvent } from "react";

export const fetchCache = "force-no-store";

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
    cache: "no-store",
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
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

  event.preventDefault();

  const projectData: ProjectEdit = {
    id: id_proj,
    project_name: projectName,
    project_desc: projectDesc,
  };

  const response = fetch("/api/project/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
    cache: "no-store",
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}

export async function onSubmitDelete(event: FormEvent<HTMLFormElement>) {
  let idProjInput = document.getElementById("hidden-id") as HTMLInputElement;
  const id_proj = idProjInput.value;
  event.preventDefault();

  const response = fetch("/api/project/delete/" + id_proj, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}
