export default {
  expo: {
    name: "push-salesforce",
    slug: "push-salesforce",
    scheme: "push-salesforce-centomapp",
    platforms: ["ios", "android"],
    version: "1.3.9",
    orientation: "default",
    icon: "./assets/logo-app-store.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/centom_logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.optec.centom.public",
      supportsTablet: false,
      buildNumber: "1.3.9",
      config: {
        usesNonExemptEncryption: false,
      },
      requireFullScreen: true,
    },
    android: {
      package: "com.optec.centom.app",
      versionCode: 14,
      adaptiveIcon: {
        foregroundImage: "./assets/optec-logo-c.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/optec-logo-c.png",
    },
    description: "",
    extra: {
      eas: {
        projectId: "06cb889c-4f95-40ff-8726-d4f2c27e57f7",
      },
    },
  },
};
