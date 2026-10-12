/**
 * ISE 291 Interactive Question Bank
 * Complete Client-Side Application Logic
 */

// 1. Dictionaries with 100% Key Parity
const STRINGS = {
  en: {
    bannerText: "⏱️ Active until Wednesday Oct 14, 2026, 9:00 PM AST",
    subtitle: "Comprehensive Interactive Question Bank",
    tabExplorer: "Topic Explorer",
    tabQuiz: "Practice Quiz",
    tabExam: "Midterm Simulator",
    tabSaved: "Saved",
    statTotal: "Total Questions",
    statAnswered: "Answered",
    statAccuracy: "Accuracy",
    statBookmarked: "Bookmarked",
    filterTopic: "Filter by Syllabus Topic",
    filterFile: "Filter by Source File",
    searchPlaceholder: "Search questions, code snippets, topics...",
    allTopics: "All Topics",
    allFiles: "All Files",
    allStatus: "All",
    unanswered: "Unanswered",
    correct: "Correct",
    incorrect: "Incorrect",
    revealAll: "Reveal All",
    shuffle: "Shuffle",
    reset: "Reset",
    loadMore: "Load More Questions",
    revealSolution: "Reveal Solution",
    hideSolution: "Hide Solution",
    solutionLabel: "Solution & Rationale",
    examTitle: "Midterm Exam Simulator",
    examDesc: "Simulate a realistic midterm exam environment with randomized conceptual and coding questions selected across all course topics. Immediate feedback is hidden until submission.",
    examQCount: "Number of Questions",
    examTime: "Time Limit",
    startExam: "Start Midterm Exam",
    submitExam: "Submit Exam",
    prevBtn: "Previous",
    nextBtn: "Next",
    flagBtn: "Flag for Review",
    resultsTitle: "Exam Summary & Score",
    reviewAnswers: "Review Detailed Answers",
    retakeExam: "Take Another Exam",
    savedTitle: "Bookmarked Questions",
    savedDesc: "Review and practice the questions you have saved for focused revision.",
    noSaved: "No bookmarked questions yet. Click the bookmark star on any question to add it here.",
    noResults: "No questions found matching your filter criteria.",
    copyCode: "Copy Code",
    copied: "Copied!",
    countdownExpired: "Expired",
    codeSnippet: "Code Snippet",
    quizCompleteTitle: "Practice Quiz Completed!",
    takeNewQuiz: "Take New Quiz",
    quizScore: "Score",
    quizFinish: "Finish Quiz",
    examUntimed: "Untimed"
  },
  ar: {
    bannerText: "⏱️ نشط حتى الأربعاء 14 أكتوبر 2026، 9:00 مساءً بتوقيت مكة المكرمة",
    subtitle: "بنك الأسئلة التفاعلي الشامل لمقرر علم البيانات",
    tabExplorer: "استكشاف المواضيع",
    tabQuiz: "اختبار تدريبي",
    tabExam: "محاكي الميدتيرم",
    tabSaved: "المحفوظات",
    statTotal: "إجمالي الأسئلة",
    statAnswered: "تم حلها",
    statAccuracy: "الدقة",
    statBookmarked: "المفضلة",
    filterTopic: "تصفية حسب مواضيع المنهج",
    filterFile: "تصفية حسب الملف المصدري",
    searchPlaceholder: "ابحث في نصوص الأسئلة، الأكواد البرمجية، والمواضيع...",
    allTopics: "جميع المواضيع",
    allFiles: "جميع الملفات",
    allStatus: "الكل",
    unanswered: "غير محلول",
    correct: "صحيح",
    incorrect: "غير صحيح",
    revealAll: "إظهار الإجابات",
    shuffle: "خلط الأسئلة",
    reset: "إعادة ضبط",
    loadMore: "تحميل المزيد من الأسئلة",
    revealSolution: "عرض الحل والشرح",
    hideSolution: "إخفاء الحل والشرح",
    solutionLabel: "الحل والتفسير المعتمد",
    examTitle: "محاكي الاختبار الفصلي (Midterm)",
    examDesc: "محاكاة واقعية لاختبار الميدتيرم بأسئلة مفاهيمية وبرمجية مختارة عشوائياً من كافة مواضيع المقرر مع إخفاء الإجابات حتى الاعتماد النهائي.",
    examQCount: "عدد الأسئلة",
    examTime: "الوقت المحدد",
    startExam: "بدء اختبار الميدتيرم",
    submitExam: "تسليم الاختبار",
    prevBtn: "السابق",
    nextBtn: "التالي",
    flagBtn: "تحديد للمراجعة",
    resultsTitle: "ملخص ودرجة الاختبار",
    reviewAnswers: "مراجعة تفاصيل الحلول",
    retakeExam: "خوض اختبار جديد",
    savedTitle: "الأسئلة المحفوظة في المفضلة",
    savedDesc: "راجع وتمرن على الأسئلة التي قمت بحفظها للمراجعة المركزة.",
    noSaved: "لا توجد أسئلة محفوظة حتى الآن. انقر على أيقونة النجمة بجانب أي سؤال لإضافته هنا.",
    noResults: "لم يتم العثور على أي أسئلة مطابقة للبحث.",
    copyCode: "نسخ الكود",
    copied: "تم النسخ!",
    countdownExpired: "منتهي",
    codeSnippet: "مقطع برمجي",
    quizCompleteTitle: "تم إكمال الاختبار التدريبي بنجاح!",
    takeNewQuiz: "خوض اختبار تدريبي جديد",
    quizScore: "الدرجة",
    quizFinish: "إنهاء الاختبار",
    examUntimed: "بدون توقيت"
  }
};

