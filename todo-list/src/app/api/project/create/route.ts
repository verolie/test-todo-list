// pages/api/employees.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

type Project = {
  projectName: string;
  projectDesc: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { projectName, projectDesc}: Project = req.body;

    try {
      const newEmployee = await prisma.project.create({
        data: {
          project_name: projectName,
          project_desc: projectDesc,
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
