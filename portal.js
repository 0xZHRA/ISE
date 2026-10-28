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
 * ==========================================================================
 * Seamless Multi-Device Cloud Progress Sync Engine
 * ==========================================================================
 */
const CLOUD_SYNC_ENDPOINT = 'https://api.restful-api.dev/objects/ff808181a09d98f701a173fce8cc09d6';
let lastCloudSyncTime = null;
let isCloudSyncing = false;
let cloudPushTimer = null;

/**
 * Smart merge local answers with cloud answers
 */
function smartMergeAnswers(localMap, remoteMap) {
    const merged = Object.assign({}, localMap || {});
    let localChanged = false;
    let remoteChanged = false;

    if (!remoteMap || typeof remoteMap !== 'object') {
        return { merged, localChanged: false, remoteChanged: true };
    }

    Object.keys(remoteMap).forEach(k => {
        const rItem = remoteMap[k];
        const lItem = merged[k];

        if (!lItem) {
            merged[k] = rItem;
            localChanged = true;
        } else {
            // Keep correct answer if one of them is right
            if (rItem.isCorrect && !lItem.isCorrect) {
                merged[k] = rItem;
                localChanged = true;
            } else if (!rItem.isCorrect && lItem.isCorrect) {
                remoteChanged = true;
            } else {
                const rTime = rItem.answeredAt || 0;
                const lTime = lItem.answeredAt || 0;
                if (rTime > lTime) {
                    merged[k] = rItem;
                    localChanged = true;
                } else if (lTime > rTime) {
                    remoteChanged = true;
                }
            }
        }
    });

    Object.keys(merged).forEach(k => {
        if (!remoteMap[k]) {
            remoteChanged = true;
        }
    });

    return { merged, localChanged, remoteChanged };
}

/**
 * Re-apply restored/merged answers to all interactive question widgets currently in DOM
 */
function applyAnswersToDOM() {
    document.querySelectorAll('.interactive-q').forEach(qEl => {
        const qId = qEl.getAttribute('data-qid') || (qEl.closest('.section-card') ? qEl.closest('.section-card').id : null);
        if (!qId || !userAnswers[qId]) return;

        const ans = userAnswers[qId];
        const correctKey = qEl.getAttribute('data-correct');
        const feedback = qEl.querySelector('.q-feedback');
        const buttons = Array.from(qEl.querySelectorAll('.portal-opt-btn'));

        buttons.forEach(b => {
            b.disabled = true;
            const bKey = b.getAttribute('data-key');
            if (bKey === correctKey) {
                b.classList.add('correct');
            } else if (bKey === ans.selectedKey) {
                b.classList.add('incorrect');
            } else {
                b.classList.remove('correct', 'incorrect');
            }
        });

        if (feedback) {
            feedback.classList.remove('hidden');
            if (ans.isCorrect) {
                feedback.className = 'q-feedback feedback-correct';
                feedback.innerHTML = '<strong>&#10003; Correct!</strong> Solved previously.';
            } else {
                let correctText = '';
                buttons.forEach(btn => {
                    if (btn.getAttribute('data-key') === correctKey) {
                        correctText = btn.querySelector('.opt-text') ? btn.querySelector('.opt-text').textContent.trim() : '';
                    }
                });
                feedback.className = 'q-feedback feedback-wrong';
                feedback.innerHTML = `<strong>&#10007; Incorrect.</strong> The correct answer is <strong>${escapeHtml(correctKey)}: ${escapeHtml(correctText)}</strong>.`;
            }
        }
    });

    updateExamStats();
}

/**
 * Minimalist Sync Badge State Management
 */
function updateSyncBadge(status, label) {
    const badge = document.getElementById('globalSyncBadge');
    if (!badge) return;
    badge.className = 'sync-badge-btn';
    if (status) {
        badge.classList.add(status);
    }
    const labelEl = badge.querySelector('.sync-label');
    if (labelEl) labelEl.textContent = label;
}

