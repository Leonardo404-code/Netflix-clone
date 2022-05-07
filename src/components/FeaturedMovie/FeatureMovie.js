import React from 'react';

import { BsFillPlayFill } from 'react-icons/bs';

import './FeatureMovie.css';

// eslint-disable-next-line
export default ({ item }) => {
  const firtDate = new Date(item.first_air_date); // convertendo a data da API para uma data mais legivel

  const genres = [];
  for (const i in item.genres) {
    genres.push(item.genres[i].name); // iterando dentro dos generos e colocando um na frente do outro
  }

  let description = item.overview; // pegando a descrição num let

  if (description.length > 200) {
    description = `${description.substring(0, 255)}...`; // quando passar de 255 caracteres, corta e cocatena
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year">{firtDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.numeber_of_seasons} temporada
              {item.numeber_of_seasons !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a href={`/watch/${item.id}`} className="featured--watchbutton">
              <BsFillPlayFill className="play" /> Watch
            </a>
            <a href={`/list/add/${item.id}`} className="featured--mylistbutton">
              + My list
            </a>
          </div>
          <div className="featured--genres">
            <strong>Genres:</strong> {genres.join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
};
