import { FormEvent } from "react";

type Task = {
  task_title: string;
  task_desc: string;
  task_code: string;
  status: string;
  priority_level: string;
  project_name: string;
  employee_name: string;
  due_date: string;
};

type TaskEdit = {
  id: string;
  task_title: string;
  task_desc: string;
  task_code: string;
  status: string;
  priority_level: string;
  project_name: string;
  employee_name: string;
  due_date: string;
};

export async function onSubmitInsert(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  let projectTitleInput = document.getElementById(
    "insert_task_title"
  ) as HTMLInputElement;
  let projectDescInput = document.getElementById(
    "insert_task_desc"
  ) as HTMLInputElement;
  let projectCodeInput = document.getElementById(
    "insert_task_code"
  ) as HTMLInputElement;
  let projectStatInput = document.getElementById(
    "insert_status"
  ) as HTMLInputElement;
  let projectPrioInput = document.getElementById(
    "insert_priority_level"
  ) as HTMLInputElement;
  let projectProjInput = document.getElementById(
    "insert_project_name"
  ) as HTMLInputElement;
  let projectEmpInput = document.getElementById(
    "insert_employee_name"
  ) as HTMLInputElement;
  let projectDueInput = document.getElementById(
    "insert_due_date"
  ) as HTMLInputElement;
  const taskTitle = projectTitleInput.value;
  const taskDesc = projectDescInput.value;
  const taskCode = projectCodeInput.value;
  const status = projectStatInput.value;
  const priorityLevel = projectPrioInput.value;
  const projectName = projectProjInput.value;
  const employee_name = projectEmpInput.value;
  const due_date = projectDueInput.value;
  event.preventDefault();

  const taskData: Task = {
    task_title: taskTitle,
    task_desc: taskDesc,
    task_code: taskCode,
    status: status,
    priority_level: priorityLevel,
    project_name: projectName,
    employee_name: employee_name,
    due_date: due_date,
  };

  const response = fetch("/api/task/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}

export async function onSubmitEdit(event: FormEvent<HTMLFormElement>) {
  let idTaskInput = document.getElementById("edit_id") as HTMLInputElement;
  let projectTitleInput = document.getElementById(
    "edit_task_title"
  ) as HTMLInputElement;
  let projectDescInput = document.getElementById(
    "edit_task_desc"
  ) as HTMLInputElement;
  let projectCodeInput = document.getElementById(
    "edit_task_code"
  ) as HTMLInputElement;
  let projectStatInput = document.getElementById(
    "edit_status"
  ) as HTMLInputElement;
  let projectPrioInput = document.getElementById(
    "edit_priority_level"
  ) as HTMLInputElement;
  let projectProjInput = document.getElementById(
    "edit_project_name"
  ) as HTMLInputElement;
  let projectEmpInput = document.getElementById(
    "edit_employee_name"
  ) as HTMLInputElement;
  let projectDueInput = document.getElementById(
    "edit_due_date"
  ) as HTMLInputElement;
  const taskId = idTaskInput.value;
  const taskTitle = projectTitleInput.value;
  const taskDesc = projectDescInput.value;
  const taskCode = projectCodeInput.value;
  const status = projectStatInput.value;
  const priorityLevel = projectPrioInput.value;
  const projectName = projectProjInput.value;
  const employee_name = projectEmpInput.value;
  const due_date = projectDueInput.value;

  event.preventDefault();

  const taskData: TaskEdit = {
    id: taskId,
    task_title: taskTitle,
    task_desc: taskDesc,
    task_code: taskCode,
    status: status,
    priority_level: priorityLevel,
    project_name: projectName,
    employee_name: employee_name,
    due_date: due_date,
  };

  const response = fetch("/api/task/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  // // Handle response if necessary
  const data = await response;
  window.location.reload();
  // ...
}

export async function onSubmitDelete(event: FormEvent<HTMLFormElement>) {
  let idTaskInput = document.getElementById("hidden-id") as HTMLInputElement;
  const id_edit = idTaskInput.value;
  event.preventDefault();

  const response = fetch("/api/task/delete/" + id_edit, {
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
