import { useEffect, useState } from "react";
import { useTeamsFx } from "./sample/lib/useTeamsFx";
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { TeamsFxProvider } from '@microsoft/mgt-teamsfx-provider';
import { TeamsFx } from "@microsoft/teamsfx";
import { Login, Person, ViewType } from "@microsoft/mgt-react";
import { useGraphToolkit } from "./sample/lib/useGraphToolkit";
import { Button, TabList, Tab, TabValue, SelectTabEvent, SelectTabData, makeStyles, mergeClasses } from "@fluentui/react-components";
import TabMyDay from "./TabMyDay";

const hubStyles = makeStyles({
  root: {
    height: '100%'
  }
});

export default function OneProductivityHub() {
  const { isSignedIn, toolkitTheme } = useGraphToolkit();
  const [ scopes ] = useState<string[]>([
    'User.Read',
    'User.Read.All', 
    'Files.Read.All',
    'Calendars.Read',
    'Tasks.ReadWrite',
    'People.Read'
  ]);
  const [selectedValue, setSelectedValue] = useState<TabValue>('tab-my-day');

  const [ teamsFx ] = useState<TeamsFx>(new TeamsFx());

  const initGraphToolkit = async () => {
    const provider = new TeamsFxProvider(teamsFx, scopes);
    Providers.globalProvider = provider;
  }

  const checkIsConsentNeeded = async () => {
    let consentNeeded = false;
    try {
      await teamsFx.getCredential().getToken(scopes);
    } catch (error) {
      consentNeeded = true;
    }

    Providers.globalProvider.setState(consentNeeded ? ProviderState.SignedOut : ProviderState.SignedIn);    
  }

  const loginClick = async () => {
    await teamsFx.login(scopes);
    Providers.globalProvider.setState(ProviderState.SignedIn);
  }

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  useEffect(() => {
    initGraphToolkit();
    checkIsConsentNeeded();
  }, []);
  
  const classes = hubStyles();
  return (  
    <div className={mergeClasses(toolkitTheme, classes.root)}>
      { !isSignedIn && (
        // Should be a nice "Welcome Screen" with permissions request
        <Button appearance="primary" onClick={loginClick}>Authorize</Button>
      )}
        
      { isSignedIn && (
        <>
          Welcome <Person personQuery="me" view={ViewType.threelines} />
          <TabList defaultSelectedValue="tab-my-day" onTabSelect={onTabSelect}>
            <Tab value="tab-my-day">My Day</Tab>
            <Tab value="tab-my-conversations">My Conversations</Tab>
            <Tab value="tab-my-teams">My Teams</Tab>
            <Tab value="tab-my-files">My Files</Tab>
          </TabList>
          <div>
            {selectedValue === 'tab-my-day' && <TabMyDay />}
            {selectedValue === 'tab-my-conversations' && <div>My Conversations</div>}
            {selectedValue === 'tab-my-teams' && <div>My Teams</div>}
            {selectedValue === 'tab-my-files' && <div>My Teams</div>}
          </div>
          
        </>
      )}
    </div>
  );
}
