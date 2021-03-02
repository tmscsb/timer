<script lang="ts">
    import {
        punchInTime,
        loggedIn,
        clientId,
        clientSecret,
    } from "../store/store";
    import {
        dateFormatter,
        numberToHour,
        dateFromTimeMilis,
        dateMiliSecondsFromTimeMilis,
    } from "../helper/dateHelper";

    import { onMount } from "svelte";

    let loggedInAPP = false;
    let tCode: string = "";
    let resp: string = "";
    let syncEnabled = false;

    onMount(() => {});

    async function doPost(data) {
        console.log(data);
        try {
            const res = await fetch("http://localhost:3000/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();
            const result = JSON.stringify(json);
            return result;
        } catch (err) {
            return "error";
        }
    }

    async function syncWithTelegram() {
        resp = await doPost({ tCode: tCode, appClientId: $clientId });
    }

    async function signOut() {}

    let punchInDateTime: number = dateMiliSecondsFromTimeMilis($punchInTime);
    let remainingTime: number;
</script>

<div
    style="height:100%"
    class="d-flex justify-content-center align-items-center"
>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center p-2">
            <div class="custom-control custom-switch">
                <input
                    type="checkbox"
                    bind:checked={syncEnabled}
                    class="custom-control-input"
                    id="customSwitch1"
                />
                <label class="custom-control-label" for="customSwitch1">
                    Sync: {syncEnabled}
                </label>
            </div>
        </div>
        <div class="d-flex justify-content-center p-2">
            clientsecret: {$clientSecret}
        </div>
        <div class="d-flex justify-content-center p-2">
            clientId: {$clientId}
        </div>
        <div class="d-flex justify-content-center p-2">
            response: {resp}
        </div>
        <div class="d-flex justify-content-center p-2">
            <input bind:value={tCode} />
        </div>
        <div class="d-flex justify-content-center p-2">
            {#if !loggedInAPP}
                <button on:click={syncWithTelegram} disabled={tCode == ""}>
                    SYNC WITH TELEGRAM
                </button>
            {:else}
                <button on:click={signOut}>SIGN OUT</button>
            {/if}
        </div>
    </div>
</div>

<style scoped>
    /* input {
        border: none;
        width: 10.5ch;
        background: repeating-linear-gradient(
                90deg,
                dimgrey 0,
                dimgrey 1ch,
                transparent 0,
                transparent 1.5ch
            )
            0 100%/100% 2px no-repeat;
        color: dimgrey;
        font: 5ch consolas, monospace;
        letter-spacing: 0.5ch;
    }
    input:focus {
        outline: none;
        color: dodgerblue;
    } */
</style>
