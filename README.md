# Dra. Michele Souza — Landing Page

Landing page de captação de leads para a **Dra. Michele Souza**, médica especialista em **Tricologia Avançada**, com foco em protocolos personalizados para recuperação capilar masculina sem necessidade de transplante.

---

## 📁 Estrutura de pastas

```
Micheli/
├── index.html          # Estrutura semântica das 6 dobras + modais de Termos/Privacidade
├── style.css            # Design system + componentes + responsividade
├── app.js                # Reveals, máscara de WhatsApp, validação e submit do form, modais
├── README.md             # Este arquivo
├── obrigado.html          # Página de obrigado (redirecionada após o envio do formulário)
└── assets/
    ├── img.webp                    # Hero (placeholder — trocar pela foto da Dra. Michele)
    ├── dra-raquel-editorial.webp   # Foto editorial para a seção "Sobre" (placeholder — trocar)
    ├── antes-01..04.webp           # Antes/depois — lado A (placeholder — trocar por casos capilares)
    └── depois-01..04.webp          # Antes/depois — lado B (placeholder — trocar por casos capilares)
```

> ⚠️ As imagens em `assets/` ainda são as antigas (otoplastia, Dra. Raquel) — mantidas apenas como placeholder de layout até a substituição pelas fotos reais da Dra. Michele.

---

## 🎨 Design system

| Token               | Valor       | Uso                                          |
|----------------------|-------------|-----------------------------------------------|
| `--c-primary`        | `#3B82F6`   | Botões, badges, destaques, gradiente azul     |
| `--c-primary-2`      | `#1D4ED8`   | Gradiente, textos de destaque                 |
| `--c-primary-light`  | `#8FB4FF`   | Texto de destaque sobre fundos escuros        |
| `--c-secondary`      | `#E7EAEE`   | Fundos sutis, placeholders                    |
| `--c-accent`         | `#14181D`   | Texto principal, CTA escuro                   |
| `--c-bg`             | `#F7F8FA`   | Fundo padrão (off-white clínico)              |
| `--c-text`           | `#14181D`   | Texto (grafite escuro)                        |

- **Fontes:** Playfair Display (serif, headings) + Inter (sans, corpo) — via Google Fonts.
- **Efeitos:** glassmorphism (`backdrop-filter: blur`), sombras suaves em camadas (`--shadow-sm/md/lg/glow`), gradientes suaves em azul/grafite.
- **Favicon:** SVG inline com a inicial **M** sobre o tom primário azul.

---

## 🧩 Seções da LP

### 🔵 Dobra 1 — Hero
- **Imagens:** `assets/img.webp` (placeholder).
- CTA primário (`#agendar`) e CTA fantasma (`#resultados`).

### 🔵 Dobra 2 — Prova Social (Resultados Reais)
- **Imagens:** `assets/antes-0[1-4].webp` e `assets/depois-0[1-4].webp` (placeholder).
- Grid 2×2 de pares antes/depois com tag + legenda.

### 🔵 Dobra 3 — Formulário (captação)
- **Campos:** Nome, WhatsApp (máscara `(00) 00000-0000`), E-mail, "Qual o seu maior incômodo hoje?" (select: afinando / entradas / queda).
- Validação client-side em `app.js`. Ao validar com sucesso, redireciona para `obrigado`.
- **Webhook do Make removido** — `MAKE_WEBHOOK_URL` está vazio em `app.js` (ver `TODO`); colar a URL correta quando disponível.

### 🔵 Dobra 4 — Sobre a Especialista
- **Imagens:** `assets/dra-raquel-editorial.webp` (placeholder).
- Copy de autoridade + destaques (sem transplante / foco masculino / tecnologia) + CTA escuro.

### 🔵 Dobra 5 — Perguntas Frequentes (FAQ)
- Seção nova (não existia no template original), usando `<details>/<summary>` nativos como acordeão.
- 4 perguntas sobre genética, uso de hormônios, tempo de resultado e necessidade de transplante.

### 🔵 Dobra 6 — Rodapé
- Endereço: Barretos · Araraquara, São Paulo.
- Barra inferior: copyright + links de Termos de Uso / Política de Privacidade (abrem em modal) / Desenvolvido por AZX Performance.

---

## 📜 Termos de Uso & Política de Privacidade

Acessíveis via modal a partir dos links no rodapé (`#openTerms` / `#openPrivacy`). A Política de Privacidade é redigida com base na **LGPD (Lei nº 13.709/2018)**, cobrindo: dados coletados, finalidade do tratamento, base legal, compartilhamento, armazenamento/segurança e direitos do titular.

---

## 🔌 Integrações — pendências

- **Google Tag Manager:** removido (era o container da Dra. Raquel, `GTM-MJQJPGBC`). Colar o snippet correto no `<head>` e `<noscript>` de `index.html` e `obrigado.html` (local marcado com `TODO`).
- **Webhook do Make/CRM:** removido de `app.js` (`MAKE_WEBHOOK_URL = ''`). Colar a URL correta quando disponível.
- **WhatsApp da página de obrigado:** número placeholder (`5500000000000`) em `obrigado.html`. Substituir pelo número real da Dra. Michele.
- **Imagens:** todas em `assets/` são placeholders da Dra. Raquel (orelhas). Substituir pelos arquivos reais mantendo os mesmos nomes de arquivo para não precisar tocar no HTML.

---

## 📱 Responsividade

| Faixa                | Comportamento                                          |
|-----------------------|--------------------------------------------------------|
| **≥ 1024px**          | Layouts em 2 colunas (hero, form, about); grid 2×2 nas provas |
| **768–1023px**        | Mesmas grids mantidas, com `clamp()` reduzindo gaps     |
| **≤ 880px**           | Hero, form e about colapsam para 1 coluna               |
| **≤ 760px**           | Grid de provas vira 1 coluna                            |
| **≤ 520px**           | Ajustes finos de tipografia, botões em largura total e FAQ compacto |
| **≤ 480px**           | Barra inferior do rodapé empilha em coluna              |

---

## 🔒 Segurança

- Sem `innerHTML`/`eval`/`document.write` no client-side (sem vetor de XSS via DOM).
- Links externos (`target="_blank"`) sempre com `rel="noopener noreferrer"`.
- Sem conteúdo via `http://` (mixed content).
- Validação client-side do formulário em `app.js`; validação server-side deverá ser adicionada junto da integração de envio.

---

## 🤝 Como contribuir

- **Adicionar uma nova seção:** crie o markup dentro de `index.html` entre duas dobras existentes, atribua um `data-screen-label="NN Nome"` e adicione as classes ao final de `style.css` seguindo o padrão `.nome-secao__elemento`.
- **Mudar a paleta:** edite as custom properties no topo de `style.css` (`:root`).
- **Mudar copy:** todas as strings estão diretamente em `index.html` — sem CMS / template engine.

---

© 2026 Dra. Michele Souza — Todos os direitos reservados.
