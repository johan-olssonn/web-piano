import { keys } from "../definitions/keys";
import Key from "./Key";

export default function Piano({ onKeyLoaded }: { onKeyLoaded: () => void }) {
  return (
    <div className="relative overflow-y-scroll whitespace-nowrap">
      {keys.map((k) => (
        <Key
          pianoKey={k}
          key={k.name}
          showKeyName={k.blackKeyIndex === undefined}
          onAudioLoaded={onKeyLoaded}
        />
      ))}
    </div>
  );
}
