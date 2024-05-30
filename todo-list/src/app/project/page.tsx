"use client";

import Navbar from "../view/navbar";
import React, { useState } from "react";
import "../component/project.scss";
import Modal from "react-modal";

export default function Project() {
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
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="validate block"
                      id="grid-name"
                      placeholder="Insert Employee Name"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-full px-3 mb-3 md:mb-0 -mx-3">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Project Description
                  </label>
                  <textarea
                    className="validate block w-full  px-3"
                    id="grid-Job"
                    placeholder="Desctiption"
                  />
                </div>
              </form>
              <div className="button-group">
                <div className=" flex grid grid-cols-2 gap-4 place-items-stretch justify-end mt-3">
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
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="validate block"
                      id="grid-title"
                      placeholder="Insert Employee Name"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-full px-3 mb-3 md:mb-0 -mx-3">
                  <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Project Description
                  </label>
                  <textarea
                    className="validate block w-full  px-3"
                    id="grid-desc"
                    placeholder="Desctiption"
                  />
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
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Desc</th>
                <th>Total Person</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Finpoint</td>
                <td>Software engineer</td>
                <td>100</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Finexus</td>
                <td>Software engineer</td>
                <td>50</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ada</td>
                <td>Software engineer</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