function updateSyncModalTime() {
    const timeEl = document.getElementById('syncStatusTime');
    if (!timeEl) return;
    if (!lastCloudSyncTime) {
        timeEl.textContent = 'Last synced: Not synced yet';
        return;
    }
    const date = new Date(parseInt(lastCloudSyncTime, 10));
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 10) {
        timeEl.textContent = 'Last synced: Just now';
    } else if (diffSec < 60) {
        timeEl.textContent = `Last synced: ${diffSec}s ago`;
    } else if (diffSec < 3600) {
        timeEl.textContent = `Last synced: ${Math.floor(diffSec / 60)}m ago`;
    } else {
        timeEl.textContent = `Last synced: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}

function openSyncModal() {
    const modal = document.getElementById('syncModal');
    if (modal) {
        updateSyncModalTime();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSyncModal(event) {
    if (event && event.target && event.target !== event.currentTarget && !event.target.classList.contains('topic-sheet-close')) {
        return;
    }
    const modal = document.getElementById('syncModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const fb = document.getElementById('syncModalFeedback');
        if (fb) fb.style.display = 'none';
    }
}

function setModalFeedback(msg, isError = false) {
    const fb = document.getElementById('syncModalFeedback');
    if (!fb) return;
    fb.style.display = 'block';
    fb.style.color = isError ? '#fbbf24' : '#38bdf8';
    fb.style.borderColor = isError ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.3)';
    fb.textContent = msg;
    setTimeout(() => {
        if (fb) fb.style.display = 'none';
    }, 4500);
}

function showToast(msg, icon = '☁️') {
    let toast = document.getElementById('portalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portalToast';
        toast.className = 'portal-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(msg)}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Background GET pull from cloud endpoint
 */
async function pullCloudState(isManual = false) {
    if (isCloudSyncing) return;
    isCloudSyncing = true;
    updateSyncBadge('syncing', 'Syncing...');

    try {
        const response = await fetch(CLOUD_SYNC_ENDPOINT, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const remoteDoc = await response.json();
        const remoteData = (remoteDoc && remoteDoc.data) ? remoteDoc.data : null;

        if (remoteData) {
            const remoteAnswers = remoteData.userAnswers || {};
            const { merged, localChanged, remoteChanged } = smartMergeAnswers(userAnswers, remoteAnswers);

            userAnswers = merged;
            saveUserAnswers();

            if (remoteData.portalState && typeof remoteData.portalState === 'object') {
                const rs = remoteData.portalState;
                if (rs.topicScroll) {
                    portalState.topicScroll = Object.assign({}, rs.topicScroll, portalState.topicScroll);
                }
                if (rs.videosScroll && !portalState.videosScroll) {
                    portalState.videosScroll = rs.videosScroll;
                }
            }

            lastCloudSyncTime = remoteData.updatedAt || Date.now();
            try {
                localStorage.setItem('ise291_last_cloud_sync', String(lastCloudSyncTime));
            } catch (e) {}

            applyAnswersToDOM();
            updateSyncBadge('synced', 'Synced');
            updateSyncModalTime();

            if (isManual) {
                showToast('Progress successfully loaded from cloud!', '⬇️');
                setModalFeedback('Cloud data loaded and merged successfully!');
            }

            if (remoteChanged) {
                scheduleCloudPush(2000);
            }
        } else {
            updateSyncBadge('synced', 'Synced');
        }
    } catch (err) {
        console.warn('Cloud sync pull notice (working in local mode):', err);
        updateSyncBadge('local', 'Saved (Local)');
        if (isManual) {
            setModalFeedback('Working in local storage mode. Progress is saved safely on this device.', false);
        }
    } finally {
        isCloudSyncing = false;
    }
}

/**
 * Background PUT push to cloud endpoint
 */
async function pushCloudState(isManual = false) {
    if (isCloudSyncing) return;
    isCloudSyncing = true;
    updateSyncBadge('syncing', 'Syncing...');

    const solvedCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf')).length;
    const correctCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf') && userAnswers[k].isCorrect).length;

    const payload = {
        name: 'ISE291_0xZHRA_GLOBAL_SYNC',
        data: {
            updatedAt: Date.now(),
            userAnswers: userAnswers,
            portalState: {
                activeTopic: portalState.activeTopic,
                activeTab: portalState.activeTab,
                topicScroll: portalState.topicScroll,
                videosScroll: portalState.videosScroll
            },
            stats: {
                totalAnswered: solvedCount,
                correctCount: correctCount
            }
        }
    };

    try {
        const response = await fetch(CLOUD_SYNC_ENDPOINT, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        lastCloudSyncTime = Date.now();
        try {
            localStorage.setItem('ise291_last_cloud_sync', String(lastCloudSyncTime));
        } catch (e) {}

        updateSyncBadge('synced', 'Synced');
        updateSyncModalTime();

        if (isManual) {
            showToast('Progress saved to cloud!', '⬆️');
            setModalFeedback('Progress auto-saved to cloud successfully!');
        }
    } catch (err) {
        console.warn('Cloud sync push notice (working in local mode):', err);
        updateSyncBadge('local', 'Saved (Local)');
        if (isManual) {
            setModalFeedback('Progress saved locally on this device.', false);
        }
    } finally {
        isCloudSyncing = false;
    }
}

/**
 * Debounced automatic cloud push (1.2s delay)
 */
function scheduleCloudPush(delay = 1200) {
    clearTimeout(cloudPushTimer);
    updateSyncBadge('syncing', 'Syncing...');
    cloudPushTimer = setTimeout(() => {
        pushCloudState(false);
    }, delay);
}

function forceCloudPush(btn) {
    if (btn) btn.disabled = true;
    pushCloudState(true).finally(() => {
        if (btn) btn.disabled = false;
    });
}

function forceCloudPull(btn) {
    if (btn) btn.disabled = true;
    pullCloudState(true).finally(() => {
        if (btn) btn.disabled = false;
    });
}

function copySyncLink(btn) {
    const cleanUrl = window.location.origin + window.location.pathname + '?cloud_sync=1';
    navigator.clipboard.writeText(cleanUrl).then(() => {
        showToast('Sync link copied! Open on your phone to sync.', '📱');
        setModalFeedback('Link copied to clipboard! Open on your phone to synchronize immediately.');
    }).catch(() => {
        prompt('Copy this sync link to your mobile device:', cleanUrl);
    });
}

function exportProgressJSON() {
    const solvedCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf')).length;
    const correctCount = Object.keys(userAnswers).filter(k => !k.includes('_reinf') && userAnswers[k].isCorrect).length;
    const exportData = {
        course: 'KFUPM ISE 291 Midterm Study Portal',
        exportedAt: new Date().toISOString(),
        stats: { solvedCount, correctCount },
        portalState: portalState,
        userAnswers: userAnswers
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ise291_portal_progress_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Progress backup exported!', '📥');
}

function importProgressJSON(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data && data.userAnswers) {
                const { merged } = smartMergeAnswers(userAnswers, data.userAnswers);
                userAnswers = merged;
                saveUserAnswers();
                if (data.portalState && typeof data.portalState === 'object') {
                    if (data.portalState.activeTopic) portalState.activeTopic = data.portalState.activeTopic;
                    if (data.portalState.topicScroll) portalState.topicScroll = Object.assign({}, portalState.topicScroll, data.portalState.topicScroll);
                }
                applyAnswersToDOM();
                scheduleCloudPush(400);
                showToast('Progress imported and synced!', '📤');
                setModalFeedback('Backup successfully imported and synchronized!');
            } else {
                throw new Error('Invalid format');
            }
        } catch (err) {
            alert('Failed to parse backup JSON file. Please ensure it is a valid ISE 291 portal backup.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
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
    scheduleCloudPush(1200);
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

    // Refresh on-page floating anchors
    updateFloatingAnchors();

    scheduleSaveState();
    scheduleCloudPush(1200);
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
            updateBackToTopButton(currentY);
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
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                fetch('/api/state', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(portalState)
                }).catch(() => {});
            }
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

    // 3. Mermaid.js Diagrams (Lazy Initialization & High-Legibility Setup)
    const mermaidNodes = (rootElement && rootElement.querySelectorAll) ? rootElement.querySelectorAll('.mermaid') : [];
    if (mermaidNodes.length > 0 && window.mermaid) {
        try {
            mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'loose',
                theme: 'dark',
                themeVariables: {
                    darkMode: true,
                    background: '#0d1117',
                    primaryColor: '#38bdf8',
                    primaryTextColor: '#f8fafc',
                    primaryBorderColor: '#0284c7',
                    lineColor: '#94a3b8',
                    secondaryColor: '#1e293b',
                    tertiaryColor: '#0f172a',
                    fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
                    fontSize: '16px',
                    nodePadding: '14px'
                },
                flowchart: {
                    htmlLabels: true,
                    curve: 'basis',
                    padding: 16,
                    useMaxWidth: false
                }
            });
            mermaid.run({ nodes: mermaidNodes });
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

    // Setup action bar with Reset button immediately before .q-options-grid
    let actionsBar = qEl.querySelector('.q-actions-bar');
    if (!actionsBar) {
        actionsBar = document.createElement('div');
        actionsBar.className = 'q-actions-bar';
        actionsBar.innerHTML = `
            <span class="q-action-hint">Choose one answer:</span>
            <button class="btn-reset-q" type="button" title="Reset question to try again" aria-label="Reset question">
              <svg class="icon-reset" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <span class="reset-text">Reset</span>
            </button>
        `;
        grid.parentNode.insertBefore(actionsBar, grid);
    }

    const resetBtn = actionsBar.querySelector('.btn-reset-q');
    if (resetBtn) {
        resetBtn.onclick = (e) => {
            if (e) e.stopPropagation();
            delete userAnswers[resolvedQId];
            saveUserAnswers();
            updateExamStats();
            scheduleCloudPush(800);

            // Re-enable all buttons and remove state classes
            const allBtns = grid.querySelectorAll('.portal-opt-btn');
            allBtns.forEach(b => {
                b.disabled = false;
                b.classList.remove('correct', 'incorrect', 'selected');
            });

            // Clear and hide feedback
            if (feedback) {
                feedback.className = 'q-feedback hidden';
                feedback.innerHTML = '';
            }

            // Collapse drill solution accordion if present
            const solWrap = document.getElementById('sol-wrap-' + resolvedQId);
            const solBtn = document.getElementById('btn-toggle-' + resolvedQId);
            if (solWrap) {
                solWrap.style.display = 'none';
                solWrap.classList.remove('open');
            }
            if (solBtn) {
                solBtn.classList.remove('expanded');
                const txt = solBtn.querySelector('.toggle-text');
                if (txt) txt.textContent = 'Show Step-by-Step Solution & Explanation';
            }

            // Collapse exam bank solution accordion if present
            const examSolBody = document.getElementById('sol-' + resolvedQId);
            const examSolBtn = document.getElementById('btn-sol-' + resolvedQId);
            if (examSolBody) {
                examSolBody.classList.remove('open');
            }
            if (examSolBtn) {
                examSolBtn.classList.remove('expanded');
            }

            // Hide status badge if in exam bank
            const statusBadge = document.getElementById('status-' + resolvedQId);
            if (statusBadge) {
                statusBadge.style.display = 'none';
            }

            recalculateDocHeight();
            if (typeof showToast === 'function') {
                showToast('Question reset. Try again!', '↺');
            }
        };
    }

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
        if (keySpan) keySpan.textContent = letters[idx] + ':';

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
            scheduleCloudPush(1200);

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

            // Solution accordion strictly remains collapsed until manually clicked
            recalculateDocHeight();
        };
    });

    // Reveal feedback if already solved (solution accordion strictly remains collapsed until manually clicked)
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
let savedExamPage = 1;
try {
    savedExamPage = parseInt(localStorage.getItem('ise291_exam_page') || '1', 10) || 1;
} catch (e) {}

let savedExamViewMode = 'paginated';
try {
    savedExamViewMode = localStorage.getItem('ise291_exam_view_mode') || 'paginated';
} catch (e) {}

let examBankState = {
    initialized: false,
    activeFilter: 'all',
    searchQuery: '',
    currentPage: savedExamPage,
    pageSize: 5, // Authentic KFUPM exam booklet: 5 questions per physical printed sheet
    viewMode: savedExamViewMode, // 'paginated' (5 qs per sheet) or 'continuous' (all sheets stacked)
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
    examBankState.currentPage = 1;

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
        examBankState.currentPage = 1;

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
    examBankState.currentPage = 1;
    const btnClear = document.getElementById('btnClearSearch');
    if (btnClear) {
        btnClear.style.display = 'none';
    }
    renderExamBank();
}

function setExamPage(pageNumber, skipScroll = false) {
    const totalPages = Math.max(1, Math.ceil((examBankState.filteredQuestions || []).length / examBankState.pageSize));
    const target = Math.max(1, Math.min(pageNumber, totalPages));
    examBankState.currentPage = target;
    try {
        localStorage.setItem('ise291_exam_page', String(target));
    } catch (e) {}
    renderExamBank();
    if (!skipScroll) {
        const stream = document.getElementById('examQuestionsStream') || document.getElementById('videosContainer');
        if (stream) {
            const topY = stream.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top: Math.max(0, topY), behavior: 'smooth' });
        }
    }
}

function prevExamPage() {
    setExamPage(examBankState.currentPage - 1);
}

function nextExamPage() {
    setExamPage(examBankState.currentPage + 1);
}

function jumpToExamPage(val) {
    setExamPage(parseInt(val, 10) || 1);
}

/**
 * Jump to the furthest answered question in the currently active filter/search.
 * Seamlessly adapts to whatever topic or search filter is currently applied.
 */
function jumpToLastAnsweredQuestion() {
    // If not currently in exam bank tab, switch tab first
    if (typeof portalState !== 'undefined' && portalState.activeTab !== 'videos') {
        if (typeof switchTab === 'function') {
            switchTab('videos');
        }
    }

    // Ensure questions data is initialized
    if (!window.QUESTIONS_DATA || !Array.isArray(window.QUESTIONS_DATA)) {
        if (typeof initExamBank === 'function') initExamBank();
        if (typeof loadExamDataAsync === 'function') {
            loadExamDataAsync(() => {
                jumpToLastAnsweredQuestion();
            });
        }
        return;
    }

    const filtered = examBankState.filteredQuestions || [];
    if (filtered.length === 0) {
        if (typeof showToast === 'function') {
            showToast('No questions found in this filter.', 'ℹ');
        }
        return;
    }

    // Inspect filteredQuestions and find all answered questions in userAnswers
    let lastAnsweredIdx = -1;
    let lastAnsweredQ = null;

    filtered.forEach((q, idx) => {
        const qId = q.id || ('Q' + (idx + 1));
        if (userAnswers && userAnswers[qId]) {
            lastAnsweredIdx = idx;
            lastAnsweredQ = q;
        }
    });

    // Helper: focus, center scroll, and add visual pulse highlight to a card
    function focusAndPulseCard(cardId, toastMsg, toastIcon = '🎯') {
        const applyFocus = () => {
            const card = document.getElementById(cardId);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('pulse-focus-target');
                setTimeout(() => {
                    card.classList.remove('pulse-focus-target');
                }, 2500);
            } else {
                // Secondary fallback retry for slower devices or math typesetting
                setTimeout(() => {
                    const retryCard = document.getElementById(cardId);
                    if (retryCard) {
                        retryCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        retryCard.classList.add('pulse-focus-target');
                        setTimeout(() => retryCard.classList.remove('pulse-focus-target'), 2500);
                    }
                }, 140);
            }
        };

        setTimeout(applyFocus, 70);
        if (typeof showToast === 'function') {
            showToast(toastMsg, toastIcon);
        }
    }

    // Scenario A: No questions in the current filter are answered yet
    if (lastAnsweredIdx === -1 || !lastAnsweredQ) {
        const totalAnsweredOverall = Object.keys(userAnswers || {}).filter(k => !k.includes('_reinf')).length;
        const firstQ = filtered[0];
        const firstId = firstQ ? (firstQ.id || 'Q1') : 'Q1';

        if (totalAnsweredOverall > 0) {
            if (examBankState.currentPage !== 1) {
                setExamPage(1, true);
            }
            focusAndPulseCard('card-' + firstId, 'No answered questions in current filter. Jumping to Question 1', 'ℹ');
        } else {
            if (examBankState.currentPage !== 1) {
                setExamPage(1, true);
            }
            focusAndPulseCard('card-' + firstId, 'No questions answered yet. Start with Question 1!', '📝');
        }
        return;
    }

    // Scenario B: Found the furthest answered question in the current filter
    const targetSheet = Math.floor(lastAnsweredIdx / examBankState.pageSize) + 1;
    const targetQId = lastAnsweredQ.id || ('Q' + (lastAnsweredIdx + 1));
    const targetCardId = 'card-' + targetQId;
    const toastMsg = 'Resumed at Question ' + targetQId + ' (Sheet ' + targetSheet + ')';

    if (examBankState.viewMode === 'continuous') {
        examBankState.currentPage = targetSheet;
        try {
            localStorage.setItem('ise291_exam_page', String(targetSheet));
        } catch (e) {}
        document.querySelectorAll('.exam-sheet-select').forEach(sel => {
            sel.value = String(targetSheet);
        });
        focusAndPulseCard(targetCardId, toastMsg, '🎯');
    } else {
        if (examBankState.currentPage !== targetSheet) {
            setExamPage(targetSheet, true);
        }
        focusAndPulseCard(targetCardId, toastMsg, '🎯');
    }
}
window.jumpToLastAnsweredQuestion = jumpToLastAnsweredQuestion;

function toggleExamViewMode(mode) {
    examBankState.viewMode = mode;
    try {
        localStorage.setItem('ise291_exam_view_mode', mode);
    } catch (e) {}
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
    if (loadMoreContainer) loadMoreContainer.style.display = 'none';

    // 1. Filter questions
    const filtered = allQuestions.filter(q => {
        return matchesFilter(q, examBankState.activeFilter) && matchesSearch(q, examBankState.searchQuery);
    });
    examBankState.filteredQuestions = filtered;

    // 2. Update Stats Bar
    updateExamStats();

    const totalFiltered = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / examBankState.pageSize));

    if (examBankState.currentPage > totalPages) examBankState.currentPage = totalPages;
    if (examBankState.currentPage < 1) examBankState.currentPage = 1;

    if (totalFiltered === 0) {
        stream.innerHTML = `
            <div class="exam-paper-sheet" style="text-align: center; padding: 48px 24px;">
                <h3 style="font-size: 19px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">No Exam Questions Found</h3>
                <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">No questions matched the current filter or search criteria. Try choosing "All" or clearing the search bar.</p>
                <button class="btn-sheet-nav" onclick="clearExamSearch(); filterExamBank('all', document.querySelector('.exam-chip[data-filter=\\'all\\']'));">
                    ↺ View All Questions
                </button>
            </div>
        `;
        return;
    }

    // Helper: Build Exam Paper Navigation Dock (Top & Bottom)
    function buildNavDockHtml(isBottom = false) {
        let optionsHtml = '';
        for (let p = 1; p <= totalPages; p++) {
            const selected = p === examBankState.currentPage ? 'selected' : '';
            optionsHtml += `<option value="${p}" ${selected}>Sheet ${p} of ${totalPages}</option>`;
        }
        return `
            <div class="exam-nav-dock ${isBottom ? 'bottom-dock' : 'top-dock'}">
                <div class="exam-nav-left">
                    <button class="btn-sheet-nav" onclick="prevExamPage()" ${examBankState.currentPage <= 1 ? 'disabled' : ''} title="Previous Sheet">
                        &larr; Prev Sheet
                    </button>
                    <div class="exam-sheet-indicator">
                        <span>Sheet</span>
                        <select class="exam-sheet-select" onchange="jumpToExamPage(this.value)" aria-label="Jump to exam sheet">
                            ${optionsHtml}
                        </select>
                        <span>of ${totalPages}</span>
                    </div>
                    <button class="btn-sheet-nav" onclick="nextExamPage()" ${examBankState.currentPage >= totalPages ? 'disabled' : ''} title="Next Sheet">
                        Next Sheet &rarr;
                    </button>
                    <button class="btn-sheet-resume" onclick="jumpToLastAnsweredQuestion()" title="Jump to the last question answered in this filter">
                        🎯 Last Answered
                    </button>
                </div>
                <div class="exam-nav-right">
                    <div class="exam-view-toggle">
                        <button class="btn-view-toggle ${examBankState.viewMode === 'paginated' ? 'active' : ''}" onclick="toggleExamViewMode('paginated')" title="Flip through 5 questions per printed sheet">
                            📄 5 Qs / Sheet
                        </button>
                        <button class="btn-view-toggle ${examBankState.viewMode === 'continuous' ? 'active' : ''}" onclick="toggleExamViewMode('continuous')" title="View complete printed exam booklet continuous sheets">
                            📚 All Sheets
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Helper: Render Single Physical Paper Sheet (Matching Sample_Midterm_Exam.pdf)
    function renderSingleSheetHtml(pageNum, sheetQuestions, startIndex) {
        let sheetHeaderHtml = '';
        if (pageNum === 1) {
            sheetHeaderHtml = `
                <div class="exam-paper-header-cover">
                    <div class="kfupm-banner">
                        <div class="kfupm-uni-name">KING FAHD UNIVERSITY OF PETROLEUM &amp; MINERALS</div>
                        <div class="kfupm-dept-name">Department of Industrial &amp; Systems Engineering</div>
                        <div class="kfupm-course-name">ISE 291: Introduction to Data Science &mdash; Midterm Examination</div>
                    </div>
                    <div class="kfupm-divider-rule"></div>
                    <div class="exam-student-id-box">
                        <div class="student-id-line">
                            <span class="id-field"><strong>Name:</strong> ____________________________________________</span>
                            <span class="id-field"><strong>ID:</strong> __________________</span>
                            <span class="id-field"><strong>Sec:</strong> ______</span>
                        </div>
                    </div>
                    <div class="exam-instructions-bar">
                        <span><strong>Duration:</strong> 90 Minutes</span>
                        <span><strong>Total Questions:</strong> ${totalFiltered}</span>
                        <span><strong>Term:</strong> 241 / 242</span>
                        <span><strong>Exam Paper Bank:</strong> Sample &amp; Past Midterms</span>
                    </div>
                </div>
            `;
        } else {
            sheetHeaderHtml = `
                <div class="exam-paper-running-header">
                    <div class="running-header-left">KING FAHD UNIVERSITY OF PETROLEUM &amp; MINERALS &bull; ISE 291 Midterm Examination</div>
                    <div class="running-header-right">Sheet ${pageNum} of ${totalPages}</div>
                </div>
            `;
        }

        let questionsHtml = '';
        sheetQuestions.forEach((q, idx) => {
            const globalQNum = startIndex + idx + 1;
            const qId = q.id || 'Q' + globalQNum;

            const imgUrl = q.image || (q.images && q.images.length > 0 ? q.images[0] : null);
            const imageBlock = imgUrl ? `
                <div class="exam-q-figure-container">
                    <img src="${escapeHtml(imgUrl)}" alt="Figure for question ${escapeHtml(qId)}" class="exam-q-figure-img" loading="lazy" />
                </div>
            ` : '';

            const codeBlock = q.code ? `
                <div class="exam-q-code-academic">
                    <button class="btn-copy-code-academic" onclick="copyCode(this)" title="Copy Python code">Copy</button>
                    <pre><code class="language-python">${escapeHtml(q.code)}</code></pre>
                </div>
            ` : '';

            const optionsHtml = (q.options || []).map(opt => `
                <button class="portal-opt-btn" data-key="${opt.key}">
                    <span class="opt-key">${opt.key}:</span>
                    <span class="opt-text">${escapeHtml(opt.text)}</span>
                </button>
            `).join('');

            let correctOptText = '';
            (q.options || []).forEach(opt => {
                if (opt.key === q.correctAnswer) correctOptText = opt.text;
            });

            const ansInfo = userAnswers[qId];
            let solvedBadgeClass = '';
            let solvedBadgeText = '';
            let solvedBadgeDisplay = 'none';
            if (ansInfo) {
                solvedBadgeClass = ansInfo.isCorrect ? 'solved-correct' : 'solved-wrong';
                solvedBadgeText = ansInfo.isCorrect ? 'Solved Correct' : 'Attempted';
                solvedBadgeDisplay = 'inline-flex';
            }

            let reinforcementHtml = '';
            if (q.reinforcementQuestion) {
                const rq = q.reinforcementQuestion;
                const rOpts = (rq.options || []).map(ropt => `
                    <button class="portal-opt-btn" data-key="${ropt.key}">
                        <span class="opt-key">${ropt.key}:</span>
                        <span class="opt-text">${escapeHtml(ropt.text)}</span>
                    </button>
                `).join('');

                reinforcementHtml = `
                    <div class="reinforcement-card">
                        <div class="reinforcement-header">&#128161; Concept Reinforcement Drill</div>
                        <div class="exam-q-text"><strong>Q.</strong> ${escapeHtml(rq.questionText)}</div>
                        ${rq.code ? `<div class="exam-q-code-academic"><pre><code class="language-python">${escapeHtml(rq.code)}</code></pre></div>` : ''}
                        <div class="interactive-q" data-correct="${rq.correctAnswer}" data-source="${escapeHtml(q.sourceFile || '')}" data-qid="${qId}_reinf">
                            <div class="q-options-grid">${rOpts}</div>
                            <div class="q-feedback hidden"></div>
                        </div>
                    </div>
                `;
            }

            questionsHtml += `
                <div class="exam-q-block" id="card-${qId}">
                    <div class="exam-q-stamp-bar">
                        <span class="exam-q-stamp">#${globalQNum}</span>
                        <span class="exam-q-stamp">ID: ${escapeHtml(qId)}</span>
                        <span class="exam-q-stamp">${escapeHtml(q.topic || 'General')}</span>
                        <span class="exam-q-stamp">${escapeHtml(q.sourceFile || 'Sample Midterm')}</span>
                        <span class="badge-solved-status ${solvedBadgeClass}" id="status-${qId}" style="display: ${solvedBadgeDisplay};">${solvedBadgeText}</span>
                    </div>

                    <div class="exam-q-text">
                        <strong class="exam-q-num">Q ${globalQNum}.</strong> ${escapeHtml(q.questionText)}
                    </div>

                    ${imageBlock}

                    ${codeBlock}

                    <div class="interactive-q" data-correct="${q.correctAnswer}" data-source="${escapeHtml(q.sourceFile || '')}" data-qid="${qId}">
                        <div class="q-options-grid">
                            ${optionsHtml}
                        </div>
                        <div class="q-feedback hidden"></div>
                    </div>

                    <!-- Collapsible Step-by-Step Solution & Marking Rubric -->
                    <button class="exam-accordion-toggle" id="btn-sol-${qId}" onclick="toggleExamSolution('${qId}')">
                        <span class="toggle-label"><span class="chevron">&blacktriangleright;</span> Show Official Solution &amp; Marking Rubric</span>
                    </button>
                    <div class="exam-solution-body" id="sol-${qId}">
                        <div class="box-ans">
                            <div class="ans-mini-label">Verified Correct Option</div>
                            <div class="ans-content"><strong>Option (${q.correctAnswer}):</strong> ${escapeHtml(correctOptText)}</div>
                        </div>
                        <div class="box-sol">
                            <div class="sol-mini-label">Step-by-Step Marking Rubric &amp; Distractor Analysis</div>
                            <div class="sol-content">${formatExplanation(q.explanation)}</div>
                        </div>
                        ${reinforcementHtml}
                    </div>
                </div>
            `;
        });

        return `
            <div class="exam-paper-sheet" id="sheet-page-${pageNum}" data-sheet="${pageNum}">
                ${sheetHeaderHtml}
                <div class="exam-sheet-questions-flow">
                    ${questionsHtml}
                </div>
                <div class="exam-paper-footer">
                    <div class="footer-left">ISE 291 Midterm Examination</div>
                    <div class="footer-center">&mdash; Page ${pageNum} &mdash;</div>
                    <div class="footer-right">Page ${pageNum} of ${totalPages}</div>
                </div>
            </div>
        `;
    }

    let sheetsOutputHtml = '';
    if (examBankState.viewMode === 'continuous') {
        // Continuous mode: render all sheets stacked
        for (let p = 1; p <= totalPages; p++) {
            const startIdx = (p - 1) * examBankState.pageSize;
            const sliceQs = filtered.slice(startIdx, startIdx + examBankState.pageSize);
            sheetsOutputHtml += renderSingleSheetHtml(p, sliceQs, startIdx);
        }
    } else {
        // Paginated mode: render current sheet only (5 questions per sheet)
        const startIdx = (examBankState.currentPage - 1) * examBankState.pageSize;
        const sliceQs = filtered.slice(startIdx, startIdx + examBankState.pageSize);
        sheetsOutputHtml = renderSingleSheetHtml(examBankState.currentPage, sliceQs, startIdx);
    }

    stream.innerHTML = buildNavDockHtml(false) + sheetsOutputHtml + buildNavDockHtml(true);

    // Initialize interactivity and math/code on rendered questions
    initInteractiveQuestions(stream);
    initStemRenderers(stream);
    recalculateDocHeight();
}

