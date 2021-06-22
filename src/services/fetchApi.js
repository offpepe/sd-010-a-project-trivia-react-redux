function fetchToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  fetch(url).then((response) => response.json()).then((resData) => resData);
}

export default fetchToken;
