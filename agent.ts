import { LlmAgent, ParallelAgent, SkillToolset, loadAllSkillsInDir } from "@google/adk";
// TODO import tools from `tools.ts`

export const rootAgent = new LlmAgent({
	name: "traivel_agent",
	model: "gemini-2.5-flash",
	description: "...",
	instruction: "...",
});

// TODO Load agent skills
// ...

// TODO Sub-agent 1
// ...

// TODO Sub-agent 2
// ...

// TODO Parallel Sub-Agents
// ...
