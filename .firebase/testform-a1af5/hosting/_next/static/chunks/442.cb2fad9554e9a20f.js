"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[442,827],{5442:function(e,t,a){a.r(t);var s=a(7437),n=a(2265),r=a(5186),u=a(6827);t.default=e=>{let{onAuthentication:t}=e,[a,i]=(0,n.useState)(null),o=async()=>{let e=(0,r.getAuth)(u.app),a=new r.hJ;try{await e.signOut(),a.setCustomParameters({prompt:"select_account"});let s=await (0,r.rh)(e,a);if(s.user.email.endsWith("@scu.edu"))t(s.user);else throw await e.signOut(),Error("Please use an @scu.edu email address to sign in.")}catch(e){console.error("Error signing in:",e.message),i(e.message),t(null)}};return(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:o,className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",children:"Sign in with Google"}),a&&(0,s.jsx)("p",{className:"text-red-500 mt-2",children:a})]})}},6827:function(e,t,a){a.d(t,{app:function(){return i},db:function(){return o}});var s=a(5236),n=a(7175),r=a(9842),u=a(5186);let i=(0,s.ZF)({apiKey:"AIzaSyCMHt3G12-LCo9l3wmzNrlXu9jbFnkXYuQ",authDomain:"testform-a1af5.firebaseapp.com",projectId:"testform-a1af5",storageBucket:"testform-a1af5.appspot.com",messagingSenderId:"477651890963",appId:"1:477651890963:web:84b7e4cda8f92901dbe0e6",measurementId:"G-42NEZHV2ZZ"});(0,n.IH)(i);let o=(0,r.ad)(i);new u.hJ}}]);