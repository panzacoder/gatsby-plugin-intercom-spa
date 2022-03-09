const isEnabled = () =>
  (window.IntercomIncludeInDevelopment ||
    process.env.NODE_ENV === `production`) &&
  typeof Intercom === `function` &&
  window.IntercomAppId;

exports.onInitialClientRender = () => {
  console.log("initial render");
  if (!isEnabled()) {
    return;
  }

  console.log("is enabled");

  window.Intercom("boot", {
    app_id: window.IntercomAppId,
    hide_default_launcher: window.HideDefaultLauncher,
    custom_launcher_selector: window.CustomLauncherSelector,
  });
};

exports.onRouteUpdate = function ({ location }) {
  if (!isEnabled()) {
    return;
  }

  window.Intercom("update");
};
