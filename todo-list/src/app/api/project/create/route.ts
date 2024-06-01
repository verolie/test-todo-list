
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';

export const fetchCache = 'force-no-store';

type Project = {
  project_name: string;
  project_desc: string;
};

export async function  POST(req: Request) {
  const data = await req.json();
  console.log(data)
  const { project_name, project_desc}: Project = data;

    try {
      await connectDatabase()
      const newProject = await prisma.project.create({
        data: {
          project_name,
          project_desc,
        },
      });
      return new Response("success insert new project")
    } catch (error) {
      return new Response("Failed to create employee")
    }
} 
