import { keys } from "../definitions/keys";
import Key from "./Key";

export default function Piano() {
  return (
    <div className="relative overflow-y-scroll whitespace-nowrap">
      {keys.map((k) => (
        <Key pianoKey={k} showKeyName={k.blackKeyIndex === undefined} />
      ))}
    </div>
  );
}
