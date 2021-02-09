export const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en", {
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
});

export const numberToHour = (duration: number): string => {
    const y = 60 * 60 * 1000;
    const h = Math.floor(duration / y);
    const m = Math.floor((duration - h * y) / (y / 60));
    return `${h}:${m}`;
};

export const dateFromTimeMilis = (time: number): Date => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMilliseconds(time);
    return date;
};

export const dateMiliSecondsFromTimeMilis = (time: number): number => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMilliseconds(time);
    return date.getTime();
};
