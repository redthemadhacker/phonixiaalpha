// PHONIXIA ALPHA MMORPG - Master Game Design Specification Viewer
// Exhaustive, interactive technical documentation and blueprint reader

import React, { useState } from 'react';
import { CURRICULUM_MATRIX, REALMS, COMPANION_KAM, COMPANION_CELINE } from '../../services/mockGameData';
import { BookOpen, Search, Shield, Sparkles, Layers, Award, Terminal, Lock, Heart, CheckCircle2 } from 'lucide-react';

export const MasterSpecViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('core_fantasy');

  const sections = [
    { id: 'core_fantasy', label: '1. Core Game Fantasy & Vision', icon: Sparkles },
    { id: 'council', label: '2. Multi-Disciplinary Council', icon: Award },
    { id: 'curriculum', label: '3. PreK-12 & Adult Curriculum Matrix', icon: BookOpen },
    { id: 'phonemes', label: '4. Science of Reading Phoneme Engine', icon: Layers },
    { id: 'realms', label: '5. The Five MMORPG Realms', icon: Layers },
    { id: 'companions', label: '6. Kam & Celine Companion Lore & No-Hint Architecture', icon: Heart },
    { id: 'special_ed', label: '7. Special Ed, IEP, 504, RTI & MTSS Suite', icon: Shield },
    { id: 'montessori', label: '8. Authentic Montessori Integration', icon: Layers },
    { id: 'security', label: '9. Zero-Trust Security, FERPA & COPPA Whitepaper', icon: Lock },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-6xl mx-auto my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpeg"
            alt="PHONIXIA"
            className="h-16 w-auto rounded-xl shadow-lg object-contain"
          />
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Game Design Specifications</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1 font-heading">
              PHONIXIA
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Production architecture for multiplayer literacy game.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search specifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Main Layout: Nav Sidebar + Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-1.5 border-r border-slate-800/80 pr-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full p-3 rounded-xl text-left text-xs font-bold transition flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Viewer */}
        <div className="md:col-span-8 bg-slate-950/70 border border-slate-800 rounded-2xl p-6 overflow-y-auto max-h-[70vh] space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* Section 1: Core Fantasy */}
          {activeSection === 'core_fantasy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                1. Core Game Fantasy: Language as Magic
              </h3>
              <p>
                In the universe of PHONIXIA, language is not an academic chore; <strong>language is primordial magic</strong>. Sounds contain raw vibrational power; words focus and forge that power into spells; stories construct and reshape the physical fabric of reality.
              </p>
              <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-amber-400 font-bold uppercase text-[11px]">The Pillars of Spellcraft:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-200">
                  <li><strong>Reading is Spellcasting:</strong> Translating glyphs into living sound summons physical magical reactions in the environment.</li>
                  <li><strong>Writing is Creation Magic:</strong> Encoding ideas onto parchment crafts new objects, architectural blueprints, and living constructs.</li>
                  <li><strong>Morphology Unlocks Ancient Tombs:</strong> Deconstructing Greek and Latin roots disarms ancient magical seals.</li>
                  <li><strong>Ultimate Honor:</strong> Every adventurer starts as a Novice Soundseeker and strives toward the ultimate game title: <strong>MASTER OF PHONIXIA</strong>.</li>
                </ul>
              </div>
              <p>
                Crucially, there is zero pay-to-win. Character customization (clothing, hairstyles, cloaks, magical auras) is rich and comparable to modern MMOs and Roblox, but strictly cosmetic. Every progression milestone is earned through evidence-based reading mastery.
              </p>
            </div>
          )}

          {/* Section 2: Council */}
          {activeSection === 'council' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                2. Multi-Disciplinary Development Council
              </h3>
              <p>
                The game mechanics were engineered from the ground up by an elite council bridging cognitive science, clinical practice, and game engineering:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {[
                  'Science of Reading Researchers', 'Structured Literacy Specialists', 'Orton-Gillingham Fellows',
                  'Dyslexia & Dysgraphia Clinicians', 'Speech-Language Pathologists (SLP)', 'Montessori AMI/AMS Guides',
                  'Educational Neuroscientists', 'IEP & Section 504 Coordinators', 'MTSS/RTI District Directors',
                  'AAC & Autism Specialists', 'MMORPG Systems & Economy Designers', 'COPPA & FERPA Privacy Architects',
                ].map((role, idx) => (
                  <div key={idx} className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-white font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Curriculum Matrix */}
          {activeSection === 'curriculum' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                3. PreK-12 & Adult Literacy Curriculum Continuum
              </h3>
              <p>
                Every learner begins at an empirically validated diagnostic placement level. A high school or adult learner is never subjected to infantalizing visuals, while a PreK learner receives developmentally aligned acoustic instruction.
              </p>
              <div className="space-y-3">
                {Object.entries(CURRICULUM_MATRIX).map(([grade, data]) => (
                  <div key={grade} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 text-sm">{grade}: {data.title}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Science of Reading</span>
                    </div>
                    <p className="text-slate-300 mt-1"><strong>Focus:</strong> {data.focus}</p>
                    <p className="text-slate-400 mt-0.5 italic"><strong>Neuroscience Basis:</strong> {data.scienceBasis}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Phonemes */}
          {activeSection === 'phonemes' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                4. Mission-Critical Science of Reading Phoneme Audio Architecture
              </h3>
              <p>
                Generic speech synthesis produces severe educational harm in early reading instruction by adding schwa (e.g. pronouncing B as "buhhh" or letter name "bee"). In Phonixia, all phonemes are synthesized with pure acoustic formant precision:
              </p>
              <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-xl space-y-2">
                <div className="text-cyan-300 font-bold">Acoustic Rules Enforced:</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>Short A /æ/:</strong> Pure front vowel as in <em>apple</em>. Never distorted into exaggerated "ahhh".</li>
                  <li><strong>Voiced Stops (/b/, /d/, /g/):</strong> Instantaneous clipped releases without trailing /ə/ schwa.</li>
                  <li><strong>Voiceless Stops (/p/, /t/, /k/):</strong> Pure unvoiced air bursts without vocal cord buzzing.</li>
                  <li><strong>Continuous Consonants (/m/, /s/, /f/, /l/):</strong> Sustained formants and friction noise for smooth blending.</li>
                  <li><strong>Visual Articulation Models:</strong> Anatomical diagrams show teeth, lip aperture, tongue placement, and vocal cord vibration state for SLP and dyslexia support.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Section 5: Realms */}
          {activeSection === 'realms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                5. The Five MMORPG Realms
              </h3>
              <div className="space-y-3">
                {Object.values(REALMS).map((realm) => (
                  <div key={realm.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{realm.name}</span>
                      <span className="text-xs text-amber-400 font-medium">{realm.subtitle}</span>
                    </div>
                    <p className="text-slate-300">{realm.description}</p>
                    <div className="text-[11px] text-slate-400">
                      <strong>Key Zones:</strong> {realm.zones.join(', ')}
                    </div>
                    <div className="text-[11px] text-rose-300">
                      <strong>Realm Boss:</strong> {realm.boss}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: Companions */}
          {activeSection === 'companions' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                6. Kam & Celine Companion Lore & No-Hint Adaptive Support Architecture
              </h3>
              <p>
                <strong>Strict Game Rule:</strong> Phonixia contains NO hint buttons, NO solution displays, and NO answer giveaways. Guesswork destroys orthographic mapping.
              </p>
              <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-amber-400 font-bold">Companion-Led Reinforcement:</div>
                <p>
                  When a learner struggles, companions <strong>Kam</strong> (Echo Scout) or <strong>Celine</strong> (Lexicon Scholar) intervene with targeted acoustic practice games, tactile mouth-position drills, or root investigation missions. The player discovers the phonetic patterns for themselves through guided discovery.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-3 bg-slate-900 rounded-xl border border-teal-500/30">
                  <div className="font-bold text-teal-300 text-sm">{COMPANION_KAM.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{COMPANION_KAM.lore}</div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-purple-500/30">
                  <div className="font-bold text-purple-300 text-sm">{COMPANION_CELINE.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{COMPANION_CELINE.lore}</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Special Ed */}
          {activeSection === 'special_ed' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                7. Special Education, IEP, 504, RTI & MTSS Architecture
              </h3>
              <p>
                Every child, regardless of neurodivergence or disability, shares the exact same persistent MMORPG world. Accommodations are woven into the client engine:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong>IEP Progress Telemetry:</strong> Every quest generates quantifiable assessment probe points logged directly into the student’s IEP tracking record.</li>
                <li><strong>Section 504 Toggles:</strong> OpenDyslexic weighted typeface, color-coded red/blue vowels, extended pacing sliders, and sensory calming modes.</li>
                <li><strong>MTSS/RTI Tiered Groupings:</strong> Automated cohort triaging (Tier 1 core instruction, Tier 2 targeted group support, Tier 3 intensive intervention).</li>
                <li><strong>Integrated AAC Board:</strong> Non-verbal adventurers communicate with parties and companions via high-contrast pictorial speech symbols.</li>
              </ul>
            </div>
          )}

          {/* Section 8: Montessori */}
          {activeSection === 'montessori' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                8. Authentic Montessori Integration
              </h3>
              <p>
                Phonixia unifies the sensorial philosophy of Maria Montessori with modern cognitive Science of Reading:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong>Movable Alphabet:</strong> Classic red vowels and blue consonants allow spontaneous word composition before formal pencil writing.</li>
                <li><strong>Three-Part Nomenclature Cards:</strong> Muted image card, isolated label card, and united Control of Error card enabling self-correction without adult grading anxiety.</li>
                <li><strong>Sandpaper Letter Tracing:</strong> Synchronous visual, tactile, and muscular reinforcement of grapheme-phoneme pairs.</li>
              </ul>
            </div>
          )}

          {/* Section 9: Security */}
          {activeSection === 'security' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-white font-heading">
                9. Zero-Trust Security, FERPA & COPPA Architecture
              </h3>
              <p>
                As a commercial-grade educational MMORPG, data safety and child privacy adhere to strict zero-trust standards:
              </p>
              <div className="p-4 bg-slate-900 border border-emerald-500/30 rounded-xl space-y-2">
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  <li><strong>COPPA Compliance:</strong> No behavioral advertising, zero biometric tracking, parent-gated audio/video recording.</li>
                  <li><strong>FERPA Protection:</strong> Student educational records are partitioned by district/school RBAC roles with end-to-end cryptographic encryption at rest (AES-256) and in transit (TLS 1.3).</li>
                  <li><strong>Chat Moderation:</strong> Real-time linguistic filtering prevents PII leaks, inappropriate content, and bullying across multiplayer zones.</li>
                  <li><strong>Identity Protection:</strong> Defenses against credential stuffing, brute force attacks, bot rings, and unauthorized account transfers.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
