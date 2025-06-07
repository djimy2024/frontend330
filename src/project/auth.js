let accessToken = null;

export function initAuth() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  accessToken = params.get('access_token');

  document.getElementById('spotify-login').addEventListener('click', () => {
    const clientId = 'VRE_CLIENT_ID_W'  // Ranplase ak vre Client ID ou
    const redirectUri = 'http://localhost:5173/';
    const scopes = 'playlist-modify-public';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  });
}

export function getAccessToken() {
  return accessToken;
}
