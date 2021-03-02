<script>
    import { Router, Route, Link } from "svelte-navigator";
    import CountDown from "./pages/CountDown.svelte";
    import Settings from "./pages/Settings.svelte";
</script>

<Router>
    <header>
        <h1>@tmscsb Timer</h1>

        <nav>
            <Link to="/">Home</Link>
            <Link to="settings">Settings</Link>
        </nav>
    </header>

    <Route path="/">
        <CountDown />
    </Route>

    <Route path="settings">
        <Settings />
    </Route>
</Router>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>
