import { api } from "../api";
import { State } from "../state";

export function state(): State {
    return api.get("appState");
}

export function panic() {
    process.exit(1);
}
