function showLoader() {
  const overlay = document.getElementById("loader-overlay");
  overlay?.removeAttribute("hidden");
  overlay?.setAttribute("aria-busy", "true");
  document.getElementById("pokemons")?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "hidden";
}

function hideLoader() {
  setTimeout(() => {
    const overlay = document.getElementById("loader-overlay");
    overlay?.setAttribute("hidden", "");
    overlay?.setAttribute("aria-busy", "false");
    document.getElementById("pokemons")?.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
  }, 800);
}
