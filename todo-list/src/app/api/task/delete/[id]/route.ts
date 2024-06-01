import { prisma } from '../../../../../../lib/prisma';
import { connectDatabase } from '../../../multi';
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(params.id)
  const id = params.id;

    try {
      await connectDatabase()
      const newProject = await prisma.task.delete({
        where: {
          id,
        }
      })
      return new Response("success delete new project")
    } catch (error) {
      return new Response("Failed to delete employee")
    }
} 
