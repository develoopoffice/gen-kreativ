import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import type { SocialPlatform } from "@/types";

const ICONS: Record<SocialPlatform, IconType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  email: MdEmail,
  website: FiGlobe,
  tiktok: FaTiktok,
};

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  const Icon = ICONS[platform];
  return <Icon className={className} aria-hidden />;
}
