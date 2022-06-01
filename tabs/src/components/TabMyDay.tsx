import { makeStyles, Subtitle1, shorthands } from "@fluentui/react-components";
import { Agenda, Todo } from "@microsoft/mgt-react";
import { colStyles } from "../styles/styles";

export default function TabMyDay() {
  const classes = colStyles();
  return (  
    <div>
      <div className={classes.col}>
        <Subtitle1 block>My Agenda</Subtitle1>
        <Agenda />
      </div>
      <div className={classes.col}>
        <Subtitle1 block>My Tasks</Subtitle1>
        <Todo />
      </div>      
    </div>
  );
}
