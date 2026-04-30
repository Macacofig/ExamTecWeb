import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className={styles.errorContainer}>
            <p>{message}</p>
        </div>
    );
}
