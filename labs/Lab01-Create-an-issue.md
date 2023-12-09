# Lab 1: Create a workflow that comments on an issue
Here is a lab that helps you on the way of using GitHub Actions for any automation you can think off. 

If you're really stuck, there are hints in the `help` folder that can get you to the next step.

# 1. Create an comment to an issue
The basics of IssueOps is to comment back to the issue/PR conversation and indicate that you are doing something in the background. Let's build some of this ourselves!

Create a workflow that adds a comment on an issue, using the three different setups below:

1. Using the GitHub CLI: `gh issue comment create --body "Hello World" --issue 1`
1. Using the `actions/github-script@v6` action
1. Only add a comment when the issue is labeled with `bug`

> [!TIP] 
> Notice which user get attributed to have made the comment. Is it the Author of the issue/PR, or somthing else?

> [!IMPORTANT]
> The goal is to have a workflow that triggers when someone creates an issue or pull request. The workflow should add a comment to the issue/PR conversation.

# 1. Use notifications effectively
A user only gets a notification when they actually follow the repository (more info in [this explainer video](https://youtu.be/eIWzKR465M0)). When using IssueOps, you can automate tagging a user or a team to make sure they get the notifications. 

1. Tag yourself when an issue or pull request is created. Here is [an action](https://github.com/marketplace/actions/issue-comment-tag) from the marketplace that can help.

> ![IMPORTANT]
> The goal is to have a workflow that triggers when someone creates an issue or pull request. The workflow should tag you in the issue/PR conversation which means you get a notification for this issue.