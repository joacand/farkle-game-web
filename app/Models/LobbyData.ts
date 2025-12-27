import PlayerData from "./PlayerData";

export default interface LobbyData {
    players: Record<string, PlayerData>;
    turn: string;
    createdAt: Date;
    expiresAt: Date;
}