import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseConfig';

interface Grades {
    id: number;
    grade: number;
    assignment: {
        id: number;
        name: string; 
    };
    module: {
        id: number;
        name: string;
        level_id: number;
    };
    level: {
        id: number;
        name: string;   
    };
}

export default function Grades() {

    const [grades, setGrades] = useState<Grades[]>([]);

    useEffect(() => {
        async function getGrades() {
        const { data: grades } = await supabase
                .from('grades')
                .select(`
                        *,  
                        assignments ( id, name )
 
                `);

        setGrades(grades as Grades[]);
        }
        void getGrades();

    }, []);

    return (
        <div className="grades-list">
            {grades && grades.map(grade => (
                <div key={grade.id}>
                    <h4>{grade.module.name}</h4>
                    <p>
                        {grade.assignment.name} - {grade.grade}
                    </p>
                </div>
            ))}
        </div>
    );

}