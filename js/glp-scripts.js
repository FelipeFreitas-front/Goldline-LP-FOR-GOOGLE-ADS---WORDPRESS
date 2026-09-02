/* =====================================================================
   GOLDLINE PAINTING — LP — JS mínimo
   1) Envio do formulário via Web3Forms (AJAX) + mensagem de sucesso
   2) Smooth scroll dos botões "Free Estimate" até o formulário
   Sem dependências. Se o JS não rodar, o form envia normal (fallback).
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Formulário (Web3Forms) ---------- */
  var form = document.getElementById("glp-lead-form");

  if (form) {
    var statusEl = document.getElementById("glp-form-status");
    var submitBtn = form.querySelector(".glp-form__submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (statusEl) { statusEl.className = "glp-form__status"; statusEl.textContent = ""; }
      if (submitBtn) {
        submitBtn.classList.add("is-loading");
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
      }

      var data = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, json: j }; }); })
        .then(function (r) {
          if (r.ok && r.json.success) {
            // Sucesso: mostra a mensagem, completa a barra de progresso
            form.classList.add("is-sent");
            var bar = document.querySelector(".glp-form-progress__bar");
            if (bar) { bar.style.width = "100%"; }
            var label = document.querySelector(".glp-form-progress__label");
            if (label) { label.textContent = "Step 2 of 2 — Done"; }
          } else {
            showError(r.json.message || "Something went wrong. Please try again.");
          }
        })
        .catch(function () {
          showError("Network error. Please call us at (774) 526-1670.");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.classList.remove("is-loading");
            if (submitBtn.dataset.label) { submitBtn.textContent = submitBtn.dataset.label; }
          }
        });
    });

    function showError(msg) {
      if (!statusEl) { return; }
      statusEl.className = "glp-form__status glp-form__status--error";
      statusEl.textContent = msg;
    }
  }

  /* ---------- 2. Smooth scroll para o formulário ---------- */
  document.querySelectorAll('a[href="#glp-estimate"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = document.getElementById("glp-estimate");
      if (!target) { return; }
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      // Foca o primeiro campo depois do scroll (acessibilidade/conversão)
      var firstInput = target.querySelector('input[type="text"], input[type="tel"]');
      if (firstInput) { setTimeout(function () { firstInput.focus({ preventScroll: true }); }, 500); }
    });
  });

})();
