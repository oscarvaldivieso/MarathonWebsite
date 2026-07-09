# 📁 Assets — Club Deportivo Marathón

Guía de organización de recursos visuales para cada sección del sitio web.

> **Convención de nombres:** usar `kebab-case`, minúsculas, sin espacios ni caracteres especiales.
> **Formatos recomendados:** `.webp` para fotos (calidad/peso), `.svg` para logos/iconos, `.png` para transparencias.

---

## 📂 Estructura de Carpetas

```
public/assets/
├── brand/            → Logo, escudo, variantes del club
├── hero/             → Imágenes hero (fondo principal)
├── matchday/         → Próximo partido
│   └── teams/        → Escudos de equipos rivales
├── history/          → Sección historia / timeline
├── stadium/          → Estadio Yankel Rosenthal
├── players/          → Fotos de jugadores
├── fans/             → Hinchada y afición
├── sponsors/         → Logos de patrocinadores
├── cta/              → Call-to-action / newsletter
├── icons/            → Iconos personalizados del sitio
└── backgrounds/      → Texturas, patterns, overlays
```

---

## 🟢 brand/

| Archivo | Uso | Estado |
|---------|-----|--------|
| `escudo_normal.svg` | Escudo oficial a color | ✅ Existe |
| `escudonormal_blanco.svg` | Escudo blanco (fondos oscuros) | ✅ Existe |
| `escudocentenario_color.svg` | Escudo centenario a color | ✅ Existe |
| `escudocentenario_blanco.svg` | Escudo centenario blanco | ✅ Existe |
| `logo-marathon.svg` | Logo tipográfico (Navbar, Footer) | ⬜ Pendiente |
| `favicon.ico` | Icono del navegador (32×32 px) | ⬜ Pendiente |
| `og-image.jpg` | Open Graph / redes sociales (1200×630 px) | ⬜ Pendiente |

**Componentes que lo usan:** `Navbar.tsx`, `Footer.tsx`, `layout.tsx`

---

## 🖼️ hero/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `hero-bg.webp` | Fondo principal del hero (equipo/estadio) | 1920×1080 px |
| `hero-bg-mobile.webp` | Versión móvil del hero | 768×1024 px |
| `hero-overlay.png` | Overlay con transparencia para el texto | 1920×1080 px |

**Componente que lo usa:** `HeroSection.tsx`

---

## ⚽ matchday/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `matchday-bg.webp` | Fondo de la sección (opcional) | 1920×600 px |

### matchday/teams/

Escudos de los equipos de la Liga Nacional para mostrar en el card del partido.

| Archivo | Equipo |
|---------|--------|
| `marathon.png` | CD Marathón |
| `olimpia.png` | CD Olimpia |
| `motagua.png` | FC Motagua |
| `real-espana.png` | Real España |
| `vida.png` | CDS Vida |
| `real-sociedad.png` | Real Sociedad |
| `lobos-upnfm.png` | Lobos UPNFM |
| `olancho.png` | Olancho FC |
| `genesis.png` | Génesis FC |
| `victoria.png` | CD Victoria |

> Tamaño recomendado: **128×128 px** con fondo transparente (.png)

**Componente que lo usa:** `MatchdaySection.tsx`

---

## 📜 history/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `estadio-yankel.webp` | Foto del Estadio Yankel Rosenthal | 800×600 px |
| `fundadores.webp` | Foto histórica de fundadores | 800×600 px |
| `campeonatos.webp` | Celebración de campeonato | 800×600 px |
| `timeline-1925.webp` | Fundación del club | 400×300 px |
| `timeline-titulo-1.webp` | Primer título | 400×300 px |

**Componente que lo usa:** `HistoryPreview.tsx`

---

## 🏟️ stadium/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `yankel-aerial.webp` | Vista aérea del estadio | 1200×800 px |
| `yankel-interior.webp` | Interior del estadio | 1200×800 px |
| `yankel-night.webp` | Estadio de noche | 1200×800 px |
| `yankel-panoramic.webp` | Vista panorámica | 1920×600 px |

