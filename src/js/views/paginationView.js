import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _btnNext(cur) {
    return `
    <button data-goto="${cur + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${cur + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
      `;
  }

  _btnPrevious(cur) {
    return `
    <button data-goto="${cur - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${cur - 1}</span>
    </button>
      `;
  }

  _btnBoth(cur) {
    return `
    <button data-goto="${cur - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${cur - 1}</span>
    </button>
    <button data-goto="${cur + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${cur + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
      `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._btnNext(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._btnPrevious(curPage);
    }
    // Other page
    if (curPage < numPages) {
      return this._btnBoth(curPage);
    }

    // Page 1, no other pages
    return '';
  }
}

export default new PaginationView();
