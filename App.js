import { useState, useEffect } from 'react';
import { View } from 'react-native';

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
    <View className="container">
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </View>
  );
}
