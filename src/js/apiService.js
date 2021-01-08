export default {
    searchQuery: '',
    page: 1,
    BASE_URL: 'https://pixabay.com/api/',
    API_KEY: '19790179-de8e0f050de34d9c55fd8172a',
    per_page: 12,

    fetchImage() {
        const url = `${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${this.API_KEY}`;

        return fetch(url).then(res => res.json()).then(data => {
            this.incrementPage();
            return data.hits;
        })
    },
    incrementPage() {
        this.page += 1;
    },
    resetPage() {
        this.page = 1;
    },
    getQuery() {
        return this.searchQuery;
    },
    setQuery(newQuery) {
        this.searchQuery = newQuery;
    },
};