// 2. Application State
const STATE = {
  lang: localStorage.getItem('ise291_lang') || 'en',
  theme: localStorage.getItem('ise291_theme') || 'dark',
  activeTab: 'explorer',
  allQuestions: window.QUESTION_BANK || [],
  filteredQuestions: [],
  renderedCount: 20,
  pageSize: 20,
  
  // Filters
  filterTopic: 'all',
  filterFile: 'all',
  filterStatus: 'all',
  searchQuery: '',
  
  // User Progress Store
  userAnswers: JSON.parse(localStorage.getItem('ise291_answers') || '{}'),
  bookmarks: new Set(JSON.parse(localStorage.getItem('ise291_bookmarks') || '[]')),
  
  // Quiz Mode State
  quizIndex: 0,
  quizList: [],
  
  // Exam Simulator State
  examState: {
    active: false,
    questions: [],
    currentIndex: 0,
    answers: {},
    flagged: new Set(),
    timerSeconds: 45 * 60,
    timerInterval: null
  },

  // Service Expiration (Wednesday, October 14, 2026, 9:00 PM AST = 21:00:00 GMT+0300)
  expirationTime: new Date("2026-10-14T21:00:00+03:00").getTime()
};

let expirationInterval = null;

// 3. Expiration Guard & Always-On Countdown
function checkExpiration() {
  const now = Date.now();
  const diff = STATE.expirationTime - now;

  if (diff <= 0) {
    if (expirationInterval) {
      clearInterval(expirationInterval);
      expirationInterval = null;
    }
    const shutdownScreen = document.getElementById('shutdown-screen');
    if (shutdownScreen) {
      shutdownScreen.classList.remove('hidden');
    }
    document.body.innerHTML = '';
    if (shutdownScreen) {
      document.body.appendChild(shutdownScreen);
    }
    STATE.allQuestions = [];
    STATE.filteredQuestions = [];
    window.QUESTION_BANK = null;
    return true;
  }

  // Format countdown
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const timerEl = document.getElementById('countdown-timer');
  if (timerEl) {
    timerEl.textContent = `${hours}h ${mins}m ${secs}s`;
  }
  return false;
}

// 4. Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Check Expiration First
  if (checkExpiration()) return;
  expirationInterval = setInterval(checkExpiration, 1000);

  // Apply saved theme and language
  applyTheme(STATE.theme);
  applyLanguage(STATE.lang);

  // Initialize Questions
  STATE.filteredQuestions = [...STATE.allQuestions];
  applyFiltersAndSearch();

  // Bind UI Events
  bindNavigation();
  bindFilters();
  bindSearch();
  bindAccordions();
  bindThemeLangToggles();
  bindExamSimulator();
  bindPracticeQuiz();
  bindLightbox();
});

// 5. Language & Theme Application
function applyTheme(theme) {
  STATE.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('ise291_theme', theme);

  const icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'dark') {
      icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    } else {
      icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    }
  }
}

