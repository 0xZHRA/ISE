/**
 * Universal STEM Course Portal - Core Client Engine (ISE 291 Edition)
 * Handles:
 *  - Multi-topic switching & isolated single-page views
 *  - Independent per-topic and per-tab scroll state memory
 *  - Bottom sheet topic navigation modal
 *  - Subsection teleportation chips
 *  - KaTeX Math, mhchem Chemistry, Prism.js Syntax Highlighting, and Mermaid Diagrams
 *  - Dynamic Fisher-Yates choice randomization on all interactive questions
 *  - LocalStorage persistence for user answers and progress tracking
 *  - Searchable, filterable Past Exam Bank (325 questions) with batch pagination
 *  - Bidirectional RTL/LTR collapsible accordions with rotating indicators
 */

// Global Portal State
let portalState = {
    activeTab: 'notes',
    activeTopic: 'topic-1',
    topicScroll: {},
    videosScroll: 0
};

let topicLabels = {};

// User Answers Persistence State
let userAnswers = {};
try {
    userAnswers = JSON.parse(localStorage.getItem('ise291_user_answers') || '{}');
} catch (e) {
    userAnswers = {};
}

function saveUserAnswers() {
    try {
        localStorage.setItem('ise291_user_answers', JSON.stringify(userAnswers));
    } catch (e) {}
}

/**
 * Initialize topic labels from DOM
 */
function initTopicLabels() {
    document.querySelectorAll('.topic-sheet-item').forEach(item => {
        const tid = item.getAttribute('data-topic');
        const titleEl = item.querySelector('.topic-sheet-title');
        const numEl = item.querySelector('.topic-sheet-num');
        if (tid && titleEl) {
            const numText = numEl ? numEl.textContent.trim() : '';
            const fullTitle = titleEl.textContent.trim();
            topicLabels[tid] = numText ? `${numText}. ${fullTitle}` : fullTitle;
        }
    });
}

/**
 * Apply scroll safely with layout settling
 */
function applyScroll(targetY) {
    targetY = Math.max(0, parseInt(targetY, 10) || 0);
    window.scrollTo(0, targetY);
    requestAnimationFrame(() => {
        window.scrollTo(0, targetY);
        updateProgressBar();
    });
    setTimeout(() => {
        window.scrollTo(0, targetY);
        updateProgressBar();
    }, 45);
}

/**
 * Switch to a specific topic page (Each topic is an isolated page)
 */
function switchTopic(targetTopicId) {
    if (!targetTopicId) return;

    // 1. Save scroll position of outgoing topic before hiding
    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (portalState.activeTab === 'notes' && portalState.activeTopic) {
        portalState.topicScroll[portalState.activeTopic] = Math.round(currentY);
    }

    // 2. Hide all topic pages, show target page
    const allPages = document.querySelectorAll('.topic-page-unit');
    allPages.forEach(p => p.style.display = 'none');

    const targetPage = document.getElementById('page-' + targetTopicId);
    if (!targetPage) return;
    targetPage.style.display = 'block';
    portalState.activeTopic = targetTopicId;

    // Lazy KaTeX/Prism/Interactivity: only render when this topic is shown for the first time
    if (!targetPage.getAttribute('data-math-rendered')) {
        initInteractiveQuestions(targetPage);
        initStemRenderers(targetPage);
        targetPage.setAttribute('data-math-rendered', 'true');
    }

    // 3. Update top-bar dropdown trigger text
    const badge = document.getElementById('activeTopicBadge');
    if (badge && topicLabels[targetTopicId]) {
        badge.textContent = topicLabels[targetTopicId];
    }

    // 4. Update selected class in modal
    document.querySelectorAll('.topic-sheet-item').forEach(item => {
        if (item.getAttribute('data-topic') === targetTopicId) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });

    // 5. Restore saved scroll position for this specific topic
    const targetY = portalState.topicScroll[targetTopicId] || 0;
    applyScroll(targetY);
    recalculateDocHeight();

    // 6. Persist state
    scheduleSaveState();
}

/**
 * Teleport smoothly to an idea subsection within current topic
 */
function teleportTo(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        const nav = document.querySelector('.top-nav-bar');
        const headerOffset = (nav ? nav.offsetHeight : 62) + 12;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const offsetPosition = elementRect - bodyRect - headerOffset;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
}

/**
 * Topics Bottom Sheet Modal
 */
