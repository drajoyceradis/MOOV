let selectedTransferId = null;

function getFilters() {
  return {
    flowType: document.getElementById("flowType").value,
    status: document.getElementById("statusFilter").value
  };
}

function filterTransfers() {
  const filters = getFilters();
  return MOOV_DATA.transfers.filter(item => {
    const matchesType = filters.flowType === "all" || item.flowType === filters.flowType;
    const matchesStatus = filters.status === "all" || item.status === filters.status;
    return matchesType && matchesStatus;
  });
}

function updateKPIs(transfers) {
  document.getElementById("kpiTotal").textContent = transfers.length;
  document.getElementById("kpiAlerts").textContent = transfers.filter(t => t.alert).length;
  document.getElementById("kpiAvg").textContent = "12 min";

  const totalEvents = transfers.flatMap(t => t.microevents);
  const doneEvents = totalEvents.filter(e => e.state === "done").length;
  const percent = totalEvents.length ? Math.round((doneEvents / totalEvents.length) * 100) : 0;
  document.getElementById("kpiComplete").textContent = `${percent}%`;
}

function renderSelectedCard(item) {
  const card = document.getElementById("selectedTransfer");

  if (!item) {
    card.innerHTML = `
      <p class="eyebrow">Transferência selecionada</p>
      <h3>Selecione uma ambulância no mapa</h3>
      <p class="muted">A linha do tempo e os dados de governança aparecerão aqui.</p>
    `;
    return;
  }

  card.innerHTML = `
    <p class="eyebrow">${formatFlowLabel(item)}</p>
    <h3>${item.id}</h3>
    <p class="muted">${item.origin} → ${item.destination}</p>

    <div class="transfer-meta">
      <div class="meta-item">
        <span>Status</span>
        <strong>${statusLabel(item.status)}</strong>
      </div>
      <div class="meta-item">
        <span>Veículo</span>
        <strong>${item.vehicleLabel}</strong>
      </div>
      <div class="meta-item">
        <span>ETA</span>
        <strong>${item.eta}</strong>
      </div>
      <div class="meta-item">
        <span>KM</span>
        <strong>${item.kmInitial || "--"} → ${item.kmFinal || "--"}</strong>
      </div>
    </div>
  `;
}

function renderTimeline(item) {
  const timeline = document.getElementById("timeline");
  const code = document.getElementById("timelineCode");

  if (!item) {
    code.textContent = "Sem seleção";
    timeline.className = "timeline empty";
    timeline.textContent = "Selecione uma transferência no mapa.";
    return;
  }

  code.textContent = item.requestCode;
  timeline.className = "timeline";
  timeline.innerHTML = item.microevents.map(event => `
    <div class="timeline-step ${event.state}">
      <span>${event.profile}</span>
      <strong>${event.label}</strong>
      <small>${event.time}</small>
    </div>
  `).join("");
}

function renderBottlenecks() {
  const list = document.getElementById("bottleneckList");
  list.innerHTML = MOOV_DATA.bottlenecks.map(item => `
    <div class="bottleneck-item">
      <div>
        <strong>${item.label}</strong>
        <span>${item.detail}</span>
      </div>
      <div class="bottleneck-badge">${item.value}</div>
    </div>
  `).join("");
}

function refreshDashboard() {
  const transfers = filterTransfers();
  drawTransfers(transfers, selectTransfer);
  updateKPIs(transfers);

  if (!transfers.find(t => t.id === selectedTransferId)) {
    selectedTransferId = null;
    renderSelectedCard(null);
    renderTimeline(null);
  }
}

function selectTransfer(id) {
  selectedTransferId = id;
  const item = MOOV_DATA.transfers.find(t => t.id === id);
  renderSelectedCard(item);
  renderTimeline(item);
}

function bindFilters() {
  ["flowType", "statusFilter"].forEach(id => {
    document.getElementById(id).addEventListener("change", refreshDashboard);
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("flowType").value = "all";
    document.getElementById("statusFilter").value = "all";
    refreshDashboard();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  drawUnits();
  renderBottlenecks();
  bindFilters();
  refreshDashboard();
  selectTransfer(MOOV_DATA.transfers[0].id);
});
