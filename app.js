// ISE 291 Interactive Question Bank
// Version 2.1 - Minimalist Collapsible Sidebar & Mandatory Account Gate

// 1. Internationalization Dictionaries (100% Key Parity Required)
const STRINGS = {
  en: {
    bannerText: "⏱️ Active until Wednesday Oct 14, 2026, 9:00 PM AST",
    subtitle: "Question Bank",
    tabExplorer: "Topics & Questions",
    tabQuiz: "Practice Quiz",
    tabExam: "Midterm Simulator",
    tabSaved: "Saved",
    tabProgress: "Friends & Progress",
    statTotal: "Total Questions",
    statAnswered: "Answered",
    statAccuracy: "Accuracy",
    statBookmarked: "Bookmarked",
    filterTopic: "Filter by Syllabus Topic",
    filterFile: "Source Files",
    searchPlaceholder: "Search questions...",
    allTopics: "All Topics",
    allFiles: "All Files",
    allStatus: "All",
    unanswered: "Unanswered",
    correct: "Correct",
    incorrect: "Incorrect",
    revealAll: "Reveal",
    shuffle: "Shuffle",
    reset: "Reset",
    loadMore: "Load More Questions",
    revealSolution: "Show Solution",
    hideSolution: "Hide Solution",
    solutionLabel: "Verified Solution",
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
    noSaved: "No saved questions yet. Click the star icon on any question to bookmark it.",
    noResults: "No questions match your current search or filters.",
    copyCode: "Copy",
    copied: "Copied!",
    countdownExpired: "Expired",
    codeSnippet: "Python",
    quizCompleteTitle: "Practice Quiz Completed!",
    takeNewQuiz: "Take New Quiz",
    quizScore: "Score",
    quizFinish: "Finish Quiz",
    examUntimed: "No Time Limit",
    wrapCode: "Wrap",
    unwrapCode: "No Wrap",
    authTitle: "Account Required",
    authSubtitle: "Account required. Sign in or create an account to access the question bank.",
    authSignIn: "Sign In",
    authSignUp: "Create Account",
    authWarning: "Notice: Once you create your account, it cannot be deleted.",
    authUsername: "Username",
    authPassword: "Password",
    authLogout: "Log Out",
    authGuest: "User",
    friendsTitle: "Friends & Classmates Progress",
    friendsDesc: "Click on any friend to inspect their detailed topic breakdown and question history.",
    searchFriends: "Search friends by username...",
    inspectProgress: "Inspect Details",
    refreshBtn: "Refresh",
    lastActive: "Last active",
    topicMastery: "Topic Mastery",
    recentHistory: "Recent Question History",
    solvedOf: "Questions Solved",
    sidebarFilters: "Filters & Search",
    authRequired: "Please sign in or create an account to view questions."
  },
  ar: {
    bannerText: "⏱️ نشط حتى الأربعاء 14 أكتوبر 2026، 9:00 مساءً بتوقيت مكة المكرمة",
    subtitle: "بنك الأسئلة",
    tabExplorer: "المواضيع والأسئلة",
    tabQuiz: "اختبار تدريبي",
    tabExam: "محاكي الميدتيرم",
    tabSaved: "المحفوظات",
    tabProgress: "تقدم الزملاء",
    statTotal: "إجمالي الأسئلة",
    statAnswered: "تم حلها",
    statAccuracy: "الدقة",
    statBookmarked: "المفضلة",
    filterTopic: "تصفية حسب مواضيع المنهج",
    filterFile: "الملفات المصدرية",
    searchPlaceholder: "البحث في الأسئلة...",
    allTopics: "جميع المواضيع",
    allFiles: "جميع الملفات",
    allStatus: "الكل",
    unanswered: "غير محلول",
    correct: "صحيح",
    incorrect: "غير صحيح",
    revealAll: "إظهار",
    shuffle: "خلط",
    reset: "إعادة ضبط",
    loadMore: "تحميل المزيد من الأسئلة",
    revealSolution: "عرض الحل والشرح",
    hideSolution: "إخفاء الحل والشرح",
    solutionLabel: "الحل المعتمد",
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
    copyCode: "نسخ",
    copied: "تم النسخ!",
    countdownExpired: "منتهي",
    codeSnippet: "بايثون",
    quizCompleteTitle: "تم إكمال الاختبار التدريبي بنجاح!",
    takeNewQuiz: "خوض اختبار تدريبي جديد",
    quizScore: "الدرجة",
    quizFinish: "إنهاء الاختبار",
    examUntimed: "بدون توقيت",
    wrapCode: "التفاف",
    unwrapCode: "بدون التفاف",
    authTitle: "تسجيل الدخول مطلوب",
    authSubtitle: "إنشاء حساب مطلوب للوصول إلى بنك الأسئلة والتدريبات.",
    authSignIn: "تسجيل الدخول",
    authSignUp: "إنشاء حساب جديد",
    authWarning: "تنبيه: بمجرد إنشاء الحساب، لا يمكن حذفه.",
    authUsername: "اسم المستخدم",
    authPassword: "كلمة المرور",
    authLogout: "تسجيل الخروج",
    authGuest: "مستخدم",
    friendsTitle: "تقدم الزملاء والأصدقاء",
    friendsDesc: "انقر على أي زميل لعرض تفاصيل إتقانه للمواضيع وتاريخ حله للأسئلة.",
    searchFriends: "البحث عن صديق باسم المستخدم...",
    inspectProgress: "عرض التفاصيل",
    refreshBtn: "تحديث",
    lastActive: "آخر نشاط",
    topicMastery: "إتقان المواضيع",
    recentHistory: "سجل الأسئلة الأخيرة",
    solvedOf: "الأسئلة المحلولة",
    sidebarFilters: "البحث والتصفية",
    authRequired: "يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى بنك الأسئلة."
  }
};

