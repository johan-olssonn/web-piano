import { Howl } from "howler";
import { ElementRef, Fragment, useMemo, useRef, useState } from "react";
import { Key as KeyType } from "../types/Key";
import { mapOctaveToColor } from "../utils";
import cx from "classnames";

type Props = {
  pianoKey: KeyType;
  showKeyName?: boolean;
};

const whiteKeyWidth = 56;
const blackKeyWidth = 38;
const margin = 2;
const fadeTimeInMs = 200;

export default function Key({ pianoKey, showKeyName }: Props) {
  const audioRef = useRef<ElementRef<"audio">>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [currentPlayId, setCurrentPlayId] = useState<number>();

  const black = typeof pianoKey.blackKeyIndex === "number";

  const sound = useMemo(
    () =>
      new Howl({
        src: [pianoKey.source],
      }),
    [pianoKey]
  );

  const onTouchStart = () => {
    setIsTouching(true);
    const id = sound.play();
    setCurrentPlayId(id);
  };

  const onTouchEnd = () => {
    setIsTouching(false);
    sound.fade(1, 0, fadeTimeInMs, currentPlayId);
    setTimeout(() => {
      sound.stop(currentPlayId);
    }, fadeTimeInMs);
  };

  return (
    <Fragment>
      <audio src={pianoKey.source} ref={audioRef} />
      <button
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          left: calculateLeftOffset(pianoKey.blackKeyIndex),
          width: black ? blackKeyWidth : whiteKeyWidth,
          marginRight: margin,
          marginLeft: margin,
          background: isTouching ? (black ? "#90ee90" : "#90ee90") : "",
        }}
        className={cx(
          "rounded-b-sm transition ease-out duration-100",
          black
            ? `bg-black text-white h-[30vh] max-h-[140px] absolute`
            : `bg-white text-black h-[60vh] max-h-[280px]`
        )}
      >
        <div className="flex flex-col justify-end items-center h-full">
          {showKeyName && (
            <p
              className="text-sm font-bold mb-2 select-none"
              style={{ color: mapOctaveToColor[pianoKey.octave] }}
            >
              {pianoKey.name}
            </p>
          )}
          {/* <p>{typeof blackKeyIndex === "number" && blackKeyIndex}</p> */}
        </div>
      </button>
    </Fragment>
  );
}

function calculateLeftOffset(index: number | undefined) {
  return (
    whiteKeyWidth +
    margin -
    blackKeyWidth / 2 +
    (index || 0) * (whiteKeyWidth + margin * 2)
  );
}
