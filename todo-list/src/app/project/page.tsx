import Navbar from "../view/navbar";
import React from "react";
import "../component/project.scss";

export default function Project() {
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
      <div className="button-group flex justify-center w-full">
        <div className="flex justify-end w-6/12">
          <div className=" flex grid grid-cols-3 gap-4 place-items-stretch w-80">
            <div className="block button-delete">Delete</div>
            <div className="block button-update">Update</div>
            <div className="block button-insert">Insert</div>
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
