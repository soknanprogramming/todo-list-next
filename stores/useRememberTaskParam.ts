"use client"

import { create } from "zustand";

type Store = {
    isHaveVisited: boolean;
    visitedId: string;
    setVisit: (visitedId: string) => void;
    setUnVisit: () => void;
}

export const useRememberTaskParam = create<Store>()((set) => ({
    isHaveVisited: false,
    visitedId: "",
    setVisit: (visitedId: string) => set({ isHaveVisited: true, visitedId }),
    setUnVisit: () => set({ isHaveVisited: false, visitedId: "" }),
}))