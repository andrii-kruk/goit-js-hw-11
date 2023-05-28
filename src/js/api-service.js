const axios = require('axios').default;

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalAmount = 0;
  }

  async getElements() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '36804749-f9982f981e96555b628218181';

    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get total() {
    return this.totalAmount;
  }

  set total(newTotal) {
    this.totalAmount = newTotal;
  }

  resetTotal() {
    this.totalAmount = 0;
  }
}
