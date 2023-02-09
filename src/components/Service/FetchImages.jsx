import axios from 'axios';

const params = {
  key: '31846910-d92a45aa9c1fee0fb7faf0751',
  options: '&images_type=photo&orientation=horizontal&safesearch=true',
};
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImg(query, page) {
  const respons = await axios.get(
    `?key=${params.key}&q=${query}${params.options}&per_page=12&page=${page}`
  );
  return respons.data;
}
