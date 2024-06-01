
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';

export const dynamic = "force-dynamic"; 

type Employee = {
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

export async function  POST(req: Request) {
  const data = await req.json();
  console.log(data)
  const { id, task_title, task_desc, task_code, status, priority_level, project_name, employee_name, due_date}: Employee = data;

  formatDateToYYYYMMDD(due_date)
  
    try {
      await connectDatabase()
      const employee = await prisma.task.update({
        where: {
            id,
        },
        data: {
            task_title,
            task_desc,
            task_code,
            status,
            priority_level,     
            project_name,
            employee_name,
            due_date
        },
      })

      console.log(employee)
      return new Response("success update new project")
    } catch (error) {
      return new Response("Failed to update employee")
    }
} 

const formatDateToYYYYMMDD = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

