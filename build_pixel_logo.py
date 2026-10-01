#!/usr/bin/env python3
import subprocess
import os

WIDTH = 640
HEIGHT = 500

# Color definitions (R, G, B)
BG_COLOR = (22, 24, 36)           # Dark charcoal/slate
INNER_PORTAL = (14, 16, 26)       # Inner dark cavern
STONE_BASE = (107, 114, 128)      # Gray stone
STONE_DARK = (55, 65, 81)         # Dark stone
STONE_LIGHT = (156, 163, 175)     # Highlight stone
STONE_MORTAR = (31, 41, 55)       # Mortar / seams
WOOD_BROWN = (133, 82, 57)        # Carved corner block
WOOD_DARK = (74, 38, 24)          # Carved inner rune
WOOD_LIGHT = (167, 104, 72)       # Highlight edge

FIRE_YELLOW = (254, 240, 138)     # Bright yellow flame
FIRE_GOLD = (251, 191, 36)        # Golden flame
FIRE_ORANGE = (249, 115, 22)      # Bright orange
FIRE_RED = (220, 38, 38)          # Red ember
FIRE_DARKRED = (153, 27, 27)      # Dark ember red

BIRD_BODY_ORANGE = (234, 88, 12)
BIRD_BODY_LIGHT = (249, 115, 22)
BIRD_CHEST_PEACH = (251, 146, 60)
BIRD_CHEST_YELLOW = (253, 224, 71)
EYE_BLACK = (24, 24, 27)
EYE_WHITE = (255, 255, 255)
BEAK_GOLD = (251, 191, 36)
BEAK_SHADE = (217, 119, 6)
TALON_DARK = (28, 25, 23)

# Initialize grid
grid = [[BG_COLOR for _ in range(WIDTH)] for _ in range(HEIGHT)]

def fill_rect(x1, y1, x2, y2, color):
    x1, x2 = max(0, min(x1, x2)), min(WIDTH, max(x1, x2))
    y1, y2 = max(0, min(y1, y2)), min(HEIGHT, max(y1, y2))
    for y in range(y1, y2):
        for x in range(x1, x2):
            grid[y][x] = color

# 1. Inner portal archway
fill_rect(130, 45, 510, 375, INNER_PORTAL)

# 2. Portal Flames & Embers
def draw_flame(cx, cy, radius_x, radius_y):
    for dy in range(-radius_y, radius_y):
        for dx in range(-radius_x, radius_x):
            dist = (dx*dx)/(radius_x*radius_x) + (dy*dy)/(radius_y*radius_y)
            if dist <= 1.0:
                px, py = cx + dx, cy + dy
                if 0 <= px < WIDTH and 0 <= py < HEIGHT:
                    if dist < 0.25:
                        grid[py][px] = FIRE_YELLOW
                    elif dist < 0.6:
                        grid[py][px] = FIRE_GOLD
                    elif dist < 0.85:
                        grid[py][px] = FIRE_ORANGE
                    else:
                        grid[py][px] = FIRE_RED

# Floating embers around the top and sides
draw_flame(200, 95, 14, 22)
draw_flame(235, 120, 10, 16)
draw_flame(440, 125, 16, 24)
draw_flame(405, 90, 12, 18)
draw_flame(160, 310, 20, 35)
draw_flame(195, 335, 25, 25)
draw_flame(445, 335, 25, 25)
draw_flame(480, 310, 20, 35)

# 3. Top Center Lintel (Stone blocks)
fill_rect(160, 45, 480, 85, STONE_DARK)
fill_rect(160, 45, 480, 48, STONE_LIGHT)
# Brick segments
fill_rect(160, 48, 235, 65, STONE_BASE)
fill_rect(240, 48, 400, 65, (95, 102, 115))
fill_rect(405, 48, 480, 65, STONE_BASE)
fill_rect(160, 68, 280, 85, (75, 82, 95))
fill_rect(285, 68, 480, 85, STONE_BASE)
# Mortar lines
fill_rect(160, 65, 480, 68, STONE_MORTAR)
fill_rect(235, 48, 240, 65, STONE_MORTAR)
fill_rect(400, 48, 405, 65, STONE_MORTAR)
fill_rect(280, 68, 285, 85, STONE_MORTAR)

