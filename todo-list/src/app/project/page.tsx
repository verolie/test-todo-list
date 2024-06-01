"use client";

import Navbar from "../view/navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../component/project.scss";
import Modal from "react-modal";
import {
  onSubmitInsert,
  onSubmitEdit,
  onSubmitDelete,
} from "../process/project-process";

export default function Project() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [projects, setProjects] = useState<ProjectView[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [inputProjectName, setInputProjectName] = useState("");
  const [inputProjectDesc, setInputProjectDesc] = useState("");
  const [inputProjectId, setInputProjectId] = useState("");
  const router = useRouter();
  const fetchCache = "force-no-store";

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

  type ProjectView = {
    id: string;
    project_name: string;
    project_desc: string;
  };

  useEffect(() => {
    const dynamic = "force-dynamic";
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/view", {
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
        setProjects(data);
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  function onChange(indexCheck: number) {
    router.refresh();

    if (indexCheck != null) {
      setSelected(indexCheck);
    }
  }

  function handleEdit() {
    if (selected != null) {
      setInputProjectName(projects[selected].project_name);
      setInputProjectDesc(projects[selected].project_desc);
      setInputProjectId(projects[selected].id);
      setIsOpenEdit(true);
    }
  }
  function handleDelete() {
    if (selected != null) {
      setInputProjectId(projects[selected].id);
      setIsOpenDelete(true);
    }
  }

  const handleChangeProjectName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputProjectName(event.target.value);
  };

  const handleChangeProjectDesc = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputProjectDesc(event.target.value);
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
                  value={inputProjectId}
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
                <div className="flex flex-wrap -ml-3 mb-3">
                  <div className="w-full md:w-6/7 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Id Project
                    </label>
                  </div>
                  <input
                    type="text"
                    className="validate w-full px-3 mx-3"
                    id="id"
                    value={inputProjectId}
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="project_names"
                      placeholder="Insert Project Name"
                      value={inputProjectName}
                      onChange={handleChangeProjectName}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-full px-3 mb-3 md:mb-3 -mx-3">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                    Project Description
                  </label>
                  <textarea
                    className="validate w-full  px-3"
                    id="project_descs"
                    placeholder="Desctiption"
                    value={inputProjectDesc}
                    onChange={handleChangeProjectDesc}
                  />
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
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="insert_project_name"
                      placeholder="Insert Project Name"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-full px-3 mb-3 md:mb-3 -mx-3">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                    Project Description
                  </label>
                  <textarea
                    className="validate w-full  px-3"
                    id="insert_project_desc"
                    placeholder="Desctiption"
                  />
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
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Desc</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td id="project_name">{project.project_name}</td>
                  <td id="project_desc">{project.project_desc}</td>
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