function openTopicsModal() {
    const m = document.getElementById('topicsModal');
    if (m) {
        m.style.display = 'flex';
        document.querySelectorAll('.topic-sheet-item').forEach(item => {
            if (item.getAttribute('data-topic') === portalState.activeTopic) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }
}

function closeTopicsModal(e) {
    if (!e || e.target === document.getElementById('topicsModal') || e.target.classList.contains('topic-sheet-close')) {
        const m = document.getElementById('topicsModal');
        if (m) m.style.display = 'none';
    }
}

/**
 * Tab Switcher (Lecture Notes & Drills vs Past Exam Bank) with per-tab scroll memory
 */
function showTab(tab) {
    if (tab === portalState.activeTab && document.getElementById(tab === 'notes' ? 'notesContainer' : 'videosContainer').style.display === 'block') {
        return;
    }

    // 1. Save scroll position of outgoing tab
    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (portalState.activeTab === 'notes') {
        portalState.topicScroll[portalState.activeTopic] = Math.round(currentY);
    } else {
        portalState.videosScroll = Math.round(currentY);
    }

    portalState.activeTab = tab;

    const notes = document.getElementById('notesContainer');
    const videos = document.getElementById('videosContainer');
    const btnN = document.getElementById('btnNotes');
    const btnV = document.getElementById('btnVideos');
    const topicMenuBtn = document.getElementById('btnTopicSelect');

    if (tab === 'notes') {
        if (notes) notes.style.display = 'block';
        if (videos) videos.style.display = 'none';
        if (btnN) btnN.classList.add('active');
        if (btnV) btnV.classList.remove('active');
        if (topicMenuBtn) topicMenuBtn.style.display = 'inline-flex';

        // Ensure active topic page is shown
        const activePage = document.getElementById('page-' + portalState.activeTopic);
        if (activePage) activePage.style.display = 'block';

        // Restore scroll for this topic
        const targetY = portalState.topicScroll[portalState.activeTopic] || 0;
        applyScroll(targetY);
    } else {
        if (notes) notes.style.display = 'none';
        if (videos) videos.style.display = 'block';
        if (btnN) btnN.classList.remove('active');
        if (btnV) btnV.classList.add('active');
        if (topicMenuBtn) topicMenuBtn.style.display = 'none';

        // Initialize exam bank on first viewing
        initExamBank();

        // Restore scroll for exam bank
        const targetY = portalState.videosScroll || 0;
        applyScroll(targetY);
    }

    scheduleSaveState();
}

/**
 * Minimalist top progress bar tracking reading progress (0% - 100%) - GPU Accelerated & Cached
 */
let docScrollHeight = 0;
let isScrollTicking = false;

function recalculateDocHeight() {
    docScrollHeight = Math.max(1, document.documentElement.scrollHeight - document.documentElement.clientHeight);
}
window.addEventListener('resize', recalculateDocHeight, { passive: true });

function updateProgressBar() {
    const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (docScrollHeight <= 0) recalculateDocHeight();
    const scrolled = Math.min(100, Math.max(0, (currentY / docScrollHeight) * 100));
    const bar = document.getElementById('scrollProgressBar');
    if (bar) {
        bar.style.transform = `scaleX(${scrolled / 100})`;
    }
}

/**
 * High-performance throttled scroll listener using requestAnimationFrame
 */
window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
        requestAnimationFrame(() => {
            const currentY = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (portalState.activeTab === 'notes') {
                portalState.topicScroll[portalState.activeTopic] = Math.round(currentY);
            } else {
                portalState.videosScroll = Math.round(currentY);
            }
            updateProgressBar();
            scheduleSaveState();
            isScrollTicking = false;
        });
        isScrollTicking = true;
    }
}, { passive: true });

/**
 * Debounced state persistence to localStorage & server /api/state
 */
let saveTimer = null;
function scheduleSaveState() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        try {
            localStorage.setItem('course_portal_scroll_state', JSON.stringify(portalState));
            fetch('/api/state', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(portalState)
            }).catch(() => {});
        } catch (e) {}
    }, 300);
}

/**
 * Copy Code to Clipboard with tactile feedback
 */