function loadMoreExamQuestions() {
    nextExamPage();
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

    // Check if any answered questions exist in examBankState.filteredQuestions
    const answeredInFilter = filtered.filter(q => {
        const qId = q.id;
        return qId && userAnswers[qId];
    });
    const hasAnsweredInFilter = answeredInFilter.length > 0;

    const resumeBtn = document.getElementById('btnResumeLastAnswered');
    if (resumeBtn) {
        if (hasAnsweredInFilter) {
            resumeBtn.classList.remove('no-answers');
            const lastQ = answeredInFilter[answeredInFilter.length - 1];
            resumeBtn.setAttribute('title', `Jump to last answered question (${lastQ.id}) in this filter`);
        } else {
            resumeBtn.classList.add('no-answers');
            resumeBtn.setAttribute('title', 'No questions answered in this filter yet. Click to jump to Question 1');
        }
    }

    document.querySelectorAll('.btn-sheet-resume').forEach(btn => {
        if (hasAnsweredInFilter) {
            btn.classList.remove('no-answers');
            const lastQ = answeredInFilter[answeredInFilter.length - 1];
            btn.setAttribute('title', `Jump to last answered question (${lastQ.id}) in this filter`);
        } else {
            btn.classList.add('no-answers');
            btn.setAttribute('title', 'No questions answered in this filter yet. Click to jump to Question 1');
        }
    });
}