function applyLanguage(lang) {
  STATE.lang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('ise291_lang', lang);

  const dict = STRINGS[lang];
  const langTag = document.getElementById('lang-indicator');
  if (langTag) langTag.textContent = lang === 'ar' ? 'English' : 'العربية';

  // Update DOM text elements
  setText('banner-text', dict.bannerText);
  setText('lbl-subtitle', dict.subtitle);
  setText('lbl-tab-explorer', dict.tabExplorer);
  setText('lbl-tab-quiz', dict.tabQuiz);
  setText('lbl-tab-exam', dict.tabExam);
  setText('lbl-stat-total', dict.statTotal);
  setText('lbl-stat-answered', dict.statAnswered);
  setText('lbl-stat-accuracy', dict.statAccuracy);
  setText('lbl-stat-bookmarked', dict.statBookmarked);
  setText('lbl-filter-topic', dict.filterTopic);
  setText('lbl-filter-file', dict.filterFile);
  setText('lbl-reveal-all', dict.revealAll);
  setText('lbl-shuffle', dict.shuffle);
  setText('lbl-reset', dict.reset);
  setText('btn-load-more', dict.loadMore);

  // Status pills
  setText('btn-status-all', dict.allStatus);
  setText('btn-status-unanswered', dict.unanswered);
  setText('btn-status-correct', dict.correct);
  setText('btn-status-incorrect', dict.incorrect);

  // Exam simulator
  setText('lbl-exam-title', dict.examTitle);
  setText('lbl-exam-desc', dict.examDesc);
  setText('lbl-exam-qcount', dict.examQCount);
  setText('lbl-exam-time', dict.examTime);
  setText('btn-start-exam', dict.startExam);
  setText('btn-finish-exam', dict.submitExam);
  setText('btn-exam-prev', dict.prevBtn);
  setText('btn-exam-next', dict.nextBtn);
  setText('btn-exam-flag', dict.flagBtn);
  setText('lbl-results-title', dict.resultsTitle);
  setText('btn-exam-review', dict.reviewAnswers);
  setText('btn-exam-retake', dict.retakeExam);

  // Saved tab
  setText('lbl-saved-title', dict.savedTitle);
  setText('lbl-saved-desc', dict.savedDesc);
  const tabSavedEl = document.getElementById('lbl-tab-saved');
  if (tabSavedEl) {
    tabSavedEl.innerHTML = `${dict.tabSaved} (<span id="saved-count">${STATE.bookmarks.size}</span>)`;
  }

  // Quiz Mode
  setText('btn-quiz-prev', dict.prevBtn);
  setText('lbl-quiz-complete-title', dict.quizCompleteTitle);
  setText('btn-quiz-retake', dict.takeNewQuiz);

  const inputSearch = document.getElementById('input-search');
  if (inputSearch) inputSearch.placeholder = dict.searchPlaceholder;

  updateStatsRibbon();

  // Re-render current active view to refresh button strings
  if (STATE.activeTab === 'explorer') {
    renderQuestionsStream();
  } else if (STATE.activeTab === 'saved') {
    renderSavedView();
  } else if (STATE.activeTab === 'quiz') {
    renderCurrentQuizQuestion();
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// 6. Navigation Tabs
function bindNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetView = tab.getAttribute('data-tab');
      STATE.activeTab = targetView;

      document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
      const activeSection = document.getElementById(`view-${targetView}`);
      if (activeSection) activeSection.classList.add('active');

      if (targetView === 'saved') {
        renderSavedView();
      } else if (targetView === 'quiz') {
        initQuizView();
      }
    });
  });
}

// 7. Accordion Toggle Logic (RTL & LTR Mirroring Compliant)
function bindAccordions() {
  const accordions = [
    { toggle: 'toggle-topics-filter', panel: 'panel-topics' },
    { toggle: 'toggle-files-filter', panel: 'panel-files' }
  ];

  accordions.forEach(item => {
    const btn = document.getElementById(item.toggle);
    const panel = document.getElementById(item.panel);
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.add('collapsed');
        panel.classList.remove('open');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.remove('collapsed');
        panel.classList.add('open');
      }
    });
  });
}

// 8. Filters & Search Engine
function bindFilters() {
  // Topic Pills
  document.querySelectorAll('#topic-pills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#topic-pills .filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.filterTopic = btn.getAttribute('data-topic');
      STATE.renderedCount = STATE.pageSize;
      applyFiltersAndSearch();
    });
  });

  // Source File Pills
  document.querySelectorAll('#file-pills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#file-pills .filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.filterFile = btn.getAttribute('data-file');
      STATE.renderedCount = STATE.pageSize;
      applyFiltersAndSearch();
    });
  });

  // Status Filter Pills
  document.querySelectorAll('.status-pills .status-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-pills .status-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.filterStatus = btn.getAttribute('data-status');
      STATE.renderedCount = STATE.pageSize;
      applyFiltersAndSearch();
    });
  });

  // Action Buttons
  const btnLoadMore = document.getElementById('btn-load-more');
  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      STATE.renderedCount += STATE.pageSize;
      renderQuestionsStream();
    });
  }

  const btnRevealAll = document.getElementById('btn-reveal-all');
  if (btnRevealAll) {
    btnRevealAll.addEventListener('click', () => {
      document.querySelectorAll('.q-explanation').forEach(exp => exp.classList.add('visible'));
    });
  }

  const btnShuffle = document.getElementById('btn-shuffle');
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      STATE.filteredQuestions.sort(() => Math.random() - 0.5);
      renderQuestionsStream();
    });
  }

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your saved answers and scores?')) {
        STATE.userAnswers = {};
        localStorage.removeItem('ise291_answers');
        applyFiltersAndSearch();
      }
    });
  }
}

