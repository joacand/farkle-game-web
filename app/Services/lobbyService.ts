import { collection, deleteDoc, doc, getDocs, runTransaction, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import LobbyData from "../Models/LobbyData";
import { v4 as uuid } from 'uuid'

export const EXPIRE_THRESHOLD_MS = 10 * 60 * 1000;

export async function joinLobby(user: typeof auth.currentUser | null, lobbyId: string) {
    if (!user) { throw new Error("User is not signed in"); }
    if (!lobbyId || lobbyId === "") { throw new Error("Tried to join with empty lobby id"); }

    const uid = user.uid;
    const lobbyRef = doc(db, "lobbies", lobbyId);

    await runTransaction(db, async (tx) => {
        const lobbySnap = await tx.get(lobbyRef);
        if (!lobbySnap.exists) throw new Error("Lobby does not exist");

        const lobbyData = lobbySnap.data() as LobbyData;

        if (lobbyData.players[uid]) {
            console.log("Already in lobby");
            return;
        }

        if (Object.keys(lobbyData.players).length >= 2) {
            throw new Error("Lobby is full");
        }

        tx.update(lobbyRef, {
            [`players.${uid}`]: {
                score: 0,
                lastSeen: new Date()
            }
        });
    });
}

export async function createLobby(user: typeof auth.currentUser | null): Promise<string> {
    if (!user) { throw new Error("User is not signed in"); }

    let target = 2500;
    const targetFromStorage = localStorage.getItem("farkle.target");
    if (targetFromStorage != null) {
        const parsedInt = parseInt(targetFromStorage, 10);
        if (!isNaN(parsedInt) && parsedInt < 100001) {
            target = parsedInt;
        }
    }

    const uid = user.uid;

    const lobbyId = uuid();
    const lobbyRef = doc(db, "lobbies", lobbyId);

    await setDoc(lobbyRef, {
        players: {
            [uid]: {
                score: 0,
                lastSeen: new Date()
            }
        },
        turn: uid,
        target,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + EXPIRE_THRESHOLD_MS)
    });

    return lobbyId;
}

// Tries to clean up expired lobbies.
// Note that any user has access to do this but the server-side rules verify that the expiry-date is actually valid.
// In other words, users will be blocked from deleting non-expired lobbies server-side.
export async function tryCleanUpExpiredLobbies(user: typeof auth.currentUser | null) {
    if (!user) { return; }

    try {
        const lobbiesSnap = await getDocs(collection(db, "lobbies"));

        const now = new Date();
        const deletions: Promise<void>[] = [];

        lobbiesSnap.forEach((lobbyDoc) => {
            const data = lobbyDoc.data();
            const expiresAt = data.expiresAt?.toDate?.();

            if (!expiresAt) { return; }

            if (now.getTime() - expiresAt.getTime() > EXPIRE_THRESHOLD_MS) {
                deletions.push(deleteDoc(doc(db, "lobbies", lobbyDoc.id)));
            }
        });

        await Promise.all(deletions);
        console.log(`Cleaned up ${deletions.length} expired lobbies`);
    } catch (error) {
        console.error("Failed to clean up lobbies:", error);
    }
}