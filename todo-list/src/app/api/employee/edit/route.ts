
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';



type Employee = {
  id: string;
  employee_name: string;
  job_title: string;
  project_name: string;
};

export async function  POST(req: Request) {
  const data = await req.json();
  console.log(data)
  const { id, employee_name, job_title, project_name}: Employee = data;

  
    try {
      await connectDatabase()
      const project = await prisma.employee.update({
        where: {
            id,
        },
        data: {
            employee_name,
            job_title,
            project_name
        },
      })
      return new Response("success update new project")
    } catch (error) {
      return new Response("Failed to update employee")
    }
} 
