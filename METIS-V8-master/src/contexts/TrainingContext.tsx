import React, { createContext, useState, useContext, ReactNode } from 'react';

// Interfaces para os tipos de dados
interface Training {
    id: number;
    title: string;
    assignedTo: number[];
}

interface TrainingProgress {
    trainingId: number;
    progress: number;
}

interface TrainingContextType {
    trainings: Training[];
    employeeProgress: { [key: number]: TrainingProgress[] };
    createTraining: (title: string, assignedTo: number[]) => void;
    updateTrainingProgress: (employeeId: number, trainingId: number, progress: number) => void;
    updateAssignedTo: (trainingId: number, assignedTo: number[]) => void; // NOVA FUNÇÃO
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
    const [trainings, setTrainings] = useState<Training[]>([
        { id: 1, title: 'Treinamento de Liderança', assignedTo: [1] },
        { id: 2, title: 'Curso de Análise Financeira', assignedTo: [1, 2] },
        { id: 3, title: 'Workshop de Comunicação', assignedTo: [3] },
    ]);
    const [employeeProgress, setEmployeeProgress] = useState<{ [key: number]: TrainingProgress[] }>({
        1: [{ trainingId: 1, progress: 75 }, { trainingId: 2, progress: 50 }],
        2: [{ trainingId: 2, progress: 100 }],
        3: [{ trainingId: 3, progress: 20 }],
    });

    const createTraining = (title: string, assignedTo: number[]) => {
        const newTraining: Training = {
            id: Date.now(),
            title,
            assignedTo,
        };
        setTrainings((prevTrainings) => [...prevTrainings, newTraining]);
    };

    const updateTrainingProgress = (employeeId: number, trainingId: number, progress: number) => {
        setEmployeeProgress(prevProgress => {
            const employeeTrainings = prevProgress[employeeId] || [];
            // CORREÇÃO: "employeeTrainments" foi alterado para "employeeTrainings"
            const existingProgressIndex = employeeTrainings.findIndex(p => p.trainingId === trainingId);

            let updatedEmployeeTrainings;
            if (existingProgressIndex > -1) {
                updatedEmployeeTrainings = employeeTrainings.map((p, index) => 
                    index === existingProgressIndex ? { ...p, progress } : p
                );
            } else {
                updatedEmployeeTrainings = [...employeeTrainings, { trainingId, progress }];
            }

            return {
                ...prevProgress,
                [employeeId]: updatedEmployeeTrainings
            };
        });
    };
    
    // NOVA FUNÇÃO
    const updateAssignedTo = (trainingId: number, assignedTo: number[]) => {
        setTrainings(prevTrainings =>
            prevTrainings.map(training =>
                training.id === trainingId ? { ...training, assignedTo } : training
            )
        );
    };

    return (
        <TrainingContext.Provider value={{ trainings, employeeProgress, createTraining, updateTrainingProgress, updateAssignedTo }}>
            {children}
        </TrainingContext.Provider>
    );
};

export const useTrainingContext = () => {
    const context = useContext(TrainingContext);
    if (!context) {
        throw new Error('useTrainingContext must be used within a TrainingProvider');
    }
    return context;
};