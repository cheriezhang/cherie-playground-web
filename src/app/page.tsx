import Logo from "../../public/logo.svg";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-16 p-8 pb-20 sm:p-20">
      <main className="flex flex-col items-center gap-[32px] sm:items-start">
        <Logo className="h-32 w-32 text-blue-500" />
        <Typography variant="h1" className="text-3xl font-medium">
          {"👋 Welcome to Cherie's Playground"}
        </Typography>
        <p className="text-xl">
          Here is the place where I want to try everything cut-edge technical,
          as well as the continuously learning notes and diary for my daily life.
        </p>
      </main>
    </div>
  );
}
