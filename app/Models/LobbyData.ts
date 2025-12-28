import PlayerData from "./PlayerData";

export default interface LobbyData {
    players: Record<string, PlayerData>;
    turn: string;
    target: number;
    createdAt: Date;
    expiresAt: Date;
}