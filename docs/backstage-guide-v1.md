# Getting Started with Backstage: A Developer’s Guide to Setup and Building Custom Plugins

Backstage is an open-source platform, initially developed by Spotify and now part of CNCF, that serves as a unified developer portal. It centralizes all infrastructure tools, services, and documentation, offering a customizable environment where teams can manage projects, streamline workflows, and boost productivity. 

Built on React and Node, Backstage allows teams to define its functionality through a flexible plugin system, making it a robust framework for creating tailored end-to-end development environments.

## Features Backstage Provides to Developers

### Software Catalog:

Backstage's Software Catalog is a centralized directory for all services within your organization. It offers a clear, searchable overview of each service, including ownership and status, making it easy for teams to manage and discover the necessary tools.

### Software Templates:

Software Templates in Backstage automate the creation of new projects or components, ensuring consistency and speeding up onboarding. With these templates, teams can quickly start new projects that adhere to organizational standards.

### TechDocs:

TechDocs is Backstage’s built-in documentation generator, allowing teams to create and maintain project documentation using Markdown. This feature ensures that all documentation is easily accessible and up-to-date, promoting better knowledge sharing.

### Plugin Support:

Backstage’s Plugin Support allows for extensive customization, with a wide range of open-source plugins available for integration. Additionally, teams can develop custom plugins to extend the platform's functionality, tailoring it to their specific needs.

## Setting Up the Development Environment

Efficient development setups are crucial to maximizing productivity. In this guide, we'll simplify your workflow using a pre-configured repository with a Backstage starter app, ready for you to clone and build on.

To optimize the development environment, we'll also utilize Daytona to ensure a smooth and streamlined setup.

Before setting up your environment for Backstage, let's ensure you have the tools and a basic understanding to follow along smoothly. Here are the prerequisites you'll need:

### Prerequisites

- Preinstalled Daytona
- Docker installed
- Knowledge of React and Nodejs applications

### Setting up Daytona for Development Workspace

