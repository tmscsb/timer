import { Readable, readable, writable, Writable } from "svelte/store";
import words from "random-words"
import { v4 as uuidv4 } from "uuid"
const DEFAULT_TIME_MILIS: number = (8 * 60 + 30) * 60 * 1000;

const clientIdFromStorage: string = localStorage.getItem("clientId");
export const clientId: Readable<string> = readable(clientIdFromStorage, (set) => {
    if (clientIdFromStorage == undefined) {
        const uuid: string = uuidv4()
        localStorage.setItem("clientId", uuid)
        set(uuid);
    }
    return () => { }
});

const clientSecretFromStorage: string = localStorage.getItem("clientSecret");
export const clientSecret: Readable<string> = readable(clientSecretFromStorage, (set) => {
    if (clientSecretFromStorage == undefined) {
        const secret: string = words({ exactly: 30, join: " " });
        localStorage.setItem("clientSecret", secret)
        set(secret);
    }
    return () => { }
});


const storedPunchInTimeFromStorage: number = parseInt(localStorage.getItem("punchInTime"));
const storedPunchInTime: number = isNaN(storedPunchInTimeFromStorage) ? DEFAULT_TIME_MILIS : storedPunchInTimeFromStorage;
export const punchInTime: Writable<number> = writable(storedPunchInTime);
punchInTime.subscribe((value) => {
    localStorage.setItem("punchInTime", value.toString());
});

const storedWorkDurationFromStorage: number = parseInt(localStorage.getItem("workDuration"));
const storedworkDuration: number = isNaN(storedWorkDurationFromStorage) ? DEFAULT_TIME_MILIS : storedWorkDurationFromStorage;
export const workDuration: Writable<number> = writable(storedworkDuration);
workDuration.subscribe((value) => {
    localStorage.setItem("workDuration", value.toString());
});

export const loggedIn: Writable<boolean> = writable(false)
