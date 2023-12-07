# Lab 1: Create a workflow that comments on an issue

# 1. Create an comment to an issue

1. Using the GitHub CLI: `gh issue comment create --body "Hello World" --issue 1`
1. Using the `actions/github-script@v6` action
1. Only add a comment when the issue is labeled with `bug`