import { SelectUser } from "@/server/db/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware"

type UserStore = {
    user: SelectUser | null;
    setUser: (user: SelectUser) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: SelectUser) => set({ user }),
        }),
        {
            name: 'user-storage', // unique name for localStorage key
        }
    )
);

export default useUserStore;