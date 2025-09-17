---
title: Maintenance & Releases
description: Comprehensive information about TuyaOpen maintenance frequency, SDK releases, platform support, roadmaps, and release notes
---

# Maintenance & Releases

This page provides comprehensive information about TuyaOpen's maintenance schedule, release cycles, platform support, and development roadmap.

## Maintenance Schedule

### TuyaOpen Core Platform

TuyaOpen follows a structured maintenance schedule to ensure reliability and continuous improvement:

- **Active Development**: Continuous development with daily commits
- **Bug Fixes**: Critical bugs are addressed within 24-48 hours
- **Security Updates**: Security patches are released within 72 hours of discovery
- **Feature Updates**: New features are released on a bi-weekly basis
- **Major Releases**: Quarterly major version releases with significant new features

### Multi-Platform Support

Our multi-platform approach ensures consistent experience across different operating systems:

| Platform | Maintenance Frequency | Support Level |
|----------|----------------------|---------------|
| **Linux** | Daily updates | Full Support |
| **Windows** | Weekly updates | Full Support |
| **macOS** | Bi-weekly updates | Beta Support |

## SDK Releases

### Arduino SDK

The TuyaOpen Arduino SDK provides seamless integration for Arduino-based projects:

- **Release Frequency**: Monthly stable releases
- **Beta Releases**: Weekly beta releases for testing
- **LTS Versions**: Long-term support versions released every 6 months
- **Compatibility**: Supports Arduino IDE 1.8.x and 2.x

**Recent Releases:**
- v2.1.3 (Latest Stable) - December 2024
- v2.2.0-beta.1 (Beta) - January 2025
- v2.0.5 (LTS) - June 2024

### Lua SDK

The Lua SDK enables rapid prototyping and development:

- **Release Frequency**: Bi-weekly releases
- **Hotfixes**: Critical fixes released within 48 hours
- **Documentation**: Updated with each release

**Recent Releases:**
- v1.8.2 (Latest) - January 2025
- v1.8.1 - December 2024
- v1.7.9 - November 2024

### C/C++ SDK

The core C/C++ SDK forms the foundation of TuyaOpen:

- **Release Frequency**: Weekly releases
- **Stability**: Production-ready releases monthly
- **Performance**: Continuous optimization and benchmarking

**Recent Releases:**
- v3.2.1 (Latest Stable) - January 2025
- v3.3.0-beta.2 (Beta) - January 2025
- v3.1.8 (LTS) - September 2024

## Platform Support Schedule

### Chip Platform Support

Our chip platform support is regularly updated and maintained:

| Chip Platform | Support Status | Update Frequency | Next Major Update |
|---------------|----------------|------------------|-------------------|
| **BK7231N** | ✅ Active | Monthly | Q2 2025 |
| **ESP32 Series** | ✅ Active | Bi-weekly | Q1 2025 |
| **LN882H** | ✅ Active | Monthly | Q2 2025 |
| **T2/T3** | ✅ Active | Monthly | Q1 2025 |
| **T5AI** | ✅ Active | Weekly | Q1 2025 |
| **RISC-V** | 🚧 Beta | Bi-weekly | Q2 2025 |
| **ARM Cortex-M** | 🚧 Beta | Monthly | Q3 2025 |

### Hardware Compatibility

- **New Hardware Support**: Added monthly based on community requests
- **Legacy Support**: Maintained for 2 years after last production use
- **Testing**: All platforms undergo automated testing before release

## Development Roadmap

### Q1 2025 (January - March)

**Core Platform:**
- Enhanced AI inference engine performance
- Improved multi-threading support
- Advanced debugging tools

**SDK Updates:**
- Arduino SDK v2.3.0 with new sensor libraries
- Lua SDK v1.9.0 with improved memory management
- C/C++ SDK v3.4.0 with enhanced networking stack

**Platform Support:**
- Full macOS support
- Enhanced Windows compatibility
- New RISC-V platform support

### Q2 2025 (April - June)

**AI & Machine Learning:**
- On-device training capabilities
- Enhanced computer vision APIs
- Voice recognition improvements

**Cloud Integration:**
- Tuya Cloud Service v2.0
- Enhanced OTA update system
- Improved device management

