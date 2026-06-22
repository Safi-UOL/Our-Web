/**
 * You and me - content and configuration.
 * `meet.startUtcIso`: when the "together" timer starts (UTC). Adjust with your client.
 *
 * Lyrics: fetched automatically from the song title (+ artist) when you press play. For better
 * matches, set `artist` (e.g. film or singer). To force your own words, add `lyrics: ['line', ...]`.
 */
const meet = {
  labelDisplay: '18 October 2021',
  startUtcIso: '2021-10-18T00:00:00.000Z',
} as const

const siteName = 'Rifi'

export const site = {
  title: siteName,
  documentTitle: siteName,

  names: {
    site: siteName,
    partner: 'her',
  },

  meet,

  intro: {
    headline: 'Before you come in',
    subline: 'Catch each button they move anywhere on the screen on purpose.',
    leadUpButtonLabels: [
      'Tap me',
      'Again?',
      'Over here',
      'Not done yet',
      'Keep going',
      'Almost',
      'So close',
      'Still here',
      'Okay - now',
    ],
    finalButtonLabel: 'Last one - promise',
    openButtonLabel: 'Come in',
  },

  birthdayGate: {
    title: 'Happy Birthday',
    subtitle: 'May Allah bless you with Happiness and Health ',
    message:
      'This little page is a celebration before the full website opens. Wishing you laughter, peace, and every good thing your heart has been waiting for.',
    image: {
      src: '/images/birthday-gate.jpg',
      alt: 'Birthday celebration photo',
      track: {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        src: '/audio/birthday-gate.mp3',
        lyrics: [
          'I found a love for me',
          'Darling, just dive right in and follow my lead',
          'I found a girl, beautiful and sweet',
          'I never knew you were the someone waiting for me',
          "'Cause we were just kids when we fell in love",
          'Not knowing what it was',
          'I will not give you up this time',
          'Darling, just kiss me slow',
          'Your heart is all I own',
          "And in your eyes, you're holding mine",
          "Baby, I'm dancing in the dark",
          'With you between my arms',
          'Barefoot on the grass',
          'Listening to our favourite song',
          'When you said you looked a mess',
          'I whispered underneath my breath',
          'But you heard it',
          'Darling, you look perfect tonight',
          'I found a woman, stronger than anyone I know',
          'She shares my dreams, I hope that someday I\'ll share her home',
          'I found a lover to carry more than just my secrets',
          'To carry love, to carry children of our own',
          "We're still kids, but we're so in love",
          'Fighting against all odds',
          "I know we'll be alright this time",
          'Darling, just hold my hand',
          "Be my girl, I'll be your man",
          'I see my future in your eyes',
          "Baby, I'm dancing in the dark",
          'With you between my arms',
          'Barefoot on the grass',
          'Listening to our favourite song',
          'When I saw you in that dress',
          'Looking so beautiful',
          "I don't deserve this",
          'Darling, you look perfect tonight',
          "Baby, I'm dancing in the dark",
          'With you between my arms',
          'Barefoot on the grass',
          'Listening to our favourite song',
          'I have faith in what I see',
          'Now I know I have met an angel in person',
          'And she looks perfect',
          "I don't deserve this",
          'You look perfect tonight',
        ],
      },
    },
    buttonLabel: 'A Small Gift',
  },

  nav: {
    brand: siteName,
    links: [
      { to: '/', label: 'Home' },
      { to: '/story', label: 'Our story' },
      { to: '/memories', label: 'Memories' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/time-together', label: 'Time together' },
      { to: '/meetup', label: 'Meetup ' },
      { to: '/contact', label: 'Contact' },
    ],
  },

  hero: {
    eyebrow: siteName,
    headline: 'Ek choti si duniya, sirf tum aur main ❤️',
    subline:
      'Scroll slowly through our stories, memories, and every moment we’ve shared since our journey began',
    primaryCta: { to: '/memories', label: 'Open memories' },
    secondaryCta: { to: '/time-together', label: 'Time together' },
  },

  homeStory: {
    id: 'story',
    title: 'Our story… growing more beautiful with every passing day',
    paragraphs: [
      `Yeh choti si jagah sirf hum dono ke liye hai — jahan humari yaadein, hasi, aur saath guzara har khoobsurat pal basa hua hai ❤️

Har photo ke peeche ek kahani hai, har date ek yaad, aur har section humare safar ka ek haseen hissa.

Bade special moments se le kar un choti si ordinary days tak, sab kuch khoobsurat lagta hai kyun ke tum saath ho.

Aaram se scroll karo… yeh sirf ek website nahi, humari kahani ka ek hissa hai — sirf tumhare liye.
.`,
    ],
  },

  homeGallery: {
    id: 'gallery',
    title: 'Frames for Our memories',
    lead: 'Every photo has its own melody — press play and feel the memory again.',
    images: [
      {
        src: '/images/home-1.jpg',
        alt: 'Memory 1',
        track: { title: 'Gehra Hua', artist: 'Shreya Ghoshal', src: '/audio/home-song-1.mp3' },
      },
      {
        src: '/images/home-2.jpg',
        alt: 'Memory 2',
        track: { title: 'Tum Se Hi', artist: 'Mohit Chauhan', src: '/audio/home-song-2.mp3' },
      },
      {
        src: '/images/home-3.jpg',
        alt: 'Memory 3',
        track: { title: 'Sitaare', artist: 'Rahat Fateh Ali Khan', src: '/audio/home-song-3.mp3' },
      },
      {
        src: '/images/home-4.jpg',
        alt: 'Memory 4',
        track: { title: 'Chalo Janay Do', artist: 'Rahat Fateh Ali Khan', src: '/audio/home-song-4.mp3' },
      },
      {
        src: '/images/home-5.jpg',
        alt: 'Memory 5',
        track: { title: 'Bairan', artist: 'Mustafa Zahid', src: '/audio/home-song-5.mp3' },
      },
      {
        src: '/images/home-6.jpg',
        alt: 'Memory 6',
        track: { title: 'Awara Angaara', artist: 'Ali Zafar', src: '/audio/home-song-6.mp3' },
      },
      {
        src: '/images/home-7.jpeg',
        alt: 'Memory 7',
        track: {
          title: 'Janiye',
          artist: 'Vishal Mishra',
          src: '/audio/home-song-7.mp3',
        },
      },
    ],
  },
  about: {
    id: 'about',
    title: 'What you treasure',
    lead:
      'Little things that make us us — milestones, memories, and secrets only we share.',
    points: [
      {
        title: '18 Oct 2021',
        body: `${meet.labelDisplay} - Academy mein pehli baar aapko dekha. Sabse pehle aapka niqab notice kiya tha. Shayad tab nahi pata tha, lekin aaj samajhta hoon ke aapki simplicity hi woh cheez hai jo mujhe hamesha aapki taraf kheenchti rahi `,
      },
      {
        title: 'Presence',
        body: 'Your Presence is the most Precious Gift you can give me.',
      },
      {
        title: 'Small kindnesses',
        body: 'Texts, playlists, the way you remember what matters.',
      },
      {
        title: 'Shared adventures',
        body: 'Bht sary pangy kiye or end pe hmesha sath rhy"',
      },
      {
        title: 'Quiet routines',
        body: 'Wo sardion ki raaton me subha tak batain krna',
      },
      {
        title: 'What is next',
        body: 'Bs ab Hum Nikkah krain gy or Prove krdain gy k hum aik dusry k liye Best hain',
      },
    ],
  },
  storyPage: {
    title: 'Our Story',
    lead: 'Humari kahani — from the first "Hi Buddy" to all the little moments that slowly became home ❤️',
    sections: [
    {
    title: 'Where It All Began',
    paragraphs: [
    `It all began on ${meet.labelDisplay}. Academy mein hum mily thay, and that was where our story quietly started.`,
    'The first thing I noticed about you was your niqab. It instantly caught my attention, but what stayed with me was your simplicity — something I still admire deeply today.',
    ],
    },
    {
    title: 'What Grew Between Us',
    paragraphs: [
    'Slowly, conversations turned into comfort, and moments turned into memories. The small talks, random laughs, and little things started meaning more than we ever expected.',
    'Har guzarte din ke saath, our bond grew stronger — not just through special moments, but through ordinary days that became beautiful because we shared them.',
    ],
    },
    {
    title: 'What I Treasure Most',
    paragraphs: [
    'What I cherish most is the peace I feel with you — your simplicity, your presence, and the comfort of knowing you are there. Some connections are loud, but ours feels calm, warm, and real.',
    ],
    },
    {
    title: 'The Journey Ahead',
    paragraphs: [
    'I do not know exactly what every future day will look like, but I know one thing — I want you in those days.',
    'Wherever life takes us, I hope we keep choosing each other, growing together, and making countless beautiful memories side by side ❤️',
    ],
    },
    ],
    },
    
  galleryPage: {
    title: 'Gallery',
    lead: 'Your pictures, your soundtrack — play a song and watch the lyrics bloom over the moment.',
    images: [
      { src: '/images/gal-a.jpeg', alt: 'Gallery photo A' },
      { src: '/images/gal-b.jpeg', alt: 'Gallery photo B' },
      { src: '/images/gal-c.jpg', alt: 'Gallery photo C' },
      { src: '/images/gal-d.jpeg', alt: 'Gallery photo D' },
      { src: '/images/gal-e.jpg', alt: 'Gallery photo E' },
      { src: '/images/gal-f.jpg', alt: 'Gallery photo F' },
      { src: '/images/gal-g.jpeg', alt: 'Gallery photo G' },
      { src: '/images/gal-h.jpg', alt: 'Gallery photo H' },
    ],
    tracks: [
      {
        title: 'Finding Her',
        artist: 'Clinton Cerejo',
        src: '/audio/gal-song-a.mp3',
        cover: '/images/gal-a.jpeg',
      },
      {
        title: 'Humsafar',
        artist: 'Akhtar-Ebrahim',
        src: '/audio/gal-song-b.mp3',
        cover: '/images/gal-b.jpeg',
      },
      {
        title: 'Ishq Bulava',
        artist: 'Sartaj Khan',
        src: '/audio/gal-song-c.mp3',
        cover: '/images/gal-c.jpg',
      },
      {
        title: 'Jeene Laga Hoon',
        artist: 'Atif Aslam',
        src: '/audio/gal-song-d.mp3',
        cover: '/images/gal-d.jpeg',
      },
      {
        title: 'Khuda Jaane',
        artist: 'KK',
        src: '/audio/gal-song-e.mp3',
        cover: '/images/gal-e.jpg',
      },
      {
        title: 'Khud Ko Tere',
        artist: 'KK',
        src: '/audio/gal-song-f.mp3',
        cover: '/images/gal-f.jpg',
      },
      {
        title: 'Majboor',
        artist: 'Nikhil D Souza',
        src: '/audio/gal-song-g.mp3',
        cover: '/images/gal-g.jpeg',
      },
      {
        title: 'Labon Ko Labon Se',
        artist: 'KK',
        src: '/audio/gal-song-h.mp3',
        cover: '/images/gal-h.jpg',
      },
    ],
    closing: 'Tap the expand icon on any photo to see it full size.',
  },

  homeMemoriesTeaser: {
    title: 'Memories',
    lead: 'A dedicated page for longer chapters - start here, then open Memories when you are ready.',
    cta: { to: '/memories', label: 'Open the memories page' },
  },

  memoriesPage: {
    title: 'Memories',
    lead:
      'Humari 5 saal ki Memories',
    items: [
      {
        title: 'The First Chapter',
        date: meet.labelDisplay,
        body: 'The day our paths crossed and our story quietly began. Academy mein milte thay — the first thing I noticed was your niqab, and even today, your simplicity remains one of the most beautiful things about you ❤️',
        
        image: {
          src: '/images/memories-image-1.jpg',
          alt: 'Memory 1',
        },
        track: { title: 'Khat', artist: 'Bayaan', src: '/audio/memories-1.mp3' },
      },
      {
        title: 'Univeristy me Milna',
        date: '2 Nov 2025',
        body: 'Halal Date',
        image: {
          src: '/images/memories-image-2.jpg',
          alt: 'Memory 2',
        },
        track: { title: 'Tere Naina', artist: 'Shankar Mahadevan', src: '/audio/memories-2.mp3' },
      },
      {
        title: 'Laughter I still quote',
        date: 'Everyday',
        body: 'Aik dusry k sath dair tk Gossips krna Bht pasand hai',
        image: {
          src: '/images/memories-image-3.jpg',
          alt: 'Memory 3',
        },
        track: { title: 'Tu Chahye', artist: 'Atif Aslam', src: '/audio/memories-3.mp3' },
      },
      {
        title: 'Music and moods',
        date: '2022-24',
        body: 'Rave pe Songs sunana',
      },
      {
        title: 'Bht Secrets hain Hmary',
        date: 'Whenever we met',
        body: 'My Rio Pio Sio, I love you more than Anything Else in the World',
        image: {
          src: '/images/memories-image-4.jpg',
          alt: 'Memory 4',
        },
        track: { title: 'Love Nwantiti', artist: 'CKay', src: '/audio/memories-4.mp3' },
      },
      {
        title: 'Apki Muskurahatain',
        date: 'December 2024',
        body: 'Jb Hum Last time mily thy bht Khush thy aik dusry k sath or hmesha Rahain gy Inshallah',
      },
    ],
  },

  timeTogetherPage: {
    title: 'Time together',
    lead: `Every second since ${meet.labelDisplay}, counted for you.`,
    labels: {
      years: 'Years',
      months: 'Months',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    noteLines: [
      `This clock starts on ${meet.labelDisplay}. It currently begins at the start of that day Jb Humne Pehli bar aik dusry se baat ki thi.`,
      'Yeh Timer Hmesha mery Dil me mery Dimagh me or yahan Chlta rhy ga. Me Rhun ya na Rhun tum mujme kahin baki rehna',
    ],
  },

  contact: {
    id: 'contact',
    title: 'Send a Message',
    lead: 'Leave a message whenever you want.',
    cta: {
      href: '/contact',
      label: 'Send a Message',
    },
  },

  contactPage: {
    title: 'Contact',
    lead: 'One place for how the world can reach you - or how you can leave a surprise.',
    paragraphs: [
      "Use the button below as a starting point. Replace the email address in the site's content file with a real one, or swap it for a link to a form, playlist, or map.",
      'If you prefer no public contact at all, this section can be hidden later and you can keep messages only on the home page.',
    ],
  },

  footer: {
    line: siteName,
    finePrint: '© ' + new Date().getFullYear() + ' · Made with love, only for you',
  },
} as const