# Sonar New Joiner
Start here: [read me](tessnow-ramirez-sonar.github.io/acdc-hub-site/)
or
Start here: [new-joiner.html](new-joiner.html)

This is the entry point for onboarding exercises. From there you can go to:

- **Administration** — hands-on SonarQube administration exercises
- **AC/DC Resource Hub** — onboarding and exercises for Sonar's AI features (AI CodeFix, Vortex, MCP Server, Remediation Agent, Hunter Agent, SARA)
- **Integration** — DevOps platform PR decoration, pipelines, webhooks, Jenkins, authentication/provisioning (SSO, LDAP, SAML, SCIM)
- **Analysis** — scanning basics, branches and PRs, inclusions/exclusions, Maven/Gradle, coverage import, tokens, edge-case languages
- **Operations** — databases, upgrades, Docker/Helm/DCE deployment, monitoring, logging, housekeeping

## Structure

```
new-joiner.html        Entry point / router
acdc/                  AC/DC Resource Hub: onboarding pages + exercises/
administration/        Administration onboarding exercise + teacher key
integration/           Integration onboarding exercise + teacher key
analysis/               Analysis onboarding exercise + teacher key
operations/             Operations onboarding exercise + teacher key
shared/img/            Shared static assets
```

Each exercise has a matching `*-teacher.html` grading key, linked from a small icon in the bottom-left corner of its student page. Teacher keys are intentionally not linked from any navigation.

## Running locally

This is a static site with no build step. Serve the directory with any static file server, for example:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/new-joiner.html`.
