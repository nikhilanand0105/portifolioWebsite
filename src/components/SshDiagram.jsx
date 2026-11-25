import styles from './SshDiagram.module.css';

const NODES = [
  {
    step: '01',
    title: 'Access request',
    detail: 'Admin submits target IP + user via authenticated session & RBAC check',
  },
  {
    step: '02',
    title: 'Flask REST API',
    detail: 'Derives KEK from admin password (PBKDF2) to unwrap AES-CBC DEK & key',
  },
  {
    step: '03',
    title: 'Credential store & queue',
    detail: 'Encrypted keys + access state persisted; provisioning job dispatched',
  },
  {
    step: '04',
    title: 'Ansible playbook',
    detail: 'grant.yml updates /etc/ssh/sshd_config TrustedUserCAKeys & reloads sshd',
  },
];

export function SshDiagram() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={`${styles.eyebrow} mono`}>Shared provisioning pipeline</span>
          <h3 className={styles.title}>Access request → Flask → Ansible fleet</h3>
        </div>
        <div className={styles.timingPill}>
          <span className={`${styles.before} mono`}>~20 min manual</span>
          <span aria-hidden="true">→</span>
          <span className={`${styles.after} mono`}>~30 s automated</span>
        </div>
      </div>

      <ol className={styles.flowList} aria-label="SSH Manager provisioning architecture flow">
        {NODES.map((node, index) => (
          <li key={node.step} className={styles.node}>
            <div className={styles.nodeHead}>
              <span className={`${styles.stepNum} mono`}>{node.step}</span>
              <span className={styles.nodeTitle}>{node.title}</span>
            </div>
            <p className={styles.nodeDetail}>{node.detail}</p>
            {index < NODES.length - 1 && (
              <span className={styles.connector} aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className={styles.fleetFooter}>
        <span className={`${styles.fleetChip} mono`}>5+ target servers</span>
        <span className={`${styles.fleetChip} mono`}>25 users</span>
        <span className={`${styles.fleetChip} mono`}>TrustedUserCAKeys</span>
      </div>
    </div>
  );
}
