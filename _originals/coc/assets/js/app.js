/* ═══════════════════════════════════════════════════════════════
   CoC Knowledge Base – Main App Logic
   ═══════════════════════════════════════════════════════════════ */

// ── STATE ──────────────────────────────────────────────────────
const state = {
  articles: [],
  views: {},
  filtered: [],
  currentCategory: 'all',
  currentSearch: '',
  currentSort: 'newest',
  currentView: 'grid',
  page: 1,
  perPage: 12,
  editingId: null,
  openArticleId: null,
};

// ── CATEGORY META ──────────────────────────────────────────────
const CAT_META = {
  troops:       { label: 'Troops',        icon: '⚔️',  class: 'cat-troops' },
  heroes:       { label: 'Heroes',        icon: '🦸',  class: 'cat-heroes' },
  spells:       { label: 'Spells',        icon: '✨',  class: 'cat-spells' },
  buildings:    { label: 'Buildings',     icon: '🏗️', class: 'cat-buildings' },
  defenses:     { label: 'Defenses',      icon: '🛡️', class: 'cat-defenses' },
  strategy:     { label: 'Strategy',      icon: '🎯',  class: 'cat-strategy' },
  guides:       { label: 'Guides',        icon: '📖',  class: 'cat-guides' },
  'base-building': { label: 'Base Building', icon: '🏰', class: 'cat-base-building' },
  'clan-capital':  { label: 'Clan Capital',  icon: '🌋', class: 'cat-clan-capital' },
  events:       { label: 'Events',        icon: '🎉',  class: 'cat-events' },
};

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  state.articles = loadArticles();
  state.views    = loadViews();
  // Merge persisted view counts into articles
  state.articles.forEach(a => {
    if (state.views[a.id]) a.views = state.views[a.id];
  });
  applyFilter();
  renderFeatured();
  renderArticles();
  updateStats();
  initScrollEffects();
  initParticles();
  syncNavActive('all');
});

