<script lang="ts">
	import Timer from "./components/Timer.svelte";
	import PunchIn from "./components/PunchIn.svelte";
	let punchInTime: number = Date.now();
	let duration: number = (8 * 60 + 30) * 60 * 1000;
	const inputNumber: number = 4;
</script>

<main>
	<PunchIn {inputNumber} bind:punchInTime />
	<Timer bind:from={punchInTime} {duration} />
	{punchInTime}
</main>

<style>
	@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */
</style>
