declare const process:{env:Record<string,string|undefined>};
declare module 'react' { const React: unknown; export default React; }
declare module 'react/jsx-runtime' { export const jsx: unknown; export const jsxs: unknown; export const Fragment: unknown; }
declare namespace JSX { interface IntrinsicElements { [elemName: string]: unknown } }
declare module 'react-native' { export const SafeAreaView: any; export const Text: any; export const View: any; }
declare module '@supabase/supabase-js' { export function createClient(url:string,key:string): any; }
declare module 'react-native-purchases' { const Purchases:any; export default Purchases; }
declare module 'zustand' { export function create<T>(initializer:(set:(partial:Partial<T>|((state:T)=>Partial<T>))=>void,get:()=>T)=>T):(selector?:unknown)=>T; }
