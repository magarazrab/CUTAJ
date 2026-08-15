import {create} from 'zustand';
import type {Project} from '../types/editor';
interface EditorState{project?:Project;undo:Project[];redo:Project[];setProject:(p:Project)=>void;commit:(p:Project)=>void;undoOnce:()=>void;redoOnce:()=>void}
export const useEditorStore=create<EditorState>((set,get)=>({
 undo:[],redo:[],
 setProject:(p:Project)=>set({project:p}),
 commit:(p:Project)=>set((s:EditorState)=>({project:p,undo:s.project?[...s.undo,s.project]:s.undo,redo:[]})),
 undoOnce:()=>{const s=get();const prev=s.undo.at(-1);if(prev&&s.project)set({project:prev,undo:s.undo.slice(0,-1),redo:[s.project,...s.redo]});},
 redoOnce:()=>{const s=get();const next=s.redo[0];if(next&&s.project)set({project:next,redo:s.redo.slice(1),undo:[...s.undo,s.project]});}
}));
