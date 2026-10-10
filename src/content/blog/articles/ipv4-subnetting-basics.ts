import type { Article } from '../types';

export const article: Article = {
  slug: 'ipv4-subnetting-basics',
  title: 'Understanding IPv4 Subnetting Basics',
  description: 'A factual guide to IPv4 subnetting, exploring subnet masks, CIDR notation, and how networks are divided.',
  category: 'technology',
  author: 'Technical Staff',
  published: '2025-02-15T00:00:00Z',
  status: 'published',
  relatedCalculators: ['subnet-calculator', 'ip-calculator'],
  tags: ['networking', 'ipv4', 'subnetting', 'cidr'],
  body: [
    { type: 'p', text: 'An IPv4 address consists of 32 bits, typically represented as four decimal numbers separated by periods. These 32 bits are divided into two main parts: a network identifier and a host identifier. Subnetting is the practice of dividing a single large network into multiple smaller, manageable networks. This division improves network performance, enhances security, and conserves available IP addresses by minimizing wasted space.' },
    { type: 'h2', text: 'The Role of Subnet Masks' },
    { type: 'p', text: 'A subnet mask determines where the network portion ends and the host portion begins. Like an IP address, a subnet mask is a 32-bit number. In binary representation, a series of contiguous ones indicates the network portion, followed by a series of zeros representing the host portion. When an IP address is combined with its subnet mask using a bitwise AND operation, the result yields the network address.' },
    { type: 'p', text: 'For example, the default subnet mask for a Class C network is 255.255.255.0. In binary form, this translates to twenty-four ones followed by eight zeros. The eight bits allocated to the host allow for 256 theoretical addresses. However, since the first address represents the network itself and the last address functions as the broadcast address, the actual number of usable host addresses is 254.' },
    { type: 'h2', text: 'Classless Inter-Domain Routing (CIDR)' },
    { type: 'p', text: 'Traditional IP classes restricted network sizes to specific rigid boundaries. CIDR notation was introduced to provide flexibility. Instead of using predefined classes, CIDR represents the subnet mask by appending a slash and the number of network bits to the end of the IP address.' },
    { type: 'p', text: 'A notation like 192.168.1.0/24 indicates that the first 24 bits are dedicated to the network. This directly corresponds to the 255.255.255.0 subnet mask. Using CIDR notation simplifies routing tables and makes IP allocation highly efficient. You can specify a /26 network to allocate exactly 64 addresses (62 usable), rather than wasting a full /24 block when only a few hosts exist.' },
    { type: 'h3', text: 'Calculating Subnets' },
    { type: 'p', text: 'To calculate the number of possible subnets and hosts, you rely on two fundamental formulas based on the number of bits borrowed for subnetting and the bits left for hosts. If you borrow "n" bits from the host portion, you create 2^n subnets.' },
    { type: 'formula', text: 'Subnets = 2^n' },
    { type: 'p', text: 'To determine the number of usable hosts per subnet, you count the remaining host bits "h" and subtract two.' },
    { type: 'formula', text: 'Usable Hosts = 2^h - 2' },
    { type: 'note', text: 'Always remember to subtract two from the total host capacity to account for the network address and the broadcast address.' },
    { type: 'p', text: 'Subnetting requires careful planning. Network administrators must evaluate current device counts while reserving space for future expansion. Proper address allocation prevents IP conflicts and reduces broadcast traffic across the entire local area network.' }
  ]
};
