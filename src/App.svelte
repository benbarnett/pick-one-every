<script>
  import { onMount } from "svelte";

  import List from "./List.svelte";
  import Frequency from "./Frequency.svelte";
  import Picker from "./Picker.svelte";

  import { options } from "./stores";

  onMount(() => {
    if (window.location.hash?.length > 1) {
      const duHashedMich = atob(window.location.hash.slice(1))
        .split("||")
        .map((option) => ({ text: option }));
      options.set(duHashedMich);
    }

    options.subscribe((options) => {
      const hashedOptions = btoa(options.map(({ text }) => text).join("||"));
      window.location.hash = hashedOptions;
    });
  });

  let seconds = 2;
  let mode = "edit";
</script>

<main>
  {#if mode === "edit"}
    <h1>Randomly pick one of these things:</h1>

    <List />

    <h2>Every...</h2>

    <Frequency bind:seconds />

    <button on:click={() => (mode = "view")} class="large">GO!</button>
  {:else}
    <Picker interval={seconds * 1000} />
    <button on:click={() => (mode = "edit")}>Change options</button>
  {/if}
</main>

<style>
  :global(body) {
    background: #861657;
    color: white;
  }
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1,
  h2 {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: #fcf0cc;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 300;
    margin: 1em 0 1em;
  }

  h2 {
    font-size: 1.6em;
  }

  :global(button) {
    margin: 30px;
    padding: 20px;
    font-size: 1em;
    color: #fcf0cc;
    background-color: #d56aa0;
    font-weight: bold;
    border: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  button.large {
    font-size: 2em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