function resetUserAnswers() {
    if (confirm("Reset all saved answer choices across all questions? This will allow you to practice the entire portal again from scratch.")) {
        userAnswers = {};
        try {
            localStorage.removeItem('ise291_user_answers');
        } catch (e) {}
        scheduleCloudPush(500);

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

    // 4. Initialize floating anchors menu & scroll spy
    initFloatingAnchors();

    // 5. Background pre-fetch of exam bank after idle
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => { loadExamDataAsync(); }, { timeout: 3500 });
    } else {
        setTimeout(() => { loadExamDataAsync(); }, 2500);
    }

    // 6. Background server sync (localhost dev only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        fetch('/api/state')
            .then(r => {
                if (!r.ok) throw new Error('Not available');
                return r.json();
            })
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
    }

    // 7. Multi-device Cloud Progress Sync initialization
    try {
        lastCloudSyncTime = localStorage.getItem('ise291_last_cloud_sync');
    } catch (e) {}
    updateSyncBadge('local', 'Saved (Local)');
    updateSyncModalTime();

    // Check if opened with ?cloud_sync=1 or ?sync=1
    const urlSync = urlParams.get('cloud_sync') || urlParams.get('sync') || urlParams.get('pull');
    if (urlSync) {
        pullCloudState(true);
    } else {
        pullCloudState(false);
    }
});

