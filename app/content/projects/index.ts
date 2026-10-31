import type { Project } from "~/lib/types";
import { diagramPolish } from "./diagram-polish";
import { gitleaf } from "./gitleaf";
import { henryWallet } from "./henry-wallet";
import { homeServer3d } from "./home-server-3d";
import { pokepedia } from "./pokepedia";
import { punyChat } from "./puny-chat";
import { tradingLab } from "./trading-lab";
import { urCheck } from "./ur-check";
import { urManager } from "./ur-manager";
import { urMcp } from "./ur-mcp";

// To add a project: create a folder next to these with an index.ts
// (and its screenshots), then add it to this list.
export const projects: Project[] = [urCheck, punyChat, gitleaf, tradingLab, pokepedia, diagramPolish, urManager, urMcp, henryWallet, homeServer3d];