function copyCode(btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    if (!wrapper) return;
    const codeEl = wrapper.querySelector('pre code') || wrapper.querySelector('pre');
    if (!codeEl) return;
    const text = codeEl.innerText || codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const span = btn.querySelector('span');
        const orig = span ? span.textContent : 'Copy';
        btn.classList.add('copied');
        if (span) span.textContent = 'Copied!';
        setTimeout(() => {
            btn.classList.remove('copied');
            if (span) span.textContent = orig;
        }, 2000);
    }).catch(() => {});
}

/**
 * Initialize all rich STEM renderers
 */
function initStemRenderers(rootElement = document.body) {
    // 1. KaTeX Math & mhchem Chemistry
    if (window.renderMathInElement) {
        try {
            renderMathInElement(rootElement, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    { left: "\\(", right: "\\)", display: false },
                    { left: "\\[", right: "\\]", display: true }
                ],
                throwOnError: false
            });
        } catch (e) {
            console.warn("KaTeX rendering warning:", e);
        }
    }

    // 2. Prism.js Code Highlighting
    if (window.Prism) {
        try {
            Prism.highlightAllUnder(rootElement);
        } catch (e) {
            try { Prism.highlightAll(); } catch (err) {}
        }
    }

    // 3. Mermaid.js Diagrams
    if (window.mermaid) {
        try {
            const mermaidNodes = rootElement.querySelectorAll ? rootElement.querySelectorAll('.mermaid') : [];
            if (mermaidNodes.length > 0) {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    themeVariables: {
                        darkMode: true,
                        background: '#111118',
                        primaryColor: '#38bdf8',
                        primaryTextColor: '#f8fafc',
                        lineColor: '#64748b',
                        fontSize: '13px'
                    }
                });
                mermaid.run({ nodes: mermaidNodes });
            }
        } catch (e) {
            console.warn("Mermaid rendering warning:", e);
        }
    }
}

/**
 * Toggle Practice Drill Step-by-Step Solution & Explanation
 */
function toggleDrillSolution(nid) {
    const wrap = document.getElementById('sol-wrap-' + nid);
    const btn = document.getElementById('btn-toggle-' + nid);
    if (!wrap) return;

    const isHidden = (wrap.style.display === 'none' || wrap.style.display === '');
    if (isHidden) {
        wrap.style.display = 'block';
        if (btn) {
            btn.classList.add('expanded');
            const txt = btn.querySelector('.toggle-text');
            if (txt) txt.textContent = 'Hide Step-by-Step Solution';
        }
        if (!wrap.getAttribute('data-math-rendered')) {
            initStemRenderers(wrap);
            wrap.setAttribute('data-math-rendered', 'true');
        }
        recalculateDocHeight();
    } else {
        wrap.style.display = 'none';
        if (btn) {
            btn.classList.remove('expanded');
            const txt = btn.querySelector('.toggle-text');
            if (txt) txt.textContent = 'Show Step-by-Step Solution & Explanation';
        }
        recalculateDocHeight();
    }
}

/**
 * Interactive Question Engine with Dynamic Option Randomization (Fisher-Yates) & State Persistence
 */