// ── FILTER & SEARCH ────────────────────────────────────────────
function applyFilter() {
  let arr = [...state.articles];

  // Category
  if (state.currentCategory !== 'all') {
    arr = arr.filter(a => a.category === state.currentCategory);
  }

  // Search
  const q = state.currentSearch.trim().toLowerCase();
  if (q) {
    arr = arr.filter(a => {
      const haystack = [a.title, a.summary, a.content, ...(a.tags || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  // Sort
  arr = sortArticles(arr, state.currentSort);

  state.filtered = arr;
  state.page = 1;
}

function sortArticles(arr, sortKey) {
  return [...arr].sort((a, b) => {
    switch (sortKey) {
      case 'newest':  return new Date(b.date) - new Date(a.date);
      case 'oldest':  return new Date(a.date) - new Date(b.date);
      case 'az':      return a.title.localeCompare(b.title);
      case 'za':      return b.title.localeCompare(a.title);
      case 'popular': return (b.views || 0) - (a.views || 0);
      default:        return 0;
    }
  });
}

// ── RENDER ARTICLES ────────────────────────────────────────────
function renderArticles(append = false) {
  const grid = document.getElementById('articles-grid');
  const emptyState = document.getElementById('empty-state');
  const loadMoreWrap = document.getElementById('load-more-wrap');
  const resultCount = document.getElementById('result-count');

  const total = state.filtered.length;
  const pageItems = state.filtered.slice(0, state.page * state.perPage);

  // Section title
  const titleEl = document.getElementById('articles-section-title');
  const cat = state.currentCategory;
  if (cat !== 'all' && CAT_META[cat]) {
    titleEl.innerHTML = `<span class="section-icon">${CAT_META[cat].icon}</span> ${CAT_META[cat].label}`;
  } else if (state.currentSearch) {
    titleEl.innerHTML = `<span class="section-icon">🔍</span> Hasil Pencarian`;
  } else {
    titleEl.innerHTML = `<span class="section-icon">📚</span> Semua Artikel`;
  }

  // Result count
  resultCount.textContent = total === 0 ? '' : `${total} artikel`;

  // Active filter badge
  const filterEl = document.getElementById('active-filter');
  if (state.currentSearch) {
    filterEl.textContent = `"${state.currentSearch}"`;
    filterEl.style.display = 'inline-flex';
  } else if (cat !== 'all' && CAT_META[cat]) {
    filterEl.textContent = `${CAT_META[cat].icon} ${CAT_META[cat].label}`;
    filterEl.style.display = 'inline-flex';
  } else {
    filterEl.style.display = 'none';
  }

  if (!append) grid.innerHTML = '';

  if (total === 0) {
    emptyState.style.display = 'block';
    loadMoreWrap.style.display = 'none';
    return;
  }
  emptyState.style.display = 'none';

  const items = append ? state.filtered.slice((state.page - 1) * state.perPage, state.page * state.perPage) : pageItems;
  const q = state.currentSearch.trim().toLowerCase();

  items.forEach((article, i) => {
    const card = buildCard(article, q);
    card.style.animationDelay = `${(append ? 0 : i) * 0.04}s`;
    grid.appendChild(card);
  });

  // Load more
  loadMoreWrap.style.display = pageItems.length < total ? 'block' : 'none';
}

function buildCard(article, highlight = '') {
  const card = document.createElement('div');
  card.className = `article-card${article.featured ? ' featured-card' : ''}`;
  card.setAttribute('data-id', article.id);

  const cat = CAT_META[article.category] || { label: article.category, icon: '📄', class: 'cat-guides' };
  const dateStr = formatDate(article.date);
  const tags = (article.tags || []).slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');
  const title = highlight ? highlightText(article.title, highlight) : escapeHtml(article.title);
  const summary = highlight
    ? highlightText(article.summary || '', highlight)
    : escapeHtml(article.summary || extractSummary(article.content));

  card.innerHTML = `
    <div class="card-top">
      <span class="card-category ${cat.class}">${cat.icon} ${cat.label}</span>
      <span class="card-date">${dateStr}</span>
    </div>
    <div class="card-title">${title}</div>
    <div class="card-summary">${summary}</div>
    <div class="card-tags">${tags}</div>
    <div class="card-footer">
      <span class="card-views">👁 ${formatNum(article.views || 0)}</span>
      <span class="card-read-more">Baca →</span>
    </div>
  `;

  card.addEventListener('click', () => openArticle(article.id));
  return card;
}

// ── RENDER FEATURED ────────────────────────────────────────────
function renderFeatured() {
  const featured = state.articles.filter(a => a.featured).slice(0, 4);
  const grid = document.getElementById('featured-grid');
  const section = document.getElementById('featured-section');

  if (featured.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  grid.innerHTML = '';

  featured.forEach(article => {
    const card = buildCard(article);
    card.classList.add('featured-card');
    grid.appendChild(card);
  });
}

// ── OPEN ARTICLE MODAL ─────────────────────────────────────────
function openArticle(id) {
  const article = state.articles.find(a => a.id === id);
  if (!article) return;

  state.openArticleId = id;

  // Increment views
  article.views = (article.views || 0) + 1;
  state.views[id] = article.views;
  saveViews(state.views);
  saveArticles(state.articles);

  // Update view count in grid
  const cardEl = document.querySelector(`[data-id="${id}"] .card-views`);
  if (cardEl) cardEl.textContent = `👁 ${formatNum(article.views)}`;

  const cat = CAT_META[article.category] || { label: article.category, icon: '📄', class: 'cat-guides' };

  document.getElementById('modal-category').textContent = `${cat.icon} ${cat.label}`;
  document.getElementById('modal-category').className = `modal-category-badge ${cat.class}`;
  document.getElementById('modal-title').textContent = article.title;
  document.getElementById('modal-date').textContent = `📅 ${formatDate(article.date)}`;
  document.getElementById('modal-views').textContent = formatNum(article.views);

  const tagsHtml = (article.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  document.getElementById('modal-tags').innerHTML = tagsHtml;

  document.getElementById('modal-body').innerHTML = parseMarkdown(article.content || '');

  openModal('article-modal');
  updateStats();
}

function closeArticleModal(e) {
  if (e && e.target !== document.getElementById('article-modal') && !e.target.classList.contains('modal-close')) return;
  closeModal('article-modal');
  state.openArticleId = null;
}

// ── FILTER CATEGORY ────────────────────────────────────────────
function filterCategory(cat) {
  state.currentCategory = cat;
  applyFilter();
  renderArticles();

  // Update featured visibility
  const featuredSection = document.getElementById('featured-section');
  if (cat === 'all' && !state.currentSearch) {
    renderFeatured();
  } else {
    featuredSection.style.display = 'none';
  }

  // Sync chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === cat);
  });

  syncNavActive(cat);
  window.scrollTo({ top: document.getElementById('category-section')?.offsetTop || 0, behavior: 'smooth' });
}

// ── SEARCH ─────────────────────────────────────────────────────
let searchDebounce;
function handleSearch(q) {
  state.currentSearch = q;
  document.getElementById('search-clear').style.display = q ? 'block' : 'none';

  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    applyFilter();
    renderArticles();
    renderSuggestions(q);

    const featured = document.getElementById('featured-section');
    if (!q) {
      renderFeatured();
    } else {
      featured.style.display = 'none';
    }
  }, 200);
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  state.currentSearch = '';
  document.getElementById('search-clear').style.display = 'none';
  document.getElementById('search-suggestions').classList.remove('open');
  applyFilter();
  renderArticles();
  renderFeatured();
}

function handleSearchKey(e) {
  if (e.key === 'Escape') {
    clearSearch();
    document.getElementById('search-input').blur();
  }
}

function renderSuggestions(q) {
  const box = document.getElementById('search-suggestions');
  if (!q || q.length < 2) { box.classList.remove('open'); return; }

  const matches = state.articles
    .filter(a => a.title.toLowerCase().includes(q.toLowerCase()) || (a.tags || []).some(t => t.includes(q.toLowerCase())))
    .slice(0, 5);

  if (matches.length === 0) { box.classList.remove('open'); return; }

  box.innerHTML = matches.map(a => {
    const cat = CAT_META[a.category] || { icon: '📄', label: a.category };
    const titleHl = highlightText(a.title, q);
    return `<div class="suggestion-item" onclick="selectSuggestion('${a.id}')">
      <span class="sug-icon">${cat.icon}</span>
      <span class="sug-text">${titleHl}</span>
      <span class="sug-cat">${cat.label}</span>
    </div>`;
  }).join('');
  box.classList.add('open');
}

function selectSuggestion(id) {
  document.getElementById('search-suggestions').classList.remove('open');
  openArticle(id);
}

document.addEventListener('click', (e) => {
  if (!document.getElementById('search-suggestions').contains(e.target) &&
      !document.getElementById('search-input').contains(e.target)) {
    document.getElementById('search-suggestions').classList.remove('open');
  }
});

// ── SORT & VIEW ────────────────────────────────────────────────
function handleSort(val) {
  state.currentSort = val;
  applyFilter();
  renderArticles();
}

function setView(v) {
  state.currentView = v;
  const grid = document.getElementById('articles-grid');
  const featGrid = document.getElementById('featured-grid');
  grid.classList.toggle('list-view', v === 'list');
  if (featGrid) featGrid.classList.toggle('list-view', v === 'list');
  document.getElementById('view-grid').classList.toggle('active', v === 'grid');
  document.getElementById('view-list').classList.toggle('active', v === 'list');
}

// ── LOAD MORE ──────────────────────────────────────────────────
function loadMore() {
  state.page++;
  renderArticles(true);
}

// ── SHOW HOME ──────────────────────────────────────────────────
function showHome() {
  state.currentCategory = 'all';
  state.currentSearch = '';
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').style.display = 'none';
  applyFilter();
  renderFeatured();
  renderArticles();
  syncNavActive('all');
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === 'all'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── ADD / EDIT MODAL ───────────────────────────────────────────
function openAddModal() {
  state.editingId = null;
  document.getElementById('form-modal-title').textContent = '✏️ Tambah Artikel Baru';
  document.getElementById('form-submit-btn').textContent = '💾 Simpan Artikel';
  document.getElementById('article-form').reset();
  document.getElementById('content-preview').style.display = 'none';
  document.getElementById('form-content').style.display = 'block';
  document.getElementById('preview-toggle-btn').textContent = '👁 Preview';
  openModal('form-modal');
}

function openEditModal() {
  const article = state.articles.find(a => a.id === state.openArticleId);
  if (!article) return;

  state.editingId = article.id;
  document.getElementById('form-modal-title').textContent = '✏️ Edit Artikel';
  document.getElementById('form-submit-btn').textContent = '💾 Update Artikel';
  document.getElementById('form-title').value = article.title;
  document.getElementById('form-category').value = article.category;
  document.getElementById('form-tags').value = (article.tags || []).join(', ');
  document.getElementById('form-summary').value = article.summary || '';
  document.getElementById('form-content').value = article.content || '';
  document.getElementById('form-featured').checked = !!article.featured;
  document.getElementById('content-preview').style.display = 'none';
  document.getElementById('form-content').style.display = 'block';
  document.getElementById('preview-toggle-btn').textContent = '👁 Preview';

  closeModal('article-modal');
  openModal('form-modal');
}

function closeFormModal(e) {
  if (e && e.target !== document.getElementById('form-modal') && !e.target.classList.contains('modal-close') && !e.target.classList.contains('btn-cancel')) return;
  closeModal('form-modal');
}

function handleFormSubmit(e) {
  e.preventDefault();
  const title    = document.getElementById('form-title').value.trim();
  const category = document.getElementById('form-category').value;
  const tagsRaw  = document.getElementById('form-tags').value.trim();
  const summary  = document.getElementById('form-summary').value.trim();
  const content  = document.getElementById('form-content').value.trim();
  const featured = document.getElementById('form-featured').checked;

  if (!title || !category || !content) {
    showToast('Harap isi semua field yang wajib!', 'error');
    return;
  }

  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  if (state.editingId) {
    // Update
    const idx = state.articles.findIndex(a => a.id === state.editingId);
    if (idx !== -1) {
      state.articles[idx] = { ...state.articles[idx], title, category, tags, summary, content, featured };
      saveArticles(state.articles);
      applyFilter();
      renderFeatured();
      renderArticles();
      closeModal('form-modal');
      showToast('✅ Artikel berhasil diupdate!', 'success');
    }
  } else {
    // New
    const newArticle = {
      id:       `art-${Date.now()}`,
      title,
      category,
      tags,
      summary,
      content,
      featured,
      date:     new Date().toISOString().split('T')[0],
      views:    0,
    };
    state.articles.unshift(newArticle);
    saveArticles(state.articles);
    applyFilter();
    renderFeatured();
    renderArticles();
    closeModal('form-modal');
    showToast('✅ Artikel baru berhasil ditambahkan!', 'success');
    updateStats();
  }
}

// ── DELETE ─────────────────────────────────────────────────────
function deleteCurrentArticle() {
  const id = state.openArticleId;
  const article = state.articles.find(a => a.id === id);
  if (!article) return;

  showConfirm(
    'Hapus Artikel?',
    `Artikel "<strong>${escapeHtml(article.title)}</strong>" akan dihapus permanen.`,
    () => {
      state.articles = state.articles.filter(a => a.id !== id);
      saveArticles(state.articles);
      applyFilter();
      renderFeatured();
      renderArticles();
      closeModal('article-modal');
      updateStats();
      showToast('🗑 Artikel berhasil dihapus.', 'info');
    }
  );
}

// ── MARKDOWN EDITOR HELPERS ────────────────────────────────────
function formatText(before, after) {
  const ta = document.getElementById('form-content');
  const start = ta.selectionStart, end = ta.selectionEnd;
  const selected = ta.value.substring(start, end) || 'teks';
  ta.setRangeText(before + selected + after, start, end, 'end');
  ta.focus();
}

function insertHeading() {
  const ta = document.getElementById('form-content');
  const pos = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf('\n', pos - 1) + 1;
  ta.setRangeText('\n## ', lineStart, lineStart, 'end');
  ta.focus();
}

function insertList() {
  const ta = document.getElementById('form-content');
  const pos = ta.selectionStart;
  ta.setRangeText('\n- Item 1\n- Item 2\n- Item 3\n', pos, pos, 'end');
  ta.focus();
}

function insertTable() {
  const t = '\n| Kolom 1 | Kolom 2 | Kolom 3 |\n|---------|---------|----------|\n| Data    | Data    | Data     |\n| Data    | Data    | Data     |\n';
  const ta = document.getElementById('form-content');
  ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, 'end');
  ta.focus();
}

function insertCode() {
  const ta = document.getElementById('form-content');
  const start = ta.selectionStart, end = ta.selectionEnd;
  const sel = ta.value.substring(start, end) || 'kode';
  ta.setRangeText('`' + sel + '`', start, end, 'end');
  ta.focus();
}

function insertHR() {
  const ta = document.getElementById('form-content');
  ta.setRangeText('\n\n---\n\n', ta.selectionStart, ta.selectionEnd, 'end');
  ta.focus();
}

let previewOn = false;
function togglePreview() {
  previewOn = !previewOn;
  const ta = document.getElementById('form-content');
  const preview = document.getElementById('content-preview');
  const btn = document.getElementById('preview-toggle-btn');
  if (previewOn) {
    preview.innerHTML = parseMarkdown(ta.value);
    applyModalBodyStyles(preview);
    ta.style.display = 'none';
    preview.style.display = 'block';
    btn.textContent = '✏️ Edit';
  } else {
    ta.style.display = 'block';
    preview.style.display = 'none';
    btn.textContent = '👁 Preview';
  }
}

// ── MARKDOWN PARSER ────────────────────────────────────────────
function parseMarkdown(md) {
  if (!md) return '';
  let html = escapeHtml(md);

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Blockquote
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // HR
  html = html.replace(/^---+$/gm, '<hr>');

  // Checkboxes
  html = html.replace(/^- \[x\] (.+)$/gm, '<li class="checked">✅ $1</li>');
  html = html.replace(/^- \[ \] (.+)$/gm, '<li class="unchecked">⬜ $1</li>');

  // Unordered list
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!\n<li>)/g, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '');

  // Ordered list
  html = html.replace(/^\d+\. (.+)$/gm, '<oli>$1</oli>');
  html = html.replace(/(<oli>[\s\S]*?<\/oli>)(?!\n<oli>)/g, '<ol>$1</ol>');
  html = html.replace(/<\/ol>\n<ol>/g, '');
  html = html.replace(/<oli>/g, '<li>').replace(/<\/oli>/g, '</li>');

  // Tables
  html = parseMarkdownTables(html);

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:8px 0">');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p>\s*(<\/(h[1-6]|ul|ol|blockquote|hr|table|pre)>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<(h[1-6]|ul|ol|blockquote|hr|table|pre)[^>]*>)/g, '$1');
  html = html.replace(/<p><\/p>/g, '');

  // Single line breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}

function parseMarkdownTables(html) {
  const tableRegex = /(\|.+\|\n)+/g;
  return html.replace(tableRegex, (match) => {
    const rows = match.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return match;

    let tableHtml = '<table>';
    rows.forEach((row, i) => {
      if (/^\|[-|\s:]+\|$/.test(row)) return; // separator row
      const cells = row.split('|').filter((_, j, a) => j > 0 && j < a.length - 1);
      const tag = i === 0 ? 'th' : 'td';
      tableHtml += '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });
    tableHtml += '</table>';
    return tableHtml;
  });
}

function applyModalBodyStyles(el) {
  el.querySelectorAll('table').forEach(t => {
    t.style.width = '100%';
    t.style.borderCollapse = 'collapse';
  });
}

// ── STATS ──────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('stat-total').textContent = state.articles.length;
  const totalViews = state.articles.reduce((sum, a) => sum + (a.views || 0), 0);
  document.getElementById('stat-views').textContent = formatNum(totalViews);
  animateCounter('stat-total', state.articles.length);
  animateCounter('stat-views', totalViews);
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = formatNum(current);
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ── MODAL HELPERS ──────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove('open');
  if (!document.querySelector('.modal-overlay.open')) {
    document.body.style.overflow = '';
  }
}

// ── CONFIRM DIALOG ─────────────────────────────────────────────
function showConfirm(title, message, onOk) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').innerHTML = message;
  const okBtn = document.getElementById('confirm-ok-btn');
  okBtn.onclick = () => { onOk(); closeModal('confirm-modal'); };
  openModal('confirm-modal');
}

function closeConfirmModal() {
  closeModal('confirm-modal');
}

// Close confirm when clicking overlay
document.getElementById('confirm-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('confirm-modal')) closeModal('confirm-modal');
});

// ── TOAST ──────────────────────────────────────────────────────
let toastTimer;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ── MOBILE NAV ─────────────────────────────────────────────────
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  const hamburger = document.getElementById('hamburger');
  const open = nav.classList.toggle('open');
  overlay.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ── NAV SYNC ───────────────────────────────────────────────────
function syncNavActive(cat) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === cat);
  });
}

