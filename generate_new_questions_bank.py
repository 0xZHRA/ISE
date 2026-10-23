# generate_new_questions_bank.py
# Formats all verified questions from Term 251 quizzes, official midterms, and MCQ packs.

import json

NEW_QUESTIONS = [
    # =========================================================================
    # QUIZ 1 - TERM 251 (Quiz1_Key_251.pdf)
    # =========================================================================
    {
        "id": "Q1-251-1",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Term 251 Quiz 1",
        "questionText": "Which of the following statements is incorrect?",
        "code": None,
        "options": [
            {"key": "A", "text": "If P-value is greater than 0.05, then we can reject the null hypothesis."},
            {"key": "B", "text": "P-value is the confidence or probability value of the null hypothesis."},
            {"key": "C", "text": "Shapiro–Wilk test assumes that the sample was obtained from data that follows normal distribution."},
            {"key": "D", "text": "Variance is a type of measure of dispersion of a data."}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In hypothesis testing (Topic 3: Inferential Statistics), the decision rule comparing the P-value to significance level $\\alpha = 0.05$ states:\n- If $P\\text{-value} \\le 0.05$, we **reject** the null hypothesis $H_0$.\n- If $P\\text{-value} > 0.05$, we **fail to reject** (do not reject) the null hypothesis $H_0$.\n\n**Distractor Analysis**:\n- **Statement A is false (hence the correct answer)** because a P-value greater than 0.05 means there is insufficient evidence to reject the null hypothesis.\n- **Statement B, C, and D** are all accurate statistical statements.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: A researcher tests for normality using the Shapiro-Wilk test and obtains a P-value of 0.18 (with $\\alpha = 0.05$). What is the correct conclusion?",
            "code": None,
            "options": [
                {"key": "A", "text": "Fail to reject the null hypothesis; data can be assumed to follow a normal distribution"},
                {"key": "B", "text": "Reject the null hypothesis; data is definitely non-normal"},
                {"key": "C", "text": "The test is inconclusive"},
                {"key": "D", "text": "Sample variance must equal zero"}
            ],
            "correctAnswer": "A",
            "explanation": "In the Shapiro-Wilk test, $H_0$ is that the data is normally distributed. Since $P = 0.18 > 0.05$, we fail to reject $H_0$, meaning the assumption of normality holds."
        }
    },
    {
        "id": "Q1-251-2",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "Identify the correct output of the following code:",
        "code": "List1 = [x**3 if x%2==0 else x for x in range(1,11)]\nprint(List1)",
        "options": [
            {"key": "A", "text": "[1, 8, 3, 64, 5, 216, 7, 512, 9, 1000]"},
            {"key": "B", "text": "[1, 6, 3, 12, 5, 18, 7, 24, 9, 30]"},
            {"key": "C", "text": "[1, 2, 27, 4, 125, 6, 343, 8, 729, 10]"},
            {"key": "D", "text": "[1, 8, 3, 64, 5, 216, 7, 512, 9, 1000, 11]"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Python list comprehension with inline if-else syntax `[expr1 if condition else expr2 for x in iterable]` evaluates every item. `range(1, 11)` produces numbers 1 through 10.\n\n**Step-by-Step Walkthrough**:\n- For even $x$ ($x\\%2 == 0$), calculate $x^3$: $2^3=8$, $4^3=64$, $6^3=216$, $8^3=512$, $10^3=1000$.\n- For odd $x$, return $x$: 1, 3, 5, 7, 9.\n- Combining in order: `[1, 8, 3, 64, 5, 216, 7, 512, 9, 1000]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the output of `[x**2 if x % 2 != 0 else 0 for x in range(1, 6)]`?",
            "code": "[x**2 if x % 2 != 0 else 0 for x in range(1, 6)]",
            "options": [
                {"key": "A", "text": "[1, 0, 9, 0, 25]"},
                {"key": "B", "text": "[0, 4, 0, 16, 0]"},
                {"key": "C", "text": "[1, 4, 9, 16, 25]"},
                {"key": "D", "text": "[1, 0, 9, 0]"}
            ],
            "correctAnswer": "A",
            "explanation": "`range(1, 6)` produces `1, 2, 3, 4, 5`. For odd numbers (1, 3, 5), $x^2$ is 1, 9, 25. For even numbers (2, 4), the result is 0. Thus `[1, 0, 9, 0, 25]`."
        }
    },
    {
        "id": "Q1-251-3",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Term 251 Quiz 1",
        "questionText": "The three common measures of centrality of data are:",
        "code": None,
        "options": [
            {"key": "A", "text": "Mean, median, and mode."},
            {"key": "B", "text": "Range, interquartile range, and variance."},
            {"key": "C", "text": "Mean, variance, and standard deviation."},
            {"key": "D", "text": "Range, variance, and standard deviation."}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Summary statistics are categorized into:\n1. **Measures of Central Tendency (Centrality)**: Mean, Median, and Mode.\n2. **Measures of Dispersion (Spread)**: Range, Interquartile Range (IQR), Variance, and Standard Deviation.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which of the following is a measure of dispersion (spread), NOT centrality?",
            "code": None,
            "options": [
                {"key": "A", "text": "Standard Deviation"},
                {"key": "B", "text": "Mean"},
                {"key": "C", "text": "Median"},
                {"key": "D", "text": "Mode"}
            ],
            "correctAnswer": "A",
            "explanation": "Standard deviation measures the spread of observations around the mean, while mean, median, and mode reflect central location."
        }
    },
    {
        "id": "Q1-251-4",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Term 251 Quiz 1",
        "questionText": "Identify the correct output of the following code:",
        "code": "import numpy as np\ndata = list(range(1, 10))\nx, y, z = np.percentile(data, [25, 50, 75])\nL = np.array((x, y, z))\nprint(L)",
        "options": [
            {"key": "A", "text": "[3. 5. 7.]"},
            {"key": "B", "text": "[4. 6. 8.]"},
            {"key": "C", "text": "[2. 5. 8.]"},
            {"key": "D", "text": "[3. 6. 8.]"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: `range(1, 10)` generates `[1, 2, 3, 4, 5, 6, 7, 8, 9]`. With 9 data points:\n- 25th percentile ($Q_1$) is 3.\n- 50th percentile (Median, $Q_2$) is 5.\n- 75th percentile ($Q_3$) is 7.\nHence `np.percentile` returns `[3., 5., 7.]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For the dataset `[1, 2, 3, 4, 5, 6, 7, 8, 9]`, what is the Interquartile Range (IQR)?",
            "code": None,
            "options": [
                {"key": "A", "text": "4"},
                {"key": "B", "text": "2"},
                {"key": "C", "text": "6"},
                {"key": "D", "text": "8"}
            ],
            "correctAnswer": "A",
            "explanation": "$IQR = Q_3 - Q_1 = 7 - 3 = 4$."
        }
    },
    {
        "id": "Q1-251-5",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "Identify the correct output of the following code:",
        "code": "import numpy as np\na = np.array([[1,2,3],[0,1,4]])\nb = np.zeros((2,3), dtype=np.int16)\nc = np.ones((2,3), dtype=np.int16)\nd = a + b + c\nprint(d[1,2])",
        "options": [
            {"key": "A", "text": "5"},
            {"key": "B", "text": "2"},
            {"key": "C", "text": "6"},
            {"key": "D", "text": "7"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Element-wise array addition in NumPy.\n- `a[1, 2] = 4` (row index 1, col index 2).\n- `b[1, 2] = 0` (all zeros).\n- `c[1, 2] = 1` (all ones).\n- `d[1, 2] = a[1,2] + b[1,2] + c[1,2] = 4 + 0 + 1 = 5`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For the same arrays `a, b, c`, what is the value of `d[0, 1]`?",
            "code": None,
            "options": [
                {"key": "A", "text": "3"},
                {"key": "B", "text": "2"},
                {"key": "C", "text": "4"},
                {"key": "D", "text": "1"}
            ],
            "correctAnswer": "A",
            "explanation": "`a[0, 1] = 2`, `b[0, 1] = 0`, `c[0, 1] = 1`. Sum $= 2 + 0 + 1 = 3$."
        }
    },
    {
        "id": "Q1-251-6",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "Which of the following statements is incorrect?",
        "code": None,
        "options": [
            {"key": "A", "text": ".hsplit() method is used for breaking/splitting the array row wise."},
            {"key": "B", "text": ".concatenate() function is used to join two or more arrays of the same shape."},
            {"key": "C", "text": ".vstack() can be used for row wise joining."},
            {"key": "D", "text": ".hstack() can be used for column wise joining."}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In NumPy:\n- `.hsplit()` splits an array **horizontally** (i.e. column-wise).\n- `.vsplit()` splits an array **vertically** (i.e. row-wise).\nTherefore, stating that `.hsplit()` splits row-wise is incorrect (making option A the correct answer).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which NumPy function is used to split a 2D array vertically into rows?",
            "code": None,
            "options": [
                {"key": "A", "text": "np.vsplit()"},
                {"key": "B", "text": "np.hsplit()"},
                {"key": "C", "text": "np.split_rows()"},
                {"key": "D", "text": "np.dsplit()"}
            ],
            "correctAnswer": "A",
            "explanation": "`np.vsplit()` splits an array vertically along the row axis (`axis=0`)."
        }
    },
    {
        "id": "Q1-251-7",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Term 251 Quiz 1",
        "questionText": "To test if the means of two independent samples are significantly different, which test should be implemented, assuming the data is normally distributed?",
        "code": None,
        "options": [
            {"key": "A", "text": "Student’s t-test"},
            {"key": "B", "text": "Mann-Whitney U-test"},
            {"key": "C", "text": "Shapiro–Wilk test"},
            {"key": "D", "text": "Any of the other three options given can be used"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Parametric vs non-parametric tests:\n- When samples are independent and follow a **normal distribution**, comparing their means requires **Student's t-test**.\n- If normality fails, the non-parametric **Mann-Whitney U-test** is used.\n- The **Shapiro-Wilk test** is used solely to test normality, not mean difference.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which statistical test is used if the data fails the normality assumption when comparing two independent groups?",
            "code": None,
            "options": [
                {"key": "A", "text": "Mann-Whitney U-test (non-parametric)"},
                {"key": "B", "text": "Student's t-test"},
                {"key": "C", "text": "Z-score normalization"},
                {"key": "D", "text": "Chi-Square Goodness of Fit"}
            ],
            "correctAnswer": "A",
            "explanation": "When the assumption of normality is violated, the non-parametric Mann-Whitney U-test is used to compare the distributions of two independent samples."
        }
    },
    {
        "id": "Q1-251-8",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "In order to sort the elements of each column in a 2d NumPy array, we set the axis = ___, and to sort the elements of each row, we set the axis = ___ respectively?",
        "code": None,
        "options": [
            {"key": "A", "text": "one, zero"},
            {"key": "B", "text": "zero, one"},
            {"key": "C", "text": "zero, zero"},
            {"key": "D", "text": "one, one"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: In NumPy:\n- `axis=0` refers to column-wise operations (downward along rows).\n- `axis=1` refers to row-wise operations (across columns).\nThus, column-wise sort uses `axis=0`, and row-wise sort uses `axis=1`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: To calculate the mean of each column across all rows in a 2D NumPy array `arr`, which code should you execute?",
            "code": None,
            "options": [
                {"key": "A", "text": "np.mean(arr, axis=0)"},
                {"key": "B", "text": "np.mean(arr, axis=1)"},
                {"key": "C", "text": "np.mean(arr, axis=None)"},
                {"key": "D", "text": "arr.mean_columns()"}
            ],
            "correctAnswer": "A",
            "explanation": "`np.mean(arr, axis=0)` compresses across rows to compute the column-wise averages."
        }
    },
    {
        "id": "Q1-251-9",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "Identify the correct output of the following code:",
        "code": "numbers = [2, 3, 4, 5, 6]\nUniqDict = dict(zip(numbers, map((lambda x: x**2), numbers)))\nprint(UniqDict)",
        "options": [
            {"key": "A", "text": "{2: 4, 3: 9, 4: 16, 5: 25, 6: 36}"},
            {"key": "B", "text": "{2: 4, 3: 9, 4: 16, 5: 25}"},
            {"key": "C", "text": "{1: 4, 2: 9, 3: 16, 4: 25, 5: 36}"},
            {"key": "D", "text": "{0: 4, 1: 9, 2: 16, 3: 25, 4: 36}"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: `map((lambda x: x**2), numbers)` squares each element: `[4, 9, 16, 25, 36]`. `zip(numbers, ...)` pairs each number with its square: `(2, 4), (3, 9), (4, 16), (5, 25), (6, 36)`. Passing this into `dict()` builds `{2: 4, 3: 9, 4: 16, 5: 25, 6: 36}`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `dict(zip(['a', 'b'], [1, 2]))` return?",
            "code": None,
            "options": [
                {"key": "A", "text": "{'a': 1, 'b': 2}"},
                {"key": "B", "text": "[('a', 1), ('b', 2)]"},
                {"key": "C", "text": "{'a', 1, 'b', 2}"},
                {"key": "D", "text": "{1: 'a', 2: 'b'}"}
            ],
            "correctAnswer": "A",
            "explanation": "`dict(zip(keys, values))` creates a dictionary mapping keys to values: `{'a': 1, 'b': 2}`."
        }
    },
    {
        "id": "Q1-251-10",
        "sourceFile": "Quiz1_Key_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "Identify the correct output of the following code:",
        "code": "import numpy as np\na = np.ones((2, 3), dtype='int')\nb = np.arange(3, dtype='int')\nprint(a + b)",
        "options": [
            {"key": "A", "text": "[[1, 2, 3],\n [1, 2, 3]]"},
            {"key": "B", "text": "[[1, 2, 3]]"},
            {"key": "C", "text": "[1, 2, 3]"},
            {"key": "D", "text": "[[2, 3, 4],\n [2, 3, 4]]"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: NumPy broadcasting rules.\n- `a` has shape (2, 3) with all ones: `[[1, 1, 1], [1, 1, 1]]`.\n- `b = np.arange(3)` has shape (3,) with values `[0, 1, 2]`.\n- `b` is broadcast across the rows of `a`: `[1+0, 1+1, 1+2]` for each row, resulting in `[[1, 2, 3], [1, 2, 3]]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What will be the output of `np.zeros((2, 2)) + np.array([5, 10])`?",
            "code": None,
            "options": [
                {"key": "A", "text": "[[5., 10.],\n [5., 10.]]"},
                {"key": "B", "text": "[[5., 5.],\n [10., 10.]]"},
                {"key": "C", "text": "[5., 10.]"},
                {"key": "D", "text": "Error: dimension mismatch"}
            ],
            "correctAnswer": "A",
            "explanation": "Broadcasting expands `[5, 10]` across both rows of the $2 \\times 2$ zero matrix."
        }
    },

    # =========================================================================
    # QUIZ 1 - SECTION 04 (Sol_Quiz1_ISE291_S04_251.pdf)
    # =========================================================================
    {
        "id": "Q1-S04-1",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "What is the output of the following code:",
        "code": "Fruits = ['Apple', 'Kiwi', 'Banana', 'Watermelon', 'Dates']\nFruits2 = sorted(Fruits, reverse=True)\nlength = [len(v) for v in Fruits2]\nZipZap = list(zip(Fruits2, length))\nprint(ZipZap)",
        "options": [
            {"key": "A", "text": "[(Watermelon, 10), (Kiwi, 4), (Dates, 5), (Banana, 6), (Apple, 5)]"},
            {"key": "B", "text": "[('Apple', 5), ('Banana', 6), ('Dates', 5), ('Kiwi', 4), ('Watermelon', 10)]"},
            {"key": "C", "text": "[('Watermelon'=10), ('Kiwi'=4), ('Dates'=5), ('Banana'=6), ('Apple'=5)]"},
            {"key": "D", "text": "[('Watermelon', 10), ('Kiwi', 4), ('Dates', 5), ('Banana', 6), ('Apple', 5)]"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: `sorted(..., reverse=True)` sorts strings in reverse alphabetical order (Z to A):\n1. 'Watermelon' (len 10)\n2. 'Kiwi' (len 4)\n3. 'Dates' (len 5)\n4. 'Banana' (len 6)\n5. 'Apple' (len 5)\n`zip` combines them into tuples with string quotes preserved: `[('Watermelon', 10), ('Kiwi', 4), ('Dates', 5), ('Banana', 6), ('Apple', 5)]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the first tuple in `list(zip(sorted(['Cat', 'Dog', 'Bear']), [1, 2, 3]))`?",
            "code": None,
            "options": [
                {"key": "A", "text": "('Bear', 1)"},
                {"key": "B", "text": "('Cat', 1)"},
                {"key": "C", "text": "('Dog', 1)"},
                {"key": "D", "text": "(1, 'Bear')"}
            ],
            "correctAnswer": "A",
            "explanation": "`sorted(['Cat', 'Dog', 'Bear'])` produces `['Bear', 'Cat', 'Dog']`. The first pair is `('Bear', 1)`."
        }
    },
    {
        "id": "Q1-S04-3",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "What is the output of the following code:",
        "code": "import numpy as np\nx2 = np.array([[7, 6, 1], [2, 5, 8], [3, 4, 9]])\nprint(x2[0,0], x2[1,2], x2[2,-1], x2[-2,-3])",
        "options": [
            {"key": "A", "text": "7 8 2 9"},
            {"key": "B", "text": "8 7 9 2"},
            {"key": "C", "text": "7 8 9 2"},
            {"key": "D", "text": "7 9 8 2"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: 2D array positive and negative indexing:\n- `x2[0, 0]` = row 0, col 0 = 7.\n- `x2[1, 2]` = row 1, col 2 = 8.\n- `x2[2, -1]` = row 2, last col = 9.\n- `x2[-2, -3]` = second from bottom row (row 1), first col (col 0) = 2.\nResult printed: `7 8 9 2`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For the same array `x2`, what is `x2[-1, 0]`?",
            "code": None,
            "options": [
                {"key": "A", "text": "3"},
                {"key": "B", "text": "7"},
                {"key": "C", "text": "9"},
                {"key": "D", "text": "2"}
            ],
            "correctAnswer": "A",
            "explanation": "`x2[-1, 0]` accesses the last row (row 2) and first column (col 0), which is 3."
        }
    },
    {
        "id": "Q1-S04-7",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Term 251 Quiz 1",
        "questionText": "What is the output of the following code:",
        "code": "import numpy as np\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\nmask = (x > 4) & (x < 8)\nprint(x[mask] % 2)",
        "options": [
            {"key": "A", "text": "array([0, 1, 0], dtype=int32)"},
            {"key": "B", "text": "array([1, 0, 1], dtype=int32)"},
            {"key": "C", "text": "array([1, 1, 1], dtype=int32)"},
            {"key": "D", "text": "array([0, 0, 0], dtype=int32)"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: Boolean masking and vectorized modulo:\n1. `(x > 4) & (x < 8)` filters strictly between 4 and 8: values `[5, 6, 7]`.\n2. `x[mask] % 2` calculates modulo 2 for each: $5\\%2 = 1$, $6\\%2 = 0$, $7\\%2 = 1$.\nResult: `array([1, 0, 1])`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `x[(x >= 2) & (x <= 4)]` return for `x = np.arange(6)`?",
            "code": None,
            "options": [
                {"key": "A", "text": "array([2, 3, 4])"},
                {"key": "B", "text": "array([2, 3])"},
                {"key": "C", "text": "array([3, 4])"},
                {"key": "D", "text": "array([1, 2, 3, 4])"}
            ],
            "correctAnswer": "A",
            "explanation": "Inclusive bounds `>= 2` and `<= 4` select 2, 3, and 4."
        }
    },
    {
        "id": "Q1-S04-10",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 1",
        "questionText": "What is the output of the following code:",
        "code": "import numpy as np\nimport matplotlib.pyplot as plt\nSubj = ['M', 'P', 'C', 'P', 'P', 'P', 'C', 'P', 'M', 'P', 'M', 'P', 'P', 'M', 'P', 'P', 'C', 'C', 'M', 'C']\nsubj_labels, subj_counts = np.unique(Subj, return_counts=True)\nplt.figure(figsize=(4,4))\nplt.pie(subj_counts, labels=subj_labels, autopct='%.2f%%')\nplt.show()",
        "options": [
            {"key": "A", "text": "A Pie chart with 30%, 30% and 40% sectors"},
            {"key": "B", "text": "A Pie chart with 35%, 35% and 30% sectors"},
            {"key": "C", "text": "A Pie chart with 50%, 25% and 25% sectors"},
            {"key": "D", "text": "A Pie chart with 3 equal sectors"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: Categorical frequency breakdown:\nTotal count = 20.\n- 'P' appears 10 times: $10 / 20 = 50\\%$.\n- 'M' appears 5 times: $5 / 20 = 25\\%$.\n- 'C' appears 5 times: $5 / 20 = 25\\%$.\nTherefore, the pie chart displays sectors of 50%, 25%, and 25%.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `autopct='%.1f%%'` format a proportion of 0.2546 as?",
            "code": None,
            "options": [
                {"key": "A", "text": "25.5%"},
                {"key": "B", "text": "25.46%"},
                {"key": "C", "text": "0.3%"},
                {"key": "D", "text": "25%"}
            ],
            "correctAnswer": "A",
            "explanation": "`autopct` multiplies by 100 to show percentages and `%.1f` rounds to 1 decimal place: 25.5%."
        }
    },
    {
        "id": "Q1-S04-14",
        "sourceFile": "Sol_Quiz1_ISE291_S04_251.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Term 251 Quiz 1",
        "questionText": "The Upper Whisker limit in a standard boxplot is computed by (where IQR is the interquartile range):",
        "code": None,
        "options": [
            {"key": "A", "text": "Q3 + 1.5 * IQR"},
            {"key": "B", "text": "Q3 + 2.5 * IQR"},
            {"key": "C", "text": "Q3 - 1.5 * IQR"},
            {"key": "D", "text": "Q1 + 1.5 * IQR"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Standard Tukey boxplot whisker boundaries:\n- Upper Whisker Limit $= Q_3 + 1.5 \\times IQR$\n- Lower Whisker Limit $= Q_1 - 1.5 \\times IQR$\nPoints beyond these limits are designated as outliers.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the formula for the Lower Whisker Limit in a boxplot?",
            "code": None,
            "options": [
                {"key": "A", "text": "Q1 - 1.5 * IQR"},
                {"key": "B", "text": "Q1 + 1.5 * IQR"},
                {"key": "C", "text": "Q3 - 1.5 * IQR"},
                {"key": "D", "text": "Median - 1.5 * IQR"}
            ],
            "correctAnswer": "A",
            "explanation": "Lower Whisker Limit is $Q_1 - 1.5 \\times IQR$."
        }
    },

    # =========================================================================
    # QUIZ 2 - TERM 251 (Quiz2_Key_251.pdf / Key_Quiz2.pdf)
    # =========================================================================
    {
        "id": "Q2-251-2",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "When using `loc` for slicing a DataFrame `df`, then the code `df.loc[1:4, 'c1':'c5']` outputs:",
        "code": "df.loc[1:4, 'c1':'c5']",
        "options": [
            {"key": "A", "text": "Rows 1 to 4 (inclusive) and columns c1 to c5 (inclusive)"},
            {"key": "B", "text": "Rows 2 to 5 (exclusive) and columns c1 to c5 (exclusive)"},
            {"key": "C", "text": "Rows 2 to 5 (inclusive) and columns 2 to 5 (exclusive)"},
            {"key": "D", "text": "Rows 1 to 4 (exclusive) and columns c1 to c5 (inclusive)"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Unlike Python integer slicing or `iloc`, Pandas `.loc` is **label-based** and is always **inclusive** of both the start and stop boundaries for both rows and columns.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How many columns does `df.loc[:, 'A':'C']` select if the DataFrame columns are `['A', 'B', 'C', 'D']`?",
            "code": None,
            "options": [
                {"key": "A", "text": "3 ('A', 'B', and 'C')"},
                {"key": "B", "text": "2 ('A' and 'B')"},
                {"key": "C", "text": "4 (all columns)"},
                {"key": "D", "text": "1 ('C' only)"}
            ],
            "correctAnswer": "A",
            "explanation": "Because `.loc` is inclusive, `'A':'C'` includes `'A'`, `'B'`, and `'C'` (3 columns)."
        }
    },
    {
        "id": "Q2-251-3",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "Which of the following statements are correct about One Hot Encoding?\nI. It can convert Nominal variables to numeric.\nII. It can convert Ordinal variables to numerical variables.",
        "code": None,
        "options": [
            {"key": "A", "text": "I, II both"},
            {"key": "B", "text": "I only"},
            {"key": "C", "text": "II only"},
            {"key": "D", "text": "Neither I nor II"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: One Hot Encoding creates binary indicator (0/1) columns for every category. It can be applied to both **nominal** (unordered categorical, e.g. color) and **ordinal** (ordered categorical, e.g. education levels) to transform them into numeric representation.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which encoding technique preserves the natural rank order of ordinal data (e.g. Low=0, Medium=1, High=2)?",
            "code": None,
            "options": [
                {"key": "A", "text": "Ordinal / Label Encoding"},
                {"key": "B", "text": "One-Hot Encoding"},
                {"key": "C", "text": "Min-Max Scaling"},
                {"key": "D", "text": "Standard Scaling"}
            ],
            "correctAnswer": "A",
            "explanation": "Ordinal / Label encoding assigns increasing integer values to preserve order."
        }
    },
    {
        "id": "Q2-251-4",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "The purpose of the 'hue' parameter in the Seaborn library is:",
        "code": None,
        "options": [
            {"key": "A", "text": "To group/differentiate data based on a categorical variable."},
            {"key": "B", "text": "To control the background color of the plot."},
            {"key": "C", "text": "To group data based on a continuous numerical variable."},
            {"key": "D", "text": "To adjust the transparency of the plot."}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In Seaborn plotting functions (`scatterplot`, `boxplot`, `histplot`), `hue` specifies a column whose distinct categorical values will be mapped to different colors to group and distinguish subsets.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which parameter in Seaborn controls the visual transparency of data points?",
            "code": None,
            "options": [
                {"key": "A", "text": "alpha"},
                {"key": "B", "text": "hue"},
                {"key": "C", "text": "palette"},
                {"key": "D", "text": "style"}
            ],
            "correctAnswer": "A",
            "explanation": "`alpha` takes a float between 0 (fully transparent) and 1 (fully opaque)."
        }
    },
    {
        "id": "Q2-251-6",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "To get the labels of rows where a column value is greater than 121, we use:",
        "code": None,
        "options": [
            {"key": "A", "text": "df.loc[df['column'] > 121].index"},
            {"key": "B", "text": "df.iloc[df['column'] > 121].index"},
            {"key": "C", "text": "df.iloc[df['column'] > 121].column"},
            {"key": "D", "text": "df.loc[df['column'] > 121].column"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: `df.loc[boolean_condition]` filters matching rows by label; appending `.index` extracts the index labels of those rows. `.iloc` expects integer indices and throws an error when indexed with a boolean Series with labels.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `df[df['age'] >= 18].shape[0]` return?",
            "code": None,
            "options": [
                {"key": "A", "text": "The number of rows where age is at least 18"},
                {"key": "B", "text": "The number of columns in the DataFrame"},
                {"key": "C", "text": "The average age of adults"},
                {"key": "D", "text": "The maximum age"}
            ],
            "correctAnswer": "A",
            "explanation": "`.shape[0]` returns the number of rows in the filtered DataFrame."
        }
    },
    {
        "id": "Q2-251-9",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "Assume a DataFrame contains 10 columns and one of them is a categorical attribute with title 'job'. Assume we run the following code:\n\njob_mapping = {'unemployed':'C1', 'self-employed':'C1', 'student':'C1', 'retired':'C1',\n               'services':'C2', 'blue-collar':'C2', 'technician':'C2', 'housemaid':'C2',\n               'management':'C3', 'entrepreneur':'C3', 'admin.':'C3'}\ndf['job'] = df['job'].map(job_mapping)\ndf = pd.get_dummies(df, columns=['job'], drop_first=True)\n\nThe total number of columns in the dataframe df will now be:",
        "code": "job_mapping = {'unemployed':'C1', 'self-employed':'C1', 'student':'C1', 'retired':'C1',\n               'services':'C2', 'blue-collar':'C2', 'technician':'C2', 'housemaid':'C2',\n               'management':'C3', 'entrepreneur':'C3', 'admin.':'C3'}\ndf['job'] = df['job'].map(job_mapping)\ndf = pd.get_dummies(df, columns=['job'], drop_first=True)",
        "options": [
            {"key": "A", "text": "12"},
            {"key": "B", "text": "10"},
            {"key": "C", "text": "11"},
            {"key": "D", "text": "13"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: Step-by-step column arithmetic:\n1. Initially: 10 columns.\n2. The mapping groups the categories into exactly 3 unique values: 'C1', 'C2', and 'C3'.\n3. `pd.get_dummies` with `columns=['job']` drops the original 'job' column ($10 - 1 = 9$ remaining columns).\n4. With 3 unique categories and `drop_first=True`, $3 - 1 = 2$ dummy columns are added.\n5. Total columns $= 9 + 2 = 11$.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If a DataFrame has 8 columns and you apply `pd.get_dummies(df, columns=['dept'], drop_first=False)` where 'dept' has 4 categories, how many columns will the result have?",
            "code": None,
            "options": [
                {"key": "A", "text": "11"},
                {"key": "B", "text": "12"},
                {"key": "C", "text": "10"},
                {"key": "D", "text": "8"}
            ],
            "correctAnswer": "A",
            "explanation": "Original columns $- 1$ ('dept') $= 7$. Add 4 dummy columns (since `drop_first=False`): $7 + 4 = 11$."
        }
    },
    {
        "id": "Q2-251-11",
        "sourceFile": "Quiz2_Key_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "Identify the correct line of input code for a scatterplot showing Q1 on the x-axis, Q2 on the y-axis, and marker points whose sizes vary according to 'AVG':",
        "code": None,
        "options": [
            {"key": "A", "text": "sns.scatterplot(x='Q1', y='Q2', size='AVG', data=df)"},
            {"key": "B", "text": "sns.scatterplot(x='Q1', y='Q2', hue='AVG', data=df)"},
            {"key": "C", "text": "sns.swarmplot(x='Q1', y='Q2', hue='AVG', data=df)"},
            {"key": "D", "text": "sns.swarmplot(x='Q1', y='Q2', size='AVG', data=df)"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In Seaborn `scatterplot`, point sizing according to a continuous or grouped variable is controlled via the `size` parameter (whereas `hue` controls point color).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which Seaborn function creates a categorical scatter plot that adjusts points along the categorical axis so they don't overlap?",
            "code": None,
            "options": [
                {"key": "A", "text": "sns.swarmplot()"},
                {"key": "B", "text": "sns.histplot()"},
                {"key": "C", "text": "sns.lineplot()"},
                {"key": "D", "text": "sns.pairplot()"}
            ],
            "correctAnswer": "A",
            "explanation": "`sns.swarmplot` prevents overlapping points to show distribution density cleanly."
        }
    },

    # =========================================================================
    # QUIZ 2 - SECTION 04 (Sol_Quiz2_ISE291_S04_251.pdf)
    # =========================================================================
    {
        "id": "Q2-S04-1",
        "sourceFile": "Sol_Quiz2_ISE291_S04_251.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "How many rows/columns will be printed by the last statement of the given code below?",
        "code": "import pandas as pnd\nS1 = pnd.DataFrame([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]], index=['a', 'b', 'c', 'd'])\nprint(S1.loc[:, 2:3])",
        "options": [
            {"key": "A", "text": "One column"},
            {"key": "B", "text": "Two columns"},
            {"key": "C", "text": "One row"},
            {"key": "D", "text": "Two rows"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: When a DataFrame is created without column names, default column names are integer labels `0, 1, 2, 3`. In `.loc[:, 2:3]`, label-based slicing includes both endpoint labels 2 and 3. Since `:` selects all 4 rows and columns 2 and 3, it outputs all rows with **Two columns**.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If you ran `S1.iloc[:, 2:3]` on the same DataFrame, how many columns would be returned?",
            "code": None,
            "options": [
                {"key": "A", "text": "One column (index 2 only)"},
                {"key": "B", "text": "Two columns (indices 2 and 3)"},
                {"key": "C", "text": "Three columns"},
                {"key": "D", "text": "Zero columns"}
            ],
            "correctAnswer": "A",
            "explanation": "`.iloc[:, 2:3]` uses Python slice conventions (stop is exclusive), returning only column index 2 (1 column)."
        }
    },
    {
        "id": "Q2-S04-7",
        "sourceFile": "Sol_Quiz2_ISE291_S04_251.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "What is the effect of the following code:\n\nfrom sklearn.preprocessing import StandardScaler\nscaler2 = StandardScaler()\nscaler2.fit(df[['balance']])\ndf['balance'] = scaler2.transform(df[['balance']])",
        "code": "from sklearn.preprocessing import StandardScaler\nscaler2 = StandardScaler()\nscaler2.fit(df[['balance']])\ndf['balance'] = scaler2.transform(df[['balance']])",
        "options": [
            {"key": "A", "text": "Normalize 'balance' data with mean 0 and standard deviation 1"},
            {"key": "B", "text": "Normalize 'balance' data strictly between 0 and 1"},
            {"key": "C", "text": "Find minimum and maximum values of the data"},
            {"key": "D", "text": "Sort the data in ascending order"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: `StandardScaler` calculates the sample mean $\\mu$ and standard deviation $\\sigma$, and transforms each value via $z = \\frac{x - \\mu}{\\sigma}$. The transformed variable has a **mean of 0** and a **standard deviation of 1**.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which scaler rescales data to a bounded interval between [0, 1]?",
            "code": None,
            "options": [
                {"key": "A", "text": "MinMaxScaler"},
                {"key": "B", "text": "StandardScaler"},
                {"key": "C", "text": "RobustScaler"},
                {"key": "D", "text": "Normalizer"}
            ],
            "correctAnswer": "A",
            "explanation": "`MinMaxScaler` maps the minimum value to 0 and maximum value to 1."
        }
    },
    {
        "id": "Q2-S04-8",
        "sourceFile": "Sol_Quiz2_ISE291_S04_251.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "The following code will:\n\nselected_cols = df.select_dtypes(include='number').columns\ndf[selected_cols] = df[selected_cols].applymap(lambda x: x if x >= 0 else abs(x))",
        "code": "selected_cols = df.select_dtypes(include='number').columns\ndf[selected_cols] = df[selected_cols].applymap(lambda x: x if x >= 0 else abs(x))",
        "options": [
            {"key": "A", "text": "Compute absolute value of all values"},
            {"key": "B", "text": "Compute absolute value of all positive values"},
            {"key": "C", "text": "Make all the values negative"},
            {"key": "D", "text": "Replace negative values by their absolute values"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: The lambda function `x if x >= 0 else abs(x)` leaves positive numbers unchanged and takes the absolute value `abs(x)` of negative numbers, replacing negative values by their positive magnitude.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `df['score'].clip(lower=0)` do?",
            "code": None,
            "options": [
                {"key": "A", "text": "Sets any value less than 0 to 0"},
                {"key": "B", "text": "Deletes negative rows"},
                {"key": "C", "text": "Converts negative values to positive"},
                {"key": "D", "text": "Calculates variance"}
            ],
            "correctAnswer": "A",
            "explanation": "`clip(lower=0)` caps values at 0, replacing any negative number with 0."
        }
    },

    # =========================================================================
    # QUIZ 3 (Quiz3_Sample.pdf)
    # =========================================================================
    {
        "id": "Q3-SAMPLE-1",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 3",
        "questionText": "The Gradient Descent method for Linear Regression is:",
        "code": None,
        "options": [
            {"key": "A", "text": "A machine learning algorithm for the recognition of classes"},
            {"key": "B", "text": "An algorithm for finding the minimum of an error function"},
            {"key": "C", "text": "A method for calculating the correlation coefficient"},
            {"key": "D", "text": "A technique for feature selection in regression models"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: Gradient Descent is an iterative optimization algorithm used to minimize the cost/loss function (Mean Squared Error) by taking steps proportional to the negative of the gradient.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What hyperparameter controls the step size taken in each iteration of Gradient Descent?",
            "code": None,
            "options": [
                {"key": "A", "text": "Learning rate (alpha)"},
                {"key": "B", "text": "Number of clusters"},
                {"key": "C", "text": "Degree of polynomial"},
                {"key": "D", "text": "Correlation coefficient"}
            ],
            "correctAnswer": "A",
            "explanation": "The learning rate $\\alpha$ scales the gradient vector to determine how large a step is taken toward the minimum."
        }
    },
    {
        "id": "Q3-SAMPLE-2",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 3",
        "questionText": "Which of the following statements is/are TRUE about PCA (Principal Component Analysis)?\nI. All the principal components are ranked randomly regardless of how much variation they can capture.\nII. It projects data onto a lower dimensional linear space.\nIII. The FIRST principal component gives the maximum variation on the principal direction.\nIV. All principal components are orthogonal to each other.",
        "code": None,
        "options": [
            {"key": "A", "text": "III and IV only"},
            {"key": "B", "text": "I, II, III and IV"},
            {"key": "C", "text": "II, III and IV only"},
            {"key": "D", "text": "I and II only"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: PCA Properties:\n- It projects data to lower dimensions (II is True).\n- PC1 accounts for the greatest variance in the data (III is True).\n- All PCs are mutually orthogonal / perpendicular (IV is True).\n- Statement I is False because PCs are ordered strictly in descending order of explained variance.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How much correlation exists between any two distinct Principal Components in PCA?",
            "code": None,
            "options": [
                {"key": "A", "text": "Zero (they are completely uncorrelated/orthogonal)"},
                {"key": "B", "text": "1.0 (perfect correlation)"},
                {"key": "C", "text": "-1.0"},
                {"key": "D", "text": "Equal to the variance ratio"}
            ],
            "correctAnswer": "A",
            "explanation": "Principal components are constructed to be orthogonal to each other, meaning the Pearson correlation between any two PCs is zero."
        }
    },
    {
        "id": "Q3-SAMPLE-3",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 3",
        "questionText": "Which of the following statements is FALSE?",
        "code": None,
        "options": [
            {"key": "A", "text": "Lasso Regression applies only to SISO."},
            {"key": "B", "text": "Lasso does feature selection; it is useful when there are unrelated input columns."},
            {"key": "C", "text": "The aim of Cross-validation is to improve the model’s generalizability."},
            {"key": "D", "text": "Ridge regression shrinks the estimate values; it is useful when there are correlated input columns."}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Lasso (L1 regularization) handles Multiple-Input Single-Output (MISO) regression problems with dozens or hundreds of predictors. It is NOT restricted to Single-Input Single-Output (SISO). Hence statement A is false.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What unique capability distinguishes Lasso Regression from Ridge Regression?",
            "code": None,
            "options": [
                {"key": "A", "text": "Lasso can shrink coefficients exactly to zero (performing automated feature selection)"},
                {"key": "B", "text": "Lasso only works with negative numbers"},
                {"key": "C", "text": "Ridge eliminates features completely"},
                {"key": "D", "text": "Ridge cannot be used with cross-validation"}
            ],
            "correctAnswer": "A",
            "explanation": "Lasso uses an L1 penalty $|\\beta|$, which can force coefficients to exactly zero, eliminating redundant features."
        }
    },
    {
        "id": "Q3-SAMPLE-5",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 3",
        "questionText": "The correct code to show how much variation is captured by each of the principal components for the given DataFrame df is:",
        "code": "import numpy as np\nimport pandas as pd\nfrom sklearn.decomposition import PCA\npca = PCA(n_components=2)\npca.fit(df)",
        "options": [
            {"key": "A", "text": "df.explained_variance_ratio_"},
            {"key": "B", "text": "df.components_variance_ratio"},
            {"key": "C", "text": "pca.explained_variance_ratio_"},
            {"key": "D", "text": "pca.components_variance_ratio"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: In Scikit-Learn's `PCA` class, the proportion of dataset variance explained by each principal component is stored in the fitted estimator attribute `pca.explained_variance_ratio_`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `np.sum(pca.explained_variance_ratio_)` represent?",
            "code": None,
            "options": [
                {"key": "A", "text": "The cumulative percentage of total variance retained by the selected principal components"},
                {"key": "B", "text": "The number of outliers removed"},
                {"key": "C", "text": "The correlation between components"},
                {"key": "D", "text": "The Mean Squared Error of the model"}
            ],
            "correctAnswer": "A",
            "explanation": "Summing the variance ratios gives the total cumulative proportion of information/variance retained."
        }
    },

    # =========================================================================
    # QUIZ 4 (Quiz4F06.pdf)
    # =========================================================================
    {
        "id": "Q4-F06-1",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "In a binary classification problem, what does the confusion matrix represent?",
        "code": None,
        "options": [
            {"key": "A", "text": "The accuracy of the model"},
            {"key": "B", "text": "The precision of the model"},
            {"key": "C", "text": "The true positive, false positive, true negative, and false negative counts"},
            {"key": "D", "text": "The sensitivity of the model"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: A binary confusion matrix tabulates prediction outcomes against actual ground truth, recording True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If a medical test falsely flags a healthy patient as positive, which confusion matrix metric is incremented?",
            "code": None,
            "options": [
                {"key": "A", "text": "False Positive (Type I Error)"},
                {"key": "B", "text": "False Negative (Type II Error)"},
                {"key": "C", "text": "True Negative"},
                {"key": "D", "text": "Sensitivity"}
            ],
            "correctAnswer": "A",
            "explanation": "A False Positive occurs when the negative ground truth is incorrectly classified as positive."
        }
    },
    {
        "id": "Q4-F06-2",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "What is the purpose of the fit() method in Scikit-learn’s classification algorithms?",
        "code": None,
        "options": [
            {"key": "A", "text": "To preprocess the input data"},
            {"key": "B", "text": "To evaluate the performance of the model"},
            {"key": "C", "text": "To train the model on the input data"},
            {"key": "D", "text": "To make predictions on new data"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: In Scikit-Learn API:\n- `.fit(X, y)` trains the algorithm parameters using training features and targets.\n- `.predict(X)` produces predictions.\n- `.score(X, y)` evaluates accuracy.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which method in Scikit-Learn transforms test features using the already-fitted parameters of a scaler without refitting?",
            "code": None,
            "options": [
                {"key": "A", "text": ".transform()"},
                {"key": "B", "text": ".fit()"},
                {"key": "C", "text": ".fit_transform()"},
                {"key": "D", "text": ".predict()"}
            ],
            "correctAnswer": "A",
            "explanation": "On test data, always call `.transform()` to prevent data leakage from the test set."
        }
    },
    {
        "id": "Q4-F06-4",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "Which of the following measures in clustering are internal validation measures?",
        "code": None,
        "options": [
            {"key": "A", "text": "ARI and SI"},
            {"key": "B", "text": "SI and DBI"},
            {"key": "C", "text": "NMI and DBI"},
            {"key": "D", "text": "NMI and ARI"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: Clustering validation measures:\n- **Internal Measures** (do not require true class labels): Silhouette Index (SI) and Davies-Bouldin Index (DBI).\n- **External Measures** (require ground truth labels): Adjusted Rand Index (ARI) and Normalized Mutual Information (NMI).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For Davies-Bouldin Index (DBI), is a higher or lower score indicative of better clustering?",
            "code": None,
            "options": [
                {"key": "A", "text": "Lower score is better (indicates tighter clusters with greater separation)"},
                {"key": "B", "text": "Higher score is better"},
                {"key": "C", "text": "DBI must be exactly 1.0"},
                {"key": "D", "text": "Score has no relation to cluster quality"}
            ],
            "correctAnswer": "A",
            "explanation": "A lower Davies-Bouldin index indicates clusters that are compact and far apart."
        }
    },
    {
        "id": "Q4-F06-8",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "What is precision in a classification model?",
        "code": None,
        "options": [
            {"key": "A", "text": "Precision measures the proportion of true positives among all predicted positives"},
            {"key": "B", "text": "Precision measures the sensitivity of the model"},
            {"key": "C", "text": "Precision measures the proportion of true negatives among all predicted negatives"},
            {"key": "D", "text": "Precision measures the proportion of correct predictions made by the model"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Classification metrics:\n$$\\text{Precision} = \\frac{TP}{TP + FP}$$\nIt measures what fraction of items flagged as positive were truly positive.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What metric is defined as $TP / (TP + FN)$?",
            "code": None,
            "options": [
                {"key": "A", "text": "Recall / Sensitivity"},
                {"key": "B", "text": "Precision"},
                {"key": "C", "text": "Specificity"},
                {"key": "D", "text": "Accuracy"}
            ],
            "correctAnswer": "A",
            "explanation": "Recall (or sensitivity) calculates the proportion of actual positive cases successfully caught by the model."
        }
    },

    # =========================================================================
    # OFFICIAL MIDTERMS: Term 212/213 (Midterm_ISE291_Term_212_213.pdf)
    # =========================================================================
    {
        "id": "M212-1",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "Which of the following statements is True about dictionaries in Python?",
        "code": None,
        "options": [
            {"key": "A", "text": "In dictionaries, values must be unique."},
            {"key": "B", "text": "In dictionaries, both keys and values must be unique."},
            {"key": "C", "text": "In dictionaries, keys must be unique."},
            {"key": "D", "text": "None of the above."}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: In Python dictionaries, **keys must be unique** and immutable. Values can be duplicates of any type.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What happens if you define `d = {'a': 1, 'a': 2}` in Python?",
            "code": "d = {'a': 1, 'a': 2}\nprint(d)",
            "options": [
                {"key": "A", "text": "{'a': 2} (the duplicate key is overwritten by the later value)"},
                {"key": "B", "text": "SyntaxError: duplicate key"},
                {"key": "C", "text": "{'a': 1}"},
                {"key": "D", "text": "{'a': [1, 2]}"}
            ],
            "correctAnswer": "A",
            "explanation": "Assigning duplicate keys overwrites earlier values with the latest assigned value."
        }
    },
    {
        "id": "M212-2",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "The element-wise arithmetic operations (like: +, -, *, /) in NumPy arrays without using a loop is called?",
        "code": None,
        "options": [
            {"key": "A", "text": "Slicing"},
            {"key": "B", "text": "Masking"},
            {"key": "C", "text": "Indexing"},
            {"key": "D", "text": "Vectorization"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: **Vectorization** refers to running batch element-wise operations implemented in compiled C code without explicit Python for-loops, delivering massive speedups.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If `a = np.array([1, 2])` and `b = np.array([3, 4])`, what does vectorized `a * b` produce?",
            "code": None,
            "options": [
                {"key": "A", "text": "array([3, 8])"},
                {"key": "B", "text": "11 (dot product)"},
                {"key": "C", "text": "array([4, 6])"},
                {"key": "D", "text": "array([[3, 4], [6, 8]])"}
            ],
            "correctAnswer": "A",
            "explanation": "In NumPy, `*` performs element-wise multiplication: `1*3=3`, `2*4=8`."
        }
    },
    {
        "id": "M212-4",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Official Past Midterms",
        "questionText": "The following data represents a sample of students ages in a primary school: [9, 10, 7, -8, 9, 10, 9]. The value '-8' is an example of:",
        "code": None,
        "options": [
            {"key": "A", "text": "Incomplete data"},
            {"key": "B", "text": "Inconsistent data"},
            {"key": "C", "text": "Missing data"},
            {"key": "D", "text": "Noisy data"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: Data quality definitions:\n- **Noisy data**: Contains errors, invalid outliers, or faulty recordings (e.g. negative age in school children).\n- **Incomplete/Missing**: Lacking attribute values or recorded as null/NaN.\n- **Inconsistent**: Discrepancies between related fields (e.g. Birthday doesn't match age).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If a client database records age as 'Twenty-Five' in one row and '25' in another, this is an example of:",
            "code": None,
            "options": [
                {"key": "A", "text": "Inconsistent data"},
                {"key": "B", "text": "Missing data"},
                {"key": "C", "text": "Noisy data"},
                {"key": "D", "text": "Redundant data"}
            ],
            "correctAnswer": "A",
            "explanation": "Conflicting data formats and representations for the same field represent inconsistent data."
        }
    },
    {
        "id": "M212-6",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Official Past Midterms",
        "questionText": "Estimate/calculate the interquartile range from a boxplot where the left edge of the box (Q1) is at 40 and the right edge (Q3) is at 60:",
        "code": None,
        "options": [
            {"key": "A", "text": "80"},
            {"key": "B", "text": "40"},
            {"key": "C", "text": "60"},
            {"key": "D", "text": "20"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: The interquartile range (IQR) equals the length of the central box:\n$$IQR = Q_3 - Q_1 = 60 - 40 = 20$$.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In a boxplot with $Q_1 = 40$ and $Q_3 = 60$ ($IQR = 20$), what is the Upper Whisker Limit?",
            "code": None,
            "options": [
                {"key": "A", "text": "90"},
                {"key": "B", "text": "80"},
                {"key": "C", "text": "100"},
                {"key": "D", "text": "70"}
            ],
            "correctAnswer": "A",
            "explanation": "$Q_3 + 1.5 \\times IQR = 60 + 1.5 \\times 20 = 60 + 30 = 90$."
        }
    },
    {
        "id": "M212-9",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Official Past Midterms",
        "questionText": "Which of the following code can be used for obtaining both the number of rows and columns of a DataFrame?",
        "code": None,
        "options": [
            {"key": "A", "text": "len(df.index)"},
            {"key": "B", "text": "df.count()"},
            {"key": "C", "text": "len(df.columns)"},
            {"key": "D", "text": "df.shape"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: `df.shape` returns a tuple `(n_rows, n_cols)` representing dimensions of the DataFrame. `len(df.index)` only returns rows, and `len(df.columns)` only returns columns.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `df.size` return in Pandas?",
            "code": None,
            "options": [
                {"key": "A", "text": "Total number of elements (rows * columns)"},
                {"key": "B", "text": "Number of rows only"},
                {"key": "C", "text": "Memory footprint in megabytes"},
                {"key": "D", "text": "Count of non-null values"}
            ],
            "correctAnswer": "A",
            "explanation": "`.size` returns the total cell count, which equals rows multiplied by columns."
        }
    },

    # =========================================================================
    # OFFICIAL MIDTERMS: Term 223 (223_Midterm_Exam.pdf)
    # =========================================================================
    {
        "id": "M223-1",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 1: Introduction to Data Science",
        "category": "Official Past Midterms",
        "questionText": "The primary role of the data engineer is:",
        "code": None,
        "options": [
            {"key": "A", "text": "Data extraction, transformation, and building data pipelines"},
            {"key": "B", "text": "To configure database security only"},
            {"key": "C", "text": "To manage team financial budgets"},
            {"key": "D", "text": "To ensure organizational milestones are met"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In data science team roles (Topic 1):\n- **Data Engineer**: Focuses on pipelines, data extraction, loading (ETL), infrastructure, and preparing structured data pools.\n- **Data Scientist**: Focuses on modeling, exploratory analysis, and deriving actionable predictive insights.\n- **Project Manager**: Manages schedule and milestones.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which role in a data science team specializes primarily in machine learning algorithms and statistical testing?",
            "code": None,
            "options": [
                {"key": "A", "text": "Data Scientist"},
                {"key": "B", "text": "Data Engineer"},
                {"key": "C", "text": "Database Administrator"},
                {"key": "D", "text": "Business Sponsor"}
            ],
            "correctAnswer": "A",
            "explanation": "Data Scientists apply statistical methods and machine learning models to solve business challenges."
        }
    },
    {
        "id": "M223-10",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "What output will you get with this code?\n\nList1 = [x if x % 2 == 0 else x * 2 + 1 for x in range(2, 12)]\nprint(List1)",
        "code": "List1 = [x if x % 2 == 0 else x * 2 + 1 for x in range(2, 12)]\nprint(List1)",
        "options": [
            {"key": "A", "text": "[4, 7, 16, 11, 36, 15, 64, 19, 100, 23]"},
            {"key": "B", "text": "[2, 7, 4, 11, 6, 15, 8, 19, 10, 23, 12]"},
            {"key": "C", "text": "[2, 7, 4, 11, 6, 15, 8, 19, 10, 23]"},
            {"key": "D", "text": "[2, 10, 4, 26, 6, 50, 8, 82, 10, 122]"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: `range(2, 12)` produces numbers 2 through 11 (10 numbers total):\n- Even numbers remain $x$: 2, 4, 6, 8, 10.\n- Odd numbers become $2x + 1$:\n  - $x=3 \\to 2(3)+1 = 7$\n  - $x=5 \\to 2(5)+1 = 11$\n  - $x=7 \\to 2(7)+1 = 15$\n  - $x=9 \\to 2(9)+1 = 19$\n  - $x=11 \\to 2(11)+1 = 23$\nCombining in sequence: `[2, 7, 4, 11, 6, 15, 8, 19, 10, 23]` (10 elements, stopping before 12).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `[x if x > 5 else 0 for x in [3, 5, 7, 9]]` produce?",
            "code": None,
            "options": [
                {"key": "A", "text": "[0, 0, 7, 9]"},
                {"key": "B", "text": "[3, 5, 0, 0]"},
                {"key": "C", "text": "[0, 5, 7, 9]"},
                {"key": "D", "text": "[7, 9]"}
            ],
            "correctAnswer": "A",
            "explanation": "For 3 and 5, condition `x > 5` is False so 0 is returned; for 7 and 9, $x$ is returned."
        }
    },
    {
        "id": "M223-11",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "Which of the following options can display every other column of 'arr' in order of 3rd row, 1st row, and 4th row, where:\narr = np.array([[1, 2, 2], [3, 1, 5], [9, 5, 2], [8, 8, 3]])",
        "code": "arr = np.array([[1, 2, 2], [3, 1, 5], [9, 5, 2], [8, 8, 3]])",
        "options": [
            {"key": "A", "text": "arr[[2, 0, 3], ::2]"},
            {"key": "B", "text": "arr[[2, 0, 3], ::-1]"},
            {"key": "C", "text": "arr[::2, [2, 0, 3]]"},
            {"key": "D", "text": "arr[::2, [3, 1, 4]]"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: NumPy 2D fancy indexing syntax `arr[row_indices, col_slice]`:\n- 3rd row is index 2, 1st row is index 0, 4th row is index 3: list `[2, 0, 3]`.\n- 'Every other column' starting from column 0 uses step 2: `::2`.\nCombined: `arr[[2, 0, 3], ::2]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How do you reverse the order of all columns in a 2D NumPy array?",
            "code": None,
            "options": [
                {"key": "A", "text": "arr[:, ::-1]"},
                {"key": "B", "text": "arr[::-1, :]"},
                {"key": "C", "text": "arr[::-1, ::-1]"},
                {"key": "D", "text": "arr.reverse()"}
            ],
            "correctAnswer": "A",
            "explanation": "`arr[:, ::-1]` keeps all rows (`:`) and reverses columns (`::-1`)."
        }
    },
    {
        "id": "M223-12",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "What is the output of the following code:\n\nimport numpy as np\nx = np.array([1, 2, 4, 8, 9])\nmask = x % 2 != 0\nprint(x[mask])",
        "code": "import numpy as np\nx = np.array([1, 2, 4, 8, 9])\nmask = x % 2 != 0\nprint(x[mask])",
        "options": [
            {"key": "A", "text": "[True False False False True]"},
            {"key": "B", "text": "[False True True True False]"},
            {"key": "C", "text": "array([1, 9])"},
            {"key": "D", "text": "array([2, 4, 8])"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: `mask = x % 2 != 0` evaluates to boolean array `[True, False, False, False, True]`. When indexed back into `x[mask]`, it filters and returns the actual values where mask is True: `array([1, 9])`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What would `print(mask)` output instead of `print(x[mask])`?",
            "code": None,
            "options": [
                {"key": "A", "text": "[True False False False True]"},
                {"key": "B", "text": "[1, 9]"},
                {"key": "C", "text": "5"},
                {"key": "D", "text": "True"}
            ],
            "correctAnswer": "A",
            "explanation": "Printing the mask directly outputs the boolean array itself without data indexing."
        }
    },

    # =========================================================================
    # MCQ PRACTICE PACK (MCQ_Practice_Topics_2_and_3.pdf)
    # =========================================================================
    {
        "id": "MCQ-23-1",
        "sourceFile": "MCQ_Practice_Topics_2_and_3.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Practice Questions",
        "questionText": "What will be the result of the following statement?\n\nprint(dict(enumerate(range(1, 4))))",
        "code": "print(dict(enumerate(range(1, 4))))",
        "options": [
            {"key": "A", "text": "[(0, 1), (1, 2), (2, 3)]"},
            {"key": "B", "text": "{0: 1, 1: 2, 2: 3}"},
            {"key": "C", "text": "{1: 1, 2: 2, 3: 3}"},
            {"key": "D", "text": "{(0, 1), (1, 2), (2, 3), (3, 4)}"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: `range(1, 4)` yields numbers 1, 2, 3. `enumerate()` pairs each with an automatic index starting from 0: `(0, 1), (1, 2), (2, 3)`. Passing this iterator to `dict()` constructs `{0: 1, 1: 2, 2: 3}`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `dict(enumerate(['cat', 'dog']))` return?",
            "code": None,
            "options": [
                {"key": "A", "text": "{0: 'cat', 1: 'dog'}"},
                {"key": "B", "text": "{'cat': 0, 'dog': 1}"},
                {"key": "C", "text": "[('cat', 0), ('dog', 1)]"},
                {"key": "D", "text": "{1: 'cat', 2: 'dog'}"}
            ],
            "correctAnswer": "A",
            "explanation": "`enumerate()` supplies 0-based integer keys: `{0: 'cat', 1: 'dog'}`."
        }
    },
    {
        "id": "MCQ-23-2",
        "sourceFile": "MCQ_Practice_Topics_2_and_3.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Practice Questions",
        "questionText": "What is the shape of the array arr2 created by the following line of code?\n\narr = np.array([[1, 2, 3, 4, 5, 6, 7]])\narr2 = arr.reshape(7)",
        "code": "arr = np.array([[1, 2, 3, 4, 5, 6, 7]])\narr2 = arr.reshape(7)",
        "options": [
            {"key": "A", "text": "(1, 7)"},
            {"key": "B", "text": "(7, )"},
            {"key": "C", "text": "( , 7)"},
            {"key": "D", "text": "(7, 1)"}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: `arr` is a 2D array of shape `(1, 7)`. Reshaping with a single integer `.reshape(7)` flattens it into a 1-dimensional array, whose shape tuple is `(7,)`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: If you reshape an array with shape `(6,)` into `.reshape(6, 1)`, what is its dimensionality?",
            "code": None,
            "options": [
                {"key": "A", "text": "2D column vector with shape (6, 1)"},
                {"key": "B", "text": "1D array with shape (6,)"},
                {"key": "C", "text": "3D array"},
                {"key": "D", "text": "Scalar"}
            ],
            "correctAnswer": "A",
            "explanation": "Passing two dimension arguments `(6, 1)` yields a 2D array (a single column)."
        }
    },
    {
        "id": "MCQ-23-5",
        "sourceFile": "MCQ_Practice_Topics_2_and_3.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Practice Questions",
        "questionText": "Find the interquartile range (IQR) of the following values:\n20  21  24  25  26  29",
        "code": None,
        "options": [
            {"key": "A", "text": "21"},
            {"key": "B", "text": "26"},
            {"key": "C", "text": "9"},
            {"key": "D", "text": "5"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: Ordered values: 20, 21, 24, 25, 26, 29.\n- Lower half: [20, 21, 24] $\\to$ median $Q_1 = 21$.\n- Upper half: [25, 26, 29] $\\to$ median $Q_3 = 26$.\n- $IQR = Q_3 - Q_1 = 26 - 21 = 5$.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For the ordered dataset [10, 12, 14, 18, 22, 26], what is $Q_1$ and $Q_3$?",
            "code": None,
            "options": [
                {"key": "A", "text": "Q1 = 12, Q3 = 22 (IQR = 10)"},
                {"key": "B", "text": "Q1 = 10, Q3 = 26 (IQR = 16)"},
                {"key": "C", "text": "Q1 = 14, Q3 = 18 (IQR = 4)"},
                {"key": "D", "text": "Q1 = 12, Q3 = 18 (IQR = 6)"}
            ],
            "correctAnswer": "A",
            "explanation": "Lower half median is 12, upper half median is 22; $IQR = 22 - 12 = 10$."
        }
    },
    {
        "id": "MCQ-23-6",
        "sourceFile": "MCQ_Practice_Topics_2_and_3.pdf",
        "topic": "Topic 3: Basic Statistics",
        "category": "Practice Questions",
        "questionText": "In a boxplot, the outliers are those data points with their values appearing:",
        "code": None,
        "options": [
            {"key": "A", "text": "Below the Lower Whisker Limit and above the Upper Whisker Limit"},
            {"key": "B", "text": "Between the two Whisker Limits"},
            {"key": "C", "text": "Below the Upper Whisker Limit and above the Lower Whisker Limit"},
            {"key": "D", "text": "Below the Lower Quartile and above the Upper Quartile"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In Tukey's boxplot representation, data points that fall below $Q_1 - 1.5 \\times IQR$ or above $Q_3 + 1.5 \\times IQR$ are plotted individually as outlier markers.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Approximately what percentage of data falls between $Q_1$ and $Q_3$ in any distribution?",
            "code": None,
            "options": [
                {"key": "A", "text": "50%"},
                {"key": "B", "text": "25%"},
                {"key": "C", "text": "75%"},
                {"key": "D", "text": "95%"}
            ],
            "correctAnswer": "A",
            "explanation": "The IQR spans from the 25th percentile to the 75th percentile, containing exactly the central 50% of the observations."
        }
    }
]

print(f"Defined {len(NEW_QUESTIONS)} high-yield verified questions.")
