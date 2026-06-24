# Shape Glúteo · Dra. Surya Braga — Landing Page

Landing page estática (HTML + CSS, sem framework) para captação de leads da
**Shape Glúteo · Dra. Surya Braga — Harmonização Corporal Avançada** (Foz do Iguaçu e São Paulo).

---

## 📁 Estrutura de arquivos

```
Surya/
├── index.html              → página principal (hero, antes/depois, formulário, sobre, FAQ)
├── obrigado.html           → página de agradecimento (pós-envio do formulário)
├── styles.css              → todos os estilos (tokens de tema, layout, responsivo)
├── .htaccess               → regras de URL (remove .html, serve em subpasta)
├── assets/                 → vazia (imagens definitivas da Dra. Surya entram aqui)
├── meta-capi/              → Pixel + CAPI em PHP puro (versão p/ a landing estática)
│   ├── capi.php
│   └── capi.js
└── meta-pixel-geovana/     → mesma integração, mas como plugin WordPress (herdado)
    ├── meta-pixel-geovana.php
    └── capi.js
```

> ⚠️ Há **duas implementações** do Pixel/CAPI na pasta (`meta-capi` em PHP puro e
> `meta-pixel-geovana` como plugin WordPress). Use **uma** conforme onde a página
> roda — ver seção Rastreamento e Pendências.

---

## 🖼️ Imagens (placeholders)

Todas as imagens do site usam **placeholders em gradiente grafite** com o rótulo
"Foto em breve":

- 3 cards de antes/depois (Bumbum de Bilhões, Perfect Seios do Brasil, Combo Shape)
- foto da doutora (seção Sobre)
- fundo do hero (gradiente, sem imagem)

As fotos do projeto anterior **foram removidas**. Quando as imagens da Dra. Surya
chegarem, insira-as em `assets/` e reconecte os trechos (cards em `index.html` e o
`.hero-bg-img` em `styles.css`).

---

## 🚀 Como o site é publicado (IMPORTANTE)

O site **não fica na raiz do domínio**. Ele é enviado para uma **subpasta** dentro
de `public_html`, ao lado de um **WordPress que ocupa a raiz** (mesmo modelo dos
outros projetos).

```
public_html/
├── (WordPress: wp-admin, wp-content, wp-includes, ...)  ← raiz do domínio
└── subpasta/        ← AQUI vão os arquivos desta landing
    ├── index.html
    ├── obrigado.html
    ├── styles.css
    ├── .htaccess
    ├── assets/
    └── meta-capi/   (se usar o Pixel via PHP puro)
```

A landing abre em `dominio.com.br/subpasta/` e a página de obrigado em
`dominio.com.br/subpasta/obrigado`. **Testar `/obrigado` na raiz dá 404** — lá é o
WordPress, não esta landing.

> Ao subir arquivos, envie **todos** (incl. `.htaccess`, que é oculto — ligue
> "mostrar arquivos ocultos" no Gerenciador de Arquivos/FTP).

---

## 🔗 .htaccess · URLs limpas

O `.htaccess` faz, com caminhos **relativos** (funciona em qualquer subpasta):

1. Remove a extensão: `/subpasta/obrigado.html` → `/subpasta/obrigado`
2. Serve internamente o arquivo: `/subpasta/obrigado` entrega `obrigado.html`

---

## 📨 Formulário → Make → Planilha

O formulário (`#contactForm` no `index.html`) envia por `fetch` (POST JSON) para um
**webhook do Make**. O endereço está como placeholder **`WEBHOOK_MAKE_URL`** —
substituir pela URL real do cenário da Shape Glúteo antes de publicar.

Campos enviados no payload:

| Campo          | Origem                             |
|----------------|------------------------------------|
| `nome`         | input `#form-name`                 |
| `telefone`     | input `#form-whatsapp`             |
| `email`        | input `#form-email`                |
| `procedimento` | select `#form-procedure`           |
| `origem`       | URL da página                      |
| `data`         | data do envio (ex: `12 jun. 2026`) |
| `hora`         | hora do envio (ex: `09h30`)        |

