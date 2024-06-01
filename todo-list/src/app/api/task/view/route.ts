
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; 

export async function GET(req: NextRequest) {
    try {
      await connectDatabase()
      const task = await prisma.task.findMany();

      console.log(task)
      return new NextResponse(JSON.stringify(task), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    } catch (error) {
      return new Response("Failed to search data")
    }
} 