/**
 * ==========================================================================
 * Floating Anchors Menu & Accessibility Quick Jump
 * ==========================================================================
 */
let sectionObserver = null;
let currentActiveAnchorId = null;

function toggleFloatingAnchors(forceState) {
    const panel = document.getElementById('floatingAnchorsPanel');
    const btn = document.getElementById('btnToggleAnchors');
    if (!panel) return;

    const isOpen = (typeof forceState === 'boolean') ? forceState : !panel.classList.contains('open');
    if (isOpen) {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        if (btn) btn.setAttribute('aria-expanded', 'true');
        // Scroll active item into view if exists
        const activeItem = panel.querySelector('.anchor-nav-item.active');
        if (activeItem) {
            setTimeout(() => activeItem.scrollIntoView({ block: 'nearest' }), 60);
        }
    } else {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    toggleFloatingAnchors(false);
}

function updateBackToTopButton(currentY) {
    const btnTop = document.getElementById('btnScrollToTop');
    if (btnTop) {
        if (currentY > 300) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    }
}

function setActiveAnchor(cardId) {
    if (!cardId || cardId === currentActiveAnchorId) return;
    currentActiveAnchorId = cardId;

    const list = document.getElementById('floatingAnchorsList');
    if (list) {
        list.querySelectorAll('.anchor-nav-item').forEach(item => {
            if (item.getAttribute('data-anchor-id') === cardId) {
                item.classList.add('active');
                const panel = document.getElementById('floatingAnchorsPanel');
                if (panel && panel.classList.contains('open')) {
                    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            } else {
                item.classList.remove('active');
            }
        });
    }

    const badge = document.getElementById('floatingAnchorsCurrentBadge');
    if (badge) {
        const activeItem = document.querySelector(`#floatingAnchorsList .anchor-nav-item[data-anchor-id="${cardId}"]`);
        if (activeItem) {
            const shortBadge = activeItem.querySelector('.anchor-badge');
            if (shortBadge) {
                badge.textContent = shortBadge.textContent.trim();
            }
        }
    }
}

function setupAnchorScrollSpy(activeContainer) {
    if (sectionObserver) {
        sectionObserver.disconnect();
        sectionObserver = null;
    }
    if (!activeContainer || !('IntersectionObserver' in window)) return;

    const cards = activeContainer.querySelectorAll('.section-card');
    if (!cards || cards.length === 0) return;

    const nav = document.querySelector('.top-nav-bar');
    const navHeight = nav ? nav.offsetHeight : 62;

    sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveAnchor(entry.target.id);
            }
        });
    }, {
        root: null,
        rootMargin: `-${navHeight + 20}px 0px -60% 0px`,
        threshold: 0
    });

    cards.forEach(card => sectionObserver.observe(card));
}

