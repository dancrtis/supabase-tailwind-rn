import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';

import utilities from './tailwind.json';
import { supabase } from './lib/supabase';
import Auth from './components/auth';
import Account from './components/account';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <View>{!session ? <Auth /> : <Account key={session.user.id} session={session} />}</View>
    </TailwindProvider>
  );
}
