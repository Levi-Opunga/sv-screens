import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screensDir = path.join(__dirname, "src", "screens");
const htmlDir = path.join(__dirname, "html");
const jsDir = path.join(__dirname, "src", "js");

// Ensure js directory exists
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}
// Ensure screens directory exists
if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true });
}

const [, , screenPath] = process.argv;

if (!screenPath) {
  console.error("Please provide a screen path.");
  process.exit(1);
}

// Replace slashes in screenPath with underscores for screenName
const screenName = screenPath.split("/").join("_");

if (!screenName) {
  console.error("Screen name cannot be empty.");
  process.exit(1);
}

// Create directories for nested path
const nestedDir = path.join(screensDir, path.dirname(screenPath));
if (!fs.existsSync(nestedDir)) {
  fs.mkdirSync(nestedDir, { recursive: true });
}

const componentContent = `
<script lang="ts">
  export let name = "${screenName}";
</script>

<style>
  /* Add your styles here */
</style>

<h1>${screenName}</h1>
`;

const htmlContent = `
<div id="${screenName}"></div>
<script type="module" src="/src/js/${screenName}.ts"></script>
`;

const componentJs = `
import '../app.css'
import App from '../App.svelte';
const app = new App({
  target: document.getElementById('${screenName}')!,
  props: {
    screenName: '${screenName}'
  }
});
`;

const componentPath = path.join(
  nestedDir,
  `${path.basename(screenPath)}.svelte`,
);
const htmlPath = path.join(htmlDir, `${screenName.toLowerCase()}.html`);
const jsPath = path.join(jsDir, `${screenName}.ts`);

if (fs.existsSync(jsPath)) {
  console.error("JS file already exists.");
  process.exit(1);
}

if (fs.existsSync(htmlPath)) {
  console.error("HTML file already exists.");
  process.exit(1);
}

if (fs.existsSync(componentPath)) {
  console.error("Screen component already exists.");
  process.exit(1);
}

fs.writeFileSync(componentPath, componentContent.trim());
fs.writeFileSync(htmlPath, htmlContent.trim());
fs.writeFileSync(jsPath, componentJs.trim());

console.log(
  `Created ${screenPath}.svelte and ${screenName.toLowerCase()}.html`,
);