function updateFloatingAnchors() {
    const list = document.getElementById('floatingAnchorsList');
    const titleEl = document.getElementById('floatingAnchorsTopicTitle');
    const countEl = document.getElementById('floatingAnchorsCount');
    const badgeEl = document.getElementById('floatingAnchorsCurrentBadge');
    if (!list) return;

    list.innerHTML = '';

    if (portalState.activeTab === 'notes') {
        const activePage = document.getElementById('page-' + portalState.activeTopic);
        if (!activePage) return;

        const topicName = topicLabels[portalState.activeTopic] || 'Topic Outline';
        if (titleEl) titleEl.textContent = topicName;

        const cards = activePage.querySelectorAll('.section-card');
        if (countEl) countEl.textContent = `${cards.length} sections`;

        let conceptIdx = 0;
        let drillIdx = 0;

        cards.forEach((card, idx) => {
            const isDrill = card.classList.contains('drill-card') || card.querySelector('.tag-q') !== null;
            let badgeText = '';
            let badgeClass = '';

            if (isDrill) {
                drillIdx++;
                badgeText = `D${drillIdx}`;
                badgeClass = 'badge-drill';
            } else {
                conceptIdx++;
                badgeText = `§${conceptIdx}`;
                badgeClass = 'badge-concept';
            }

            const cardTitleEl = card.querySelector('.card-title');
            let rawTitle = cardTitleEl ? cardTitleEl.textContent.trim() : (isDrill ? `Practice Drill ${drillIdx}` : `Concept ${conceptIdx}`);
            let cleanTitle = rawTitle.replace(/^\d+\.\s*/, '').replace(/^Practice Drill\s*\d+:\s*/i, '');

            const btn = document.createElement('button');
            btn.className = 'anchor-nav-item' + (idx === 0 ? ' active' : '');
            btn.id = 'anchor-item-' + card.id;
            btn.setAttribute('data-anchor-id', card.id);
            btn.setAttribute('aria-label', `Jump to ${rawTitle}`);
            btn.innerHTML = `<span class="anchor-badge ${badgeClass}">${badgeText}</span><span class="anchor-label">${escapeHtml(cleanTitle)}</span>`;
            btn.onclick = () => {
                teleportTo(card.id);
                toggleFloatingAnchors(false);
            };
            list.appendChild(btn);

            if (idx === 0) {
                if (badgeEl) badgeEl.textContent = badgeText;
                currentActiveAnchorId = card.id;
            }
        });

        setupAnchorScrollSpy(activePage);
    } else {
        // Past Exam Bank
        if (titleEl) titleEl.textContent = 'Past Exam Bank';
        if (countEl) countEl.textContent = 'Quick Navigation';
        if (badgeEl) badgeEl.textContent = 'Exam';

        const examSections = [
            { id: 'videosContainer', label: 'Search & Topic Filters', badge: '🔍', class: 'badge-concept' },
            { id: 'examQuestionsStream', label: 'Questions Stream', badge: '📝', class: 'badge-drill' },
            { id: 'examLoadMoreContainer', label: 'Load More Questions', badge: '📥', class: 'badge-concept' }
        ];

        examSections.forEach((sec, idx) => {
            const btn = document.createElement('button');
            btn.className = 'anchor-nav-item' + (idx === 0 ? ' active' : '');
            btn.id = 'anchor-item-' + sec.id;
            btn.setAttribute('data-anchor-id', sec.id);
            btn.setAttribute('aria-label', `Jump to ${sec.label}`);
            btn.innerHTML = `<span class="anchor-badge ${sec.class}">${sec.badge}</span><span class="anchor-label">${escapeHtml(sec.label)}</span>`;
            btn.onclick = () => {
                teleportTo(sec.id);
                toggleFloatingAnchors(false);
            };
            list.appendChild(btn);
        });

        const examContainer = document.getElementById('videosContainer');
        if (examContainer) setupAnchorScrollSpy(examContainer);
    }
}

