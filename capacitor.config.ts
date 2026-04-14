import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.kharchasaathi.app',
  appName: 'Kharcha Saathi',
  webDir: 'capacitor-app',
  server: {
    url: 'https://kharcha-saathi.vercel.app',
    allowNavigation: ['kharcha-saathi.vercel.app'],
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
