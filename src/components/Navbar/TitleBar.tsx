import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

type Props = { title: string; onBack?: () => void };

function TitleBar({ title, onBack }: Props) {
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white flex items-center z-10 md:gap-2 mt-3">
      <IconButton sx={{ color: "black" }} onClick={onBack || router.back}>
        <ArrowBackIcon />
      </IconButton>
      <div>
        <h2 className="font-semibold text-lg leading-none">{title}</h2>
      </div>
    </div>
  );
}

export { TitleBar };
