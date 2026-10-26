import { promises as dns } from "dns";
import net from "net";

// Les URL à télécharger viennent d'annuaires, de tags OpenStreetMap et du
// formulaire d'audit gratuit : n'importe qui peut y mettre une adresse interne
// (métadonnées cloud, réseau privé). On résout le DNS et on refuse toute adresse
// non publique, à chaque redirection.
function isPrivateIp(ip: string): boolean {
  const mapped = ip.toLowerCase().replace(/^::ffff:/, "");
  if (net.isIPv4(mapped)) {
    const [a, b] = mapped.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }
  const v6 = mapped;
  return v6 === "::1" || v6 === "::" || v6.startsWith("fe8") || v6.startsWith("fe9") || v6.startsWith("fea") || v6.startsWith("feb") || v6.startsWith("fc") || v6.startsWith("fd");
}

export async function assertPublicUrl(raw: string): Promise<URL> {
  const url = new URL(raw);
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Protocole refusé");
  const host = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) throw new Error("Hôte interne refusé");
  const addresses = net.isIP(host) ? [{ address: host }] : await dns.lookup(host, { all: true });
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) throw new Error("Adresse non publique refusée");
  return url;
}

// fetch qui valide l'hôte avant chaque requête, redirections comprises.
export async function safeFetch(raw: string, init: RequestInit = {}, maxRedirects = 4): Promise<Response> {
  let current = raw;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const url = await assertPublicUrl(current);
    const res = await fetch(url, { ...init, redirect: "manual" });
    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, url).toString();
      continue;
    }
    return res;
  }
  throw new Error("Trop de redirections");
}
