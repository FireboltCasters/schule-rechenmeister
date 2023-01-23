import {useSynchedJSONState} from "kitcheningredients";
import {SynchedStateKeys} from "../helper/SynchedStateKeys";

export class MyStates{

    static usePlayers(){
        const [players, setPlayers] = useSynchedJSONState(SynchedStateKeys.PLAYERS);
        let usedPlayers = players || {};
        return [usedPlayers, setPlayers];
    }

}
