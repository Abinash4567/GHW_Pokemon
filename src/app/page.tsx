import ModeToggle from "@/components/common/modeToggle";
import Stuff from "@/components/common/stuff";

export default function Home() {
  return (
    <main className="w-10/12 h-screen ml-28 mt-4">
      
    <div className="">
      <div className="flex justify-between">
          <div className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">Pokemon</div>
          <div className=""><ModeToggle/></div>
      </div>

      <Stuff/>
    </div>
    </main>
  );
}