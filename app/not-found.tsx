import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-6xl font-bold text-zinc-900">404</h1>
      <p className="mb-6 text-lg text-zinc-600">Страница не найдена</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        На главную
      </Link>
    </div>
  );
}
