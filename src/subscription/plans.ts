import type {ExportResolution,Plan} from '../types/editor';
export const products={PRO_MONTHLY:'pro_monthly',PRO_YEARLY:'pro_yearly',ULTRA_MONTHLY:'ultra_monthly',ULTRA_YEARLY:'ultra_yearly'} as const;
export const planRank:Record<Plan,number>={free:0,pro:1,ultra:2};
export const limits:Record<Plan,{projects:number;maxResolution:ExportResolution;fps:ReadonlyArray<24|30|60>;cloudGb:number;features:string[]}>={
 free:{projects:5,maxResolution:'720p',fps:[24,30],cloudGb:1,features:['trim','split','crop','basicSpeed','basicText','basicFilters','basicTransitions','export720p']},
 pro:{projects:100,maxResolution:'1080p',fps:[24,30],cloudGb:25,features:['keyframes','advancedAudio','chromaKey','masks','overlays','premiumTemplates','limitedAi','export1080p']},
 ultra:{projects:Number.POSITIVE_INFINITY,maxResolution:'4k',fps:[24,30,60],cloudGb:250,features:['export4k','hsl','curves','lut','allEffects','allTransitions','allFilters','aiCaptions','backgroundRemoval','smartEditing','priorityProcessing']}
};
export function hasFeature(plan:Plan,feature:string){return (['free','pro','ultra'] as Plan[]).filter(p=>planRank[p]<=planRank[plan]).some(p=>limits[p].features.includes(feature));}
export function requiredPlan(feature:string):Plan{return hasFeature('free',feature)?'free':hasFeature('pro',feature)?'pro':'ultra';}
