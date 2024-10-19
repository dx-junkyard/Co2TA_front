import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      {/* header */}
      <header className="flex justify-between items-center p-4 h-16 border-b border-gray-200">
        <h1>Co2Ta</h1>
        <p>Jクレジット申請補助AIツール</p>
      </header>
      <div className="p-4">
        <Link href="/chat">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            UIページへ
          </button>
        </Link>
      </div>
    </div>
  );
}
