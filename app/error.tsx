"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-red-600">Coś poszło nie tak!</h1>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
