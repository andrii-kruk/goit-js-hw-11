import Notiflix from 'notiflix';

import { refs } from './js/refs';
import ApiService from './js/api-service';
import { onCreateGalleryItem } from './js/create-markup';
import { lightbox } from './js/simple-lightbox';

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  apiService.resetPage();
  apiService.resetTotal();

  apiService.getElements().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query: ${apiService.searchQuery}. Please try again.`
      );
      refs.galleryMarkup.innerHTML = '';
      return;
    }

    apiService.total = data.hits.length;
    const markup = onCreateGalleryItem(data);
    refs.galleryMarkup.innerHTML = markup;
    lightbox.refresh();

    if (apiService.total !== data.totalHits) {
      refs.loadMore.style.visibility = 'visible';
    } else if (apiService.total === data.totalHits) {
      refs.loadMore.style.visibility = 'hidden';

      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.input.value = '';
  });
}

function onLoadMore() {
  apiService.getElements().then(data => {
    apiService.total = data.hits.length;
    if (apiService.total === data.totalHits) {
      refs.loadMore.style.visibility = 'hidden';

      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    const markup = onCreateGalleryItem(data);
    refs.galleryMarkup.insertAdjacentHTML('beforeend', markup);
  });
}
