# Dra. Surya Braga — Landing Page

Landing page de captação de leads para a **Dra. Surya Braga**, referência em **Harmonização Corporal Avançada sem cirurgia**, à frente da clínica **Shape Glúteo**. Foco nos protocolos exclusivos **Bumbum de Bilhões®** e **Perfect Seios do Brasil®**, com atendimento em Foz do Iguaçu e São Paulo.

---

## 📁 Estrutura de pastas

```
Surya - Nova/
├── index.html          # Estrutura semântica das 6 dobras + modais de Termos/Privacidade
├── style.css            # Design system + componentes + responsividade
├── app.js                # Reveals, máscara de WhatsApp, validação e submit do form, modais
├── README.md             # Este arquivo
├── obrigado.html          # Página de obrigado (redirecionada após o envio do formulário)
├── meta-capi/
│   ├── capi.js            # PageView/Lead client-side (Pixel + envio ao endpoint server-side)
│   └── capi.php            # Endpoint Meta CAPI com deduplicação por event_id e rate limit
└── assets/
    ├── hero-bg.webp                # Foto da Dra. Surya — hero
    ├── doctor.webp                  # Foto da Dra. Surya — seção "Sobre"
    ├── before-after-1.webp          # Antes/depois — Bumbum de Bilhões
    ├── before-after-2.webp          # Antes/depois — Perfect Seios do Brasil
    └── before-after-3.webp          # Antes/depois — Redução de celulite (foto vertical)
```

---

## 🎨 Design system

| Token               | Valor       | Uso                                          |
|----------------------|-------------|-----------------------------------------------|
| `--c-primary`        | `#D4980F`   | Botões, badges, destaques dourados            |
| `--c-primary-2`      | `#8F6500`   | Gradiente dourado (ponta escura)              |
| `--c-primary-light`  | `#F0C030`   | Texto/ícones de destaque sobre fundo escuro   |
| `--c-secondary`      | `#222226`   | Superfícies de card (`--c-card`)              |
| `--c-accent`         | `#F5F1E6`   | Texto sobre botões claros/CTA secundário      |
| `--c-bg`             | `#141416`   | Fundo padrão (preto acinzentado)              |
| `--c-text`           | `#e6e6e8`   | Texto de corpo (cinza claro)                  |
| `--c-heading`        | `#ffffff`   | Títulos                                       |

- **Fontes:** Playfair Display (serif itálico, headings/destaques) + Open Sans (sans, corpo) — via Google Fonts.
- **Efeitos:** glassmorphism escuro (`backdrop-filter: blur` sobre `rgba(255,255,255,.03–.08)`), sombras profundas (`--shadow-sm/md/lg/glow`), gradiente dourado (`--gold-grad`) em títulos de destaque, ícones e CTAs primários.
- **Favicon:** SVG inline com a inicial **S** em gradiente dourado sobre fundo escuro.

---

## 🧩 Seções da LP

### 🟡 Dobra 1 — Hero
- **Imagem:** `assets/hero-bg.webp`.
- Título "Seu corpo mudou. Sua autoestima, não precisa." + pills de diferenciais (Sem cirurgia · Bumbum de Bilhões® · Perfect Seios do Brasil®).
- CTA primário (`#agendar`) e marquee com as palavras-chave da marca.

### 🟡 Dobra 2 — Prova Social (Antes & Depois)
- **Imagens:** `assets/before-after-1.webp` (glúteos), `before-after-2.webp` (seios), `before-after-3.webp` (celulite/coxas).
- Grid de 3 cards com **uma imagem já montada** por caso (não pares antes/depois separados) — a foto 3 é vertical, por isso usa a classe modificadora `.ba--portrait` para não cortar o antes/depois.
- Selo de autoridade (`+6 anos de atuação`) com CTA secundário.

### 🟡 Dobra 3 — Formulário (captação)
- **Campos:** Nome, WhatsApp (máscara `(00) 00000-0000`), E-mail, "Qual protocolo tem mais interesse?" (select: Bumbum de Bilhões / Perfect Seios / Ambos).
- Validação client-side em `app.js`. Ao validar com sucesso, dispara o evento **Lead** (Pixel + CAPI via `window.geoTrackLead()`) e redireciona para `obrigado`.
- **Webhook do Make:** `MAKE_WEBHOOK_URL` está vazio em `app.js` (ver `TODO`); colar a URL correta quando disponível.

