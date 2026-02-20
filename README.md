# AegisOTA

A local-first, high-concurrency firmware deployment system for ESP32 devices. AegisOTA enables developers to discover, manage, and flash firmware to fleets of devices simultaneously via a standalone desktop executable.

## Features

- **Zero-Config Discovery**: Automatic device detection using mDNS TXT records (hostname, IP, current version)
- **Concurrent Deployment**: Stream firmware binaries to multiple devices in parallel with non-blocking I/O
- **Resilient Partitioning**: Dual-OTA partitions with SHA-256 verification and automatic rollback on failure
- **Audit Trail**: Persistent SQLite logging of all deployment attempts
- **Local-First**: No cloud dependencies, external servers, or internet required

## Tech Stack

_\*Development Phase - Constantly Updated!_
| Layer | Technologies |
| ---------------- | ------------------------------------------ |
| **Backend** | Node.js, TypeScript, SQLite, multicast-dns |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **Firmware** | C++, ESP-IDF, ESPmDNS |
| **Distribution** | pkg (single-binary executable) |

## Project Structure

_Planned structure for monorepo:_

```
aegis-ota/
├── apps/
│   ├── dashboard/        # React (Vite) + TypeScript Frontend
│   └── server/           # Node.js + TypeScript Backend
├── packages/
│   ├── firmware-lib/     # C++ Library (ESP-IDF/Arduino) for ESP32
│   └── shared-types/     # Common TS interfaces
└── build/                # Packaged executable (via pkg)
```

## Prerequisites

- **Node.js** 18+ and **npm** 9+
- **TypeScript** 5+
- **Git** for version control
- (Optional) **Arduino CLI** or **ESP-IDF** for firmware development


## Quick Start

### Installation & Usage

1. Download the latest AegisOTA executable from the [releases page](https://github.com/yourusername/AegisOTA/releases)

2. Run the executable:

```bash
./AegisOTA
```

The application will launch and:

- Start the backend server (typically on `http://localhost:3000`)
- Automatically open the frontend dashboard in your browser (typically on `http://localhost:5173`)

3. Begin discovering and managing your ESP32 devices!

For detailed usage instructions, refer to the [User Guide](#user-guide).

### Development

To run the dashboard (Vite app) for development:

```bash
pnpm --filter dashboard run dev
```

This will start the Vite development server for the dashboard app. Open your browser to [http://localhost:5173](http://localhost:5173) to view the dashboard.

You can also run backend and other packages similarly using pnpm workspace filters.

## The Aegis Protocol

### Handshake Flow

```
1. Discovery
   ESP32 broadcasts _aegis-ota._tcp mDNS service

2. Trigger (Server → Device)
   Server sends deployment JSON:
   {
     "url": "http://<server_ip>:<port>/firmware.bin",
     "hash": "SHA256_CHECKSUM",
     "version": "v2.0.0"
   }

3. Flash (Device → Server)
   Device streams binary in 4KB chunks
   → Verifies SHA-256 hash
   → Swaps OTA partitions
   → Reboots with new firmware
```

## Architecture Overview

AegisOTA uses a push-pull model:

1. **Server (Push)**: Detects devices via mDNS, sends deployment requests
2. **Device (Pull)**: Receives request, streams firmware from server, verifies, flashes, reboots

This design ensures:

- Minimal device-side complexity
- Efficient concurrent deployments
- Reliable rollback mechanism
- Complete audit trail

## Contributing

TODO: Add contribution guidelines

## License

TODO: Specify license (MIT, Apache 2.0, etc.)

## Support

For issues, feature requests, or questions, please open an issue on the repository.
