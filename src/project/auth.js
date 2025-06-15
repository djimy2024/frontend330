// auth.js
const clientId = "1f71e98cfc8547a887a6e910df1e0e90";
const redirectUri = "https://djimy2024.github.io/frontend330/src/project/redirect.html"; 

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(x => chars[x % chars.length]).join('');
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function loginWithSpotify() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: '1f71e98cfc8547a887a6e910df1e0e90',
    scope: 'playlist-modify-public playlist-modify-private',
    redirect_uri: 'https://djimy2024.github.io/frontend330/src/project/redirect.html',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function exchangeTokenFromRedirect() {
  const code = new URLSearchParams(window.location.search).get("code");
  const codeVerifier = localStorage.getItem('spotify_code_verifier');

  if (!code) return;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: '1f71e98cfc8547a887a6e910df1e0e90',
      grant_type: "authorization_code",
      code,
      redirect_uri: 'https://djimy2024.github.io/frontend330/src/project/redirect.html',
      code_verifier: codeVerifier
    })
  });

  const data = await res.json();

  if (data.access_token) {
    localStorage.setItem("spotify_access_token", data.access_token);
    window.location.href = "index.html"; 
  } else {
    console.error("Token error:", data);
    alert("Login failed. Try again.");
  }
}

export function getAccessToken() {
  return localStorage.getItem("spotify_access_token");
}