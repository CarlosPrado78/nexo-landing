/* ============================================================
   Nexo — formulario de lista de espera
   ------------------------------------------------------------
   CONFIGURACIÓN: cambia RECEPTOR por el correo donde quieres
   recibir los registros. Se usa FormSubmit (gratis, sin cuenta).

   La primera vez que llegue un registro, FormSubmit enviará un
   correo de confirmación a RECEPTOR. Haz clic en ese enlace UNA
   vez y a partir de ahí todos los registros llegan solos.
   ============================================================ */
const CONFIG = {
  RECEPTOR: "cprado123.cp@gmail.com",   // <-- TU CORREO AQUÍ
  ENDPOINT: null                       // se deriva de RECEPTOR
};

CONFIG.ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.RECEPTOR)}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function enviarLista(input, msg, boton) {
  const correo = input.value.trim();

  msg.className = "form-msg";
  msg.textContent = "";

  if (!EMAIL_RE.test(correo)) {
    msg.classList.add("err");
    msg.textContent = "Escribe un correo válido, por ejemplo: tu@correo.com";
    input.focus();
    return;
  }

  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Enviando…";

  try {
    const res = await fetch(CONFIG.ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: correo,
        _subject: "Nuevo registro en la lista de espera de Nexo",
        _template: "table",
        Origen: "Landing Nexo",
        "Fecha": new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    msg.classList.add("ok");
    msg.textContent = "¡Listo! Ya estás en la lista. Te avisamos cuando abra la beta. ✅";
    input.value = "";
  } catch (err) {
    console.error("Error al enviar:", err);
    msg.classList.add("err");
    msg.textContent =
      "No se pudo enviar. Escríbenos a " + CONFIG.RECEPTOR + " y te agregamos a mano.";
  } finally {
    boton.disabled = false;
    boton.textContent = original;
  }
}

function conectar(formId, inputId, msgId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const input = document.getElementById(inputId);
  const msg = document.getElementById(msgId);
  const boton = form.querySelector("button[type=submit]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarLista(input, msg, boton);
  });
}

conectar("waitlist-form", "email", "form-msg");
conectar("waitlist-form-2", "email-2", "form-msg-2");

/* Aviso de privacidad: mensaje breve mientras se redacta el documento */
const privacy = document.getElementById("privacy-link");
if (privacy) {
  privacy.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Aviso de privacidad (versión inicial)\n\n" +
      "Nexo recopila únicamente tu correo electrónico para avisarte cuando " +
      "abra la beta.\n\n" +
      "• No vendemos ni cedemos tus datos a terceros.\n" +
      "• No pedimos contraseñas de bancos ni brokers.\n" +
      "• Puedes solicitar la eliminación de tu correo en cualquier momento " +
      "escribiendo a " + CONFIG.RECEPTOR + ".\n\n" +
      "Documento completo en preparación."
    );
  });
}