function bindSearch() {
  const searchInput = document.getElementById('input-search');
  const clearBtn = document.getElementById('btn-clear-search');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    STATE.searchQuery = e.target.value.trim().toLowerCase();
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', STATE.searchQuery.length === 0);
    }
    STATE.renderedCount = STATE.pageSize;
    applyFiltersAndSearch();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      STATE.searchQuery = '';
      clearBtn.classList.add('hidden');
      applyFiltersAndSearch();
    });
  }
}

function applyFiltersAndSearch() {
  STATE.filteredQuestions = STATE.allQuestions.filter(q => {
    // Topic filter
    if (STATE.filterTopic !== 'all' && q.topic !== STATE.filterTopic) return false;

    // Source File filter
    if (STATE.filterFile !== 'all' && q.sourceFile !== STATE.filterFile) return false;

    // Status filter
    const ans = STATE.userAnswers[q.id];
    if (STATE.filterStatus === 'unanswered' && ans) return false;
    if (STATE.filterStatus === 'correct' && (!ans || ans !== q.correctAnswer)) return false;
    if (STATE.filterStatus === 'incorrect' && (!ans || ans === q.correctAnswer)) return false;

    // Search query
    if (STATE.searchQuery) {
      const qText = (q.questionText || '').toLowerCase();
      const code = (q.code || '').toLowerCase();
      const topic = (q.topic || '').toLowerCase();
      const opts = (q.options || []).map(o => o.text.toLowerCase()).join(' ');
      if (!qText.includes(STATE.searchQuery) && !code.includes(STATE.searchQuery) && !topic.includes(STATE.searchQuery) && !opts.includes(STATE.searchQuery)) {
        return false;
      }
    }

    return true;
  });

  updateStatsRibbon();
  renderQuestionsStream();
}

function updateStatsRibbon() {
  const total = STATE.allQuestions.length;
  const answeredCount = Object.keys(STATE.userAnswers).length;
  let correctCount = 0;

  // Optimized O(N) lookup Map
  const qMap = new Map(STATE.allQuestions.map(q => [q.id, q]));
  for (const [qid, ans] of Object.entries(STATE.userAnswers)) {
    const q = qMap.get(qid);
    if (q && q.correctAnswer === ans) {
      correctCount++;
    }
  }

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  setText('stat-total', total);
  setText('stat-answered', answeredCount);
  setText('stat-accuracy', `${accuracy}%`);
  setText('stat-bookmarked', STATE.bookmarks.size);
  setText('saved-count', STATE.bookmarks.size);
}

// 9. Question Cards Rendering
function renderQuestionsStream() {
  const container = document.getElementById('questions-stream');
  const footer = document.getElementById('pagination-footer');
  if (!container) return;

  container.innerHTML = '';

  if (STATE.filteredQuestions.length === 0) {
    container.innerHTML = `
      <div class="stat-card" style="padding: 40px; text-align: center;">
        <p style="color: var(--text-muted);">${STRINGS[STATE.lang].noResults}</p>
      </div>
    `;
    if (footer) footer.classList.add('hidden');
    return;
  }

  const questionsToShow = STATE.filteredQuestions.slice(0, STATE.renderedCount);
  questionsToShow.forEach((q, index) => {
    container.appendChild(createQuestionCard(q, index + 1));
  });

  if (footer) {
    footer.classList.toggle('hidden', STATE.renderedCount >= STATE.filteredQuestions.length);
  }
}

