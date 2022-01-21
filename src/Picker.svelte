<script>
  import { onDestroy } from "svelte";
  import { options as optionsStore } from "./stores";

  export let interval = 1000;

  let options = [];
  optionsStore.subscribe(
    (value) =>
      (options = value.filter(({ text }) => text).map(({ text }) => text))
  );

  let elapsed = 0;

  let last_time = window.performance.now();
  let frame;

  let pickedItem = newBallsPlease();

  function newBallsPlease() {
    return options[Math.floor(Math.random() * options.length)];
  }

  (function update() {
    frame = requestAnimationFrame(update);

    const time = window.performance.now();

    elapsed += Math.min(time - last_time, interval - elapsed);

    if (elapsed >= interval) {
      pickedItem = newBallsPlease();
      elapsed = 0;
    }

    last_time = time;
  })();

  onDestroy(() => {
    cancelAnimationFrame(frame);
  });
</script>

<article>
  <label>
    <progress value={elapsed / interval} class="html5" />
  </label>

  <h3>{pickedItem}</h3>
</article>

<style>
  article {
    display: grid;
    height: 75vh;
    grid-template-rows: auto 100%;
    max-width: 90%;
    margin: 0 auto;
  }

  h3 {
    color: #fcf0cc;
    text-transform: uppercase;
    font-size: 10vh;
    font-weight: 100;
    align-self: center;
    overflow-wrap: break-word;
    width: 100%;
    word-break: break-all;
  }

  progress {
    appearance: none;
    width: 100%;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #861657;
    border: 0;
  }

  progress[value]::-webkit-progress-value {
    position: relative;
  }

  ::-webkit-progress-value {
    background-color: #d56aa0;
  }
</style>
