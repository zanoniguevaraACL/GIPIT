<?php
function hash_internal_user_password(string $password, $fasthash = false, $pepperlength = 0): string {
    $rounds = $fasthash ? 5000 : 10000;
    $randombytes = random_bytes(16);
    $salt = substr(strtr(base64_encode($randombytes), '+', '.'), 0, 16);

    $generatedhash = crypt($password, implode('$', [
        '',
        '6', // SHA512 Algorithm
        "rounds={$rounds}",
        $salt,
        '',
    ]));

    if ($generatedhash === false || $generatedhash === null) {
        throw new Exception('Failed to generate password hash.');
    }

    return $generatedhash;
}

$password = 'edumind.123';
$hash = hash_internal_user_password($password);
echo "Hash generado: " . $hash;