function createQuestionCard(q, displayNum) {
  const card = document.createElement('div');
  card.className = 'q-card';
  card.id = `card-${q.id}`;

  const isBookmarked = STATE.bookmarks.has(q.id);
  const userAnswer = STATE.userAnswers[q.id];

  // Header
  const header = document.createElement('div');
  header.className = 'q-header';
  header.innerHTML = `
    <div class="q-badges">
      <span class="q-badge-id">#${displayNum || q.id}</span>
      <span class="q-badge-topic">${q.topic}</span>
      <span class="q-badge-source">${q.sourceFile}</span>
    </div>
    <div class="q-actions">
      <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-id="${q.id}" title="Bookmark Question">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>
    </div>
  `;

  // Statement
  const title = document.createElement('div');
  title.className = 'q-title';
  title.textContent = q.questionText;

  card.appendChild(header);
  card.appendChild(title);

  // Code Block
  if (q.code && q.code.trim()) {
    const codeContainer = document.createElement('div');
    codeContainer.className = 'q-code-container';
    codeContainer.innerHTML = `
      <div class="q-code-header">
        <span>${STRINGS[STATE.lang].codeSnippet}</span>
        <button class="btn-sm btn-ghost btn-copy" data-code="${escapeHtml(q.code)}">${STRINGS[STATE.lang].copyCode}</button>
      </div>
      <pre class="q-code-block"><code>${escapeHtml(q.code)}</code></pre>
    `;
    card.appendChild(codeContainer);
  }

  // Diagram / Image
  if (q.images && q.images.length > 0) {
    q.images.forEach(imgSrc => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'q-image-container';
      imgContainer.innerHTML = `<img src="${imgSrc}" class="q-img" alt="Question Diagram" />`;
      card.appendChild(imgContainer);
    });
  }

  // Options
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'q-options';

  q.options.forEach(opt => {
    const optEl = document.createElement('div');
    optEl.className = 'opt-item';
    optEl.setAttribute('data-qid', q.id);
    optEl.setAttribute('data-key', opt.key);

    if (userAnswer) {
      if (opt.key === userAnswer) {
        optEl.classList.add('selected');
        if (opt.key === q.correctAnswer) {
          optEl.classList.add('is-correct');
        } else {
          optEl.classList.add('is-incorrect');
        }
      } else if (opt.key === q.correctAnswer) {
        optEl.classList.add('is-correct');
      }
    }

    optEl.innerHTML = `
      <div class="opt-key">${opt.key}</div>
      <div class="opt-text">${opt.text}</div>
    `;

    optEl.addEventListener('click', () => handleOptionSelect(q, opt.key, card));
    optionsContainer.appendChild(optEl);
  });
  card.appendChild(optionsContainer);

  // Solution Box
  const expBox = document.createElement('div');
  expBox.className = `q-explanation ${userAnswer ? 'visible' : ''}`;
  expBox.innerHTML = `
    <div class="exp-header">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${STRINGS[STATE.lang].solutionLabel}: (${q.correctAnswer})</span>
    </div>
    <div class="exp-text">${q.explanation || 'Verified with ISE 291 course materials.'}</div>
  `;
  card.appendChild(expBox);

  // Card Footer
  const footer = document.createElement('div');
  footer.className = 'q-footer';
  footer.innerHTML = `
    <button class="btn-reveal" data-qid="${q.id}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      <span>${userAnswer ? STRINGS[STATE.lang].hideSolution : STRINGS[STATE.lang].revealSolution}</span>
    </button>
  `;
  card.appendChild(footer);

  // Event Listeners for Bookmark & Reveal
  const bookmarkBtn = header.querySelector('.btn-bookmark');
  bookmarkBtn.addEventListener('click', () => toggleBookmark(q.id, bookmarkBtn));

  const revealBtn = footer.querySelector('.btn-reveal');
  revealBtn.addEventListener('click', () => {
    expBox.classList.toggle('visible');
    const isVis = expBox.classList.contains('visible');
    revealBtn.querySelector('span').textContent = isVis ? STRINGS[STATE.lang].hideSolution : STRINGS[STATE.lang].revealSolution;
  });

  const copyBtn = card.querySelector('.btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(q.code).catch(() => {});
      copyBtn.textContent = STRINGS[STATE.lang].copied;
      setTimeout(() => copyBtn.textContent = STRINGS[STATE.lang].copyCode, 2000);
    });
  }

  return card;
}

function handleOptionSelect(q, selectedKey, card) {
  STATE.userAnswers[q.id] = selectedKey;
  localStorage.setItem('ise291_answers', JSON.stringify(STATE.userAnswers));

  const optItems = card.querySelectorAll('.opt-item');
  optItems.forEach(item => {
    item.classList.remove('selected', 'is-correct', 'is-incorrect');
    const k = item.getAttribute('data-key');
    if (k === selectedKey) {
      item.classList.add('selected');
      if (k === q.correctAnswer) {
        item.classList.add('is-correct');
      } else {
        item.classList.add('is-incorrect');
      }
    } else if (k === q.correctAnswer) {
      item.classList.add('is-correct');
    }
  });

  // Reveal explanation automatically upon answering
  const expBox = card.querySelector('.q-explanation');
  if (expBox) {
    expBox.classList.add('visible');
    const revealBtnSpan = card.querySelector('.btn-reveal span');
    if (revealBtnSpan) revealBtnSpan.textContent = STRINGS[STATE.lang].hideSolution;
  }

  updateStatsRibbon();

  // If in quiz mode, update live quiz score
  if (STATE.activeTab === 'quiz') {
    updateQuizLiveScore();
  }
}

