import { create } from "zustand";

export const useModalStore = create((set) => ({
  view: null, // String name of the modal (e.g., 'DELETE_USER')
  data: null, // Data object to pass to the modal
  isOpen: false,

  openModal: (view, data = null) => set({ isOpen: true, view, data }),
  closeModal: () => set({ isOpen: false, view: null, data: null }),
}));
