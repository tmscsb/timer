import { readable, writable, Writable } from "svelte/store";

const storedPunchInTimeFromStorage: number = parseInt(localStorage.getItem("punchInTime"));
const storedPunchInTime: number = isNaN(storedPunchInTimeFromStorage) ? Date.now() : storedPunchInTimeFromStorage;
export const punchInTime: Writable<number> = writable(storedPunchInTime);
punchInTime.subscribe(value => {
    localStorage.setItem("punchInTime", value.toString());
});

const storedWorkDurationFromStorage: number = parseInt(localStorage.getItem("workDuration"));
const storedworkDuration: number = isNaN(storedWorkDurationFromStorage) ? (8 * 60 + 30) * 60 * 1000 : storedWorkDurationFromStorage;
export const workDuration: Writable<number> = writable(storedworkDuration);
workDuration.subscribe(value => {
    localStorage.setItem("workDuration", value.toString());
});