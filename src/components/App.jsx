import { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';

export function App() {
    const [feedbacks, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    function onAddFeedback(feedback) {
        setFeedback(prevState => ({
            ...prevState,
            [feedback]: prevState[feedback] + 1,
        }));
    }

    function totalFeedbacks() {
        return feedbacks.good + feedbacks.neutral + feedbacks.bad;
    }
    function countPositiveFeedbackPercentage() {
        return Math.round((feedbacks.good * 100) / totalFeedbacks()) || 0;
    }

    return (
        <>
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={Object.keys(feedbacks)}
                    onLeaveFeedback={onAddFeedback}
                ></FeedbackOptions>
            </Section>
            {totalFeedbacks() ? (
                <Section title="Statistics">
                    <Statistics
                        good={feedbacks.good}
                        neutral={feedbacks.neutral}
                        bad={feedbacks.bad}
                        total={totalFeedbacks()}
                        positivePercentage={countPositiveFeedbackPercentage()}
                    ></Statistics>
                </Section>
            ) : (
                <Notification message="There is no feedback"></Notification>
            )}
        </>
    );
}
