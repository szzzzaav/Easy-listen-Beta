import supabase, { supabaseUrl } from "./supabase";

function isChinese(temp) {
  const re = new RegExp(
    "([\u4E00-\u9FFF]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u3010\u3011\uffe5])+",
    "g"
  );
  if (re.test(temp)) return true;
  return false;
}

export function forMatName(fileName) {
  const newName = `${Math.random()}-${fileName}`.replace("/", "");
  return newName;
}

export async function CreateMusic(musicdata) {
  const { cover, lyric, name, author, music, createUserId } = musicdata;
  const newCoverName = forMatName(cover.name);
  const newLyricName = forMatName(lyric.name);
  const newMusicName = forMatName(music.name);
  const coverPath = `${supabaseUrl}/storage/v1/object/public/cover/${newCoverName}`;
  const lyricPath = `${supabaseUrl}/storage/v1/object/public/lyric/${newLyricName}`;
  const musicPath = `${supabaseUrl}/storage/v1/object/public/audioBuffer/${newMusicName}`;
  if (
    isChinese(newCoverName) ||
    isChinese(newLyricName) ||
    isChinese(newMusicName)
  ) {
    throw new Error("The file name cannot contain Chinese characters");
  }
  const { data, error } = await supabase
    .from("music")
    .insert([
      {
        cover: coverPath,
        audio: musicPath,
        lyric: lyricPath,
        name,
        author,
        createUserId,
      },
    ])
    .select();
  if (error) {
    console.log(1);
    console.log(error);
  }

  const { error: CoverStorageError } = await supabase.storage
    .from("cover")
    .upload(newCoverName, cover);
  if (CoverStorageError) {
    console.log(2);
    console.log(CoverStorageError);
  }

  const { error: LyricStorageError } = await supabase.storage
    .from("lyric")
    .upload(newLyricName, lyric);
  if (LyricStorageError) {
    console.log(newLyricName);
    console.log(3);
    console.log(LyricStorageError);
  }

  const { error: MusicStorageError } = await supabase.storage
    .from("audioBuffer")
    .upload(newMusicName, music);
  if (MusicStorageError) {
    console.log(newMusicName);
    console.log(4);
    console.log(MusicStorageError);
  }

  return data;
}

export async function getMusic(id, needProvider = true) {
  let { data: music, error: getMusicError } = await supabase
    .from("music")
    .select("*")
    .eq("id", Number(id));
  if (getMusicError) {
    throw new Error("Music not found");
  }
  if (!needProvider) return { music: music[0] };
  let { data: provider, error: getProviderError } = await supabase
    .from("users")
    .select("*")
    .eq("uid", music[0].createUserId);
  if (getProviderError) {
    throw new Error("Provider not found");
  }
  const d = await fetch(music.cover);
  const img = new Image();
  img.src = d.url;
  return { music: music[0], provider };
}

export async function getComments(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*,users(*)")
    .eq("musicId", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function sendComments({ content, mid, uid }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      { musicId: Number(mid), content: String(content), userId: String(uid) },
    ]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

class AudioControlObject {
  AudioContext;
  AudioSource;
  AudioBuffer;
  AudioAnalyser;
  AudioGainNode;
  AudioFreqData;
  BufferData;

  startTimeStamp;
  pauseTimeStamp;
  totalpause;
  started;
  state;
  songLength;

  constructor(ArrayBuffer) {
    this.AudioBuffer = ArrayBuffer;
    return (async () => {
      await this.init();
      return this;
    })();
  }

  async init() {
    if (!this.AudioContext) {
      this.AudioContext = new window.AudioContext();
    }
    if (!this.BufferData) {
      try {
        this.BufferData = await this.AudioContext.decodeAudioData(
          this.AudioBuffer
        );
      } catch (error) {
        alert(error);
      }
    }
    this.songLength = this.BufferData.duration;
    this.AudioSource = this.AudioContext.createBufferSource();
    this.AudioAnalyser = this.AudioContext.createAnalyser();
    this.AudioGainNode = this.AudioContext.createGain();

    this.AudioSource.buffer = this.BufferData;
    this.AudioSource.connect(this.AudioGainNode);
    this.AudioSource.connect(this.AudioAnalyser);

    this.AudioGainNode.connect(this.AudioContext.destination);

    this.AudioFreqData = [];
    this.AudioSource.loop = true;
    this.started = false;
  }

  reset() {
    this.started = false;
    this.AudioSource.disconnect(this.AudioGainNode);
    this.AudioGainNode.disconnect(this.AudioContext.destination);
    this.AudioSource.disconnect(this.AudioAnalyser);
    this.init();
  }

  stop() {
    this.AudioSource.stop();
    this.reset();
  }

  pause() {
    this.state = "pause";
    this.pauseTimeStamp = this.AudioContext.currentTime;
    this.AudioContext.suspend();
  }

  getprocesstime() {
    let time =
      this.state === "play"
        ? this.AudioContext.currentTime - this.startTimeStamp - this.totalpause
        : this.pauseTimeStamp - this.totalpause - this.startTimeStamp;
    return time % this.songLength;
  }

  volume(deg) {
    if (deg >= 0 && deg <= 1) {
      try {
        this.AudioGainNode.gain.value = deg;
      } catch (err) {
        alert(err);
      }
    }
  }

  songtimeFormat(time) {
    let second = Math.floor(time % 60);
    let min = Math.floor(time / 60);
    second = `${second}`.padStart(2, "0");
    min = `${min}`.padStart(2, "0");
    return `${min}:${second}`;
  }

  getduration() {
    return this.songLength;
  }

  continueplay() {
    this.state = "play";
    this.totalpause += this.AudioContext.currentTime - this.pauseTimeStamp;
    this.AudioContext.resume();
  }

  jump(time, flag) {
    if (!flag) {
      this.AudioSource.start(0);
      this.started = true;
      this.startTimeStamp = this.AudioContext.currentTime;
    } else {
      this.stop();
      this.init();
      this.AudioSource.start(0, Number(time));

      //cur - total - start
      this.totalpause =
        this.AudioContext.currentTime - time - this.startTimeStamp;
    }
    this.state = "play";
  }
}

export async function decodeAudioData(url) {
  const data = await fetch(url);
  const ArrayBuffer = await data.arrayBuffer();
  const AudioObject = await new AudioControlObject(ArrayBuffer);
  return AudioObject;
}
