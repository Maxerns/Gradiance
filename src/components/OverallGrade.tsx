import { useEffect, useState } from 'react';
import { fetchUserData } from '../services/fetchingData';
import { calculateOverallAverageGrade } from '../services/calculation';
import { User } from '../services/types';

const OverallAverageGradeComponent = ({ userId }: { userId: User['id'] }) => {
    const [overallAverageGrade, setOverallAverageGrade] = useState(0);

    useEffect(() => {
        const fetchAndCalculateAverageGrade = async () => {
            try {
                // Fetch user data
                const userData = await fetchUserData(String(userId));

                // Check if userData is defined
                if (userData) {
                    // Calculate overall average grade
                    const averageGrade = calculateOverallAverageGrade(userData);

                    // Set the overall average grade state
                    setOverallAverageGrade(averageGrade);
                }
            } catch (error: unknown) {
                console.error('Error fetching or calculating average grade:', (error as Error).message);
            }
        };

        // Call the function when the component mounts
        void fetchAndCalculateAverageGrade();
    }, [userId]); // Run effect when userId changes

    return (
        <div className='bg-neutral py-2 px-10 rounded-md'>
            <h2>Overall Average Grade</h2>
            {overallAverageGrade !== null ? (
                <p>{`Overall average grade: ${overallAverageGrade.toFixed(2)}`}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OverallAverageGradeComponent;
