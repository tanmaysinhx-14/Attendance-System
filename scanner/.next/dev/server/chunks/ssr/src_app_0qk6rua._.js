module.exports = [
"[project]/src/app/assets/page.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cameraButton": "page-module__53ceQW__cameraButton",
  "container": "page-module__53ceQW__container",
  "error": "page-module__53ceQW__error",
  "info": "page-module__53ceQW__info",
  "message": "page-module__53ceQW__message",
  "page": "page-module__53ceQW__page",
  "reader": "page-module__53ceQW__reader",
  "scannerId": "page-module__53ceQW__scannerId",
  "status": "page-module__53ceQW__status",
  "success": "page-module__53ceQW__success",
  "title": "page-module__53ceQW__title",
});
}),
"[project]/src/app/scannerClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/assets/page.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
function Home() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const encryptedToken = searchParams.get("token");
    const [cameraRunning, setCameraRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Click Start Camera to begin");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const qrRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scanningLockedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hasValidToken = typeof encryptedToken === "string" && encryptedToken.trim().length > 0;
    const scannerStatus = hasValidToken ? status : "Open scanner from your account dashboard to enable scanning.";
    const startCamera = async ()=>{
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
        const { Html5Qrcode } = await __turbopack_context__.A("[project]/node_modules/html5-qrcode/esm/index.js [app-ssr] (ecmascript, async loader)");
        const devices = await Html5Qrcode.getCameras();
        if (!devices.length) {
            setStatus("No camera found");
            return;
        }
        const camera = devices.find((d)=>d.label.toLowerCase().includes("back")) || devices[0];
        qrRef.current = new Html5Qrcode("reader");
        await qrRef.current.start(camera.id, {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight)=>{
                const size = Math.min(viewfinderWidth, viewfinderHeight) * 0.7;
                return {
                    width: size,
                    height: size
                };
            },
            disableFlip: false
        }, async (text)=>{
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
                    headers: {
                        "Content-Type": "application/json"
                    },
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
            } catch (err) {
                scanningLockedRef.current = false;
                lastTokenRef.current = null;
                const errorMessage = err instanceof Error && err.message ? err.message : "Attendance upload failed";
                if (!errorMessage.toLowerCase().includes("already recorded")) {
                    try {
                        await qrRef.current?.resume();
                        setStatus("Scan failed. Try again.");
                    } catch  {}
                } else {
                    setStatus("Attendance already recorded");
                }
                setMessage({
                    type: "error",
                    text: errorMessage
                });
            }
        }, ()=>{});
        setCameraRunning(true);
        setStatus("Scanning QR");
    };
    const stopCamera = async ()=>{
        if (!qrRef.current) return;
        try {
            await qrRef.current.stop();
            await qrRef.current.clear();
        } catch  {}
        qrRef.current = null;
        scanningLockedRef.current = false;
        setCameraRunning(false);
        setStatus("Stopped");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: "Scan Attendance QR"
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this),
                !cameraRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cameraButton,
                    disabled: !hasValidToken,
                    onClick: startCamera,
                    type: "button",
                    children: "Start Camera"
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "reader",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reader
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                    children: !message && scannerStatus
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].message} ${message.type === "success" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success : message.type === "error" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].info}`,
                    children: message.text
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this),
                cameraRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cameraButton,
                    onClick: stopCamera,
                    type: "button",
                    children: "Stop Camera"
                }, void 0, false, {
                    fileName: "[project]/src/app/scannerClient.tsx",
                    lineNumber: 187,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/scannerClient.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/scannerClient.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_0qk6rua._.js.map