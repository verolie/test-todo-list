
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
      await connectDatabase()
      const projects = await prisma.project.findMany({
        select: {
            project_name: true
        }
      });

      return new NextResponse(JSON.stringify(projects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    } catch (error) {
      return new Response("Failed to search data")
    }
} 
