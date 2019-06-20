import React from "react";
import styles from "./topnav.css";

export default function LoggedInUserDisplay(props: LoggedInUserDisplayProps) {
  const [currentSession, setCurrentSession] = React.useState(null);

  React.useEffect(() => {
    var requestString = `/openmrs/ws/rest/v1/session`;

    fetch(requestString)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch session - server responded with '${resp.status}'`
          );
        }
      })
      .then(resp => {
        setCurrentSession(resp);
      });
  }, []);

  return (
    <a href="/openmrs/spa">
      <i className="fa fa-user text-primary"> </i>
      {currentSession && currentSession.user ? (
        <span className={styles.user}>{currentSession.user.display}</span>
      ) : (
        <span>-</span>
      )}
    </a>
  );
}

type LoggedInUserDisplayProps = {};
