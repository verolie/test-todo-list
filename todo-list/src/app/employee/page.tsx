"use client";

import Navbar from "../view/navbar";
import React, { useState } from "react";
import "../component/employee.scss";
import Modal from "react-modal";

export default function Employee() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenInsert, setIsOpenInsert] = useState(false);

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
              onClick={() => setIsOpenDelete(true)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenDelete}
              onRequestClose={() => setIsOpenDelete(false)}
              style={customStyles}
            >
              <h1>Are you sure want to delete this data?</h1>
              <div className="button-group">
                <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                  <button
                    className="block button-delete"
                    onClick={() => setIsOpenDelete(false)}
                  >
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
            </Modal>

            {/* update data */}
            <button
              className="block button-update"
              onClick={() => setIsOpenEdit(true)}
            >
              Update
            </button>
            <Modal
              isOpen={isOpenEdit}
              onRequestClose={() => setIsOpenEdit(false)}
              style={customStyles}
            >
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="grid-name"
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
                      id="grid-job-title"
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
                        id="grid-priject"
                      >
                        <option>Finexus</option>
                        <option>Finpoint</option>
                        <option>Texas</option>
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
              </form>
              <div className="button-group">
                <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                  <button
                    className="block button-insert"
                    onClick={() => setIsOpenEdit(false)}
                  >
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
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="validate"
                      id="grid-name"
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
                      id="grid-job-title"
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
                        id="grid-project"
                      >
                        <option>Finexus</option>
                        <option>Finpoint</option>
                        <option>Texas</option>
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
              </form>
              <div className="button-group">
                <div className="grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                  <button
                    className="block button-insert"
                    onClick={() => setIsOpenInsert(false)}
                  >
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Malcolm Lockyer</td>
                <td>Software engineer</td>
                <td>Finpoint</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Shining Star</td>
                <td>Software engineer</td>
                <td>Finexus</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Shining Star</td>
                <td>Software engineer</td>
                <td>Finexus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
