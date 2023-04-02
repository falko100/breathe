import { IonIcon, useIonViewWillLeave } from "@ionic/react";

import { MediaSession } from "@jofr/capacitor-media-session";

import {
  alarmOutline,
  arrowBack,
  arrowForward,
  heart,
  heartOutline,
  moon,
  moonOutline,
  pause,
  play,
  playBackOutline,
  playForwardOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useSounds, { Sound } from "../hooks/useSounds";

interface ContainerProps {
  sound: Sound;
}

const ExploreContainer: React.FC<ContainerProps> = ({
  sound,
}: ContainerProps) => {
  const [audioPlayer] = useState<HTMLAudioElement>(new Audio(sound.file));
  const [playing, setPlaying] = useState(false);
  const [sleeptimer, setSleeptimer] = useState<NodeJS.Timeout>();
  const [sleepTimerEndtime, setSleepTimerEndtime] = useState<Date>();
  const [time, setTime] = useState<number>();
  const { setCurrentSound, toggleFavoriteSound, favoriteSoundSlugs } =
    useSounds();

  const pressPlay = () => {
    if (!audioPlayer) {
      alert("audioPlayer not ready");
    }

    if (playing) {
      audioPlayer?.pause();
      setPlaying(false);
      setCurrentSound(undefined);
    } else {
      setCurrentSound(sound);
      audioPlayer?.play().then(() => {
        setPlaying(true);

        MediaSession.setMetadata({
          title: sound.name,
          artist: "Breathe",
          album: sound.description,
          artwork: [
            {
              src: sound.image,
              sizes: "512x512",
              type: "image/png",
            },
          ],
        });

        MediaSession.setActionHandler({ action: "play" }, () => {
          audioPlayer.play();
          MediaSession.setPlaybackState({ playbackState: "playing" });
        });

        MediaSession.setActionHandler({ action: "pause" }, () => {
          audioPlayer.pause();
          MediaSession.setPlaybackState({ playbackState: "paused" });
        });

        MediaSession.setActionHandler({ action: "stop" }, () => {
          audioPlayer.pause();
          MediaSession.setPlaybackState({ playbackState: "paused" });
          audioPlayer.currentTime = 0;
        });

        MediaSession.setPlaybackState({ playbackState: "playing" });
      });
    }
  };

  const setPlayingSound = () => {
    MediaSession.setPlaybackState({ playbackState: "playing" });
    setPlaying(true);
    setCurrentSound(sound);
  };

  const unsetPlaying = () => {
    MediaSession.setPlaybackState({ playbackState: "paused" });
    setPlaying(false);
    setCurrentSound(undefined);
  };

  const updateMediaSessionPosition = () => {
    MediaSession.setPositionState({
      duration: audioPlayer.duration,
      position: audioPlayer.currentTime,
    });
  };

  useEffect(() => {
    if (audioPlayer) {
      if (!audioPlayer.paused) {
        audioPlayer.pause();
      }

      audioPlayer.src = sound.file;
      audioPlayer.load();

      audioPlayer.addEventListener("ended", unsetPlaying);
      audioPlayer.addEventListener("pause", unsetPlaying);
      audioPlayer.addEventListener("play", setPlayingSound);
      audioPlayer.addEventListener("timeupdate", updateMediaSessionPosition);
    }

    return () => {
      audioPlayer.removeEventListener("ended", unsetPlaying);
      audioPlayer.removeEventListener("pause", unsetPlaying);
      audioPlayer.removeEventListener("play", setPlayingSound);
      audioPlayer.removeEventListener("timeupdate", updateMediaSessionPosition);
    };
  }, [sound]);

  useIonViewWillLeave(() => {
    audioPlayer?.pause();
    clearInterval(interval);
  });

  let interval: NodeJS.Timeout;

  function stopSleepTimer() {
    clearTimeout(sleeptimer);
    clearInterval(interval);
    setSleeptimer(undefined);
    setSleepTimerEndtime(undefined);
  }

  function startSleepTimer() {
    const timeoutDuration = 15 * 60 * 1000;
    const sleepTimerRef = setTimeout(() => {
      audioPlayer?.pause();
      setPlaying(false);
      setCurrentSound(undefined);
      stopSleepTimer();
    }, timeoutDuration);

    setSleepTimerEndtime(new Date(Date.now() + timeoutDuration));
    interval = setInterval(() => setTime(Date.now()), 1000);
    setSleeptimer(sleepTimerRef);
  }

  return (
    <div className="px-8 flex flex-col h-full">
      <div className="flex justify-between">
        <Link
          to="/"
          className="h-8 w-8 flex items-center justify-center text-2xl"
        >
          <IonIcon icon={arrowBack}></IonIcon>
        </Link>
        <div className="font-bold text-center text-2xl">{sound.name}</div>
        <div className="w-8"></div>
      </div>
      <figure className="my-8">
        <img
          loading="lazy"
          src={sound.image}
          className="object-cover object-center aspect-1 aspect-1 w-full rounded-3xl shadow-lg"
          alt=""
        />
      </figure>
      <div className="w-full">
        <p className="text-center text-sm text-gray-500">{sound.description}</p>
      </div>

      {sleeptimer && sleepTimerEndtime && time && (
        <p className="text-center text-sm text-gray-500 mt-5">
          Sleeping in{" "}
          {Math.floor((sleepTimerEndtime.getTime() - time) / 1000 / 60)} minutes
          and{" "}
          {Math.floor(
            (sleepTimerEndtime.getTime() - time) / 1000 -
              Math.floor((sleepTimerEndtime.getTime() - time) / 1000 / 60) * 60
          )}{" "}
          seconds
        </p>
      )}

      <div className="toolbar my-auto flex justify-around items-center py-10">
        <div
          className={
            "toolbar-button transition duration-300 w-10 h-10 rounded-full flex items-center justify-center text-2xl " +
            (favoriteSoundSlugs.includes(sound.slug)
              ? "text-red-500"
              : "text-slate-800")
          }
          onClick={() => toggleFavoriteSound(sound)}
        >
          <IonIcon
            icon={
              favoriteSoundSlugs.includes(sound.slug) ? heart : heartOutline
            }
          ></IonIcon>
        </div>

        {false && (
          <div className="toolbar-button transition duration-300 w-10 h-10 rounded-full flex items-center justify-center text-2xl text-slate-800">
            <IonIcon icon={playBackOutline}></IonIcon>
          </div>
        )}

        <div
          className="toolbar-button transition duration-300 w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white bg-slate-800"
          onClick={pressPlay}
        >
          <IonIcon icon={playing ? pause : play}></IonIcon>
        </div>

        {false && (
          <div className="toolbar-button transition duration-300 w-10 h-10 rounded-full flex items-center justify-center text-2xl text-slate-800">
            <IonIcon icon={playForwardOutline}></IonIcon>
          </div>
        )}

        <div
          className={`toolbar-button transition duration-300 w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
            sleeptimer ? "text-lime-500" : "text-slate-800"
          }`}
          onClick={() => (!sleeptimer ? startSleepTimer() : stopSleepTimer())}
        >
          <IonIcon icon={sleeptimer ? moon : moonOutline}></IonIcon>
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