Opções do select de área: **Harmonização de Glúteo · Harmonização de Seios ·
Ambos os procedimentos**.

Após o envio bem-sucedido, o usuário é redirecionado para **`obrigado`** (URL limpa).

---

## 🙏 Página de obrigado

`obrigado.html` mostra a confirmação e um botão **"Falar pelo WhatsApp agora"**.
O link está como placeholder **`WHATSAPP_LINK`** — substituir pelo link de chat
oficial da Dra. Surya.

---

## 🎨 Tema e identidade visual

- Tema **claro por padrão** (`<html data-theme="light">`), com alternância sol/lua.
- A preferência do usuário é salva em `localStorage` na chave `surya-theme`.
- **Paleta monocromática** grafite + branco (token `--gold-grad`):
  - Grafite `#3b413c` (acento no tema claro) · branco/prata `#c9cec9`–`#ffffff`
    (acento no tema escuro), sobre fundos branco (claro) / grafite escuro `#181b19` (escuro).
- Fonte única: **Montserrat**.

---

## 📊 Rastreamento

- **Google Tag Manager:** container `GTM-XXXXXXX` (placeholder — inserir o ID real).
- **Meta Pixel + Conversions API:** Pixel ID `SEU_PIXEL_ID` e token `SEU_CAPI_TOKEN`
  (placeholders — inserir os valores reais da conta da Shape Glúteo).
  - Dispara **PageView** e **Lead** (após envio bem-sucedido) com **deduplicação por
    `event_id`**, hash SHA-256 de e-mail/telefone no navegador e rate limiting por IP.
  - O **token da CAPI fica só no servidor**, nunca no navegador.

| Cenário                              | Use                          | Como                                                          |
|--------------------------------------|------------------------------|--------------------------------------------------------------|
| Landing estática em subpasta         | `meta-capi/` (PHP puro)      | Subir a pasta junto da landing; `index.html` já chama `capi.js`. |
| Página rodando no WordPress da raiz  | `meta-pixel-geovana/` (WP)   | Empacotar como plugin e instalar no WP Admin.                |

> Não use as duas ao mesmo tempo na mesma página.

---

## ✅ Pendências / a confirmar

- [ ] **Card "Combo Shape"** (3º de Antes & Depois) — conteúdo provisório criado a
      partir dos dois protocolos. Confirmar o texto/título definitivos com a Dra. Surya.
- [ ] **Paleta** — aplicada como grafite `#3b413c` + branco. Confirmar se reflete a
      identidade visual real (a fonte pedia "dourado/bronze"; as cores foram definidas
      pelo cliente como #FFFFFF e #3B413C).
- [ ] **Fotos da Dra. Surya** — hoje placeholders. Inserir imagens reais.
- [ ] **GTM** — substituir `GTM-XXXXXXX` pelo container real.
- [ ] **Pixel + Token CAPI (CRÍTICO)** — substituir `SEU_PIXEL_ID` e `SEU_CAPI_TOKEN`
      pelos valores reais. O token antigo (herdado) foi removido e deve ser tratado
      como **comprometido** (revogar no Gerenciador de Eventos).
- [ ] **Webhook do Make** — substituir `WEBHOOK_MAKE_URL` pela URL real do cenário.
- [ ] **WhatsApp** — substituir `WHATSAPP_LINK` em `obrigado.html` pelo link oficial.
- [ ] **Domínio + subpasta de produção** — confirmar a URL de publicação.
- [ ] **SSL** — confirmar certificado ativo antes de forçar HTTPS.
- [ ] **Prefixos internos `geo_*` / pasta `meta-pixel-geovana/`** — ainda carregam o
      nome de um projeto anterior. Renomear se o plugin WordPress for usado (exige
      ajustar também a chamada `window.geoTrackLead` no `index.html`).

---

## 🛠️ Rodar localmente

Sirva a pasta com um servidor estático (ex.: `python -m http.server`).
Obs.: o servidor estático local **ignora o `.htaccess`** (URLs limpas só funcionam
no Apache de produção) e o endpoint PHP (`meta-capi/capi.php`) só roda com PHP.
