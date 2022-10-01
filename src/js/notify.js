import { Notify } from 'notiflix';

export function _notDefined() {
  Notify.failure('Search query is not defined! Please try again.');
}

export function _searchError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function _searchSuccess(hits, output) {
  if (hits === 1) {
    Notify.success(`Success! Found 1 image! 1 card was made!`);
    return;
  }
  Notify.success(`Success! Found ${hits} images! ${output} cards were made!`);
}

export function _limit() {
  Notify.info(
    'There are no other images of this topic. Reset or try another query.'
  );
}
