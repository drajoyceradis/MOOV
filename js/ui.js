function ambulanceSvg(flowType, label, alert = false) {
  const isSamu = flowType === "samu";
  const body = isSamu ? "#fff7e8" : "#eaffff";
  const stripe = isSamu ? "#ff7a32" : "#25e1dc";
  const cross = isSamu ? "#e84a4a" : "#169d9a";
  const haloClass = `${flowType}${alert ? " alert" : ""}`;
  const labelSafe = label.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `
    <div class="vehicle-wrap ${flowType}${alert ? " alert" : ""}">
      <div class="vehicle-halo ${haloClass}"></div>
      <svg class="ambulance-svg" viewBox="0 0 120 86" aria-label="${labelSafe}">
        <g transform="rotate(-18 60 43)">
          <path d="M12 43 Q15 28 31 25 H67 Q79 25 87 36 L101 38 Q110 40 112 51 V62 H102 Q99 73 88 73 Q77 73 74 62 H45 Q42 73 31 73 Q20 73 17 62 H10 V51 Q10 47 12 43Z"
                fill="${body}" stroke="rgba(255,255,255,.9)" stroke-width="3"/>
          <path d="M68 30 H84 L95 41 H68Z" fill="#bfe8ff" opacity=".9"/>
          <path d="M22 35 H62 V57 H18 L20 43 Q21 38 22 35Z" fill="#f7ffff"/>
          <rect x="20" y="49" width="82" height="7" rx="3.5" fill="${stripe}" opacity=".96"/>
          <rect x="38" y="34" width="8" height="22" rx="2" fill="${cross}"/>
          <rect x="31" y="41" width="22" height="8" rx="2" fill="${cross}"/>
          <circle cx="31" cy="62" r="8" fill="#172536" stroke="#dceeff" stroke-width="3"/>
          <circle cx="88" cy="62" r="8" fill="#172536" stroke="#dceeff" stroke-width="3"/>
          <circle class="beacon" cx="47" cy="22" r="5" fill="#ff3159"/>
          <circle class="beacon right" cx="60" cy="22" r="5" fill="#2a9dff"/>
          <path class="headlight" d="M109 48 L121 43 L121 54 Z" fill="#dffcff" opacity=".8"/>
          <text x="58" y="47" text-anchor="middle" font-size="14" font-weight="900" fill="#102336">${isSamu ? "SAMU" : "PMV"}</text>
        </g>
      </svg>
      <div class="vehicle-label">${labelSafe}</div>
    </div>
  `;
}

function statusLabel(status) {
  const labels = {
    solicitada: "Solicitada",
    designada: "Veículo designado",
    embarcado: "Paciente embarcado",
    deslocamento: "Em deslocamento",
    aguardando: "Aguardando recebimento",
    recebido: "Recebido",
    finalizado: "Finalizado"
  };
  return labels[status] || status;
}

function formatFlowLabel(item) {
  return item.flowType === "samu"
    ? "SAMU 192 — identificado, fora da frota municipal"
    : "PMV / Municipal — governança municipal";
}
