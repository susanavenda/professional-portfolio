# Authenticate and Run - Quick Setup

## 🚀 Fastest Method (2 minutes)

### Step 1: Get GitHub Token

**Option A: Use GitHub CLI (Recommended)**
```bash
gh auth login
```
Follow the prompts, then run:
```bash
cd /Users/susana/Documents/workspace/professional-portfolio
gh auth token | xargs -I {} GITHUB_TOKEN={} ./setup-all-repos-api.sh
```

**Option B: Create Personal Access Token**
1. Go to: https://github.com/settings/tokens/new
2. Name: "Repository Setup"
3. Expiration: 90 days (or your preference)
4. Scopes: Check `repo` (Full control of private repositories)
5. Click "Generate token"
6. Copy the token
7. Run:
```bash
cd /Users/susana/Documents/workspace/professional-portfolio
export GITHUB_TOKEN=your_token_here
./setup-all-repos-api.sh
```

### Step 2: Verify

After running, check your repositories:
- https://github.com/susanavenda/professional-portfolio
- https://github.com/susanavenda/observability-platform
- https://github.com/susanavenda/containerized-apps
- https://github.com/susanavenda/devops-practice-platform
- https://github.com/susanavenda/angular-hybrid-app
- https://github.com/susanavenda/spring-boot-demo

---

## 📝 What the Script Does

The script will set for all 6 repositories:
- ✅ Description
- ✅ Website (for professional-portfolio)
- ✅ Topics (10-17 topics per repository)

---

*Ready to run!*