// 2. Constants & Endpoints
const KV_BASE = 'https://kvdb.io/Vc3nLuNA8mMdWRX5VSH33j/';
const SYLLABUS_TOPICS = [
  { id: "Topic 1: Introduction to Data Science", nameEn: "T1: Intro to Data Science", nameAr: "م1: مقدمة علم البيانات", count: 2 },
  { id: "Topic 2: Python Review", nameEn: "T2: Python Review", nameAr: "م2: مراجعة بايثون", count: 54 },
  { id: "Topic 3: Basic Statistics", nameEn: "T3: Basic Statistics", nameAr: "م3: الإحصاء الأساسي", count: 59 },
  { id: "Topic 4: Structured Data and Visualization", nameEn: "T4: Structured Data & Viz", nameAr: "م4: البيانات والتمثيل البياني", count: 70 },
  { id: "Topic 5: Data Understanding and Preparation", nameEn: "T5: Data Understanding & Prep", nameAr: "م5: فهم وتجهيز البيانات", count: 68 }
];

const SOURCE_FILES = [
  "Mid exam v important questions.pdf",
  "Sample Mid .pdf",
  "Topic 4 and 5.pdf",
  "Quiz_2.docx",
  "Sol-Practice Questions Topic2.docx",
  "Sol-Practice Questions Topic3.docx",
  "Topic 4 practice questions.pdf",
  "Sol-Practice Questions Topic5.docx"
];

// 3. Application State
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
  
  // User Session & Progress Store (Mandatory Auth)
  currentUser: JSON.parse(localStorage.getItem('ise291_user') || 'null'),
  userAnswers: JSON.parse(localStorage.getItem('ise291_answers') || '{}'),
  bookmarks: new Set(JSON.parse(localStorage.getItem('ise291_bookmarks') || '[]')),
  examsTaken: JSON.parse(localStorage.getItem('ise291_exams') || '[]'),
  friendsDirectory: [],
  
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
let cloudSyncTimeout = null;

// 4. Expiration Guard & Countdown
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

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const timerEl = document.getElementById('countdown-timer');
  if (timerEl) {
    timerEl.textContent = `⏱️ ${hours}h ${mins}m ${secs}s`;
  }
  return false;
}

