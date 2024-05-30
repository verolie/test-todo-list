// pages/api/employees.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

type Task = {
  taskTitle     : string;
  taskDesc      : string;
  taskCode      : string;
  status       : string; 
  priorityLevel : string;
  projectName   : string;
  employeeName  : string;
  dueDate       : string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { taskTitle, taskDesc, taskCode, status, priorityLevel, projectName, employeeName, dueDate}: Task = req.body;

    try {
      const newEmployee = await prisma.task.create({
        data: {
          task_title: taskTitle,
          task_desc    : taskDesc,
          task_code    : taskCode,
          status       : status,
          priority_level: priorityLevel,
          project_name : projectName,
          employee_name: employeeName,
          due_date     : dueDate,
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
