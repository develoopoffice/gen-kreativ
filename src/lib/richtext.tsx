import type { ReactNode } from "react";

/**
 * Parser markup ringan untuk badan berita: **tebal**, *miring*, __garis bawah__.
 * Tidak mendukung nesting — cukup untuk kebutuhan admin di textarea polos.
 */
export function parseRichText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.+?\*\*|__.+?__|\*.+?\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return <u key={i}>{part.slice(2, -2)}</u>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
