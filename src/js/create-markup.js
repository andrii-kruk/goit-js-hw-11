export function onCreateGalleryItem(data) {
    return data.hits.map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
          <li class="photo-card">
            <a href="${largeImageURL}" class="gallery__item">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
            </a>
            <div class="info">
              <p class="info-item">
              <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
              <b>Views: ${views}</b>
              </p>
              <p class="info-item">
              <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
              <b>Downloads: ${downloads}</b>
              </p>
            </div>
          </li>
      `;
        }
      )
      .join('');
  }