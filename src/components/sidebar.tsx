import Dropzone from "@/components/ui/user/dropzone";
import { Button } from "./ui/button";
import { ShieldCogCorner, HardDriveUpload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
  return (
    <div className="h-full w-2/6 bg-neutral-900 p-5 flex flex-col justify-between ">
      <div>
        <div className="flex items-center gap-3 text-amber-50/90">
          <ShieldCogCorner className="h-8 w-8" />
          <h1 className="font-bold text-2xl ">Aegis OTA</h1>
        </div>

        <div className="mt-5">
          <Dropzone />
        </div>
      </div>

      <Button className={cn("p-5")}>
        <HardDriveUpload />
        &nbsp;Upload
      </Button>
    </div>
  );
}