// 5. Cloud Storage & User Sync Engine
async function apiGet(key) {
  try {
    const res = await fetch(KV_BASE + encodeURIComponent(key), { cache: 'no-cache' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function apiPost(key, data) {
  try {
    await fetch(KV_BASE + encodeURIComponent(key), {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return true;
  } catch (e) {
    return false;
  }
}

function scheduleCloudSync() {
  if (cloudSyncTimeout) clearTimeout(cloudSyncTimeout);
  cloudSyncTimeout = setTimeout(syncUserProgressToCloud, 1200);
}

async function syncUserProgressToCloud() {
  if (!STATE.currentUser) return;
  const username = STATE.currentUser.username;
  
  const totalAnswered = Object.keys(STATE.userAnswers).length;
  let correctCount = 0;
  const qMap = new Map(STATE.allQuestions.map(q => [q.id, q]));
  for (const [qid, ans] of Object.entries(STATE.userAnswers)) {
    const q = qMap.get(qid);
    if (q && q.correctAnswer === ans) correctCount++;
  }
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const userData = {
    username: username,
    password: STATE.currentUser.password,
    answers: STATE.userAnswers,
    bookmarks: Array.from(STATE.bookmarks),
    exams: STATE.examsTaken,
    totalAnswered: totalAnswered,
    correctCount: correctCount,
    accuracy: accuracy,
    lastActive: Date.now()
  };

  await apiPost('u_' + username, userData);

  let dir = await apiGet('ise_dir');
  if (!Array.isArray(dir)) dir = [];
  const idx = dir.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
  const summary = {
    username: username,
    totalAnswered: totalAnswered,
    accuracy: accuracy,
    examsCount: STATE.examsTaken.length,
    lastActive: Date.now()
  };
  if (idx >= 0) {
    dir[idx] = summary;
  } else {
    dir.push(summary);
  }
  await apiPost('ise_dir', dir);
}

// 6. Application Initialization & Auth Gatekeeper
document.addEventListener('DOMContentLoaded', () => {
  if (checkExpiration()) return;
  expirationInterval = setInterval(checkExpiration, 1000);

  applyTheme(STATE.theme);
  applyLanguage(STATE.lang);

  bindAuthGate();
  bindSidebar();
  bindQuizMode();
  bindExamSimulator();
  bindLightbox();

  // Check if user is logged in
  if (STATE.currentUser) {
    unlockApp();
  } else {
    showAuthGate();
  }
});

function showAuthGate() {
  const gate = document.getElementById('auth-gate');
  const app = document.getElementById('app-wrapper');
  if (gate) gate.classList.remove('hidden');
  if (app) app.classList.add('hidden');
}

function unlockApp() {
  const gate = document.getElementById('auth-gate');
  const app = document.getElementById('app-wrapper');
  if (gate) gate.classList.add('hidden');
  if (app) app.classList.remove('hidden');

  updateSidebarUserInfo();
  renderSidebarTopics();
  renderSidebarFiles();
  applyFiltersAndSearch();
  updateMyProgressSection();
}

function bindAuthGate() {
  const tabLogin = document.getElementById('btn-gate-tab-login');
  const tabSignup = document.getElementById('btn-gate-tab-signup');
  const warningBanner = document.getElementById('gate-signup-warning');
  const btnSubmit = document.getElementById('btn-gate-submit');
  const form = document.getElementById('gate-auth-form');
  const btnLang = document.getElementById('btn-gate-lang');

  let mode = 'login';

  function setMode(newMode) {
    mode = newMode;
    tabLogin.classList.toggle('active', mode === 'login');
    tabSignup.classList.toggle('active', mode === 'signup');
    warningBanner.style.display = mode === 'signup' ? 'flex' : 'none';
    btnSubmit.textContent = mode === 'login' ? STRINGS[STATE.lang].authSignIn : STRINGS[STATE.lang].authSignUp;
    hideGateMsg();
  }

  tabLogin.addEventListener('click', () => setMode('login'));
  tabSignup.addEventListener('click', () => setMode('signup'));

  if (btnLang) {
    btnLang.addEventListener('click', () => {
      const nextLang = STATE.lang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
      btnLang.textContent = nextLang === 'en' ? 'العربية' : 'English';
      btnSubmit.textContent = mode === 'login' ? STRINGS[nextLang].authSignIn : STRINGS[nextLang].authSignUp;
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('gate-input-username').value.trim();
    const password = document.getElementById('gate-input-password').value;

    if (!username || !password) {
      showGateMsg('Please enter both username and password.', 'error');
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Processing...';

    if (mode === 'signup') {
      const existing = await apiGet('u_' + username);
      if (existing) {
        showGateMsg('Username already taken. Please choose another.', 'error');
        btnSubmit.disabled = false;
        btnSubmit.textContent = STRINGS[STATE.lang].authSignUp;
        return;
      }

      STATE.currentUser = { username, password };
      localStorage.setItem('ise291_user', JSON.stringify(STATE.currentUser));
      await syncUserProgressToCloud();
      showGateMsg('Account created successfully! Entering...', 'success');
      setTimeout(() => {
        unlockApp();
      }, 500);

    } else {
      const userData = await apiGet('u_' + username);
      if (!userData) {
        showGateMsg('Account not found. Please click "Create Account".', 'error');
        btnSubmit.disabled = false;
        btnSubmit.textContent = STRINGS[STATE.lang].authSignIn;
        return;
      }

      if (userData.password !== password) {
        showGateMsg('Incorrect password.', 'error');
        btnSubmit.disabled = false;
        btnSubmit.textContent = STRINGS[STATE.lang].authSignIn;
        return;
      }

      STATE.currentUser = { username, password };
      localStorage.setItem('ise291_user', JSON.stringify(STATE.currentUser));

      if (userData.answers) {
        STATE.userAnswers = { ...STATE.userAnswers, ...userData.answers };
        localStorage.setItem('ise291_answers', JSON.stringify(STATE.userAnswers));
      }
      if (userData.bookmarks) {
        userData.bookmarks.forEach(b => STATE.bookmarks.add(b));
        localStorage.setItem('ise291_bookmarks', JSON.stringify(Array.from(STATE.bookmarks)));
      }
      if (userData.exams) {
        STATE.examsTaken = userData.exams;
        localStorage.setItem('ise291_exams', JSON.stringify(STATE.examsTaken));
      }

      showGateMsg('Welcome back, ' + username + '!', 'success');
      setTimeout(() => {
        unlockApp();
      }, 400);
    }

    btnSubmit.disabled = false;
  });
}

function showGateMsg(msg, type) {
  const el = document.getElementById('gate-msg');
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-msg ${type}`;
  el.classList.remove('hidden');
}

function hideGateMsg() {
  const el = document.getElementById('gate-msg');
  if (el) el.classList.add('hidden');
}

// 7. Collapsible Sidebar & Navigation
function bindSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const btnCollapse = document.getElementById('btn-sidebar-collapse');
  const btnOpen = document.getElementById('btn-sidebar-open');
  const btnLogout = document.getElementById('btn-sidebar-logout');

  // Toggle Collapse on Desktop and Mobile
  btnCollapse.addEventListener('click', () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });

  btnOpen.addEventListener('click', () => {
    if (window.innerWidth <= 860) {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('collapsed');
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    });
  }

  // Navigation Items
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
      if (window.innerWidth <= 860) {
        sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      }
    });
  });

  // Accordion Toggle for Files inside Sidebar
  const fileAccordionBtn = document.getElementById('toggle-files-filter');
  if (fileAccordionBtn) {
    fileAccordionBtn.addEventListener('click', () => {
      const isExp = fileAccordionBtn.getAttribute('aria-expanded') === 'true';
      fileAccordionBtn.setAttribute('aria-expanded', !isExp);
      fileAccordionBtn.classList.toggle('collapsed', isExp);
      document.getElementById('panel-files').classList.toggle('open', !isExp);
    });
  }

  // Status Filter in Sidebar
  document.querySelectorAll('.sidebar-status-group .status-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-status-group .status-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.filterStatus = btn.getAttribute('data-status');
      STATE.renderedCount = STATE.pageSize;
      applyFiltersAndSearch();
    });
  });

  // Search input in Sidebar
  const searchInput = document.getElementById('input-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value.trim().toLowerCase();
      STATE.renderedCount = STATE.pageSize;
      applyFiltersAndSearch();
    });
  }

  // Quick Action Buttons
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
        scheduleCloudSync();
        updateSidebarUserInfo();
        applyFiltersAndSearch();
      }
    });
  }

  // Language & Theme Toggles in Sidebar Footer
  const btnLang = document.getElementById('btn-lang');
  if (btnLang) {
    btnLang.addEventListener('click', () => {
      const nextLang = STATE.lang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
    });
  }

  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const nextTheme = STATE.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Log out of this session?')) {
        STATE.currentUser = null;
        localStorage.removeItem('ise291_user');
        showAuthGate();
      }
    });
  }

  // Friends search & refresh
  const inputSearchFriends = document.getElementById('input-search-friends');
  if (inputSearchFriends) {
    inputSearchFriends.addEventListener('input', (e) => renderFriendsDirectory(e.target.value));
  }

  const btnRefreshProgress = document.getElementById('btn-refresh-progress');
  if (btnRefreshProgress) {
    btnRefreshProgress.addEventListener('click', loadFriendsDirectory);
  }

  const btnLoadMore = document.getElementById('btn-load-more');
  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      STATE.renderedCount += STATE.pageSize;
      renderQuestionsStream();
    });
  }

  // User detail modal close
  const detailModal = document.getElementById('user-detail-modal');
  const detailBackdrop = document.getElementById('user-detail-backdrop');
  const btnDetailClose = document.getElementById('btn-user-detail-close');
  if (btnDetailClose) btnDetailClose.addEventListener('click', () => detailModal.classList.add('hidden'));
  if (detailBackdrop) detailBackdrop.addEventListener('click', () => detailModal.classList.add('hidden'));
}

function updateSidebarUserInfo() {
  if (!STATE.currentUser) return;
  setText('sidebar-user-name', STATE.currentUser.username);
  setText('sidebar-user-avatar', STATE.currentUser.username.charAt(0).toUpperCase());

  const answered = Object.keys(STATE.userAnswers).length;
  setText('sidebar-user-stats', `${answered} / 253 Solved`);
  setText('saved-count', STATE.bookmarks.size);
}

function switchTab(tabId) {
  STATE.activeTab = tabId;

  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  const titleMap = {
    explorer: STRINGS[STATE.lang].tabExplorer,
    quiz: STRINGS[STATE.lang].tabQuiz,
    exam: STRINGS[STATE.lang].tabExam,
    saved: `${STRINGS[STATE.lang].tabSaved} (${STATE.bookmarks.size})`,
    progress: STRINGS[STATE.lang].tabProgress
  };
  setText('topbar-view-title', titleMap[tabId] || 'ISE 291');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabId === 'saved') {
    renderSavedStream();
  } else if (tabId === 'quiz') {
    startOrResumeQuiz();
  } else if (tabId === 'progress') {
    updateMyProgressSection();
    loadFriendsDirectory();
  }
}

// 8. Render Sidebar Topic & File Selectors
function renderSidebarTopics() {
  const container = document.getElementById('sidebar-topic-list');
  if (!container) return;
  container.innerHTML = '';

  // "All Topics" option
  const allBtn = document.createElement('button');
  allBtn.className = `sidebar-topic-item ${STATE.filterTopic === 'all' ? 'active' : ''}`;
  allBtn.innerHTML = `
    <span>${STRINGS[STATE.lang].allTopics}</span>
    <span class="sidebar-topic-count">253</span>
  `;
  allBtn.addEventListener('click', () => {
    STATE.filterTopic = 'all';
    renderSidebarTopics();
    applyFiltersAndSearch();
  });
  container.appendChild(allBtn);

  // Topics 1..5
  SYLLABUS_TOPICS.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = `sidebar-topic-item ${STATE.filterTopic === topic.id ? 'active' : ''}`;
    
    const label = STATE.lang === 'ar' ? topic.nameAr : topic.nameEn;
    btn.innerHTML = `
      <span>${label}</span>
      <span class="sidebar-topic-count">${topic.count}</span>
    `;

    btn.addEventListener('click', () => {
      STATE.filterTopic = topic.id;
      renderSidebarTopics();
      applyFiltersAndSearch();
    });

    container.appendChild(btn);
  });
}

function renderSidebarFiles() {
  const container = document.getElementById('file-pills');
  if (!container) return;
  container.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = `sidebar-file-item ${STATE.filterFile === 'all' ? 'active' : ''}`;
  allBtn.textContent = STRINGS[STATE.lang].allFiles;
  allBtn.addEventListener('click', () => {
    STATE.filterFile = 'all';
    renderSidebarFiles();
    applyFiltersAndSearch();
  });
  container.appendChild(allBtn);

  SOURCE_FILES.forEach(filename => {
    const btn = document.createElement('button');
    btn.className = `sidebar-file-item ${STATE.filterFile === filename ? 'active' : ''}`;
    btn.textContent = filename.replace('.docx', '').replace('.pdf', '');
    btn.title = filename;
    btn.addEventListener('click', () => {
      STATE.filterFile = filename;
      renderSidebarFiles();
      applyFiltersAndSearch();
    });
    container.appendChild(btn);
  });
}

// 9. Filters & Question Rendering
function applyFiltersAndSearch() {
  STATE.filteredQuestions = STATE.allQuestions.filter(q => {
    if (STATE.filterTopic !== 'all' && q.topic !== STATE.filterTopic) return false;
    if (STATE.filterFile !== 'all' && q.sourceFile !== STATE.filterFile) return false;

    const userAnswer = STATE.userAnswers[q.id];
    if (STATE.filterStatus === 'unanswered' && userAnswer) return false;
    if (STATE.filterStatus === 'correct' && (!userAnswer || userAnswer !== q.correctAnswer)) return false;
    if (STATE.filterStatus === 'incorrect' && (!userAnswer || userAnswer === q.correctAnswer)) return false;

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

  renderQuestionsStream();
}

function renderQuestionsStream() {
  const container = document.getElementById('questions-stream');
  const footer = document.getElementById('pagination-footer');
  if (!container) return;

  container.innerHTML = '';

  if (STATE.filteredQuestions.length === 0) {
    container.innerHTML = `
      <div class="q-card" style="padding: 40px; text-align: center;">
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

  // Responsive Code Block
  if (q.code && q.code.trim()) {
    const codeContainer = document.createElement('div');
    codeContainer.className = 'q-code-container';
    codeContainer.innerHTML = `
      <div class="q-code-header">
        <span class="q-code-lang">${STRINGS[STATE.lang].codeSnippet}</span>
        <div class="q-code-actions">
          <button class="q-code-btn btn-wrap-toggle">${STRINGS[STATE.lang].wrapCode}</button>
          <button class="q-code-btn btn-copy" data-code="${escapeHtml(q.code)}">${STRINGS[STATE.lang].copyCode}</button>
        </div>
      </div>
      <pre class="q-code-block"><code>${escapeHtml(q.code)}</code></pre>
    `;

    const wrapBtn = codeContainer.querySelector('.btn-wrap-toggle');
    wrapBtn.addEventListener('click', () => {
      codeContainer.classList.toggle('wrap-active');
      wrapBtn.textContent = codeContainer.classList.contains('wrap-active') 
        ? STRINGS[STATE.lang].unwrapCode 
        : STRINGS[STATE.lang].wrapCode;
    });

    card.appendChild(codeContainer);
  }

  // Diagram / Image
  if (q.images && q.images.length > 0) {
    q.images.forEach(imgSrc => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'q-image-container';
      imgContainer.innerHTML = `<img src="${imgSrc}" class="q-img" alt="Diagram" />`;
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

    let formattedText = escapeHtml(opt.text);
    if (formattedText.includes('`')) {
      formattedText = formattedText.replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    optEl.innerHTML = `
      <div class="opt-key">${opt.key}</div>
      <div class="opt-text">${formattedText}</div>
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
    <button class="btn-ghost btn-sm btn-toggle-sol">
      ${userAnswer ? STRINGS[STATE.lang].hideSolution : STRINGS[STATE.lang].revealSolution}
    </button>
  `;
  footer.querySelector('.btn-toggle-sol').addEventListener('click', () => {
    expBox.classList.toggle('visible');
  });
  card.appendChild(footer);

  // Bookmark Button
  const btnBm = card.querySelector('.btn-bookmark');
  btnBm.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBookmark(q.id, btnBm);
  });

  // Copy Buttons
  const btnCopy = card.querySelector('.btn-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const codeToCopy = btnCopy.getAttribute('data-code');
      navigator.clipboard.writeText(codeToCopy).then(() => {
        const orig = btnCopy.textContent;
        btnCopy.textContent = STRINGS[STATE.lang].copied;
        setTimeout(() => { btnCopy.textContent = orig; }, 1500);
      });
    });
  }

  // Zoom Images
  card.querySelectorAll('.q-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
  });

  return card;
}

function handleOptionSelect(q, selectedKey, card) {
  STATE.userAnswers[q.id] = selectedKey;
  localStorage.setItem('ise291_answers', JSON.stringify(STATE.userAnswers));

  scheduleCloudSync();

  const optEls = card.querySelectorAll('.opt-item');
  optEls.forEach(el => {
    const key = el.getAttribute('data-key');
    el.classList.remove('selected', 'is-correct', 'is-incorrect');

    if (key === selectedKey) {
      el.classList.add('selected');
      if (key === q.correctAnswer) {
        el.classList.add('is-correct');
      } else {
        el.classList.add('is-incorrect');
      }
    } else if (key === q.correctAnswer) {
      el.classList.add('is-correct');
    }
  });

  const exp = card.querySelector('.q-explanation');
  if (exp) exp.classList.add('visible');

  updateSidebarUserInfo();
  updateMyProgressSection();
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
  localStorage.setItem('ise291_bookmarks', JSON.stringify(Array.from(STATE.bookmarks)));
  scheduleCloudSync();
  updateSidebarUserInfo();
  updateMyProgressSection();
}

// 10. Saved Stream
function renderSavedStream() {
  const container = document.getElementById('saved-stream');
  if (!container) return;
  container.innerHTML = '';

  const savedIds = Array.from(STATE.bookmarks);
  if (savedIds.length === 0) {
    container.innerHTML = `
      <div class="q-card" style="padding: 40px; text-align: center;">
        <p style="color: var(--text-muted);">${STRINGS[STATE.lang].noSaved}</p>
      </div>
    `;
    return;
  }

  const qMap = new Map(STATE.allQuestions.map(q => [q.id, q]));
  savedIds.forEach((id, index) => {
    const q = qMap.get(id);
    if (q) container.appendChild(createQuestionCard(q, index + 1));
  });
}

// 11. Practice Quiz Mode
function bindQuizMode() {
  const btnPrev = document.getElementById('btn-quiz-prev');
  const btnNext = document.getElementById('btn-quiz-next');
  const btnRetake = document.getElementById('btn-quiz-retake');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (STATE.quizIndex > 0) {
        STATE.quizIndex--;
        renderActiveQuizCard();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (STATE.quizIndex < STATE.quizList.length - 1) {
        STATE.quizIndex++;
        renderActiveQuizCard();
      } else {
        showQuizCompletion();
      }
    });
  }

  if (btnRetake) {
    btnRetake.addEventListener('click', () => {
      startOrResumeQuiz(true);
    });
  }
}

function startOrResumeQuiz(forceNew = false) {
  if (forceNew || STATE.quizList.length === 0) {
    const shuffled = [...STATE.allQuestions].sort(() => Math.random() - 0.5);
    STATE.quizList = shuffled.slice(0, 20);
    STATE.quizIndex = 0;
  }

  const compCard = document.getElementById('quiz-completion-card');
  const actBar = document.getElementById('quiz-actions-bar');
  const cardCont = document.getElementById('quiz-card-container');
  if (compCard) compCard.classList.add('hidden');
  if (actBar) actBar.classList.remove('hidden');
  if (cardCont) cardCont.classList.remove('hidden');

  renderActiveQuizCard();
}

function renderActiveQuizCard() {
  const container = document.getElementById('quiz-card-container');
  if (!container || STATE.quizList.length === 0) return;

  container.innerHTML = '';
  const q = STATE.quizList[STATE.quizIndex];
  container.appendChild(createQuestionCard(q, STATE.quizIndex + 1));

  const pct = Math.round(((STATE.quizIndex + 1) / STATE.quizList.length) * 100);
  const progressBar = document.getElementById('quiz-progress-bar');
  if (progressBar) progressBar.style.width = `${pct}%`;

  const progressText = document.getElementById('quiz-progress-text');
  if (progressText) {
    progressText.textContent = `Question ${STATE.quizIndex + 1} of ${STATE.quizList.length}`;
  }

  let answeredCount = 0;
  let correctCount = 0;
  STATE.quizList.forEach(item => {
    if (STATE.userAnswers[item.id]) {
      answeredCount++;
      if (STATE.userAnswers[item.id] === item.correctAnswer) correctCount++;
    }
  });

  const scoreEl = document.getElementById('quiz-live-score');
  if (scoreEl) {
    scoreEl.textContent = `${STRINGS[STATE.lang].quizScore}: ${correctCount} / ${answeredCount}`;
  }

  const btnNext = document.getElementById('btn-quiz-next');
  if (btnNext) {
    btnNext.textContent = STATE.quizIndex === STATE.quizList.length - 1 
      ? STRINGS[STATE.lang].quizFinish 
      : STRINGS[STATE.lang].nextBtn;
  }
}

function showQuizCompletion() {
  const compCard = document.getElementById('quiz-completion-card');
  const actBar = document.getElementById('quiz-actions-bar');
  const cardCont = document.getElementById('quiz-card-container');
  if (cardCont) cardCont.classList.add('hidden');
  if (actBar) actBar.classList.add('hidden');
  if (compCard) compCard.classList.remove('hidden');

  let correctCount = 0;
  STATE.quizList.forEach(item => {
    if (STATE.userAnswers[item.id] === item.correctAnswer) correctCount++;
  });

  const total = STATE.quizList.length;
  const pct = Math.round((correctCount / total) * 100);
  setText('quiz-final-score-pct', `${pct}%`);
  setText('quiz-final-score-fraction', `${correctCount} / ${total} Correct`);
}

// 12. Midterm Simulator Mode
function bindExamSimulator() {
  const btnStart = document.getElementById('btn-start-exam');
  const btnFinish = document.getElementById('btn-finish-exam');
  const btnPrev = document.getElementById('btn-exam-prev');
  const btnNext = document.getElementById('btn-exam-next');
  const btnFlag = document.getElementById('btn-exam-flag');
  const btnReview = document.getElementById('btn-exam-review');
  const btnRetake = document.getElementById('btn-exam-retake');

  if (btnStart) btnStart.addEventListener('click', startExam);

  if (btnFinish) {
    btnFinish.addEventListener('click', () => {
      if (confirm('Are you ready to submit your exam for grading?')) finishExam();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (STATE.examState.currentIndex > 0) {
        STATE.examState.currentIndex--;
        renderExamQuestion();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (STATE.examState.currentIndex < STATE.examState.questions.length - 1) {
        STATE.examState.currentIndex++;
        renderExamQuestion();
      }
    });
  }

  if (btnFlag) {
    btnFlag.addEventListener('click', () => {
      const q = STATE.examState.questions[STATE.examState.currentIndex];
      if (STATE.examState.flagged.has(q.id)) {
        STATE.examState.flagged.delete(q.id);
      } else {
        STATE.examState.flagged.add(q.id);
      }
      renderExamNavGrid();
    });
  }

  if (btnReview) {
    btnReview.addEventListener('click', () => {
      Object.assign(STATE.userAnswers, STATE.examState.answers);
      localStorage.setItem('ise291_answers', JSON.stringify(STATE.userAnswers));
      scheduleCloudSync();

      switchTab('explorer');
      STATE.filteredQuestions = [...STATE.examState.questions];
      STATE.renderedCount = STATE.filteredQuestions.length;
      renderQuestionsStream();
    });
  }

  if (btnRetake) {
    btnRetake.addEventListener('click', () => {
      document.getElementById('exam-setup-card').classList.remove('hidden');
      document.getElementById('exam-active-card').classList.add('hidden');
      document.getElementById('exam-results-card').classList.add('hidden');
    });
  }
}

function startExam() {
  const countSelect = document.getElementById('exam-select-count');
  const timeSelect = document.getElementById('exam-select-time');

  const count = parseInt(countSelect.value, 10) || 30;
  const timeMins = parseInt(timeSelect.value, 10) || 45;

  const shuffled = [...STATE.allQuestions].sort(() => Math.random() - 0.5);
  STATE.examState.questions = shuffled.slice(0, count);
  STATE.examState.currentIndex = 0;
  STATE.examState.answers = {};
  STATE.examState.flagged = new Set();
  STATE.examState.active = true;

  document.getElementById('exam-setup-card').classList.add('hidden');
  document.getElementById('exam-active-card').classList.remove('hidden');
  document.getElementById('exam-results-card').classList.add('hidden');

  renderExamNavGrid();
  renderExamQuestion();

  if (timeMins > 0) {
    STATE.examState.timerSeconds = timeMins * 60;
    startExamTimer();
  } else {
    document.getElementById('exam-timer-display').textContent = STRINGS[STATE.lang].examUntimed;
  }
}

function startExamTimer() {
  if (STATE.examState.timerInterval) clearInterval(STATE.examState.timerInterval);

  updateExamTimerDisplay();
  STATE.examState.timerInterval = setInterval(() => {
    STATE.examState.timerSeconds--;
    updateExamTimerDisplay();

    if (STATE.examState.timerSeconds <= 0) {
      clearInterval(STATE.examState.timerInterval);
      alert('Time limit reached! Submitting your exam automatically.');
      finishExam();
    }
  }, 1000);
}

function updateExamTimerDisplay() {
  const mins = Math.floor(STATE.examState.timerSeconds / 60);
  const secs = STATE.examState.timerSeconds % 60;
  const display = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  const el = document.getElementById('exam-timer-display');
  if (el) el.textContent = display;
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
  container.innerHTML = '';

  const q = STATE.examState.questions[STATE.examState.currentIndex];
  setText('exam-q-current', `Question ${STATE.examState.currentIndex + 1} of ${STATE.examState.questions.length}`);

  const card = document.createElement('div');
  card.className = 'q-card';

  card.innerHTML = `
    <div class="q-header">
      <div class="q-badges">
        <span class="q-badge-id">#${STATE.examState.currentIndex + 1}</span>
        <span class="q-badge-topic">${q.topic}</span>
      </div>
    </div>
    <div class="q-title">${escapeHtml(q.questionText)}</div>
  `;

  if (q.code && q.code.trim()) {
    const codeDiv = document.createElement('div');
    codeDiv.className = 'q-code-container';
    codeDiv.innerHTML = `<pre class="q-code-block"><code>${escapeHtml(q.code)}</code></pre>`;
    card.appendChild(codeDiv);
  }

  if (q.images && q.images.length > 0) {
    q.images.forEach(imgSrc => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'q-image-container';
      imgContainer.innerHTML = `<img src="${imgSrc}" class="q-img" alt="Diagram" />`;
      card.appendChild(imgContainer);
    });
  }

  const optsContainer = document.createElement('div');
  optsContainer.className = 'q-options';

  q.options.forEach(opt => {
    const optEl = document.createElement('div');
    optEl.className = 'opt-item';
    if (STATE.examState.answers[q.id] === opt.key) optEl.classList.add('selected');

    optEl.innerHTML = `
      <div class="opt-key">${opt.key}</div>
      <div class="opt-text">${escapeHtml(opt.text)}</div>
    `;

    optEl.addEventListener('click', () => {
      STATE.examState.answers[q.id] = opt.key;
      renderExamNavGrid();
      renderExamQuestion();
    });

    optsContainer.appendChild(optEl);
  });

  card.appendChild(optsContainer);
  container.appendChild(card);
  renderExamNavGrid();
}

function finishExam() {
  if (STATE.examState.timerInterval) clearInterval(STATE.examState.timerInterval);
  STATE.examState.active = false;

  document.getElementById('exam-active-card').classList.add('hidden');
  document.getElementById('exam-results-card').classList.remove('hidden');

  let correctCount = 0;
  const topicStats = {};

  STATE.examState.questions.forEach(q => {
    const userAnswer = STATE.examState.answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correctCount++;

    if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
    topicStats[q.topic].total++;
    if (isCorrect) topicStats[q.topic].correct++;
  });

  const total = STATE.examState.questions.length;
  const pct = Math.round((correctCount / total) * 100);

  let grade = 'F';
  if (pct >= 95) grade = 'A+';
  else if (pct >= 90) grade = 'A';
  else if (pct >= 85) grade = 'B+';
  else if (pct >= 80) grade = 'B';
  else if (pct >= 75) grade = 'C+';
  else if (pct >= 70) grade = 'C';
  else if (pct >= 60) grade = 'D';

  setText('results-grade-badge', grade);
  setText('results-score-pct', `${pct}%`);
  setText('results-score-fraction', `${correctCount} / ${total} Correct`);

  const record = { score: correctCount, total: total, pct: pct, date: Date.now() };
  STATE.examsTaken.push(record);
  localStorage.setItem('ise291_exams', JSON.stringify(STATE.examsTaken));
  scheduleCloudSync();
  updateSidebarUserInfo();
  updateMyProgressSection();

  const topicsContainer = document.getElementById('results-topics-list');
  if (topicsContainer) {
    topicsContainer.innerHTML = '';
    for (const [topic, data] of Object.entries(topicStats)) {
      const topicPct = Math.round((data.correct / data.total) * 100);
      const row = document.createElement('div');
      row.className = 'topic-result-row';
      row.innerHTML = `
        <span>${topic}</span>
        <span><strong>${data.correct} / ${data.total}</strong> (${topicPct}%)</span>
      `;
      topicsContainer.appendChild(row);
    }
  }
}

// 13. Friends & Progress Section
function updateMyProgressSection() {
  if (!STATE.currentUser) return;
  setText('my-profile-username', STATE.currentUser.username);
  setText('my-profile-avatar', STATE.currentUser.username.charAt(0).toUpperCase());

  const answeredCount = Object.keys(STATE.userAnswers).length;
  let correctCount = 0;
  const qMap = new Map(STATE.allQuestions.map(q => [q.id, q]));
  for (const [qid, ans] of Object.entries(STATE.userAnswers)) {
    const q = qMap.get(qid);
    if (q && q.correctAnswer === ans) correctCount++;
  }
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  setText('my-kpi-answered', `${answeredCount} / 253`);
  setText('my-kpi-accuracy', `${accuracy}%`);
  setText('my-kpi-exams', `${STATE.examsTaken.length}`);
  setText('my-kpi-bookmarks', `${STATE.bookmarks.size}`);

  const breakdownContainer = document.getElementById('my-topic-breakdown');
  if (breakdownContainer) {
    breakdownContainer.innerHTML = '';
    SYLLABUS_TOPICS.forEach(topic => {
      const topicQuestions = STATE.allQuestions.filter(q => q.topic === topic.id);
      const totalInTopic = topicQuestions.length;
      let solvedInTopic = 0;
      let correctInTopic = 0;

      topicQuestions.forEach(q => {
        if (STATE.userAnswers[q.id]) {
          solvedInTopic++;
          if (STATE.userAnswers[q.id] === q.correctAnswer) correctInTopic++;
        }
      });

      const accPct = solvedInTopic > 0 ? Math.round((correctInTopic / solvedInTopic) * 100) : 0;
      const progressPct = totalInTopic > 0 ? Math.round((solvedInTopic / totalInTopic) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'topic-bar-row';
      row.innerHTML = `
        <div class="topic-bar-label">
          <span>${STATE.lang === 'ar' ? topic.nameAr : topic.nameEn}</span>
          <span>${solvedInTopic} / ${totalInTopic} (${accPct}% acc)</span>
        </div>
        <div class="topic-bar-track">
          <div class="topic-bar-fill" style="width: ${progressPct}%;"></div>
        </div>
      `;
      breakdownContainer.appendChild(row);
    });
  }
}

async function loadFriendsDirectory() {
  const container = document.getElementById('friends-list');
  if (!container) return;

  container.innerHTML = '<div style="color:var(--text-muted); padding:20px; text-align:center;">Loading friends directory...</div>';
  
  let dir = await apiGet('ise_dir');
  if (!Array.isArray(dir)) dir = [];
  STATE.friendsDirectory = dir;
  renderFriendsDirectory();
}

function renderFriendsDirectory(filterText = '') {
  const container = document.getElementById('friends-list');
  if (!container) return;
  container.innerHTML = '';

  let list = STATE.friendsDirectory.slice();
  if (filterText.trim()) {
    const q = filterText.toLowerCase();
    list = list.filter(u => u.username.toLowerCase().includes(q));
  }

  list.sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0));

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 24px;">
        No active users found.
      </div>
    `;
    return;
  }

  list.forEach(user => {
    const card = document.createElement('div');
    card.className = 'friend-card';
    
    const initial = user.username.charAt(0).toUpperCase();
    const timeAgo = formatTimeAgo(user.lastActive);

    card.innerHTML = `
      <div class="friend-card-top">
        <div class="user-avatar-sm">${initial}</div>
        <div>
          <div class="friend-card-name">${escapeHtml(user.username)}</div>
          <div class="friend-card-active">${STRINGS[STATE.lang].lastActive}: ${timeAgo}</div>
        </div>
      </div>
      <div class="friend-card-stats">
        <span class="friend-stat-badge">${user.totalAnswered || 0} / 253</span>
        <span class="friend-stat-badge" style="color:var(--success);">${user.accuracy || 0}% Acc</span>
      </div>
      <button class="btn-secondary btn-sm btn-inspect-user" data-username="${escapeHtml(user.username)}">
        ${STRINGS[STATE.lang].inspectProgress}
      </button>
    `;

    card.querySelector('.btn-inspect-user').addEventListener('click', () => {
      openUserDetailModal(user.username);
    });

    container.appendChild(card);
  });
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'recently';
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / (1000 * 60));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

async function openUserDetailModal(username) {
  const modal = document.getElementById('user-detail-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  setText('detail-user-name', username);
  setText('detail-user-avatar', username.charAt(0).toUpperCase());
  setText('detail-user-lastactive', 'Loading user progress...');
  
  const userData = await apiGet('u_' + username);
  if (!userData) {
    setText('detail-user-lastactive', 'User details could not be loaded.');
    return;
  }

  setText('detail-user-lastactive', `${STRINGS[STATE.lang].lastActive} ${formatTimeAgo(userData.lastActive)}`);
  setText('detail-kpi-solved', `${userData.totalAnswered || 0} / 253`);
  setText('detail-kpi-acc', `${userData.accuracy || 0}%`);
  setText('detail-kpi-exams', `${(userData.exams || []).length}`);

  const topicBars = document.getElementById('detail-topic-bars');
  if (topicBars) {
    topicBars.innerHTML = '';
    const userAnswers = userData.answers || {};

    SYLLABUS_TOPICS.forEach(topic => {
      const topicQuestions = STATE.allQuestions.filter(q => q.topic === topic.id);
      const totalInTopic = topicQuestions.length;
      let answeredInTopic = 0;
      let correctInTopic = 0;

      topicQuestions.forEach(q => {
        if (userAnswers[q.id]) {
          answeredInTopic++;
          if (userAnswers[q.id] === q.correctAnswer) correctInTopic++;
        }
      });

      const accPct = answeredInTopic > 0 ? Math.round((correctInTopic / answeredInTopic) * 100) : 0;
      const progressPct = totalInTopic > 0 ? Math.round((answeredInTopic / totalInTopic) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'topic-bar-row';
      row.innerHTML = `
        <div class="topic-bar-label">
          <span>${STATE.lang === 'ar' ? topic.nameAr : topic.nameEn}</span>
          <span>${answeredInTopic}/${totalInTopic} (${accPct}% acc)</span>
        </div>
        <div class="topic-bar-track">
          <div class="topic-bar-fill" style="width: ${progressPct}%;"></div>
        </div>
      `;
      topicBars.appendChild(row);
    });
  }

  const recentList = document.getElementById('detail-recent-answers');
  if (recentList) {
    recentList.innerHTML = '';
    const entries = Object.entries(userData.answers || {}).slice(-15).reverse();
    if (entries.length === 0) {
      recentList.innerHTML = '<div style="color:var(--text-muted); font-size:0.8rem;">No questions answered yet.</div>';
    } else {
      const qMap = new Map(STATE.allQuestions.map(q => [q.id, q]));
      entries.forEach(([qid, ans]) => {
        const q = qMap.get(qid);
        const isCorrect = q && q.correctAnswer === ans;
        const row = document.createElement('div');
        row.className = 'recent-ans-row';
        row.innerHTML = `
          <span>#${qid} ${q ? q.topic.split(':')[0] : ''}</span>
          <span style="font-weight:700; color:${isCorrect ? 'var(--success)' : 'var(--danger)'};">
            ${ans} ${isCorrect ? '✓' : '✗'}
          </span>
        `;
        recentList.appendChild(row);
      });
    }
  }
}

// 14. Lightbox Modal
function bindLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = modal ? modal.querySelector('.lightbox-backdrop') : null;

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
}

function openLightbox(src) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (modal && img) {
    img.src = src;
    modal.classList.remove('hidden');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('hidden');
}

// 15. Utility Helpers
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function applyTheme(theme) {
  STATE.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('ise291_theme', theme);

  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }
  }
}

function applyLanguage(lang) {
  STATE.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('ise291_lang', lang);

  const langIndicator = document.getElementById('lang-indicator');
  if (langIndicator) {
    langIndicator.textContent = lang === 'ar' ? 'English' : 'العربية';
  }

  const s = STRINGS[lang];
  setText('lbl-nav-explorer', s.tabExplorer);
  setText('lbl-nav-quiz', s.tabQuiz);
  setText('lbl-nav-exam', s.tabExam);
  setText('lbl-nav-saved', `${s.tabSaved} (${STATE.bookmarks.size})`);
  setText('lbl-nav-progress', s.tabProgress);
  setText('lbl-sidebar-filters', s.sidebarFilters);

  const searchInput = document.getElementById('input-search');
  if (searchInput) searchInput.placeholder = s.searchPlaceholder;

  setText('lbl-filter-file', s.filterFile);
  setText('btn-status-all', s.allStatus);
  setText('btn-status-unanswered', s.unanswered);
  setText('btn-status-correct', s.correct);
  setText('btn-status-incorrect', s.incorrect);
  setText('lbl-reveal-all', s.revealAll);
  setText('lbl-shuffle', s.shuffle);
  setText('lbl-reset', s.reset);
  setText('btn-load-more', s.loadMore);

  // Gate labels
  setText('lbl-auth-gate-sub', s.authSubtitle);
  setText('btn-gate-tab-login', s.authSignIn);
  setText('btn-gate-tab-signup', s.authSignUp);
  setText('lbl-gate-warning', s.authWarning);
  setText('lbl-gate-username', s.authUsername);
  setText('lbl-gate-password', s.authPassword);

  // Exam labels
  setText('lbl-exam-title', s.examTitle);
  setText('lbl-exam-desc', s.examDesc);
  setText('lbl-exam-qcount', s.examQCount);
  setText('lbl-exam-time', s.examTime);
  setText('btn-start-exam', s.startExam);
  setText('btn-finish-exam', s.submitExam);
  setText('btn-exam-prev', s.prevBtn);
  setText('btn-exam-next', s.nextBtn);
  setText('btn-exam-flag', s.flagBtn);
  setText('lbl-results-title', s.resultsTitle);
  setText('btn-exam-review', s.reviewAnswers);
  setText('btn-exam-retake', s.retakeExam);

  // Saved labels
  setText('lbl-saved-title', s.savedTitle);
  setText('lbl-saved-desc', s.savedDesc);

  // Quiz labels
  setText('lbl-quiz-complete-title', s.quizCompleteTitle);
  setText('btn-quiz-retake', s.takeNewQuiz);
  setText('btn-quiz-prev', s.prevBtn);
  setText('btn-quiz-next', s.nextBtn);

  // Friends labels
  setText('lbl-friends-dir-title', s.friendsTitle);
  setText('lbl-friends-dir-desc', s.friendsDesc);
  const inputSearchFriends = document.getElementById('input-search-friends');
  if (inputSearchFriends) inputSearchFriends.placeholder = s.searchFriends;

  updateSidebarUserInfo();
  renderSidebarTopics();
  renderSidebarFiles();
  renderQuestionsStream();
}
