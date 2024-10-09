# Backstage Starter using Dev Container and Daytona

This repository contains a Backstage application set up within a Dev Container environment. Backstage is an open-source platform for building developer portals, allowing you to centralize your infrastructure tooling, services, and documentation. The project is configured with Dev Container to streamline development, making it easier to set up, develop, and maintain.

![backstage-starter-daytona-2](https://github.com/user-attachments/assets/576c1746-e71a-4b05-9ecc-425536d561df)


## Features

- **Developer Portal**: Centralized platform to manage services, documentation, and tooling.
- **SSO Integration**: Simplified setup for Single Sign-On (SSO) using GitHub.
- **Dev Container Configuration**: Pre-configured development environment using Dev Container for consistent development setups.

## Technologies Used

- **Backend**: Node.js
- **Frontend**: React.js
- **Infrastructure**: Backstage, Docker
- **Development Environment**: Dev Container

## Setting Up Workspace using Daytona

### Requirements

- **Preinstalled Daytona and Docker**.

### Steps to Set Up Workspace for Backstage

1. **Start Daytona Server:**
* Open your terminal and start Daytona server using following command:
```bash
daytona serve
```
2. **Create and Open in Daytona Workspace:**
```bash
daytona create https://github.com/daytonaio-experiments/starter-backstage.git --code
```

3. **Setting Up SSO for Backstage:**

To enable Single Sign-On (SSO) for your Backstage application, you need administrative access to your GitHub organization. If you don't have an organization, you can create one by navigating to [GitHub Organizations](https://github.com/account/organizations).

Once you have an organization, proceed to create a new OAuth App:

1. Navigate to [GitHub OAuth Apps](https://github.com/settings/applications/new) and create a new OAuth App for your GitHub user.
2. For organization-wide integration, go to `https://github.com/organizations/<Organization_Name>/settings/applications`.

To register the application, follow these steps:

- **Application Name**: Choose a name to help users recognize the application, like "Local Backstage."
- **Homepage URL**: Enter `http://localhost:3000` for local development.
- **Application Description**: Provide a brief description, such as "Local testing of Backstage SSO."
- **Authorization Callback URL**: Use `http://localhost:7007/api/auth/github/handler/frame` as the callback URL.
- **Register Application**: Complete the setup by clicking the "Register application" button.

GitHub will provide you with a `Client ID` and `Client Secret`. Add these to your `.env` file:

```bash
GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>
```
Next, configure your GitHub organization in the app-config.yaml file to enable catalog ingestion:

```yaml

catalog:
  providers:
    githubOrg:
      id: github
      githubUrl: https://github.com
      orgs: ['<Your_Organization_Name>']
```

4. **Enabling GitHub Integrations:**

Now that we are allowing users to sign in to Backstage, we should allow them to create some software and register entities in GitHub. This can be done through personal access token.

* Generate a Personal Access Token via the [GitHub token creation page](https://github.com/settings/tokens).
* Ensure that the `repo` and `workflow` permissions are selected for scaffolding repositories.
* Update your `.env` file with the generated token.
```bash
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>
```

5. **Run your Backstage Application:**
```bash
yarn dev
```

## Dev Container Configuration

The project includes a devcontainer configuration for seamless development in a containerized environment.

### `devcontainer.json`

```json
{
  "name": "Backstage Dev Container",
  "image": "ubuntu:22.04",
  "features": {
    "ghcr.io/devcontainers/features/common-utils:2.4.7": {
      "username": "daytona",
      "userUid": 1000,
      "userGid": 1000,
      "configureZshAsDefaultShell": true
    },
    "ghcr.io/devcontainers/features/node:1": {
      "nodeGypDependencies": true,
      "version": "18",
      "nvmVersion": "0.39.5"
    },
    "ghcr.io/devcontainers-contrib/features/typescript:2": {},
    "ghcr.io/devcontainers/features/git:1": {}
  },
  "overrideFeatureInstallOrder": [
    "ghcr.io/devcontainers/features/common-utils",
    "ghcr.io/devcontainers/features/git",
    "ghcr.io/devcontainers/features/node",
    "ghcr.io/devcontainers-contrib/features/typescript"
  ],
  "runArgs": ["--network=host"],
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "streetsidesoftware.code-spell-checker",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  },
  "forwardPorts": [
    3000,
    7007
  ],
  "portsAttributes": {
    "3000": {
      "label": "Frontend",
      "onAutoForward": "notify"
    },
    "7007": {
      "label": "Backend",
      "onAutoForward": "ignore"
    }
  },
  "containerEnv": {
    "HOST": "0.0.0.0"
  },
  "workspaceFolder": "/workspaces/starter-backstage",
  "postCreateCommand": "yarn install",
  "remoteUser": "daytona"
}
```
This configuration includes:

- **name**: Specifies the name of the development environment as "Backstage Dev Container."
- **image**: Uses the `ubuntu:22.04` Docker image as the base for the development environment.
- **features**: 
  - **common-utils**: Adds common utilities with configurations for the user "daytona" (UID: 1000, GID: 1000) and sets Zsh as the default shell.
  - **node**: Installs Node.js version 18 with dependencies for `node-gyp` and manages Node versions using NVM 0.39.5.
  - **typescript**: Adds TypeScript support for the development environment.
  - **git**: Installs Git to manage source code versioning.
- **overrideFeatureInstallOrder**: Specifies the order of feature installation to ensure common utilities, Git, Node.js, and TypeScript are set up in the correct sequence.
- **runArgs**: Uses the `--network=host` argument to ensure the container shares the host's network, simplifying network configurations for development.
- **customizations**: Installs essential Visual Studio Code extensions, including Prettier, ESLint, a spell checker, and TypeScript Next.
- **forwardPorts**: Sets up port forwarding for the frontend (3000) and backend (7007) servers.
- **portsAttributes**: Labels the forwarded ports with "Frontend" for 3000 and "Backend" for 7007. The frontend port will notify on auto-forward, while the backend port will be ignored.
- **containerEnv**: Sets the environment variable `HOST` to `0.0.0.0`, ensuring that the application is accessible on all network interfaces.
- **workspaceFolder**: Sets the workspace folder to `/workspaces/starter-backstage` to match the local workspace folder name.
- **postCreateCommand**: Runs `yarn install` to automatically install project dependencies when the container is created.
- **remoteUser**: Sets "daytona" as the remote user for running commands within the container.

## Why Daytona?

Daytona is a radically simple open source development environment manager.

Setting up development environments has become increasingly challenging over time, especially when aiming to set up remotely, where the complexity increases by an order of magnitude. The process is so complex that we've compiled a comprehensive guide detailing all the necessary steps to set one up—spanning 5,000 words, 7 steps, and requiring anywhere from 15 to 45 minutes.

This complexity is unnecessary.

With Daytona, you need only to execute a single command: daytona create --code.

Daytona automates the entire process; provisioning the instance, interpreting and applying the configuration, setting up prebuilds, establishing a secure VPN connection, securely connecting your local or a Web IDE, and assigning a fully qualified domain name to the development environment for easy sharing and collaboration.

As a developer, you can immediately start focusing on what matters most—your code.

## Quick Start
### Mac / Linux
```bash
(curl -sf -L https://download.daytona.io/daytona/install.sh | sudo bash) && daytona server -y && daytona
```
### Windows
<details>
<summary>Windows PowerShell</summary>
This command downloads and installs Daytona and runs the Daytona Server:

```pwsh
$architecture = if ($env:PROCESSOR_ARCHITECTURE -eq "AMD64") { "amd64" } else { "arm64" }
md -Force "$Env:APPDATA\bin\daytona"; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]'Tls,Tls11,Tls12';
Invoke-WebRequest -URI "https://download.daytona.io/daytona/latest/daytona-windows-$architecture.exe" -OutFile "$Env:APPDATA\bin\daytona\daytona.exe";
$env:Path += ";" + $Env:APPDATA + "\bin\daytona"; [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User);
daytona serve;
```

</details>

### Create your first dev environment by opening a new terminal, and running:

```bash
daytona create --code
```
## Getting Started
### Requirements
Before starting the installation script, please go over all the necessary requirements:
- __Hardware Resources__: Depending on the project requirements, ensure your machine has sufficient resources. Minimum hardware specification is 1cpu, 2GB of RAM and 10GB of disk space.
- __Docker__: Ensure [Docker](https://www.docker.com/products/docker-desktop/) is installed and running.

### Initializing Daytona
To initialize Daytona, follow these steps:

__1. Start the Daytona Server:__
This initiates the Daytona Server in daemon mode. Use the command:
```bash
daytona server
```
__2. Add Your Git Provider of Choice:__
Daytona supports GitHub, GitLab, Bitbucket, Bitbucket Server, Gitea, Gitness and Azure DevOps. To add them to your profile, use the command:
```bash
daytona git-providers add

```
Follow the steps provided.

__3. Add Your Provider Target:__
This step is for choosing where to deploy Development Environments. By default, Daytona includes a Docker provider to spin up environments on your local machine. For remote development environments, use the command:
```bash
daytona target set
```
Following the steps this command adds SSH machines to your targets.

__4. Choose Your Default IDE:__
The default setting for Daytona is VS Code locally. If you prefer, you can switch to VS Code - Browser or any IDE from the JetBrains portfolio using the command:
```bash
daytona ide
```
Now that you have installed and initialized Daytona, you can proceed to setting up your development environments and start coding instantly.


### Creating Dev Environments
Creating development environments with Daytona is a straightforward process, accomplished with just one command:
```bash
daytona create --code
```

You can skip the `--code` flag if you don't wish to open the IDE immediately after creating the environment.

Upon executing this command, you will be prompted with two questions:
1. Choose the provider to decide where to create a dev environment.
2. Select or type the Git repository you wish to use to create a dev environment.

After making your selections, press enter, and Daytona will handle the rest. All that remains for you to do is to execute the following command to open your default IDE:
```bash
daytona code
```

This command opens your development environment in your preferred IDE, allowing you to start coding instantly.

### Stopping the Daytona Server:
```bash
daytona server stop
```

### Restarting the Daytona Server:
```bash
daytona server restart
```

## License

This repository contains Daytona, covered under the [Apache License 2.0](https://github.com/daytonaio/daytona/blob/main/LICENSE), except where noted (any Daytona logos or trademarks are not covered under the Apache License, and should be explicitly noted by a LICENSE file.)

Daytona is a product produced from this open source software, exclusively by Daytona Platforms, Inc. It is distributed under our commercial terms.

Others are allowed to make their own distribution of the software, but they cannot use any of the Daytona trademarks, cloud services, etc.

We explicitly grant permission for you to make a build that includes our trademarks while developing Daytona itself. You may not publish or share the build, and you may not use that build to run Daytona for any other purpose.
## Code of Conduct

This project has adapted the Code of Conduct from the [Contributor Covenant](https://www.contributor-covenant.org/). For more information see the [Code of Conduct](https://github.com/daytonaio/daytona/blob/main/CODE_OF_CONDUCT.md) or contact codeofconduct@daytona.io. with any additional questions or comments.
## Questions

For more information on how to use and develop Daytona, talk to us on [Slack](https://go.daytona.io/slack).