// ── SCROLL EFFECTS ─────────────────────────────────────────────
function initScrollEffects() {
  const scrollTopBtn = document.getElementById('scroll-top');
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    scrollTopBtn.classList.toggle('visible', y > 400);
    header.classList.toggle('scrolled', y > 20);
    lastScroll = y;
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── PARTICLES ─────────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles-bg');
  const emojis = ['⚔️','🛡️','🏰','🌟','💫','✨','🔥','⚡','🏹','💎','🗡️'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `
      position:absolute;
      font-size:${12 + Math.random() * 16}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      opacity:${0.03 + Math.random() * 0.06};
      animation:floatParticle ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay:${-Math.random() * 10}s;
      pointer-events:none;
      user-select:none;
    `;
    container.appendChild(p);
  }

  // Add keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33% { transform: translateY(-30px) rotate(5deg); }
      66% { transform: translateY(15px) rotate(-5deg); }
    }
    #site-header.scrolled { box-shadow: 0 4px 40px rgba(0,0,0,.8); }
  `;
  document.head.appendChild(style);
}

// ── UTILITIES ──────────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightText(text, query) {
  if (!query || !text) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const re = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escaped.replace(re, '<mark class="highlight">$1</mark>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSummary(content) {
  if (!content) return '';
  // Get first meaningful paragraph
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('-'));
  const first = lines[0] || '';
  return first.replace(/\*\*/g, '').replace(/\*/g, '').slice(0, 140) + (first.length > 140 ? '…' : '');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal('article-modal');
    closeModal('form-modal');
    closeModal('confirm-modal');
    closeMobileNav();
    document.getElementById('search-suggestions').classList.remove('open');
    state.openArticleId = null;
  }
  // Cmd/Ctrl + K = focus search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('search-input').focus();
    document.getElementById('search-input').select();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Cmd/Ctrl + N = new article
  if ((e.metaKey || e.ctrlKey) && e.key === 'n' && !e.shiftKey) {
    e.preventDefault();
    openAddModal();
  }
});
