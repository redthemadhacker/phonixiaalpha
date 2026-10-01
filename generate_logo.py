#!/usr/bin/env python3
import subprocess
import os

# Create an SVG representation matching the user's uploaded logo design
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480" width="600" height="480">
  <defs>
    <!-- Two-tone gradient for the PHONIXIA text -->
    <linearGradient id="textGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffb347" />
      <stop offset="48%" stop-color="#ff7b25" />
      <stop offset="52%" stop-color="#cf3b1b" />
      <stop offset="100%" stop-color="#8b1e0f" />
    </linearGradient>

    <!-- Warm fire glow -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Dark charcoal / slate obsidian background -->
  <rect width="600" height="480" fill="#141724" />

  <!-- Inner Portal Archway Backdrop (Darker warm pit) -->
  <rect x="130" y="55" width="340" height="300" fill="#0d0f17" rx="4" />

  <!-- Background Fire Embers / Flickering Flames inside portal -->
  <!-- Upper Left Embers -->
  <rect x="180" y="80" width="16" height="24" fill="#ea580c" />
  <rect x="184" y="74" width="8" height="18" fill="#f59e0b" />
  <rect x="186" y="70" width="4" height="10" fill="#fef08a" />
  <rect x="210" y="105" width="10" height="16" fill="#ea580c" />
  <rect x="212" y="100" width="6" height="12" fill="#f59e0b" />

  <!-- Upper Right Embers -->
  <rect x="385" y="115" width="18" height="26" fill="#ea580c" />
  <rect x="389" y="110" width="10" height="20" fill="#f59e0b" />
  <rect x="392" y="106" width="4" height="12" fill="#fef08a" />
  <rect x="355" y="85" width="12" height="18" fill="#ea580c" />
  <rect x="357" y="80" width="8" height="14" fill="#f59e0b" />

  <!-- Lower Embers rising from floor -->
  <rect x="145" y="290" width="22" height="45" fill="#c2410c" />
  <rect x="149" y="280" width="14" height="35" fill="#f97316" />
  <rect x="152" y="275" width="8" height="20" fill="#fef08a" />

  <rect x="185" y="315" width="35" height="30" fill="#c2410c" />
  <rect x="190" y="305" width="25" height="25" fill="#f97316" />
  <rect x="195" y="300" width="15" height="15" fill="#fde047" />

  <rect x="390" y="300" width="32" height="40" fill="#c2410c" />
  <rect x="395" y="290" width="22" height="32" fill="#f97316" />
  <rect x="400" y="285" width="12" height="20" fill="#fde047" />

  <rect x="430" y="305" width="20" height="35" fill="#c2410c" />
  <rect x="434" y="295" width="12" height="25" fill="#f97316" />
  <rect x="437" y="290" width="6" height="15" fill="#fef08a" />

  <!-- STONE PORTAL FRAME -->
  <!-- Top Center Lintel (Stone Bricks) -->
  <g id="topLintel">
    <rect x="165" y="55" width="270" height="42" fill="#4b5563" />
    <!-- Brick lines & textures -->
    <rect x="165" y="55" width="65" height="20" fill="#6b7280" />
    <rect x="235" y="55" width="130" height="20" fill="#4b5563" />
    <rect x="370" y="55" width="65" height="20" fill="#6b7280" />
    <rect x="165" y="77" width="105" height="20" fill="#374151" />
    <rect x="275" y="77" width="90" height="20" fill="#6b7280" />
    <rect x="370" y="77" width="65" height="20" fill="#4b5563" />
    <!-- Mortar lines -->
    <rect x="165" y="75" width="270" height="3" fill="#1f2937" />
    <rect x="232" y="55" width="3" height="20" fill="#1f2937" />
    <rect x="367" y="55" width="3" height="20" fill="#1f2937" />
    <rect x="272" y="77" width="3" height="20" fill="#1f2937" />
    <!-- Highlights -->
    <rect x="165" y="55" width="270" height="3" fill="#9ca3af" />
  </g>

  <!-- Top-Left Carved Spiral Stone Block -->
  <g id="cornerLeft">
    <rect x="90" y="55" width="75" height="75" fill="#855239" />
    <!-- Outer border highlight -->
    <rect x="90" y="55" width="75" height="4" fill="#a76848" />
    <rect x="90" y="55" width="4" height="75" fill="#a76848" />
    <!-- Dark carved outline -->
    <rect x="94" y="126" width="71" height="4" fill="#4a2618" />
    <rect x="161" y="59" width="4" height="71" fill="#4a2618" />
    <!-- Carved Aztec/Mayan Spiral Rune -->
    <path d="M 104 69 L 151 69 L 151 116 L 116 116 L 116 83 L 139 83 L 139 102 L 128 102"
          fill="none" stroke="#4a2618" stroke-width="6" stroke-linecap="square" />
    <path d="M 104 69 L 151 69 L 151 116 L 116 116 L 116 83 L 139 83 L 139 102 L 128 102"
          fill="none" stroke="#2d130a" stroke-width="2" stroke-linecap="square" />
  </g>

  <!-- Top-Right Carved Spiral Stone Block -->
  <g id="cornerRight">
    <rect x="435" y="55" width="75" height="75" fill="#855239" />
    <!-- Outer border highlight -->
    <rect x="435" y="55" width="75" height="4" fill="#a76848" />
    <rect x="435" y="55" width="4" height="75" fill="#a76848" />
    <!-- Dark carved outline -->
    <rect x="439" y="126" width="71" height="4" fill="#4a2618" />
    <rect x="506" y="59" width="4" height="71" fill="#4a2618" />
    <!-- Carved Aztec/Mayan Spiral Rune (Mirrored) -->
    <path d="M 496 69 L 449 69 L 449 116 L 484 116 L 484 83 L 461 83 L 461 102 L 472 102"
          fill="none" stroke="#4a2618" stroke-width="6" stroke-linecap="square" />
    <path d="M 496 69 L 449 69 L 449 116 L 484 116 L 484 83 L 461 83 L 461 102 L 472 102"
          fill="none" stroke="#2d130a" stroke-width="2" stroke-linecap="square" />
  </g>

  <!-- Left Stone Pillar -->
  <g id="pillarLeft">
    <!-- Block 1 -->
    <rect x="95" y="133" width="45" height="70" fill="#6b7280" />
    <rect x="95" y="133" width="4" height="70" fill="#9ca3af" />
    <rect x="95" y="133" width="45" height="4" fill="#9ca3af" />
    <rect x="136" y="133" width="4" height="70" fill="#374151" />
    <rect x="95" y="200" width="45" height="3" fill="#1f2937" />
    <!-- Block 2 -->
    <rect x="95" y="205" width="45" height="75" fill="#4b5563" />
    <rect x="95" y="205" width="4" height="75" fill="#9ca3af" />
    <rect x="136" y="205" width="4" height="75" fill="#374151" />
    <rect x="95" y="277" width="45" height="3" fill="#1f2937" />
    <!-- Block 3 -->
    <rect x="95" y="282" width="45" height="70" fill="#6b7280" />
    <rect x="95" y="282" width="4" height="70" fill="#9ca3af" />
    <rect x="136" y="282" width="4" height="70" fill="#374151" />
  </g>

  <!-- Right Stone Pillar -->
  <g id="pillarRight">
    <!-- Block 1 -->
    <rect x="460" y="133" width="45" height="70" fill="#6b7280" />
    <rect x="460" y="133" width="4" height="70" fill="#9ca3af" />
    <rect x="460" y="133" width="45" height="4" fill="#9ca3af" />
    <rect x="501" y="133" width="4" height="70" fill="#374151" />
    <rect x="460" y="200" width="45" height="3" fill="#1f2937" />
    <!-- Block 2 -->
    <rect x="460" y="205" width="45" height="75" fill="#4b5563" />
    <rect x="460" y="205" width="4" height="75" fill="#9ca3af" />
    <rect x="501" y="205" width="4" height="75" fill="#374151" />
    <rect x="460" y="277" width="45" height="3" fill="#1f2937" />
    <!-- Block 3 -->
    <rect x="460" y="282" width="45" height="70" fill="#6b7280" />
    <rect x="460" y="282" width="4" height="70" fill="#9ca3af" />
    <rect x="501" y="282" width="4" height="70" fill="#374151" />
  </g>

  <!-- PHOENIX BIRD (ADORABLE PIXEL ART MASCOT) -->
  <!-- Left Wing (Layered pixel feather stairs) -->
  <g id="leftWing">
    <!-- Back dark feather shade -->
    <path d="M 235 220 L 140 135 L 140 185 L 160 215 L 180 245 L 210 270 L 235 270 Z" fill="#991b1b" />
    <!-- Mid fiery orange feathers -->
    <path d="M 235 210 L 148 138 L 155 185 L 175 225 L 195 255 L 230 275 Z" fill="#c2410c" />
    <!-- Outer primary wing tier 1 -->
    <rect x="142" y="135" width="16" height="35" fill="#f97316" />
    <rect x="158" y="155" width="16" height="40" fill="#f97316" />
    <rect x="174" y="180" width="16" height="45" fill="#f97316" />
    <rect x="190" y="210" width="16" height="45" fill="#f97316" />
    <rect x="206" y="235" width="16" height="40" fill="#f97316" />
    <!-- Bright golden highlight feather tops -->
    <rect x="142" y="135" width="16" height="8" fill="#fde047" />
    <rect x="158" y="155" width="16" height="8" fill="#fde047" />
    <rect x="174" y="180" width="16" height="8" fill="#fde047" />
    <rect x="190" y="210" width="16" height="8" fill="#fde047" />
    <rect x="150" y="145" width="8" height="20" fill="#fbbf24" />
    <rect x="166" y="165" width="8" height="25" fill="#fbbf24" />
    <rect x="182" y="190" width="8" height="25" fill="#fbbf24" />
    <rect x="198" y="220" width="8" height="25" fill="#fbbf24" />
    <!-- Dark feather separation notches -->
    <rect x="154" y="170" width="4" height="25" fill="#7c2d12" />
    <rect x="170" y="195" width="4" height="30" fill="#7c2d12" />
    <rect x="186" y="225" width="4" height="30" fill="#7c2d12" />
  </g>

  <!-- Right Wing (Mirrored layered pixel feather stairs) -->
  <g id="rightWing">
    <!-- Back dark feather shade -->
    <path d="M 365 220 L 460 135 L 460 185 L 440 215 L 420 245 L 390 270 L 365 270 Z" fill="#991b1b" />
    <!-- Mid fiery orange feathers -->
    <path d="M 365 210 L 452 138 L 445 185 L 425 225 L 405 255 L 370 275 Z" fill="#c2410c" />
    <!-- Outer primary wing tier 1 -->
    <rect x="442" y="135" width="16" height="35" fill="#f97316" />
    <rect x="426" y="155" width="16" height="40" fill="#f97316" />
    <rect x="410" y="180" width="16" height="45" fill="#f97316" />
    <rect x="394" y="210" width="16" height="45" fill="#f97316" />
    <rect x="378" y="235" width="16" height="40" fill="#f97316" />
    <!-- Bright golden highlight feather tops -->
    <rect x="442" y="135" width="16" height="8" fill="#fde047" />
    <rect x="426" y="155" width="16" height="8" fill="#fde047" />
    <rect x="410" y="180" width="16" height="8" fill="#fde047" />
    <rect x="394" y="210" width="16" height="8" fill="#fde047" />
    <rect x="442" y="145" width="8" height="20" fill="#fbbf24" />
    <rect x="426" y="165" width="8" height="25" fill="#fbbf24" />
    <rect x="410" y="190" width="8" height="25" fill="#fbbf24" />
    <rect x="394" y="220" width="8" height="25" fill="#fbbf24" />
    <!-- Dark feather separation notches -->
    <rect x="442" y="170" width="4" height="25" fill="#7c2d12" />
    <rect x="426" y="195" width="4" height="30" fill="#7c2d12" />
    <rect x="410" y="225" width="4" height="30" fill="#7c2d12" />
  </g>

  <!-- Phoenix Body & Head -->
  <g id="phoenixBody">
    <!-- Body base silhouette -->
    <rect x="250" y="235" width="100" height="95" rx="14" fill="#c2410c" />
    <rect x="255" y="240" width="90" height="85" rx="10" fill="#ea580c" />
    <!-- Fiery Belly Feathers (Gradient/layered chevron steps) -->
    <rect x="265" y="255" width="70" height="60" rx="8" fill="#f97316" />
    <rect x="275" y="270" width="50" height="40" rx="6" fill="#fb923c" />
    <rect x="285" y="285" width="30" height="20" rx="4" fill="#fde047" />

    <!-- Cute Little Talon Feet -->
    <rect x="268" y="328" width="12" height="12" fill="#78350f" />
    <rect x="270" y="335" width="4" height="6" fill="#1c1917" />
    <rect x="276" y="335" width="4" height="6" fill="#1c1917" />
    <rect x="320" y="328" width="12" height="12" fill="#78350f" />
    <rect x="322" y="335" width="4" height="6" fill="#1c1917" />
    <rect x="328" y="335" width="4" height="6" fill="#1c1917" />

    <!-- Head -->
    <rect x="240" y="145" width="120" height="105" rx="20" fill="#ea580c" />
    <rect x="245" y="150" width="110" height="95" rx="16" fill="#f97316" />
    <!-- Cheeks and face warmth -->
    <rect x="250" y="175" width="100" height="65" rx="12" fill="#fb923c" />

    <!-- Flame Crest Tuft (Top of head) -->
    <path d="M 285 145 C 285 110, 300 85, 305 75 C 310 88, 325 110, 315 145 Z" fill="#ea580c" />
    <path d="M 290 145 C 290 115, 302 95, 305 85 C 308 95, 320 115, 310 145 Z" fill="#f97316" />
    <path d="M 295 145 C 295 125, 303 105, 305 95 C 307 105, 314 125, 305 145 Z" fill="#fde047" />

    <!-- Big Cute Anime / Pixel Eyes -->
    <!-- Left Eye -->
    <rect x="262" y="180" width="26" height="30" rx="8" fill="#18181b" />
    <rect x="265" y="182" width="12" height="14" rx="4" fill="#ffffff" />
    <rect x="276" y="196" width="6" height="6" rx="2" fill="#ffffff" />

    <!-- Right Eye -->
    <rect x="312" y="180" width="26" height="30" rx="8" fill="#18181b" />
    <rect x="315" y="182" width="12" height="14" rx="4" fill="#ffffff" />
    <rect x="326" y="196" width="6" height="6" rx="2" fill="#ffffff" />

    <!-- Golden Diamond Beak -->
    <polygon points="300,205 312,217 300,229 288,217" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
    <polygon points="300,208 308,217 300,225 292,217" fill="#fef08a" />
  </g>

  <!-- PHONIXIA ICONIC PIXEL TYPOGRAPHY -->
  <!-- Crisp, pixelated, 2-tone gradient with black border outline -->
  <g id="phonixiaLogoText" transform="translate(100, 360)">
    <!-- Dark Shadow / Border Behind Text -->
    <text x="200" y="70"
          text-anchor="middle"
          font-family="'Press Start 2P', monospace, sans-serif"
          font-size="52"
          font-weight="900"
          letter-spacing="4"
          fill="#1c0c06"
          stroke="#1c0c06"
          stroke-width="14"
          stroke-linejoin="miter">PHONIXIA</text>

    <!-- Two-tone Gradient Pixel Fill -->
    <text x="200" y="70"
          text-anchor="middle"
          font-family="'Press Start 2P', monospace, sans-serif"
          font-size="52"
          font-weight="900"
          letter-spacing="4"
          fill="url(#textGrad)"
          stroke="#451a03"
          stroke-width="2">PHONIXIA</text>

    <!-- Pixel Top Highlight -->
    <text x="200" y="68"
          text-anchor="middle"
          font-family="'Press Start 2P', monospace, sans-serif"
          font-size="52"
          font-weight="900"
          letter-spacing="4"
          fill="none"
          stroke="#ffedd5"
          stroke-width="1"
          opacity="0.6">PHONIXIA</text>
  </g>
</svg>
'''

# Write to public/logo.svg and src/assets/logo.svg
os.makedirs("public", exist_ok=True)
os.makedirs("src/assets", exist_ok=True)

with open("public/logo.svg", "w") as f:
    f.write(svg_content)

with open("src/assets/logo.svg", "w") as f:
    f.write(svg_content)

print("SVG created successfully!")

# Convert to public/logo.jpeg and public/logo.png via ImageMagick
cmd_jpeg = "convert -background '#141724' -flatten -density 150 public/logo.svg public/logo.jpeg"
cmd_png = "convert -background none -density 150 public/logo.svg public/logo.png"

subprocess.run(cmd_jpeg, shell=True, check=True)
subprocess.run(cmd_png, shell=True, check=True)

# Also create copy in src/assets/logo.jpeg
subprocess.run("cp public/logo.jpeg src/assets/logo.jpeg", shell=True, check=True)
subprocess.run("cp public/logo.png src/assets/logo.png", shell=True, check=True)

print("logo.jpeg and logo.png successfully generated!")
