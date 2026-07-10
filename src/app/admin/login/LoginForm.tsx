"use client";

import { useActionState } from "react";
import { login, type ActionState } from "../actions";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-xs font-semibold text-white/70">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-white/15 bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-white/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-white/15 bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-primary"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
      >
        {pending ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
}
