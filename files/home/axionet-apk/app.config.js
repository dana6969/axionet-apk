export default {
  expo: {
    name: "Axionet",
    slug: "axionet",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    android: {
      versionCode: 1,
      package: "com.dana6969.axionet"
    },
    ios: {
      bundleIdentifier: "com.dana6969.axionet"
    },
    userInterfaceStyle: "dark",
    assetBundlePatterns: ["**/*"],
    runtimeVersion: {
      policy: "sdkVersion"
    },
    owner: "dman6969",
    extra: {
      eas: {
        projectId: "e60340c9-58a4-4c15-ae31-1060cb3bc53c"
      }
    }
  }
};
