import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold">Your Trips</h1>
    </main>
  );
}