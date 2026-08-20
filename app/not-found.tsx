import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>This page is not here.</h1>
      <Link href="/">
        <ArrowLeft size={19} weight="bold" aria-hidden="true" />
        Return home
      </Link>
    </main>
  );
}
