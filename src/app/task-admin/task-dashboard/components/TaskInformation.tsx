interface TaskInformationProps {
  status: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

const TaskInformation: React.FC<TaskInformationProps> = ({ status, createdBy, createdAt }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Task Information</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-medium">{status || "Loading..."}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Created by</span>
          <span className="font-medium">{createdBy || "Loading..."}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Created at</span>
          <span className="font-medium">{createdAt || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskInformation;