import { Prisma } from "@/generated/prisma/client";

type TaskWithTags = Prisma.TaskGetPayload<{
  include: { tags: true };
}>;

interface Props {
  task: TaskWithTags;
  className?: string;
}

const priorityColor = (priority?: number | null): string => {
  let className;
  if (priority === 1) className = "bg-red-100 text-red-700";
  else if (priority === 2) className = "bg-yellow-100 text-yellow-700";
  else if (priority === 3) className = "bg-green-100 text-green-700";
  else className = "bg-gray-100 text-gray-600";
  return className
};

const TaskCard = ({ task, className = ""}: Props) => {
  return (
    <div className={`${className} bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition-all`}>
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h2>

        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${priorityColor(
            task.priority
          )}`}
        >
          {task.priority === 1 && "High"}
          {task.priority === 2 && "Medium"}
          {task.priority === 3 && "Low"}
          {!task.priority && "No Priority"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-2 text-sm">
        {task.description || "No description"}
      </p>

      {/* Status */}
      <div className="mt-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            task.completed
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {task.completed ? "Completed" : "In Progress"}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {task.tags.length > 0 ? (
          task.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              #{tag.name}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">No tags</span>
        )}
      </div>

      {/* Dates */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>
          📅 Due: {task.dueDate?.toLocaleDateString() ?? "Not set"}
          Time: {task.dueDate?.toLocaleTimeString() ?? "Not set"}
        </p>
        <p>
          🕒 Created: {task.createdAt.toLocaleDateString()}
          Time: {task.createdAt.toLocaleTimeString()}
        </p>
        {task.updatedAt.getTime() !== task.createdAt.getTime() ? (
          <p>
            🔄 Updated: {task.updatedAt.toLocaleDateString()}
            Time: {task.updatedAt.toLocaleTimeString()}
          </p>
        ) : (
          <div>
            Never update
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;