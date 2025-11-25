# 📘 **Git Commit Style Guide**

A consistent commit style improves clarity, collaboration, and helps automate versioning, release notes, and CI pipelines.
This project follows a modified version of **Conventional Commits** optimized for backend development and scalability.

---

# 🚀 **Commit Message Format**

Each commit message must follow this structure:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

Example:

```
feat(auth): add redis-based otp verification
```

---

# 🏷 **Allowed Commit Types**

| Type         | Meaning                                      |
| ------------ | -------------------------------------------- |
| **feat**     | New feature added                            |
| **fix**      | Bug fix                                      |
| **refactor** | Code restructuring (logic unchanged)         |
| **perf**     | Performance improvements                     |
| **style**    | Formatting (no code logic changes)           |
| **docs**     | Documentation updates                        |
| **test**     | Adding or updating tests                     |
| **chore**    | Maintenance tasks (deps, config, cleanup)    |
| **ci**       | CI/CD related updates                        |
| **build**    | Build tool changes (tsconfig, webpack, etc.) |
| **revert**   | Reverting a previous commit                  |

---

# 🧩 **Scopes (Recommended)**

Scopes represent the module or feature being changed.

Examples:

* **auth**
* **user**
* **invoice**
* **client**
* **payment**
* **email**
* **sms**
* **config**
* **db**
* **logger**
* **routes**
* **infra**
* **scripts**
* **docs**

**Format:**

```
type(scope):
```

Example:

```
feat(invoice): add pdf generation utility
```

---

# ✍️ **Writing Good Commit Messages**

### ✔ 1. Use imperative mood

* “add feature”, not “added feature”

### ✔ 2. Keep summary under 72 characters

Short and direct.

### ✔ 3. One commit = one logical change

Do not mix unrelated updates.

### ✔ 4. Add a body when needed

Use body when a commit needs more explanation.

Example:

```
refactor(auth): extract otp generator into utils

moved logic from service to shared utils folder
to improve reusability and reduce duplication.
```

---

# ⭐ **Examples**

### **Feature**

```
feat(user): create base user model with company reference
```

### **Fix**

```
fix(auth): correct otp expiry calculation
```

### **Refactor**

```
refactor(invoice): move calculation logic to service layer
```

### **Documentation**

```
docs(readme): add commit style guide
```

### **Chore**

```
chore(config): update tsconfig to use bundler moduleResolution
```

### **Test**

```
test(auth): add unit tests for sendOtp flow
```

---

# 🔥 **Special Commit Types**

### **BREAKING CHANGE**

Used when API/contracts change.

```
feat(invoice): update invoice schema

BREAKING CHANGE: renamed field invoiceNumber → sequenceNumber
```

### **Revert**

```
revert: feat(auth) add email login feature

Reverted due to failing CI tests
```

---

# 🛠 **Automating Commit Validation (Optional)**

You can enforce commit style with:

* Husky
* Commitlint

**Example config (commitlint.config.js):**

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

---

# 🎉 You're Ready