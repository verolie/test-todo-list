"use client";

import Navbar from "../view/navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../component/task.scss";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import {
  onSubmitInsert,
  onSubmitEdit,
  onSubmitDelete,
} from "../process/task-process";

export default function Task() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [task, setTask] = useState<TaskView[]>([]);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [project, setProjects] = useState<Project[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [inputTaskTitle, setTaskTitle] = useState("");
  const [inputTaskDesc, setTaskDesc] = useState("");
  const [inputTaskCode, setInputTaskCode] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputPriorityLevel, setInputPriorityLevel] = useState("");
  const [inputEmployee, setInputEmployee] = useState("");
  const [inputProject, setInputProject] = useState("");
  const [inputDueDate, setInputDueDate] = useState("");
  const [inputTaskId, setInputTaskId] = useState("");
  const router = useRouter();

  type TaskView = {
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
  type Employee = {
    employee_name: string;
  };

  type Project = {
    project_name: string;
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch("/api/task/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setTask(data);
    };

    const fetchProject = async () => {
      const responseProj = await fetch("/api/project/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(responseProj);
      if (!responseProj.ok) {
        throw new Error("Failed to fetch projects");
      }

      const dataProj = await responseProj.json();

      setProjects(dataProj);
    };

    const fetchEmployee = async () => {
      const responseProj = await fetch("/api/employee/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(responseProj);
      if (!responseProj.ok) {
        throw new Error("Failed to fetch projects");
      }

      const dataProj = await responseProj.json();

      setEmployee(dataProj);
    };

    fetchTask();
    fetchProject();
    fetchEmployee();
  }, []);

  function onChange(indexCheck: number) {
    router.refresh();
    if (indexCheck != null) {
      setSelected(indexCheck);
    }
  }

  function handleEdit() {
    if (selected != null) {
      setTaskTitle(task[selected].task_title);
      setTaskDesc(task[selected].task_desc);
      setInputTaskCode(task[selected].task_code);
      setInputStatus(task[selected].status);
      setInputPriorityLevel(task[selected].priority_level);
      setInputEmployee(task[selected].employee_name);
      setInputProject(task[selected].project_name);
      setInputDueDate(task[selected].due_date);
      setInputTaskId(task[selected].id);
      setIsOpenEdit(true);
    }
  }

  function handleDelete() {
    if (selected != null) {
      setInputTaskId(task[selected].id);
      setIsOpenDelete(true);
    }
  }
  const handleChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleChangeTaskCode = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTaskCode(event.target.value);
  };

  const handleChangeTaskDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDesc(event.target.value);
  };

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputStatus(event.target.value);
  };

  const handleChangePriorityLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputPriorityLevel(event.target.value);
  };

  const handleChangeEmployee = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputEmployee(event.target.value);
  };

  const handleChangeProject = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputProject(event.target.value);
  };

  const handleChangeDueDate = (date: Date | null) => {
    if (date) {
      setInputDueDate(formatDateToDDMMYYYY(date)); // Or any other date format you prefer
    } else {
      setInputDueDate(""); // Or handle null case as needed
    }
  };

  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <main className=" min-h-screen flex-col">
      <div>
        <header>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
          />
          <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
          <Navbar />
        </header>
      </div>
      <div
        className="button-group flex justify-center w-full"
        style={{ marginTop: 100 }}
      >
        <div className="flex justify-end w-6/12">
          <div className="grid grid-cols-3 gap-4 place-items-stretch w-80">
            {/* delete button */}
            <button
              className="block button-delete"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenDelete}
              onRequestClose={() => setIsOpenDelete(false)}
              style={customStyles}
            >
              <form className="w-full max-w-lg" onSubmit={onSubmitDelete}>
                <input
                  style={{ display: "none" }}
                  id="hidden-id"
                  value={inputTaskId}
                ></input>
                <h1>Are you sure want to delete this data?</h1>
                <div className="button-group">
                  <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                    <button className="block  button-delete" type="submit">
                      Delete
                    </button>
                    <button
                      className="block button-update"
                      onClick={() => setIsOpenDelete(false)}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </Modal>

            {/* update data */}
            <button
              className="block button-update"
              onClick={() => handleEdit()}
            >
              Update
            </button>
            <Modal
              isOpen={isOpenEdit}
              onRequestClose={() => setIsOpenEdit(false)}
              style={customStyles}
            >
              <form className="w-full max-w-lg" onSubmit={onSubmitEdit}>
                <input
                  style={{ display: "none" }}
                  id="edit_id"
                  value={inputTaskId}
                ></input>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="edit_task_title"
                      placeholder="Insert Title"
                      value={inputTaskTitle}
                      onChange={handleChangeTaskTitle}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Code
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="edit_task_code"
                      placeholder="Insert Description"
                      value={inputTaskCode}
                      onChange={handleChangeTaskCode}
                    />
                  </div>
                  <div className="flex flex-wrap w-full px-3 mb-2 md:mb-0 -mx-1 mt-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Description
                    </label>
                    <textarea
                      className="validate w-full  px-3"
                      id="edit_task_desc"
                      placeholder="Desctiption"
                      value={inputTaskDesc}
                      onChange={handleChangeTaskDesc}
                    />
                  </div>

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edit_status"
                        value={inputStatus}
                        onChange={handleChangeStatus}
                      >
                        <option>Pending</option>
                        <option>Ongoing</option>
                        <option>Done</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Priority Level
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edit_priority_level"
                        value={inputPriorityLevel}
                        onChange={handleChangePriorityLevel}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Project
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edit_project_name"
                        value={inputProject}
                        onChange={handleChangeProject}
                      >
                        {project.map((project) => (
                          <option>{project.project_name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Employee
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edit_employee_name"
                        value={inputEmployee}
                        onChange={handleChangeEmployee}
                      >
                        {employee.map((employee) => (
                          <option>{employee.employee_name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className=" w-6/12 px-3 mb-6 md:mb-0 mt-5">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Due Date
                    </label>
                    <DatePicker
                      className="mt-2 mb-3"
                      id="edit_due_date"
                      placeholderText="Select Due Date"
                      value={inputDueDate}
                      onChange={handleChangeDueDate}
                    />
                  </div>
                </div>
                <div className="button-group">
                  <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                    <button className="block button-insert" type="submit">
                      Confirm
                    </button>
                    <button
                      className="block button-update"
                      onClick={() => {
                        setIsOpenEdit(false);
                        setStartDate(null);
                      }}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </Modal>

            {/* insert data */}
            <button
              className="block button-insert"
              onClick={() => setIsOpenInsert(true)}
            >
              Insert
            </button>
            <Modal
              isOpen={isOpenInsert}
              onRequestClose={() => setIsOpenInsert(false)}
              style={customStyles}
            >
              <form className="w-full max-w-lg" onSubmit={onSubmitInsert}>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="insert_task_title"
                      placeholder="Insert Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Code
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="insert_task_code"
                      placeholder="Insert Description"
                    />
                  </div>
                  <div className="flex flex-wrap w-full px-3 mb-2 md:mb-0 -mx-1 mt-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Description
                    </label>
                    <textarea
                      className="validate w-full  px-3"
                      id="insert_task_desc"
                      placeholder="Desctiption"
                    />
                  </div>

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="insert_status"
                      >
                        <option>Pending</option>
                        <option>Ongoing</option>
                        <option>Done</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Priority Level
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="insert_priority_level"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Project
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="insert_project_name"
                      >
                        {project.map((project) => (
                          <option>{project.project_name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Employee
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="insert_employee_name"
                      >
                        {employee.map((employee) => (
                          <option>{employee.employee_name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      due-date
                    </label>
                    <DatePicker
                      className="mb-3"
                      id="insert_due_date"
                      placeholderText="Select Due Date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
                <div className="button-group">
                  <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                    <button className="block button-insert" type="submit">
                      Confirm
                    </button>
                    <button
                      className="block button-update"
                      onClick={() => setIsOpenInsert(false)}
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="body-emp flex justify-center w-full">
        <div className="table justify-center">
          <table className="border-separate border-spacing-x-10 border-spacing-y-10 w-full">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Task Code</th>
                <th>Status</th>
                <th>Level Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.task_title}</td>
                  <td>{task.task_code}</td>
                  <td>{task.status}</td>
                  <td>{task.priority_level}</td>
                  <td>{task.due_date}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="box"
                      checked={index === selected}
                      onChange={() => onChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
