// Exports every document in the "survey_responses" Firestore collection
// to an Excel (.xlsx) file in the project's /exports folder.
//
// This uses the Firebase ADMIN SDK (not the regular web SDK), which is why
// it can read data even though the app's security rules block reads from
// the browser. It needs a private service account key — see README.md for
// how to download one. NEVER commit that key file or share it publicly;
// it grants full admin access to your Firebase project.
//
// Usage:  npm run export

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const keyPath = path.join(__dirname, "..", "serviceAccountKey.json");

if (!fs.existsSync(keyPath)) {
  console.error(
    "\n❌ Missing serviceAccountKey.json\n\n" +
    "Download it from Firebase Console > Project settings > Service accounts\n" +
    "> Generate new private key, and save it as 'serviceAccountKey.json' in\n" +
    "the root of this project (same folder as package.json).\n"
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function exportToExcel() {
  console.log("Fetching survey responses from Firestore...");

  const snapshot = await db.collection("survey_responses").orderBy("submittedAt", "asc").get();

  if (snapshot.empty) {
    console.log("No survey responses found yet.");
    return;
  }

  const rows = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      "Response ID": doc.id,
      "Submitted At": data.submittedAt?.toDate?.().toLocaleString() ?? "",
      "Age Group": data.ageGroup ?? "",
      "Gender": data.gender ?? "",
      "Living Area": data.livingArea ?? "",
      "City/Town": data.cityName ?? "",
      "Occupation": data.occupation ?? "",
      "Relationship Status": data.relationshipStatus ?? "",
      "Emotionally Overwhelmed (1-7)": data.emotionallyOverwhelmed ?? "",
      "Difficulty Relaxing (1-7)": data.difficultyRelaxing ?? "",
      "Sudden Irritation (1-7)": data.suddenIrritation ?? "",
      "Acts On Impulse (1-7)": data.actOnImpulse ?? "",
      "Emotions Affect Decisions (1-7)": data.emotionsAffectDecisions ?? "",
      "Overthinking Disturbs Sleep (1-7)": data.overthinkingSleep ?? "",
      "Screen Time Control (1-7)": data.screenTimeControl ?? "",
      "Confidence Handling Emotions (1-7)": data.handlingEmotions ?? "",
      "Willingness To Improve": data.willingnessToImprove ?? "",
      "Hesitates To Seek Support": data.hesitateToSeekSupport ?? "",
      "Reason For Dealing Alone": data.reasonForDealingAlone ?? "",
      "Willingness To Pay": data.willingnessToPay ?? "",
      "Willingness To Pay (Opinion)": data.willingnessToPayOpinion ?? "",
      "Mental Wellness Tools Opinion": data.mentalWellnessToolsOpinion ?? "",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Responses");

  // Auto-width columns roughly based on header length
  worksheet["!cols"] = Object.keys(rows[0]).map((key) => ({
    wch: Math.max(key.length, 20),
  }));

  const exportsDir = path.join(__dirname, "..", "exports");
  if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputPath = path.join(exportsDir, `survey_responses_${timestamp}.xlsx`);

  XLSX.writeFile(workbook, outputPath);

  console.log(`✅ Exported ${rows.length} responses to: ${outputPath}`);
}

exportToExcel().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