function setupInteractiveQuestionElement(qEl, qId = null) {
    const grid = qEl.querySelector('.q-options-grid');
    const correctKey = qEl.getAttribute('data-correct');
    const sourceFile = qEl.getAttribute('data-source') || '';
    const feedback = qEl.querySelector('.q-feedback');
    if (!grid || !correctKey) return;

    // Use passed qId, attribute data-qid, or fallback to closest card ID
    const resolvedQId = qId || qEl.getAttribute('data-qid') || (qEl.closest('.section-card') ? qEl.closest('.section-card').id : null) || 'q_' + Math.random().toString(36).substring(2, 9);
    qEl.setAttribute('data-qid', resolvedQId);

    const buttons = Array.from(grid.querySelectorAll('.portal-opt-btn'));
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    let correctText = '';
    buttons.forEach(btn => {
        if (btn.getAttribute('data-key') === correctKey) {
            correctText = btn.querySelector('.opt-text') ? btn.querySelector('.opt-text').textContent.trim() : '';
        }
    });

    // Check if question was already solved
    const existing = userAnswers[resolvedQId];

    // Fisher-Yates Choice Randomization
    if (!qEl.getAttribute('data-shuffled')) {
        for (let i = buttons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            grid.appendChild(buttons[j]);
        }
        qEl.setAttribute('data-shuffled', 'true');
    }

    // Re-assign display letters (A, B, C, D)
    const shuffledButtons = Array.from(grid.querySelectorAll('.portal-opt-btn'));
    shuffledButtons.forEach((btn, idx) => {
        const keySpan = btn.querySelector('.opt-key');
        if (keySpan) keySpan.textContent = letters[idx];

        // Restore solved state if present
        if (existing) {
            btn.disabled = true;
            const isTarget = (btn.getAttribute('data-key') === correctKey);
            const wasPicked = (btn.getAttribute('data-key') === existing.selectedKey);
            if (isTarget) {
                btn.classList.add('correct');
            } else if (wasPicked) {
                btn.classList.add('incorrect');
            }
        }

        btn.onclick = () => {
            const selectedKey = btn.getAttribute('data-key');
            const isCorrect = (selectedKey === correctKey);

            // Record in user state
            userAnswers[resolvedQId] = {
                selectedKey: selectedKey,
                isCorrect: isCorrect,
                answeredAt: Date.now()
            };
            saveUserAnswers();
            updateExamStats();

            shuffledButtons.forEach(b => {
                b.disabled = true;
                const isTarget = (b.getAttribute('data-key') === correctKey);
                if (isTarget) {
                    b.classList.add('correct');
                } else if (b === btn) {
                    b.classList.add('incorrect');
                }
            });

            if (feedback) {
                feedback.classList.remove('hidden');
                if (isCorrect) {
                    feedback.className = 'q-feedback feedback-correct';
                    feedback.innerHTML = `<strong>Correct!</strong> Matched verified solution.<span class="tag-source">Source: ${sourceFile}</span>`;
                } else {
                    feedback.className = 'q-feedback feedback-wrong';
                    feedback.innerHTML = `<strong>Concept Check:</strong> The correct choice is <strong>(${correctKey}) ${correctText}</strong>.<span class="tag-source">Source: ${sourceFile}</span>`;
                }
            }

            // Update badge if inside past exam bank
            const statusBadge = document.getElementById('status-' + resolvedQId);
            if (statusBadge) {
                statusBadge.className = 'badge-solved-status ' + (isCorrect ? 'solved-correct' : 'solved-wrong');
                statusBadge.textContent = isCorrect ? 'Solved Correct' : 'Attempted';
                statusBadge.style.display = 'inline-flex';
            }

            // Automatically reveal the solution container and rotate chevron after answering
            const solWrap = document.getElementById('sol-wrap-' + resolvedQId);
            const solBtn = document.getElementById('btn-toggle-' + resolvedQId);
            if (solWrap) {
                solWrap.style.display = 'block';
                if (solBtn) {
                    solBtn.classList.add('expanded');
                    const txt = solBtn.querySelector('.toggle-text');
                    if (txt) txt.textContent = 'Hide Step-by-Step Solution';
                }
                if (!solWrap.getAttribute('data-math-rendered')) {
                    initStemRenderers(solWrap);
                    solWrap.setAttribute('data-math-rendered', 'true');
                }
                recalculateDocHeight();
            }
        };
    });

    // Reveal feedback and solution if already solved
    if (existing) {
        if (feedback) {
            feedback.classList.remove('hidden');
            if (existing.isCorrect) {
                feedback.className = 'q-feedback feedback-correct';
                feedback.innerHTML = `<strong>Correct!</strong> Matched verified solution.<span class="tag-source">Source: ${sourceFile}</span>`;
            } else {
                feedback.className = 'q-feedback feedback-wrong';
                feedback.innerHTML = `<strong>Concept Check:</strong> The correct choice is <strong>(${correctKey}) ${correctText}</strong>.<span class="tag-source">Source: ${sourceFile}</span>`;
            }
        }

        const solWrap = document.getElementById('sol-wrap-' + resolvedQId);
        const solBtn = document.getElementById('btn-toggle-' + resolvedQId);
        if (solWrap) {
            solWrap.style.display = 'block';
            if (solBtn) {
                solBtn.classList.add('expanded');
                const txt = solBtn.querySelector('.toggle-text');
                if (txt) txt.textContent = 'Hide Step-by-Step Solution';
            }
            if (!solWrap.getAttribute('data-math-rendered')) {
                initStemRenderers(solWrap);
                solWrap.setAttribute('data-math-rendered', 'true');
            }
        }
    }
}

function initInteractiveQuestions(container = document) {
    container.querySelectorAll('.interactive-q').forEach(qEl => {
        setupInteractiveQuestionElement(qEl);
    });
}


