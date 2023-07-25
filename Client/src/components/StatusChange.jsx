import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiUrl } from '../utils/utils';

const StatusChange = ({ taskId, user }) => {

  const queryClient = useQueryClient();
  const updateStatus = async (taskId, newStatus) => {
    try {
      console.log(newStatus, taskId);
      await axios.patch(`${apiUrl}/task/${taskId}`, { status: newStatus }, { headers: { token: `${user.token}` } });
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeStatusMutation = useMutation({
    mutationFn: (taskData) => updateStatus(taskData.taskId, taskData.newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    }
  });

  const handleStatusChange = (newStatus) => {
    ChangeStatusMutation.mutate({ taskId, newStatus });
    console.log(taskId, newStatus);
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-28 bg-white rounded-lg shadow-md border border-gray-200">
      <button
        onClick={() => handleStatusChange("In Progress")}
        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
      >
        In Progress
      </button>
      <button
        onClick={() => handleStatusChange("Completed")}
        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
      >
        Completed
      </button>
      <button
        onClick={() => handleStatusChange("Pending")}
        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
      >
        Pending
      </button>
      <button
        onClick={() => handleStatusChange("Overdue")}
        className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
      >
        Overdue
      </button>
    </div>
  );
};

export default StatusChange;
