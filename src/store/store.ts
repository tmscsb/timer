import { writable, Writable } from "svelte/store";
const DEFAULT_TIME_MILIS: number = (8 * 60 + 30) * 60 * 1000;

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
