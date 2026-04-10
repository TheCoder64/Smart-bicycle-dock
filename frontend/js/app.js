// ADD
async function add() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, phone })
  });

  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

// GET LOGS
async function getLogs() {
  const res = await fetch(`${BASE_URL}/all`);
  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}

// DELETE
async function deleteRec() {
  const reservationId = document.getElementById("reservationId").value;
  const phone = document.getElementById("phone").value;

  await fetch(`${BASE_URL}/delete`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ reservationId, phone })
  });

  alert("Deleted");
}

// EMPTY
async function getEmpty() {
  const res = await fetch(`${BASE_URL}/empty`);
  const data = await res.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}