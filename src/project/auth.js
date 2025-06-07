let accessToken = null;

export function initAuth() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  accessToken = params.get('access_token');

  document.getElementById('spotify-login').addEventListener('click', () => {
    const clientId = '30cf98bb37f04faab1fd4f4fe70ac9c7' 
    const redirectUri = 'https://djimy2024.github.io/frontend330/src/project/';
    const scopes = 'playlist-modify-public';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  });
}

export function getAccessToken() {
  return accessToken;
}
