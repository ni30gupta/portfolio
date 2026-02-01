import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Load service account either from env (JSON string) or from a file at project root
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT contains invalid JSON");
    }
  }
  
  // In production/Vercel, env var is required
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT environment variable is required in production. " +
      "Add it in your Vercel project settings -> Environment Variables."
    );
  }
  
  // Try a few common filenames for local development only
  const candidates = [
    "portfolio-5fabd-firebase-adminsdk-fbsvc-0a6eb20801.json",
    "serviceAccountKey.json",
    "service-account.json",
    "firebase-service-account.json",
    "firebase-adminsdk.json",
    "serviceAccount.json",
  ];

  for (const name of candidates) {
    const candidate = path.join(process.cwd(), name);
    if (fs.existsSync(candidate)) {
      const raw = fs.readFileSync(candidate, "utf8");
      try {
        return JSON.parse(raw);
      } catch (e) {
        throw new Error(`${name} contains invalid JSON`);
      }
    }
  }

  throw new Error(
    "No Firebase service account found. Place your service account JSON at project root (example: serviceAccountKey.json) and add it to .gitignore."
  );
}

// Initialize Firebase Admin lazily (only when handler is called)
function getAdmin() {
  if (!admin.apps.length) {
    const serviceAccount = loadServiceAccount();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin;
}

export async function POST(req) {
  try {
    // Initialize admin only when the endpoint is called
    const adminInstance = getAdmin();
    
    const { token, title, body } = await req.json();

    if (!token) {
      return new Response(JSON.stringify({ ok: false, error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = {
      token,
      notification: { title: title || "", body: body || "" },
    };

    const response = await adminInstance.messaging().send(message);

    return new Response(JSON.stringify({ ok: true, response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
