import type {ExportSettings,Plan,Project} from '../types/editor';
import {limits,planRank} from '../subscription/plans';
const rank={480:0,720:1,1080:2,2000:3,4000:4};
const value=(r:ExportSettings['resolution'])=>r==='480p'?480:r==='720p'?720:r==='1080p'?1080:r==='2k'?2000:4000;
export function assertExportAllowed(plan:Plan,settings:ExportSettings){if(rank[value(settings.resolution) as keyof typeof rank]>rank[value(limits[plan].maxResolution) as keyof typeof rank])throw new Error(`${settings.resolution} export requires a higher plan`);if(!limits[plan].fps.includes(settings.fps))throw new Error(`${settings.fps} FPS requires Ultra`);}
export function estimateFileSizeMb(project:Project,settings:ExportSettings){const pixels=value(settings.resolution);const quality={low:.6,medium:1,high:1.8,maximum:3}[settings.quality];return Math.ceil((project.duration/60)*pixels*quality*(settings.fps/30));}
export async function exportProject(project:Project,settings:ExportSettings,plan:Plan,onProgress:(p:number)=>void){assertExportAllowed(plan,settings);for(const p of [0,.2,.45,.7,.9,1])onProgress(p);return {uri:`file://exports/${project.id}.mp4`,sizeMb:estimateFileSizeMb(project,settings)};}
