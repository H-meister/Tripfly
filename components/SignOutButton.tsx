import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/signin" });
      }}
    >
      <button
        type="submit"
        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white"
      >
        Sign Out
      </button>
    </form>
  );
}