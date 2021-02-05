<script lang="ts">
    import { onMount } from "svelte";
    import Input from "./Input.svelte";
    export let punchInTime: number;
    let h1: number = 0;
    let h2: number = 0;
    let m1: number = 0;
    let m2: number = 0;

    onMount(() => {
        let date = new Date(punchInTime);
        h1 = Math.floor(date.getHours() / 10);
        h2 = date.getHours() % 10;
        m1 = Math.floor(date.getMinutes() / 10);
        m2 = date.getMinutes() % 10;
    });

    function next(current: CustomEvent) {
        const next: HTMLInputElement = current.detail.nextElementSibling;
        if (next != null && "0123".includes(next.id) && next.id != "") {
            next.focus();
            next.select();
        }
    }

    function prev(current: CustomEvent) {
        const prev: HTMLInputElement = current.detail.previousElementSibling;
        if (prev != null && "0123".includes(prev.id) && prev.id != "") {
            prev.focus();
            prev.select();
        }
    }

    function calculateTime() {
        let d: Date = new Date();
        d.setHours(+h1 * 10 + +h2, +m1 * 10 + +m2, 0);
        punchInTime = d.valueOf();
        localStorage.setItem("punchIn", d.valueOf().toString());
    }
</script>

<div class="pl-1 pr-1">
    <Input
        id="0"
        bind:value={h1}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={2}
    />
</div>
<div class="pl-1 pr-1">
    <Input
        id="1"
        bind:value={h2}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={9}
    />
</div>
<div class="d-flex align-items-center pl-1 pr-1">:</div>
<div class="pl-1 pr-1">
    <Input
        id="2"
        bind:value={m1}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={9}
    />
</div>
<div class="pl-1 pr-1">
    <Input
        id="3"
        bind:value={m2}
        on:next={(e) => next(e)}
        on:prev={(e) => prev(e)}
        on:change={() => calculateTime()}
        min={0}
        max={9}
    />
</div>

<style scoped>
</style>
