import { useState } from "react";
import useChannel from "../hooks/useChannel";
import { useLocation } from "react-router-dom";
import useMusicObjects from "../hooks/useMusicObjects";
import AudioPlayer from "../features/audioPlayer/AudioPlayer";

function AudioPlayerPage() {
  const location = useLocation();
  const mid = location.pathname.split("/").at(-1);
  const { data } = useChannel("listener", mid);
  const { musicObjects, isPending } = useMusicObjects({ mid, data });
  const [music, setMusic] = useState();
  return (
    // <>
    //   {!isPending &&
    //     musicObjects.map((m, idx) => (
    //       <>
    //         <h1 key={idx}>{m.music.name}</h1>
    //         <button
    //           onClick={() => {
    //             music?.stop();
    //             setMusic(m.musicObject);
    //           }}
    //         >
    //           SET
    //         </button>
    //       </>
    //     ))}
    //   {music ? (
    //     <div>
    //       <button
    //         onClick={() => {
    //           music.jump(0, 0);
    //         }}
    //       >
    //         Play
    //       </button>
    //       <button
    //         onClick={() => {
    //           music.pause();
    //         }}
    //       >
    //         Pause
    //       </button>
    //     </div>
    //   ) : (
    //     <h1>NO MUSIC</h1>
    //   )}
    // </>
    <AudioPlayer></AudioPlayer>
  );
}

export default AudioPlayerPage;
