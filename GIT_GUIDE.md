# 📚 Git Guide - Step by Step

A comprehensive guide for using Git with the House Renting Mobile App project.

## 🚀 Quick Setup (First Time)

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and log into your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in repository details:**
   - Repository name: `house-renting-mobile`
   - Description: `React Native mobile app for house renting with authentication and property management`
   - Choose **Public** or **Private** (your preference)
   - ✅ Check "Add a README file" (we'll replace it)
   - ✅ Check "Add .gitignore" and select **Node**
   - Choose a license if desired
5. **Click "Create repository"**

### Step 2: Connect Local Repository to GitHub

Open terminal in your project directory and run:

```bash
# Add GitHub repository as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/house-renting-mobile.git

# Verify the remote was added correctly
git remote -v

# Set the default branch name to main (if not already)
git branch -M main

# Push your code to GitHub for the first time
git push -u origin main
```

**Note:** If you get an error about the remote repository having files (README, .gitignore), use:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## 📋 Daily Git Workflow

### Making Changes and Committing

```bash
# 1. Check current status
git status

# 2. Add specific files
git add filename.tsx
# OR add all changes
git add .

# 3. Commit with a meaningful message
git commit -m "feat: add property search functionality"

# 4. Push to GitHub
git push origin main
```

### Checking Your Work

```bash
# See what files have changed
git status

# See the actual changes in files
git diff

# See commit history
git log --oneline

# See remote repository information
git remote -v
```

## 🔄 Common Git Commands Explained

### Repository Management

```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone https://github.com/username/repository-name.git

# Check repository status
git status

# View commit history
git log
git log --oneline  # Compact view
git log --graph    # Visual branch representation
```

### Staging and Committing

```bash
# Add files to staging area
git add filename.txt          # Add specific file
git add *.tsx                # Add all TypeScript React files
git add .                    # Add all changes
git add -A                   # Add all changes including deletions

# Remove files from staging area
git reset filename.txt       # Unstage specific file
git reset                   # Unstage all files

# Commit changes
git commit -m "commit message"              # Commit with message
git commit -am "commit message"             # Add and commit in one step
git commit --amend -m "new message"         # Edit last commit message
```

### Branching and Merging

```bash
# Create and switch branches
git branch feature-name                     # Create new branch
git checkout feature-name                   # Switch to branch
git checkout -b feature-name                # Create and switch in one step
git switch feature-name                     # Modern way to switch branches

# Merge branches
git checkout main                           # Switch to main branch
git merge feature-name                      # Merge feature branch into main

# Delete branches
git branch -d feature-name                  # Delete local branch
git push origin --delete feature-name      # Delete remote branch
```

### Remote Repository Operations

```bash
# Remote management
git remote add origin URL                   # Add remote repository
git remote -v                              # View remote repositories
git remote remove origin                   # Remove remote

# Fetching and pulling
git fetch origin                           # Download changes without merging
git pull origin main                       # Download and merge changes
git pull                                   # Pull from default remote/branch

# Pushing
git push origin main                       # Push to specific branch
git push -u origin main                    # Push and set upstream
git push                                   # Push to default remote/branch
```

## 🏗️ Project-Specific Workflow

### Feature Development Workflow

```bash
# 1. Start working on a new feature
git checkout -b feature/property-search
git push -u origin feature/property-search

# 2. Make changes and commit regularly
git add .
git commit -m "feat: add search filters UI"
git push

# 3. When feature is complete, merge to main
git checkout main
git pull origin main                        # Get latest changes
git merge feature/property-search
git push origin main

# 4. Clean up
git branch -d feature/property-search
git push origin --delete feature/property-search
```

### Hotfix Workflow

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/login-bug

# 2. Fix the issue and commit
git add .
git commit -m "fix: resolve login authentication issue"
git push -u origin hotfix/login-bug

# 3. Merge back to main
git checkout main
git merge hotfix/login-bug
git push origin main

# 4. Clean up
git branch -d hotfix/login-bug
git push origin --delete hotfix/login-bug
```

## 📝 Commit Message Convention

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve property image loading issue"
git commit -m "docs: update installation instructions"
git commit -m "style: format code with prettier"
git commit -m "refactor: optimize API service structure"
git commit -m "test: add unit tests for PropertyCard component"
git commit -m "chore: update dependencies"
```

## 🔧 Useful Git Configurations

### One-time Setup

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default editor
git config --global core.editor "code --wait"  # For VS Code

# Enable colorful output
git config --global color.ui auto

# Set default branch name
git config --global init.defaultBranch main

# View all configurations
git config --list
```

### Helpful Aliases

```bash
# Add useful shortcuts
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Now you can use: git st instead of git status
```

## 🚨 Troubleshooting Common Issues

### Authentication Issues

```bash
# If you get authentication errors, set up SSH keys or use personal access tokens

# For HTTPS with personal access token:
git remote set-url origin https://YOUR_TOKEN@github.com/username/repository.git

# For SSH (recommended):
# 1. Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Add public key to GitHub (copy content of ~/.ssh/id_ed25519.pub)

# 4. Update remote to use SSH
git remote set-url origin git@github.com:username/repository.git
```

### Merge Conflicts

```bash
# When you have merge conflicts:
# 1. Open conflicted files and resolve manually
# 2. Mark as resolved
git add conflicted-file.tsx

# 3. Complete the merge
git commit -m "resolve merge conflict in conflicted-file.tsx"
```

### Undoing Changes

```bash
# Undo uncommitted changes
git checkout -- filename.tsx              # Undo changes to specific file
git reset --hard                          # Undo all uncommitted changes

# Undo commits
git reset --soft HEAD~1                   # Undo last commit, keep changes staged
git reset --mixed HEAD~1                  # Undo last commit, unstage changes
git reset --hard HEAD~1                   # Undo last commit, lose all changes

# Create new commit that undoes a previous commit
git revert commit-hash
```

### Large File Issues

```bash
# Remove large files from history (use carefully!)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/large/file' \
--prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (easier)
java -jar bfg.jar --delete-files large-file.zip
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```

## 📊 Checking Repository Health

### Repository Statistics

```bash
# Check repository size
git count-objects -v

# See largest files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort --numeric-sort --key=2 | tail -10

# Check branch status
git branch -a                             # All branches
git branch -r                             # Remote branches
git branch --merged                       # Merged branches
git branch --no-merged                    # Unmerged branches
```

### Maintenance Commands

```bash
# Clean up repository
git gc                                    # Garbage collection
git prune                                 # Remove unreachable objects
git fsck                                  # Check repository integrity

# Clean working directory
git clean -n                              # See what would be removed
git clean -f                              # Remove untracked files
git clean -fd                             # Remove untracked files and directories
```

## 🎯 Best Practices

### 1. Commit Frequently
- Make small, focused commits
- Commit working code that doesn't break the build
- Write clear, descriptive commit messages

### 2. Use Branches
- Create feature branches for new development
- Keep main branch stable and deployable
- Use descriptive branch names

### 3. Review Before Pushing
```bash
# Always review your changes before pushing
git diff --staged                         # Review staged changes
git log --oneline -5                      # Check recent commits
```

### 4. Pull Before Pushing
```bash
# Always pull latest changes before pushing
git pull origin main
git push origin main
```

### 5. Backup Important Work
```bash
# Push regularly to backup your work
git push origin feature-branch
```

### 6. Use .gitignore Effectively
```gitignore
# Node.js
node_modules/
npm-debug.log*

# Expo
.expo/
dist/
web-build/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Environment variables
.env*.local
```

## 🔗 Useful Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

---

**Happy coding! 🚀** 