import { useState } from "react";

const OCCASION_EMOJI = {
  brunch: "🥐",
  "date-night": "🕯️",
  coffee: "☕",
  "food-trucks": "🚚",
  "happy-hour": "🍹",
  lunch: "🥪",
  "late-night": "🌙",
  "family-dinner": "🍽️",
  "patio-outdoor": "☀️",
  bars: "🍺",
  "dessert-ice-cream": "🍨",
  bakeries: "🥖",
  breweries: "🍻",
};

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;
  let lines = 0;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, cursorY);
      line = word + " ";
      cursorY += lineHeight;
      lines++;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, cursorY);
  return lines + 1; // total lines drawn, so callers can lay out what comes after
}

// Shared background: gradient + a faint dot texture, matching the grain
// treatment already used on the main site so shared images feel branded
// rather than like a generic placeholder.
function drawBaseCard(accent) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(1, "#3D1220");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(247,240,228,0.05)";
  for (let y = 0; y < canvas.height; y += 28) {
    for (let x = 0; x < canvas.width; x += 28) {
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return { canvas, ctx };
}

function drawEmojiBadge(ctx, emoji, x, y, radius) {
  ctx.fillStyle = "rgba(247,240,228,0.16)";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `${Math.round(radius * 1.1)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, x, y + 4);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawPill(ctx, text, x, y, { bg = "rgba(247,240,228,0.9)", color = "#3D1220", font = "700 30px sans-serif" } = {}) {
  ctx.font = font;
  const paddingX = 32;
  const textWidth = ctx.measureText(text).width;
  const pillWidth = textWidth + paddingX * 2;
  const pillHeight = 66;

  ctx.fillStyle = bg;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, pillWidth, pillHeight, pillHeight / 2);
  } else {
    ctx.rect(x, y, pillWidth, pillHeight); // fallback for older browsers without roundRect support
  }
  ctx.fill();

  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + paddingX, y + pillHeight / 2 + 2);
  ctx.textBaseline = "alphabetic";
}

// SHARE: built for coordinating with one specific person who's about to
// actually go there — address is prominent, the pool-size fact is present
// but secondary, CTA reads as practical ("Get directions") not gamified.
function drawShareImage({ venue, city, occasion, poolSize, accent }) {
  return new Promise((resolve) => {
    const { canvas, ctx } = drawBaseCard(accent);
    const emoji = OCCASION_EMOJI[occasion.slug] || "🎯";

    drawEmojiBadge(ctx, emoji, 132, 140, 60);

    ctx.font = "700 34px Georgia, serif";
    ctx.fillStyle = "#F7F0E4";
    ctx.fillText("SpinPlate", 216, 130);

    ctx.font = "600 30px monospace";
    ctx.fillStyle = "rgba(247,240,228,0.75)";
    ctx.fillText(`${occasion.name.toUpperCase()} · ${city.name.toUpperCase()}, ${city.state}`, 72, 270);

    ctx.font = "700 80px Georgia, serif";
    ctx.fillStyle = "#F7F0E4";
    const lines = wrapText(ctx, venue.name, 72, 400, canvas.width - 144, 90);

    let cursorY = 400 + lines * 90 + 20;
    if (venue.address) {
      ctx.font = "500 36px sans-serif";
      ctx.fillStyle = "rgba(247,240,228,0.85)";
      cursorY += wrapText(ctx, venue.address, 72, cursorY, canvas.width - 144, 46) * 46;
    }

    if (poolSize) {
      ctx.font = "500 28px sans-serif";
      ctx.fillStyle = "rgba(247,240,228,0.55)";
      ctx.fillText(`🎯 One of ${poolSize} real spots nearby`, 72, cursorY + 50);
    }

    drawPill(ctx, "Get directions →", 72, canvas.height - 160);

    ctx.font = "500 26px sans-serif";
    ctx.fillStyle = "rgba(247,240,228,0.45)";
    ctx.fillText("spinplate.vercel.app", 72, canvas.height - 60);

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

// CHALLENGE: built to be a dare, not a coordination tool — bigger "I GOT"
// framing, pool-size stat treated as a brag, CTA reads as a challenge.
// Address is deliberately de-emphasized since it's not about getting
// there, it's about whether a friend spins something better.
function drawChallengeImage({ venue, city, occasion, poolSize, accent }) {
  return new Promise((resolve) => {
    const { canvas, ctx } = drawBaseCard(accent);
    const emoji = OCCASION_EMOJI[occasion.slug] || "🎯";

    drawPill(ctx, "CHALLENGE", 72, 90, {
      bg: "rgba(247,240,228,0.18)",
      color: "#F7F0E4",
      font: "800 28px monospace",
    });

    ctx.font = "600 32px monospace";
    ctx.fillStyle = "rgba(247,240,228,0.75)";
    ctx.fillText(`${occasion.name.toUpperCase()} · ${city.name.toUpperCase()}, ${city.state}`, 72, 230);

    ctx.font = "700 46px Georgia, serif";
    ctx.fillStyle = "rgba(247,240,228,0.9)";
    ctx.fillText(`${emoji}  I got`, 72, 320);

    ctx.font = "800 88px Georgia, serif";
    ctx.fillStyle = "#F7F0E4";
    const lines = wrapText(ctx, venue.name, 72, 420, canvas.width - 144, 96);

    const statY = 420 + lines * 96 + 60;
    if (poolSize) {
      drawPill(ctx, `🎯 Beat this — 1 of ${poolSize} real spots`, 72, statY, {
        bg: "rgba(247,240,228,0.16)",
        color: "#F7F0E4",
        font: "700 30px sans-serif",
      });
    }

    drawPill(ctx, "Take the challenge →", 72, canvas.height - 160, {
      bg: "#F7F0E4",
      color: "#3D1220",
      font: "800 32px sans-serif",
    });

    ctx.font = "500 26px sans-serif";
    ctx.fillStyle = "rgba(247,240,228,0.45)";
    ctx.fillText("spinplate.vercel.app", 72, canvas.height - 60);

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export default function ShareChallenge({ venue, city, occasion, poolSize, accent }) {
  const [shareState, setShareState] = useState("idle"); // idle | working | copied | done
  const [challengeState, setChallengeState] = useState("idle");

  async function handleShare() {
    setShareState("working");
    try {
      const blob = await drawShareImage({ venue, city, occasion, poolSize, accent });
      const file = new File([blob], "spinplate-result.png", { type: "image/png" });
      const shareText = `I got ${venue.name} for ${occasion.name.toLowerCase()} in ${city.name}.`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "My SpinPlate result", text: shareText });
        setShareState("done");
      } else {
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
    const text = `I got ${venue.name} for ${occasion.name.toLowerCase()} in ${city.name}. Think you can beat it?`;

    try {
      const blob = await drawChallengeImage({ venue, city, occasion, poolSize, accent });
      const file = new File([blob], "spinplate-challenge.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "SpinPlate challenge", text: `${text} ${url}` });
        setChallengeState("idle");
        return;
      }
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
