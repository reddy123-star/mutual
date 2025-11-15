
import React from 'react';
import { User, UserRole } from '../types';
// FIX: Imported `IconBookOpen` which was being used but not imported.
import { IconUsers, IconBriefcase, IconBarChart, IconLayoutDashboard, IconBookOpen } from '../constants';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  users: User[];
}

const roleConfig = {
    [UserRole.Admin]: {
        icon: IconUsers,
        description: 'Oversee platform management, user activities, and content updates.',
        color: 'bg-red-500',
    },
    [UserRole.Investor]: {
        icon: IconBriefcase,
        description: 'Explore mutual funds, compare options, and manage investments.',
        color: 'bg-primary-500',
    },
    [UserRole.FinancialAdvisor]: {
        icon: IconBookOpen,
        description: 'Provide advice, create educational content, and assist users.',
        color: 'bg-green-500',
    },
    [UserRole.DataAnalyst]: {
        icon: IconBarChart,
        description: 'Analyze investment trends, update fund data, and generate reports.',
        color: 'bg-yellow-500',
    },
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, users }) => {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <IconLayoutDashboard className="w-10 h-10 text-primary-500"/>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">Mutual Fund Insight</h1>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300">Select a role to continue</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
                {users.map(user => {
                    const config = roleConfig[user.role];
                    const Icon = config.icon;
                    return (
                        <div
                            key={user.id}
                            onClick={() => onLogin(user)}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <div className={`h-24 flex items-center justify-center ${config.color}`}>
                                <Icon className="w-16 h-16 text-white" />
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">{user.role}</h2>
                                <p className="text-slate-600 dark:text-slate-400">{config.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LoginScreen;