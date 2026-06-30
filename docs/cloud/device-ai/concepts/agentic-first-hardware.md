---
title: Agentic-First Hardware
---

Agentic-first hardware is a device built around an **AI agent as its primary interface** — instead of buttons, menus, and a companion app, the user states what they want and the device figures out how to do it. The agent perceives (voice, vision, sensors), reasons (in the cloud), and acts (through the device's own functions). This page explains the shift, the problem it solves, and what it makes possible.

## The problem with app-first devices

For a decade, "smart" hardware meant *app-first*: every device shipped a companion app, and the user adapted to the device.

- **The user does the translation.** People must learn each device's menu tree and map their intent ("make it cozy in here") onto specific controls (dim to 30%, set warm white, close the blinds).
- **Capabilities are siloed.** A feature only exists if someone designed a screen for it. Combining two features means building a third screen.
- **Every product reinvents the interface.** App design, onboarding, and settings are rebuilt per device, and they age badly.
- **The device can't improve after it ships.** Its behavior is frozen in firmware; new capabilities require a new UI.

The result is friction. Most "smart" features go unused because finding them costs more than the benefit.

## The agentic shift

Agentic-first inverts the relationship: **the device adapts to the user.** The user expresses intent in natural language (or gesture, or context), and an AI agent decides which of the device's capabilities to invoke.

![App-first devices make the user learn menus to reach fixed controls; agentic-first devices route user intent through an AI agent to the device's capabilities](/e38296de-2d84-4614-823c-14f3c564f07f.png)

The interface is no longer a screen — it is a conversation plus the device's own senses. The device's job is to expose what it *can do*; the agent's job is to decide what to do *now*.

## What this solves

- **Zero learning curve.** "I'm cold," "read me a story," "what am I looking at?" — no manual, no menu diving.
- **Capabilities compose.** The agent chains tools it was never explicitly scripted to combine, so new behavior emerges without new UI.
- **One interface across a fleet.** A lamp, a speaker, and a toy can share the same conversational front end and the same cloud agent.
- **The device gets smarter after it ships.** Reasoning, voice, knowledge, and skills live in the cloud agent and improve without a firmware change.

## How TuyaOpen makes a device agentic

TuyaOpen splits the work between a tight, real-time **device** layer and a powerful **cloud** layer, bridged by the AI agent:

- **The device** captures audio and vision, runs the chat modes, plays the reply, and exposes its functions as tools. See the [Component Framework](../ai-components/ai-components) and [Multimodal data flow](../multimodal-data-flow).
- **The cloud agent** handles speech recognition, reasoning, language, and skills, and decides which device tools to call.
- **MCP** is the contract between them: the device publishes its capabilities as [device MCP tools](designing-device-mcp-tools), and the agent calls them.

The design rule that follows: **expose capabilities, not flows.** You give the agent a vocabulary of things the device can do; you do not script every interaction.

## Design principles

- **Expose capabilities as tools.** Wrap each meaningful device function as one MCP tool with a clear, intent-named description. The agent orchestrates; you don't hardcode sequences.
- **Split by latency.** Anything that must feel instant (capturing speech, stopping playback when the user interrupts) stays on the device. Anything that needs knowledge or reasoning goes to the cloud.
- **Be voice-first, not voice-only.** Lead with conversation, but keep a screen, an LED, or a tone for state and fallback. See [Voice-first design](voice-first-design).
- **Fail gracefully and observably.** When the network drops or a tool fails, the device should say so and stay usable. Trust comes from honest behavior.
- **Keep the human in control.** Make actions interruptible, make state visible, and keep destructive actions explicit.

## The potential

Agentic-first hardware turns a single-purpose product into an open-ended one. A desk companion that started as a chatbot can gain vision, music, reminders, and home control as cloud skills — on the same hardware. The ceiling is no longer the UI you shipped; it is the set of tools you exposed and the reasoning the cloud keeps improving.

For concrete directions, see [What agentic hardware unlocks](real-world-use-cases).

## See also

- [Voice-first design](voice-first-design) — designing the conversation
- [Designing device MCP tools](designing-device-mcp-tools) — giving the agent capabilities
- [What agentic hardware unlocks](real-world-use-cases) — real-world problems it solves
- [Multimodal data flow](../multimodal-data-flow) — how the device perceives and responds