function toggleBookmark(qid, btn) {
  if (STATE.bookmarks.has(qid)) {
    STATE.bookmarks.delete(qid);
    btn.classList.remove('bookmarked');
    btn.querySelector('svg').setAttribute('fill', 'none');
  } else {
    STATE.bookmarks.add(qid);
    btn.classList.add('bookmarked');
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
  }

  localStorage.setItem('ise291_bookmarks', JSON.stringify([...STATE.bookmarks]));
  updateStatsRibbon();
}

// 10. Saved / Bookmarks View
function renderSavedView() {
  const container = document.getElementById('saved-stream');
  if (!container) return;

  container.innerHTML = '';
  const savedQuestions = STATE.allQuestions.filter(q => STATE.bookmarks.has(q.id));

  if (savedQuestions.length === 0) {
    container.innerHTML = `
      <div class="stat-card" style="padding: 40px; text-align: center;">
        <p style="color: var(--text-muted);">${STRINGS[STATE.lang].noSaved}</p>
      </div>
    `;
    return;
  }

  savedQuestions.forEach((q, idx) => {
    container.appendChild(createQuestionCard(q, idx + 1));
  });
}

// 11. Practice Quiz Mode
function bindPracticeQuiz() {
  const prevBtn = document.getElementById('btn-quiz-prev');
  const nextBtn = document.getElementById('btn-quiz-next');
  const retakeBtn = document.getElementById('btn-quiz-retake');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (STATE.quizIndex > 0) {
        STATE.quizIndex--;
        renderCurrentQuizQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (STATE.quizIndex < STATE.quizList.length - 1) {
        STATE.quizIndex++;
        renderCurrentQuizQuestion();
      } else {
        // Complete Quiz
        showQuizCompletion();
      }
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      initNewQuiz();
    });
  }
}

function initQuizView() {
  if (STATE.quizList.length === 0) {
    initNewQuiz();
  } else {
    renderCurrentQuizQuestion();
  }
}

function initNewQuiz() {
  const compCard = document.getElementById('quiz-completion-card');
  const qContainer = document.getElementById('quiz-card-container');
  const actionsBar = document.getElementById('quiz-actions-bar');
  if (compCard) compCard.classList.add('hidden');
  if (qContainer) qContainer.classList.remove('hidden');
  if (actionsBar) actionsBar.classList.remove('hidden');

  STATE.quizList = [...STATE.allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
  STATE.quizIndex = 0;
  renderCurrentQuizQuestion();
}

function updateQuizLiveScore() {
  const answeredInQuiz = STATE.quizList.filter(q => STATE.userAnswers[q.id]);
  const correctInQuiz = answeredInQuiz.filter(q => STATE.userAnswers[q.id] === q.correctAnswer);
  setText('quiz-live-score', `${STRINGS[STATE.lang].quizScore}: ${correctInQuiz.length} / ${answeredInQuiz.length}`);
}

function renderCurrentQuizQuestion() {
  const container = document.getElementById('quiz-card-container');
  if (!container || STATE.quizList.length === 0) return;

  container.innerHTML = '';
  const q = STATE.quizList[STATE.quizIndex];
  container.appendChild(createQuestionCard(q, STATE.quizIndex + 1));

  const progressText = document.getElementById('quiz-progress-text');
  const progressBar = document.getElementById('quiz-progress-bar');
  const dict = STRINGS[STATE.lang];

  if (progressText) {
    progressText.textContent = `${dict.tabQuiz} ${STATE.quizIndex + 1} / ${STATE.quizList.length}`;
  }
  if (progressBar) {
    const pct = ((STATE.quizIndex + 1) / STATE.quizList.length) * 100;
    progressBar.style.width = `${pct}%`;
  }

  // Update live score
  updateQuizLiveScore();

  // Button labels and states
  const prevBtn = document.getElementById('btn-quiz-prev');
  const nextBtn = document.getElementById('btn-quiz-next');
  if (prevBtn) {
    prevBtn.disabled = STATE.quizIndex === 0;
    prevBtn.style.opacity = STATE.quizIndex === 0 ? '0.5' : '1';
  }
  if (nextBtn) {
    const isLast = STATE.quizIndex === STATE.quizList.length - 1;
    nextBtn.textContent = isLast ? dict.quizFinish : dict.nextBtn;
  }
}

function showQuizCompletion() {
  const compCard = document.getElementById('quiz-completion-card');
  const qContainer = document.getElementById('quiz-card-container');
  const actionsBar = document.getElementById('quiz-actions-bar');
  if (!compCard) return;

  const answeredInQuiz = STATE.quizList.filter(q => STATE.userAnswers[q.id]);
  const correctInQuiz = answeredInQuiz.filter(q => STATE.userAnswers[q.id] === q.correctAnswer);
  const total = STATE.quizList.length;
  const pct = Math.round((correctInQuiz.length / total) * 100);

  setText('quiz-final-score-pct', `${pct}%`);
  setText('quiz-final-score-fraction', `${correctInQuiz.length} / ${total} Correct`);

  if (qContainer) qContainer.classList.add('hidden');
  if (actionsBar) actionsBar.classList.add('hidden');
  compCard.classList.remove('hidden');
}

// 12. Midterm Exam Simulator
function bindExamSimulator() {
  const startBtn = document.getElementById('btn-start-exam');
  const finishBtn = document.getElementById('btn-finish-exam');
  const prevBtn = document.getElementById('btn-exam-prev');
  const nextBtn = document.getElementById('btn-exam-next');
  const flagBtn = document.getElementById('btn-exam-flag');
  const reviewBtn = document.getElementById('btn-exam-review');
  const retakeBtn = document.getElementById('btn-exam-retake');

  if (startBtn) {
    startBtn.addEventListener('click', startMidtermExam);
  }

  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      if (confirm('Are you ready to submit your exam for grading?')) {
        submitMidtermExam();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (STATE.examState.currentIndex > 0) {
        STATE.examState.currentIndex--;
        renderExamQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (STATE.examState.currentIndex < STATE.examState.questions.length - 1) {
        STATE.examState.currentIndex++;
        renderExamQuestion();
      }
    });
  }

  if (flagBtn) {
    flagBtn.addEventListener('click', () => {
      const currQ = STATE.examState.questions[STATE.examState.currentIndex];
      if (STATE.examState.flagged.has(currQ.id)) {
        STATE.examState.flagged.delete(currQ.id);
      } else {
        STATE.examState.flagged.add(currQ.id);
      }
      renderExamNavGrid();
    });
  }

  if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
      // Switch to topic explorer with exam questions and render user answers
      STATE.filteredQuestions = [...STATE.examState.questions];
      STATE.filterTopic = 'all';
      STATE.filterFile = 'all';
      STATE.filterStatus = 'all';
      const explorerTab = document.querySelector('.nav-tab[data-tab="explorer"]');
      if (explorerTab) explorerTab.click();
      renderQuestionsStream();
    });
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      document.getElementById('exam-results-card').classList.add('hidden');
      document.getElementById('exam-setup-card').classList.remove('hidden');
    });
  }
}