/* ==========================================================================
   Past Exam Bank Engine: Search, Filter, Pagination & Full 325 Bank
   ========================================================================== */
let examBankState = {
    initialized: false,
    activeFilter: 'all',
    searchQuery: '',
    limit: 20,
    filteredQuestions: []
};

let isExamDataLoading = false;
let examDataCallbacks = [];

function loadExamDataAsync(callback) {
    if (window.QUESTIONS_DATA && Array.isArray(window.QUESTIONS_DATA)) {
        if (typeof callback === 'function') callback();
        return;
    }
    if (callback) examDataCallbacks.push(callback);
    if (isExamDataLoading) return;

    isExamDataLoading = true;
    const script = document.createElement('script');
    const isLiveStaticDir = window.location.pathname.includes('/static/');
    script.src = isLiveStaticDir ? '/static/js/questions_data.js' : 'questions_data.js';
    script.async = true;
    script.onload = () => {
        isExamDataLoading = false;
        examDataCallbacks.forEach(cb => { if (typeof cb === 'function') cb(); });
        examDataCallbacks = [];
    };
    script.onerror = () => {
        // Fallback to fetch questions.json
        fetch('questions.json')
            .then(res => res.json())
            .then(data => {
                window.QUESTIONS_DATA = data;
                isExamDataLoading = false;
                examDataCallbacks.forEach(cb => { if (typeof cb === 'function') cb(); });
                examDataCallbacks = [];
            })
            .catch(err => {
                isExamDataLoading = false;
                console.error("Could not load exam data:", err);
                const stream = document.getElementById('examQuestionsStream');
                if (stream) {
                    stream.innerHTML = '<p style="color: #f87171; padding: 20px;">Could not load past exam bank data. Ensure questions_data.js or questions.json is present.</p>';
                }
                examDataCallbacks.forEach(cb => { if (typeof cb === 'function') cb(); });
                examDataCallbacks = [];
            });
    };
    document.head.appendChild(script);
}

