import { Badge } from "../data/badgeData";
import grandmasterBadge from "../assets/01_badges_grandmaster.png";
import masterBadge from "../assets/02_badges_master.png";
import candidateMasterBadge from "../assets/03_badges_candidate_master.png";
import expertBadge from "../assets/04_badges_expert.png";
import specialistBadge from "../assets/05_badges_specialist.png";
import apprenticeBadge from "../assets/06_badges_apprentice.png";
import pupilBadge from "../assets/07_badges_pupil.png";
import noviceBadge from "../assets/08_badges_novice.png";

export const getBadge = (reputation: number): Badge => {
  if (reputation >= 3500)
    return { title: "Grand Master", image: grandmasterBadge };
  if (reputation >= 2000) return { title: "Master", image: masterBadge };
  if (reputation >= 800)
    return { title: "Candidate Master", image: candidateMasterBadge };
  if (reputation >= 400) return { title: "Expert", image: expertBadge };
  if (reputation >= 100) return { title: "Specialist", image: specialistBadge };
  if (reputation >= 50) return { title: "Apprentice", image: apprenticeBadge };
  if (reputation >= 15) return { title: "Pupil", image: pupilBadge };
  return { title: "Novice", image: noviceBadge };
};
