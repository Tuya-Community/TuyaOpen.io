/**
 * web-serial tool — public surface.
 *
 * Drop these into any page or MDX doc:
 *   import { SerialConsole, DeviceAuth, FirmwareFlasher } from '@site/src/components/web-serial'
 *   <DeviceAuth variant="minimal" />        // compact, for docs
 *   <FirmwareFlasher variant="minimal" />   // compact, for docs
 *   <SerialConsole variant="full" />        // full panel
 */
export { default as SerialConsole } from './SerialConsole'
export { default as DeviceAuth } from './DeviceAuth'
export { default as FirmwareFlasher } from './FirmwareFlasher'
