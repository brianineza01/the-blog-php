"use client";
import { useLocalStorage } from "@/config/@uidotdev/usehooks";

interface Session {
    name: string;
    id: string;
}

export default function useSession() {
    const [session, setSession] = useLocalStorage<Session | null>(
        "currentUser",
        null
    );

    return [session, setSession] as const;
}
