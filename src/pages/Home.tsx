import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { C } from "../tokens";
import { useCursorLabel } from "../Root";
import { useReveal } from "../hooks";

// ─── Page data ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    slug:      "kutir",
    num:       "01",
    title:     "KUTIR",
    statement: "A platform for discovering local makers and their work.",
    meta:      "PRODUCT DESIGN · RESEARCH · STRATEGY · UX/UI",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1662845114342-256fdc45981d?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Artisan holding a clay pot",
    overlay:   "rgba(20,14,10,0.52)",
  },
  {
    slug:      "kalakshetra",
    num:       "02",
    title:     "KALAKSHETRA",
    statement: "Mapping what a classical arts institution communicates — and what it silently forgets.",
    meta:      "SERVICE DESIGN · RESEARCH · EDITORIAL",
    year:      "2023",
    imageUrl:  "https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Classical dancers performing",
    overlay:   "rgba(10,8,22,0.60)",
  },
  {
    slug:      "goghy",
    num:       "03",
    title:     "GoGHY",
    statement: "A fitness app that doesn't pretend becoming healthy is simple, satisfying, or linear.",
    meta:      "PRODUCT DESIGN · BRAND · UX/UI",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1623824204241-f851d3bcfaf5?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Mobile app on phone",
    overlay:   "rgba(8,16,28,0.58)",
  },
  {
    slug:      "reframe-india",
    num:       "04",
    title:     "REFRAME INDIA",
    statement: "What does India look like when you stop reaching for the familiar image?",
    meta:      "RESEARCH · EDITORIAL DESIGN · SYSTEMS",
    year:      "2023",
    imageUrl:  "https://images.unsplash.com/photo-1693845609327-8f64e686e338?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Street in India",
    overlay:   "rgba(18,12,8,0.56)",
  },
  {
    slug:      "udgam-branding",
    num:       "05",
    title:     "UDGAM BRANDING",
    statement: "Identity for a studio whose name is Sanskrit for 'source' — and whose work returns to it.",
    meta:      "BRAND IDENTITY · VISUAL DESIGN · TYPOGRAPHY",
    year:      "2024",
    imageUrl:  "https://images.unsplash.com/photo-1679167564671-f7b82c2b380b?w=1600&h=900&fit=crop&auto=format",
    imageAlt:  "Design typography studio",
    overlay:   "rgba(6,6,18,0.62)",
  },
];

const CURIOSITIES = [
  "Why do some interfaces feel like places?",
  "Why do people become attached to badly designed things?",
  "Why do some books find their readers?",
  "Why do we keep designing for the \"average\" user?",
];

const SIDE_PROJECTS = [
  {
    tag:   "ILLUSTRATION",
    title: "Small Observations",
    desc:  "Ink and digital illustrations made between projects. Things noticed on commutes, in waiting rooms, at dinner tables.",
    span:  2,
    color: "#DDD8CE",
    aspect: "56%",
  },
  {
    tag:   "COMIC SPREAD",
    title: "Three Conversations",
    desc:  "A comic about the things people say when they don't quite mean them.",
    span:  1,
    color: "#D4CFC6",
    aspect: "120%",
  },
  {
    tag:   "ZINE",
    title: "Things I Collected",
    desc:  "A handmade zine about objects kept without knowing why.",
    span:  1,
    color: "#E0DBD1",
    aspect: "130%",
  },
  {
    tag:   "GAME DESIGN",
    title: "Familiar Spaces",
    desc:  "A short narrative game set in recognisable domestic environments. Mechanics built around decision paralysis.",
    span:  1,
    color: "#D8D3C8",
    aspect: "80%",
  },
  {
    tag:   "CONCEPTUALISATION",
    title: "If Public Libraries Became",
    desc:  "A speculative brief: what do institutions look like when they change their core assumption?",
    span:  2,
    color: "#CAC5BB",
    aspect: "50%",
  },
  {
    tag:   "VISUAL RESEARCH",
    title: "Indian Type Studies",
    desc:  "Documentation and adaptation of regional script structures into contemporary display type.",
    span:  1,
    color: "#D4CFC6",
    aspect: "80%",
  },
];

// ─── Pile types + data ────────────────────────────────────────────────────────

interface PileObj {
  id:        string;
  x:         number;
  y:         number;
  r:         number;
  z:         number;
  w:         number;
  h:         number;
  hidden:    boolean;
  label?:    string;
  sublabel?: string;
}

