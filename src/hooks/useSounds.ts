import { sounds } from "../api/sounds.mjs";
import { useState } from "react";

export type Sound = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  file: string;
};

export default function useSounds() {
  const [currentSound, setCurrentSound] = useState<Sound | undefined>();
  const [favoriteSoundSlugs, setFavoriteSoundSlugs] = useState<string[]>([]);
  const [completedSoundSlugs, setCompletedSoundSlugs] = useState<string[]>([]);

  function toggleFavoriteSound(song: { slug: string }) {
    if (favoriteSoundSlugs.includes(song.slug)) {
      setFavoriteSoundSlugs(
        favoriteSoundSlugs.filter((slug) => slug !== song.slug)
      );
    } else {
      setFavoriteSoundSlugs([...favoriteSoundSlugs, song.slug]);
    }
  }

  function toggleCompletedSound(song: { slug: string }) {
    if (completedSoundSlugs.includes(song.slug)) {
      setCompletedSoundSlugs(
        completedSoundSlugs.filter((slug) => slug !== song.slug)
      );
    } else {
      setCompletedSoundSlugs([...completedSoundSlugs, song.slug]);
    }
  }

  return {
    sounds,
    currentSound,
    setCurrentSound,
    toggleFavoriteSound,
    favoriteSoundSlugs,
    completedSoundSlugs,
    toggleCompletedSound,
  };
}
