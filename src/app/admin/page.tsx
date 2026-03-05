"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Lang = "en" | "fr" | "es";

const SECTIONS = ["nav", "hero", "about", "services", "quote", "team", "process", "contact", "footer"] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<Section, string> = {
  nav: "Navigation",
  hero: "Hero",
  about: "About",
  services: "Services",
  quote: "Quote",
  team: "Team",
  process: "Process",
  contact: "Contact",
  footer: "Footer",
};

const IMAGE_LABELS: Record<string, string> = {
  services_employer: "Services — For Employers",
  services_talent: "Services — For Talent",
  fullwidth_break: "Full-Width Break",
  team_0: "Team — Elena Marchetti",
  team_1: "Team — Thomas Renaud",
  team_2: "Team — Sofia Alvarez",
  team_3: "Team — James Whitfield",
  team_4: "Team — Amélie Fontaine",
};

const IMAGE_KEYS = Object.keys(IMAGE_LABELS);

/* ═══════════════════════════════════════════
   Password Gate
   ═══════════════════════════════════════════ */

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const verify = useAction(api.auth.verifyPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const valid = await verify({ password });
      if (valid) {
        sessionStorage.setItem("cipher_admin", "true");
        onAuth();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Authentication failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-xl font-light tracking-wide">Cipher Admin</h1>
          <p className="mt-1 text-sm text-neutral-400">Enter the admin password to continue.</p>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-400"
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-2.5 text-sm text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Text Input Helper
   ═══════════════════════════════════════════ */

function TextInput({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-none rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section Editors
   ═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NavEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const set = (key: string, val: string) => onChange({ ...data, [key]: val });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextInput label="About" value={data.about} onChange={(v) => set("about", v)} />
      <TextInput label="Services" value={data.services} onChange={(v) => set("services", v)} />
      <TextInput label="Process" value={data.process} onChange={(v) => set("process", v)} />
      <TextInput label="Contact" value={data.contact} onChange={(v) => set("contact", v)} />
      <TextInput label="CTA Button" value={data.cta} onChange={(v) => set("cta", v)} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const set = (key: string, val: string) => onChange({ ...data, [key]: val });
  return (
    <div className="space-y-4">
      <TextInput label="Heading (h1)" value={data.h1} onChange={(v) => set("h1", v)} multiline />
      <TextInput label="Subtitle" value={data.sub} onChange={(v) => set("sub", v)} multiline />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AboutEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const set = (key: string, val: string) => onChange({ ...data, [key]: val });
  return (
    <div className="space-y-4">
      <TextInput label="Label" value={data.label} onChange={(v) => set("label", v)} />
      <TextInput label="Heading" value={data.h} onChange={(v) => set("h", v)} multiline />
      <TextInput label="Paragraph" value={data.p} onChange={(v) => set("p", v)} multiline />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ServicesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const setEmp = (key: string, val: unknown) => onChange({ ...data, emp: { ...data.emp, [key]: val } });
  const setTal = (key: string, val: string) => onChange({ ...data, tal: { ...data.tal, [key]: val } });

  return (
    <div className="space-y-8">
      <TextInput label="Section label" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />

      <div className="rounded border border-neutral-100 bg-neutral-50 p-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">For Employers</h4>
        <TextInput label="Label" value={data.emp.label} onChange={(v) => setEmp("label", v)} />
        <TextInput label="Heading line 1" value={data.emp.h1} onChange={(v) => setEmp("h1", v)} />
        <TextInput label="Heading line 2" value={data.emp.h2} onChange={(v) => setEmp("h2", v)} />
        <TextInput label="Description" value={data.emp.p} onChange={(v) => setEmp("p", v)} multiline />
        <div className="space-y-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400">Roles</label>
          {data.emp.roles.map((role: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  const roles = [...data.emp.roles];
                  roles[i] = e.target.value;
                  setEmp("roles", roles);
                }}
                className="flex-1 rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              />
              <button
                onClick={() => setEmp("roles", data.emp.roles.filter((_: string, j: number) => j !== i))}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => setEmp("roles", [...data.emp.roles, ""])}
            className="text-xs text-neutral-400 hover:text-black"
          >
            + Add role
          </button>
        </div>
        <TextInput label="CTA text" value={data.emp.cta} onChange={(v) => setEmp("cta", v)} />
      </div>

      <div className="rounded border border-neutral-100 bg-neutral-50 p-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">For Talent</h4>
        <TextInput label="Label" value={data.tal.label} onChange={(v) => setTal("label", v)} />
        <TextInput label="Heading line 1" value={data.tal.h1} onChange={(v) => setTal("h1", v)} />
        <TextInput label="Heading line 2" value={data.tal.h2} onChange={(v) => setTal("h2", v)} />
        <TextInput label="Description" value={data.tal.p} onChange={(v) => setTal("p", v)} multiline />
        <TextInput label="CTA text" value={data.tal.cta} onChange={(v) => setTal("cta", v)} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QuoteEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const set = (key: string, val: string) => onChange({ ...data, [key]: val });
  return (
    <div className="space-y-4">
      <TextInput label="Quote text" value={data.text} onChange={(v) => set("text", v)} multiline />
      <TextInput label="Attribution" value={data.attr} onChange={(v) => set("attr", v)} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TeamEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const setMember = (i: number, key: string, val: string) => {
    const members = [...data.members];
    members[i] = { ...members[i], [key]: val };
    onChange({ ...data, members });
  };

  return (
    <div className="space-y-4">
      <TextInput label="Label" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />
      <TextInput label="Heading" value={data.h} onChange={(v) => onChange({ ...data, h: v })} />

      <div className="space-y-4">
        <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400">Members</label>
        {data.members.map((member: { name: string; role: string }, i: number) => (
          <div key={i} className="flex gap-3 rounded border border-neutral-100 bg-neutral-50 p-3">
            <div className="flex-1 space-y-2">
              <TextInput label={`Name #${i + 1}`} value={member.name} onChange={(v) => setMember(i, "name", v)} />
              <TextInput label={`Role #${i + 1}`} value={member.role} onChange={(v) => setMember(i, "role", v)} />
            </div>
            <button
              onClick={() => onChange({ ...data, members: data.members.filter((_: unknown, j: number) => j !== i) })}
              className="self-start text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange({ ...data, members: [...data.members, { name: "", role: "" }] })}
          className="text-xs text-neutral-400 hover:text-black"
        >
          + Add member
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProcessEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const setStep = (i: number, key: string, val: string) => {
    const steps = [...data.steps];
    steps[i] = { ...steps[i], [key]: val };
    onChange({ ...data, steps });
  };

  return (
    <div className="space-y-4">
      <TextInput label="Label" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />
      <TextInput label="Heading" value={data.h} onChange={(v) => onChange({ ...data, h: v })} />

      <div className="space-y-4">
        <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400">Steps</label>
        {data.steps.map((step: { num: string; title: string; text: string }, i: number) => (
          <div key={i} className="rounded border border-neutral-100 bg-neutral-50 p-3 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Number" value={step.num} onChange={(v) => setStep(i, "num", v)} />
              <TextInput label="Title" value={step.title} onChange={(v) => setStep(i, "title", v)} />
            </div>
            <TextInput label="Description" value={step.text} onChange={(v) => setStep(i, "text", v)} multiline />
          </div>
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const setForm = (key: string, val: string) => onChange({ ...data, form: { ...data.form, [key]: val } });
  const setBooking = (key: string, val: string) => onChange({ ...data, booking: { ...data.booking, [key]: val } });

  return (
    <div className="space-y-8">
      <TextInput label="Section label" value={data.label} onChange={(v) => onChange({ ...data, label: v })} />
      <TextInput label="Heading line 1" value={data.h1} onChange={(v) => onChange({ ...data, h1: v })} />
      <TextInput label="Heading line 2" value={data.h2} onChange={(v) => onChange({ ...data, h2: v })} />

      <div className="rounded border border-neutral-100 bg-neutral-50 p-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Inquiry Form</h4>
        <TextInput label="Heading" value={data.form.heading} onChange={(v) => setForm("heading", v)} />
        <TextInput label="Subtext" value={data.form.sub} onChange={(v) => setForm("sub", v)} multiline />
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput label="Name field" value={data.form.name} onChange={(v) => setForm("name", v)} />
          <TextInput label="Email field" value={data.form.email} onChange={(v) => setForm("email", v)} />
          <TextInput label="Company field" value={data.form.company} onChange={(v) => setForm("company", v)} />
          <TextInput label="Message field" value={data.form.message} onChange={(v) => setForm("message", v)} />
        </div>
        <TextInput label="Send button" value={data.form.send} onChange={(v) => setForm("send", v)} />
      </div>

      <div className="rounded border border-neutral-100 bg-neutral-50 p-4 space-y-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Booking</h4>
        <TextInput label="Heading" value={data.booking.heading} onChange={(v) => setBooking("heading", v)} />
        <TextInput label="Subtext" value={data.booking.sub} onChange={(v) => setBooking("sub", v)} multiline />
        <TextInput label="CTA text" value={data.booking.cta} onChange={(v) => setBooking("cta", v)} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FooterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <TextInput label="Rights text" value={data.rights} onChange={(v) => onChange({ ...data, rights: v })} />
  );
}

/* ═══════════════════════════════════════════
   Image Manager
   ═══════════════════════════════════════════ */

function ImageUploader({ imageKey, currentUrl, currentAlt }: { imageKey: string; currentUrl: string; currentAlt: string }) {
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);
  const updateImage = useMutation(api.images.updateImage);
  const [uploading, setUploading] = useState(false);
  const [alt, setAlt] = useState(currentAlt);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setAlt(currentAlt), [currentAlt]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
      const { storageId } = await res.json();
      await updateImage({ key: imageKey, storageId, alt });
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(false);
  };

  return (
    <div className="rounded border border-neutral-200 bg-white p-4 space-y-3">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{IMAGE_LABELS[imageKey]}</p>
      <div className="aspect-[4/3] w-full overflow-hidden rounded bg-neutral-100">
        {currentUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt={currentAlt} className="h-full w-full object-cover" />
        )}
      </div>
      <TextInput label="Alt text" value={alt} onChange={setAlt} />
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="w-full rounded border border-neutral-300 py-2 text-xs uppercase tracking-wider text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Replace image"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Admin Dashboard
   ═══════════════════════════════════════════ */

function AdminDashboard() {
  const content = useQuery(api.content.get);
  const images = useQuery(api.images.list);
  const updateSection = useMutation(api.content.updateSection);
  const seedDb = useMutation(api.seed.seed);

  const [activeTab, setActiveTab] = useState<"content" | "images">("content");
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [activeLang, setActiveLang] = useState<Lang>("en");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editData, setEditData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Track which section+lang the editData belongs to
  const [loadedKey, setLoadedKey] = useState("");

  // Load section data into editor when section/lang/content changes
  useEffect(() => {
    const key = `${activeSection}_${activeLang}`;
    if (content) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const langContent = (content as any)[activeLang];
      if (langContent && langContent[activeSection]) {
        setEditData(JSON.parse(JSON.stringify(langContent[activeSection])));
        setLoadedKey(key);
      }
    }
  }, [content, activeSection, activeLang]);

  const handleSave = async () => {
    if (!editData) return;
    setSaving(true);
    try {
      await updateSection({ language: activeLang, section: activeSection, data: editData });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed", err);
    }
    setSaving(false);
  };

  // Loading state
  if (content === undefined || images === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  // Database empty — show seed button
  if (content === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-50">
        <div className="text-center">
          <h1 className="text-xl font-light">Database Empty</h1>
          <p className="mt-2 text-sm text-neutral-400">Seed the database with the initial site content.</p>
        </div>
        <button
          onClick={() => seedDb()}
          className="rounded bg-black px-6 py-2.5 text-sm text-white transition hover:bg-neutral-800"
        >
          Seed Database
        </button>
      </div>
    );
  }

  const renderSectionEditor = () => {
    const expectedKey = `${activeSection}_${activeLang}`;
    if (!editData || loadedKey !== expectedKey) return <p className="text-sm text-neutral-400">Loading...</p>;
    const props = { data: editData, onChange: setEditData };
    switch (activeSection) {
      case "nav": return <NavEditor {...props} />;
      case "hero": return <HeroEditor {...props} />;
      case "about": return <AboutEditor {...props} />;
      case "services": return <ServicesEditor {...props} />;
      case "quote": return <QuoteEditor {...props} />;
      case "team": return <TeamEditor {...props} />;
      case "process": return <ProcessEditor {...props} />;
      case "contact": return <ContactEditor {...props} />;
      case "footer": return <FooterEditor {...props} />;
    }
  };

  const imageMap: Record<string, { url: string; alt: string }> = {};
  for (const img of images) {
    imageMap[img.key] = { url: img.url, alt: img.alt };
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
        <div className="flex items-center gap-6">
          <h1 className="text-sm font-light tracking-[0.3em] uppercase">Cipher Admin</h1>
          <div className="flex rounded-md border border-neutral-200 text-xs">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 py-1.5 transition ${activeTab === "content" ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`px-4 py-1.5 transition ${activeTab === "images" ? "bg-black text-white" : "text-neutral-500 hover:text-black"}`}
            >
              Images
            </button>
          </div>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("cipher_admin"); window.location.reload(); }}
          className="text-xs text-neutral-400 hover:text-black"
        >
          Sign out
        </button>
      </header>

      {activeTab === "content" ? (
        <div className="mx-auto max-w-4xl px-6 py-8">
          {/* Section tabs */}
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`rounded-full px-4 py-1.5 text-xs transition ${
                  activeSection === s ? "bg-black text-white" : "border border-neutral-200 text-neutral-500 hover:text-black"
                }`}
              >
                {SECTION_LABELS[s]}
              </button>
            ))}
          </div>

          {/* Language tabs */}
          <div className="mt-6 flex gap-2">
            {(["en", "fr", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLang(l)}
                className={`rounded px-3 py-1 text-xs font-medium uppercase transition ${
                  activeLang === l ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500 hover:text-black"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
            {renderSectionEditor()}
          </div>

          {/* Save */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-black px-6 py-2.5 text-sm text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            {saved && <span className="text-sm text-green-600">Saved!</span>}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h2 className="text-lg font-light">Site Images</h2>
          <p className="mt-1 text-sm text-neutral-400">Upload new images to replace the current ones.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {IMAGE_KEYS.map((key) => (
              <ImageUploader
                key={key}
                imageKey={key}
                currentUrl={imageMap[key]?.url ?? ""}
                currentAlt={imageMap[key]?.alt ?? ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Admin Page (Entry)
   ═══════════════════════════════════════════ */

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setIsAuthed(sessionStorage.getItem("cipher_admin") === "true");
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthed) {
    return <PasswordGate onAuth={() => setIsAuthed(true)} />;
  }

  return <AdminDashboard />;
}
