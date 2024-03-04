import { useEffect, useState } from "react";
import { decodeAudioData, getMusic } from "../services/apiMusic";

function useMusicObjects({ mid, data }) {
  const [isPending, setIsPending] = useState(false);
  const [musicObjects, setMusicObjects] = useState([]);

  useEffect(
    function () {
      if (!data.length) return;
      async function getData() {
        setIsPending(true);
        try {
          let music;
          if (data.at(-1).music) {
            music = data.at(-1).music;
          } else {
            const { music: audioData } = await getMusic(data.at(-1), false);
            music = audioData;
          }
          let find = false;
          musicObjects.forEach((e) => {
            if (e.music.id === music.id) {
              find = true;
            }
          });
          if (find) return;
          const newMusicObject = await decodeAudioData(music.audio);
          setMusicObjects((m) => [
            ...m,
            { musicObject: newMusicObject, music },
          ]);
        } catch (error) {
          alert(error);
        } finally {
          setIsPending(false);
        }
      }
      getData();
    },
    [data]
  );

  return { musicObjects, isPending };
}

export default useMusicObjects;
