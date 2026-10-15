import type { Project } from "~/lib/types";
import { gitleaf } from "./gitleaf";
import { pokepedia } from "./pokepedia";
import { punyChat } from "./puny-chat";
import { quantLab } from "./quant-lab";
import { urCheck } from "./ur-check";
import { urManager } from "./ur-manager";
import { urMcp } from "./ur-mcp";

// To add a project: create a folder next to these with an index.ts
// (and its screenshots), then add it to this list.
export const projects: Project[] = [urCheck, punyChat, gitleaf, quantLab, pokepedia, urManager, urMcp];
