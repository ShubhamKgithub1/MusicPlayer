import { ListXIcon, X } from "lucide-react";

export default function PlaybarHeader({ onClose, onClearQueue }) {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between p-3">
      <button onClick={onClearQueue} className="active:scale-90 transition">
        <ListXIcon size={22} />
      </button>

      <h1 className="font-bold text-sm">PLAYING NOW</h1>

      <button onClick={onClose} className="active:scale-90 transition">
        <X size={22} />
      </button>
    </div>
  );
}
