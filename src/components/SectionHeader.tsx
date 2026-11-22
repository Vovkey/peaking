'use client';

import { useState } from "react";
import { CreateModal } from "./CreateModal";

interface SectionHeaderProps {
  title: string;
  badge: string;
  type: 'habit' | 'task' | 'reward';
  action: (formData: FormData) => Promise<void>;
}

export function SectionHeader({ title, badge, type, action }: SectionHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex iems-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-100">{title}</h2>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{badge}</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-400 px-2.5 py-1 rounded-lg border border-slate-700 transition"
        >
          + Add
        </button>
      </div>

      <CreateModal
        type={type}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        action={action}
      />
    </>
  );
}
