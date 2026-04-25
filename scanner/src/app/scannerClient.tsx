"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";
import styles from "./assets/page.module.css";

export default function Home() {
  const searchParams = useSearchParams();
  const encryptedToken = searchParams.get("token");

  const [cameraRunning, setCameraRunning] = useState(false);
  const [status, setStatus] = useState("Click Start Camera to begin");

  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const qrRef = useRef<Html5Qrcode | null>(null);
  const lastTokenRef = useRef<string | null>(null);
  const scanningLockedRef = useRef(false);

  const hasValidToken = typeof encryptedToken === "string" && encryptedToken.trim().length > 0;
  const scannerStatus = hasValidToken
    ? status
    : "Open scanner from your account dashboard to enable scanning.";

  const startCamera = async () => {
    if (!hasValidToken) {
      setStatus("Scanner token missing");
      setMessage({
        type: "error",
        text: "Scanner access is missing. Open it from your account dashboard."
      });
      return;
    }

    setMessage(null);
    setStatus("Starting camera...");
    scanningLockedRef.current = false;

    const { Html5Qrcode } = await import("html5-qrcode");
    const devices = await Html5Qrcode.getCameras();

    if (!devices.length) {
      setStatus("No camera found");
      return;
    }

    const camera =
      devices.find(d => d.label.toLowerCase().includes("back")) || devices[0];

    qrRef.current = new Html5Qrcode("reader");

    await qrRef.current.start(
      camera.id,
      {
        fps: 10,
        qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
          const size = Math.min(viewfinderWidth, viewfinderHeight) * 0.7;
          return { width: size, height: size };
        },
        disableFlip: false
      },
      async (text: string) => {
        if (scanningLockedRef.current) return;
        scanningLockedRef.current = true;

        if (lastTokenRef.current === text) {
          scanningLockedRef.current = false;
          return;
        }

        lastTokenRef.current = text;
        navigator.vibrate?.(120);
        setStatus("Uploading...");

        try {
          const res = await fetch("/api/databaseUploader", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              encryptedScanner: encryptedToken,
              qrToken: text
            }),
            cache: "no-store"
          });

          const data = await res.json();

          if (!res.ok || data.success !== true) {
            throw new Error(data.error || data.message || "Attendance upload failed");
          }

          setMessage({
            type: "success",
            text: data.message || "Attendance recorded successfully"
          });

          navigator.vibrate?.(200);
          await qrRef.current?.pause(true);
          await stopCamera();
        }
        catch (err: unknown) {
          scanningLockedRef.current = false;
          lastTokenRef.current = null;

          const errorMessage =
            err instanceof Error && err.message
              ? err.message
              : "Attendance upload failed";

          if (!errorMessage.toLowerCase().includes("already recorded")) {
            try {
              await qrRef.current?.resume();
              setStatus("Scan failed. Try again.");
            } catch {}
          } else {
            setStatus("Attendance already recorded");
          }

          setMessage({
            type: "error",
            text: errorMessage
          });
        }
      },
      () => {}       
    );

    setCameraRunning(true);
    setStatus("Scanning QR");
  };

  const stopCamera = async () => {
    if (!qrRef.current) return;

    try {
      await qrRef.current.stop();
      await qrRef.current.clear();
    } catch {}

    qrRef.current = null;
    scanningLockedRef.current = false;
    setCameraRunning(false);
    setStatus("Stopped");
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Scan Attendance QR</h1>

        {!cameraRunning && (
          <button
            className={styles.cameraButton}
            disabled={!hasValidToken}
            onClick={startCamera}
            type="button"
          >
            Start Camera
          </button>
        )}

        <div id="reader" className={styles.reader} />

        <div className={styles.status}>
          {!message && scannerStatus}
        </div>

        {message && (
          <div
            className={`${styles.message} ${
              message.type === "success"
                ? styles.success
                : message.type === "error"
                ? styles.error
                : styles.info
            }`}
          >
            {message.text}
          </div>
        )}

        {cameraRunning && (
          <button
            className={styles.cameraButton}
            onClick={stopCamera}
            type="button"
          >
            Stop Camera
          </button>
        )}
      </div>
    </main>
  );
}
