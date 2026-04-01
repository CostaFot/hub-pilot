# Hub Pilot

A Chrome extension that adds GitHub UI automations when browsing GitHub.

## Features

- **Say Hello** — injects a floating button on GitHub PR pages that posts a "hello" comment via the native comment form.

## Installation

1. Go to the [Releases](../../releases) page and download the latest `hub-pilot-vX.X.zip`
2. Extract the zip
3. Open `chrome://extensions` and enable **Developer mode**
4. Click **Load unpacked** and select the extracted folder

## Development

Clone the repo and load the folder directly as an unpacked extension:

```
git clone https://github.com/Costa-Fotiadis/hub-pilot.git
```

Then in `chrome://extensions` → **Load unpacked** → select the repo folder.

Releases are created automatically on every push to `main` via the [Auto Tag and Release](.github/workflows/auto-tag.yml) workflow.
