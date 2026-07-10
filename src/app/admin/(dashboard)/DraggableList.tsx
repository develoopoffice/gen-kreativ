"use client";

import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface DraggableListProps<T extends { id: string }> {
  items: T[];
  /** Dipanggil sekali saat drag selesai, dengan urutan id terbaru. */
  onReorder: (ids: string[]) => void;
  renderItem: (item: T) => React.ReactNode;
}

/**
 * Daftar yang bisa disusun ulang lewat drag & drop (HTML5 DnD, tanpa dep).
 * Item dipindah secara optimistik saat melayang di atas item lain; urutan
 * final dikirim ke `onReorder` saat drag dilepas.
 */
export function DraggableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: DraggableListProps<T>) {
  const [list, setList] = useState(items);
  const [dragId, setDragId] = useState<string | null>(null);
  const listRef = useRef(list);
  listRef.current = list;

  // Sinkron ulang saat data server berubah (tambah/hapus/revalidate).
  useEffect(() => setList(items), [items]);

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!dragId || dragId === overId) return;

    setList((prev) => {
      const from = prev.findIndex((x) => x.id === dragId);
      const to = prev.findIndex((x) => x.id === overId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      next.splice(to, 0, ...next.splice(from, 1));
      return next;
    });
  };

  const handleDragEnd = () => {
    if (dragId) onReorder(listRef.current.map((x) => x.id));
    setDragId(null);
  };

  return (
    <ul className="space-y-3">
      {list.map((item) => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => {
            setDragId(item.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDragEnd={handleDragEnd}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-white/10 bg-ink-soft p-3 transition-opacity",
            dragId === item.id && "opacity-40",
          )}
        >
          <span
            className="cursor-grab text-white/30 active:cursor-grabbing"
            title="Tarik untuk mengubah urutan"
            aria-hidden
          >
            <FiMenu className="h-4 w-4" />
          </span>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
