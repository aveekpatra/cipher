"use client";

import type { CSSProperties } from "react";

/* Helper to set the --d custom property for staggered animation delays */
const d = (seconds: number): CSSProperties =>
  ({ "--d": `${seconds}s` }) as CSSProperties;

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Golden gradients ── */}
          <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b6914" stopOpacity="0" />
            <stop offset="20%" stopColor="#b8860b" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d4a540" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#c9a227" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b6914" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#6b4f10" stopOpacity="0" />
            <stop offset="25%" stopColor="#a07828" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c8a84e" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#b89530" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6b4f10" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gold3" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8b6914" stopOpacity="0" />
            <stop offset="15%" stopColor="#c9a227" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#e0c068" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#d4a540" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b6914" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="gold4" x1="100%" y1="80%" x2="0%" y2="20%">
            <stop offset="0%" stopColor="#6b4f10" stopOpacity="0" />
            <stop offset="30%" stopColor="#b89530" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#dbb850" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#a07828" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6b4f10" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for select paths */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ═══════════════════════════════════════════
            TOP-LEFT CLUSTER — Flowing curves from left
            ═══════════════════════════════════════════ */}
        <g className="hero-lines-tl">
          <path
            d="M -50,180 C 200,160 380,60 560,40 C 740,20 900,120 1050,200"
            stroke="url(#gold1)"
            strokeWidth="1.2"
            className="draw-line"
            style={d(0.2)}
          />
          <path
            d="M -50,210 C 180,200 360,90 550,70 C 740,50 920,140 1080,220"
            stroke="url(#gold2)"
            strokeWidth="0.8"
            className="draw-line shimmer"
            style={d(0.4)}
          />
          <path
            d="M -50,240 C 160,240 340,120 540,100 C 740,80 940,160 1100,240"
            stroke="url(#gold1)"
            strokeWidth="1"
            className="draw-line"
            style={d(0.6)}
          />
          <path
            d="M -50,270 C 140,280 320,150 530,130 C 740,110 960,180 1120,260"
            stroke="url(#gold2)"
            strokeWidth="0.6"
            className="draw-line shimmer"
            style={d(0.8)}
          />
          <path
            d="M -50,300 C 120,320 300,180 520,160 C 740,140 980,200 1140,280"
            stroke="url(#gold1)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(1)}
          />
          <path
            d="M -50,120 C 240,80 420,20 620,-10 C 820,-40 960,60 1100,140"
            stroke="url(#gold2)"
            strokeWidth="0.7"
            className="draw-line shimmer"
            style={d(0.3)}
          />
          <path
            d="M -50,80 C 280,30 460,-30 680,-50 C 900,-70 1020,30 1150,100"
            stroke="url(#gold1)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(0.5)}
          />
          {/* Glow path */}
          <path
            d="M -50,200 C 190,180 370,75 555,55 C 740,35 910,130 1065,210"
            stroke="url(#gold1)"
            strokeWidth="2"
            opacity="0.3"
            filter="url(#glow)"
            className="draw-line"
            style={d(0.3)}
          />
        </g>

        {/* ═══════════════════════════════════════════════
            SECONDARY TOP CLUSTER — Flowing curves, lower
            ═══════════════════════════════════════════════ */}
        <g className="hero-lines-tl2">
          <path
            d="M -80,420 C 150,380 350,280 560,300 C 770,320 880,400 960,460"
            stroke="url(#gold2)"
            strokeWidth="0.8"
            className="draw-line"
            style={d(1.2)}
          />
          <path
            d="M -80,450 C 130,420 330,310 550,330 C 770,350 900,420 980,480"
            stroke="url(#gold1)"
            strokeWidth="0.6"
            className="draw-line shimmer"
            style={d(1.4)}
          />
          <path
            d="M -80,480 C 110,460 310,340 540,360 C 770,380 920,440 1000,500"
            stroke="url(#gold2)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(1.6)}
          />
        </g>

        {/* ═══════════════════════════════════════════════════
            BOTTOM-RIGHT CLUSTER — Flowing curves from right
            ═══════════════════════════════════════════════════ */}
        <g className="hero-lines-br">
          <path
            d="M 1970,900 C 1720,920 1540,1020 1360,1040 C 1180,1060 1020,960 870,880"
            stroke="url(#gold3)"
            strokeWidth="1.2"
            className="draw-line"
            style={d(0.8)}
          />
          <path
            d="M 1970,870 C 1740,880 1560,990 1370,1010 C 1180,1030 1000,940 840,860"
            stroke="url(#gold4)"
            strokeWidth="0.8"
            className="draw-line shimmer"
            style={d(1)}
          />
          <path
            d="M 1970,840 C 1760,840 1580,960 1380,980 C 1180,1000 980,920 810,840"
            stroke="url(#gold3)"
            strokeWidth="1"
            className="draw-line"
            style={d(1.2)}
          />
          <path
            d="M 1970,810 C 1780,800 1600,930 1390,950 C 1180,970 960,900 780,820"
            stroke="url(#gold4)"
            strokeWidth="0.6"
            className="draw-line shimmer"
            style={d(1.4)}
          />
          <path
            d="M 1970,780 C 1800,760 1620,900 1400,920 C 1180,940 940,880 750,800"
            stroke="url(#gold3)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(1.6)}
          />
          <path
            d="M 1970,960 C 1680,1000 1500,1060 1300,1090 C 1100,1120 960,1020 820,940"
            stroke="url(#gold4)"
            strokeWidth="0.7"
            className="draw-line shimmer"
            style={d(1.1)}
          />
          <path
            d="M 1970,1000 C 1640,1050 1460,1100 1240,1120 C 1020,1140 920,1050 780,970"
            stroke="url(#gold3)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(1.3)}
          />
          {/* Glow path */}
          <path
            d="M 1970,880 C 1730,900 1550,1010 1365,1025 C 1180,1045 1010,950 855,870"
            stroke="url(#gold3)"
            strokeWidth="2"
            opacity="0.3"
            filter="url(#glow)"
            className="draw-line"
            style={d(1)}
          />
        </g>

        {/* ═══════════════════════════════════════════════════
            SECONDARY BOTTOM CLUSTER — higher on right side
            ═══════════════════════════════════════════════════ */}
        <g className="hero-lines-br2">
          <path
            d="M 2000,660 C 1770,700 1570,800 1360,780 C 1150,760 1040,680 960,620"
            stroke="url(#gold4)"
            strokeWidth="0.8"
            className="draw-line"
            style={d(1.8)}
          />
          <path
            d="M 2000,630 C 1790,660 1590,770 1370,750 C 1150,730 1060,660 980,600"
            stroke="url(#gold3)"
            strokeWidth="0.6"
            className="draw-line shimmer"
            style={d(2)}
          />
          <path
            d="M 2000,600 C 1810,620 1610,740 1380,720 C 1150,700 1080,640 1000,580"
            stroke="url(#gold4)"
            strokeWidth="0.5"
            className="draw-line"
            style={d(2.2)}
          />
        </g>

        {/* ═══════════════════════════
            WISP ACCENTS — scattered
            ═══════════════════════════ */}
        <path
          d="M -30,550 C 120,530 260,490 380,520 C 500,550 560,600 600,640"
          stroke="url(#gold2)"
          strokeWidth="0.4"
          className="draw-line shimmer"
          style={d(2.4)}
        />
        <path
          d="M 1950,500 C 1800,520 1660,560 1540,530 C 1420,500 1360,450 1320,410"
          stroke="url(#gold4)"
          strokeWidth="0.4"
          className="draw-line shimmer"
          style={d(2.6)}
        />
      </svg>
    </div>
  );
}
