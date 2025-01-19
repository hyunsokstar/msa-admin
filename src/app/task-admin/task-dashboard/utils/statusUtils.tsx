// src/app/task-admin/task-dashboard/utils/statusUtils.tsx
import { Timer, MoveRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch(status) {
    case 'ready': return <Timer className="w-5 h-5 text-blue-600" />;
    case 'progress': return <MoveRight className="w-5 h-5 text-amber-600" />;
    case 'test': return <AlertCircle className="w-5 h-5 text-purple-600" />;
    case 'complete': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    default: return null;
  }
};

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'ready': return 'bg-blue-100 border-l-4 border-blue-500 shadow-sm';
    case 'progress': return 'bg-amber-100 border-l-4 border-amber-500 shadow-sm';
    case 'test': return 'bg-purple-100 border-l-4 border-purple-500 shadow-sm';
    case 'complete': return 'bg-emerald-100 border-l-4 border-emerald-500 shadow-sm';
    default: return 'bg-gray-50';
  }
};

export const getStatusTextColor = (status: string) => {
  switch(status) {
    case 'ready': return 'text-blue-700';
    case 'progress': return 'text-amber-700';
    case 'test': return 'text-purple-700';
    case 'complete': return 'text-emerald-700';
    default: return 'text-gray-700';
  }
};