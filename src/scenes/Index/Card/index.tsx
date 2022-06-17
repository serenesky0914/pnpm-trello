import { DateTime } from "luxon";

import { JobsQuery } from "../../../generated/graphql";
import { shortString } from "../../../modules/limit-string-length";

import styles from "./styles.module.css";

type Props = Omit<JobsQuery["jobs"][number], "__typename">;

export function Card({ name, id, status, createdAt }: Props) {
  var statusColor;
  switch (status) {
    case "IN_PROGRESS": statusColor = styles.progressColor; break;
    case "DONE": statusColor = styles.doneColor; break;
    default: statusColor = styles.todoColor; break;
  }
  return (
    <article className={`${styles.container} ${styles.cardboard}`}>
      <h1 className={styles.title} title={id}>
        {/* {shortString(id)} */}
        {name}
      </h1>
      <div className={styles.flex}>
        <div className={styles.subtitle}>
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(DateTime.fromISO(createdAt).toJSDate())}
        </div>
        <div className={statusColor}>{status}</div>
      </div>
    </article>
  );
}
