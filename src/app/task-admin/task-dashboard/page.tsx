"use client"

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MoveRight, AlertCircle, CheckCircle2, Timer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApiForGetTaskDashboard } from '@/hook/task/useApiForGetTaskDashboard';
import { TaskDashboard } from '@/types/task/typeForTaskDashboard';

const TaskDashboardPage = () => {
  const { data: tasks, isLoading, error } = useApiForGetTaskDashboard();

  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, TaskDashboard[]>) || {};

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'ready': return <Timer className="w-5 h-5 text-blue-600" />;
      case 'progress': return <MoveRight className="w-5 h-5 text-amber-600" />;
      case 'test': return <AlertCircle className="w-5 h-5 text-purple-600" />;
      case 'complete': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ready': return 'bg-blue-100 border-l-4 border-blue-500 shadow-sm';
      case 'progress': return 'bg-amber-100 border-l-4 border-amber-500 shadow-sm';
      case 'test': return 'bg-purple-100 border-l-4 border-purple-500 shadow-sm';
      case 'complete': return 'bg-emerald-100 border-l-4 border-emerald-500 shadow-sm';
      default: return 'bg-gray-50';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch(status) {
      case 'ready': return 'text-blue-700';
      case 'progress': return 'text-amber-700';
      case 'test': return 'text-purple-700';
      case 'complete': return 'text-emerald-700';
      default: return 'text-gray-700';
    }
  };

  if (isLoading) return <div>Loading...</div>;
  
  if (error) return (
    <Alert variant="destructive">
      <AlertDescription>
        Failed to load tasks: {error instanceof Error ? error.message : 'Unknown error'}
      </AlertDescription>
    </Alert>
  );

  const statusOrder = ['ready', 'progress', 'test', 'complete'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        {statusOrder.map((status) => (
          <div key={status} className={`${getStatusColor(status)} p-4 rounded-lg`}>
            <div className="flex items-center gap-2 mb-4">
              {getStatusIcon(status)}
              <h2 className={`text-lg font-semibold capitalize ${getStatusTextColor(status)}`}>
                {status}
              </h2>
              <span className="ml-auto bg-white px-2 py-1 rounded-full text-sm font-medium shadow-sm">
                {groupedTasks[status]?.length || 0}
              </span>
            </div>
            <div className="space-y-3">
              {groupedTasks[status]?.map(task => (
                <Card 
                  key={task.id} 
                  className="bg-white cursor-move hover:shadow-md transition-all duration-200 border-none shadow-sm hover:scale-[1.02]"
                >
                  <CardHeader className="p-3 pb-1">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-sm text-gray-600">
                    {task.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboardPage;