import React from 'react';
import {SafeAreaView,Text,View} from 'react-native';
import {theme} from '../config/theme';
export function App(){return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.void}}><View style={{padding:24}}><Text style={{color:theme.colors.cyan,fontSize:32,fontWeight:'800'}}>NebulaCut</Text><Text style={{color:'white',marginTop:12}}>Cosmic mobile video studio with real timeline state, subscription gates, Supabase sync hooks, and export pipeline.</Text></View></SafeAreaView>}
