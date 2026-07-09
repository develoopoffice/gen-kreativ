import type { Partner } from "@/types";

/**
 * Partners & Clients logo wall on the home page.
 * Drop a transparent PNG/SVG into /public/assets/partners and set `logo.src`.
 */
export const partners: Partner[] = [
  // Row 1
  { id: "tropicana-slim", name: "Tropicana Slim", file: "tropicana.svg" },
  { id: "jtbb", name: "JTBB", file: "JTBB Vector Group.svg" },
  { id: "inbio", name: "INBIO", file: "bsm-logo 1.svg" },
  {
    id: "igf",
    name: "Integrated Genome Factory",
    file: "IGF-2-blue.svg",
  },
  {
    id: "biokimia-analitik",
    name: "Biokimia Analitik",
    file: "biokimia.svg",
  },
  { id: "wiragama", name: "Wiragama", file: "wiragama.svg" },
  // Row 2
  { id: "synbio", name: "Synbio.id", file: "synbio.svg" },
  {
    id: "research-day-2025",
    name: "Research Day 2025",
    file: "research day.svg",
  },
  { id: "ugm-biologi", name: "UGM Fakultas Biologi", file: "fabio.svg" },
  { id: "ugm-farmasi", name: "UGM Fakultas Farmasi", file: "farmasi.svg" },
  // Row 3
  { id: "bbc", name: "BBC", file: "bembio.svg" },
  { id: "nutriplate", name: "NutriPlate", file: "nutriplate.svg" },
  { id: "garuda", name: "Garuda Badge", file: "rajagaruda.svg" },
].map(({ file, ...p }) => ({
  ...p,
  logo: { src: `/assets/partners/${file}`, alt: `${p.name} logo`, label: p.name },
}));
