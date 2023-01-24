import {useSynchedJSONState} from "kitcheningredients";
import {SynchedStateKeys} from "../helper/SynchedStateKeys";

export class MyStates{

    static useDemo(){
        const [demo, setDemo] = useSynchedJSONState(SynchedStateKeys.DEMO);
        let usedDemo = false;
        return [usedDemo, setDemo];
    }

    static usePlayers(){
        const [players, setPlayers] = useSynchedJSONState(SynchedStateKeys.PLAYERS);
        const [demo, setDemo] = MyStates.useDemo();
        let defaultPlayers = {};
        if(demo){
            defaultPlayers = {
                1: {
                    id: 1,
                    name: "Nils",
                    score: 10,
                },
                2: {
                    id: 2,
                    name: "Julian",
                    score: 5,
                },
                3: {
                    id: 3,
                    name: "Ilka",
                    score: 85,
                },
                4: {
                    id: 4,
                    name: "Kim",
                    score: 1,
                }
            }
        }
        let usedPlayers = players || defaultPlayers;
        return [usedPlayers, setPlayers];
    }

    static useCurrentPlayer(){
        const [activePlayer, setCurrentPlayer] = useSynchedJSONState(SynchedStateKeys.PLAYER_ACTIVE);
        const [players, setPlayers] = MyStates.usePlayers();
        let playerIds = Object.keys(players);
        const defaultCurrentPlayerId = playerIds[0];
        const defaultCurrentPlayer = players[defaultCurrentPlayerId];

        let currentPlayer = activePlayer || defaultCurrentPlayer;
        const setNextCurrentPlayer = () => {
            console.log("setNextCurrentPlayer");
            let currentPlayerId = currentPlayer?.id;
            console.log("currentPlayerId", currentPlayerId);
            console.log("playerIds", playerIds);
            let currentPlayerIndex = playerIds.indexOf(""+currentPlayerId);
            console.log("currentPlayerIndex", currentPlayerIndex);
            let nextPlayerId = playerIds[(currentPlayerIndex + 1) % playerIds.length];
            console.log("nextPlayerId", nextPlayerId);
            let nextPlayer = players[nextPlayerId];
            console.log("nextPlayer", nextPlayer);
            setCurrentPlayer(nextPlayer);
        }

        return [currentPlayer, setCurrentPlayer, setNextCurrentPlayer];
    }

}
