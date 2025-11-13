// Simulación del usuario actual
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { id: "1" };

// Referencias DOM
const createBtn = document.getElementById("createBtn");
const treatmentsContainer = document.getElementById("treatmentsContainer");
const searchInput = document.getElementById("search");

// Función para obtener tratamientos del usuario actual
function getTreatments() {
  const allTreatments = JSON.parse(localStorage.getItem("treatments")) || [];
  return allTreatments.filter(t => t.idPac === currentUser.id);
}

// Función para guardar tratamientos
function saveTreatments(treatments) {
  localStorage.setItem("treatments", JSON.stringify(treatments));
}

// Mostrar tratamientos en pantalla
function renderTreatments(filter = "") {
  const treatments = getTreatments().filter(t =>
    t.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (treatments.length === 0) {
    treatmentsContainer.innerHTML = `
      <p class="text-gray-500 text-center">No s'han trobat tractaments.</p>
    `;
    return;
  }

  treatmentsContainer.innerHTML = treatments.map(t => `
    <div class="bg-white shadow-md rounded-xl p-4 flex justify-between items-center border border-blue-100">
      <div>
        <p class="text-lg font-semibold text-gray-800">${t.name}</p>
        <p class="text-gray-500">Data: ${t.date}</p>
      </div>
      <button 
        onclick="deleteTreatment('${t.id}')"
        class="text-red-500 hover:text-red-600 font-medium transition">
        Eliminar
      </button>
    </div>
  `).join("");
}

// Eliminar tratamiento
function deleteTreatment(id) {
  if (!confirm("Segur que vols eliminar aquest tractament?")) return;
  let all = JSON.parse(localStorage.getItem("treatments")) || [];
  all = all.filter(t => t.id !== id);
  saveTreatments(all);
  renderTreatments(searchInput.value);
}

// Crear formulario emergente
function showForm() {
  // Crear overlay y formulario
  const overlay = document.createElement("div");
  overlay.className = `
    fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-blur-sm 
    flex justify-center items-center z-50
  `;

  const form = document.createElement("form");
  form.className = `
    rounded-2xl shadow-2xl p-8 w-96 flex flex-col space-y-4 border border-blue-100
  `;
  form.style.background = "linear-gradient(to bottom right, #0f0f1a, #111827, #0f0f1a)";
  form.innerHTML = `
    <h2 class="text-2xl font-semibold text-blue-500 text-center mb-2">Nou Tractament</h2>

    <label class="text-white font-medium">Nom del tractament</label>
    <input type="text" id="treatmentName" maxlength="50" required
      class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none">

    <label class="text-white font-medium">Data</label>
    <input type="date" id="treatmentDate" required
      class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none">

    <div class="flex justify-between pt-4">
      <button type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg transition">
        Desar
      </button>
      <button type="button" id="cancelBtn"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-5 py-2 rounded-lg transition">
        Cancel·lar
      </button>
    </div>
  `;

  overlay.appendChild(form);
  document.body.appendChild(overlay);

  // Cancelar formulario
  form.querySelector("#cancelBtn").addEventListener("click", () => {
    overlay.remove();
  });

  // Guardar nuevo tratamiento
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("treatmentName").value.trim();
    const date = document.getElementById("treatmentDate").value;

    if (!name || !date) return alert("Omple tots els camps.");
    const today = new Date().toISOString().split("T")[0];
    if (date > today) return alert("La data no pot ser futura.");

    const newTreatment = {
      id: Date.now().toString(),
      idPac: currentUser.id,
      name,
      date
    };

    const all = JSON.parse(localStorage.getItem("treatments")) || [];
    all.push(newTreatment);
    saveTreatments(all);

    overlay.remove();
    renderTreatments(searchInput.value);
  });
}

// Buscar tratamientos
searchInput.addEventListener("input", e => {
  renderTreatments(e.target.value);
});

// Botón crear
createBtn.addEventListener("click", showForm);

// Inicializar
renderTreatments();
