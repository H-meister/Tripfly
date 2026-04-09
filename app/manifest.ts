import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TripFly",
    short_name: "TripFly",
    description: "A trip planning PWA for you and your friends",
    id: "/",
    start_url: "/signin",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icons/launchericon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/launchericon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
