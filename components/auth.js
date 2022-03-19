import { Ionicons } from '@expo/vector-icons';
import { startAsync, makeRedirectUri } from 'expo-auth-session';
import { SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useTailwind } from 'tailwind-rn';

import { supabase } from '../lib/supabase';
import { supabaseUrl } from '../lib/supabase-keys';

export default function Auth() {
  const tailwind = useTailwind();

  const signInWithApple = async () => {
    const returnUrl = makeRedirectUri({ useProxy: false });
    const provider = 'apple';
    const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${returnUrl}`;

    const response = await startAsync({ authUrl, returnUrl });

    if (!response || !response.params?.refresh_token) {
      return;
    }

    await supabase.auth.signIn({
      refreshToken: response.params.refresh_token
    });
  };

  return (
    <SafeAreaView style={tailwind('w-full h-full flex items-center justify-center')}>
      <Text style={tailwind('text-4xl font-black text-center mb-16')}>
        Supabase Tailwind Starter
      </Text>

      <Button
        icon={<Ionicons name="logo-apple" size={18} color="white" style={{ marginRight: 4 }} />}
        title="Sign in with Apple"
        onPress={() => signInWithApple()}
        buttonStyle={{
          backgroundColor: 'black',
          borderRadius: 20
        }}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10
        }}
      />
    </SafeAreaView>
  );
}
