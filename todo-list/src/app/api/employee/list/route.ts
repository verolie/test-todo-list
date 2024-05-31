
import { prisma } from '../../../../../lib/prisma';
import { connectDatabase } from '../../multi';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
      await connectDatabase()
      const employee = await prisma.employee.findMany({
        select: {
            employee_name: true
        }
      });

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
