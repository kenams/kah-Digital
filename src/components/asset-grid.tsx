import Image from "next/image";
import Link from "next/link";
import type { AssetShot } from "@/data/asset-shots";

type AssetGridProps = {
  assets: AssetShot[];
  columns?: "default" | "dense";
};

export function AssetGrid({ assets, columns = "default" }: AssetGridProps) {
  const columnClasses =
    columns === "dense" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-4" : "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={columnClasses}>
      {assets.map((asset) => (
        <div
          key={asset.title}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-5 text-white shadow-[0_30px_80px_rgba(5,5,5,0.55)]"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
            <span>Asset</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[0.6rem] text-white/70">
              {asset.chips.join(" / ")}
            </span>
          </div>
          <Image
            src={asset.image}
            alt={asset.title}
            width={520}
            height={320}
            className="mt-4 h-48 w-full rounded-2xl border border-white/15 bg-black/30 object-cover"
          />
          <p className="mt-5 text-lg font-semibold">{asset.title}</p>
          <p className="mt-2 text-sm text-white/70">{asset.description}</p>
          <Link
            href={asset.cta.href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/70"
          >
            {asset.cta.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