function startMidtermExam() {
  const countSelect = document.getElementById('exam-select-count');
  const timeSelect = document.getElementById('exam-select-time');
  const count = parseInt(countSelect.value, 10) || 30;
  const minutes = parseInt(timeSelect.value, 10) || 45;

  const pool = [...STATE.allQuestions].sort(() => Math.random() - 0.5);
  STATE.examState = {
    active: true,
    questions: pool.slice(0, count),
    currentIndex: 0,
    answers: {},
    flagged: new Set(),
    timerSeconds: minutes * 60,
    timerInterval: null
  };

  document.getElementById('exam-setup-card').classList.add('hidden');
  document.getElementById('exam-results-card').classList.add('hidden');
  document.getElementById('exam-active-card').classList.remove('hidden');

  renderExamNavGrid();
  renderExamQuestion();

  // Start Timer
  if (minutes > 0) {
    startExamTimer();
  } else {
    const timerDisplay = document.getElementById('exam-timer-display');
    if (timerDisplay) timerDisplay.textContent = STRINGS[STATE.lang].examUntimed;
  }
}

function startExamTimer() {
  const timerDisplay = document.getElementById('exam-timer-display');
  clearInterval(STATE.examState.timerInterval);

  STATE.examState.timerInterval = setInterval(() => {
    STATE.examState.timerSeconds--;
    if (STATE.examState.timerSeconds <= 0) {
      clearInterval(STATE.examState.timerInterval);
      alert('Time is up! Submitting exam automatically.');
      submitMidtermExam();
      return;
    }

    const m = Math.floor(STATE.examState.timerSeconds / 60);
    const s = STATE.examState.timerSeconds % 60;
    if (timerDisplay) {
      timerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  }, 1000);
}

function renderExamNavGrid() {
  const grid = document.getElementById('exam-nav-grid');
  if (!grid) return;

  grid.innerHTML = '';
  STATE.examState.questions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'exam-nav-btn';
    btn.textContent = idx + 1;

    if (idx === STATE.examState.currentIndex) btn.classList.add('active');
    if (STATE.examState.answers[q.id]) btn.classList.add('answered');
    if (STATE.examState.flagged.has(q.id)) btn.classList.add('flagged');

    btn.addEventListener('click', () => {
      STATE.examState.currentIndex = idx;
      renderExamQuestion();
    });

    grid.appendChild(btn);
  });
}

