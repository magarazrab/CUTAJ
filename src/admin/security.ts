import {requiredPlan} from '../subscription/plans';
import type {Plan} from '../types/editor';
export interface AdminUser{id:string;role:'admin'|'user';blocked:boolean;plan:Plan}
export function assertAdmin(user:AdminUser){if(user.role!=='admin')throw new Error('Admin privileges required');if(user.blocked)throw new Error('Account is blocked');}
export function premiumDecision(plan:Plan,feature:string){const needed=requiredPlan(feature);return {allowed:needed==='free'||needed===plan||(needed==='pro'&&plan==='ultra'),needed};}
