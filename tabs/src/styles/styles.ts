import { makeStyles, shorthands } from "@fluentui/react-components";

export const colStyles = makeStyles({
    col: {
      height: '600px',
      float: 'left',
      width: '32%',
      backgroundColor: 'transparent',
      ...shorthands.padding('10px'),
      ...shorthands.overflow('hidden'),
      ':hover' : {
        overflowY: 'auto'
      }
    }
  });