module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "Leapstar Billing",
        artifactName: "leapstar-billing.${ext}",
        publish: ["github"],
        mac: {
          hardenedRuntime: true,
          entitlements: "build/entitlements.mac.plist",
          entitlementsInherit: "build/entitlements.mac.plist",
        },
        afterSign: "scripts/notarize.js",
        dmg: {
          sign: false,
        },
      },
    },
  },
};
