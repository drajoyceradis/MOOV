# MOOV Dashboard Final

Protótipo front-end estático do **Painel de Governança MOOV**, separado por pastas e pronto para evoluir em GitHub.

## Estrutura de pastas

```txt
MOOV_dashboard_final/
  index.html
  css/
    styles.css
  js/
    data.js
    ui.js
    map.js
    dashboard.js
    forms.js
  pages/
    motorista.html
    enfermagem.html
    destino.html
  assets/
    icons/
    img/
  docs/
    arquitetura.md
```

## Como abrir

Abra `index.html` no navegador.

O mapa usa Leaflet + Carto/OSM por CDN, então precisa de internet.

## O que está incluído

- Dashboard executivo com mapa da Grande Vitória.
- Ambulâncias em SVG com luzes piscando, halo neon e diferenciação PMV/SAMU.
- Rotas estimadas em neon.
- KPIs executivos.
- Filtros por tipo de fluxo e status.
- Linha viva de microeventos.
- Matriz de gargalos.
- Microformulários mockados para:
  - motorista;
  - enfermagem/equipe assistencial;
  - destino/aceite.

## Separação conceitual

- **Ponta operacional:** link seguro + microcheck rápido.
- **Gestão:** painel executivo com dados consolidados.
- **Fluxo municipal/PMV:** entra na governança municipal.
- **SAMU 192:** aparece identificado, mas separado da frota municipal.

## Próximos passos técnicos

1. Ajustar identidade visual real das ambulâncias PMV.
2. Substituir `js/data.js` por API.
3. Criar autenticação e controle por perfil.
4. Persistir microeventos em banco de dados.
5. Incluir logs, tokens temporários, RBAC e trilha de auditoria.
6. Criar deploy em GitHub Pages/Vercel/Netlify para demonstração.
