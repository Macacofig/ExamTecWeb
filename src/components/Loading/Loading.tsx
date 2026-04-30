import styles from './Loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Cargando...</span>
        </div>
    );
}
