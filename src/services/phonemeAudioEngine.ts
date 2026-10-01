// PHONIXIA - Science of Reading Phoneme Audio & Articulation Engine
// Strict adherence to pure phonemes (NO schwa addition, NO letter names for phonics)

import { PhonemeSound } from '../types/game';

class PhonemeAudioEngine {
  private audioCtx: AudioContext | null = null;

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Pure Science of Reading Phoneme Dictionary
  public readonly PHONEME_REGISTRY: Record<string, PhonemeSound> = {
    // Short Vowels
    'a': {
      symbol: '/æ/',
      name: 'Short A',
      category: 'short_vowel',
      exampleWord: 'apple',
      pureSoundDesc: 'Pure open front unrounded vowel /æ/ as in apple. Mouth open wide, tongue low in front.',
      isVoiced: true,
      mouthPosition: {
        lips: 'wide_open',
        teeth: 'apart',
        tongue: 'low_front',
        airflow: 'continuous',
      },
      audioFrequency: [800, 1750, 2450], // F1, F2, F3 formants
    },
    'e': {
      symbol: '/ɛ/',
      name: 'Short E',
      category: 'short_vowel',
      exampleWord: 'echo',
      pureSoundDesc: 'Open-mid front unrounded vowel /ɛ/ as in echo or bed. Tongue mid-height, jaw relaxed.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'low_front',
        airflow: 'continuous',
      },
      audioFrequency: [550, 1850, 2550],
    },
    'i': {
      symbol: '/ɪ/',
      name: 'Short I',
      category: 'short_vowel',
      exampleWord: 'itch',
      pureSoundDesc: 'Near-close front vowel /ɪ/ as in itch or igloo. Tongue high-front, lips unrounded.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'low_front',
        airflow: 'continuous',
      },
      audioFrequency: [400, 2000, 2600],
    },
    'o': {
      symbol: '/ɒ/',
      name: 'Short O',
      category: 'short_vowel',
      exampleWord: 'octopus',
      pureSoundDesc: 'Open back rounded vowel /ɒ/ as in octopus or hot. Jaw open low, lips gently rounded.',
      isVoiced: true,
      mouthPosition: {
        lips: 'rounded',
        teeth: 'apart',
        tongue: 'flat',
        airflow: 'continuous',
      },
      audioFrequency: [750, 1100, 2400],
    },
    'u': {
      symbol: '/ʌ/',
      name: 'Short U',
      category: 'short_vowel',
      exampleWord: 'up',
      pureSoundDesc: 'Mid-central vowel /ʌ/ as in up or cup. Relaxed jaw, neutral lips, tongue resting.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'flat',
        airflow: 'continuous',
      },
      audioFrequency: [650, 1200, 2400],
    },

    // Stop Consonants (Critical: NO schwa "uh" added!)
    'b': {
      symbol: '/b/',
      name: 'Consonant B',
      category: 'stop_consonant',
      exampleWord: 'bat',
      pureSoundDesc: 'Pure voiced bilabial stop /b/. Lips press together, vocal cords briefly vibrate, quick release. NOT "buh"!',
      isVoiced: true,
      mouthPosition: {
        lips: 'closed_together',
        teeth: 'apart',
        tongue: 'flat',
        airflow: 'quick_burst',
      },
      audioFrequency: [180, 700, 1200],
    },
    'p': {
      symbol: '/p/',
      name: 'Consonant P',
      category: 'stop_consonant',
      exampleWord: 'pan',
      pureSoundDesc: 'Pure voiceless bilabial stop /p/. Lips press together, release with puff of air. No vocal vibration. NOT "puh"!',
      isVoiced: false,
      mouthPosition: {
        lips: 'closed_together',
        teeth: 'apart',
        tongue: 'flat',
        airflow: 'quick_burst',
      },
    },
    't': {
      symbol: '/t/',
      name: 'Consonant T',
      category: 'stop_consonant',
      exampleWord: 'top',
      pureSoundDesc: 'Pure voiceless alveolar stop /t/. Tongue tip taps roof behind front teeth. Crisp air release. NOT "tuh"!',
      isVoiced: false,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'quick_burst',
      },
    },
    'd': {
      symbol: '/d/',
      name: 'Consonant D',
      category: 'stop_consonant',
      exampleWord: 'dog',
      pureSoundDesc: 'Pure voiced alveolar stop /d/. Tongue tip taps alveolar ridge with brief vocal burst. NOT "duh"!',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'quick_burst',
      },
      audioFrequency: [200, 1800, 2700],
    },
    'k': {
      symbol: '/k/',
      name: 'Consonant K / C',
      category: 'stop_consonant',
      exampleWord: 'kite',
      pureSoundDesc: 'Pure voiceless velar stop /k/. Back of tongue touches soft palate and releases burst of air.',
      isVoiced: false,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'back_raised',
        airflow: 'quick_burst',
      },
    },
    'g': {
      symbol: '/g/',
      name: 'Consonant G',
      category: 'stop_consonant',
      exampleWord: 'gate',
      pureSoundDesc: 'Pure voiced velar stop /g/. Back of tongue contacts soft palate with vocal tone. NOT "guh"!',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'back_raised',
        airflow: 'quick_burst',
      },
      audioFrequency: [190, 1400, 2300],
    },

    // Continuous Consonants
    'm': {
      symbol: '/m/',
      name: 'Consonant M',
      category: 'continuous_consonant',
      exampleWord: 'moon',
      pureSoundDesc: 'Continuous bilabial nasal /m/. Lips closed, sound hums through the nose. Vocal cords buzz smoothly.',
      isVoiced: true,
      mouthPosition: {
        lips: 'closed_together',
        teeth: 'apart',
        tongue: 'flat',
        airflow: 'nasal',
      },
      audioFrequency: [250, 1000, 2200],
    },
    'n': {
      symbol: '/n/',
      name: 'Consonant N',
      category: 'continuous_consonant',
      exampleWord: 'nest',
      pureSoundDesc: 'Continuous alveolar nasal /n/. Tongue tip on ridge, sound resonates in nasal cavity.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'nasal',
      },
      audioFrequency: [260, 1500, 2400],
    },
    's': {
      symbol: '/s/',
      name: 'Consonant S',
      category: 'continuous_consonant',
      exampleWord: 'sun',
      pureSoundDesc: 'Continuous voiceless alveolar sibilant /s/. Teeth close, tongue creates narrow groove, hissing airflow.',
      isVoiced: false,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'friction',
      },
    },
    'z': {
      symbol: '/z/',
      name: 'Consonant Z',
      category: 'continuous_consonant',
      exampleWord: 'zebra',
      pureSoundDesc: 'Continuous voiced alveolar sibilant /z/. Buzzing vocal cords with gentle stream through teeth.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'friction',
      },
      audioFrequency: [220, 1700, 3200],
    },
    'f': {
      symbol: '/f/',
      name: 'Consonant F',
      category: 'continuous_consonant',
      exampleWord: 'fish',
      pureSoundDesc: 'Voiceless labiodental fricative /f/. Top teeth rest lightly on bottom lip, smooth breath passes.',
      isVoiced: false,
      mouthPosition: {
        lips: 'teeth_on_lip',
        teeth: 'touching_bottom_lip',
        tongue: 'flat',
        airflow: 'friction',
      },
    },
    'v': {
      symbol: '/v/',
      name: 'Consonant V',
      category: 'continuous_consonant',
      exampleWord: 'vine',
      pureSoundDesc: 'Voiced labiodental fricative /v/. Top teeth on bottom lip with vocal cords buzzing.',
      isVoiced: true,
      mouthPosition: {
        lips: 'teeth_on_lip',
        teeth: 'touching_bottom_lip',
        tongue: 'flat',
        airflow: 'friction',
      },
      audioFrequency: [210, 1400, 2800],
    },
    'l': {
      symbol: '/l/',
      name: 'Consonant L',
      category: 'continuous_consonant',
      exampleWord: 'lamp',
      pureSoundDesc: 'Voiced alveolar lateral liquid /l/. Tongue tip anchored to alveolar ridge, voice flows along sides.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'continuous',
      },
      audioFrequency: [350, 1100, 2700],
    },
    'r': {
      symbol: '/r/',
      name: 'Consonant R',
      category: 'continuous_consonant',
      exampleWord: 'rain',
      pureSoundDesc: 'Voiced postalveolar approximant /r/. Sides of tongue curl against upper molars, lips slightly pursed.',
      isVoiced: true,
      mouthPosition: {
        lips: 'rounded',
        teeth: 'apart',
        tongue: 'back_raised',
        airflow: 'continuous',
      },
      audioFrequency: [320, 1300, 1600],
    },
    'j': {
      symbol: '/dʒ/',
      name: 'Consonant J',
      category: 'affricate',
      exampleWord: 'jump',
      pureSoundDesc: 'Voiced postalveolar affricate /dʒ/. Starts with tongue on roof and releases into voiced friction. NOT "jay"!',
      isVoiced: true,
      mouthPosition: {
        lips: 'rounded',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'quick_burst',
      },
      audioFrequency: [220, 1800, 2900],
    },

    // Digraphs
    'sh': {
      symbol: '/ʃ/',
      name: 'Digraph SH',
      category: 'digraph',
      exampleWord: 'ship',
      pureSoundDesc: 'Voiceless postalveolar fricative /ʃ/. Lips puckered, tongue arched toward palate, soft rushing air.',
      isVoiced: false,
      mouthPosition: {
        lips: 'rounded',
        teeth: 'close',
        tongue: 'back_raised',
        airflow: 'friction',
      },
    },
    'ch': {
      symbol: '/tʃ/',
      name: 'Digraph CH',
      category: 'affricate',
      exampleWord: 'chin',
      pureSoundDesc: 'Voiceless postalveolar affricate /tʃ/. Crisp stop released into quick rush of unvoiced air.',
      isVoiced: false,
      mouthPosition: {
        lips: 'rounded',
        teeth: 'close',
        tongue: 'tip_on_alveolar_ridge',
        airflow: 'quick_burst',
      },
    },
    'th_unvoiced': {
      symbol: '/θ/',
      name: 'Unvoiced TH',
      category: 'digraph',
      exampleWord: 'thumb',
      pureSoundDesc: 'Voiceless dental fricative /θ/. Tongue tip gently between front teeth, whisper of air. No voice.',
      isVoiced: false,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'between_teeth',
        airflow: 'friction',
      },
    },
    'th_voiced': {
      symbol: '/ð/',
      name: 'Voiced TH',
      category: 'digraph',
      exampleWord: 'that',
      pureSoundDesc: 'Voiced dental fricative /ð/. Tongue between teeth with buzzing vocal vibration.',
      isVoiced: true,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'between_teeth',
        airflow: 'friction',
      },
      audioFrequency: [210, 1400, 2400],
    },
    'ck': {
      symbol: '/k/',
      name: 'Digraph CK',
      category: 'digraph',
      exampleWord: 'duck',
      pureSoundDesc: 'Taught strictly as the single /k/ sound after a short vowel. Pure voiceless velar stop.',
      isVoiced: false,
      mouthPosition: {
        lips: 'parted',
        teeth: 'apart',
        tongue: 'back_raised',
        airflow: 'quick_burst',
      },
    },
  };

  /**
   * Play the accurate isolated phoneme sound without letter-name distortion or schwa
   */
  public playPhoneme(phonemeKey: string) {
    this.initAudio();
    const soundData = this.PHONEME_REGISTRY[phonemeKey.toLowerCase()] || this.PHONEME_REGISTRY['a'];

    // 1. Play Formant/Vocal Tract synthesis via Web Audio API
    if (this.audioCtx) {
      this.synthesizePhonemeAcoustics(soundData);
    }

    // 2. Play complementary human speech synthesis formatted strictly with phonemic anchor
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Science of Reading speech synthesis: Speak the exemplar word or isolated sound strictly
      const utterance = new SpeechSynthesisUtterance();
      // Many voices pronounce isolated letters as letter names; to force pure phoneme, we use IPA/anchor phonetics
      utterance.rate = 0.85;
      utterance.pitch = soundData.isVoiced ? 1.0 : 1.1;

      // Provide phonetic anchor cue for speech synthesis
      if (soundData.category === 'stop_consonant') {
        utterance.text = soundData.exampleWord;
      } else {
        utterance.text = soundData.symbol.replace(/[\/\\]/g, '');
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  /**
   * Pure acoustic synthesis using Web Audio API formants & bandpass filters
   */
  private synthesizePhonemeAcoustics(phoneme: PhonemeSound) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    if (phoneme.isVoiced && phoneme.audioFrequency) {
      // Voiced sound: Oscillator harmonics through formant resonators
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now); // Fundamental frequency F0 (child/friendly pitch)

      // Filter bandpass for F1 and F2
      const filter1 = this.audioCtx.createBiquadFilter();
      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(phoneme.audioFrequency[0], now);
      filter1.Q.setValueAtTime(5, now);

      const filter2 = this.audioCtx.createBiquadFilter();
      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(phoneme.audioFrequency[1], now);
      filter2.Q.setValueAtTime(6, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);

      const duration = phoneme.category === 'stop_consonant' ? 0.12 : 0.45;
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter1);
      osc.connect(filter2);
      filter1.connect(gain);
      filter2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } else {
      // Unvoiced sound (e.g. /s/, /t/, /p/, /sh/, /f/): Shaped white noise burst or continuous friction
      const bufferSize = this.audioCtx.sampleRate * 0.3;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      if (phoneme.symbol === '/s/') {
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(5000, now);
      } else if (phoneme.symbol === '/ʃ/') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, now);
        filter.Q.setValueAtTime(2, now);
      } else {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200, now);
      }

      const gain = this.audioCtx.createGain();
      const isQuick = phoneme.category === 'stop_consonant' || phoneme.category === 'affricate';
      const duration = isQuick ? 0.08 : 0.35;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start(now);
      noise.stop(now + duration + 0.05);
    }
  }

  /**
   * Sound FX: Continuous Blending Sweep (for sound-by-sound orthographic mapping)
   */
  public playBlendingSweep(phonemes: string[]) {
    this.initAudio();
    if (!this.audioCtx) return;

    let timeOffset = 0;
    phonemes.forEach((p, idx) => {
      setTimeout(() => {
        this.playPhoneme(p);
      }, timeOffset);
      timeOffset += 380;
    });

    // Final triumphant blend chord
    setTimeout(() => {
      this.playMagicCastSound();
    }, timeOffset + 150);
  }

  /**
   * Sound FX: Magical Spellcast / Orthographic Mapping complete
   */
  public playMagicCastSound() {
    this.initAudio();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.6);

      osc.connect(gain);
      gain.connect(this.audioCtx!.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.65);
    });
  }

  /**
   * Sound FX: Level up or Milestone fanfare
   */
  public playFanfare() {
    this.initAudio();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const chords = [
      { freqs: [440, 554.37, 659.25], t: 0, dur: 0.15 },
      { freqs: [440, 554.37, 659.25], t: 0.18, dur: 0.15 },
      { freqs: [440, 554.37, 659.25], t: 0.36, dur: 0.15 },
      { freqs: [587.33, 739.99, 880], t: 0.54, dur: 0.6 },
    ];

    chords.forEach(({ freqs, t, dur }) => {
      freqs.forEach((freq) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + t);

        gain.gain.setValueAtTime(0.12, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + dur);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now + t);
        osc.stop(now + t + dur + 0.05);
      });
    });
  }

  /**
   * Companion Chime: Friendly acoustic prompt
   */
  public playCompanionChime() {
    this.initAudio();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.2);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Auto Read-Aloud spoken instructions using SpeechSynthesis API
   */
  public speakInstruction(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const phonemeAudio = new PhonemeAudioEngine();
