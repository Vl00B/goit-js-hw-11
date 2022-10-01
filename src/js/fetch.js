import axios from 'axios';

import { markup } from './markup';
import { searchParams } from './markup';
import { _searchSuccess, _searchError, _limit } from './notify';

const footer = document.querySelector('footer');

const fetchImages = async (page, searchInput, parent) => {
  const images = [];
  let hitCounter;
  let cards = 0;

  await axios(
    `https://pixabay.com/api/?${searchParams}&page=${page}&q=${searchInput}`
  )
    .then(response => {
      hitCounter = response.data.totalHits;

      return response.data.hits;
    })
    .then(data => {
      //

      if (hitCounter == 0) {
        _searchError();

        return;
      } else {
        for (const hit of data) {
          cards += 1;


          // const params = ({
          //   webformatURL,
          //   tags,
          //   likes,
          //   views,
          //   comments,
          //   downloads,
          //   largeImageURL,
          // } = hit);

          const params = {
            webformatURL: hit.webformatURL,
            tags: hit.tags,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
            largeImageURL: hit.largeImageURL,
          };

          const params = ({
            const webformatURL,
            const tags,
            const likes,
            const views,
            const comments,
            const downloads,
            const largeImageURL,
          } = hit);


          images.push(markup(params));
        }

        if (cards < 40) {
          _limit();
        } else {
          _searchSuccess(hitCounter, cards);
        }

        footer.classList.remove('hidden');
        //
      }
    })
    .catch(function (error) {
      if (error.message.includes('400')) {
        _limit();

        return;
      } else {
        console.log(error.message);
      }
    });

  parent.append(...images);
};

export default fetchImages;
