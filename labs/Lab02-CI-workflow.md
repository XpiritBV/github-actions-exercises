# Lab 2: CI workflow for the application in this repository
In this lab you create continuous integration (CI) workflow for the application in this repository. The workflow will run on every push to the `main` branch.

## 1. Create a workflow file that executes a CI build
A CI build is a build that runs on every push to a branch. Building the application prevents issues from being merged into the `main` branch that would break the application. The build validates that all changes have been added to the branch. This way there should be less issues where you go "it works on my machine" 😁.

1. Create a new file in the `.github/workflows` folder called `ci.yml`.
1. Execute `npm run build` and `npm run test` in the workflow.

> [!IMPORTANT]
> The goal is to have a successful build, that runs on every push to the any branch. It executes a build and runs the tests. When the build or test fails, the workflow should fail as well.

# Implement best practices for GitHub Actions
* Use a SHA hash instead of branch name or version tag
* Implement caching for the node_modules folder
* Use a matrix to run the build on multiple versions of node.js
* Specify the version of the node.js runtime

# 2. Use a SHA hash instead of branch name or version tag
Instead of using a version tag or branch name, use a SHA hash. This ensures that the workflow always uses the same version of the code. 

When using a branch name or version tag, the workflow will use the latest version of the branch or tag. This can lead to unexpected behavior when the branch or tag is updated.

> Note, you can load the SHA hash for an action by:
> - Going to the version tag (that you validated and checked for security issues). 
> - Click on the tag to go to the commit page.
> - Click on "commits" to go to the commit history.
> - Click on the copy button next to the commit hash you want to use
>
> Do note that you need to use the full SHA hash, not the abbreviated version.

![Image of the user interface on the commit history page](images/lab1-SHA-hash.png)

You can also use a tool like [app.stepsecurity.io](https://app.stepsecurity.io/) that will do the conversion for you (and extra security measures as well). You onle need to change on `Pin Actions to a full length commit SHA` for this change.

You can also add SHA hash and then the version number as a tag so that the user can easily see which version of the action is used. This will look like this:

```yaml
uses: actions/checkout@1234567890123456789012345678901234567890 #v2.1.45
```

> Success criteria
> The goal is to have a successful build, that runs on every push to the branch, using the pinned sha hash instead of the version number.

# 3. Implement caching for the node_modules folder
The node_modules folder contains all the dependencies for the application. This folder can be quite large and it takes a while to download all the dependencies. You can speed up the workflow by caching the node_modules folder using the `actions/cache` action created by GitHub. That way the workflow can use the cached version instead of downloading all the dependencies again. The data in the cache is downloaded in one stream, instead of all the separate calls to the npm registry.

Use the hash of the package-lock.json file as the key for the cache. This ensures that the cache is invalidated when the dependencies change.

> [!IMPORTANT]
> The goal is to have a successful build, and the workflow should use the cached version of the node_modules folder. Notice the difference in the time it takes to download the dependencies vs downloading the cached files. Caching ha

# 4. Use a matrix to run the build on multiple versions of node.js
The application supports multiple versions of node.js. You can use a matrix to run the build on multiple versions of node.js with the same job definition. This ensures that the application works on all supported versions of node.js. Implement a matrix that runs the build on the following versions of node.js: 16, 18, 20.

> [!IMPORTANT]
> The goal is to have a successful build, and the workflow should run the build and tests on multiple versions of node.js. 

# 5. Specify the version of the node.js runtime
The node.js runtime is used to execute the build and test scripts. You can specify the version of the node.js runtime by using the `setup-node` action created by GitHub. This ensures that the workflow uses the same version of the node.js runtime every time, instead of hoping the correct version is installed on the runner.

> [!IMPORTANT]
> The goal is to have a successful build, and the workflow should use the `actions/setup-node` action with a specifc version of the node.js runtime. Recently GitHub added the caching mechanisme by default to the setup-* actions, so it does the same thing as the `actions/cache` action can achieve. This means that you could remove the `actions/cache` action from the workflow as it is no longer needed.

# 6. Show test results in the workflow
Showing the test results in the workflow run is a great way to get feedback on the quality of the code. You can use the `dorny/test-reporter` action to show the test results in the workflow. This action supports multiple test reporters, including the `mocha-json` reporter that is used in this application.

**Example:**
```yaml
- name: Test Report
      uses: dorny/test-reporter@v1
      if: success() || failure()        # run this step even if previous step failed
      with:
        name: "Mocha Tests ${{ matrix.node-version }}"              # Name of the check run which will be created
        path: test-results.json # Path to test results
        reporter: mocha-json            # Format of test results
```

> [!WARNING]
> The action will create annotations on the workflow run (and the PR if that is the context) to show the results. This is using the `checks` API and there for needs permissions to create those checks. Add all the permissions in one go to prevent issues with the action. (Bonus points if you can figure out which permissions are needed and send in a PR to this repo 😉).
```yaml 
    permissions:
      write-all # needed for the test reporter check
```

# 7. Upload the Docker image to GitHub Container Registry
The application can be hosted in a Docker container. You can build the Docker image and upload it to the GitHub Container Registry. This allows you to use the Docker image in other workflows, or to deploy the Docker image to a Kubernetes cluster. This is part of the CI workflow as you deliver a versioned artifact that can be used in other workflows (whre you do the Continuous Deployment for example).

1. Add the building of the Docker image to the CI workflow. Use this command: `docker build -t ghcr.io/<your-github-username>/nodejs-ci-workflow:latest .`
1. Add the uploading of the Docker image to the CI workflow. Use this command: `docker push ghcr.io/<your-github-username>/nodejs-ci-workflow:latest`
1. Information about how to use the GitHub Packages as a Container registry can be found [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry), incl. the scopes you need for the GITHUB_TOKEN.

> [!IMPORTANT]
> The goal is to have a successful build, and the workflow should build and upload the Docker image to the GitHub Container Registry. You can check if the image is uploaded by going to the GitHub Container Registry. Bonus points if you add a version tag to the Docker image and push that as well.

# 8. Upload the repository registry to a GitHub Release
Create a workflow file (or add a new job) that will create a release from the repository. This workflow should only run from the main branch. 

> [!TIP]
> 1. You can use the `actions/create-release` action to create a release. You can use the `actions/upload-release-asset` action to upload the Docker image to the release.
> 1. Another option is to use the GitHub CLI to [create a release](https://cli.github.com/manual/gh_release_create).
>
> Try both!

Bonus points: The workflow should create a release with the version number from the package.json file. 

Bonus points: Create one or more PR's (manually) and let the release notes be generated from the PR's titles. See the effect.