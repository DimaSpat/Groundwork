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
        <h1 className="text-2xl font-bold">Groundwork API is alive!</h1>
      ) : (
        <h1 className="text-2xl font-bold text-red-500">
          Groundwork API is not responding.
        </h1>
      )}
    </div>
  );
}
