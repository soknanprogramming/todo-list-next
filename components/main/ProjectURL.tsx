"use client"

import LiStyleURL from "./LiStyleWithURL";
import { useRememberTaskParam } from "@/stores/useRememberTaskParam";

export default function ProjectURL() {
  const { isHaveVisited, visitedId } = useRememberTaskParam();

  return (
    <>
      {isHaveVisited ? (
        <LiStyleURL path={`/projects/lists_project/${visitedId}`}>Projects</LiStyleURL>
      ) : (
        <LiStyleURL path="/projects">Projects</LiStyleURL>
      )}
    </>
  );
}
