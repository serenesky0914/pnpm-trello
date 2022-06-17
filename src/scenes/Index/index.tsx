import { Status, useJobsQuery } from "../../generated/graphql";
import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useWindowDimensions from './hooks/useWindowDimensions';

export function Index() {
  const { data, loading } = useJobsQuery({ pollInterval: 1000 });
  const { height, width } = useWindowDimensions();
  var maxBarHight = { height: (height?height*1-70: 500) };

  if (!data && loading) {
    return <div>…</div>;
  }

  if (!data) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <Column>
        <SimpleBar style={maxBarHight}>
          {data.jobs
            .filter((it) => it.status === Status.ToDo)
            .map((it) => (
              <Card {...it} />
            ))}
        </SimpleBar>
      </Column>
      <Column>
        <SimpleBar style={maxBarHight}>
          {data.jobs
            .filter((it) => it.status === Status.InProgress)
            .map((it) => (
              <Card {...it} />
            ))}
        </SimpleBar>
      </Column>
      <Column>
        <SimpleBar style={maxBarHight}>
          {data.jobs
            .filter((it) => it.status === Status.Done)
            .map((it) => (
              <Card {...it} />
            ))}
        </SimpleBar>
      </Column>
    </div>
  );
}
