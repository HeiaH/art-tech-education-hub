export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'exercise' | 'worksheet';
  content: string;
}

export interface Module {
  id: string;
  number: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const courseModules: Module[] = [
  {
    id: 'module-1',
    number: '01',
    title: 'The Architecture of a Song',
    description: 'Understand how every hit is built before you write a single word.',
    lessons: [
      {
        id: 'm1-l1',
        title: 'How song structure actually works',
        description: 'Learn the foundational patterns behind verse-chorus form, AABA, and modern hybrid structures.',
        duration: '14 min',
        type: 'video',
        content: `## How Song Structure Actually Works

Most hit songs follow surprisingly simple blueprints. In this lesson, we'll dissect the structural DNA of songs across genres and decades.

### What you'll learn
- The 3 most common song structures and when to use each
- Why listeners crave repetition — and how much is too much
- How to map out a structure before you write a single note

### Key concepts
**Verse-Chorus Form** — The workhorse of pop, rock, and R&B. Verses deliver story; choruses deliver the hook.

**AABA Form** — Classic jazz and musical theatre structure. Three A sections with a contrasting B (the "bridge").

**Through-Composed** — No repeating sections. Used in art songs and some progressive rock.

### Exercise
Pick 3 songs you love. Map out their structure using letters (A, B, C). Note where the energy peaks and valleys are.`,
      },
      {
        id: 'm1-l2',
        title: 'Verse, chorus, bridge — and when to break the rules',
        description: 'Each section has a job. Know the job, then decide if you want to reassign it.',
        duration: '11 min',
        type: 'video',
        content: `## Verse, Chorus, Bridge — And When to Break the Rules

Every section in a song has a purpose. Once you understand that purpose, you can fulfill it in unexpected ways.

### What you'll learn
- The specific emotional job of each song section
- When a pre-chorus is essential vs. unnecessary
- 5 ways artists have broken structural rules to great effect

### The sections
**Verse** — Sets the scene, develops the story, builds toward the chorus. Lower energy, more detail.

**Chorus** — The emotional and melodic peak. Simple, memorable, repeatable.

**Bridge** — The departure. New key, new rhythm, new perspective. Creates contrast.

**Pre-Chorus** — The ramp. Builds tension between verse and chorus.

### Rule-breaking examples
- Radiohead's "Paranoid Android" — four distinct sections, no traditional chorus
- Billie Eilish's "bad guy" — the hook IS the verse`,
      },
      {
        id: 'm1-l3',
        title: 'Tension & release: the emotional engine',
        description: 'Why some songs make you feel something and others don\'t — it\'s all about contrast.',
        duration: '9 min',
        type: 'video',
        content: `## Tension & Release: The Emotional Engine

The reason music moves us is rooted in one simple mechanism: the interplay between tension and release.

### What you'll learn
- How to create tension using melody, harmony, rhythm, and dynamics
- The art of the delayed resolution
- Building emotional arcs across an entire song

### Tension tools
1. **Melodic** — Rising pitch, unresolved notes, chromatic movement
2. **Harmonic** — Dominant chords, suspensions, deceptive cadences
3. **Rhythmic** — Syncopation, accelerating patterns, silence before the drop
4. **Dynamic** — Building volume, adding layers, stripping back

### The emotional arc
Think of your song as a story with a beginning, middle, and climax. The chorus should feel like the climax — but only if the verses built enough tension to earn it.`,
      },
      {
        id: 'm1-l4',
        title: 'Structure Map Exercise',
        description: 'Map out the structure of your favorite songs and design your own template.',
        duration: '~20 min',
        type: 'exercise',
        content: `## Structure Map Exercise

Time to put theory into practice. You'll analyze real songs and create your own structural blueprint.

### Part 1: Analysis (10 min)
Choose 3 songs — ideally in the genre you want to write in. For each song:
1. Listen all the way through
2. Label each section (Intro, V1, Pre-C, C, V2, Bridge, Outro, etc.)
3. Note the timestamp of each section change
4. Mark where the emotional peak is

### Part 2: Design (10 min)
Using what you observed, design your own song structure:
1. Decide how many sections you want
2. Assign an emotional intensity (1-10) to each section
3. Draw the "energy curve" of your song
4. Write a 1-sentence description of what happens in each section

### Deliverable
A completed structure map you can use as a blueprint for your first song in Module 5.`,
      },
    ],
  },
  {
    id: 'module-2',
    number: '02',
    title: 'Melody & Hook Writing',
    description: "Craft melodies that stick in people's heads days after they hear it.",
    lessons: [
      {
        id: 'm2-l1',
        title: 'What makes a melody memorable',
        description: 'The science and art behind why some melodies are impossible to forget.',
        duration: '13 min',
        type: 'video',
        content: `## What Makes a Melody Memorable

Some melodies you hear once and never forget. Others vanish the moment the song ends. The difference isn't magic — it's craft.

### What you'll learn
- The 4 qualities every memorable melody shares
- How stepwise motion and leaps create emotional contour
- The "singability" test — and why it matters

### The 4 qualities
1. **Simplicity** — The best melodies are hummable. If you can't sing it from memory, simplify.
2. **Repetition with variation** — Repeat your core motif, but change one element each time.
3. **Strong contour** — The shape of the melody (up, down, arch) should mirror the emotion.
4. **Rhythmic hook** — A distinctive rhythm is often more memorable than the notes themselves.

### Exercise
Hum 5 melodies from memory right now. What do they have in common? Write down your observations.`,
      },
      {
        id: 'm2-l2',
        title: 'Motif development and variation',
        description: 'How to take a 4-note idea and build an entire melody from it.',
        duration: '10 min',
        type: 'video',
        content: `## Motif Development and Variation

A motif is the seed of your melody — just 3 to 5 notes that define the song's identity. Everything else grows from it.

### What you'll learn
- How to extract a motif from a chord progression
- 6 techniques for developing a motif across a song
- Keeping unity while creating variety

### Development techniques
1. **Transposition** — Move the same shape to a different starting note
2. **Inversion** — Flip the intervals (up becomes down)
3. **Augmentation** — Stretch the rhythm (make notes longer)
4. **Diminution** — Compress the rhythm (make notes shorter)
5. **Fragmentation** — Use only part of the motif
6. **Sequence** — Repeat the motif at progressively higher or lower pitches

### Listening example
Listen to Beethoven's 5th — the entire first movement is built from just 4 notes. That's motif development at its peak.`,
      },
      {
        id: 'm2-l3',
        title: 'Writing melodic hooks from rhythm',
        description: 'Start with a rhythm pattern, add notes later — often the fastest path to a hook.',
        duration: '12 min',
        type: 'video',
        content: `## Writing Melodic Hooks from Rhythm

Most songwriters start with notes. But often, the secret to a great hook is starting with rhythm instead.

### What you'll learn
- Why rhythm-first writing often produces stronger hooks
- How to create rhythmic templates you can pitch later
- Using speech rhythm as a melodic starting point

### The rhythm-first method
1. **Tap a rhythm** — Just clap or tap a pattern that feels good. Don't think about notes.
2. **Add words** — Speak a lyric phrase in that rhythm. Adjust the rhythm to fit natural speech.
3. **Add pitch** — Now sing the words on notes. Let the rhythm guide which notes feel right.

### Speech rhythm technique
Say your lyric line out loud as if you're telling a friend. Record yourself. The natural rises and falls of your speech ARE a melody. Exaggerate them.

### Pro tip
The most iconic hooks often have a distinctive rhythm even before you consider the notes. Think of "We Will Rock You" — the rhythm IS the hook.`,
      },
      {
        id: 'm2-l4',
        title: 'Hook Workshop',
        description: 'Write 5 hooks in 30 minutes using the techniques from this module.',
        duration: '~30 min',
        type: 'exercise',
        content: `## Hook Workshop

Speed is your friend. In this workshop, you'll generate 5 hooks in 30 minutes. Not all will be good — that's the point.

### Setup
- Timer set to 6 minutes per hook
- Phone voice memo or DAW ready to record
- No judging — capture everything

### Round 1: Rhythm-first (6 min)
Tap a rhythm → add a vowel sound → find notes → add real words.

### Round 2: Lyric-first (6 min)
Write a one-line lyric → speak it out loud → let the speech melody become the hook.

### Round 3: Chord-first (6 min)
Play a 2-chord loop → improvise a melody over it → grab the best 4-bar phrase.

### Round 4: Motif development (6 min)
Sing 3 random notes → apply 2 development techniques → extend into a full hook.

### Round 5: Freestyle (6 min)
Combine any methods. Go with what's working.

### Review
Listen back to all 5. Star the strongest one. That's your starting point for Module 5.`,
      },
    ],
  },
  {
    id: 'module-3',
    number: '03',
    title: 'Lyric Writing That Lands',
    description: 'Say something real. Say it in a way only you could.',
    lessons: [
      {
        id: 'm3-l1',
        title: "Show don't tell: scene writing in lyrics",
        description: 'Replace abstract statements with concrete images that make listeners feel something.',
        duration: '15 min',
        type: 'video',
        content: `## Show Don't Tell: Scene Writing in Lyrics

"I'm sad" tells us nothing. "I'm staring at your coffee cup still on the counter" makes us feel everything.

### What you'll learn
- The difference between telling and showing in lyrics
- How to convert abstract emotions into concrete scenes
- The "camera lens" technique for writing vivid lyrics

### The camera lens technique
Imagine your lyric is a camera. Instead of describing how you feel, describe what the camera sees:
- **Wide shot** — Set the scene. Where are we? What time of day?
- **Close-up** — Zoom in on one specific detail that carries emotional weight
- **Action** — What is someone doing? Movement creates energy

### Before and after
- **Telling:** "I miss you so much"
- **Showing:** "Your jacket's still hanging on the back of the door"

### Exercise
Take a lyric you've written that tells an emotion. Rewrite it as a scene. Use at least one specific sensory detail (sight, sound, smell, touch, taste).`,
      },
      {
        id: 'm3-l2',
        title: 'Rhyme schemes without sounding corny',
        description: 'Master perfect, near, and internal rhymes to add musicality without cheese.',
        duration: '11 min',
        type: 'video',
        content: `## Rhyme Schemes Without Sounding Corny

Rhyme is a tool, not a rule. Used well, it makes lyrics feel inevitable. Used badly, it makes them feel like greeting cards.

### What you'll learn
- Perfect rhyme vs. near rhyme vs. internal rhyme
- Why near rhymes often sound more sophisticated
- How to avoid the "moon/June" trap

### Types of rhyme
**Perfect rhyme** — love/above, fire/desire. Strong resolution, but can sound predictable.

**Near rhyme (slant)** — love/enough, fire/higher. Softer landing, more conversational.

**Internal rhyme** — Rhymes within a line, not just at the end. "I *sold* my soul for a pot of *gold*."

### The corniness test
If the rhyme is driving the word choice, it will sound forced. If the meaning is driving the word choice and a rhyme happens to land — that's the sweet spot.

### Pro tip
Write the line without worrying about rhyme first. Then see if you can adjust a word or two to create a near rhyme without changing the meaning.`,
      },
      {
        id: 'm3-l3',
        title: 'Finding your lyric voice',
        description: 'Your unique perspective is your greatest asset. Learn to trust it.',
        duration: '13 min',
        type: 'video',
        content: `## Finding Your Lyric Voice

The best lyrics don't sound like they could have been written by anyone. They sound like they could only have been written by you.

### What you'll learn
- How to identify your natural lyric tendencies
- Writing from personal experience without being diary-like
- The specificity principle — the more specific, the more universal

### The specificity principle
Paradoxically, the more specific and personal your lyric is, the more universally it resonates. "I miss you" is generic. "I still set two alarms because you were never a morning person" is devastatingly specific — and everyone feels it.

### Finding your voice
1. **Write 10 observations** — Things you noticed today. The weirder, the better.
2. **Identify your themes** — What do you keep writing about? Lean into it.
3. **Study your speaking voice** — Record yourself telling a story. Your natural phrasing IS your lyric voice.

### Exercise
Write a verse about a real moment from the last week. No metaphors allowed — just what happened, in your words.`,
      },
      {
        id: 'm3-l4',
        title: 'Lyric Revision Worksheet',
        description: 'A structured process for elevating a first-draft lyric to a final-draft lyric.',
        duration: 'Download',
        type: 'worksheet',
        content: `## Lyric Revision Worksheet

First drafts capture the idea. Revisions make it land. Use this worksheet to systematically improve any lyric.

### Step 1: Read aloud
Read your lyric out loud. Mark any line where you stumble or feel the rhythm break.

### Step 2: The "so what" test
For each line, ask: "Does this earn its place?" If a line doesn't add meaning, emotion, or musicality — cut it or rewrite it.

### Step 3: Show vs. tell audit
Highlight every line that tells an emotion directly (I'm sad, I'm happy, I love you). Can you replace it with a scene or image?

### Step 4: Rhyme check
Are any rhymes driving the word choice? Swap forced perfect rhymes for near rhymes that serve the meaning.

### Step 5: Specificity pass
Find 3 places where you can replace a general word with a specific one. "Car" → "passenger seat of your Civic."

### Step 6: Read aloud again
Read the revised version. Does it flow better? Does it feel more like you?

### Deliverable
A revised lyric with tracked changes showing before/after for at least 5 lines.`,
      },
    ],
  },
  {
    id: 'module-4',
    number: '04',
    title: 'Chord Progressions & Harmony',
    description: 'Build harmonic beds that support your melody and emotional intent.',
    lessons: [
      {
        id: 'm4-l1',
        title: 'The progressions that work — and why',
        description: 'The handful of chord progressions behind thousands of hits, decoded.',
        duration: '12 min',
        type: 'video',
        content: `## The Progressions That Work — And Why

You don't need to know thousands of chords. You need to deeply understand a handful of progressions and what makes them work.

### What you'll learn
- The 5 most-used progressions in popular music
- The emotional quality of each progression
- How to adapt a progression to fit your song's mood

### The big 5
1. **I - V - vi - IV** (C - G - Am - F) — The "pop anthem" progression. Uplifting, universal.
2. **vi - IV - I - V** (Am - F - C - G) — Same chords, darker starting point. Emotional, yearning.
3. **I - IV - V - IV** (C - F - G - F) — Classic rock energy. Forward momentum.
4. **ii - V - I** (Dm - G - C) — Jazz foundation. Sophisticated resolution.
5. **I - vi - IV - V** (C - Am - F - G) — 50s/60s doo-wop. Nostalgic, warm.

### Why they work
These progressions balance tension and resolution. They create a sense of movement — of going somewhere and arriving.

### Exercise
Play each progression slowly. Sing a melody over each. Notice how the same melody feels different over each progression.`,
      },
      {
        id: 'm4-l2',
        title: 'Modal borrowing and color chords',
        description: 'Borrow chords from parallel modes to add unexpected emotional color.',
        duration: '14 min',
        type: 'video',
        content: `## Modal Borrowing and Color Chords

Once you know the rules of diatonic harmony, you can start breaking them — by borrowing chords from parallel modes.

### What you'll learn
- What modal borrowing is and how it works
- The most common borrowed chords and their emotional effects
- How to add "color" without losing your tonal center

### Common borrowed chords
- **bVII** (Bb in C major) — Borrowed from Mixolydian. Epic, cinematic feel.
- **iv** (Fm in C major) — Borrowed from minor. Sudden sadness, bittersweetness.
- **bVI** (Ab in C major) — Borrowed from Aeolian. Dramatic, unexpected.
- **bIII** (Eb in C major) — Borrowed from minor. Expansive, dreamy.

### Color chords
Beyond borrowed chords, you can add color with:
- **Add9 chords** — Bright, open sound
- **Sus2/Sus4** — Ambiguous, floating
- **Maj7** — Warm, jazzy
- **Slash chords** — Smooth voice leading in the bass

### Listening exercise
Find 3 songs that use a chord that surprises you. Identify what makes it surprising and what emotion it creates.`,
      },
      {
        id: 'm4-l3',
        title: 'Voicing for emotional impact',
        description: 'The same chord can feel completely different depending on how you voice it.',
        duration: '10 min',
        type: 'video',
        content: `## Voicing for Emotional Impact

A C major chord is always C-E-G. But how you arrange those notes — the voicing — changes everything about how it feels.

### What you'll learn
- How register and spacing affect emotional impact
- Open vs. close voicings and when to use each
- Voice leading: making chord changes smooth and inevitable

### Voicing principles
**Low and close** — Dark, heavy, powerful. Great for intense moments.
**High and open** — Light, airy, vulnerable. Great for intimate moments.
**Wide spacing** — Cinematic, grand. Gives each note room to breathe.
**Tight cluster** — Tense, complex. Creates harmonic density.

### Voice leading
The smoothest chord changes happen when each note moves the shortest possible distance to the next chord. This is voice leading.

**Example:** C → Am. Instead of jumping, keep the C and E (they're common tones) and just move G down to A.

### Exercise
Take a 4-chord progression. Play it with close voicings, then open voicings, then with smooth voice leading. Record all three and compare the emotional effect.`,
      },
      {
        id: 'm4-l4',
        title: 'Chord Palette Exercise',
        description: 'Build a personalized chord palette for your song project.',
        duration: '~25 min',
        type: 'exercise',
        content: `## Chord Palette Exercise

Just like a painter chooses colors before painting, you'll choose chords before writing. This exercise creates your harmonic palette.

### Part 1: Choose your base (5 min)
Pick a key. Play the 7 diatonic chords. Choose the 4 that feel right for the emotion of your song.

### Part 2: Add color (10 min)
From the borrowed chords lesson, try adding 1-2 chords from a parallel mode. Do they enhance the mood? Keep what works.

### Part 3: Voicing lab (10 min)
For each chord in your palette:
1. Try at least 2 different voicings
2. Choose the voicing that best fits the emotion
3. Practice the transitions between chords with smooth voice leading

### Deliverable
A chord chart showing:
- Your chosen key
- 4-6 chords with specific voicings
- A suggested progression order
- Notes on the emotional quality ("this change feels hopeful", "this one feels bittersweet")

This palette will be your harmonic foundation in Module 5.`,
      },
    ],
  },
  {
    id: 'module-5',
    number: '05',
    title: 'From Demo to Finished Song',
    description: 'Produce, record, and finalize your first complete song.',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Demo workflow: fast and decisive',
        description: 'Capture the essence of your song quickly before the spark fades.',
        duration: '16 min',
        type: 'video',
        content: `## Demo Workflow: Fast and Decisive

A demo is not a final product. It's a snapshot of an idea. The faster you capture it, the more of the original spark you preserve.

### What you'll learn
- The 30-minute demo method
- Essential vs. nice-to-have in a demo
- Tools and setup for fast capture

### The 30-minute demo method
1. **Minutes 0-5:** Set up. One instrument, one mic, hit record.
2. **Minutes 5-15:** Play through the song structure. Don't stop for mistakes.
3. **Minutes 15-25:** One more take, slightly more refined. Add a scratch vocal.
4. **Minutes 25-30:** Quick listen. Make notes on what to keep and what to change.

### Demo essentials
- Chord progression (played, not just written)
- Vocal melody with at least rough lyrics
- Clear song structure (you should hear the sections)

### Demo non-essentials
- Perfect performance
- Final lyrics
- Production, effects, mixing
- Multiple instruments

### Pro tip
The enemy of a great demo is perfectionism. Record it, move on, and return with fresh ears tomorrow.`,
      },
      {
        id: 'm5-l2',
        title: 'Arrangement choices that serve the song',
        description: 'What to add, what to remove, and how to let the song breathe.',
        duration: '12 min',
        type: 'video',
        content: `## Arrangement Choices That Serve the Song

Arrangement is the art of deciding what plays when. Every instrument, every layer should serve the emotional arc of the song.

### What you'll learn
- The "less is more" principle in arrangement
- How to build energy across sections
- The role of contrast in keeping listeners engaged

### Arrangement principles
1. **Start sparse, end full** — Not always, but it's a reliable default. Give yourself room to grow.
2. **Each section should sound different** — If verse 2 sounds exactly like verse 1, the listener checks out.
3. **Leave space** — The notes you don't play are as important as the ones you do.
4. **Serve the vocal** — In a vocal song, everything exists to support the voice.

### Energy management
| Section | Elements | Energy |
|---------|----------|--------|
| Intro | 1-2 instruments | Low |
| Verse 1 | Core rhythm + vocal | Medium-low |
| Chorus 1 | Full band, harmonies | High |
| Verse 2 | Core + one new element | Medium |
| Chorus 2 | Full band + extra layer | Higher |
| Bridge | Strip back or go wild | Contrast |
| Final chorus | Everything you've got | Peak |

### Exercise
Listen to a song you love. Count the number of distinct elements in each section. Notice how they add and subtract.`,
      },
      {
        id: 'm5-l3',
        title: "Feedback, revision, and knowing when it's done",
        description: 'How to get useful feedback, act on it wisely, and ship your song.',
        duration: '11 min',
        type: 'video',
        content: `## Feedback, Revision, and Knowing When It's Done

A song is never finished — it's abandoned. But there's an art to knowing when it's ready to be abandoned.

### What you'll learn
- How to ask for feedback that's actually useful
- Which feedback to act on and which to ignore
- The "diminishing returns" point — when revisions stop improving the song

### Getting useful feedback
**Don't ask:** "What do you think?"
**Do ask:** "Does the chorus feel like a payoff after the verse?" or "Is there a moment where your attention drifts?"

### The feedback filter
Act on feedback when:
- Multiple people say the same thing
- It resonates with a nagging feeling you already had
- It's about the listener's experience, not their taste

Ignore feedback when:
- It's trying to make your song into a different song
- It contradicts your artistic intent
- It's about production when you're still in songwriting mode

### When is it done?
Your song is done when:
1. The structure serves the emotional arc
2. The melody is memorable and singable
3. The lyrics say what you mean
4. You've revised at least twice
5. You're making lateral changes, not improvements

### The shipping mindset
Done is better than perfect. A finished song you can share teaches you more than an unfinished masterpiece in your drawer.`,
      },
      {
        id: 'm5-l4',
        title: 'Final Song Project',
        description: 'Write, record, and submit a complete song using everything from the course.',
        duration: 'Ongoing',
        type: 'exercise',
        content: `## Final Song Project

This is it. Everything you've learned in the course comes together in one finished song.

### The brief
Write and record one complete song that demonstrates:
- Clear song structure (Module 1)
- A memorable melody with a strong hook (Module 2)
- Lyrics that show rather than tell (Module 3)
- Intentional chord choices with at least one color chord (Module 4)
- A clean demo recording with thoughtful arrangement (Module 5)

### Timeline
- **Day 1-2:** Structure map + chord palette (use your exercises from Modules 1 & 4)
- **Day 3-4:** Melody and hook writing (use techniques from Module 2)
- **Day 5-6:** Lyrics — first draft, then revision using the worksheet (Module 3)
- **Day 7:** Record your demo using the 30-minute method, then do one refined take

### Submission checklist
- [ ] Audio recording (voice memo quality is fine)
- [ ] Lyric sheet
- [ ] Structure map showing your sections
- [ ] Chord chart
- [ ] 3 sentences about what you learned

### What happens next
Share your song in the Discord community for peer feedback. If you're a Creator Member, submit it for personalized feedback from HeiaH in the monthly Q&A.

Congratulations — you've written a song. Now write the next one.`,
      },
    ],
  },
];
