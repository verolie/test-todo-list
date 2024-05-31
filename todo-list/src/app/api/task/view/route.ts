
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      await connectDatabase()
      const task = await prisma.task.findMany();

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
