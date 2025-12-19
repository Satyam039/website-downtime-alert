import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { getServerMetrics } from "./metrics-to-ai.js";
import { sendAlertEmail } from "../email-service/mailer.mjs";



dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔒 Deterministic risk logic (NO AI hallucination)
function calculateRisk(cpu, memory, disk) {
  if (cpu > 90 || memory > 90 || disk > 90) return "high";
  if (cpu > 70 || memory > 70 || disk > 70) return "medium";
  return "low";
}

app.post("/analyze", async (req, res) => {
  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({ error: "website required" });
    }

    // 🔥 STEP 1: Get metrics from Prometheus
    const { cpu, memory, disk } = await getServerMetrics();

    console.log("📊 Metrics:", { cpu, memory, disk });

    // 🔥 STEP 2: Deterministic risk
    const risk = calculateRisk(cpu, memory, disk);

    // 🔥 STEP 3: AI explanation ONLY (no decision)
    const prompt = `
You are a senior DevOps SRE.

Website: ${website}
CPU usage: ${cpu}%
Memory usage: ${memory}%
Disk usage: ${disk}%

Risk level is already determined as: ${risk.toUpperCase()}

Explain:
1. Why this risk level occurred
2. Step-by-step safe remediation
(No emojis, clear production language)
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt, // ✅ SIMPLE STRING
    });

    const explanation = response.output_text;

    // 🔥 STEP 4: Email if HIGH
    if (risk === "high") {
      console.log("📨 Sending alert email for:", website);

      await sendAlertEmail({
        website,
        analysis: `
🚨 RISK: HIGH

CPU: ${cpu}%
Memory: ${memory}%
Disk: ${disk}%

${explanation}
        `,
      });
    }

    // 🔥 STEP 5: API response
    res.json({
      website,
      metrics: { cpu, memory, disk },
      risk,
      emailSent: risk === "high",
    });

  } catch (err) {
    console.error("AI Engine Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("🤖 AI Engine running on port 4000 (STABLE MODE)");
});
