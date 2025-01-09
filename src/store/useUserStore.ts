import { IUser } from "@/types/typeForUser";
import { User } from "@supabase/auth-js";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserState {
    user: IUser | null;
    session: Session | null;
    isAuthenticated: boolean;
    setAuth: (user: IUser | null, session: Session | null) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                session: null,
                isAuthenticated: false,
                setAuth: (user, session) =>
                    set((state) => ({
                        ...state,
                        user,
                        session,
                        isAuthenticated: !!user,
                    })),
                setIsAdmin: (isAdmin) =>
                    set((state) => ({
                        ...state,
                        user: state.user ? { ...state.user, is_admin: isAdmin } : null,
                    })),
                clearAuth: () =>
                    set((state) => ({
                        ...state,
                        user: null,
                        session: null,
                        isAuthenticated: false,
                    })),
            }),
            {
                name: "auth-storage",
                partialize: (state) => ({
                    user: state.user,
                    session: state.session,
                    isAuthenticated: state.isAuthenticated,
                }),
                skipHydration: true,
            }
        ),
        {
            enabled: process.env.NODE_ENV === "development",
            name: "auth-store",
        }
    )
);
