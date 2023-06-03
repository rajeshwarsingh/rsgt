import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import 'expo-dev-client';
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize, AppOpenAd } from 'react-native-google-mobile-ads';

import config from '../config';
const { banner, interstitial, openApp } = config.admobAds;

const interstitialAds = InterstitialAd.createForAdRequest(interstitial, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export function BannerAds() {

  return (
    <View style={styles.container}>
      <BannerAd
        size={BannerAdSize.BANNER}
        // unitId={banner}
        unitId={TestIds.BANNER}
      />
    </View>
  );
}

export async function OpenApp() {

  const adUnitId = 'openApp';

  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  // Preload an app open ad
  appOpenAd.load();

  // Show the app open ad when user brings the app to the foreground.
  appOpenAd.show();
}

export function InterstitialAds() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitialAds.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitialAds.show();
    });

    // Start loading the interstitialAds straight away
    interstitialAds.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  // return (
  //   <Button
  //     title="Show Interstitial"
  //     onPress={() => {
  //       interstitialAds.show();
  //     }}
  //   />
  // );
  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
