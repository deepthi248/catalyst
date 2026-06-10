# Git — A Practical Reference (from zero to "I can debug my own mess")

This file exists so that next time something looks broken, you can diagnose it
yourself instead of feeling lost. Read the **Concepts** section once, slowly —
everything else builds on it. Then keep this file as a lookup table.

---

## PART 1 — THE CORE MENTAL MODEL

Forget the commands for a second. Git is fundamentally just **three things**:

1. **Snapshots (commits)** — A commit is a saved photo of your entire project
   at one moment in time. Not a "diff", not a "change" — a full snapshot
   (git is smart about storing them efficiently, but conceptually, think
   "photo album page").

2. **Refs (pointers/bookmarks)** — A "ref" is just a name that points at a
   commit. `main` is a ref. `origin/main` is a ref. A tag is a ref. Refs are
   nothing but a label with an arrow pointing at one specific commit.
   They live as small text files inside `.git/refs/`.

3. **HEAD** — A special ref that points to "where you currently are." Normally
   `HEAD` points at a branch (e.g. `main`), and that branch points at a commit.
   So HEAD → main → commit. When you make a new commit, HEAD's branch moves
   forward to point at the new commit. This is the entire trick behind how
   branches "move."

**Once you internalize "commits are photos, branches are sticky-notes pointing
at photos, HEAD is 'you are here'" — 80% of git confusion disappears.**

---

## PART 2 — THE EVERYDAY WORKFLOW (commands you'll use constantly)

```bash
git status              # "What's going on right now?" — your #1 debugging command
git add <file>          # Stage a file (mark it to be included in the next snapshot)
git add .               # Stage everything changed in this folder
git commit -m "msg"     # Take the snapshot (save staged changes permanently)
git log --oneline       # See your snapshot history, newest first
git diff                # See exactly what changed but isn't staged yet
git diff --staged       # See what changed AND is staged for the next commit
```

**Mental checkpoint:** `git status` is your flashlight. Run it constantly —
before and after every command — until reading its output feels natural.

---

## PART 3 — BRANCHES (parallel timelines)

A branch is just a **movable sticky-note pointing at a commit**. That's it.
Creating a branch does NOT copy your files — it just adds a new sticky-note.

```bash
git branch                     # List branches (★ = current)
git branch <name>              # Create a new branch (sticky-note) at current commit
git checkout <name>            # Switch HEAD to point at a different branch
git checkout -b <name>         # Create AND switch in one step (most common)
git switch <name>              # Modern alternative to checkout (clearer intent)
git switch -c <name>           # Modern alternative to checkout -b
git branch -M main             # Rename CURRENT branch to "main" (the -M = "force rename")
git branch -d <name>           # Delete a branch (safe — refuses if unmerged)
git branch -D <name>           # Force-delete a branch (DANGEROUS — can lose commits)
```

**Why branches exist:** so you can work on a feature without disturbing your
working `main`. You branch off, make commits on your branch's own timeline,
and later bring those changes back into `main`.

---

## PART 4 — MERGING (bringing timelines back together)

```bash
git checkout main          # Go to the branch you want to update
git merge feature-branch   # Bring feature-branch's commits into main
```

Two outcomes:
- **Fast-forward merge**: if `main` hasn't moved since you branched off, git
  just slides the `main` sticky-note forward to the tip of your feature branch.
  No new commit is created — it's trivial.
- **Real merge (3-way merge)**: if both branches have new commits, git creates
  a special "merge commit" that has TWO parent commits, stitching the
  histories together.

**Merge conflicts** happen when the same lines of the same file were changed
differently on both branches — git can't decide which version is "right" and
asks you to. You'll see markers like this in the file:
```
<<<<<<< HEAD
your version
=======
their version
>>>>>>> feature-branch
```
Edit the file to keep what you want, delete the `<<<<<<<`/`=======`/`>>>>>>>`
markers, then:
```bash
git add <file>             # Mark the conflict as resolved
git commit                 # Complete the merge
```

