"use client";

import { useEffect, useState } from "react";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

type BackendStatus = "checking" | "connected" | "disconnected";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");

        if (response.data?.success) {
          setBackendStatus("connected");
          return;
        }

        setBackendStatus("disconnected");
      } catch {
        setBackendStatus("disconnected");
      }
    };

    void checkBackend();
  }, []);

  const isConnected = backendStatus === "connected";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_34%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-12 sm:px-8 lg:px-12">
        <Card className="w-full border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-200/60 backdrop-blur">
          <CardHeader className="space-y-3 pb-4">
            <div className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Day 1 Setup
            </div>
            <CardTitle className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              AI Support Triage Platform
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 sm:text-xl">
              Day 1 Setup Complete
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">Frontend</p>
                <p className="font-medium text-slate-950">Next.js 15 + Tailwind</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">Backend</p>
                <p className="font-medium text-slate-950">Express + TypeScript</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">Database</p>
                <p className="font-medium text-slate-950">PostgreSQL + Prisma</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
              {isConnected ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
              <div>
                <p className="text-sm text-slate-500">Backend Status</p>
                <p className="font-medium text-slate-950">
                  {backendStatus === "checking"
                    ? "Checking"
                    : isConnected
                      ? "Connected"
                      : "Disconnected"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
