import Navbar from "../view/navbar";
import "../component/task.scss";

export default function Task() {
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
                {/*
                - task_id
- project_id not null
- employee_id bisa null
- task_title
- task_desc
- task_code
- status
- priority_level
- start-date	
- due_date
                */}
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