**Rebase** (the alternative to merge — good to know exists, avoid until comfortable):
```bash
git rebase main            # Replay your branch's commits on top of main's tip
```
This rewrites history (creates new commit hashes) — never rebase commits
you've already pushed and shared with others.

---

## PART 5 — REFS & update-ref (what actually broke for you)

Every branch, tag, and remote-tracking branch is a "ref" — a tiny text file
under `.git/refs/` containing a commit hash. You can inspect them directly:

```bash
cat .git/HEAD                       # Shows what HEAD points to (usually a branch)
cat .git/refs/heads/main            # Shows the commit hash 'main' points to
git show-ref                        # Lists ALL refs and what they point to
git rev-parse main                  # Shortcut: "what commit does main point to?"
```

**`git update-ref`** directly sets where a ref points — it's a low-level
"surgery" tool that bypasses the normal safety checks of `commit`/`merge`/etc.

```bash
git update-ref refs/heads/main <commit-hash>
```
= "Make the `main` bookmark point at this exact commit." This is what fixed
your earlier issue: your commit existed and was safe, but no branch ref
pointed at it (it was "dangling"). We manually pointed `main` at it.

**You'll rarely need `update-ref` yourself** — but knowing it exists means
you'll never panic when a branch "disappears." The data is very likely still
there; only the bookmark is missing.

---

## PART 6 — FINDING "LOST" COMMITS

This is your superpower for "I think I lost my work" panics.

```bash
git fsck --full --no-reflogs --unreachable --dangling
   # Lists commits that exist in storage but aren't pointed at by any ref
   # ("dangling commits") — exactly how we found your lost commit

git reflog
   # Shows a chronological log of every place HEAD has pointed to,
   # including commits that are no longer reachable from any branch.
   # This is git's built-in "undo history" — extremely powerful.
   # Lost a commit after a reset/rebase/checkout? `git reflog` almost
   # always has it.

git cat-file -p <hash>
   # Inspect the raw contents of any git object (commit, tree, blob)
   # by its hash. Useful to confirm "is this really my commit?"
```

**Golden rule:** in git, it is *very* hard to truly lose committed work.
Almost everything that "disappears" is just a missing bookmark — the photo
is still in the album, you just need to find which page it's on.

---

## PART 7 — REMOTES (talking to GitHub)

```bash
git remote -v                        # List remotes and their URLs
git remote add origin <url>          # Connect local repo to a remote named "origin"
git remote remove origin             # Disconnect a remote
git remote set-url origin <url>      # Change a remote's URL

git push -u origin main              # Push + remember "main tracks origin/main"
                                      # (-u = --set-upstream; only needed once)
git push                              # After -u is set, just this works
git pull                              # Fetch + merge remote changes into your branch
git fetch                             # Download remote changes WITHOUT merging
                                      # (safer — lets you inspect before merging)
```

**`origin` is just a name** — a label for "the remote URL I primarily push to
and pull from." You could name it anything; `origin` is convention.

---

## PART 8 — UNDOING THINGS (the "oh no" toolkit)

Ordered from safest to most dangerous:

```bash
git restore <file>                # Discard uncommitted changes to a file (careful!)
git restore --staged <file>       # Unstage a file (keeps your edits, just unstages)

git commit --amend -m "new msg"   # Edit your most recent commit (message or content)
                                   # ⚠ only do this on commits you haven't pushed yet

git revert <commit-hash>          # Create a NEW commit that undoes an old commit
                                   # ✅ SAFE for shared/pushed history — doesn't rewrite

git reset --soft <commit-hash>    # Move branch pointer back, keep changes staged
git reset --mixed <commit-hash>   # Move branch pointer back, keep changes unstaged (default)
git reset --hard <commit-hash>    # Move branch pointer back, DELETE changes entirely
                                   # ⚠⚠⚠ DANGEROUS — can permanently lose uncommitted work
```

**Rule of thumb:**
- Haven't pushed yet? `reset` and `amend` are fine to clean up your own mess.
- Already pushed / shared with others? Use `revert` — it adds a new commit
  rather than rewriting history that others may have already built on.

---

