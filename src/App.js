import React, { useEffect, useState } from 'react';

import { AiFillHeart } from 'react-icons/ai';

import './styles/App.css';

import MovieRow from './components/MovieRow/MovieRow';

import FeaturedMovie from './components/FeaturedMovie/FeatureMovie';

import Header from './components/Header/Header';

import loading from './images/loading.gif';

import Tmdb from './services/tmdb';

export default function App() {
  // Criando estador para cada componente
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  // adicionando efeitos na tela
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured

      const originals = list.filter((i) => i.slug === 'originals');
      // Escolhendo um valor randomico
      const randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );

      const chosen = originals[0].items.results[randomChosen];
      // escolhendo uma série que será randomica
      const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      // Agora o estado será esta série escolhida pelo id dela
      setFeaturedData(chosenInfo);
    };

    // executando a função ao abrir a pag
    loadAll();
  }, []);

  // efeito de escutar o scroll
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      <footer className="footer">
        Made with{' '}
        <span role="img" aria-label="coração">
          <AiFillHeart />
        </span>{' '}
        by Leonardo de Farias Bispo <br />
        Image rights for Netflix <br />
        Data picked up from Themoviedb.org website
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img src={loading} alt="Loading" />
        </div>
      )}
    </div>
  );
}
