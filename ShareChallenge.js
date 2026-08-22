import { useState } from "react";

// Draws a shareable result card to an offscreen canvas and returns it as a
// PNG blob. No backend involved — same "share as image, no database"
// pattern as RepMax's challenge feature.
function drawShareImage({ venue, city, occasionName, accent }) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");

    // Background: accent color fading into the wine brand color
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, accent);
    gradient.addColorStop(1, "#3D1220");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Wordmark
    ctx.fillStyle = "#F7F0E4";
    ctx.font = "700 56px Georgia, serif";
    ctx.fillText("SpinPlate", 72, 140);

    // Eyebrow
    ctx.font = "600 32px monospace";
    ctx.fillStyle = "rgba(247,240,228,0.75)";
    ctx.fillText(`${occasionName.toUpperCase()} · ${city.name.toUpperCase()}, ${city.state}`, 72, 210);

    // Venue name — wrap if long
    ctx.fillStyle = "#F7F0E4";
    ctx.font = "700 84px Georgia, serif";
    wrapText(ctx, venue.name, 72, 340, canvas.width - 144, 96);

    // Footer
    ctx.font = "500 30px sans-serif";
    ctx.fillStyle = "rgba(247,240,228,0.6)";
    ctx.fillText("Real spot. Real spin. spinplate.vercel.app", 72, canvas.height - 80);

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, cursorY);
      line = word + " ";
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, cursorY);
}

export default function ShareChallenge({ venue, city, occasion, accent }) {
  const [shareState, setShareState] = useState("idle"); // idle | working | copied | done
  const [challengeState, setChallengeState] = useState("idle");

  async function handleShare() {
    setShareState("working");
    try {
      const blob = await drawShareImage({ venue, city, occasionName: occasion.name, accent });
      const file = new File([blob], "spinplate-result.png", { type: "image/png" });
      const shareText = `I got ${venue.name} for ${occasion.name.toLowerCase()} in ${city.name}.`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "My SpinPlate result", text: shareText });
        setShareState("done");
      } else {
        // Fallback: download the image instead
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "spinplate-result.png";
        a.click();
        URL.revokeObjectURL(url);
        setShareState("done");
      }
    } catch {
      setShareState("idle"); // user likely cancelled the native share sheet — not an error
    }
    setTimeout(() => setShareState("idle"), 2000);
  }

  async function handleChallenge() {
    setChallengeState("working");
    const url = `${window.location.origin}/${city.slug}/${occasion.slug}?challenge=1`;
    // Framed honestly: this is an invite to spin, not a promise they'll land
    // on the same place — the pick is random over live data.
    const text = `I got ${venue.name} for ${occasion.name.toLowerCase()} in ${city.name} on SpinPlate. Spin and see where you land:`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "SpinPlate challenge", text, url });
        setChallengeState("idle");
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setChallengeState("copied");
    } catch {
      setChallengeState("idle");
    }
    setTimeout(() => setChallengeState("idle"), 2000);
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      <button
        onClick={handleShare}
        disabled={shareState === "working"}
        className="rounded-2xl border border-wine/15 py-3 text-xs font-semibold text-wine transition-transform active:scale-95"
      >
        {shareState === "working" ? "Preparing…" : shareState === "done" ? "Shared ✓" : "Share my spin"}
      </button>
      <button
        onClick={handleChallenge}
        disabled={challengeState === "working"}
        className="rounded-2xl border border-wine/15 py-3 text-xs font-semibold text-wine transition-transform active:scale-95"
      >
        {challengeState === "working"
          ? "Preparing…"
          : challengeState === "copied"
          ? "Link copied ✓"
          : "Challenge a friend"}
      </button>
    </div>
  );
}