**Componentes que lo usan:** `HistoryPreview.tsx`, futura página `/estadio`

---

## 👤 players/

Fotos de los jugadores del plantel actual.

| Convención | Ejemplo |
|------------|---------|
| `nombre-apellido.webp` | `carlos-martinez.webp` |
| `nombre-apellido-action.webp` | `carlos-martinez-action.webp` |

> Tamaño recomendado: **400×500 px** (retrato) o **600×400 px** (acción)
> Fondo: idealmente uniforme o con transparencia para composición.

**Componente que lo usa:** futura página `/equipo`

---

## 🎉 fans/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `hinchada-1.webp` | Foto de la barra/afición | 1200×800 px |
| `hinchada-2.webp` | Celebración en grada | 1200×800 px |
| `hinchada-3.webp` | Ambiente en el estadio | 1200×800 px |
| `mosaico.webp` | Mosaico de la hinchada | 1200×800 px |
| `fan-bg.webp` | Fondo parallax para sección fans | 1920×1080 px |

**Componente que lo usa:** `FanSection.tsx`

---

## 🤝 sponsors/

Logos de los patrocinadores y socios comerciales.

| Convención | Ejemplo |
|------------|---------|
| `sponsor-nombre.svg` | `sponsor-nike.svg` |
| `sponsor-nombre.png` | `sponsor-pepsi.png` |

> Tamaño recomendado: **300×120 px**, fondo transparente.
> Preferir SVG para logos.

**Componente que lo usa:** futura sección de sponsors en `Footer.tsx`

---

## 📣 cta/

| Archivo | Uso | Tamaño recomendado |
|---------|-----|---------------------|
| `cta-bg.webp` | Fondo de la sección CTA | 1920×800 px |
| `jersey-promo.webp` | Imagen promocional de jersey | 600×600 px |

**Componente que lo usa:** `CtaSection.tsx`

---

## 🔷 icons/

Iconos custom del sitio (no cubiertos por Lucide).

| Archivo | Uso |
|---------|-----|
| `icon-trophy.svg` | Trofeo personalizado |
| `icon-ball.svg` | Balón personalizado |
| `icon-shield.svg` | Escudo estilizado |

---

## 🎨 backgrounds/

Texturas y patterns reutilizables.

| Archivo | Uso |
|---------|-----|
| `noise-texture.png` | Textura de ruido sutil para overlays |
| `diagonal-pattern.svg` | Patrón de líneas diagonales |
| `dot-pattern.svg` | Patrón de puntos |
| `grass-texture.webp` | Textura de césped para fondos |

---

## 🔗 Cómo referenciar en componentes

```tsx
// Importar imagen estática (Next.js optimiza automáticamente)
import Image from "next/image";

// Desde public/ — referencia directa con /
<Image
  src="/assets/brand/logo-marathon.svg"
  alt="Logo CD Marathón"
  width={40}
  height={40}
/>

// Imagen de fondo con CSS
<div style={{ backgroundImage: "url(/assets/hero/hero-bg.webp)" }} />
```

---

## ✅ Checklist de prioridad

Imágenes más urgentes para darle vida al sitio:

- [ ] `brand/logo-marathon.svg` — Logo para Navbar y Footer
- [ ] `brand/escudo-marathon.png` — Escudo oficial
- [ ] `hero/hero-bg.webp` — Fondo del hero section
- [ ] `matchday/teams/marathon.png` — Escudo Marathón para card de partido
- [ ] `matchday/teams/olimpia.png` — Escudo rival actual
- [ ] `history/estadio-yankel.webp` — Foto del estadio para sección historia
- [ ] `fans/hinchada-1.webp` — Foto de la hinchada
- [ ] `brand/og-image.jpg` — Imagen para compartir en redes
