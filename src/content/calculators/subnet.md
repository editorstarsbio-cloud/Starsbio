## About the Subnet Calculator

A **subnet calculator** is an essential networking tool for IT professionals, network engineers, and students learning TCP/IP networking. It breaks down an IP address and subnet mask to reveal the network address, broadcast address, valid host range, and total number of usable hosts.

---

## How IPv4 Subnetting Works

IPv4 addresses are 32-bit numbers written as four octets (e.g., 192.168.1.0). A subnet mask (written in CIDR notation as /24) determines which portion is the **network address** and which is the **host address**.

**CIDR /24** means the first 24 bits are the network. That leaves 8 bits for hosts:
$$ \text{Host bits} = 32 - \text{prefix} $$
$$ \text{Total addresses} = 2^{\text{host bits}} = 2^8 = 256 $$
$$ \text{Usable hosts} = 2^{\text{host bits}} - 2 = 254 $$

*(Subtract 2 for network address and broadcast address)*

**Example for 192.168.10.0/24:**
- Network Address: 192.168.10.0
- Broadcast Address: 192.168.10.255
- First usable host: 192.168.10.1
- Last usable host: 192.168.10.254
- Total usable hosts: 254

---

## Common CIDR Subnet Sizes

| CIDR | Subnet Mask | Usable Hosts |
|:---|:---|:---|
| /30 | 255.255.255.252 | 2 |
| /29 | 255.255.255.248 | 6 |
| /28 | 255.255.255.240 | 14 |
| /24 | 255.255.255.0 | 254 |
| /16 | 255.255.0.0 | 65,534 |
| /8 | 255.0.0.0 | 16,777,214 |

---

## Frequently Asked Questions

**What is a /30 subnet used for?**
A /30 subnet provides exactly 2 usable host addresses. It is the standard subnet size for point-to-point links between two routers, where you only need addresses for two endpoints.

**What is the difference between public and private IP addresses?**
Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are reserved for internal networks and cannot be routed on the public internet. Devices use NAT (Network Address Translation) to access the internet through a single public IP address.