const PILE_OBJECTS: PileObj[] = [
  { id:"bangles",   x: 880, y:440, r: 22, z: 8, w:66, h:66, hidden:false },
  { id:"book",      x:1060, y:558, r:-14, z: 3, w:54, h:74, hidden:false, label:"MY YEAR OF REST\nAND RELAXATION" },
  { id:"rock",      x: 720, y:290, r: 38, z: 7, w:56, h:42, hidden:false, label:"found." },
  { id:"bhondu",    x:1140, y:320, r:-22, z: 9, w:28, h:58, hidden:false, label:"BHONDU", sublabel:"yes, that's his name." },
  { id:"writing",   x: 840, y:680, r: 15, z: 6, w:90, h:64, hidden:false, label:"something I wrote" },
  { id:"sound",     x:1200, y:490, r:-12, z: 9, w:50, h:50, hidden:false },
  { id:"ashes",     x: 780, y:620, r:-28, z: 3, w:44, h:28, hidden:false },
  { id:"pencil",    x:1100, y:220, r:-35, z:15, w: 8, h:94, hidden:false },
  { id:"eraser",    x: 740, y:192, r: 42, z: 4, w:40, h:18, hidden:false },
  { id:"coin1",     x:1020, y:670, r:  0, z: 9, w:26, h:26, hidden:false },
  { id:"coin2",     x: 780, y: 92, r:  0, z: 7, w:20, h:20, hidden:false },
  { id:"paperclip", x:1000, y:372, r:-52, z:16, w:14, h:34, hidden:false },
  { id:"rubber",    x: 760, y:160, r: 28, z: 8, w:32, h:22, hidden:false },
  { id:"key",       x: 950, y:460, r: 38, z:10, w:14, h:38, hidden:false },
  { id:"ticket",    x:1050, y:148, r:-24, z: 7, w:60, h:24, hidden:false },
  { id:"dice",      x: 860, y:744, r: 18, z:12, w:22, h:22, hidden:false },
  { id:"leaf",      x:1180, y: 98, r:-44, z: 6, w:26, h:40, hidden:false },
  { id:"tape",      x: 810, y:548, r: 32, z: 8, w:50, h:15, hidden:false },
  { id:"film",      x:1222, y:284, r: 26, z: 9, w:26, h:54, hidden:false },
  { id:"envelope",  x: 920, y:192, r:-36, z:11, w:34, h:26, hidden:false },
  { id:"button",    x:1100, y:568, r:  0, z: 5, w:24, h:24, hidden:false },
  { id:"cork",      x: 700, y:375, r:-18, z: 3, w:26, h:26, hidden:false },
  { id:"stamp",     x:1010, y:385, r: 22, z: 8, w:32, h:32, hidden:false },
  { id:"fragment",  x: 850, y:164, r:-28, z: 9, w:50, h:36, hidden:false },
  { id:"pill",      x:1180, y:598, r: 52, z: 6, w:18, h:10, hidden:false },
  { id:"bottlecap", x:1144, y:432, r:  0, z: 7, w:22, h:22, hidden:false },
  { id:"pin",       x: 790, y:274, r:-38, z: 7, w:10, h:22, hidden:false },
  { id:"thread",    x: 990, y:492, r: 16, z: 6, w:24, h:24, hidden:false },
];

type Pos = { x: number; y: number; r: number };

const COMP0: Record<string, Pos> = {
  bangles:   { x: 772, y: 96, r:  0 }, bhondu:    { x: 846, y: 92, r:  5 },
  book:      { x: 920, y: 96, r: -3 }, writing:   { x:1014, y: 96, r: -2 },
  sound:     { x:1102, y: 96, r:  4 }, rock:      { x:1172, y: 96, r:  3 },
  ashes:     { x:1234, y: 96, r: -2 },
  pencil:    { x: 772, y:208, r:-90 }, eraser:    { x: 846, y:204, r:  5 },
  rubber:    { x: 920, y:204, r:  3 }, tape:      { x: 994, y:204, r:  0 },
  leaf:      { x:1068, y:204, r:-15 }, key:       { x:1142, y:204, r:-35 },
  paperclip: { x:1216, y:204, r:-20 },
  ticket:    { x: 772, y:318, r:  0 }, stamp:     { x: 852, y:314, r: -5 },
  film:      { x: 924, y:314, r:  8 }, envelope:  { x: 998, y:316, r: -8 },
  fragment:  { x:1076, y:312, r: -5 }, pin:       { x:1150, y:316, r: 15 },
  pill:      { x:1220, y:318, r: 25 },
  coin1:     { x: 772, y:406, r:  0 }, coin2:     { x: 828, y:406, r:  0 },
  button:    { x: 884, y:406, r:  0 }, cork:      { x: 942, y:406, r:  8 },
  bottlecap: { x:1000, y:406, r:  0 }, thread:    { x:1058, y:406, r:  0 },
  dice:      { x:1116, y:406, r:  8 },
};

const COMP1: Record<string, Pos> = {
  bangles:   { x: 800, y:120, r: -8 }, bhondu:    { x: 874, y: 88, r: 12 },
  book:      { x: 796, y:230, r: -4 }, writing:   { x: 906, y:222, r: -6 },
  sound:     { x: 946, y:138, r: -5 }, ashes:     { x: 864, y:260, r: 20 },
  rock:      { x: 952, y:274, r:-18 },
  pencil:    { x:1024, y: 92, r:-82 }, eraser:    { x:1116, y: 82, r:  4 },
  rubber:    { x:1064, y:168, r:  3 }, tape:      { x:1164, y:150, r: -5 },
  leaf:      { x:1204, y: 90, r:-20 }, key:       { x:1044, y:252, r:-30 },
  paperclip: { x:1146, y:244, r:-18 },
  ticket:    { x: 782, y:348, r: -3 }, stamp:     { x: 870, y:336, r: -7 },
  film:      { x: 950, y:332, r: 10 }, envelope:  { x: 800, y:436, r: -5 },
  fragment:  { x: 924, y:428, r:  6 }, pin:       { x: 978, y:378, r: 20 },
  pill:      { x:1016, y:348, r: 38 },
  coin1:     { x:1064, y:336, r:  0 }, coin2:     { x:1118, y:332, r:  0 },
  button:    { x:1174, y:338, r:  0 }, cork:      { x:1062, y:410, r: 10 },
  bottlecap: { x:1118, y:404, r:  0 }, thread:    { x:1176, y:410, r:  0 },
  dice:      { x:1062, y:484, r: 12 },
};

