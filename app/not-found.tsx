import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 · Page not found</p>
      <h1>The analysis moved.<br />The way back is clear.</h1>
      <Link href="/">
        <ArrowLeft size={19} weight="bold" aria-hidden="true" />
        Return home
      </Link>
    </main>
  );
}
