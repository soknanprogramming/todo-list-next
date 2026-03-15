import { Prisma } from "@/generated/prisma/client";

type TaskWithTags = Prisma.TaskGetPayload<{
  include: { tags: true };
}>;

interface Props {
  task: TaskWithTags;
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="bg-amber-300" key={task.id}>
      <p>Task Name: {task.title}</p>
      <p>Task Description: {task.description}</p>
      <p>Task Status: {task.completed ? "Completed" : "Not Completed"}</p>
      <p>Task Priority: {task.priority}</p>
      <p>Task Due Date: {task.dueDate?.toLocaleDateString() ?? "Not Set"}</p>
      <p>Task Created At: {task.createdAt.toLocaleDateString()}</p>
      <p>Task Updated At: {task.updatedAt.toLocaleDateString()}</p>
      <div>
        Tags:{" "}
        {task.tags.length > 0
          ? task.tags.map((tag) => tag.name).join(", ")
          : "No tags"}
      </div>
    </div>
  );
};

export default TaskCard;
