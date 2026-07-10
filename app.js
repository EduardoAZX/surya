/* =============================================================
   Dra. Surya Braga — app.js
   Reveals on scroll · Máscara WhatsApp · Submit (placeholder)
   ============================================================= */
(function () {
  'use strict';

  /* ---------- Ano dinâmico ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Máscara WhatsApp BR ---------- */
  var whatsapp = document.getElementById('whatsapp');
  if (whatsapp) {
    whatsapp.addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 11);
      var out = v;
      if (v.length > 0) out = '(' + v.slice(0, 2);
      if (v.length >= 3 && v.length <= 6) out += ') ' + v.slice(2);
      else if (v.length >= 7 && v.length <= 10) out += ') ' + v.slice(2, 6) + '-' + v.slice(6);
      else if (v.length === 11) out += ') ' + v.slice(2, 7) + '-' + v.slice(7);
      e.target.value = out;
    });
  }

  /* ---------- Submit (webhook Make) ---------- */
  // TODO: colar aqui a URL do webhook do Make/CRM da Dra. Surya
  var MAKE_WEBHOOK_URL = '';

  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // validação simples
      var ok = true;
      ['nome', 'whatsapp', 'email', 'incomodo'].forEach(function (id) {
        var el = document.getElementById(id);
        var field = el && el.closest('.field');
        var invalid = !el || !el.value
          || (id === 'whatsapp' && el.value.replace(/\D/g, '').length < 10)
          || (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        if (invalid) {
          if (field) field.classList.add('is-error');
          ok = false;
        } else if (field) {
          field.classList.remove('is-error');
        }
      });
      if (!ok) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      var payload = {
        nome: document.getElementById('nome').value,
        whatsapp: document.getElementById('whatsapp').value,
        email: document.getElementById('email').value,
        incomodo: document.getElementById('incomodo').value,
        pagina: window.location.href,
        data_envio: new Date().toISOString()
      };

      async function trackLeadAndRedirect() {
        if (window.geoTrackLead) { try { await window.geoTrackLead(); } catch (e) {} }
        window.location.href = 'obrigado';
      }

      if (!MAKE_WEBHOOK_URL) {
        console.warn('MAKE_WEBHOOK_URL não configurada — lead não foi enviado.', payload);
        trackLeadAndRedirect();
        return;
      }

      fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .catch(function (err) {
          console.error('Falha ao enviar lead para o Make:', err);
        })
        .finally(trackLeadAndRedirect);
    });
  }

  /* ---------- Modais (Termos / Política de Privacidade) ---------- */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  var openTerms = document.getElementById('openTerms');
  var openPrivacy = document.getElementById('openPrivacy');
  var openPrivacyFromForm = document.getElementById('openPrivacyFromForm');
  if (openTerms) openTerms.addEventListener('click', function (e) { e.preventDefault(); openModal('termsModal'); });
  if (openPrivacy) openPrivacy.addEventListener('click', function (e) { e.preventDefault(); openModal('privacyModal'); });
  if (openPrivacyFromForm) openPrivacyFromForm.addEventListener('click', function (e) { e.preventDefault(); openModal('privacyModal'); });

  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal-overlay').id);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(function (m) { closeModal(m.id); });
    }
  });
})();
