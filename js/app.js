const NEWS = [
  {
    id: "n1",
    hat: "seguranca",
    hatLabel: "Segurança",
    title: "Predial Security amplia soluções de CFTV e portaria remota em São Luís",
    summary:
      "Empresa reforça monitoramento eletrônico, controle de acesso e portaria autônoma para condomínios e empresas.",
    image: "g4.jpeg",
    link: "",
    date: "25/10/2026 09:12"
  },
  {
    id: "n2",
    hat: "acesso",
    hatLabel: "Controle de acesso",
    title: "Reconhecimento facial entra na rotina de condomínios com regras da LGPD",
    summary:
      "Uso de biometria exige finalidade clara, base legal adequada e medidas de segurança para os titulares.",
    image: "m1.jpeg",
    link: "",
    date: "24/10/2026 16:40"
  },
  {
    id: "n3",
    hat: "cftv",
    hatLabel: "CFTV",
    title: "Câmeras devem monitorar áreas comuns, não ambientes privados",
    summary:
      "Instalação de CFTV precisa observar proporcionalidade, finalidade legítima e direitos dos moradores e visitantes.",
    image: "n9 (1).jpeg",
    link: "",
    date: "23/10/2026 11:05"
  },
  {
    id: "n4",
    hat: "condominio",
    hatLabel: "Condomínio",
    title: "Portaria autônoma reduz filas e registra entradas com mais precisão",
    summary:
      "Sistemas de liberação de acesso ajudam síndicos a controlar visitantes, prestadores e veículos.",
    image: "g5.jpeg",
    link: "",
    date: "22/10/2026 08:30"
  }
];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function hatClass(hat) {
  return ["seguranca", "cftv", "acesso", "condominio", "tecnologia"].includes(hat)
    ? hat
    : "seguranca";
}

function renderNews() {
  const featuredEl = document.getElementById("featured");
  const sideEl = document.getElementById("side-list");
  const moreEl = document.getElementById("more-news");
  if (!featuredEl || !sideEl || !moreEl) return;

  const [featured, ...remaining] = NEWS;
  const [side, ...rest] = remaining;

  featuredEl.innerHTML = `
    <a href="#" aria-label="${escapeHtml(featured.title)}">
      <img src="${escapeHtml(featured.image)}" alt="${escapeHtml(featured.title)}">
    </a>
    <div class="featured-body">
      <span class="hat ${hatClass(featured.hat)}">${escapeHtml(featured.hatLabel)}</span>
      <h2>${escapeHtml(featured.title)}</h2>
      <p class="summary">${escapeHtml(featured.summary)}</p>
      <p class="meta">${escapeHtml(featured.date)}</p>
    </div>
  `;

  sideEl.innerHTML = [side, ...rest]
    .map((article) => `
      <article class="side-item">
        <a href="#" aria-label="${escapeHtml(article.title)}">
          <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
        </a>
        <div>
          <span class="hat ${hatClass(article.hat)}">${escapeHtml(article.hatLabel)}</span>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.summary)}</p>
        </div>
      </article>
    `)
    .join("");

  moreEl.innerHTML = '<div class="empty">Todas as notícias estão em destaque acima.</div>';
}

document.addEventListener("DOMContentLoaded", renderNews);
