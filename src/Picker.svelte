<script>
  import { onDestroy, onMount } from "svelte";
  import { options as optionsStore } from "./stores";

  export let interval = 1000;
  export let limit = "forever";

  let options = [];
  optionsStore.subscribe(
    (value) =>
      (options = value.filter(({ text }) => text).map(({ text }) => text))
  );

  let elapsed = 0;

  let last_time = window.performance.now();
  let frame;

  let pickedItem = newBallsPlease();

  let audio = new Audio("chime.mp3");

  function newBallsPlease() {    
    if (limit === "forever") {
      return options[Math.floor(Math.random() * options.length)];
    } else if (limit === "once") {
      if (options.length > 0) {
        return options.splice(Math.floor(Math.random() * options.length), 1);
      } else {
        cancelAnimationFrame(frame);
        return "ALL DONE!";
      }
    }
  }

  (function update() {
    frame = requestAnimationFrame(update);

    const time = window.performance.now();

    elapsed += Math.min(time - last_time, interval - elapsed);

    if (elapsed >= interval) {
      audio.currentTime = 0;
      audio.play();
      pickedItem = newBallsPlease();
      elapsed = 0;
    }

    last_time = time;
  })();

  let wakeLock;

  async function keepScreenAwake() {
       try {
          wakeLock = await navigator.wakeLock.request("screen");

          document.addEventListener("visibilitychange", handleVisibilityChange);
       } catch (err) {
            console.error("Wake Lock error:", err);
        }
    }

    async function handleVisibilityChange() {
        if (wakeLock !== null && document.visibilityState === "visible") {
            wakeLock = await navigator.wakeLock.request("screen");
        }
    }

    onMount(() => {
        keepScreenAwake();
    });

    onDestroy(() => {
        cancelAnimationFrame(frame);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (wakeLock) {
                wakeLock.release();
                wakeLock = null;
            }
        });
     });
</script>

<label>
  <progress value={elapsed / interval} class="html5" />
</label>

<h3>{pickedItem}</h3>

<style>
  h3 {
    color: #fcf0cc;
    text-transform: uppercase;
    font-size: 10vmax;
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
