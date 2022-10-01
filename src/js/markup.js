export function markup(paramObj) {
  const {
    webformatURL: src,
    tags: alt,
    likes,
    views,
    comments,
    downloads,
    largeImageURL: largeSrc,
  } = paramObj;

  const element = document.createElement('div');
  element.classList.add('gallery-item');
  element.setAttribute('href', largeSrc);

  element.innerHTML = `
  <img src='${src}' alt='${alt}'>
  <div>
  <p>Likes ${likes}</p>
  <p>Views ${views}</p>
  <p>Comments ${comments}</p>
  <p>Downloads ${downloads}</p>
  </div>
  `;

  return element;
}

const searchObj = new URLSearchParams({
  key: '30166248-c6812272da7f4e3caf06b5606',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export const searchParams = searchObj.toString();
