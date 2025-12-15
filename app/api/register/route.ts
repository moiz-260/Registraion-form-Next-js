"use client";
import { NextRequest, NextResponse } from "next/server";
import { useEffect, useState } from "react";

const [random, setRandom] = useState(0);

useEffect(() => {
  setRandom(Math.random());
}, []);

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Here you can save data to a database, send email, etc.
  // For now, just return the data as confirmation
  return NextResponse.json({ success: true, data });
}

if (typeof window !== "undefined") {
  // safe to use window/localStorage
}
