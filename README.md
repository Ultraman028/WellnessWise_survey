# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Connecting to Firebase (real-time survey responses)

This project saves every completed survey to a Firestore collection called
`survey_responses`, so you can watch responses arrive in real time from the
Firebase Console.

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Add project**.
2. Once created, click the **web icon (`</>`)** to register a web app (no need for Firebase Hosting unless you want it).
3. Copy the `firebaseConfig` values shown — you'll need them in step 3.

### 2. Enable Firestore

1. In the left sidebar, go to **Build > Firestore Database**.
2. Click **Create database**, choose a region close to your users, and start in **production mode**.

### 3. Add your config as environment variables

1. Copy `.env.example` to `.env`.
2. Fill in the values from your Firebase config:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

   `.env` is already git-ignored, so these won't be committed. Note: Firebase
   web API keys aren't secret by design — actual protection comes from the
   Firestore security rules in step 4.

### 4. Apply the security rules

This repo includes `firestore.rules`, which lets anyone **submit** a survey
response but blocks anyone from **reading, editing, or deleting** responses
from the browser (so results stay private and can't be tampered with).

Apply it either via the Console or the CLI:

- **Console**: Firestore Database > Rules tab > paste the contents of `firestore.rules` > Publish.
- **CLI**: `npm i -g firebase-tools`, then `firebase login`, `firebase init firestore` (point it at this project), and `firebase deploy --only firestore:rules`.

### 5. Install the Firebase SDK and run

```sh
npm i
npm run dev
```

Submit a test response through the survey — it should appear instantly under
**Firestore Database > Data > survey_responses** in the console.

### Viewing responses

- **Quick look**: Firebase Console > Firestore Database > Data tab. It updates live as new responses come in.
- **Export for analysis**: use the Console's export/import feature, or query the collection from a script with the Firebase Admin SDK (server-side, since client rules block reads).
- **Live dashboard**: if you want an in-app admin view with real-time counts/charts, that can be added as a separate authenticated page using Firestore's `onSnapshot` listener — let me know if you'd like that built.

## Exporting responses to Excel

Since the app's security rules block reading data from the browser (on
purpose, to keep responses private), exporting uses a separate script with
admin-level access, run from your own computer.

### 1. Download a service account key

1. In the Firebase Console, click the gear icon > **Project settings**.
2. Go to the **Service accounts** tab.
3. Click **Generate new private key** > **Generate key**. A `.json` file will download.
4. Rename it to exactly `serviceAccountKey.json` and place it in the root of this project (same folder as `package.json`).

⚠️ This file grants full admin access to your Firebase project — never share it, email it, or commit it to Git. It's already excluded via `.gitignore`.

### 2. Run the export

```sh
npm i
npm run export
```

This creates a timestamped `.xlsx` file inside an `exports/` folder, e.g. `exports/survey_responses_2026-08-17T10-05-00.xlsx`, with one row per response and one column per question — ready to open in Excel.

Run `npm run export` again anytime to pull the latest responses into a fresh file.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
