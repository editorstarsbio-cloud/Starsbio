import { CalculatorDef, CalcError } from '../lib/calc/types';
import { num, round, hms, gcd, assert } from '../lib/calc/helpers';

export const technologyCalculators: CalculatorDef[] = [
  {
    id: 'download-time',
    name: 'Download Time Calculator',
    slug: 'download-time',
    category: 'technology',
    status: 'published',
    short: 'Calculate the time required to download a file based on size and internet speed.',
    inputs: [
      { key: 'size', label: 'File Size', type: 'number', default: 10 },
      {
        key: 'sizeUnit',
        label: 'Size Unit',
        type: 'select',
        options: [
          { value: 'MB', label: 'Megabytes (MB)' },
          { value: 'GB', label: 'Gigabytes (GB)' },
          { value: 'TB', label: 'Terabytes (TB)' },
        ],
        default: 'GB',
      },
      { key: 'speed', label: 'Internet Speed', type: 'number', default: 100 },
      {
        key: 'speedUnit',
        label: 'Speed Unit',
        type: 'select',
        options: [
          { value: 'Mbps', label: 'Megabits per second (Mbps)' },
          { value: 'MBps', label: 'Megabytes per second (MB/s)' },
          { value: 'Gbps', label: 'Gigabits per second (Gbps)' },
        ],
        default: 'Mbps',
      },
    ],
    formula: 'Time = File Size / Internet Speed (converted to identical units)',
    intro: [
      'This calculator estimates how long a file download will take based on the file size and your internet connection speed.',
      'Remember that internet speeds are typically advertised in bits per second (like Mbps), while file sizes are in bytes (like MB). There are 8 bits in a byte.',
    ],
    compute: (values) => {
      const size = num(values.size);
      const speed = num(values.speed);
      assert(size >= 0, 'File size cannot be negative.');
      assert(speed > 0, 'Speed must be greater than zero.');

      let sizeInBytes = 0;
      switch (values.sizeUnit) {
        case 'MB':
          sizeInBytes = size * 1024 * 1024;
          break;
        case 'GB':
          sizeInBytes = size * 1024 * 1024 * 1024;
          break;
        case 'TB':
          sizeInBytes = size * 1024 * 1024 * 1024 * 1024;
          break;
      }

      let speedInBytesPerSecond = 0;
      switch (values.speedUnit) {
        case 'Mbps':
          speedInBytesPerSecond = (speed * 1000 * 1000) / 8;
          break;
        case 'MBps':
          speedInBytesPerSecond = speed * 1000 * 1000;
          break;
        case 'Gbps':
          speedInBytesPerSecond = (speed * 1000 * 1000 * 1000) / 8;
          break;
      }

      const seconds = sizeInBytes / speedInBytesPerSecond;

      return {
        results: [
          { label: 'Download Time', value: hms(seconds), primary: true },
          { label: 'Total Seconds', value: round(seconds, 1), unit: 's' },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { size: 10, sizeUnit: 'GB', speed: 100, speedUnit: 'Mbps' },
      },
    ],
  },
  {
    id: 'subnet',
    name: 'Subnet Calculator',
    slug: 'subnet',
    category: 'technology',
    status: 'published',
    short: 'Calculate network parameters like usable hosts and subnet mask from a CIDR prefix.',
    inputs: [
      { key: 'cidr', label: 'CIDR Prefix (/X)', type: 'number', default: 24, min: 0, max: 32, integer: true },
    ],
    formula: 'Number of Hosts = 2^(32 - CIDR) - 2',
    intro: [
      'This tool calculates basic IPv4 subnet parameters such as the number of total and usable IP addresses based on the CIDR prefix.',
      'The usable host count subtracts the network and broadcast addresses.',
    ],
    compute: (values) => {
      const cidr = num(values.cidr);
      assert(cidr >= 0 && cidr <= 32 && Number.isInteger(cidr), 'CIDR prefix must be an integer between 0 and 32.');

      const totalIps = Math.pow(2, 32 - cidr);
      const usableHosts = cidr <= 30 ? totalIps - 2 : 0;
      
      let mask = 0xffffffff ^ ((1 << (32 - cidr)) - 1);
      if (cidr === 0) mask = 0; // Fix bitwise overflow for /0
      
      const octet1 = (mask >>> 24) & 255;
      const octet2 = (mask >>> 16) & 255;
      const octet3 = (mask >>> 8) & 255;
      const octet4 = mask & 255;
      
      const maskStr = `${octet1}.${octet2}.${octet3}.${octet4}`;

      return {
        results: [
          { label: 'Usable Hosts', value: usableHosts, primary: true },
          { label: 'Total IP Addresses', value: totalIps },
          { label: 'Subnet Mask', value: maskStr },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { cidr: 24 },
        expect: { 'Usable Hosts': 254 },
      },
      {
        name: '/32',
        inputs: { cidr: 32 },
        expect: { 'Usable Hosts': 0, 'Total IP Addresses': 1 },
      }
    ],
  },
  {
    id: 'video-file-size',
    name: 'Video File Size Estimator',
    slug: 'video-file-size',
    category: 'technology',
    status: 'published',
    short: 'Estimate the file size of a video based on its bitrate and duration.',
    inputs: [
      { key: 'bitrate', label: 'Video Bitrate (Mbps)', type: 'number', default: 5 },
      { key: 'duration', label: 'Duration (minutes)', type: 'number', default: 60 },
    ],
    formula: 'File Size (MB) = (Bitrate (Mbps) × Duration (s)) / 8',
    intro: [
      'This calculator estimates the final file size of a video given its average bitrate and total duration.',
      'Bitrate represents the amount of data processed per second of video. Higher bitrates yield better quality but larger files.',
    ],
    compute: (values) => {
      const bitrate = num(values.bitrate);
      const duration = num(values.duration);
      assert(bitrate >= 0, 'Bitrate must be positive.');
      assert(duration >= 0, 'Duration must be positive.');

      // bitrate in Megabits per second
      const seconds = duration * 60;
      const sizeMB = (bitrate * seconds) / 8;
      const sizeGB = sizeMB / 1024;

      return {
        results: [
          { label: 'Estimated Size (MB)', value: round(sizeMB, 2), unit: 'MB', primary: true },
          { label: 'Estimated Size (GB)', value: round(sizeGB, 3), unit: 'GB' },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { bitrate: 5, duration: 60 },
      },
    ],
  },
  {
    id: 'screen-ppi',
    name: 'Screen PPI Calculator',
    slug: 'screen-ppi',
    category: 'technology',
    status: 'published',
    short: 'Calculate the pixels per inch (PPI) of a display based on its resolution and size.',
    inputs: [
      { key: 'width', label: 'Width (pixels)', type: 'number', default: 1920, integer: true },
      { key: 'height', label: 'Height (pixels)', type: 'number', default: 1080, integer: true },
      { key: 'diagonal', label: 'Diagonal Size (inches)', type: 'number', default: 15.6 },
    ],
    formula: 'PPI = √(Width² + Height²) / Diagonal Size',
    intro: [
      'Pixels Per Inch (PPI) is a measure of display pixel density.',
      'A higher PPI means smaller pixels and a sharper image, provided the viewing distance remains constant.',
    ],
    compute: (values) => {
      const width = num(values.width);
      const height = num(values.height);
      const diagonal = num(values.diagonal);
      
      assert(width > 0 && height > 0, 'Resolution must be positive.');
      assert(diagonal > 0, 'Diagonal size must be positive.');

      const diagonalPixels = Math.sqrt(width * width + height * height);
      const ppi = diagonalPixels / diagonal;

      return {
        results: [
          { label: 'Pixels Per Inch (PPI)', value: round(ppi, 2), primary: true },
          { label: 'Total Pixels', value: width * height },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { width: 1920, height: 1080, diagonal: 15.6 },
      },
    ],
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio Calculator',
    slug: 'aspect-ratio',
    category: 'technology',
    status: 'published',
    short: 'Calculate the aspect ratio of a screen or image based on its width and height.',
    inputs: [
      { key: 'width', label: 'Width', type: 'number', default: 1920, integer: true },
      { key: 'height', label: 'Height', type: 'number', default: 1080, integer: true },
    ],
    formula: 'Aspect Ratio = Width / Height, simplified by their Greatest Common Divisor (GCD).',
    intro: [
      'The aspect ratio describes the proportional relationship between the width and height of an image or screen.',
      'Common aspect ratios include 16:9 for modern video and 4:3 for traditional photography.',
    ],
    compute: (values) => {
      const width = num(values.width);
      const height = num(values.height);
      assert(width > 0 && height > 0, 'Dimensions must be positive.');

      const divisor = gcd(width, height);
      const ratioW = width / divisor;
      const ratioH = height / divisor;

      return {
        results: [
          { label: 'Aspect Ratio', value: `${ratioW}:${ratioH}`, primary: true },
          { label: 'Decimal Ratio', value: round(width / height, 3) },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { width: 1920, height: 1080 },
        expect: { 'Aspect Ratio': '16:9' },
      },
    ],
  },
  {
    id: 'battery-life',
    name: 'Battery Life Estimator',
    slug: 'battery-life',
    category: 'technology',
    status: 'published',
    short: 'Estimate how long a battery will last based on its capacity and device power consumption.',
    inputs: [
      { key: 'capacity', label: 'Battery Capacity (mAh)', type: 'number', default: 4000 },
      { key: 'consumption', label: 'Device Consumption (mA)', type: 'number', default: 200 },
    ],
    formula: 'Battery Life = Capacity (mAh) / Consumption (mA)',
    intro: [
      'This tool estimates the runtime of a battery-powered device.',
      'Actual battery life will often be lower due to battery degradation, temperature, and varying power consumption.',
    ],
    compute: (values) => {
      const capacity = num(values.capacity);
      const consumption = num(values.consumption);
      assert(capacity > 0, 'Capacity must be positive.');
      assert(consumption > 0, 'Consumption must be positive.');

      const hours = capacity / consumption;

      return {
        results: [
          { label: 'Estimated Battery Life', value: round(hours, 2), unit: 'hours', primary: true },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { capacity: 4000, consumption: 200 },
        expect: { 'Estimated Battery Life': 20 },
      },
    ],
  },
  {
    id: 'storage-usage',
    name: 'Storage Usage Calculator',
    slug: 'storage-usage',
    category: 'technology',
    status: 'published',
    short: 'Calculate free space and percentage of storage used on a drive.',
    inputs: [
      { key: 'capacity', label: 'Total Capacity (GB)', type: 'number', default: 256 },
      { key: 'used', label: 'Used Storage (GB)', type: 'number', default: 100 },
    ],
    formula: 'Free Space = Total Capacity - Used Storage',
    intro: [
      'Quickly find out how much space is left on your hard drive, SSD, or phone.',
      'Note that formatted capacities are often slightly lower than advertised due to OS formatting and system overhead.',
    ],
    compute: (values) => {
      const capacity = num(values.capacity);
      const used = num(values.used);
      assert(capacity > 0, 'Total capacity must be positive.');
      assert(used >= 0, 'Used storage cannot be negative.');
      assert(used <= capacity, 'Used storage cannot exceed total capacity.');

      const free = capacity - used;
      const percentageUsed = (used / capacity) * 100;
      const percentageFree = (free / capacity) * 100;

      return {
        results: [
          { label: 'Free Space (GB)', value: round(free, 2), unit: 'GB', primary: true },
          { label: 'Used Space (%)', value: round(percentageUsed, 1), unit: '%' },
          { label: 'Free Space (%)', value: round(percentageFree, 1), unit: '%' },
        ],
      };
    },
    tests: [
      {
        name: 'Default values',
        inputs: { capacity: 256, used: 100 },
      },
    ],
  },
];
