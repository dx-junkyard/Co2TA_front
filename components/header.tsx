import { Bell } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default async function Header() {
  return (
    <header className="border-b">
      <div className="px-4 h-16 flex items-center flex-1 gap-4">
        <span className="flex-1"></span>
        <Button className="font-bold text-lg" asChild variant={"ghost"}>
          <Link href="/">CarbonTech Assist</Link>
        </Button>
        <Bell />
        <ModeToggle />
      </div>
    </header>
  );
}
