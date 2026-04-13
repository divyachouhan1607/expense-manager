import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.kharchasaathi.app',
  appName: 'Kharcha Saathi',
  webDir: 'out',
  server: {
    url: 'https://kharcha-saathi.vercel.app',
    cleartext: false
  },
  plugins: {
    SocialLogin: {
      providers: {
        google: true,
        facebook: false,
        apple: false,
        twitter: false
      }
    }
  }
};

export default config;
