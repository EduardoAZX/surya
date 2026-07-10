(function () {
  var CAPI = '/meta-capi/capi.php';

  async function sha256(str) {
    var buf = await crypto.subtle.digest(
      'SHA-256', new TextEncoder().encode(str.trim().toLowerCase())
    );
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  function normalizePhone(ph) {
    var d = ph.replace(/\D/g, '');
    if (d.length === 10 || d.length === 11) d = '55' + d;
    return d;
  }

  function genEid(prefix) {
    return prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
  }

  async function sendCapi(event, eid, userData) {
    var body = new URLSearchParams({ event: event, eid: eid, source_url: location.href });
    if (userData.em) body.append('em', userData.em);
    if (userData.ph) body.append('ph', userData.ph);
    try {
      await fetch(CAPI, { method: 'POST', body: body });
    } catch (_) {}
  }

  // PageView — dispara ao carregar a página
  (async function () {
    var eid = genEid('pv');
    if (window.fbq) fbq('track', 'PageView', {}, { eventID: eid });
    await sendCapi('PageView', eid, {});
  })();

  // Lead — exposto globalmente, chamado após envio bem-sucedido do formulário
  window.geoTrackLead = async function () {
    var eid = genEid('lead');
    var userData = {};

    var emailEl = document.getElementById('email');
    var phoneEl = document.getElementById('whatsapp');

    if (emailEl && emailEl.value.trim()) {
      userData.em = await sha256(emailEl.value.trim());
    }
    if (phoneEl && phoneEl.value.trim()) {
      userData.ph = await sha256(normalizePhone(phoneEl.value.trim()));
    }

    if (window.fbq) fbq('track', 'Lead', {}, { eventID: eid });
    await sendCapi('Lead', eid, userData);
  };
})();
