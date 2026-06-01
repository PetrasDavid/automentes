const items = [
  { label: "Személyautó", className: "col-span-2 min-h-[140px] sm:col-span-2 sm:row-span-2 sm:min-h-0" },
  { label: "Éjszaka", className: "col-span-1 min-h-[100px] sm:col-span-1" },
  { label: "Furgon", className: "col-span-1 min-h-[100px] sm:col-span-1" },
  { label: "Bikázás", className: "col-span-1 min-h-[100px] sm:col-span-1" },
  { label: "Pálya", className: "col-span-2 min-h-[100px] sm:col-span-1 sm:min-h-0" },
] as const;

export function Gallery() {
  return (
    <section
      id="galeria"
      className="scroll-mt-20 border-b border-zinc-800/80 bg-[#0a0a0b] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
            Munkák
          </h2>
          <p className="max-w-sm text-sm text-zinc-500">
            Saját fotók ide — a vevőnek ez számít. A képeket a{" "}
            <code className="text-zinc-400">public/</code> mappából érdemes betölteni.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 grid-rows-[auto] gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
          {items.map(({ label, className }, i) => (
            <figure
              key={label}
              className={`relative overflow-hidden border border-zinc-800 bg-zinc-900 ${className}`}
            >
              <div
                className="absolute inset-0 opacity-[0.65]"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(145deg, #1c1c1f 0%, #0d0d0f 55%, #151518 100%)"
                      : `linear-gradient(${160 + i * 17}deg, #222226, #0f0f12)`,
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 py-3 sm:px-4 sm:py-4">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  {label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
