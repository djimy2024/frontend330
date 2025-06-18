// auth.js
const clientId = '1f71e98cfc8547a887a6e910df1e0e90';
const redirectUri = 'https://djimy2024.github.io/frontend330/src/project/index.html';
const scopes = ['playlist-modify-public', 'playlist-modify-private', 'user-read-email'];

function generateCodeVerifier(length = 128) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function login() {
  const codeVerifier = generateCodeVerifier();
  sessionStorage.setItem('code_verifier', codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const state = Math.random().toString(36).substring(2, 15);
  const scope = scopes.join(' ');

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  window.location = 'https://accounts.spotify.com/authorize?' + args.toString();
}

export async function fetchAccessToken(code) {
  const codeVerifier = sessionStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem('spotify_access_token', data.access_token);
    return data.access_token;
  } else {
    throw new Error('Failed to get access token');
  }
}

export function getAccessToken() {
  return localStorage.getItem('spotify_access_token');
}

export function logout() {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token'); 
  sessionStorage.removeItem('code_verifier'); 
}