const COMP2: Record<string, Pos> = {
  bangles:   { x: 900, y:108, r: 30 }, bhondu:    { x:1062, y: 78, r:-20 },
  book:      { x: 762, y:176, r:-12 }, writing:   { x:1152, y:128, r: 15 },
  sound:     { x: 858, y:262, r: -8 }, ashes:     { x:1002, y:196, r: 25 },
  rock:      { x:1182, y:220, r:-30 },
  pencil:    { x: 782, y: 98, r:-45 }, eraser:    { x:1102, y:178, r: 38 },
  rubber:    { x: 952, y:356, r:-22 }, tape:      { x:1064, y:338, r: 20 },
  leaf:      { x: 762, y:330, r:-55 }, key:       { x:1200, y:298, r: 45 },
  paperclip: { x: 870, y:146, r:-60 },
  ticket:    { x: 820, y:468, r: -5 }, stamp:     { x: 942, y:498, r: 12 },
  film:      { x:1072, y:458, r:-15 }, envelope:  { x:1178, y:418, r:  8 },
  fragment:  { x: 770, y:558, r:-18 }, pin:       { x:1142, y:538, r: 30 },
  pill:      { x:1228, y:358, r: 48 },
  coin1:     { x:1062, y:618, r:  0 }, coin2:     { x:1116, y:598, r:  0 },
  button:    { x: 958, y:648, r:  0 }, cork:      { x: 868, y:638, r: 15 },
  bottlecap: { x:1178, y:628, r:  0 }, thread:    { x: 780, y:678, r: 25 },
  dice:      { x:1022, y:728, r:-18 },
};

const COMPOSITIONS: Record<string, Pos>[] = [COMP0, COMP1, COMP2];

const COMPOSE_STAGGER: Record<string, number> = {
  bangles: 0, bhondu: 1, book: 2, writing: 3, sound: 4, ashes: 5, rock: 6,
  pencil: 7, eraser: 8, rubber: 9, paperclip: 10, key: 11, pin: 12, tape: 13, leaf: 14,
  ticket: 15, stamp: 16, film: 17, envelope: 18, fragment: 19,
  coin1: 20, coin2: 21, button: 22, cork: 23, bottlecap: 24, thread: 25, dice: 26, pill: 27,
};

// ─── Object renders ───────────────────────────────────────────────────────────

