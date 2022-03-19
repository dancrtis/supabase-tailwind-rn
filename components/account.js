import { Pressable, SafeAreaView, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../lib/supabase';

export default function Account({ session }) {
  const tailwind = useTailwind();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  console.debug(session);

  return (
    <SafeAreaView style={tailwind('w-full h-full flex items-center justify-center')}>
      <Text style={tailwind('text-3xl')}>Hey, {session.user.user_metadata.full_name} 👋</Text>
      <Text style={tailwind('text-lg mt-4')}>See the console to see the session object.</Text>

      <Pressable onPress={() => signOut()}>
        <Text style={tailwind('text-blue-600 text-lg mt-24')}>
          Sign Out <Ionicons name="ios-chevron-forward" size={16} />
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
