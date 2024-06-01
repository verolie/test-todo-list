
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';

export const dynamic = "force-dynamic"; 

type Project = {
  id: string;
  project_name: string;
  project_desc: string;
};

export async function  POST(req: Request) {
  const data = await req.json();
  console.log(data)
  const { id, project_name, project_desc}: Project = data;

  
    try {
      await connectDatabase()
      const project = await prisma.project.update({
        where: {
            id,
        },
        data: {
            project_name,
            project_desc,
        },
      })
      return new Response("success update new project")
    } catch (error) {
      return new Response("Failed to update employee")
    }
} 