function ObjContent({ id }: { id: string }) {
  switch (id) {
    case "bangles":
      return (
        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" style={{ display:"block" }}>
          <circle cx="33" cy="33" r="30" stroke="#C8A882" strokeWidth="4" fill="none" />
          <circle cx="33" cy="33" r="22" stroke="#B89870" strokeWidth="3" fill="none" />
          <circle cx="33" cy="33" r="14" stroke="#A88860" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "book":
      return (
        <svg width="54" height="74" viewBox="0 0 54 74" fill="none" style={{ display:"block" }}>
          <rect x="4" y="2" width="46" height="70" rx="2" fill="#E8D8B8" stroke="#C0A878" strokeWidth="1.5" />
          <rect x="4" y="2" width="8" height="70" fill="#C0A878" />
          <rect x="16" y="18" width="26" height="1.5" fill="#A08858" opacity="0.6" />
          <rect x="16" y="24" width="20" height="1.5" fill="#A08858" opacity="0.6" />
          <rect x="16" y="30" width="24" height="1.5" fill="#A08858" opacity="0.4" />
        </svg>
      );
    case "rock":
      return (
        <svg width="56" height="42" viewBox="0 0 56 42" fill="none" style={{ display:"block" }}>
          <ellipse cx="28" cy="26" rx="24" ry="14" fill="#B0A898" />
          <ellipse cx="28" cy="22" rx="22" ry="12" fill="#C8C0B0" />
          <ellipse cx="24" cy="20" rx="8" ry="5" fill="#D8D0C0" opacity="0.6" />
        </svg>
      );
    case "bhondu":
      return (
        <svg width="28" height="58" viewBox="0 0 28 58" fill="none" style={{ display:"block" }}>
          <ellipse cx="14" cy="14" rx="12" ry="12" fill="#F0D8B0" stroke="#D0B888" strokeWidth="1.5" />
          <circle cx="11" cy="12" r="2" fill="#8B6040" />
          <circle cx="17" cy="12" r="2" fill="#8B6040" />
          <path d="M10 17 Q14 20 18 17" stroke="#8B6040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <rect x="11" y="26" width="6" height="28" rx="3" fill="#D0A870" />
          <path d="M8 32 Q5 36 7 40" stroke="#C09060" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M20 32 Q23 36 21 40" stroke="#C09060" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "writing":
      return (
        <svg width="90" height="64" viewBox="0 0 90 64" fill="none" style={{ display:"block" }}>
          <rect x="2" y="2" width="86" height="60" rx="2" fill="#F0EBE0" stroke="#D8D0C0" strokeWidth="1" />
          {[14,22,30,38,46].map((y, i) => (
            <rect key={i} x="10" y={y} width={i === 2 ? 48 : i === 4 ? 36 : 60} height="1.5" fill="#B0A898" opacity="0.5" />
          ))}
        </svg>
      );
    case "sound":
      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ display:"block" }}>
          <circle cx="25" cy="25" r="23" fill="#1A1614" />
          <circle cx="25" cy="25" r="16" fill="#2A2420" />
          <circle cx="25" cy="25" r="8" fill="#3A3430" />
          <circle cx="25" cy="25" r="3" fill="#C8B898" />
          <circle cx="25" cy="25" r="1.5" fill="#E8D8B8" />
        </svg>
      );
    case "ashes":
      return (
        <svg width="44" height="28" viewBox="0 0 44 28" fill="none" style={{ display:"block" }}>
          <rect x="2" y="8" width="40" height="18" rx="2" fill="#D8D0C0" stroke="#C0B8A8" strokeWidth="1" />
          <rect x="6" y="4" width="32" height="6" rx="1" fill="#C8BFB0" />
          <ellipse cx="22" cy="8" rx="14" ry="4" fill="#B8B0A0" opacity="0.5" />
        </svg>
      );
    case "pencil":
      return (
        <svg width="8" height="94" viewBox="0 0 8 94" fill="none" style={{ display:"block" }}>
          <rect x="1" y="6" width="6" height="78" fill="#F0E0A0" stroke="#D0C080" strokeWidth="0.5" />
          <polygon points="1,84 7,84 4,94" fill="#F0C890" />
          <polygon points="2,88 6,88 4,94" fill="#C88060" />
          <rect x="1" y="2" width="6" height="6" fill="#C0B0B0" />
          <rect x="0" y="0" width="8" height="3" fill="#D0C0B0" />
        </svg>
      );
    case "eraser":
      return (
        <svg width="40" height="18" viewBox="0 0 40 18" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="38" height="16" rx="2" fill="#F0C0B0" stroke="#D0A090" strokeWidth="1" />
          <rect x="1" y="9" width="38" height="8" rx="2" fill="#D0A090" />
          <rect x="6" y="4" width="20" height="1.5" fill="#E0A898" opacity="0.6" />
        </svg>
      );
    case "coin1":
    case "coin2":
      return (
        <svg width={id === "coin1" ? 26 : 20} height={id === "coin1" ? 26 : 20} viewBox="0 0 26 26" fill="none" style={{ display:"block" }}>
          <circle cx="13" cy="13" r="12" fill="#D4A030" stroke="#B88820" strokeWidth="1" />
          <circle cx="13" cy="13" r="8" fill="#C89020" opacity="0.4" />
          <circle cx="13" cy="13" r="3" fill="#E8B840" opacity="0.5" />
        </svg>
      );
    case "paperclip":
      return (
        <svg width="14" height="34" viewBox="0 0 14 34" fill="none" style={{ display:"block" }}>
          <path d="M7 33 C2 33 1 28 1 25 L1 10 C1 5 3 2 7 2 C11 2 13 5 13 10 L13 24 C13 27 11 29 7 29 C3 29 3 27 3 24 L3 11 C3 9 4 8 7 8 C10 8 11 9 11 11 L11 24" stroke="#B0A090" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "rubber":
      return (
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="30" height="20" rx="2" fill="#E0D0E8" stroke="#C0B0C8" strokeWidth="1" />
          <rect x="1" y="12" width="14" height="9" rx="1" fill="#C0A0C0" />
          <rect x="4" y="5" width="18" height="1.5" fill="#B0A0C0" opacity="0.5" />
        </svg>
      );
    case "key":
      return (
        <svg width="14" height="38" viewBox="0 0 14 38" fill="none" style={{ display:"block" }}>
          <circle cx="7" cy="8" r="6" stroke="#C0A870" strokeWidth="2" fill="none" />
          <circle cx="7" cy="8" r="2.5" fill="#C0A870" />
          <rect x="6" y="14" width="2" height="20" fill="#C0A870" />
          <rect x="6" y="26" width="5" height="1.5" fill="#C0A870" />
          <rect x="6" y="30" width="4" height="1.5" fill="#C0A870" />
        </svg>
      );
    case "ticket":
      return (
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="58" height="22" rx="2" fill="#F0E8D0" stroke="#D8C8A8" strokeWidth="1" />
          <line x1="42" y1="1" x2="42" y2="23" stroke="#D8C8A8" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="42" cy="0" r="3" fill="#F5F2EC" />
          <circle cx="42" cy="24" r="3" fill="#F5F2EC" />
          <rect x="6" y="8" width="22" height="2" fill="#B8A888" opacity="0.6" />
          <rect x="6" y="13" width="16" height="1.5" fill="#B8A888" opacity="0.4" />
        </svg>
      );
    case "dice":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="20" height="20" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
          <circle cx="6.5"  cy="6.5"  r="1.8" fill={C.ink} />
          <circle cx="15.5" cy="6.5"  r="1.8" fill={C.ink} />
          <circle cx="11"   cy="11"   r="1.8" fill={C.ink} />
          <circle cx="6.5"  cy="15.5" r="1.8" fill={C.ink} />
          <circle cx="15.5" cy="15.5" r="1.8" fill={C.ink} />
        </svg>
      );
    case "leaf":
      return (
        <svg width="26" height="40" viewBox="0 0 26 40" fill="none" style={{ display:"block" }}>
          <path d="M13 38 C13 38 2 28 2 16 C2 8 7 2 13 2 C19 2 24 8 24 16 C24 28 13 38 13 38Z" fill="#8BAA78" stroke="#6A8860" strokeWidth="1" />
          <path d="M13 38 L13 8" stroke="#6A8860" strokeWidth="1" opacity="0.6" />
          <path d="M13 18 L7 12" stroke="#6A8860" strokeWidth="0.8" opacity="0.4" />
          <path d="M13 22 L19 16" stroke="#6A8860" strokeWidth="0.8" opacity="0.4" />
        </svg>
      );
    case "tape":
      return (
        <svg width="50" height="15" viewBox="0 0 50 15" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="48" height="13" fill="rgba(180,200,220,0.5)" stroke="rgba(160,180,200,0.7)" strokeWidth="1" />
          <rect x="1" y="1" width="48" height="3" fill="rgba(160,180,200,0.3)" />
        </svg>
      );
    case "film":
      return (
        <svg width="26" height="54" viewBox="0 0 26 54" fill="none" style={{ display:"block" }}>
          <rect x="2" y="2" width="22" height="50" rx="1" fill="#2A2420" />
          {[6, 14, 22, 30, 38, 46].map((y, i) => (
            <rect key={i} x="4" y={y} width="18" height="6" rx="0.5" fill="#1A1410" />
          ))}
          <rect x="2" y="0" width="3" height="54" fill="#1A1410" />
          <rect x="21" y="0" width="3" height="54" fill="#1A1410" />
        </svg>
      );
    case "envelope":
      return (
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="32" height="24" rx="2" fill="#F0E8D8" stroke="#D0C8B8" strokeWidth="1" />
          <path d="M1 1 L17 15 L33 1" stroke="#D0C8B8" strokeWidth="1" fill="none" />
        </svg>
      );
    case "button":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display:"block" }}>
          <circle cx="12" cy="12" r="11" fill="#D0C8B8" stroke="#B8B0A0" strokeWidth="1" />
          <circle cx="12" cy="12" r="6" fill="#E8E0D0" stroke="#B8B0A0" strokeWidth="0.5" />
          <circle cx="9.5" cy="10.5" r="1.2" fill="#B8B0A0" />
          <circle cx="14.5" cy="10.5" r="1.2" fill="#B8B0A0" />
          <circle cx="9.5" cy="13.5" r="1.2" fill="#B8B0A0" />
          <circle cx="14.5" cy="13.5" r="1.2" fill="#B8B0A0" />
        </svg>
      );
    case "cork":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ display:"block" }}>
          <circle cx="13" cy="13" r="12" fill="#D4B890" stroke="#B89870" strokeWidth="1" />
          <circle cx="13" cy="13" r="7" fill="#C8A880" opacity="0.5" />
        </svg>
      );
    case "stamp":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ display:"block" }}>
          <rect x="3" y="3" width="26" height="26" rx="1" fill="#F0D8B8" stroke="#C0A878" strokeWidth="1.5" />
          <rect x="6" y="6" width="20" height="20" rx="1" fill="none" stroke="#C0A878" strokeWidth="1" />
          <rect x="9" y="12" width="14" height="1.5" fill="#A08850" opacity="0.6" />
          <rect x="11" y="16" width="10" height="1.5" fill="#A08850" opacity="0.4" />
        </svg>
      );
    case "fragment":
      return (
        <svg width="50" height="36" viewBox="0 0 50 36" fill="none" style={{ display:"block" }}>
          <polygon points="2,34 48,34 44,2 8,8" fill="#E8E0D0" stroke="#C8C0B0" strokeWidth="1" />
          <polygon points="15,34 48,34 44,10" fill="#D8D0C0" opacity="0.6" />
          <rect x="10" y="18" width="24" height="1.5" fill="#B0A898" opacity="0.5" />
          <rect x="10" y="23" width="18" height="1.5" fill="#B0A898" opacity="0.4" />
        </svg>
      );
    case "pill":
      return (
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" style={{ display:"block" }}>
          <rect x="1" y="1" width="16" height="8" rx="4" fill="#E8D0D8" stroke="#C8B0B8" strokeWidth="1" />
          <line x1="9" y1="1" x2="9" y2="9" stroke="#C8B0B8" strokeWidth="1" />
          <rect x="9" y="1" width="8" height="8" rx="4" fill="#D0C0E0" />
        </svg>
      );
    case "bottlecap":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ display:"block" }}>
          <circle cx="11" cy="11" r="10" fill="#B0C8A0" stroke="#90A880" strokeWidth="1" />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const x1 = 11 + 8 * Math.cos(a);
            const y1 = 11 + 8 * Math.sin(a);
            const x2 = 11 + 10 * Math.cos(a);
            const y2 = 11 + 10 * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#90A880" strokeWidth="1.5" />;
          })}
          <circle cx="11" cy="11" r="5" fill="#A0C090" />
        </svg>
      );
    case "pin":
      return (
        <svg width="10" height="22" viewBox="0 0 10 22" fill="none" style={{ display:"block" }}>
          <circle cx="5" cy="5" r="4" fill="#C2421F" stroke="#A03010" strokeWidth="1" />
          <rect x="4" y="9" width="2" height="12" fill="#A0A090" />
          <polygon points="3,20 7,20 5,22" fill="#808070" />
        </svg>
      );
    case "thread":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display:"block" }}>
          <ellipse cx="12" cy="6" rx="10" ry="3.5" fill="#F0E8D8" stroke="#C8C0B0" strokeWidth="1" />
          <rect x="2" y="6" width="20" height="12" fill="#E8E0D0" stroke="#C8C0B0" strokeWidth="1" />
          <ellipse cx="12" cy="18" rx="10" ry="3.5" fill="#E0D8C8" stroke="#C8C0B0" strokeWidth="1" />
          <ellipse cx="12" cy="12" rx="5" ry="2" fill="#D4CCBC" />
        </svg>
      );
    default:
      return <div style={{ width:"100%", height:"100%", background:C.surface }} />;
  }
}