**Developer Experience:**
- New development tools
- Enhanced documentation
- Improved debugging capabilities

### Q3 2025 (July - September)

**Performance & Optimization:**
- Memory usage optimization
- Power consumption improvements
- Real-time performance enhancements

**Security:**
- Enhanced encryption protocols
- Improved authentication systems
- Security audit tools

### Q4 2025 (October - December)

**Ecosystem Expansion:**
- Third-party library integration
- Plugin system development
- Community contribution tools

**Enterprise Features:**
- Advanced monitoring tools
- Enterprise-grade security
- Professional support services

## Release Notes

### TuyaOpen Core

#### v3.2.1 (January 15, 2025)
**New Features:**
- Enhanced AI inference engine with 30% performance improvement
- New multi-threading APIs for better concurrency
- Improved memory management system

**Bug Fixes:**
- Fixed memory leak in network stack
- Resolved GPIO interrupt handling issue
- Corrected timer precision on ESP32 platforms

**Security Updates:**
- Updated TLS implementation to version 1.3
- Enhanced authentication protocols
- Fixed potential buffer overflow in JSON parser

#### v3.2.0 (December 20, 2024)
**Major Features:**
- Complete rewrite of networking stack
- New device discovery protocol
- Enhanced OTA update system

**Improvements:**
- 50% reduction in boot time
- Improved WiFi connection stability
- Enhanced error reporting system

### TuyaAI Platform

#### v2.1.0 (January 10, 2025)
**AI Enhancements:**
- New voice recognition models with 95% accuracy
- Enhanced natural language processing
- Improved image classification algorithms

**New APIs:**
- Real-time speech-to-text conversion
- Advanced computer vision capabilities
- Multi-modal AI processing

**Performance:**
- 40% faster inference on T5AI platform
- Reduced memory footprint by 25%
- Optimized for edge computing scenarios

#### v2.0.5 (December 5, 2024)
**Stability Improvements:**
- Fixed memory management issues
- Improved error handling
- Enhanced logging system

**New Features:**
- Support for custom AI models
- Enhanced debugging tools
- Improved documentation

### Tuya Cloud Service

#### v1.8.2 (January 8, 2025)
**Cloud Features:**
- New device management dashboard
- Enhanced analytics and reporting
- Improved API rate limiting

**Security:**
- Enhanced data encryption
- Improved access control
- New audit logging system

**Performance:**
- 30% faster API response times
- Improved scalability
- Enhanced monitoring tools

#### v1.8.1 (December 15, 2024)
**Improvements:**
- Better error handling and reporting
- Enhanced device synchronization
- Improved user interface

**Bug Fixes:**
- Fixed device registration issues
- Resolved data synchronization problems
- Corrected API authentication bugs

## Support and Maintenance

### Community Support
- **Discord**: Real-time community support
- **GitHub Issues**: Bug reports and feature requests
- **Documentation**: Comprehensive guides and tutorials
- **Forums**: Community discussions and Q&A

### Professional Support
- **Enterprise Support**: 24/7 technical support for enterprise customers
- **Custom Development**: Tailored solutions for specific requirements
- **Training**: Professional training and certification programs
- **Consulting**: Expert consultation for complex implementations

### Maintenance Windows
- **Scheduled Maintenance**: Every Sunday 2:00-4:00 AM UTC
- **Emergency Maintenance**: As needed for critical issues
- **Planned Downtime**: 48-hour advance notice for major updates

## Getting Updates

### Automatic Updates
- **OTA Updates**: Automatic over-the-air updates for supported devices
- **SDK Updates**: Notifications for new SDK releases
- **Security Patches**: Automatic security updates

### Manual Updates
- **GitHub Releases**: Download latest releases from GitHub
- **Package Managers**: Updates via npm, pip, and other package managers
- **Direct Download**: Manual download from official website

### Release Notifications
- **Email Newsletter**: Monthly newsletter with updates and announcements
- **GitHub Watch**: Watch repositories for release notifications
- **Social Media**: Follow official accounts for real-time updates

---

*Last updated: January 2025*

*For the most current information, please visit our [GitHub repository](https://github.com/tuya/TuyaOpen) or join our [Discord community](https://discord.gg/cbGrBjx7).*