## PART 9 — COMMON BEGINNER MISTAKES (and what they actually mean)

| What you see | What's actually happening | Fix |
|---|---|---|
| `error: src refspec main does not match any` | The branch `main` has no commits yet (or its pointer is detached/dangling) — there's nothing to push | `git log --oneline` to check; if commit exists but is dangling, find it with `git fsck --dangling` and `git update-ref` it back |
| `fatal: not a git repository` | You're not inside a folder that has a `.git` directory | `cd` into your project folder, or run `git init` if it's genuinely new |
| `Reinitialized existing Git repository` | You ran `git init` in a folder that *already* had git set up | This is often a sign of leftover state from an earlier attempt — investigate with `git status`, `git log`, `git remote -v` before continuing |
| `error: remote origin already exists` | You tried to add a remote named `origin` but one is already configured | Check it with `git remote -v` — if it's the right URL, just skip that step; if wrong, `git remote set-url origin <correct-url>` |
| Changes "disappeared" after `checkout`/`reset`/`rebase` | Almost always still recoverable — they're "dangling" commits, not deleted | `git reflog` first (shows recent HEAD history), then `git fsck --dangling` if needed |
| `Your branch is ahead of 'origin/main' by N commits` | You have local commits that haven't been pushed yet | `git push` |
| `Your branch is behind 'origin/main' by N commits` | The remote has commits you don't have locally | `git pull` |
| Merge conflict markers `<<<<<<<` appear in your code | Two branches changed the same lines differently | Manually edit the file to the correct final version, remove the markers, `git add`, `git commit` |
| Committed a secret (API key, password) by accident | It's now permanently in history (even if you delete the file in a new commit) | Rotate/revoke the secret immediately on the provider's side; consider `git filter-repo` or BFG to scrub history (advanced — ask for help) |
| `detached HEAD` warning | You checked out a specific commit (not a branch) — you're "floating" outside any branch's timeline | If you want to keep work done here: `git checkout -b new-branch-name` to anchor it to a real branch before switching away |

---

## PART 10 — YOUR GO-TO DEBUGGING SEQUENCE

When *anything* feels wrong, run these — in order — before touching anything else:

```bash
git status                  # What does git think is going on?
git log --oneline -10       # Do my commits look right?
git branch -vv              # What branch am I on, and is it tracking a remote?
git remote -v               # Is my remote configured correctly?
git reflog -10              # What has HEAD been doing recently? (your safety net)
```

These five commands give you a complete picture 90% of the time. Read the
output slowly, out loud if it helps — git's messages are usually more
informative than they first appear once you know what "ref", "HEAD", "staged"
and "branch" actually mean.

---

## PART 11 — GLOSSARY (quick lookup)

- **Repository (repo)** — A project folder tracked by git (has a hidden `.git` folder)
- **Working directory** — Your actual files, as you see them in Finder/VS Code
- **Staging area / index** — The "waiting room" for changes before they become a commit
- **Commit** — A saved snapshot with a unique hash ID, a message, and a parent commit
- **Branch** — A movable pointer to a commit (a "sticky note", not a copy of files)
- **HEAD** — Pointer to "where you are right now" (usually points at a branch)
- **Ref** — Any named pointer to a commit (branches, tags, remote-tracking branches)
- **Remote** — A version of your repo hosted elsewhere (e.g. GitHub), referenced by name (`origin`)
- **Upstream / tracking branch** — The remote branch your local branch is linked to (set via `-u`)
- **Clone** — Download a full copy of a remote repo, including all its history
- **Fork** — A copy of someone else's repo under your own account on GitHub
- **Pull request (PR)** — A GitHub feature: "please merge my branch into yours, here's the diff"
- **.gitignore** — A file listing things git should never track (e.g. `node_modules/`, `.env`)
- **Dangling commit** — A commit that exists in storage but has no ref pointing to it
- **Detached HEAD** — When HEAD points directly at a commit instead of a branch

---

*Add to this file whenever you hit something new and figure it out — that's
exactly what `learnings.md` is for, and this file is its git-specific cousin.*
