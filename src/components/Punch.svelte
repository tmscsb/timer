<script lang="ts">
    import { onMount } from "svelte";
    import Input from "./Input.svelte";
    export let punchTime: number;
    export let type: string;
    let h1: number = 0;
    let h2: number = 0;
    let m1: number = 0;
    let m2: number = 0;
    let input: Array<HTMLInputElement> = [];

    onMount(() => {
        if (type == "duration") {
            const y = 60 * 60 * 1000;
            const h = Math.floor(punchTime / y);
            const m = Math.floor((punchTime - h * y) / (y / 60));
            h1 = Math.floor(h / 10);
            h2 = h % 10;

            m1 = Math.floor(m / 10);
            m2 = m % 10;
        } else {
            let date = new Date(punchTime);
            h1 = Math.floor(date.getHours() / 10);
            h2 = date.getHours() % 10;
            m1 = Math.floor(date.getMinutes() / 10);
            m2 = date.getMinutes() % 10;
        }
    });

    function next(current: CustomEvent) {
        const currentIndex = input.findIndex((input) => input.id == current.detail.id);
        const nextIndex = (+currentIndex + 1) % 4;
        const next = input[nextIndex];
        next.focus();
        next.select();
    }

    function prev(current: CustomEvent) {
        const currentIndex = input.findIndex((input) => input.id == current.detail.id);
        const prevIndex = +currentIndex - 1 < 0 ? 3 : +currentIndex - 1;
        const prev = input[prevIndex];
        prev.focus();
        prev.select();
    }

    function calculateTime() {
        let d: Date = new Date();
        d.setHours(+h1 * 10 + +h2, +m1 * 10 + +m2, 0);
        if (type == "duration") {
            console.log("itt");
            punchTime = ((+h1 * 10 + +h2) * 60 + m1 * 10 + +m2) * 60 * 1000;
            localStorage.setItem(type, (((+h1 * 10 + +h2) * 60 + m1 * 10 + +m2) * 60 * 1000).toString());
        } else {
            localStorage.setItem(type, d.valueOf().toString());
            punchTime = d.valueOf();
        }
    }
</script>

<div class="pl-1 pr-1">
    <Input
        id="{type}0"
        bind:input={input[0]}
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
        id="{type}1"
        bind:input={input[1]}
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
        id="{type}2"
        bind:input={input[2]}
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
        id="{type}3"
        bind:input={input[3]}
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
