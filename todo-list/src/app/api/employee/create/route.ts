// pages/api/employees.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

type Employee = {
  employeeName: string;
  jobTitle: string;
  projectName: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { employeeName, jobTitle, projectName}: Employee = req.body;

    try {
      const newEmployee = await prisma.employee.create({
        data: {
          employee_name: employeeName,
          job_title: jobTitle,
          project_name: projectName,
        },
      });
      res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ success: false, message: 'Failed to create employee' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
