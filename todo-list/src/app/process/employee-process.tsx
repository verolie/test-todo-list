import { FormEvent } from "react";

type Employee = {
  employee_name: string;
  job_title: string;
  project_name: string;
};

type EmployeeEdit = {
  id: string;
  employee_name: string;
  job_title: string;
  project_name: string;
};

export async function onSubmitInsert(event: FormEvent<HTMLFormElement>) {
  let projectNameInput = document.getElementById(
    "insert_employee_name"
  ) as HTMLInputElement;
  let projectTitleInput = document.getElementById(
    "insert_job_title"
  ) as HTMLInputElement;
  let projectProjInput = document.getElementById(
    "insert_project_name"
  ) as HTMLInputElement;
  const employeeName = projectNameInput.value;
  const employeeTitle = projectTitleInput.value;
  const projName = projectProjInput.value;

  event.preventDefault();

  const employeeData: Employee = {
    employee_name: employeeName,
    job_title: employeeTitle,
    project_name: projName,
  };

  const response = fetch("/api/employee/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  // // Handle response if necessary
  const data = await response;
  // ...
}

export async function onSubmitEdit(event: FormEvent<HTMLFormElement>) {
  let idEmployeeInput = document.getElementById("edit_id") as HTMLInputElement;
  let projectNameInput = document.getElementById(
    "edit_employee_name"
  ) as HTMLInputElement;
  let projectTitleInput = document.getElementById(
    "edit_job_title"
  ) as HTMLInputElement;
  let projectProjInput = document.getElementById(
    "edit_project_name"
  ) as HTMLInputElement;
  const employeeId = idEmployeeInput.value;
  const employeeName = projectNameInput.value;
  const employeeTitle = projectTitleInput.value;
  const projName = projectProjInput.value;

  event.preventDefault();

  const employeeData: EmployeeEdit = {
    id: employeeId,
    employee_name: employeeName,
    job_title: employeeTitle,
    project_name: projName,
  };

  const response = fetch("/api/employee/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}

export async function onSubmitDelete(event: FormEvent<HTMLFormElement>) {
  let idEmployeeInput = document.getElementById(
    "hidden-id"
  ) as HTMLInputElement;
  const id_employee = idEmployeeInput.value;

  event.preventDefault();

  const response = fetch("/api/employee/delete/" + id_employee, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}
