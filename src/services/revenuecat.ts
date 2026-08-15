import Purchases from 'react-native-purchases';
import type {Plan} from '../types/editor';
export async function configureRevenueCat(userId:string,platform:'ios'|'android'){const key=platform==='ios'?process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY:process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY;if(!key)throw new Error('RevenueCat public SDK key missing');Purchases.configure({apiKey:key,appUserID:userId});}
export async function currentPlan():Promise<Plan>{const info=await Purchases.getCustomerInfo();if(info.entitlements.active.ultra)return 'ultra';if(info.entitlements.active.pro)return 'pro';return 'free';}