### 🟡 Dobra 4 — Sobre a Especialista
- **Imagem:** `assets/doctor.webp`.
- Copy de autoridade (Shape Glúteo, +6 anos, métodos proprietários) + estatísticas (+6 Anos / 2 Métodos / 100% Natural) + CTA escuro.

### 🟡 Dobra 5 — Perguntas Frequentes (FAQ)
- `<details>/<summary>` nativos como acordeão.
- 3 perguntas: harmonização de seios sem cirurgia, dor nos procedimentos, tempo de recuperação.

### 🟡 Dobra 6 — Rodapé
- Barra inferior: copyright (Shape Glúteo por Dra. Surya Braga) + links de Termos de Uso / Política de Privacidade (abrem em modal) / Desenvolvido por AZX Performance.
- Sem bloco de endereço (removido a pedido — cidades já aparecem na dobra do formulário).

---

## 📜 Termos de Uso & Política de Privacidade

Acessíveis via modal a partir dos links no rodapé (`#openTerms` / `#openPrivacy`). A Política de Privacidade é redigida com base na **LGPD (Lei nº 13.709/2018)**, cobrindo: dados coletados, finalidade do tratamento, base legal, compartilhamento, armazenamento/segurança e direitos do titular.

---

## 🔌 Integrações — pendências

- **Google Tag Manager:** snippet já inserido no `<head>` e `<noscript>` de `index.html` e `obrigado.html`, mas com container placeholder `GTM-XXXXXXX`. Substituir pelo ID real.
- **Meta Pixel / CAPI:** `fbq('init', 'SEU_PIXEL_ID')` e `GEO_CAPI_TOKEN`/`GEO_PIXEL_ID` em `meta-capi/capi.php` ainda são placeholders. PageView dispara automaticamente ao carregar a página; Lead dispara no submit do formulário via `window.geoTrackLead()`.
- **Webhook do Make/CRM:** `MAKE_WEBHOOK_URL = ''` em `app.js`. Colar a URL correta quando disponível.
- **WhatsApp da página de obrigado:** número placeholder (`5500000000000`) em `obrigado.html`. Substituir pelo número real da Dra. Surya.

---

## 📱 Responsividade

| Faixa                | Comportamento                                          |
|-----------------------|--------------------------------------------------------|
| **≥ 1024px**          | Layouts em 2 colunas (hero, form, about); grid de 3 colunas nas provas |
| **768–1023px**        | Grid de provas cai para 2 colunas, com `clamp()` reduzindo gaps |
| **≤ 880px**           | Hero, form e about colapsam para 1 coluna               |
| **≤ 640px**           | Grid de provas vira 1 coluna                            |
| **≤ 520px**           | Ajustes finos de tipografia, botões em largura total e FAQ compacto |
| **≤ 480px**           | Barra inferior do rodapé empilha em coluna              |

---

## 🔒 Segurança

- Sem `innerHTML`/`eval`/`document.write` no client-side (sem vetor de XSS via DOM).
- Links externos (`target="_blank"`) sempre com `rel="noopener noreferrer"`.
- Sem conteúdo via `http://` (mixed content).
- Validação client-side do formulário em `app.js`; validação server-side deverá ser adicionada junto da integração de envio.
- `.htaccess` já inclui CSP liberando apenas os domínios necessários (GTM, Facebook, Make).

---

## 🤝 Como contribuir

- **Adicionar uma nova seção:** crie o markup dentro de `index.html` entre duas dobras existentes, atribua um `data-screen-label="NN Nome"` e adicione as classes ao final de `style.css` seguindo o padrão `.nome-secao__elemento`.
- **Mudar a paleta:** edite as custom properties no topo de `style.css` (`:root`).
- **Mudar copy:** todas as strings estão diretamente em `index.html` — sem CMS / template engine.

---

© 2026 Shape Glúteo por Dra. Surya Braga — Todos os direitos reservados.
