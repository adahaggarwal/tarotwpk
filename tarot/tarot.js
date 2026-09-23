document.addEventListener('DOMContentLoaded', () => {
  const pages = [
    { category: 'Love', icon: '../love.png', image: '../love_sq.PNG', title: 'Matters of the', emphasis: 'heart.', copy: 'Explore relationships, emotions, connections, and matters of the heart.' },
    { category: 'Career', icon: '../career.png', image: '../career_sq.PNG', title: 'Make your next', emphasis: 'move.', copy: 'Gain perspective on your professional path, opportunities, decisions, and career direction.' },
    { category: 'Self-improvement', icon: '../self.png', image: '../self_sq.PNG', title: 'Come back to', emphasis: 'yourself.', copy: 'Reflect on personal growth, inner patterns, confidence, and the path towards becoming your best self.' }
  ];
  const book = document.querySelector('.tarot-book');
  const copy = document.querySelector('.book-copy-page');
  const image = document.querySelector('.book-image-page');
  const count = document.querySelector('.book-count strong');
  let index = 0;
  const render = (direction) => { index = (index + direction + pages.length) % pages.length; const page = pages[index]; book.classList.remove('turn-next', 'turn-previous'); void book.offsetWidth; book.classList.add(direction > 0 ? 'turn-next' : 'turn-previous'); copy.innerHTML = `<img class="book-icon" src="${page.icon}" alt="${page.category} icon"><span class="book-category">0${index + 1} / ${page.category}</span><h2>${page.title}<br><em>${page.emphasis}</em></h2><p>${page.copy}</p>`; image.innerHTML = `<img class="book-image" src="${page.image}" alt="${page.category} tarot reading">`; count.textContent = index + 1; };
  document.querySelector('.book-next').addEventListener('click', () => render(1));
  document.querySelector('.book-previous').addEventListener('click', () => render(-1));
});
