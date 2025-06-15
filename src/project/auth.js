const clientId = '1f71e98cfc8547a887a6e910df1e0e90';
const redirectUri = 'https://djimy2024.github.io/frontend330/src/project/';
const scope = 'playlist-modify-public';

const codeVerifierKey = 'spotify_code_verifier';
const tokenKey = 'spotify_access_token';

// Generate a random string for code verifier
function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

// Generate code challenge from verifier
async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Redirect to Spotify login
export async function redirectToLogin() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem(codeVerifierKey, verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: challenge
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Exchange auth code for token
async function fetchAccessToken(code, verifier) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  const data = await res.json();
  if (data.access_token) {
    localStorage.setItem(tokenKey, data.access_token);
    return data.access_token;
  } else {
    throw new Error('Access token error: ' + JSON.stringify(data));
  }
}

// Get access token from URL or storage
export async function getAccessToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const storedToken = localStorage.getItem(tokenKey);

  if (storedToken) return storedToken;

  if (code) {
    const verifier = localStorage.getItem(codeVerifierKey);
    return await fetchAccessToken(code, verifier);
  }

  // If not logged in, redirect
  await redirectToLogin();
}
