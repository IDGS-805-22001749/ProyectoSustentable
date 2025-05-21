async function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const chat = document.getElementById("chat");
  const mensaje = input.value.trim();
  if (!mensaje) return;

  // Muestra mensaje del usuario
  chat.innerHTML += `<div><strong>Tú:</strong> ${mensaje}</div>`;
  input.value = "";

  // Llama al servidor Flask
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje })
  });

  const data = await res.json();
  chat.innerHTML += `<div><strong>🤖:</strong> ${data.respuesta}</div>`;
  chat.scrollTop = chat.scrollHeight;
}
