import { KahlyPage } from "@/components/kahly/kahly-page";
import { KAHLY_COPY } from "@/data/kahly";
import { buildPageMetadata } from "@/lib/shared-metadata";

const copy = KAHLY_COPY["en"];
export const metadata = buildPageMetadata({ locale: "en", path: "/kahly", title: copy.title, description: copy.description, keywords: ["KAHLY", "KAH Digital Studio"] });

export default function Page() { return <KahlyPage locale="en" />; }
