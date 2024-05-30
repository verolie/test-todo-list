"use client";

import Navbar from "../view/navbar";
import React, { useState } from "react";
import "../component/task.scss";
import Modal from "react-modal";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Task() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenInsert, setIsOpenInsert] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

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
          <div className=" flex grid grid-cols-3 gap-4 place-items-stretch w-80">
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
                <div className=" flex grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
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
                      Title Task
                    </label>
                    <input
                      type="text"
                      className="validate block"
                      id="grid-title"
                      placeholder="Insert Title"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Task Description
                    </label>
                    <input
                      type="text"
                      className="validate block"
                      id="grid-Job"
                      placeholder="Insert Description"
                    />
                  </div>
                  <div className="flex flex-wrap w-full px-3 mb-2 md:mb-0 -mx-1 mt-3">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Project Description
                    </label>
                    <textarea
                      className="validate block w-full  px-3"
                      id="grid-desc"
                      placeholder="Desctiption"
                    />
                  </div>

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-status"
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
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-priority-level"
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
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

                  <div className=" w-6/12 px-3 mb-6 md:mb-0">
                    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Employee
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-employee"
                      >
                        <option>Rian</option>
                        <option>Debby</option>
                        <option>Gema</option>
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
                      Employee
                    </label>
                    <DatePicker
                      className="block mt-2 mb-3"
                      id="date-due"
                      placeholderText="Select Due Date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>
              </form>
              <div className="button-group">
                <div className=" flex grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
                  <button
                    className="block button-insert"
                    onClick={() => {
                      setIsOpenEdit(false);
                      setStartDate(null);
                    }}
                  >
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
                      className="validate block"
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
                      className="validate block"
                      id="grid-Job"
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
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
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
                <div className=" flex grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
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
        <div className="block table flex justify-center">
          <table className="border-separate border-spacing-x-10 border-spacing-y-10 w-full">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Task Code</th>
                <th>Status</th>
                <th>Level Priority</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Fix Bug</td>
                <td>100</td>
                <td>Pending</td>
                <td>Low</td>
                <td>15/05/29</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Fix Bug</td>
                <td>100</td>
                <td>Pending</td>
                <td>Low</td>
                <td>15/05/29</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Fix Bug</td>
                <td>100</td>
                <td>Pending</td>
                <td>Low</td>
                <td>15/05/29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
