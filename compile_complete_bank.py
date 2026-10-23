import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

WEB_APP_DIR = r"c:\Users\acer\Desktop\Automation\etc files\web_app"
ORIGINAL_JSON = os.path.join(WEB_APP_DIR, "questions.json")

# Import make_reinforcement from build_full_portal_bank
sys.path.append(WEB_APP_DIR)
from build_full_portal_bank import make_reinforcement

with open(ORIGINAL_JSON, "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} base questions.")

# 1. Enrich all existing questions with reinforcement drills and clear sourceFile tags
for q in questions:
    if not q.get("reinforcementQuestion"):
        q["reinforcementQuestion"] = make_reinforcement(q)
    if not q.get("sourceFile"):
        q["sourceFile"] = "Official KFUPM Question Bank"

# 2. Add New Verified Questions from Term 251 Quizzes & Past Midterms
new_questions = [
    # Term 251 Quiz 1
    {
        "id": "Q251-Q1-1",
        "topic": "Topic 3: Basic Statistics",
        "category": "Hypothesis Testing & Distribution",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "questionText": "Which of the following statements is INCORRECT regarding statistical testing and data dispersion?",
        "code": None,
        "options": [
            {"key": "A", "text": "If P-value is greater than 0.05, then we can reject the null hypothesis."},
            {"key": "B", "text": "P-value is the probability or evidence value of observing data as extreme under the null hypothesis."},
            {"key": "C", "text": "Shapiro-Wilk test assumes that the sample is obtained from data that follows a normal distribution."},
            {"key": "D", "text": "Variance is a type of measure of dispersion of a data."}
        ],
        "correctAnswer": "A",
        "explanation": "Statement A is FALSE. When P-value > 0.05, there is insufficient evidence to reject the null hypothesis, so we FAIL to reject H0. Statement B, C, and D are all standard, correct definitions.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In statistical hypothesis testing, if our significance level is alpha = 0.05 and the calculated p-value is 0.012, what should we conclude?",
            "code": None,
            "options": [
                {"key": "A", "text": "Reject the null hypothesis (statistically significant)"},
                {"key": "B", "text": "Fail to reject the null hypothesis"},
                {"key": "C", "text": "Accept the null hypothesis as proven truth"},
                {"key": "D", "text": "The test is inconclusive because p < 0.05"}
            ],
            "correctAnswer": "A",
            "explanation": "Since p-value (0.012) <= alpha (0.05), we reject the null hypothesis H0 in favor of the alternative hypothesis."
        }
    },
    {
        "id": "Q251-Q1-2",
        "topic": "Topic 2: Python Review",
        "category": "List Comprehensions & Loops",
        "sourceFile": "Quiz1_Key_251.pdf",
        "questionText": "Identify the correct output of the following list comprehension:",
        "code": "result = [x if x % 2 != 0 else x**3 for x in range(1, 11)]\nprint(result)",
        "options": [
            {"key": "A", "text": "[1, 8, 3, 64, 5, 216, 7, 512, 9, 1000]"},
            {"key": "B", "text": "[1, 6, 3, 12, 5, 18, 7, 24, 9, 30]"},
            {"key": "C", "text": "[1, 2, 27, 4, 125, 6, 343, 8, 729, 10]"},
            {"key": "D", "text": "[1, 8, 3, 64, 5, 216, 7, 512, 9, 1000, 11]"}
        ],
        "correctAnswer": "A",
        "explanation": "For each number from 1 to 10: odd numbers (1, 3, 5, 7, 9) remain unchanged; even numbers (2, 4, 6, 8, 10) are cubed (2^3=8, 4^3=64, 6^3=216, 8^3=512, 10^3=1000). The resulting list is [1, 8, 3, 64, 5, 216, 7, 512, 9, 1000].",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the output of `[x**2 if x % 2 == 1 else x for x in [1, 2, 3, 4]]`?",
            "code": "[x**2 if x % 2 == 1 else x for x in [1, 2, 3, 4]]",
            "options": [
                {"key": "A", "text": "[1, 2, 9, 4]"},
                {"key": "B", "text": "[1, 4, 9, 16]"},
                {"key": "C", "text": "[2, 2, 6, 4]"},
                {"key": "D", "text": "[1, 2, 3, 4]"}
            ],
            "correctAnswer": "A",
            "explanation": "For 1 (odd): 1^2 = 1. For 2 (even): 2. For 3 (odd): 3^2 = 9. For 4 (even): 4. Thus [1, 2, 9, 4]."
        }
    },
    {
        "id": "Q251-Q1-3",
        "topic": "Topic 3: Basic Statistics",
        "category": "Central Tendency",
        "sourceFile": "Quiz1_Key_251.pdf",
        "questionText": "What are the three fundamental measures of central tendency in data analysis?",
        "code": None,
        "options": [
            {"key": "A", "text": "Mean, median, and mode"},
            {"key": "B", "text": "Range, interquartile range, and variance"},
            {"key": "C", "text": "Mean, variance, and standard deviation"},
            {"key": "D", "text": "Range, variance, and standard deviation"}
        ],
        "correctAnswer": "A",
        "explanation": "Central tendency refers to the central or typical value for a probability distribution. The three canonical measures are Mean (arithmetic average), Median (middle value), and Mode (most frequent value).",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which measure of centrality is most appropriate for qualitative/categorical data (e.g. eye color)?",
            "code": None,
            "options": [
                {"key": "A", "text": "Mode"},
                {"key": "B", "text": "Mean"},
                {"key": "C", "text": "Median"},
                {"key": "D", "text": "Variance"}
            ],
            "correctAnswer": "A",
            "explanation": "Categorical data has no arithmetic or numerical ordering, so mean and median cannot be computed; only the mode (most common category) is defined."
        }
    },
    {
        "id": "Q251-Q1-6",
        "topic": "Topic 2: Python Review",
        "category": "NumPy Array Manipulation",
        "sourceFile": "Quiz1_Key_251.pdf",
        "questionText": "Which of the following statements regarding NumPy splitting and joining is INCORRECT?",
        "code": None,
        "options": [
            {"key": "A", "text": ".hsplit() method is used for breaking/splitting the array row wise."},
            {"key": "B", "text": ".concatenate() function is used to join two or more arrays of the same shape."},
            {"key": "C", "text": ".vstack() can be used for row wise joining (vertical stacking)."},
            {"key": "D", "text": ".hstack() can be used for column wise joining (horizontal stacking)."}
        ],
        "correctAnswer": "A",
        "explanation": "`.hsplit()` splits an array horizontally (column-wise along axis 1), NOT row-wise. Row-wise splitting is done using `.vsplit()`.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: To stack two 1D arrays `a = [1, 2]` and `b = [3, 4]` vertically to create a 2x2 matrix, which function is used?",
            "code": "np.vstack((a, b))",
            "options": [
                {"key": "A", "text": "np.vstack()"},
                {"key": "B", "text": "np.hstack()"},
                {"key": "C", "text": "np.hsplit()"},
                {"key": "D", "text": "np.split()"}
            ],
            "correctAnswer": "A",
            "explanation": "`np.vstack()` stacks arrays vertically (row by row)."
        }
    },
    # Term 251 Quiz 2
    {
        "id": "Q251-Q2-1",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Pandas Data Sorting",
        "sourceFile": "Quiz2_Key_251.pdf",
        "questionText": "A data analyst wants to sort a pandas DataFrame by column 'c1' in descending order, and in case of ties in 'c1', sort by 'c2' in ascending order. Which code snippet correctly achieves this?",
        "code": None,
        "options": [
            {"key": "A", "text": "df.sort_values(by=['c1', 'c2'], ascending=[False, True], inplace=True)"},
            {"key": "B", "text": "df.sort_values(by=['c1'], ascending=False).sort_values(by=['c2'], ascending=True, inplace=True)"},
            {"key": "C", "text": "df.sort_values(by=['c1', 'c2'], ascending=False, inplace=True)"},
            {"key": "D", "text": "df.sort_values(by=['c1', 'c2'], ascending=[True, False], inplace=True)"}
        ],
        "correctAnswer": "A",
        "explanation": "Passing lists to both `by` and `ascending` parameters allows multi-column hierarchical sorting with customized sort orders per column: `ascending=[False, True]` sorts 'c1' descending and 'c2' ascending.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In pandas, what does `df.sort_values(by='Score', ascending=False)` do?",
            "code": None,
            "options": [
                {"key": "A", "text": "Sorts the DataFrame by 'Score' from highest to lowest"},
                {"key": "B", "text": "Sorts the DataFrame by 'Score' from lowest to highest"},
                {"key": "C", "text": "Sorts the column headers alphabetically"},
                {"key": "D", "text": "Filters out rows with missing scores"}
            ],
            "correctAnswer": "A",
            "explanation": "`ascending=False` specifies descending order (highest values first)."
        }
    },
    {
        "id": "Q251-Q2-2",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Data Normalization (Min-Max Scaling)",
        "sourceFile": "Quiz2_Key_251.pdf",
        "questionText": "Given the dataset D = [1, 3, 5, 7, 9], what is the median of the data after converting it using Min-Max scaling to the interval [0, 1]?",
        "code": "D = [1, 3, 5, 7, 9]\n# Formula: (x - min) / (max - min)",
        "options": [
            {"key": "A", "text": "0.5"},
            {"key": "B", "text": "1.0"},
            {"key": "C", "text": "0.0"},
            {"key": "D", "text": "0.75"}
        ],
        "correctAnswer": "A",
        "explanation": "Here min = 1, max = 9, so denominator = 9 - 1 = 8. The median of D is 5. Scaled median = (5 - 1) / (9 - 1) = 4 / 8 = 0.5.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For dataset [10, 20, 30, 40, 50], what is the Min-Max scaled value of x = 30 in [0, 1]?",
            "code": "(x - x_min) / (x_max - x_min)",
            "options": [
                {"key": "A", "text": "0.5"},
                {"key": "B", "text": "0.3"},
                {"key": "C", "text": "0.6"},
                {"key": "D", "text": "0.75"}
            ],
            "correctAnswer": "A",
            "explanation": "(30 - 10) / (50 - 10) = 20 / 40 = 0.5."
        }
    },
    {
        "id": "Q251-Q2-8",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Categorical Encoding (One-Hot Encoding)",
        "sourceFile": "Quiz2_Key_251.pdf",
        "questionText": "A DataFrame initially contains 9 columns, including one categorical column named 'job'. After mapping 'job' values into 3 distinct categories ('C1', 'C2', 'C3'), the code `df = pd.get_dummies(df, columns=['job'], drop_first=True)` is executed. How many columns will the DataFrame contain in total?",
        "code": "df = pd.get_dummies(df, columns=['job'], drop_first=True)",
        "options": [
            {"key": "A", "text": "10"},
            {"key": "B", "text": "9"},
            {"key": "C", "text": "11"},
            {"key": "D", "text": "12"}
        ],
        "correctAnswer": "A",
        "explanation": "Original columns: 9. The 'job' column has 3 unique categories. When one-hot encoding with `drop_first=True`, 3 - 1 = 2 dummy columns are created, and the original 'job' column is replaced. Total columns = (9 - 1) + 2 = 10.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: A DataFrame has 5 columns, including 'City' with 4 unique cities. If `pd.get_dummies(df, columns=['City'], drop_first=False)` is used, how many columns will the result have?",
            "code": None,
            "options": [
                {"key": "A", "text": "8"},
                {"key": "B", "text": "7"},
                {"key": "C", "text": "9"},
                {"key": "D", "text": "4"}
            ],
            "correctAnswer": "A",
            "explanation": "(5 - 1) + 4 = 8 columns."
        }
    },
    {
        "id": "Q251-Q2-9",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Pandas DataFrame Inspection",
        "sourceFile": "Quiz2_Key_251.pdf",
        "questionText": "In pandas, what information is provided by `df.info()` as compared to `df.describe()`?",
        "code": None,
        "options": [
            {"key": "A", "text": "Data types, non-null counts, and memory usage for all columns"},
            {"key": "B", "text": "Five-number summary (mean, std, quartiles) for numerical columns"},
            {"key": "C", "text": "Correlation matrix across all numeric features"},
            {"key": "D", "text": "The first 5 rows of the DataFrame"}
        ],
        "correctAnswer": "A",
        "explanation": "`df.info()` prints a concise summary of the DataFrame: column index, column names, non-null value counts, data types (dtype), and memory usage. `df.describe()` computes statistical summaries (mean, std, min, percentiles).",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which pandas method provides summary statistics (count, mean, std, min, 25%, 50%, 75%, max) for numeric columns?",
            "code": None,
            "options": [
                {"key": "A", "text": "df.describe()"},
                {"key": "B", "text": "df.info()"},
                {"key": "C", "text": "df.head()"},
                {"key": "D", "text": "df.shape"}
            ],
            "correctAnswer": "A",
            "explanation": "`df.describe()` generates descriptive statistics."
        }
    },
    # Term 223 Midterm Exam Questions
    {
        "id": "M223-Q1",
        "topic": "Topic 1: Introduction to Data Science",
        "category": "Big Data & Data Science Process",
        "sourceFile": "223_Midterm_Exam.pdf",
        "questionText": "Which V of Big Data addresses the trustworthiness, quality, and cleanliness of incoming data streams?",
        "code": None,
        "options": [
            {"key": "A", "text": "Veracity"},
            {"key": "B", "text": "Velocity"},
            {"key": "C", "text": "Volume"},
            {"key": "D", "text": "Variety"}
        ],
        "correctAnswer": "A",
        "explanation": "Veracity refers to data quality, cleanliness, reliability, and trustworthiness. Velocity is data arrival speed, Volume is scale/size, and Variety is structural diversity.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In Big Data, streaming sensor readings arriving in real-time at milliseconds intervals primarily illustrate which V?",
            "code": None,
            "options": [
                {"key": "A", "text": "Velocity"},
                {"key": "B", "text": "Veracity"},
                {"key": "C", "text": "Volume"},
                {"key": "D", "text": "Value"}
            ],
            "correctAnswer": "A",
            "explanation": "Velocity refers to the speed at which new data is generated and must be processed."
        }
    },
    {
        "id": "M223-Q2",
        "topic": "Topic 3: Basic Statistics",
        "category": "Boxplots & Outliers",
        "sourceFile": "223_Midterm_Exam.pdf",
        "questionText": "In a Tukey boxplot, how are the upper and lower outlier cutoff thresholds (inner fences) determined?",
        "code": None,
        "options": [
            {"key": "A", "text": "Lower: Q1 - 1.5*IQR; Upper: Q3 + 1.5*IQR"},
            {"key": "B", "text": "Lower: Mean - 2*Std; Upper: Mean + 2*Std"},
            {"key": "C", "text": "Lower: Q1 - 3*IQR; Upper: Q3 + 3*IQR"},
            {"key": "D", "text": "Lower: Minimum value; Upper: Maximum value"}
        ],
        "correctAnswer": "A",
        "explanation": "Tukey's standard rule uses 1.5 times the Interquartile Range (IQR = Q3 - Q1) subtracted from Q1 for the lower inner fence and added to Q3 for the upper inner fence.",
        "images": [],
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If Q1 = 20 and Q3 = 50, what is the upper outlier boundary?",
            "code": "IQR = 50 - 20 = 30\nUIF = Q3 + 1.5 * IQR",
            "options": [
                {"key": "A", "text": "95"},
                {"key": "B", "text": "80"},
                {"key": "C", "text": "110"},
                {"key": "D", "text": "65"}
            ],
            "correctAnswer": "A",
            "explanation": "IQR = 50 - 20 = 30. Upper fence = 50 + 1.5 * 30 = 50 + 45 = 95."
        }
    }
]

# Check existing IDs
existing_ids = set(q["id"] for q in questions)
added_count = 0
for nq in new_questions:
    if nq["id"] not in existing_ids:
        questions.append(nq)
        added_count += 1

print(f"Added {added_count} new questions. Total bank size: {len(questions)}")

# Write to questions.json
with open(ORIGINAL_JSON, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

# Write to questions_data.js for direct frontend browser use
JS_FILE = os.path.join(WEB_APP_DIR, "questions_data.js")
with open(JS_FILE, "w", encoding="utf-8") as f:
    f.write("// Auto-generated unified question bank\n")
    f.write("window.QUESTION_BANK = ")
    json.dump(questions, f, ensure_ascii=False)
    f.write(";\n")

print(f"Successfully compiled questions.json ({os.path.getsize(ORIGINAL_JSON)} bytes) and questions_data.js ({os.path.getsize(JS_FILE)} bytes).")
