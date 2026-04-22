import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database (Simulating MongoDB/Firestore for mandatory API endpoints)
  const users: any[] = [];
  const loans: any[] = [];

  // API ENDPOINTS
  
  // POST /user (create profile)
  app.post("/api/user", (req, res) => {
    const user = { ...req.body, id: Date.now().toString(), createdAt: new Date() };
    users.push(user);
    res.json(user);
  });

  // GET /user/:id (get profile)
  app.get("/api/user/:id", (req, res) => {
    const user = users.find(u => u.id === req.params.id || u.userId === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });

  // POST /loan/apply
  app.post("/api/loan/apply", (req, res) => {
    const loan = { 
      ...req.body, 
      id: "LOAN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: "Submitted",
      createdAt: new Date() 
    };
    loans.push(loan);
    res.json(loan);
  });

  // GET /loan/status/:id
  app.get("/api/loan/status/:id", (req, res) => {
    const loan = loans.find(l => l.id === req.params.id);
    if (!loan) return res.status(404).json({ error: "Loan not found" });
    res.json({ status: loan.status });
  });

  // GET /emi-schedule
  app.get("/api/emi-schedule", (req, res) => {
    const { amount, rate, tenure } = req.query;
    if (!amount || !rate || !tenure) return res.status(400).json({ error: "Missing parameters" });
    
    const p = parseFloat(amount as string);
    const r = parseFloat(rate as string) / 12 / 100;
    const n = parseInt(tenure as string);
    
    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const schedule = [];
    let balance = p;
    for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principal = emiValue - interest;
        balance -= principal;
        schedule.push({
            month: i,
            amount: parseFloat(emiValue.toFixed(2)),
            principal: parseFloat(principal.toFixed(2)),
            interest: parseFloat(interest.toFixed(2)),
            balance: parseFloat(Math.max(0, balance).toFixed(2)),
            status: "Pending",
            dueDate: new Date(new Date().setMonth(new Date().getMonth() + i))
        });
    }
    res.json(schedule);
  });

  // POST /eligibility
  // Note: AI logic will be moved to frontend as per Gemini Skill guidelines, 
  // but I'll provide a placeholder or proxy here if needed.
  app.post("/api/eligibility", (req, res) => {
    const { landOwned, annualIncome, existingLoans } = req.body;
    // Simple rule-based fallback for the API endpoint
    let eligibility = "Low";
    let amount = 0;
    
    const score = (landOwned * 50000) + (annualIncome * 0.5) - (existingLoans);
    if (score > 500000) {
      eligibility = "High";
      amount = score * 0.8;
    } else if (score > 200000) {
      eligibility = "Medium";
      amount = score * 0.5;
    } else {
      eligibility = "Low";
      amount = score > 0 ? score * 0.2 : 0;
    }

    res.json({
      eligibility,
      estimatedAmount: Math.round(amount),
      message: `Based on your land of ${landOwned} acres and income, your loan eligibility is ${eligibility}. You can potentially avail a credit of up to ₹${Math.round(amount)}.`
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
