# build_full_portal_bank.py
# Compiles all questions (existing + new from Term 251 quizzes, past midterms, and MCQs)
# Generates rich explanations, source tags, and Concept Reinforcement Drills.

import json
import re
import os

WEB_APP_DIR = r"c:\Users\acer\Desktop\Automation\etc files\web_app"
ORIGINAL_JSON = os.path.join(WEB_APP_DIR, "questions.json")

def make_reinforcement(q):
    """Generates a contextual concept reinforcement drill based on topic, code, and text."""
    text = q.get('questionText', '')
    code = q.get('code', '')
    expl = q.get('explanation', '')
    topic = q.get('topic', '')
    
    # 1. List Comprehensions / Slicing
    if 'range' in code and ('for' in code or '[' in code) and 'x%' in code:
        return {
            "questionText": "Concept Reinforcement: What will be the output of `[x for x in range(1, 8) if x % 2 != 0]`?",
            "code": "[x for x in range(1, 8) if x % 2 != 0]",
            "options": [
                {"key": "A", "text": "[1, 3, 5, 7]"},
                {"key": "B", "text": "[2, 4, 6]"},
                {"key": "C", "text": "[1, 3, 5, 7, 9]"},
                {"key": "D", "text": "[3, 5, 7]"}
            ],
            "correctAnswer": "A",
            "explanation": "`range(1, 8)` produces integers from 1 up to 7 (8 is excluded). The filter `x % 2 != 0` selects odd integers: 1, 3, 5, and 7."
        }
    
    if 'slice' in text.lower() or 'slicing' in text.lower() or '[::-1]' in code or '[-' in code:
        return {
            "questionText": "Concept Reinforcement: Given `lst = [10, 20, 30, 40, 50]`, what is the result of `lst[1:4]`?",
            "code": "lst = [10, 20, 30, 40, 50]\nprint(lst[1:4])",
            "options": [
                {"key": "A", "text": "[20, 30, 40]"},
                {"key": "B", "text": "[10, 20, 30]"},
                {"key": "C", "text": "[20, 30, 40, 50]"},
                {"key": "D", "text": "[10, 20, 30, 40]"}
            ],
            "correctAnswer": "A",
            "explanation": "Python slicing `[start:stop]` includes the element at index `start` (index 1 is 20) and stops immediately before index `stop` (index 4 is 50, so indices 1, 2, 3 are included: [20, 30, 40])."
        }

    # 2. Dictionaries / Tuples / Sets
    if 'dict' in text.lower() or 'dictionary' in text.lower() or 'keys' in text.lower() or 'zip' in code:
        return {
            "questionText": "Concept Reinforcement: Which of the following is an INVALID key in a Python dictionary?",
            "code": None,
            "options": [
                {"key": "A", "text": "[1, 2] (a list)"},
                {"key": "B", "text": "(1, 2) (a tuple of integers)"},
                {"key": "C", "text": "'age' (a string)"},
                {"key": "D", "text": "42 (an integer)"}
            ],
            "correctAnswer": "A",
            "explanation": "Dictionary keys in Python must be hashable and immutable. Lists are mutable and cannot be hashed, hence `[1, 2]` cannot be used as a dictionary key."
        }

    # 3. NumPy arrays & shapes
    if 'numpy' in text.lower() or 'np.' in code or 'array' in text.lower():
        if 'axis' in text.lower() or 'axis' in code:
            return {
                "questionText": "Concept Reinforcement: In NumPy 2D operations, what operation does `axis=0` represent?",
                "code": None,
                "options": [
                    {"key": "A", "text": "Along columns (vertical down across rows)"},
                    {"key": "B", "text": "Along rows (horizontal across columns)"},
                    {"key": "C", "text": "Entire array flattened"},
                    {"key": "D", "text": "Diagonal elements only"}
                ],
                "correctAnswer": "A",
                "explanation": "In NumPy, `axis=0` operates along the index/columns vertically (down across rows), while `axis=1` operates along the horizontal row axis."
            }
        else:
            return {
                "questionText": "Concept Reinforcement: If `arr = np.array([1, 2, 3, 4, 5, 6])`, what will `arr.reshape(2, 3).shape` return?",
                "code": "import numpy as np\narr = np.array([1, 2, 3, 4, 5, 6])\nprint(arr.reshape(2, 3).shape)",
                "options": [
                    {"key": "A", "text": "(2, 3)"},
                    {"key": "B", "text": "(3, 2)"},
                    {"key": "C", "text": "(6,)"},
                    {"key": "D", "text": "(1, 6)"}
                ],
                "correctAnswer": "A",
                "explanation": "Reshaping 6 elements into shape (2, 3) creates a 2D array with 2 rows and 3 columns; `.shape` returns the tuple `(2, 3)`."
            }

    # 4. Pandas DataFrame loc vs iloc
    if 'loc' in code or 'iloc' in code or 'dataframe' in text.lower() or 'pandas' in text.lower():
        return {
            "questionText": "Concept Reinforcement: What is the fundamental difference between `df.loc` and `df.iloc` in Pandas?",
            "code": None,
            "options": [
                {"key": "A", "text": ".loc is label-based (inclusive of stop), while .iloc is integer position-based (exclusive of stop)"},
                {"key": "B", "text": ".loc is integer position-based, while .iloc is label-based"},
                {"key": "C", "text": ".loc only selects rows, while .iloc only selects columns"},
                {"key": "D", "text": "There is no difference; they are exact aliases"}
            ],
            "correctAnswer": "A",
            "explanation": "`.loc` accesses data via row and column labels and is endpoint-inclusive (`1:4` includes 4). `.iloc` accesses data by 0-based integer positions and is endpoint-exclusive."
        }

    # 5. One Hot Encoding / Scaling
    if 'dummy' in text.lower() or 'dummies' in code or 'encoding' in text.lower() or 'scale' in text.lower() or 'scaler' in code:
        return {
            "questionText": "Concept Reinforcement: Why do we often specify `drop_first=True` when applying `pd.get_dummies()` for regression?",
            "code": None,
            "options": [
                {"key": "A", "text": "To prevent multicollinearity (the dummy variable trap)"},
                {"key": "B", "text": "To reduce row count by half"},
                {"key": "C", "text": "To eliminate missing values in the column"},
                {"key": "D", "text": "To convert the columns into floats instead of integers"}
            ],
            "correctAnswer": "A",
            "explanation": "In linear models, retaining all $K$ categories leads to perfect multicollinearity because the dummy variables sum to 1. `drop_first=True` drops the reference category to avoid the dummy variable trap."
        }

    # 6. Statistics / P-value / Hypothesis testing
    if 'p-value' in text.lower() or 'hypothesis' in text.lower() or 'test' in text.lower():
        return {
            "questionText": "Concept Reinforcement: If a two-sample t-test yields a P-value of 0.02 at a significance level $\\alpha = 0.05$, what is the conclusion?",
            "code": None,
            "options": [
                {"key": "A", "text": "Reject the null hypothesis; the two means are significantly different"},
                {"key": "B", "text": "Fail to reject the null hypothesis; no significant difference"},
                {"key": "C", "text": "Accept the null hypothesis as true with 98% certainty"},
                {"key": "D", "text": "The test is invalid because P-value cannot be below 0.05"}
            ],
            "correctAnswer": "A",
            "explanation": "When $P\\text{-value} \\le \\alpha$ (0.02 < 0.05), we reject the null hypothesis $H_0$ in favor of the alternative hypothesis, concluding there is statistically significant evidence of a difference."
        }

    # 7. Mean / Median / Mode / IQR / Outliers
    if 'median' in text.lower() or 'mean' in text.lower() or 'iqr' in text.lower() or 'whisker' in text.lower() or 'boxplot' in text.lower():
        return {
            "questionText": "Concept Reinforcement: For a heavily right-skewed dataset with extreme high outliers, which measure of central tendency is most reliable?",
            "code": None,
            "options": [
                {"key": "A", "text": "Median (robust to outliers)"},
                {"key": "B", "text": "Mean (pulled toward extreme high values)"},
                {"key": "C", "text": "Standard Deviation"},
                {"key": "D", "text": "Range"}
            ],
            "correctAnswer": "A",
            "explanation": "The median depends only on the rank order of values at the 50th percentile, making it resistant/robust to extreme outliers, whereas the mean is sensitive and pulled in the direction of skewness."
        }

    # 8. Data Understanding / CRISP-DM / 5 V's
    if 'crisp-dm' in text.lower() or 'data science' in text.lower() or 'velocity' in text.lower() or 'veracity' in text.lower():
        return {
            "questionText": "Concept Reinforcement: Which phase in the CRISP-DM lifecycle typically consumes ~80% of project time and effort?",
            "code": None,
            "options": [
                {"key": "A", "text": "Data Preparation (cleaning, transforming, structuring)"},
                {"key": "B", "text": "Deployment"},
                {"key": "C", "text": "Evaluation"},
                {"key": "D", "text": "Business Understanding"}
            ],
            "correctAnswer": "A",
            "explanation": "Data Preparation involves handling missing values, encoding features, normalising numbers, and handling outliers, historically taking ~70-80% of data scientists' time."
        }

    # Default general reinforcement
    return {
        "questionText": f"Concept Reinforcement Drill: Test your understanding of {topic}",
        "code": None,
        "options": [
            {"key": "A", "text": "True understanding relies on knowing the core mathematical formula and coding syntax"},
            {"key": "B", "text": "Data science concepts can be memorized without practicing on actual code"},
            {"key": "C", "text": "Only theoretical concepts appear on the midterm exam"},
            {"key": "D", "text": "None of the above"}
        ],
        "correctAnswer": "A",
        "explanation": "Review the step-by-step walkthrough in the explanation above to solidify your conceptual grasp and coding execution."
    }

print("Loaded reinforcement generator.")
