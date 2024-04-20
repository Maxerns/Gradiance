import { UserData } from "./types";

export function calculateOverallAverageGrade(userData: UserData) : number {
    let totalGrade = 0;
    let totalWeight = 0;
    for (const year of userData.year) {
        for (const module of userData.modules) {
            if (module.yearId === year.id) {
                for (const assignment of userData.assignments) {
                    if (assignment.moduleId === module.id) {
                        totalGrade += assignment.grade * assignment.weight;
                        totalWeight += assignment.weight;
                    }
                }
            }
        }
    }
    return totalGrade / totalWeight;
}

export function calculateAverageGradeForYear(userData: UserData, yearId: string) : number {
    let totalGrade = 0;
    let totalWeight = 0;
    for (const module of userData.modules) {
        if (module.yearId === yearId) {
            for (const assignment of userData.assignments) {
                if (assignment.moduleId === module.id) {
                    totalGrade += assignment.grade * assignment.weight;
                    totalWeight += assignment.weight;
                }
            }
        }
    }
    return totalGrade / totalWeight;
}

export function calculateAverageGradeForModule(userData: UserData, moduleId: string) : number {
    let totalGrade = 0;
    let totalWeight = 0;
    for (const assignment of userData.assignments) {
        if (assignment.moduleId === moduleId) {
            totalGrade += assignment.grade * assignment.weight;
            totalWeight += assignment.weight;
        }
    }
    return totalGrade / totalWeight;
}