// ─── Dice button ──────────────────────────────────────────────────────────────

function DiceButton({
  variant, rolling, onClick, onHoverIn, onHoverOut,
}: {
  variant: number; rolling: boolean;
  onClick: () => void; onHoverIn: () => void; onHoverOut: () => void;
}) {
  const face    = variant < 0 ? -1 : variant;
  const configs = [[[18, 18]], [[11, 11], [25, 25]], [[11, 11], [18, 18], [25, 25]]] as [number,number][][];
  const dots    = face < 0 ? [[11, 11], [18, 18], [25, 25]] as [number,number][] : configs[face];

  return (
    <div
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onClick}
      style={{ position:"absolute", right:"56px", bottom:"232px", width:"36px", height:"36px", zIndex:20, cursor:"none", userSelect:"none" }}
    >
      <svg
        width="36" height="36" viewBox="0 0 36 36"
        className={rolling ? "dice-rolling" : ""}
        style={{ display:"block", transformOrigin:"18px 18px" }}
      >
        <rect x="2" y="2" width="32" height="32" rx="6" ry="6" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.6" fill={C.ink} />
        ))}
      </svg>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [diceVariant,      setDiceVariant]      = useState(-1);
  const [diceRolling,      setDiceRolling]      = useState(false);
  const [activeProject,    setActiveProject]    = useState<string | null>(null);
  const [hoveredCuriosity, setHoveredCuriosity] = useState<number | null>(null);

  const pileRef      = useRef<HTMLDivElement>(null);
  const workEntryRef = useRef<HTMLDivElement>(null);
  const diceHoverRef = useRef(false);

  const cursorLabel = useCursorLabel();
  const navigate    = useNavigate();

  // Scroll reveal anchors
  const revealWork        = useReveal();
  const revealCuriosities = useReveal();
  const revealSide        = useReveal();
  const revealAbout       = useReveal();
  const revealContact     = useReveal();

  // Set / clear cursor labels via context ref
  useEffect(() => {
    return () => { cursorLabel.current = ""; };
  }, [cursorLabel]);

  // ── Dice click ───────────────────────────────────────────────────────────

  const handleDiceClick = () => {
    if (diceRolling) return;
    setDiceRolling(true);
    setTimeout(() => {
      setDiceVariant(v => v < 0 ? 0 : (v + 1) % 3);
      setDiceRolling(false);
    }, 480);
  };

  // ── Derived state ────────────────────────────────────────────────────────

  const composed          = diceVariant >= 0;
  const typoLetterSpacing = composed ? "-0.042em" : "-0.028em";
  const typoTranslateY    = composed ? -3 : 0;

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{ position:"relative", minHeight:"100vh", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 48px 88px" }}
      >

        {/* Objects */}
        <div
          className="pile-container"
          ref={pileRef}
          style={{ position:"absolute", inset:0, overflow:"visible", pointerEvents:"auto" }}
        >
          {PILE_OBJECTS.map((obj) => {
            const cp       = composed ? COMPOSITIONS[diceVariant][obj.id] : undefined;
            const order    = COMPOSE_STAGGER[obj.id] ?? 0;
            const left     = (cp ?? obj).x - obj.w / 2;
            const top      = (cp ?? obj).y - obj.h / 2;
            const rotation = cp ? cp.r : obj.r;
            const delay    = cp ? order * 18 : 0;
            const duration = cp ? 960 : 620;
            const easing   = cp ? "cubic-bezier(0.34,0.1,0.08,1)" : "cubic-bezier(0.5,0.1,0.5,1)";

            return (
              <div
                key={obj.id}
                style={{
                  position:"absolute", left:`${left}px`, top:`${top}px`,
                  width:`${obj.w}px`, height:`${obj.h}px`,
                  willChange:"left,top,transform",
                  transition:`left ${duration}ms ${easing} ${delay}ms, top ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
                  zIndex:obj.z, transform:`rotate(${rotation}deg)`, transformOrigin:"center center",
                }}
              >
                <ObjContent id={obj.id} />
              </div>
            );
          })}

          {/* Dice button */}
          <DiceButton
            variant={diceVariant}
            rolling={diceRolling}
            onClick={handleDiceClick}
            onHoverIn={() => { diceHoverRef.current = true; cursorLabel.current = "ROLL"; }}
            onHoverOut={() => { diceHoverRef.current = false; cursorLabel.current = ""; }}
          />
        </div>

        {/* Headline */}
        <div
          style={{
            position:"relative", zIndex:5,
            transform:`translateY(${typoTranslateY}px)`,
            transition: composed ? "transform 1.6s cubic-bezier(0.22,0.1,0.08,1)" : "none",
          }}
        >
          <h1
            className="hero-in"
            style={{
              fontSize:"clamp(68px,11vw,178px)", fontWeight:800, lineHeight:0.91,
              letterSpacing:typoLetterSpacing, color:C.ink,
              transition: composed ? "letter-spacing 1.8s cubic-bezier(0.22,0.1,0.08,1)" : "none",
            }}
          >
            I FIGURE<br />THINGS<br />OUT.
          </h1>
          <p
            className="hero-in-late"
            style={{ marginTop:"28px", fontSize:"clamp(15px,1.55vw,19px)", fontWeight:400, color:C.muted, maxWidth:"380px", lineHeight:1.62 }}
          >
            Product designer interested in people,<br />products & the systems around them.
          </p>
        </div>

        {/* Work entry zone */}
        <div
          ref={workEntryRef}
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior:"smooth" })}
          onMouseEnter={() => { cursorLabel.current = "ENTER →"; }}
          onMouseLeave={() => { cursorLabel.current = ""; }}
          style={{ position:"absolute", bottom:0, left:0, right:0, height:"18%", zIndex:25, cursor:"none" }}
        >
          <div style={{ position:"absolute", bottom:"32px", right:"48px", display:"flex", alignItems:"center", gap:"10px", opacity:0.35 }}>
            <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", color:C.ink }}>SELECTED WORK</span>
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
              <path d="M5 7L0 0H10L5 7Z" fill={C.ink} />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section id="work" className="section-pad" ref={revealWork.ref} style={{ padding:"120px 48px 60px", ...revealWork.revealStyle }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", borderTop:`1px solid ${C.border}`, paddingTop:"20px", marginBottom:"80px" }}>
          <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>SELECTED WORK</span>
          <span style={{ fontSize:"10px", fontWeight:400, letterSpacing:"0.08em", color:C.muted }}>{new Date().getFullYear()}</span>
        </div>

        {PROJECTS.map(project => {
          const active = activeProject === project.num;
          return (
            <div
              key={project.num}
              style={{
                position:     "relative",
                overflow:     "hidden",
                borderTop:    `1px solid ${C.border}`,
                borderLeft:   `3px solid ${active ? C.accent : "transparent"}`,
                cursor:       "pointer",
                transition:   "border-left-color 0.3s ease",
              }}
              onMouseEnter={() => setActiveProject(project.num)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => navigate(`/work/${project.slug}`)}
            >
              {/* Background image on hover */}
              <div style={{ position:"absolute", inset:0, zIndex:0, opacity: active ? 1 : 0, transition:"opacity 0.55s ease" }}>
                <img src={project.imageUrl} alt={project.imageAlt} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:project.overlay }} />
              </div>

              <div
                className="work-grid"
                style={{
                  position:            "relative",
                  zIndex:              1,
                  padding:             "44px 0 44px 16px",
                  display:             "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems:          "end",
                  gap:                 "48px",
                  color:               active ? "#F5F2EC" : C.ink,
                  transition:          "color 0.4s ease",
                }}
              >
                <div>
                  <span style={{
                    display:       "block",
                    fontSize:      "10px",
                    fontWeight:    600,
                    letterSpacing: "0.14em",
                    marginBottom:  "6px",
                    color:         active ? "rgba(245,242,236,0.55)" : C.accent,
                    transition:    "color 0.3s ease",
                  }}>
                    {project.num} · {project.year}
                  </span>
                  <h2 style={{ fontSize:"clamp(48px,7vw,120px)", fontWeight:800, lineHeight:0.88, letterSpacing:"-0.035em" }}>{project.title}</h2>
                </div>
                <div style={{ alignSelf:"center", paddingBottom:"6px" }}>
                  <p style={{ fontSize:"clamp(15px,1.5vw,18px)", fontWeight:400, lineHeight:1.55, maxWidth:"440px" }}>{project.statement}</p>
                  <p style={{ marginTop:"20px", fontSize:"10.5px", fontWeight:600, letterSpacing:"0.1em", opacity: active ? 0.65 : 0.38, transition:"opacity 0.3s ease" }}>{project.meta}</p>
                </div>
                <div style={{ alignSelf:"flex-end", paddingBottom:"6px" }}>
                  <span style={{
                    fontSize:      "11px",
                    fontWeight:    700,
                    letterSpacing: "0.12em",
                    opacity:       active ? 1 : 0,
                    transform:     active ? "translateX(0)" : "translateX(10px)",
                    transition:    "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                    display:       "block",
                    whiteSpace:    "nowrap",
                  }}>
                    OPEN →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ borderTop:`1px solid ${C.border}` }} />
      </section>

      {/* ── CURIOSITIES ───────────────────────────────────────────────────── */}
      <section className="section-pad" ref={revealCuriosities.ref} style={{ padding:"120px 48px", ...revealCuriosities.revealStyle }}>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"20px", marginBottom:"72px" }}>
          <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>I&apos;M CURIOUS ABOUT...</span>
        </div>
        {CURIOSITIES.map((q, i) => (
          <div
            key={i}
            style={{
              padding:         "28px 0",
              borderBottom:    `1px solid ${C.border}`,
              borderLeft:      `3px solid ${hoveredCuriosity === i ? C.accent : "transparent"}`,
              paddingLeft:     hoveredCuriosity === i ? "22px" : "0px",
              transition:      "border-left-color 0.22s ease, padding-left 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={() => setHoveredCuriosity(i)}
            onMouseLeave={() => setHoveredCuriosity(null)}
          >
            <p style={{
              fontSize:      "clamp(26px,3.8vw,50px)",
              fontWeight:    700,
              lineHeight:    1.18,
              letterSpacing: "-0.022em",
              color:         hoveredCuriosity === i ? C.accent : C.ink,
              maxWidth:      "880px",
              transition:    "color 0.22s ease",
              cursor:        "default",
            }}>
              {q}
            </p>
          </div>
        ))}
      </section>

      {/* ── OTHER THINGS ──────────────────────────────────────────────────── */}
      <section className="section-pad" ref={revealSide.ref} style={{ padding:"0 48px 120px", ...revealSide.revealStyle }}>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:"20px", marginBottom:"56px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <span style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>OTHER THINGS I&apos;VE MESSED WITH</span>
          <span style={{ fontSize:"10px", fontWeight:400, color:C.muted }}>no subpages, just the work</span>
        </div>

        <div
          style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"3px" }}
          className="side-projects-grid"
        >
          {SIDE_PROJECTS.map((sp, i) => (
            <div
              key={i}
              style={{
                gridColumn: sp.span === 2 ? "span 2" : "span 1",
                background:  sp.color,
                overflow:    "hidden",
                cursor:      "default",
                transition:  "filter 0.3s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = "brightness(0.97)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ""; }}
            >
              {/* Placeholder image area */}
              <div style={{ width:"100%", paddingTop: sp.aspect, background:`color-mix(in srgb, ${sp.color} 70%, #181614 30%)`, position:"relative" }}>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.16em", color:"rgba(24,22,20,0.25)", textTransform:"uppercase" }}>{sp.tag}</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding:"24px 28px 28px" }}>
                <span style={{ display:"block", fontSize:"9.5px", fontWeight:700, letterSpacing:"0.14em", color:C.accent, marginBottom:"10px" }}>{sp.tag}</span>
                <p style={{ fontSize:"17px", fontWeight:700, letterSpacing:"-0.015em", color:C.ink, marginBottom:"10px", lineHeight:1.2 }}>{sp.title}</p>
                <p style={{ fontSize:"13.5px", fontWeight:400, color:C.dim, lineHeight:1.55 }}>{sp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="section-pad" ref={revealAbout.ref} style={{ padding:"120px 48px", borderTop:`1px solid ${C.border}`, ...revealAbout.revealStyle }}>
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start", maxWidth:"1200px" }}>
          <div style={{ background:C.surface, aspectRatio:"4/5", display:"flex", alignItems:"flex-end", justifyContent:"flex-start", padding:"20px 24px" }}>
            <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.1em", color:C.muted }}>[PORTRAIT PHOTOGRAPH]</span>
          </div>
          <div>
            <h2 style={{ fontSize:"clamp(44px,6vw,92px)", fontWeight:800, lineHeight:0.93, letterSpacing:"-0.035em", marginBottom:"44px" }}>HI, I&apos;M<br />SHANVI.</h2>
            <p style={{ fontSize:"clamp(16px,1.6vw,19px)", fontWeight:400, lineHeight:1.65, color:C.dim, marginBottom:"32px", maxWidth:"440px" }}>
              I&apos;m a product designer who likes figuring out why things work the way they do — and what happens when they don&apos;t.
            </p>
            <p style={{ fontSize:"clamp(15px,1.4vw,17px)", fontWeight:400, lineHeight:1.65, color:C.muted, marginBottom:"64px", maxWidth:"420px" }}>
              I make digital products, service systems, and the occasional zine. I care about research, craft, and the moment a user says "oh, I get it now."
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px" }}>
              <div>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>INTERESTED IN</p>
                {["Products", "People", "Behaviour", "Systems", "Culture", "Technology"].map(item => (
                  <p key={item} style={{ fontSize:"15px", fontWeight:500, lineHeight:2.1, color:C.ink }}>{item}</p>
                ))}
              </div>
              <div>
                <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>CURRENTLY</p>
                <p style={{ fontSize:"15px", fontWeight:500, color:C.muted, fontStyle:"italic", lineHeight:1.8 }}>[placeholder]</p>
                <p style={{ marginTop:"40px", fontSize:"10px", fontWeight:700, letterSpacing:"0.14em", color:C.muted, marginBottom:"18px" }}>EDUCATION</p>
                <p style={{ fontSize:"15px", fontWeight:500, color:C.ink, lineHeight:1.8 }}>[placeholder]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="section-pad" ref={revealContact.ref} style={{ padding:"120px 48px 100px", borderTop:`1px solid ${C.border}`, ...revealContact.revealStyle }}>
        <h2 style={{ fontSize:"clamp(60px,10vw,156px)", fontWeight:800, lineHeight:0.88, letterSpacing:"-0.04em", marginBottom:"36px" }}>HAVE<br />SOMETHING<br />MESSY?</h2>
        <p style={{ fontSize:"clamp(17px,1.8vw,21px)", fontWeight:400, color:C.muted, marginBottom:"64px" }}>I&apos;d probably like it.</p>
        <div className="contact-links" style={{ display:"flex", gap:"48px", alignItems:"center", flexWrap:"wrap" }}>
          <a
            href="mailto:hello@shanvibhadauriya.com"
            style={{
              fontSize:        "clamp(18px,2.8vw,30px)",
              fontWeight:      800,
              letterSpacing:   "-0.02em",
              color:           C.ink,
              textDecoration:  "none",
              borderBottom:    `2.5px solid ${C.accent}`,
              paddingBottom:   "3px",
              transition:      "color 0.2s ease, letter-spacing 0.3s ease",
              display:         "inline-block",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = C.accent; e.currentTarget.style.letterSpacing = "-0.005em"; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.ink;    e.currentTarget.style.letterSpacing = "-0.02em"; }}
          >
            LET&apos;S TALK ↗
          </a>
          <div style={{ display:"flex", gap:"28px" }}>
            {["LinkedIn ↗", "Instagram ↗", "Resume ↗"].map(link => (
              <a
                key={link}
                href="#"
                style={{ fontSize:"11.5px", fontWeight:500, letterSpacing:"0.07em", color:C.muted, textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div
          className="footer-row"
          style={{ marginTop:"120px", display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.border}`, paddingTop:"24px" }}
        >
          <span style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.14em", color:C.muted }}>SHANVI BHADAURIYA</span>
          <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.08em", color:C.muted }}>PRODUCT DESIGNER</span>
        </div>
      </section>
    </div>
  );
}
