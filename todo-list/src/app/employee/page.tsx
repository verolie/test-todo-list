"use client";

import Navbar from "../view/navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../component/employee.scss";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import {
  onSubmitInsert,
  onSubmitEdit,
  onSubmitDelete,
} from "../process/employee-process";

export default function Employee() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [employee, setEmployee] = useState<EmployeeView[]>([]);
  const [project, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [inputEmployeeName, setInputEmployeeName] = useState("");
  const [inputEmployeeTitle, setInputEmployeeTitle] = useState("");
  const [inputProjectName, setInputProjectName] = useState("");
  const [inputEmployeeId, setInputEmployeeId] = useState("");
  const fetchCache = "force-no-store";
  const router = useRouter();

  type EmployeeView = {
    id: string;
    employee_name: string;
    job_title: string;
    project_name: string;
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
    const fetchEmployee = async () => {
      const response = await fetch("/api/employee/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setEmployee(data);
    };

    const fetchProject = async () => {
      const responseProj = await fetch("/api/project/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      console.log(responseProj);
      if (!responseProj.ok) {
        throw new Error("Failed to fetch projects");
      }

      const dataProj = await responseProj.json();

      setProjects(dataProj);
    };

    fetchEmployee();
    fetchProject();
  }, []);

  
  useEffect(() => {
    const clearCacheData = () => {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      alert("Complete Cache Cleared");
    };

    clearCacheData();
  }, []);

  
  function onChange(indexCheck: number) {
    router.refresh();
    if (indexCheck != null) {
      setSelected(indexCheck);
    }
  }

  function handleEdit() {
    if (selected != null) {
      setInputEmployeeName(employee[selected].employee_name);
      setInputEmployeeTitle(employee[selected].job_title);
      setInputProjectName(employee[selected].project_name);
      setInputEmployeeId(employee[selected].id);
      setIsOpenEdit(true);
    }
  }

  function handleDelete() {
    if (selected != null) {
      setInputEmployeeId(employee[selected].id);
      setIsOpenDelete(true);
    }
  }

  const handleChangeEmployeeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmployeeName(event.target.value);
  };

  const handleChangeProjectName = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputProjectName(event.target.value);
  };

  const handleChangeEmployeeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmployeeTitle(event.target.value);
  };

  return (
    <main className=" min-h-screen flex-col">
      <div>
        <header>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
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
                  value={inputEmployeeId}
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
                  value={inputEmployeeId}
                ></input>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="edit_employee_name"
                      placeholder="Insert Employee Name"
                      value={inputEmployeeName}
                      onChange={handleChangeEmployeeName}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="edit_job_title"
                      placeholder="Insert Job"
                      value={inputEmployeeTitle}
                      onChange={handleChangeEmployeeTitle}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3"></div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Main Project
                    </label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="edit_project_name"
                        value={inputProjectName}
                        onChange={handleChangeProjectName}
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
                </div>
                <div className="button-group">
                  <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                    <button className="block button-insert" type="submit">
                      Confirm
                    </button>
                    <button
                      className="block button-update"
                      onClick={() => setIsOpenEdit(false)}
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="insert_employee_name"
                      placeholder="Insert Employee Name"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="insert_job_title"
                      placeholder="Insert Job"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3"></div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Main Project
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
                <th>Employee ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Project</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.employee_name}</td>
                  <td>{employee.job_title}</td>
                  <td>{employee.project_name}</td>
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
