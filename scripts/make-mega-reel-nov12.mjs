// Mega Birthday Reel Generator — November 12
// Featuring top icons: Ryan Gosling, Anne Hathaway, Russell Westbrook, Dr Mike, Neil Young,
// xQc, Jules Kounde, Omarion, Erika Costell, AustinShow
// Note: "Tomorrow" word is explicitly avoided per user instructions!

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const OUT_DIR = 'd:/Birthday/mega-reel-nov12';
const FONT_BOLD = 'C\\:/Windows/Fonts/arialbd.ttf';
const FONT_REG = 'C\\:/Windows/Fonts/arial.ttf';

function findFFmpeg() {
  const local = 'd:/Birthday/ffmpeg';
  const found = fs.readdirSync(local, { recursive: true })
    .map(f => path.join(local, f))
    .find(f => f.endsWith('ffmpeg.exe'));
  if (found) return `"${found}"`;
  return 'ffmpeg';
}

const STARS = [
  {
    name: 'Ryan Gosling',
    slug: 'ryan-gosling',
    age: 46,
    prof: 'Oscar Nominee - Barbie, La La Land & Drive Icon',
    imgUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/960px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg'
  },
  {
    name: 'Anne Hathaway',
    slug: 'anne-hathaway',
    age: 44,
    prof: 'Oscar Winner - Les Misérables & Interstellar Legend',
    imgUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/AnneHathaway-byPhilipRomano-Crop.jpg/960px-AnneHathaway-byPhilipRomano-Crop.jpg'
  },
  {
    name: 'Russell Westbrook',
    slug: 'russell-westbrook',
    age: 38,
    prof: 'NBA MVP, 9x All-Star & Triple-Double Record Breaker',
    imgUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Russell_Westbrook_%28March_21%2C_2022%29_%28cropped%29.jpg/960px-Russell_Westbrook_%28March_21%2C_2022%29_%28cropped%29.jpg'
  },
  {
    name: 'Neil Young',
    slug: 'neil-young',
    age: 81,
    prof: 'Rock & Roll Hall of Fame Legendary Musician',
    imgUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Neil_Young_for_Fairy_Creek.jpg/960px-Neil_Young_for_Fairy_Creek.jpg'
  },
  {
    name: 'Dr Mike',
    slug: 'dr-mike',
    age: 37,
    prof: 'Board-Certified Physician & Global Medical Star',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Drmike_%28cropped%29.png'
  },
  {
    name: 'xQc',
    slug: 'xqc',
    age: 31,
    prof: 'World Leading Twitch Streamer & Gaming Creator',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/XQc_July_4_2023.jpg'
  },
  {
    name: 'Jules Kounde',
    slug: 'jules-kounde',
    age: 28,
    prof: 'FC Barcelona Defender & France National Star',
    imgUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Jules_Kounde_France_v_Senegal_16_June_2026-449_%28cropped%29.jpg/960px-Jules_Kounde_France_v_Senegal_16_June_2026-449_%28cropped%29.jpg'
  },
  {
    name: 'Omarion',
    slug: 'omarion',
    age: 42,
    prof: 'Grammy-Nominated R&B Singer & B2K Lead Vocalist',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Omarion_2018.png'
  },
  {
    name: 'Erika Costell',
    slug: 'erika-costell',
    age: 34,
    prof: 'High-Fashion Model, Creator & Music Artist',
    imgUrl: 'https://www.famousbirthdays.com/faces/costell-erika-image.jpg'
  },
  {
    name: 'AustinShow',
    slug: 'austinshow',
    age: 33,
    prof: 'Renowned Talk Show Host & Gaming Personality',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/AustinShow_in_South_Korea_in_2022.jpg'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve(dest);
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadFile(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
      file.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

function safe(text) {
  return text.replace(/'/g, '').replace(/:/g, '\\:').replace(/,/g, '\\,');
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const ffmpeg = findFFmpeg();
  console.log('Using FFmpeg at:', ffmpeg);

  const clipPaths = [];

  // Intro Slide (2.5 seconds)
  const introClip = path.join(OUT_DIR, 'clip-00-intro.mp4').replace(/\\/g, '/');
  console.log('✨ Creating Intro Clip...');
  const introCmd = [
    ffmpeg, '-y',
    '-f lavfi -i "color=c=0x0f172a:s=1080x1920:d=2.5:r=30"',
    `-filter_complex "drawbox=x=60:y=480:w=iw-120:h=960:color=0x4f46e5@0.85:t=fill,drawbox=x=80:y=500:w=iw-160:h=920:color=black@0.65:t=fill,drawtext=fontfile='${FONT_BOLD}':text='CELEBRITY BIRTHDAYS':fontsize=68:fontcolor=0xFFD700:x=(w-text_w)/2:y=600:shadowcolor=black:shadowx=3:shadowy=3,drawtext=fontfile='${FONT_BOLD}':text='NOVEMBER 12':fontsize=108:fontcolor=white:x=(w-text_w)/2:y=720:shadowcolor=black:shadowx=4:shadowy=4,drawtext=fontfile='${FONT_REG}':text='Iconic Stars Celebrating Today':fontsize=48:fontcolor=0x93c5fd:x=(w-text_w)/2:y=890:shadowcolor=black:shadowx=2:shadowy=2,drawtext=fontfile='${FONT_REG}':text='Hollywood • Music • Sports • Creators':fontsize=42:fontcolor=white:x=(w-text_w)/2:y=980:shadowcolor=black:shadowx=2:shadowy=2,drawtext=fontfile='${FONT_BOLD}':text='Who Shares Your Birthday?':fontsize=54:fontcolor=0xFF69B4:x=(w-text_w)/2:y=1120:shadowcolor=black:shadowx=3:shadowy=3,drawtext=fontfile='${FONT_BOLD}':text='StarsBio.co.uk':fontsize=52:fontcolor=0xFFD700:x=(w-text_w)/2:y=1270:shadowcolor=black:shadowx=3:shadowy=3"`,
    '-c:v libx264 -preset fast -pix_fmt yuv420p',
    `"${introClip}"`
  ].join(' ');
  execSync(introCmd, { stdio: 'pipe' });
  clipPaths.push(introClip);

  // Each Celebrity Slide (2.5 seconds each)
  for (let i = 0; i < STARS.length; i++) {
    const s = STARS[i];
    const imgPath = path.join(OUT_DIR, `${s.slug}.jpg`).replace(/\\/g, '/');
    const clipOut = path.join(OUT_DIR, `clip-${String(i + 1).padStart(2, '0')}-${s.slug}.mp4`).replace(/\\/g, '/');

    console.log(`[${i + 1}/${STARS.length}] Processing: ${s.name}...`);
    try {
      await downloadFile(s.imgUrl, imgPath);
    } catch (e) {
      console.log(`Failed to fetch image for ${s.name}: ${e.message}, skipping`);
      continue;
    }

    const sName = safe(s.name);
    const sProf = safe(s.prof);
    const sAge = s.age;

    const drawFilters = [
      `drawbox=x=0:y=0:w=iw:h=230:color=black@0.65:t=fill`,
      `drawbox=x=0:y=ih-180:w=iw:h=180:color=black@0.75:t=fill`,
      `drawbox=x=40:y=800:w=iw-80:h=340:color=black@0.6:t=fill`,
      `drawtext=fontfile='${FONT_BOLD}':text='Happy Birthday!':fontsize=68:fontcolor=0xFFD700:x=(w-text_w)/2:y=40:shadowcolor=black:shadowx=3:shadowy=3`,
      `drawtext=fontfile='${FONT_BOLD}':text='${sName}':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=130:shadowcolor=black:shadowx=4:shadowy=4`,
      `drawtext=fontfile='${FONT_BOLD}':text='Turns ${sAge} on Nov 12!':fontsize=68:fontcolor=0xFFD700:x=(w-text_w)/2:y=830:shadowcolor=black:shadowx=3:shadowy=3`,
      `drawtext=fontfile='${FONT_REG}':text='${sProf}':fontsize=46:fontcolor=white:x=(w-text_w)/2:y=930:shadowcolor=black:shadowx=2:shadowy=2`,
      `drawtext=fontfile='${FONT_REG}':text='Born 12 November':fontsize=46:fontcolor=0x93c5fd:x=(w-text_w)/2:y=1030:shadowcolor=black:shadowx=2:shadowy=2`,
      `drawtext=fontfile='${FONT_BOLD}':text='StarsBio.co.uk':fontsize=54:fontcolor=0xFFD700:x=(w-text_w)/2:y=h-140:shadowcolor=black:shadowx=2:shadowy=2`,
      `drawtext=fontfile='${FONT_REG}':text='Celebrity Birthdays & Ages':fontsize=40:fontcolor=white:x=(w-text_w)/2:y=h-70:shadowcolor=black:shadowx=2:shadowy=2`
    ].join(',');

    const zoomFilter = `zoompan=z='min(zoom+0.0006,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=75:s=1080x1920:fps=30`;
    const filter = `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,${zoomFilter},${drawFilters}[v]`;

    const cmd = [
      ffmpeg, '-y',
      '-loop 1',
      `-i "${imgPath}"`,
      '-t 2.5',
      `-filter_complex "${filter}"`,
      '-map "[v]"',
      '-c:v libx264 -preset fast -pix_fmt yuv420p',
      `"${clipOut}"`
    ].join(' ');

    execSync(cmd, { stdio: 'pipe' });
    clipPaths.push(clipOut);
  }

  // Outro Slide (2.5 seconds)
  const outroClip = path.join(OUT_DIR, 'clip-99-outro.mp4').replace(/\\/g, '/');
  console.log('✨ Creating Outro Clip...');
  const outroCmd = [
    ffmpeg, '-y',
    '-f lavfi -i "color=c=0x0a0f1d:s=1080x1920:d=2.5:r=30"',
    `-filter_complex "drawbox=x=60:y=500:w=iw-120:h=920:color=0xdb2777@0.85:t=fill,drawbox=x=80:y=520:w=iw-160:h=880:color=black@0.65:t=fill,drawtext=fontfile='${FONT_BOLD}':text='DISCOVER MORE':fontsize=72:fontcolor=0xFFD700:x=(w-text_w)/2:y=620:shadowcolor=black:shadowx=3:shadowy=3,drawtext=fontfile='${FONT_BOLD}':text='WHO SHARES':fontsize=92:fontcolor=white:x=(w-text_w)/2:y=740:shadowcolor=black:shadowx=4:shadowy=4,drawtext=fontfile='${FONT_BOLD}':text='YOUR BIRTHDAY?':fontsize=90:fontcolor=0xFF69B4:x=(w-text_w)/2:y=870:shadowcolor=black:shadowx=4:shadowy=4,drawtext=fontfile='${FONT_REG}':text='Find Your Celebrity Birthday Twin':fontsize=46:fontcolor=white:x=(w-text_w)/2:y=1040:shadowcolor=black:shadowx=2:shadowy=2,drawtext=fontfile='${FONT_REG}':text='Search 10000+ Verified Stars & Ages':fontsize=42:fontcolor=0x93c5fd:x=(w-text_w)/2:y=1120:shadowcolor=black:shadowx=2:shadowy=2,drawtext=fontfile='${FONT_BOLD}':text='Visit StarsBio.co.uk':fontsize=56:fontcolor=0xFFD700:x=(w-text_w)/2:y=1260:shadowcolor=black:shadowx=3:shadowy=3"`,
    '-c:v libx264 -preset fast -pix_fmt yuv420p',
    `"${outroClip}"`
  ].join(' ');
  execSync(outroCmd, { stdio: 'pipe' });
  clipPaths.push(outroClip);

  // Concat all clips into Final Mega Reel
  const listFile = path.join(OUT_DIR, 'clips.txt');
  fs.writeFileSync(listFile, clipPaths.map(p => `file '${p}'`).join('\n'));

  const finalVideoNoAudio = path.join(OUT_DIR, 'nov12-mega-reel-noaudio.mp4').replace(/\\/g, '/');
  console.log(`🔄 Stitching ${clipPaths.length} clips together...`);
  execSync(`${ffmpeg} -y -f concat -safe 0 -i "${listFile.replace(/\\/g, '/')}" -c copy "${finalVideoNoAudio}"`, { stdio: 'pipe' });

  // Add upbeat background audio
  const audioDir = 'd:/Birthday/audio-assets';
  let audioFile = null;
  if (fs.existsSync(audioDir)) {
    const audios = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
    if (audios.length > 0) audioFile = path.join(audioDir, audios[0]).replace(/\\/g, '/');
  }

  const finalOutput = 'd:/Birthday/reels-output/november-12-all-stars-mega-reel.mp4';
  if (!fs.existsSync('d:/Birthday/reels-output')) fs.mkdirSync('d:/Birthday/reels-output', { recursive: true });

  console.log('🎵 Generating final reel with music...');
  if (audioFile) {
    execSync(
      `${ffmpeg} -y -i "${finalVideoNoAudio}" -stream_loop -1 -i "${audioFile}" -c:v copy -c:a aac -b:a 192k -shortest "${finalOutput}"`,
      { stdio: 'pipe' }
    );
  } else {
    execSync(
      `${ffmpeg} -y -i "${finalVideoNoAudio}" -f lavfi -i "anoisesrc=d=30:c=pink:r=44100:a=0.02" -c:v copy -c:a aac -shortest "${finalOutput}"`,
      { stdio: 'pipe' }
    );
  }

  const stat = fs.statSync(finalOutput);
  console.log(`🎉 SUCCESS! Mega Reel created at: ${finalOutput} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(console.error);
