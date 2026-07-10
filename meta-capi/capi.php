<?php
/**
 * Meta CAPI — Shape Glúteo (Dra. Surya Braga)
 * Endpoint server-side com deduplicação por event_id.
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

define('GEO_PIXEL_ID',   'SEU_PIXEL_ID');
define('GEO_CAPI_TOKEN', 'SEU_CAPI_TOKEN');

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method not allowed']);
    exit;
}

// Rate limit: máx 30 req/min por IP usando APCu (se disponível)
$ip    = geo_get_ip();
$rlKey = 'geo_rl_' . md5($ip);
if (function_exists('apcu_fetch')) {
    $hits = (int) apcu_fetch($rlKey);
    if ($hits >= 30) {
        http_response_code(429);
        echo json_encode(['error' => 'rate_limited']);
        exit;
    }
    apcu_store($rlKey, $hits + 1, 60);
}

// Validação
$allowed = ['PageView', 'Lead'];
$event   = isset($_POST['event']) ? preg_replace('/[^a-zA-Z]/', '', $_POST['event']) : '';
if (!in_array($event, $allowed, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid event']);
    exit;
}

$eid        = isset($_POST['eid'])        ? preg_replace('/[^a-zA-Z0-9\-_]/', '', $_POST['eid']) : 'ev-' . bin2hex(random_bytes(8));
$source_url = isset($_POST['source_url']) ? filter_var(trim($_POST['source_url']), FILTER_SANITIZE_URL) : '';

$user_data = [
    'client_ip_address' => $ip,
    'client_user_agent' => isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
];

if (!empty($_POST['em']) && preg_match('/^[a-f0-9]{64}$/', $_POST['em'])) {
    $user_data['em'] = [$_POST['em']];
}
if (!empty($_POST['ph']) && preg_match('/^[a-f0-9]{64}$/', $_POST['ph'])) {
    $user_data['ph'] = [$_POST['ph']];
}

$payload = [
    'data' => [[
        'event_name'       => $event,
        'event_time'       => time(),
        'event_id'         => $eid,
        'action_source'    => 'website',
        'event_source_url' => $source_url,
        'user_data'        => $user_data,
    ]],
];

$ch = curl_init(
    'https://graph.facebook.com/v20.0/' . GEO_PIXEL_ID . '/events?access_token=' . GEO_CAPI_TOKEN
);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 8,
]);
curl_exec($ch);
curl_close($ch);

echo json_encode(['ok' => true]);

function geo_get_ip() {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) return trim(explode(',', $_SERVER[$k])[0]);
    }
    return '';
}
