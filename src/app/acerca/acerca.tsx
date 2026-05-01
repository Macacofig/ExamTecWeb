import styles from './acerca.module.scss';

export default function Acerca() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Acerca del Proyecto</h1>
                
                <p className={styles.description}>
                    La <strong>Biblioteca Inteligente</strong> es una plataforma desarrollada para explorar, buscar y guardar libros favoritos. Utiliza el poder de la API pública de Open Library para ofrecer resultados precisos en tiempo real, garantizando una experiencia de usuario rápida y fluida.
                </p>

                <div className={styles.techStack}>
                    <h2>Stack Tecnológico</h2>
                    <ul>
                        <li>Next.js 14</li>
                        <li>React (App Router)</li>
                        <li>TypeScript</li>
                        <li>SCSS Modules</li>
                        <li>Open Library API</li>
                    </ul>
                </div>

                <div className={styles.team}>
                    <h2>Desarrolladores</h2>
                    <p>Creado como proyecto de examen para la materia de Tecnologías Web. Optimizado para alto rendimiento y responsividad.</p>
                </div>
            </div>
        </div>
    );
}
