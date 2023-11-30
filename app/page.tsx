import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Link href="/productList">
        <a className="m-2 text-lg text-blue-600 no-underline">Product List</a>
      </Link>
      <Link href="/statistics">
        <a className="m-2 text-lg text-blue-600 no-underline">Statistics</a>
      </Link>
    </main>
  );
}