function initFloatingAnchors() {
    let nav = document.getElementById('floatingAnchorsNav');
    if (!nav) {
        nav = document.createElement('nav');
        nav.id = 'floatingAnchorsNav';
        nav.className = 'floating-anchors-nav';
        nav.setAttribute('aria-label', 'On-page anchors navigation');
        nav.innerHTML = `
            <div id="floatingAnchorsPanel" class="floating-anchors-panel" aria-hidden="true" role="dialog" aria-labelledby="floatingAnchorsTopicTitle">
                <div class="floating-anchors-header">
                    <div class="floating-anchors-title">
                        <svg class="anchor-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        <span id="floatingAnchorsTopicTitle">Topic Outline</span>
                    </div>
                    <button id="btnCloseAnchors" class="btn-close-anchors" aria-label="Close outline menu" onclick="toggleFloatingAnchors(false)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="floating-anchors-subheading">
                    <span id="floatingAnchorsCount" class="anchors-count-badge">0 sections</span>
                    <button class="anchors-top-btn" onclick="scrollToTop()" title="Scroll to top of topic">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                        <span>Top</span>
                    </button>
                </div>
                <div id="floatingAnchorsList" class="floating-anchors-list" role="list"></div>
            </div>
            <div class="floating-anchors-controls">
                <button id="btnScrollToTop" class="floating-fab btn-back-to-top" aria-label="Scroll to top of page" onclick="scrollToTop()" title="Back to top">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </button>
                <button id="btnToggleAnchors" class="floating-fab btn-anchors-toggle" aria-label="Toggle on-page anchors outline" aria-expanded="false" onclick="toggleFloatingAnchors()" title="Table of Contents Quick Jump">
                    <svg class="icon-outline" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="12" x2="14" y2="12"></line>
                        <line x1="4" y1="18" x2="18" y2="18"></line>
                    </svg>
                    <span class="fab-text">Outline</span>
                    <span id="floatingAnchorsCurrentBadge" class="fab-active-chip">§1</span>
                </button>
            </div>
        `;
        document.body.appendChild(nav);
    }

    // Keyboard & Click-Outside listeners
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            toggleFloatingAnchors(false);
        }
    });

    document.addEventListener('click', (e) => {
        const panel = document.getElementById('floatingAnchorsPanel');
        const navEl = document.getElementById('floatingAnchorsNav');
        if (panel && panel.classList.contains('open') && navEl && !navEl.contains(e.target)) {
            toggleFloatingAnchors(false);
        }
    });

    updateFloatingAnchors();
}
