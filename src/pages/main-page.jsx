import { Button, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { isTrainingInProgress } from "../services/workout-service";

const styles = {
    container: {
        padding: '16px',
    },
    templatesSection: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
    },
    templateCard: {
        backgroundColor: '#1a1a1a',
        color: '#00ff00',
        border: '1px solid #00ff00',
        flex: '0 0 auto',
        cursor: 'pointer',
    }
}

export const MainPage = () => {
    const navigate = useNavigate();
    const templates = ['Сила', 'Мобильность']; // TODO: load components

    return (
        <div style={styles.container}>
            <Flex gap="middle" vertical>
                <Button
                    style={styles.mainButton}
                    onClick={() => navigate('/workouts')}>
                    Старые тренировки
                </Button>
                <Button
                    style={styles.mainButton}
                    onClick={() => navigate('/workout')}>
                    Новая тренировка
                </Button>
                {isTrainingInProgress() ? <Button
                    style={styles.mainButton}
                    onClick={() => navigate('/workout/current')}>
                    Текущая тренировка
                </Button> : <></>}
            </Flex>

            <Title level={4}>Programs (not implemented)</Title>
            <div style={styles.templatesSection}>
                {templates.map(template => (
                    <Card
                        key={template}
                        style={styles.templateCard}
                        onClick={() => navigate(`/create-workout/${template}`)}>
                        {template}
                    </Card>
                ))}
            </div>
        </div>
    );
};
