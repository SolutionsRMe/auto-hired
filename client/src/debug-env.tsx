// Debug component to check environment variables
import React from 'react';

export default function DebugEnv() {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;
  
  console.log('Debug Firebase env vars:');
  console.log('API Key:', apiKey ? 'EXISTS' : 'MISSING');
  console.log('Project ID:', projectId ? 'EXISTS' : 'MISSING');
  console.log('App ID:', appId ? 'EXISTS' : 'MISSING');
  
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
      <h3>Firebase Environment Variables Debug</h3>
      <p>API Key: {apiKey ? 'SET' : 'NOT SET'}</p>
      <p>Project ID: {projectId ? 'SET' : 'NOT SET'}</p>
      <p>App ID: {appId ? 'SET' : 'NOT SET'}</p>
    </div>
  );
}