<script>
  import { skyboxState, gridState, grassState } from "./services/store";
  function toggleEnv() {
    skyboxState.update((value) => {
      return !value;
    });
    gridState.update((value) => {
      return !value;
    });
  }
</script>

<div class="top_bar">
  <div class="toggle_env">
    <p class="env_btn" on:click|preventDefault={toggleEnv}>
      <img
        id="envIcon"
        class="img_icon"
        src="assets/icons/004-camping.png"
        alt="camping"
      />
    </p>
  </div>
  <div class="product-name">
    <p>Палатка Tramp Sarma v2</p>
  </div>
  <a href="models/shelterios.usdz" class="ar_btn" target="_blank">
    <p class="ar-text"><span class="accent">AR</span> <br /> reality</p>
  </a>
</div>
