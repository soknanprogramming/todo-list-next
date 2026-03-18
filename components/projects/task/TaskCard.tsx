"use client";

import { Prisma } from "@/generated/prisma/client";
import { useActionState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { completeTask } from "@/actions/project/task/completeTask";
import { deleteTask } from "@/actions/project/task/deleteTask";
import TaskDescription from "./TaskDescription";
import { useConfirm } from "@/hooks/useConfirm";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

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
  return className;
};

const TaskCard = ({ task, className = "" }: Props) => {
  const [stateCompleteTask, formActionCompleteTask, pendingCompleteTask] =
    useActionState(completeTask, null);
  const [stateDeleteTask, formActionDeleteTask, pendingDeleteTask] = useActionState(deleteTask, null);
  const router = useRouter();
  const { confirm: customConfirm, modal } = useConfirm();
  const daysLeft = useMemo(() => {
    if (!task.dueDate) return null;

    return Math.ceil(
      (new Date(task.dueDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }, [task.dueDate]);

  useEffect(() => {
    if (stateCompleteTask?.success) {
      router.refresh();
    } else if (stateDeleteTask?.success){
      router.refresh();
    }
  }, [stateCompleteTask, router, stateDeleteTask]);

  return (
    <div
      className={`${className} w-full relative shadow-md rounded-xl p-5 border hover:shadow-lg transition-all ${task.completed ? "bg-green-300" : " bg-white"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>

        <div className="flex items-center space-x-2">
          {/* day left */}
          <p
            className={`px-2 py-1 text-xs rounded-full font-medium ${daysLeft === null || daysLeft < 0 ? "bg-red-500" : "bg-gray-300"}`}
          >
            {daysLeft === null
              ? "No due date"
              : daysLeft < 0
                ? "Time out"
                : `${daysLeft} days left`}
          </p>
          {/* Status */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {task.completed ? "Completed" : "In Progress"}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${priorityColor(
              task.priority,
            )}`}
          >
            {task.priority === 1 && "High"}
            {task.priority === 2 && "Medium"}
            {task.priority === 3 && "Low"}
            {!task.priority && "No Priority"}
          </span>
        </div>
      </div>

      {/* Description */}
      <TaskDescription
        className={`mt-3 ${task.completed ? "bg-green-200" : "bg-gray-200"}`}
        description={task.description || "Not title"}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {task.tags.length > 0 ? (
          task.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 flex items-center text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              <IoPricetagOutline className="mr-0.5" />
              <p>{tag.name}</p>
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">No tags</span>
        )}
      </div>

      {/* Dates */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <div className="flex">
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-1" />
            <p>Due: {task.dueDate?.toLocaleDateString() ?? "Not set"}</p>
          </div>
          <div className="flex items-center">
            <MdAccessTime className="mr-1" />
            <p>{task.dueDate?.toLocaleTimeString() ?? "Not set"}</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <FaRegCalendarAlt className="mr-1" />
            <p>Created: {task.createdAt.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center">
            <MdAccessTime className="mr-1" />
            <p>{task.createdAt.toLocaleTimeString()}</p>
          </div>
        </div>
        {task.updatedAt.getTime() !== task.createdAt.getTime() ? (
          <div className="flex">
            <div className="flex items-center">
              <FaRegCalendarAlt className="mr-1" />
              <p>Updated: {task.updatedAt.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
              <MdAccessTime className="mr-1" />
              <p>{task.updatedAt.toLocaleTimeString()}</p>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex items-center">
              <FaRegCalendarAlt className="mr-1" />
              <p>Never updated</p>
            </div>
          </div>
        )}
      </div>
      <div className="*:mt-3">
        <div className="flex justify-end items-center space-x-0.5">
          {stateCompleteTask?.message && (
            <p className="text-sm text-gray-500">{stateCompleteTask.message}</p>
          )}
          <button
            type="button"
            className={`hover:cursor-pointer py-0.5 px-2 rounded-sm ${task.completed ? "bg-red-400 hover:bg-red-500 text-gray-600 hover:text-gray-100" : "bg-yellow-400 hover:bg-yellow-500 hover:text-gray-100"}`}
            onClick={async () => {
              const ok = await customConfirm(
                `Are you sure you want to ${task.completed ? "uncompleted" : "completed"} this task?`,
              );

              if (ok) {
                const formData = new FormData();
                formData.append("taskId", String(task.id));
                formData.append(
                  "taskCompleted",
                  task.completed ? "true" : "false",
                );
                await formActionCompleteTask(formData);
              }
            }}
            disabled={pendingCompleteTask}
          >
            {pendingCompleteTask
              ? "Loading..."
              : task.completed
                ? "Undo"
                : "Complete"}
          </button>
          {task.completed ? (
            <></>
          ) : (
            <button className=" bg-gray-400 hover:bg-gray-500 hover:text-white hover:cursor-pointer py-0.5 px-2 rounded-sm">
              Edit
            </button>
          )}
          <button
            className="bg-red-400 hover:bg-red-500 text-gray-600 hover:text-gray-100 hover:cursor-pointer py-0.5 px-2 rounded-sm"
            onClick={async () => {
              const ok = await customConfirm("Are you sure you want to delete this task?");
              if (ok) {
                const formData = new FormData();
                formData.append("taskId", String(task.id));
                await formActionDeleteTask(formData);
              }
            }}
            disabled={pendingDeleteTask}
          >
            {pendingDeleteTask ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal}
    </div>
  );
};

export default TaskCard;
