import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import {
  fetchGithubActivity,
  fetchGithubContributions,
} from "./github-proxy";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/github-contributions", async (req, res) => {
    try {
      const username =
        typeof req.query.username === "string" ? req.query.username : "anshitraj";
      const data = await fetchGithubContributions(username || "anshitraj");
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400",
      );
      res.json(data);
    } catch (err: unknown) {
      const status =
        err && typeof err === "object" && "status" in err
          ? Number((err as { status: number }).status)
          : 500;
      const message =
        err instanceof Error ? err.message : "Failed to fetch contributions";
      res.status(Number.isFinite(status) ? status : 500).json({ error: message });
    }
  });

  app.get("/api/github-activity", async (req, res) => {
    try {
      const username =
        typeof req.query.username === "string" ? req.query.username : "anshitraj";
      const data = await fetchGithubActivity(username || "anshitraj");
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=3600",
      );
      res.json(data);
    } catch (err: unknown) {
      const status =
        err && typeof err === "object" && "status" in err
          ? Number((err as { status: number }).status)
          : 500;
      const message =
        err instanceof Error ? err.message : "Failed to fetch GitHub activity";
      res.status(Number.isFinite(status) ? status : 500).json({ error: message });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
