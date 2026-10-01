// PHONIXIA - Core Data Models

export type CharacterGender = 'boy' | 'girl';

export type AccountRole = 'student' | 'parent' | 'teacher' | 'school_admin' | 'district_admin' | 'special_ed';

export type RealmId = 'sound_shallows' | 'builders_guild' | 'tricky_trails' | 'whispering_peaks' | 'lexicon_empire';

export type GradeLevel =
  | 'PreK3'
  | 'PreK4'
  | 'Kindergarten'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8'
  | 'Grade 9-12'
  | 'Adult Literacy';

export type MageRank =
  | 'Novice Soundseeker'
  | 'Rune Apprentice'
  | 'Syllable Smith'
  | 'Decodable Ranger'
  | 'Lexicon Knight'
  | 'Etymology Sorcerer'
  | 'Lore Archmage'
  | 'MASTER OF PHONIXIA';

export interface AvatarCustomization {
  gender: CharacterGender;
  skinTone: string;
  eyeColor: string;
  eyeStyle: 'sharp' | 'curious' | 'starry' | 'determined' | 'gentle';
  hairStyle: 'braids' | 'spikes' | 'pixie' | 'curls' | 'locks' | 'wizard_flow' | 'bob' | 'topknot';
  hairColor: string;
  outfit: 'rookie_robes' | 'explorer_tunic' | 'scribe_vest' | 'rune_cloak' | 'scholar_greatcoat' | 'guardian_mail';
  outfitColor: string;
  cloak: 'none' | 'star_mantle' | 'whisper_cape' | 'golden_grimoire_cloak' | 'forest_wrap';
  backpack: 'none' | 'rune_satchel' | 'bookpack' | 'crystal_quiver' | 'lantern_pack';
  footwear: 'traveler_boots' | 'cloud_sandals' | 'armored_greaves' | 'silent_moccasins';
  accessory: 'none' | 'echo_goggles' | 'quill_earpiece' | 'leaf_circlet' | 'runic_monocle' | 'mage_headband';
  auraEffect: 'none' | 'letter_sparks' | 'star_glyphs' | 'autumn_phonemes' | 'golden_ink' | 'void_ether';
  profileBanner: 'celestial_scroll' | 'verdant_forest' | 'forge_embers' | 'crystal_ocean' | 'obsidian_archives';
  title: string;
}

export interface CompanionProfile {
  id: 'kam' | 'celine';
  name: string;
  title: string;
  personality: string;
  lore: string;
  catchphrase: string;
  specialAbility: string;
  specialAbilityDesc: string;
  bondLevel: number;
  bondXp: number;
  unlockedOutfits: string[];
  currentOutfit: string;
  supportDialogue: {
    greeting: string;
    practiceEncouragement: string;
    struggleSupport: string;
    masteryCelebration: string;
  };
}

export interface PhonemeSound {
  symbol: string; // e.g. "/æ/", "/b/", "/ʃ/"
  name: string; // "Short A", "Consonant B", "Digraph SH"
  category: 'short_vowel' | 'long_vowel' | 'continuous_consonant' | 'stop_consonant' | 'digraph' | 'diphthong' | 'affricate';
  exampleWord: string;
  pureSoundDesc: string;
  isVoiced: boolean; // vocal cords vibrate or whisper
  mouthPosition: {
    lips: 'wide_open' | 'parted' | 'rounded' | 'closed_together' | 'teeth_on_lip';
    teeth: 'apart' | 'close' | 'touching_bottom_lip';
    tongue: 'low_front' | 'tip_on_alveolar_ridge' | 'back_raised' | 'flat' | 'between_teeth';
    airflow: 'continuous' | 'quick_burst' | 'nasal' | 'friction';
  };
  audioFrequency?: number[]; // for Web Audio synthesis
}

export interface RealmInfo {
  id: RealmId;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  bgGradient: string;
  iconName: string;
  keySkills: string[];
  zones: string[];
  loreKeeper: string;
  boss: string;
  ambientSound: string;
}

export interface Quest {
  id: string;
  title: string;
  realm: RealmId;
  curriculumCategory: string;
  description: string;
  xpReward: number;
  runesReward: number;
  completed: boolean;
  minLevel: number;
  challengeType: 'blending' | 'heart_word' | 'morphology' | 'phoneme_hunt' | 'prosody';
  challengeData: any;
}

export interface StudentProgress {
  id: string;
  name: string;
  avatar: AvatarCustomization;
  assignedCompanion: 'kam' | 'celine';
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: MageRank;
  gradeLevel: GradeLevel;
  lexiconRunes: number; // in-game currency earned strictly through literacy
  masteryPoints: number;
  realmMastery: Record<RealmId, number>; // 0 - 100%
  completedQuests: string[];
  spellsUnlocked: string[];
  activePets: string[];
  screenTimeMinutesToday: number;
  maxScreenTimeMinutes: number;
  accessibilitySettings: {
    dyslexiaFont: boolean;
    highContrast: boolean;
    speechRate: number;
    visualMouthModel: boolean;
    reducedMotion: boolean;
    screenReaderOptimized: boolean;
    audioDescriptions: boolean;
    tactileVowelColoring: boolean;
  };
}

export interface IEPGoal {
  id: string;
  studentName: string;
  baseline: string;
  targetGoal: string;
  domain: 'Phonemic Awareness' | 'Decoding' | 'Fluency' | 'Comprehension' | 'Encoding/Spelling' | 'Morphology';
  targetDate: string;
  currentProgressPct: number;
  status: 'on_track' | 'needs_attention' | 'mastered' | 'emerging';
  accommodationsApplied: string[];
  evidenceDataPoints: { date: string; scorePct: number; assessmentType: string }[];
}

export interface RTIStudentTier {
  id: string;
  name: string;
  grade: GradeLevel;
  tier: 1 | 2 | 3;
  focusArea: string;
  interventionMinutesWeekly: number;
  progressMonitoringTrend: 'accelerating' | 'stable' | 'plateau' | 'regressing';
  lastAssessmentScore: number;
  recommendedPractice: string;
}
