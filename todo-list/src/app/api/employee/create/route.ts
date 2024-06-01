import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
export const fetchCache = 'force-no-store';

type Employee = {
  employee_name: string;
  job_title: string;
  project_name: string;
};

export async function  POST(req: Request) {
    const data = await req.json();
    console.log(data)
    const { employee_name, job_title, project_name }: Employee = data;

    try {
      await connectDatabase()
      console.log(employee_name)
      const newEmployee = await prisma.employee.create({
        data: {
          employee_name, 
          job_title,
          project_name,
        },
      });
      return new Response("success insert new employee")
    } catch (error) {
      return new Response("Failed to create employee")
    }
}