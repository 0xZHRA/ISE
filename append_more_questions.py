# append_more_questions.py
# Completes the full set of newly ingested questions from all official study package files.

import json
from generate_new_questions_bank import NEW_QUESTIONS

ADDITIONAL_QUESTIONS = [
    # --- Quiz 2 Answer MS / 2B ---
    {
        "id": "Q2-MS-1",
        "sourceFile": "Quiz2AnswerMS.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 2",
        "questionText": "You have a pandas DataFrame df with columns 'c1', 'c2', and 'c3'. You want to sort the DataFrame by c1 in descending order, and if there are ties in c1, then sort by c2 in ascending order. Which code snippet correctly achieves this?",
        "code": None,
        "options": [
            {"key": "A", "text": "df.sort_values(by=['c1', 'c2'], ascending=[False, True], inplace=True)"},
            {"key": "B", "text": "df.sort_values(by=['c1'], ascending=False).sort_values(by=['c2'], ascending=True, inplace=True)"},
            {"key": "C", "text": "df.sort_values(by=['c1', 'c2'], ascending=False, inplace=True)"},
            {"key": "D", "text": "df.sort_values(by=['c1', 'c2'], ascending=[True, False], inplace=True)"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Multi-column sorting in Pandas accepts a list of booleans in `ascending`: `ascending=[False, True]` specifies descending order for the first column ('c1') and ascending order for the second column ('c2').",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How do you sort a DataFrame by 'score' in descending order without modifying the original DataFrame in place?",
            "code": None,
            "options": [
                {"key": "A", "text": "df_sorted = df.sort_values(by='score', ascending=False)"},
                {"key": "B", "text": "df.sort_values(by='score', inplace=True)"},
                {"key": "C", "text": "df.sort('score', reverse=True)"},
                {"key": "D", "text": "df.order_by('score', ascending=False)"}
            ],
            "correctAnswer": "A",
            "explanation": "Omitting `inplace=True` returns a newly sorted DataFrame while preserving `df`."
        }
    },
    {
        "id": "Q2-MS-2",
        "sourceFile": "Quiz2AnswerMS.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "Calculate the median of the following data after converting the data to the Min-max scaler:\nD = [1, 3, 5, 7, 9]\nFormula: x_scaled = (x - x_min) / (x_max - x_min)",
        "code": None,
        "options": [
            {"key": "A", "text": "0.75"},
            {"key": "B", "text": "1.0"},
            {"key": "C", "text": "0.0"},
            {"key": "D", "text": "0.5"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: Min-Max scaling maps $x_{min}=1 \\to 0$ and $x_{max}=9 \\to 1$.\nThe median of $D=[1, 3, 5, 7, 9]$ is 5.\nApplying the Min-Max formula to 5:\n$$x_{\\text{scaled}} = \\frac{5 - 1}{9 - 1} = \\frac{4}{8} = 0.5$$.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the Min-Max scaled value of $x = 25$ when $x_{min} = 10$ and $x_{max} = 30$?",
            "code": None,
            "options": [
                {"key": "A", "text": "0.75"},
                {"key": "B", "text": "0.50"},
                {"key": "C", "text": "0.60"},
                {"key": "D", "text": "0.80"}
            ],
            "correctAnswer": "A",
            "explanation": "$\\frac{25 - 10}{30 - 10} = \\frac{15}{20} = 0.75$."
        }
    },
    {
        "id": "Q2-MS-6",
        "sourceFile": "Quiz2AnswerMS.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "What is the purpose of using mean imputation, and which data quality issue is handled by it?",
        "code": None,
        "options": [
            {"key": "A", "text": "Handling data inconsistency and irregularities"},
            {"key": "B", "text": "Dealing with data redundancy and duplication"},
            {"key": "C", "text": "Filling in missing values"},
            {"key": "D", "text": "Managing data skewness and non-normality"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: Imputation techniques (mean, median, mode) are designed specifically to resolve **missing data** (NaN values) by substituting plausible estimates derived from the observed data distribution.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which imputation method is preferred for a numerical column that has extreme outliers?",
            "code": None,
            "options": [
                {"key": "A", "text": "Median imputation (robust to outliers)"},
                {"key": "B", "text": "Mean imputation"},
                {"key": "C", "text": "Zero imputation"},
                {"key": "D", "text": "Standard deviation imputation"}
            ],
            "correctAnswer": "A",
            "explanation": "The median is robust against extreme values, making it safer than the mean when outliers exist."
        }
    },
    {
        "id": "Q2-2B-1",
        "sourceFile": "Quiz2B_WithSolution.pdf",
        "topic": "Topic 5: Data Understanding and Preparation",
        "category": "Term 251 Quiz 2",
        "questionText": "In Python’s pandas.get_dummies() function, what is the effect of setting the parameter drop_first=True when encoding a categorical variable?",
        "code": None,
        "options": [
            {"key": "A", "text": "It removes the entire categorical column from the dataset."},
            {"key": "B", "text": "It removes the last generated dummy column from the encoded output."},
            {"key": "C", "text": "It drops the first generated dummy column to avoid redundancy and collinearity."},
            {"key": "D", "text": "It retains only the first category and removes all others."}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: Categorical one-hot encoding with $K$ categories introduces a mathematical dependency (multicollinearity) because the sum of all $K$ binary columns is 1. `drop_first=True` drops the baseline category ($K-1$ dummies remain).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How many dummy columns will be generated by `pd.get_dummies(df['color'], drop_first=True)` if 'color' has 5 unique values?",
            "code": None,
            "options": [
                {"key": "A", "text": "4"},
                {"key": "B", "text": "5"},
                {"key": "C", "text": "1"},
                {"key": "D", "text": "3"}
            ],
            "correctAnswer": "A",
            "explanation": "$5 - 1 = 4$ dummy columns are generated when `drop_first=True`."
        }
    },

    # --- Quiz 3 Sample (Questions 6 to 10) ---
    {
        "id": "Q3-SAMPLE-6",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Term 251 Quiz 3",
        "questionText": "What does the output of pd.crosstab(df['economy'], df['cylinder']) represent?",
        "code": "pd.crosstab(df['economy'], df['cylinder'])",
        "options": [
            {"key": "A", "text": "Sum of economy categories and cylinder levels"},
            {"key": "B", "text": "Total count of unique economy categories"},
            {"key": "C", "text": "Average cylinder level for each economy category"},
            {"key": "D", "text": "Frequency count of each combination of economy category and cylinder level"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: `pd.crosstab(col1, col2)` computes a contingency table (cross-tabulation) showing the frequency distribution of occurrences across all pair combinations of the two categorical variables.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How do you normalize `pd.crosstab` so that entries display relative proportions rather than raw counts?",
            "code": None,
            "options": [
                {"key": "A", "text": "pd.crosstab(col1, col2, normalize=True)"},
                {"key": "B", "text": "pd.crosstab(col1, col2, scale=True)"},
                {"key": "C", "text": "pd.crosstab(col1, col2, prop=True)"},
                {"key": "D", "text": "pd.crosstab(col1, col2).divide()"}
            ],
            "correctAnswer": "A",
            "explanation": "Passing `normalize=True` divides all cell counts by the grand total to display overall proportions."
        }
    },
    {
        "id": "Q3-SAMPLE-7",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 3",
        "questionText": "Which of the following methods provides a value that can be used to evaluate and compare the prediction performance among OLS, Ridge, and Lasso regression models on test data?",
        "code": None,
        "options": [
            {"key": "A", "text": "accuracy_score(y_test, y_pred)"},
            {"key": "B", "text": "reg.coef_"},
            {"key": "C", "text": "mean_squared_error(y_test, y_pred)"},
            {"key": "D", "text": "reg.fit(X, y)"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: In continuous regression tasks (OLS, Ridge, Lasso), performance is evaluated using error metrics such as **Mean Squared Error (MSE)**, Root Mean Squared Error (RMSE), or $R^2$. `accuracy_score` is exclusively for classification.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which metric is appropriate for evaluating classification models, but NOT regression models?",
            "code": None,
            "options": [
                {"key": "A", "text": "Classification Accuracy / F1-Score"},
                {"key": "B", "text": "Mean Absolute Error (MAE)"},
                {"key": "C", "text": "Mean Squared Error (MSE)"},
                {"key": "D", "text": "R-squared"}
            ],
            "correctAnswer": "A",
            "explanation": "Accuracy and F1-score evaluate categorical class matching, not continuous numerical errors."
        }
    },
    {
        "id": "Q3-SAMPLE-8",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 3",
        "questionText": "The application of the following line of code in the machine learning workflow is:\ntrain_test_split(X, y, test_size=0.3, random_state=42)",
        "code": "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)",
        "options": [
            {"key": "A", "text": "To calculate the predicted values of y based on a regression model."},
            {"key": "B", "text": "To separate part of the data (30%) for testing while keeping the rest (70%) for model training."},
            {"key": "C", "text": "To perform the MISO OLS closed-form solution."},
            {"key": "D", "text": "To transform numeric variables to mean zero and standard deviation one."}
        ],
        "correctAnswer": "B",
        "explanation": "**Course Concept**: `train_test_split` partitions feature and target matrices into distinct training and evaluation subsets, holding out the specified test proportion (here 30%) to evaluate generalization without overfitting.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What is the purpose of setting `random_state=42` in `train_test_split`?",
            "code": None,
            "options": [
                {"key": "A", "text": "To ensure reproducible identical splits across multiple runs"},
                {"key": "B", "text": "To optimize model accuracy to 42%"},
                {"key": "C", "text": "To limit test data to 42 rows"},
                {"key": "D", "text": "To set the learning rate"}
            ],
            "correctAnswer": "A",
            "explanation": "`random_state` seeds the pseudorandom number generator, ensuring reproducible train/test splits."
        }
    },
    {
        "id": "Q3-SAMPLE-10",
        "sourceFile": "Quiz3_Sample.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 3",
        "questionText": "Given the lines of code below, which attribute provides the value of the best regularization penalty coefficient selected by cross-validation?",
        "code": "from sklearn.linear_model import RidgeCV\nreg = RidgeCV(alphas=[1e-4, 1e-3, 1e-2, 1e-1, 1e0, 1e1, 1e2, 1e3], cv=10).fit(X_train, y_train)",
        "options": [
            {"key": "A", "text": "reg.intercept_"},
            {"key": "B", "text": "reg.coef_"},
            {"key": "C", "text": "reg.penalty_"},
            {"key": "D", "text": "reg.alpha_"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: In Scikit-Learn's `RidgeCV` and `LassoCV`, the optimal penalty tuning parameter $\\alpha$ chosen via internal cross-validation is stored in `reg.alpha_`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In Scikit-Learn linear models, which attribute stores the model's fitted slope coefficients for the predictors?",
            "code": None,
            "options": [
                {"key": "A", "text": "reg.coef_"},
                {"key": "B", "text": "reg.intercept_"},
                {"key": "C", "text": "reg.alpha_"},
                {"key": "D", "text": "reg.slopes_"}
            ],
            "correctAnswer": "A",
            "explanation": "`reg.coef_` contains the estimated regression weights/coefficients $\\beta_1, \\beta_2, \\dots$."
        }
    },

    # --- Quiz 4 (Questions 7, 9, 10) ---
    {
        "id": "Q4-F06-7",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "What is the purpose of the silhouette_score() function in Scikit-learn?",
        "code": None,
        "options": [
            {"key": "A", "text": "To measure the cohesion within clusters and separation between different clusters"},
            {"key": "B", "text": "To measure the amount of information captured by the proposed cluster assignment"},
            {"key": "C", "text": "To determine the exact coordinates of cluster centroids"},
            {"key": "D", "text": "To normalize the data points before running K-Means"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: The Silhouette Coefficient ranges from -1 to +1. High positive values indicate that data points are tightly grouped within their own cluster (cohesion) and well separated from neighboring clusters (separation).",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does a silhouette score near +1 indicate?",
            "code": None,
            "options": [
                {"key": "A", "text": "Dense, well-separated and distinct clusters"},
                {"key": "B", "text": "Completely overlapping clusters"},
                {"key": "C", "text": "Points assigned to the wrong clusters"},
                {"key": "D", "text": "Severe underfitting"}
            ],
            "correctAnswer": "A",
            "explanation": "A silhouette score approaching +1 represents compact, isolated clusters."
        }
    },
    {
        "id": "Q4-F06-10",
        "sourceFile": "Quiz4F06.pdf",
        "topic": "Topic 4: Basic Programming Concepts & Machine Learning",
        "category": "Term 251 Quiz 4",
        "questionText": "Consider the following code:\n\nfrom sklearn.naive_bayes import GaussianNB\nNBClf = GaussianNB()\nNBClf.fit(X_train, y_train)\nprint(NBClf.classes_)\n\nWhat does the NBClf.classes_ attribute represent?",
        "code": "from sklearn.naive_bayes import GaussianNB\nNBClf = GaussianNB()\nNBClf.fit(X_train, y_train)\nprint(NBClf.classes_)",
        "options": [
            {"key": "A", "text": "The list of unique target class labels learned from the training data"},
            {"key": "B", "text": "The list of predicted class labels for the test data"},
            {"key": "C", "text": "The list of feature names in the training data"},
            {"key": "D", "text": "The probabilities for each class in the test data"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In Scikit-learn classifiers (`GaussianNB`, `LogisticRegression`, `DecisionTreeClassifier`), the fitted attribute `.classes_` holds the array of unique class labels identified in the target variable `y`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: How do you access predicted probabilities for each class on test samples in Scikit-Learn?",
            "code": None,
            "options": [
                {"key": "A", "text": "clf.predict_proba(X_test)"},
                {"key": "B", "text": "clf.predict(X_test)"},
                {"key": "C", "text": "clf.probabilities_"},
                {"key": "D", "text": "clf.score_proba(X_test)"}
            ],
            "correctAnswer": "A",
            "explanation": "`.predict_proba()` returns matrix of class probability estimates."
        }
    },

    # --- Past Midterms 212/213 (More Questions) ---
    {
        "id": "M212-P3-1",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "Python's lambda() function takes:",
        "code": None,
        "options": [
            {"key": "A", "text": "Any number of expressions but can only have one argument"},
            {"key": "B", "text": "Any number of expressions and can have any number of arguments"},
            {"key": "C", "text": "Any number of arguments but can only have one expression"},
            {"key": "D", "text": "Only one argument, and can have one expression"}
        ],
        "correctAnswer": "C",
        "explanation": "**Course Concept**: A Python anonymous `lambda` function can accept zero, one, or multiple arguments (e.g. `lambda x, y, z: ...`), but syntactically contains only **a single expression** whose result is implicitly returned.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which lambda expression correctly computes the hypotenuse $\\sqrt{x^2 + y^2}$?",
            "code": None,
            "options": [
                {"key": "A", "text": "lambda x, y: (x**2 + y**2)**0.5"},
                {"key": "B", "text": "lambda x: x**2 + y**2"},
                {"key": "C", "text": "def lambda(x, y): return sqrt(x+y)"},
                {"key": "D", "text": "lambda: x**2 + y**2"}
            ],
            "correctAnswer": "A",
            "explanation": "`lambda x, y: (x**2 + y**2)**0.5` accepts two arguments and evaluates the single mathematical expression."
        }
    },
    {
        "id": "M212-P3-2",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "2D-list elements in Python are accessed as: `[index1][index2]`. Whereas 2D-array elements in NumPy are accessed as:",
        "code": None,
        "options": [
            {"key": "A", "text": "[index1][index2]"},
            {"key": "B", "text": "[index1, index2]"},
            {"key": "C", "text": "(index1)(index2)"},
            {"key": "D", "text": "Both (A) and (B)"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: In NumPy, elements can be accessed using comma syntax `arr[row, col]` (efficient) OR standard nested brackets `arr[row][col]`. Both forms work in NumPy, making **Both (A) and (B)** correct.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which indexing syntax is preferred and most efficient in NumPy?",
            "code": None,
            "options": [
                {"key": "A", "text": "arr[row, col] (avoids creating temporary intermediate arrays)"},
                {"key": "B", "text": "arr[row][col]"},
                {"key": "C", "text": "arr(row, col)"},
                {"key": "D", "text": "arr.get(row, col)"}
            ],
            "correctAnswer": "A",
            "explanation": "Comma syntax `arr[row, col]` avoids allocating an intermediate 1D slice array."
        }
    },
    {
        "id": "M212-P3-3",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Official Past Midterms",
        "questionText": "Which of the following plots can be used for depicting (plotting) the relationship between a numeric variable and a categorical variable?",
        "code": None,
        "options": [
            {"key": "A", "text": "Violin plot and Box plot"},
            {"key": "B", "text": "Scatter plot only"},
            {"key": "C", "text": "Count plot only"},
            {"key": "D", "text": "Line plot only"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Categorical distribution plots (Boxplot, Violinplot) are designed to compare distributions of a continuous numerical variable across different categories of a categorical variable.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which plot is best suited to display frequency counts of a single categorical variable?",
            "code": None,
            "options": [
                {"key": "A", "text": "Countplot"},
                {"key": "B", "text": "Scatterplot"},
                {"key": "C", "text": "Pairplot"},
                {"key": "D", "text": "Heatmap"}
            ],
            "correctAnswer": "A",
            "explanation": "`sns.countplot` shows the number of occurrences for each categorical category."
        }
    },
    {
        "id": "M212-P3-5",
        "sourceFile": "Midterm_ISE291_Term_212_213.pdf",
        "topic": "Topic 4: Structured Data and Visualization",
        "category": "Official Past Midterms",
        "questionText": "Missing values in a Pandas DataFrame are displayed and represented by default as:",
        "code": None,
        "options": [
            {"key": "A", "text": "NaN"},
            {"key": "B", "text": "NA"},
            {"key": "C", "text": "Null"},
            {"key": "D", "text": "None"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In Pandas, missing floating point data is represented using NumPy's `NaN` (Not a Number) marker.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: Which Pandas method returns a boolean DataFrame indicating whether each cell is missing?",
            "code": None,
            "options": [
                {"key": "A", "text": "df.isna() or df.isnull()"},
                {"key": "B", "text": "df.drop_missing()"},
                {"key": "C", "text": "df.has_null()"},
                {"key": "D", "text": "df.is_empty()"}
            ],
            "correctAnswer": "A",
            "explanation": "`.isna()` and `.isnull()` return booleans marking missing entries."
        }
    },

    # --- Official 223 Midterm (More Questions) ---
    {
        "id": "M223-3",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 1: Introduction to Data Science",
        "category": "Official Past Midterms",
        "questionText": "In the model planning phase of the data analytics life cycle, the team determines the methods, techniques, and workflow it intends to follow for the ________________ phase.",
        "code": None,
        "options": [
            {"key": "A", "text": "Discovery"},
            {"key": "B", "text": "Operationalize"},
            {"key": "C", "text": "Data preparation"},
            {"key": "D", "text": "Model building"}
        ],
        "correctAnswer": "D",
        "explanation": "**Course Concept**: In the Data Analytics Lifecycle (Topic 1):\n1. Discovery $\\to$ 2. Data Preparation $\\to$ 3. **Model Planning** $\\to$ 4. **Model Building**.\nDuring Model Planning, the team selects algorithms and techniques in direct preparation for the execution in **Model Building**.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: In which lifecycle phase do teams deploy the model to live production systems and communicate findings?",
            "code": None,
            "options": [
                {"key": "A", "text": "Operationalize (Deployment)"},
                {"key": "B", "text": "Model Planning"},
                {"key": "C", "text": "Data Prep"},
                {"key": "D", "text": "Discovery"}
            ],
            "correctAnswer": "A",
            "explanation": "Phase 6: Operationalize delivers final reports, briefings, and production code deployment."
        }
    },
    {
        "id": "M223-4",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "In order to sort a 2D NumPy array column-wise, we set the axis to ___, and to sort row-wise, we set the axis to ___:",
        "code": None,
        "options": [
            {"key": "A", "text": "Zero, One"},
            {"key": "B", "text": "One, Zero"},
            {"key": "C", "text": "Zero, Zero"},
            {"key": "D", "text": "One, One"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: In NumPy functions (`sort`, `sum`, `mean`):\n- `axis=0` operates along rows (down columns, i.e. column-wise).\n- `axis=1` operates along columns (across rows, i.e. row-wise).\nTherefore, sorting column-wise is axis 0, and row-wise is axis 1.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: What does `arr.sum(axis=1)` compute for a matrix?",
            "code": None,
            "options": [
                {"key": "A", "text": "Sum of each individual row"},
                {"key": "B", "text": "Sum of each column"},
                {"key": "C", "text": "Total sum of all elements"},
                {"key": "D", "text": "The diagonal sum"}
            ],
            "correctAnswer": "A",
            "explanation": "`axis=1` collapses horizontally across columns, yielding the sum for each row."
        }
    },
    {
        "id": "M223-13",
        "sourceFile": "223_Midterm_Exam.pdf",
        "topic": "Topic 2: Python Review",
        "category": "Official Past Midterms",
        "questionText": "What is the output of the following code:\n\nimport numpy as np\na = np.array([1, 2, 3, 4])\nb = np.array([[6, 4, 7, 9], [13, 5, 6, 8]])\nprint(b - 2 * a + min(a))",
        "code": "import numpy as np\na = np.array([1, 2, 3, 4])\nb = np.array([[6, 4, 7, 9], [13, 5, 6, 8]])\nprint(b - 2 * a + min(a))",
        "options": [
            {"key": "A", "text": "[[ 5  1  2  2]\n [12  2  1  1]]"},
            {"key": "B", "text": "[[11  5  9 11]\n [25  7  7  9]]"},
            {"key": "C", "text": "[[ 6  1 -1 -6]\n [13  2 -2 -7]]"},
            {"key": "D", "text": "The operation is invalid (results in an error)"}
        ],
        "correctAnswer": "A",
        "explanation": "**Course Concept**: Vector arithmetic with broadcasting:\n1. $a = [1, 2, 3, 4]$, so $2 \\times a = [2, 4, 6, 8]$.\n2. $\\min(a) = 1$.\n3. Row 1 of $b$: $[6, 4, 7, 9] - [2, 4, 6, 8] + 1 = [4, 0, 1, 1] + 1 = [5, 1, 2, 2]$.\n4. Row 2 of $b$: $[13, 5, 6, 8] - [2, 4, 6, 8] + 1 = [11, 1, 0, 0] + 1 = [12, 2, 1, 1]$.\nResult:\n`[[ 5, 1, 2, 2], [12, 2, 1, 1]]`.",
        "reinforcementQuestion": {
            "questionText": "Concept Reinforcement: For vector `v = np.array([10, 20, 30])`, what is `v - min(v)`?",
            "code": None,
            "options": [
                {"key": "A", "text": "array([0, 10, 20])"},
                {"key": "B", "text": "array([10, 10, 10])"},
                {"key": "C", "text": "array([-10, 0, 10])"},
                {"key": "D", "text": "0"}
            ],
            "correctAnswer": "A",
            "explanation": "Subtracting $\\min(v) = 10$ from each element gives `[10-10, 20-10, 30-10] = [0, 10, 20]`."
        }
    }
]

ALL_NEW_QUESTIONS = NEW_QUESTIONS + ADDITIONAL_QUESTIONS
print(f"Total new questions created: {len(ALL_NEW_QUESTIONS)}")

with open(r'c:\Users\acer\Desktop\Automation\etc files\web_app\all_new_questions.json', 'w', encoding='utf-8') as f:
    json.dump(ALL_NEW_QUESTIONS, f, indent=2)

print("Saved all_new_questions.json successfully.")
