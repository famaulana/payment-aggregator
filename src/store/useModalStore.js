import { create } from "zustand";

export const useModalStore = create((set) => ({
  view: null,
  data: null,
  isOpen: false,
  width: "xs",

  openModal: (view, data = null, width = "xs") =>
    set({ isOpen: true, view, data, width }),

  closeModal: () => set({ isOpen: false, view: null, data: null, width: "xs" }),
}));
