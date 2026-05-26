function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium"
  });
}

function handleMockSubmit(event) {
  event.preventDefault();

  const success = document.querySelector(".success-box");
  const form = event.currentTarget;
  const button = form.querySelector("button[type='submit']");

  if (button) {
    button.disabled = true;
    button.textContent = "Registrando microevento...";
  }

  setTimeout(() => {
    if (success) {
      success.classList.add("show");
      success.innerHTML = `
        <strong>Microevento registrado.</strong><br>
        Registro simulado em ${getCurrentTimestamp()}.
        <br><span style="color:#9fb7c8">No sistema real, este evento atualizaria a linha do tempo do painel gestor.</span>
      `;
    }

    if (button) {
      button.disabled = false;
      button.textContent = "Registrar microevento";
    }
  }, 650);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-mock-form]").forEach(form => {
    form.addEventListener("submit", handleMockSubmit);
  });
});
