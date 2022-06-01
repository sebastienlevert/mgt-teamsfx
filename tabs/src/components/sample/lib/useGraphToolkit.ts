import { useEffect, useState } from 'react';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { app } from "@microsoft/teams-js";
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme } from '@fluentui/react-components';

export function useGraphToolkit(): {
  isSignedIn: boolean;
  teamsTheme: Theme;
  toolkitTheme: string;
  teamsThemeString: string;
} {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [toolkitTheme, setToolkitTheme] = useState<string>("mgt-light");
  const [inTeams, setInTeams] = useState<boolean | undefined>(undefined);
  const [teamsTheme, setTeamsTheme] = useState<Theme>(teamsLightTheme);
  const [teamsThemeString, setTeamsThemeString] = useState<string>("default");

  const updateState = () => {
    let provider = Providers.globalProvider;
    setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
  };

  const themeChangeHandler = (theme: string | undefined) => {
    setTeamsThemeString(theme || "default");
    switch (theme) {
        case "dark":
          setToolkitTheme("mgt-dark");
          setTeamsTheme(teamsDarkTheme);
          break;
        case "contrast":
          setToolkitTheme("mgt-dark");
          setTeamsTheme(teamsHighContrastTheme);
          break;
        case "default":
        default:
          setToolkitTheme("mgt-light");
          setTeamsTheme(teamsLightTheme);
    }
  };

  useEffect(() => {
    Providers.onProviderUpdated(updateState);
    app.initialize().then(() => {
      setInTeams(true);
      app.getContext().then((context) => {
        themeChangeHandler(context.app.theme);
      })
      app.registerOnThemeChangeHandler(themeChangeHandler);
    }).catch(() => {      
      setInTeams(false);
    });
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return { isSignedIn: isSignedIn, teamsTheme: teamsTheme, toolkitTheme: toolkitTheme, teamsThemeString: teamsThemeString  };
}