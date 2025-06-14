let accessToken = localStorage.getItem("spotify_access_token") || null;

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length))).map(x => chars[x % chars.length]).join('');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function redirectToSpotifyLogin() {
  const clientId = '1f71e98cfc8547a887a6e910df1e0e90';
  const redirectUri = 'https://djimy2024.github.io/frontend330/src/project/';
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem('code_verifier', verifier);

  const scopes = 'playlist-modify-public';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${challenge}`;
  window.location.href = authUrl;
}

export async function fetchAccessToken() {
  const code = new URLSearchParams(window.location.search).get('code');
  const verifier = localStorage.getItem('code_verifier');
  if (!code || !verifier) return;

  const body = new URLSearchParams({
    client_id: '1f71e98cfc8547a887a6e910df1e0e90',
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'https://djimy2024.github.io/frontend330/src/project/',
    code_verifier: verifier
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const data = await res.json();
  accessToken = data.access_token;
  localStorage.setItem('spotify_access_token', accessToken);
  window.history.replaceState({}, document.title, window.location.pathname);
}

export function getAccessToken() {
  return accessToken;
}

export function initButtons() {
  const loginBtn = document.getElementById('spotify-login');
  const logoutBtn = document.getElementById('spotify-logout');

  loginBtn.style.display = accessToken ? 'none' : 'inline-block';
  logoutBtn.style.display = accessToken ? 'inline-block' : 'none';

  loginBtn.addEventListener('click', redirectToSpotifyLogin);
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("spotify_access_token");
    accessToken = null;
    location.reload();
  });
}