# 4. Top-Left Carved Spiral Corner Block
fill_rect(85, 45, 160, 120, WOOD_BROWN)
fill_rect(85, 45, 160, 49, WOOD_LIGHT)
fill_rect(85, 45, 89, 120, WOOD_LIGHT)
fill_rect(85, 116, 160, 120, WOOD_DARK)
fill_rect(156, 45, 160, 120, WOOD_DARK)
# Spiral rune
fill_rect(98, 58, 147, 65, WOOD_DARK)
fill_rect(140, 58, 147, 107, WOOD_DARK)
fill_rect(111, 100, 147, 107, WOOD_DARK)
fill_rect(111, 72, 118, 107, WOOD_DARK)
fill_rect(111, 72, 135, 79, WOOD_DARK)
fill_rect(128, 72, 135, 93, WOOD_DARK)
fill_rect(122, 86, 135, 93, WOOD_DARK)

# 5. Top-Right Carved Spiral Corner Block (Mirrored)
fill_rect(480, 45, 555, 120, WOOD_BROWN)
fill_rect(480, 45, 555, 49, WOOD_LIGHT)
fill_rect(480, 45, 484, 120, WOOD_LIGHT)
fill_rect(480, 116, 555, 120, WOOD_DARK)
fill_rect(551, 45, 555, 120, WOOD_DARK)
# Spiral rune mirrored
fill_rect(493, 58, 542, 65, WOOD_DARK)
fill_rect(493, 58, 500, 107, WOOD_DARK)
fill_rect(493, 100, 529, 107, WOOD_DARK)
fill_rect(522, 72, 529, 107, WOOD_DARK)
fill_rect(505, 72, 529, 79, WOOD_DARK)
fill_rect(505, 72, 512, 93, WOOD_DARK)
fill_rect(505, 86, 518, 93, WOOD_DARK)

# 6. Left & Right Pillars
for y_start, y_end in [(120, 195), (200, 275), (280, 355)]:
    # Left pillar block
    fill_rect(90, y_start, 135, y_end, STONE_BASE)
    fill_rect(90, y_start, 135, y_start + 4, STONE_LIGHT)
    fill_rect(90, y_start, 94, y_end, STONE_LIGHT)
    fill_rect(131, y_start, 135, y_end, STONE_DARK)
    fill_rect(90, y_end - 4, 135, y_end, STONE_MORTAR)
    # Right pillar block
    fill_rect(505, y_start, 550, y_end, STONE_BASE)
    fill_rect(505, y_start, 550, y_start + 4, STONE_LIGHT)
    fill_rect(505, y_start, 509, y_end, STONE_LIGHT)
    fill_rect(546, y_start, 550, y_end, STONE_DARK)
    fill_rect(505, y_end - 4, 550, y_end, STONE_MORTAR)

# 7. Phoenix Wings
# Left Wing: Stair-stepped pixel feathers
wing_feathers_left = [
    (140, 130, 25, 45), (155, 150, 25, 50), (170, 175, 25, 55),
    (185, 205, 25, 60), (200, 235, 25, 60), (215, 260, 30, 50)
]
for x, y, w, h in wing_feathers_left:
    fill_rect(x, y, x + w, y + h, FIRE_DARKRED)
    fill_rect(x + 3, y + 3, x + w - 3, y + h - 3, FIRE_ORANGE)
    fill_rect(x + 5, y + 5, x + w - 5, y + 16, FIRE_YELLOW)
    fill_rect(x + 7, y + 16, x + w - 7, y + 32, FIRE_GOLD)

# Right Wing: Stair-stepped pixel feathers (Mirrored)
wing_feathers_right = [
    (475, 130, 25, 45), (460, 150, 25, 50), (445, 175, 25, 55),
    (430, 205, 25, 60), (415, 235, 25, 60), (395, 260, 30, 50)
]
for x, y, w, h in wing_feathers_right:
    fill_rect(x, y, x + w, y + h, FIRE_DARKRED)
    fill_rect(x + 3, y + 3, x + w - 3, y + h - 3, FIRE_ORANGE)
    fill_rect(x + 5, y + 5, x + w - 5, y + 16, FIRE_YELLOW)
    fill_rect(x + 7, y + 16, x + w - 7, y + 32, FIRE_GOLD)

# 8. Phoenix Body
# Base round body
fill_rect(265, 245, 375, 345, BIRD_BODY_ORANGE)
# Feathers shading
fill_rect(275, 255, 365, 335, BIRD_BODY_LIGHT)
fill_rect(285, 270, 355, 325, BIRD_CHEST_PEACH)
fill_rect(298, 290, 342, 315, BIRD_CHEST_YELLOW)

# Head
fill_rect(255, 150, 385, 260, BIRD_BODY_ORANGE)
fill_rect(262, 156, 378, 252, BIRD_BODY_LIGHT)
fill_rect(270, 185, 370, 245, BIRD_CHEST_PEACH)

