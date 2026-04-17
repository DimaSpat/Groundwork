interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  selected_role: "customer" | "manager" | "owner";
  created_at: string;
}

export default async function Home() {
  let isAlive = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
      cache: "no-store",
    });

    isAlive = res.ok;
  } catch {
    isAlive = false;
  }

  return (
    <div>
      {isAlive ? (
        <h1>Groundwork API is alive!</h1>
      ) : (
        <h1>Groundwork API is not responding.</h1>
      )}
    </div>
  );
}