function initExamBank() {
    if (examBankState.initialized && window.QUESTIONS_DATA && Array.isArray(window.QUESTIONS_DATA)) {
        return;
    }
    examBankState.initialized = true;

    // Load questions data if available
    if (window.QUESTIONS_DATA && Array.isArray(window.QUESTIONS_DATA)) {
        renderExamBank();
        return;
    }

    const stream = document.getElementById('examQuestionsStream');
    if (stream) {
        stream.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; color: var(--text-dim);">
                <div style="display: inline-block; width: 34px; height: 34px; border: 3px solid var(--border-color); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 14px;"></div>
                <p style="font-size: 15px; font-weight: 700; color: #f1f5f9;">Loading 325 Verified Practice Exam Questions...</p>
                <p style="font-size: 12.5px; color: var(--text-dim);">Optimizing math formulas and solution breakdowns</p>
            </div>
        `;
    }

    loadExamDataAsync(() => {
        renderExamBank();
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function formatExplanation(text) {
    if (!text) return '';
    // Format markdown bold, italic, and paragraphs while preserving math
    let html = escapeHtml(text);
    // Unescape common math symbols that KaTeX handles
    html = html.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>');
    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Lines
    const lines = html.split('\n');
    const paras = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('- ') || trimmed.startsWith('&bull; ')) {
            return `<li>${trimmed.substring(2)}</li>`;
        }
        if (/^\d+\.\s/.test(trimmed)) {
            return `<li>${trimmed.replace(/^\d+\.\s/, '')}</li>`;
        }
        return `<p>${trimmed}</p>`;
    });
    return paras.join('');
}

function matchesFilter(q, filter) {
    const topic = (q.topic || '').toLowerCase();
    const source = (q.sourceFile || '').toLowerCase();
    const cat = (q.category || '').toLowerCase();

    switch (filter) {
        case 'topic-1':
            return topic.includes('topic 1');
        case 'topic-2':
            return topic.includes('topic 2');
        case 'topic-3':
            return topic.includes('topic 3');
        case 'topic-4':
            return topic.includes('topic 4');
        case 'topic-5':
            return topic.includes('topic 5');
        case 'term-251':
            return source.includes('251') || cat.includes('251') || cat.includes('quiz');
        case 'past-midterms':
            return source.includes('mid') || cat.includes('mid') || source.includes('223') || source.includes('212');
        case 'all':
        default:
            return true;
    }
}

function matchesSearch(q, query) {
    if (!query) return true;
    const qStr = (
        (q.id || '') + ' ' +
        (q.questionText || '') + ' ' +
        (q.code || '') + ' ' +
        (q.sourceFile || '') + ' ' +
        (q.topic || '') + ' ' +
        (q.category || '')
    ).toLowerCase();
    return qStr.includes(query.toLowerCase());
}

function filterExamBank(filterKey, chipElement) {
    examBankState.activeFilter = filterKey;
    examBankState.limit = 20;

    // Update active chip UI
    document.querySelectorAll('.exam-chip').forEach(c => c.classList.remove('active'));
    if (chipElement) {
        chipElement.classList.add('active');
    }

    renderExamBank();
}

let searchDebounceTimer = null;
function handleExamSearch(val) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        examBankState.searchQuery = val.trim();
        examBankState.limit = 20;

        const btnClear = document.getElementById('btnClearSearch');
        if (btnClear) {
            btnClear.style.display = examBankState.searchQuery ? 'inline-block' : 'none';
        }

        renderExamBank();
    }, 150);
}

function clearExamSearch() {
    clearTimeout(searchDebounceTimer);
    const input = document.getElementById('examSearchInput');
    if (input) input.value = '';
    examBankState.searchQuery = '';
    examBankState.limit = 20;
    const btnClear = document.getElementById('btnClearSearch');
    if (btnClear) {
        btnClear.style.display = 'none';
    }
    renderExamBank();
}

function toggleExamSolution(qId) {
    const body = document.getElementById('sol-' + qId);
    const btn = document.getElementById('btn-sol-' + qId);
    if (!body || !btn) return;

    const isOpen = body.classList.contains('open');
    if (isOpen) {
        body.classList.remove('open');
        btn.classList.remove('expanded');
    } else {
        body.classList.add('open');
        btn.classList.add('expanded');
        // Lazy KaTeX: only typeset when the solution is first revealed
        if (!body.getAttribute('data-math-rendered')) {
            initStemRenderers(body);
            body.setAttribute('data-math-rendered', 'true');
        }
    }
    recalculateDocHeight();
}

function renderExamBank() {
    const allQuestions = window.QUESTIONS_DATA || [];
    const stream = document.getElementById('examQuestionsStream');
    const loadMoreContainer = document.getElementById('examLoadMoreContainer');
    if (!stream) return;

    // 1. Filter questions
    const filtered = allQuestions.filter(q => {
        return matchesFilter(q, examBankState.activeFilter) && matchesSearch(q, examBankState.searchQuery);
    });
    examBankState.filteredQuestions = filtered;

    // 2. Update Stats Bar
    updateExamStats();

    if (filtered.length === 0) {
        stream.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-dim); background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color);">
                <p style="font-size: 16px; font-weight: 700; color: #f1f5f9; margin-bottom: 6px;">No questions found</p>
                <p style="font-size: 13px;">No questions matched the current filter or search query. Try broadening your search or choosing "All".</p>
            </div>
        `;
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        return;
    }

    // 3. Slice for current pagination limit
    const pageQuestions = filtered.slice(0, examBankState.limit);

    // 4. Build HTML
    let html = '';
    pageQuestions.forEach(q => {
        const qId = q.id || 'Q' + Math.random().toString(36).substring(2, 7);
        const codeBlock = q.code ? `
            <div class="code-block-wrapper">
                <div class="code-block-header">
                    <span class="code-lang-badge">PYTHON</span>
                    <button class="btn-copy-code" onclick="copyCode(this)"><span>Copy</span></button>
                </div>
                <pre class="line-numbers"><code class="language-python">${escapeHtml(q.code)}</code></pre>
            </div>
        ` : '';

        // Options
        const optionsHtml = (q.options || []).map(opt => {
            return `
                <button class="portal-opt-btn" data-key="${opt.key}">
                    <span class="opt-key">${opt.key}</span>
                    <span class="opt-text">${escapeHtml(opt.text)}</span>
                </button>
            `;
        }).join('');

        // Find correct option text
        let correctOptText = '';
        (q.options || []).forEach(opt => {
            if (opt.key === q.correctAnswer) correctOptText = opt.text;
        });

        // Solved state indicator
        const ansInfo = userAnswers[qId];
        let solvedBadgeClass = '';
        let solvedBadgeText = '';
        let solvedBadgeDisplay = 'none';
        if (ansInfo) {
            solvedBadgeClass = ansInfo.isCorrect ? 'solved-correct' : 'solved-wrong';
            solvedBadgeText = ansInfo.isCorrect ? 'Solved Correct' : 'Attempted';
            solvedBadgeDisplay = 'inline-flex';
        }

        // Reinforcement Drill (if present)
        let reinforcementHtml = '';
        if (q.reinforcementQuestion) {
            const rq = q.reinforcementQuestion;
            const rOpts = (rq.options || []).map(ropt => `
                <button class="portal-opt-btn" data-key="${ropt.key}">
                    <span class="opt-key">${ropt.key}</span>
                    <span class="opt-text">${escapeHtml(ropt.text)}</span>
                </button>
            `).join('');

            reinforcementHtml = `
                <div class="reinforcement-card">
                    <div class="reinforcement-header">&#128161; Concept Reinforcement Drill</div>
                    <div class="exam-q-text">${escapeHtml(rq.questionText)}</div>
                    ${rq.code ? `<pre class="exam-q-code"><code>${escapeHtml(rq.code)}</code></pre>` : ''}
                    <div class="interactive-q" data-correct="${rq.correctAnswer}" data-source="${escapeHtml(q.sourceFile || '')}" data-qid="${qId}_reinf">
                        <div class="q-options-grid">${rOpts}</div>
                        <div class="q-feedback hidden"></div>
                    </div>
                </div>
            `;
        }

        html += `
            <div class="exam-card" id="card-${qId}">
                <div class="exam-meta-bar">
                    <div class="exam-badges-group">
                        <span class="badge-qid">${qId}</span>
                        <span class="badge-topic">${escapeHtml(q.topic || 'General')}</span>
                        <span class="badge-source">${escapeHtml(q.sourceFile || 'ISE 291 Exam')}</span>
                    </div>
                    <span class="badge-solved-status ${solvedBadgeClass}" id="status-${qId}" style="display: ${solvedBadgeDisplay};">${solvedBadgeText}</span>
                </div>
                <div class="exam-q-text">${escapeHtml(q.questionText)}</div>
                ${codeBlock}
                <div class="interactive-q" data-correct="${q.correctAnswer}" data-source="${escapeHtml(q.sourceFile || '')}" data-qid="${qId}">
                    <div class="q-options-grid">
                        ${optionsHtml}
                    </div>
                    <div class="q-feedback hidden"></div>
                </div>
                
                <!-- Collapsible Step-by-Step Solution Accordion -->
                <button class="exam-accordion-toggle" id="btn-sol-${qId}" onclick="toggleExamSolution('${qId}')">
                    <span class="toggle-label"><span class="chevron">&blacktriangleright;</span> Step-by-Step Solution & Concept Walkthrough</span>
                </button>
                <div class="exam-solution-body" id="sol-${qId}">
                    <div class="box-ans" style="margin-top: 10px;">
                        <div class="ans-mini-label">Verified Correct Option</div>
                        <div class="ans-content"><strong>Option (${q.correctAnswer}):</strong> ${escapeHtml(correctOptText)}</div>
                    </div>
                    <div class="box-sol">
                        <div class="sol-mini-label">Detailed Breakdown & Distractor Analysis</div>
                        <div class="sol-content">${formatExplanation(q.explanation)}</div>
                    </div>
                    ${reinforcementHtml}
                </div>
            </div>
        `;
    });

    stream.innerHTML = html;

    // 5. Initialize interactivity and math/code on rendered cards in a single batch
    initInteractiveQuestions(stream);
    initStemRenderers(stream);
    recalculateDocHeight();

    // 6. Manage Load More button
    if (loadMoreContainer) {
        if (filtered.length > examBankState.limit) {
            loadMoreContainer.style.display = 'block';
            const btn = document.getElementById('btnLoadMoreExam');
            if (btn) {
                const remaining = filtered.length - examBankState.limit;
                btn.textContent = `Load More Questions (${remaining} remaining)`;
            }
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
}

function loadMoreExamQuestions() {
    examBankState.limit += 20;
    renderExamBank();
}

function updateExamStats() {
    const allQuestions = window.QUESTIONS_DATA || [];
    const filtered = examBankState.filteredQuestions || [];

    const countEl = document.getElementById('examStatsCount');
    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${allQuestions.length} questions`;
    }

    const scoreEl = document.getElementById('examStatsScore');
    if (scoreEl) {
        const solvedCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf')).length;
        const correctCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf') && userAnswers[k].isCorrect).length;
        scoreEl.textContent = `Solved: ${solvedCount} / ${allQuestions.length} (${correctCount} correct)`;
    }
}

function resetUserAnswers() {
    if (confirm("Reset all saved answer choices across all questions? This will allow you to practice the entire portal again from scratch.")) {
        userAnswers = {};
        try {
            localStorage.removeItem('ise291_user_answers');
        } catch (e) {}

        // Reset DOM questions in notes
        document.querySelectorAll('.interactive-q').forEach(qEl => {
            qEl.removeAttribute('data-shuffled');
            qEl.querySelectorAll('.portal-opt-btn').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
            });
            const fb = qEl.querySelector('.q-feedback');
            if (fb) {
                fb.classList.add('hidden');
                fb.innerHTML = '';
            }
        });

        // Reset all drill solution containers
        document.querySelectorAll('.drill-solution-container').forEach(wrap => {
            wrap.style.display = 'none';
        });
        document.querySelectorAll('.drill-solution-toggle').forEach(btn => {
            btn.classList.remove('expanded');
            const txt = btn.querySelector('.toggle-text');
            if (txt) txt.textContent = 'Show Step-by-Step Solution & Explanation';
        });

        // Re-render exam bank
        renderExamBank();
    }
}

/**
 * Initialize portal on page load (Optimized & Lazy)
 */
window.addEventListener('DOMContentLoaded', () => {
    initTopicLabels();

    // 1. Restore local storage state
    try {
        const local = JSON.parse(localStorage.getItem('course_portal_scroll_state') || '{}');
        if (local && typeof local === 'object') {
            if (local.topicScroll) {
                portalState.topicScroll = Object.assign({}, portalState.topicScroll, local.topicScroll);
            }
            if (local.activeTopic && document.getElementById('page-' + local.activeTopic)) {
                portalState.activeTopic = local.activeTopic;
            }
            if (local.activeTab) {
                portalState.activeTab = local.activeTab;
            }
            if (typeof local.videosScroll === 'number') {
                portalState.videosScroll = local.videosScroll;
            }
        }
    } catch (e) {}

    // 2. Query param override (?topic=02_chemistry or ?v=topic-2 or ?tab=bank)
    const urlParams = new URLSearchParams(window.location.search);
    const paramTopic = urlParams.get('topic') || urlParams.get('v');
    const paramTab = urlParams.get('tab');
    if (paramTopic && document.getElementById('page-' + paramTopic)) {
        portalState.activeTopic = paramTopic;
        portalState.activeTab = 'notes';
    }
    if (paramTab === 'bank' || paramTab === 'videos' || paramTab === 'exam') {
        portalState.activeTab = 'videos';
    }

    // 3. Render initial view and restore scroll (Lazy: Only typeset the active view!)
    if (portalState.activeTab === 'videos') {
        showTab('videos');
    } else {
        const activePage = document.getElementById('page-' + portalState.activeTopic) || document.getElementById('page-topic-1');
        if (activePage) {
            initInteractiveQuestions(activePage);
            initStemRenderers(activePage);
            activePage.setAttribute('data-math-rendered', 'true');
        }
        switchTopic(portalState.activeTopic);
    }
    recalculateDocHeight();

    // 4. Background pre-fetch of exam bank after idle
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => { loadExamDataAsync(); }, { timeout: 3500 });
    } else {
        setTimeout(() => { loadExamDataAsync(); }, 2500);
    }

    // 5. Background server sync
    fetch('/api/state')
        .then(r => r.json())
        .then(srvState => {
            if (srvState && srvState.topicScroll) {
                let updated = false;
                Object.keys(srvState.topicScroll).forEach(k => {
                    if ((!portalState.topicScroll[k] || portalState.topicScroll[k] === 0) && srvState.topicScroll[k] > 0) {
                        portalState.topicScroll[k] = srvState.topicScroll[k];
                        updated = true;
                    }
                });
                if ((!portalState.videosScroll || portalState.videosScroll === 0) && srvState.videosScroll > 0) {
                    portalState.videosScroll = srvState.videosScroll;
                    updated = true;
                }
                if (updated) {
                    scheduleSaveState();
                }
            }
        })
        .catch(() => {});
});