Setting up a local development environment often involves challenges like version conflicts and configuration headaches. [Daytona](https://www.daytona.io/) automates the setup of a Node.js environment, handles port forwarding smoothly, and executes essential post-setup commands, delivering a consistent, ready-to-use development environment with minimal manual effort.

For detailed instructions on getting Daytona installed and configured, visit the [Daytona installation documentation](https://www.daytona.io/docs/installation/installation/). This guide walks you through the process, ensuring your development environment is optimized and hassle-free.

### Cloning and Setting Up Your Environment for Backstage

1. **Start Daytona Server:**
* Open your terminal and start Daytona server using following command:
```bash
daytona serve
```
2. **Create Daytona Workspace:**
```bash
daytona create https://github.com/daytonaio-experiments/starter-backstage.git -t local
```

3. **Select Preferred IDE:**
   
```bash
daytona ide
```

4. **Open the Workspace:**
   
```bash
daytona code
```

After following these commands, the Backstage repository will open in your preferred IDE.

### Setting Up SSO for Backstage:

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
export GITHUB_CLIENT_ID=<ClientId>
export GITHUB_CLIENT_SECRET=<ClientSecret>
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

### Enabling GitHub Integrations

Now that we are allowing users to sign in to Backstage, we should allow them to create some software and register entities in GitHub. This can be done through personal access token.

* Generate a Personal Access Token via the [GitHub token creation page](https://github.com/settings/tokens).
* Ensure that the `repo` and `workflow` permissions are selected for scaffolding repositories.
* Update your `.env` file with the generated token.
```bash
export GITHUB_TOKEN=<PAT_TOKEN>
```

### Running your Backstage Application
1. **Install Dependencies:**
* After workspace gets opened install dependencies using:
```bash
yarn install
```
2. **Run your Backstage Application:**
```bash
yarn dev
```

Your Backstage Application will now be up and running.

![backstage-doc-1](https://github.com/user-attachments/assets/7982eb45-21d5-42be-8118-27c772836b53)

## Seamless Setup: Daytona Meets Dev Container

- By automating the setup and maintenance of development environments, Daytona enables developers to focus on core tasks, reducing time spent on non-productive activities and increasing overall efficiency. 

- Daytona enhances developer productivity by offering a standardized and scalable platform. It allows developers to quickly set up and access their development environments from anywhere, eliminating the need for local machine configurations. 

- Daytona streamlines the setup process of our Backstage application, ensuring a consistent and efficient development experience across different machines. 

Using devcontainer.json configuration provides a predefined development environment using Docker containers. Here’s the configuration used in this project:

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

## Building and Customizing Plugins in Backstage

Backstage plugins are small, self-contained applications that run within the Backstage platform. Each plugin is designed to address a particular use case or integrate with a specific service, such as CI/CD pipelines, monitoring tools, or cloud providers. By using plugins, you can create a seamless, unified interface for all your development tools, streamlining workflows and improving efficiency.

### How Are Plugins Useful?

* **Customization:** Tailor Backstage to meet specific organizational needs.
* **Integration:** Seamlessly connect with external tools and services.
* **Automation:** Automate repetitive tasks to streamline workflows

### Steps to Create a Custom Backstage Plugin

**Step 1: Create a Backstage Plugin**

From the root of your project, use the following command to create a new plugin:

```bash
yarn new --select plugin
```
- This command will invoke the Backstage CLI to generate a new plugin based on the provided ID (example: simple-plugin). 
- The plugin will be automatically built and added to your Backstage App.
- If your Backstage App is already running (via yarn start or yarn dev), you can view the default page for your new plugin by navigating to: `http://localhost:3000/simple-plugin`

**Step 2: Simplifying to a "Hello World!" Plugin**

- When the plugin is generated, the CLI scaffolds several files in the plugins/my-plugin directory.
- To create a simple "Hello World" plugin, strip down the contents of `\plugins\simple-plugin\src\components\ExampleComponent\ExampleComponent.tsx` to the following:

```tsx
import React from 'react';
import { Content, Page } from '@backstage/core-components';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Content>
      <h1>Hello, World!</h1>
      <p>This is your simple plugin.</p>
    </Content>
  </Page>
);
```
- As the component has been significantly simplified, you can remove unnecessary files such as the test file `ExampleComponent.test.tsx` and the entire    `ExampleFetchComponent` folder.
- Your plugin has been reduced to a minimal "Hello World!" setup and is ready for further development.

**Step 3: Integrate into the Software Catalog**

1. Remove the following lines from `packages/app/src/App.tsx` to avoid direct routing:

```tsx
import { SimplePluginPage } from '@internal/backstage-plugin-simple-plugin';
...
<Route path="/simple-plugin" element={<SimplePluginPage />}/>
```
2. Add the following lines to `packages/app/src/components/catalog/EntityPage.tsx` to include your plugin as tabbed content:

```tsx
import { SimplePluginPage } from '@internal/backstage-plugin-simple-plugin';
...
const serviceEntityPage = (
  <EntityLayout>
    ...
    <EntityLayout.Route path="/simple-plugin" title="My Plugin">
      <SimplePluginPage />
    </EntityLayout.Route>
  </EntityLayout>
);
```
3. Rebuild or restart the Backstage App image.
4. Create a new GitHub repository `(e.g., my-simple-plugin-component)` with a `catalog-info.yaml` file:
```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-simple-plugin-component
spec:
  lifecycle: production
  owner: my-team
  type: service
```

5. Use the `HOME > CREATE > REGISTER EXISTING COMPONENT` button to register your service component using the link to the `catalog-info.yaml` file.
   
![backstage-doc-2](https://github.com/user-attachments/assets/8a36ca0a-f2b4-4626-a6ed-8ab754f1bb66)

6. Once registered, you can navigate to the component and use the `MY PLUGIN` tab to display your plugin’s UI.

![backstage-doc-3](https://github.com/user-attachments/assets/34f04310-9566-4ef5-818e-d7fe89667d4a)

Now that you've created and integrated a custom plugin in Backstage, you’ve added a powerful tool to your developer portal. This plugin can now serve your team’s specific needs, making your workflows smoother and more efficient.

## Conclusion

Congratulations! You have successfully set up your Backstage environment and explored the basics of building custom plugins. With [Daytona](https://www.daytona.io/), you've ensured a consistent and efficient development environment, simplifying the setup process and boosting productivity. By using Daytona's capabilities, you've overcome the complexities of local setup, providing a seamless and uniform workspace for all developers involved.

Now, you can focus on expanding and customizing your Backstage platform without worrying about environmental inconsistencies or setup issues. If you encounter any challenges or have further questions, the Daytona team is readily available to assist you on [Slack](https://go.daytona.io/slack), or you can open an issue on the [Daytona GitHub repository](https://github.com/daytonaio/daytona). Happy coding, and enjoy your development journey with Backstage!
