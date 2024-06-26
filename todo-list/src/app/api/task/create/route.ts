// pages/api/employees.ts

import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';

export const fetchCache = 'force-no-store';

type Task = {
  task_title     : string;
  task_desc      : string;
  task_code      : string;
  status       : string; 
  priority_level : string;
  project_name   : string;
  employee_name  : string;
  due_date       : string;
};

export async function  POST(req: Request) {
  const data = await req.json();
  console.log(data)
  const { task_title, task_desc, task_code, status, priority_level, project_name, employee_name, due_date}: Task = data;

  formatDateToYYYYMMDD(due_date)
    try {
      const newTask = await prisma.task.create({
        data: {
          task_title,
          task_desc,
          task_code,
          status,
          priority_level,
          project_name,
          employee_name,
          due_date,
        },
      });
      return new Response("success insert new task")
    } catch (error) {
      console.error('Error creating task:', error);
      return new Response("Failed to create task")
    }
}

const formatDateToYYYYMMDD = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };