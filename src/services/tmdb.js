const API_KEY = 'f780a7b070ee4cbf851252fc35f8e6ca'; // colocando a chave da API

const API_BASE = 'https://api.themoviedb.org/3'; // a base da API

// utilizando o fetch para descompactar a API
const basicFetch = async (endpoint) => {
  // construindo requisição
  const req = await fetch(`${API_BASE}${endpoint}`);
  // transformando tudo em Json
  const json = await req.json();
  return json;
};
/* exportando um objeto que retorna um array dando um novo nome para todos os json dos filmes
Falando na url a localização do genero e a linguagem que quer o filme, juntamente com a API_Key
*/
export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Netflix Originals',
        items: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'trending',
        title: 'Recommended for You',
        items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`),
      },
      {
        slug: 'toprated',
        title: 'Trending',
        items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: 'action',
        title: 'Action',
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'comdey',
        title: 'Comedy',
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(
          `/discover/movie?with_genres=10749&api_key=${API_KEY}`
        ),
      },
      {
        slug: 'documentary',
        title: 'Documentaries',
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },
  // Pegando a informação do Filme
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?api_key=${API_KEY}`);
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?api_key=${API_KEY}`);
          break;
        default:
          console.log('Error in server');
      }
    }
    return info;
  },
};
