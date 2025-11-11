EasyMoto - TypeScript Cloud Functions + CI (Option 1)

What is included:
- functions/src/index.ts   -> TypeScript Cloud Functions (auto-dispatch, getEtaForOrder, onRiderNodeChange)
- functions/package.json   -> npm scripts (build, deploy)
- functions/tsconfig.json  -> TypeScript config
- .github/workflows/deploy-functions.yml -> GitHub Actions workflow to auto-deploy on push to main
- diagrams/*.mmd           -> Mermaid diagrams (architecture + dispatch flow)

Quick setup (local):
1. Ensure Node 18+ and firebase-tools installed:
   npm install -g firebase-tools
   firebase login

2. Initialize Firebase functions (if not already)
   firebase init functions
   (choose TypeScript)

3. Copy the files from this package into your project's functions/ directory.

4. Install deps and build:
   cd functions
   npm install
   npm run build

5. Set config keys:
   firebase functions:config:set google.apikey="YOUR_GOOGLE_API_KEY"
   firebase functions:config:set chapa.key="YOUR_CHAPA_KEY"
   firebase functions:config:set expo.push_url="https://exp.host/--/api/v2/push/send"

6. Deploy:
   firebase deploy --only functions

GitHub Actions:
- Add FIREBASE_TOKEN secret to your GitHub repo (generate with `firebase login:ci`)
- On push to main, workflow will build & deploy functions.

Diagrams:
- Use mermaid.live or GitHub to render .mmd files included in /diagrams.

Support:
- Reply with 'deploy' if you want precise copy-paste commands for your environment or 'help ci' to configure GitHub.