# Top Flame Crest Feathers
fill_rect(305, 75, 335, 155, BIRD_BODY_ORANGE)
fill_rect(310, 85, 330, 150, FIRE_ORANGE)
fill_rect(315, 95, 325, 145, FIRE_YELLOW)

# Left & Right Talons
fill_rect(285, 345, 305, 358, TALON_DARK)
fill_rect(335, 345, 355, 358, TALON_DARK)

# Large Cute Eyes with double shine
# Left Eye
fill_rect(280, 190, 312, 226, EYE_BLACK)
fill_rect(284, 194, 298, 208, EYE_WHITE)  # Primary big highlight
fill_rect(300, 212, 308, 220, EYE_WHITE)  # Secondary small highlight

# Right Eye
fill_rect(328, 190, 360, 226, EYE_BLACK)
fill_rect(332, 194, 346, 208, EYE_WHITE)
fill_rect(348, 212, 356, 220, EYE_WHITE)

# Golden Beak (diamond shape)
for dy in range(-14, 15):
    span = 14 - abs(dy)
    fill_rect(320 - span, 215 + dy, 320 + span, 216 + dy, BEAK_GOLD)
fill_rect(318, 212, 322, 222, FIRE_YELLOW)

# 9. Pixel Font "PHONIXIA" Banner at Bottom
# Matrix representation of letters in 8-bit style (width ~38, height ~52 each)
# Letters: P, H, O, N, I, X, I, A
LETTERS = {
    'P': [
        "#####",
        "#   #",
        "#####",
        "#    ",
        "#    "
    ],
    'H': [
        "#   #",
        "#   #",
        "#####",
        "#   #",
        "#   #"
    ],
    'O': [
        "#####",
        "#   #",
        "#   #",
        "#   #",
        "#####"
    ],
    'N': [
        "#####",
        "#   #",
        "#   #",
        "#   #",
        "#   #"
    ],
    'I': [
        "#####",
        "  #  ",
        "  #  ",
        "  #  ",
        "#####"
    ],
    'X': [
        "#   #",
        " # # ",
        "  #  ",
        " # # ",
        "#   #"
    ],
    'A': [
        "#####",
        "#   #",
        "#####",
        "#   #",
        "#   #"
    ]
}

word = "PHONIXIA"
start_x = 105
start_y = 385
letter_w = 42
spacing = 12

for i, ch in enumerate(word):
    lx = start_x + i * (letter_w + spacing)
    pattern = LETTERS.get(ch, LETTERS['A'])
    
    # Outer dark outline border (expand by 4 pixels)
    for r, row in enumerate(pattern):
        for c, val in enumerate(row):
            if val == '#':
                bx = lx + c * 8
                by = start_y + r * 10
                fill_rect(bx - 4, by - 4, bx + 12, by + 14, (28, 12, 6))

    # Inner two-tone gradient fill
    for r, row in enumerate(pattern):
        for c, val in enumerate(row):
            if val == '#':
                bx = lx + c * 8
                by = start_y + r * 10
                # Top half is golden-orange, bottom half is dark ember red
                if r < 2:
                    fill_rect(bx, by, bx + 8, by + 10, (255, 179, 71))
                elif r == 2:
                    fill_rect(bx, by, bx + 8, by + 5, (249, 115, 22))
                    fill_rect(bx, by + 5, bx + 8, by + 10, (207, 59, 27))
                else:
                    fill_rect(bx, by, bx + 8, by + 10, (139, 30, 15))

# Write out PPM image format
os.makedirs("public", exist_ok=True)
os.makedirs("src/assets", exist_ok=True)

ppm_path = "/tmp/phonixia_logo.ppm"
with open(ppm_path, "w") as f:
    f.write(f"P3\n{WIDTH} {HEIGHT}\n255\n")
    for y in range(HEIGHT):
        row_str = " ".join(f"{r} {g} {b}" for r, g, b in grid[y])
        f.write(row_str + "\n")

# Convert to public/logo.jpeg and public/logo.png using ImageMagick
subprocess.run(f"convert {ppm_path} public/logo.jpeg", shell=True, check=True)
subprocess.run(f"convert {ppm_path} public/logo.png", shell=True, check=True)
subprocess.run("cp public/logo.jpeg src/assets/logo.jpeg", shell=True, check=True)
subprocess.run("cp public/logo.png src/assets/logo.png", shell=True, check=True)

print("SUCCESS: public/logo.jpeg and public/logo.png created!")
