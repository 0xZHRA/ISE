# ISE 291 Interactive Question Bank

Interactive Question Bank web application built for KFUPM **ISE 291: Introduction to Data Science** (Term 261).

## Content & Scope
- **Strict Question Bank Focus**: Displays exclusively the questions extracted from the course `.zip` archive.
- **Internal Categorization Reference**: The syllabus and lecture materials are used purely internally to classify all 251 questions into topics and map source filenames. No syllabus or lecture slides are published.
- **Syllabus Topic Categorization**:
  - `Topic 1: Introduction to Data Science`
  - `Topic 2: Python Review`
  - `Topic 3: Basic Statistics`
  - `Topic 4: Structured Data and Visualization`
  - `Topic 5: Data Understanding and Preparation`
- **Total Questions**: **251 questions** across 8 source documents with 100% answer keys and explanations.

## Hosting & Uptime Architecture
- **Free High-Availability Hosting**: Hosted on GitHub Pages with Fastly Edge CDN, comfortably serving 5–10 concurrent users with zero latency.
- **Always-On Configuration**: Static edge distribution eliminates cold boots and sleep-after-inactivity limits common to free compute dynos.

## Expiration & Shutdown Policy
- **Active Window**: Runs continuously until **Wednesday, October 14, 2026 at 9:00 PM AST (21:00 GMT+0300)**.
- **Client-Side Lockout**: Automatically triggers a lockdown overlay, clears question bank data from memory, and displays an archived service tombstone upon reaching the deadline.
- **Automated Repository Shutdown**: An automated GitHub Actions workflow (`shutdown.yml`) is scheduled to execute at `18:00 UTC` (21:00 AST) to replace `index.html` with a permanent termination notice and purge question assets.