function renderExamQuestion() {
  const container = document.getElementById('exam-active-question');
  if (!container) return;

  const q = STATE.examState.questions[STATE.examState.currentIndex];
  const qNum = STATE.examState.currentIndex + 1;
  const currentBadge = document.getElementById('exam-q-current');
  if (currentBadge) currentBadge.textContent = `Question ${qNum} of ${STATE.examState.questions.length}`;

  renderExamNavGrid();

  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'q-card';

  card.innerHTML = `
    <div class="q-header">
      <div class="q-badges">
        <span class="q-badge-id">Q${qNum}</span>
        <span class="q-badge-topic">${q.topic}</span>
      </div>
    </div>
    <div class="q-title">${escapeHtml(q.questionText)}</div>
  `;

  if (q.code && q.code.trim()) {
    const codeEl = document.createElement('div');
    codeEl.className = 'q-code-container';
    codeEl.innerHTML = `<pre class="q-code-block"><code>${escapeHtml(q.code)}</code></pre>`;
    card.appendChild(codeEl);
  }

  if (q.images && q.images.length > 0) {
    q.images.forEach(imgSrc => {
      const imgC = document.createElement('div');
      imgC.className = 'q-image-container';
      imgC.innerHTML = `<img src="${imgSrc}" class="q-img" alt="Diagram" />`;
      card.appendChild(imgC);
    });
  }

  const optsContainer = document.createElement('div');
  optsContainer.className = 'q-options';

  q.options.forEach(opt => {
    const optEl = document.createElement('div');
    optEl.className = 'opt-item';
    if (STATE.examState.answers[q.id] === opt.key) {
      optEl.classList.add('selected');
    }

    optEl.innerHTML = `
      <div class="opt-key">${opt.key}</div>
      <div class="opt-text">${opt.text}</div>
    `;

    optEl.addEventListener('click', () => {
      STATE.examState.answers[q.id] = opt.key;
      optsContainer.querySelectorAll('.opt-item').forEach(i => i.classList.remove('selected'));
      optEl.classList.add('selected');
      renderExamNavGrid();
    });

    optsContainer.appendChild(optEl);
  });

  card.appendChild(optsContainer);
  container.appendChild(card);
}

function submitMidtermExam() {
  clearInterval(STATE.examState.timerInterval);

  let correctCount = 0;
  const topicStats = {};

  STATE.examState.questions.forEach(q => {
    const userAns = STATE.examState.answers[q.id];
    const isCorr = userAns === q.correctAnswer;
    if (isCorr) correctCount++;

    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, correct: 0 };
    }
    topicStats[q.topic].total++;
    if (isCorr) topicStats[q.topic].correct++;
  });

  const total = STATE.examState.questions.length;
  const pct = Math.round((correctCount / total) * 100);

  // Grade calculation
  let grade = 'F';
  if (pct >= 95) grade = 'A+';
  else if (pct >= 90) grade = 'A';
  else if (pct >= 85) grade = 'B+';
  else if (pct >= 80) grade = 'B';
  else if (pct >= 75) grade = 'C+';
  else if (pct >= 70) grade = 'C';
  else if (pct >= 65) grade = 'D+';
  else if (pct >= 60) grade = 'D';

  // Merge exam answers into userAnswers so Review Detailed Answers displays them properly
  Object.assign(STATE.userAnswers, STATE.examState.answers);
  localStorage.setItem('ise291_answers', JSON.stringify(STATE.userAnswers));
  updateStatsRibbon();

  document.getElementById('exam-active-card').classList.add('hidden');
  document.getElementById('exam-results-card').classList.remove('hidden');

  const gradeBadge = document.getElementById('results-grade-badge');
  if (gradeBadge) gradeBadge.textContent = grade;

  setText('results-score-pct', `${pct}%`);
  setText('results-score-fraction', `${correctCount} / ${total} Correct`);

  const breakdownContainer = document.getElementById('results-topics-list');
  if (breakdownContainer) {
    breakdownContainer.innerHTML = '';
    for (const [topic, s] of Object.entries(topicStats)) {
      const topicPct = Math.round((s.correct / s.total) * 100);
      const row = document.createElement('div');
      row.className = 'res-topic-row';
      row.innerHTML = `
        <span class="res-topic-name">${topic}</span>
        <span class="res-topic-score">${s.correct} / ${s.total} (${topicPct}%)</span>
      `;
      breakdownContainer.appendChild(row);
    }
  }
}

// 13. Image Lightbox
function bindLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg) return;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('q-img')) {
      modalImg.src = e.target.src;
      modal.classList.remove('hidden');
    }
  });

  const closeModal = () => modal.classList.add('hidden');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.querySelector('.lightbox-backdrop').addEventListener('click', closeModal);
}

// 14. Theme & Language Toggle Buttons
function bindThemeLangToggles() {
  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = STATE.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = STATE.lang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
    });
  }
}

// Utilities
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
