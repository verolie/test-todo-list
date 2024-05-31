
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
import { NextRequest, NextResponse } from "next/server";

type Project = {
  project_name: string;
  project_desc: string;
};

export async function GET(req: NextRequest) {
    try {
      await connectDatabase()
      const employee = await prisma.employee.findMany();

      return new NextResponse(JSON.stringify(employee), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    } catch (error) {
      return new Response("Failed to search data")
    }
} 
