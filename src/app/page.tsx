import { Main } from "@/components/main";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className=" h-screen w-full flex">
      <Sidebar />
      <Main />
    </div>
  );
}
