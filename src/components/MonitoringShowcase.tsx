import fs from "node:fs";
import path from "node:path";
import MonitoringGallery from "./MonitoringGallery";
import { monitoringShots } from "./monitoringShots";

// Server component: checks which screenshots exist in public/. A production
// build leaves out shots with no image (and the whole section if none exist);
// `next dev` shows them as placeholders so the highlights can be positioned.
export default function MonitoringShowcase() {
  const isDev = process.env.NODE_ENV !== "production";
  const shots = monitoringShots
    .map((s) => ({
      ...s,
      available: fs.existsSync(path.join(process.cwd(), "public", s.image)),
    }))
    .filter((s) => s.available || isDev);

  if (shots.length === 0) return null;
  return <MonitoringGallery shots={shots} />;
}
