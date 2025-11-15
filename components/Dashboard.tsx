import React, { useState, useMemo } from 'react';
import { User, MutualFund, RiskLevel, MutualFundCategory } from '../types';
import { NAV_ITEMS, MUTUAL_FUNDS, USERS, ARTICLES } from '../constants';
import PerformanceChart from './PerformanceChart';
import AboutUs from './AboutUs';

interface DashboardProps {
  currentUser: User;
  onLogout: () => void;
}

const Header: React.FC<{ currentUser: User; onLogout: () => void }> = ({ currentUser, onLogout }) => (
    <header className="bg-white dark:bg-slate-800 shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Welcome, {currentUser.name}</h1>
        <button
            onClick={onLogout}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
        >
            Switch Role
        </button>
    </header>
);

const FundCard: React.FC<{ fund: MutualFund; onSelect: () => void }> = ({ fund, onSelect }) => {
    const returnColor = fund.returns['1Y'] >= 0 ? 'text-success-500' : 'text-danger-500';
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow cursor-pointer" onClick={onSelect}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{fund.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        fund.risk === RiskLevel.Low ? 'bg-success-100 text-success-800' :
                        fund.risk === RiskLevel.Medium ? 'bg-yellow-100 text-yellow-800' :
                        'bg-danger-100 text-danger-800'
                    }`}>{fund.risk}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{fund.category}</p>
            </div>
            <div className="mt-4 flex justify-between items-baseline">
                <span className="text-sm text-slate-600 dark:text-slate-300">1Y Return</span>
                <span className={`text-xl font-bold ${returnColor}`}>{fund.returns['1Y'] > 0 ? '+' : ''}{fund.returns['1Y']}%</span>
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
    const navItems = NAV_ITEMS[currentUser.role];
    const [activePage, setActivePage] = useState(navItems[0].page);
    const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ risk: RiskLevel[], category: MutualFundCategory[] }>({ risk: [], category: [] });

    const handleSelectFund = (fund: MutualFund) => {
        setSelectedFund(fund);
        setActivePage('fund-detail');
    };

    const filteredFunds = useMemo(() => {
        return MUTUAL_FUNDS.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || fund.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRisk = filters.risk.length === 0 || filters.risk.includes(fund.risk);
            const matchesCategory = filters.category.length === 0 || filters.category.includes(fund.category);
            return matchesSearch && matchesRisk && matchesCategory;
        });
    }, [searchTerm, filters]);
    
    const handleFilterChange = <K extends keyof typeof filters,>(filterType: K, value: typeof filters[K][0]) => {
        setFilters(prev => {
            const currentValues = prev[filterType];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [filterType]: newValues };
        });
    };

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Dashboard for {currentUser.role}</h2>;
            case 'explore':
                return (
                    <div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm mb-6">
                             <input type="text" placeholder="Search funds..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <div>
                                    <h4 className="font-semibold mb-2 dark:text-slate-200">Risk Level</h4>
                                    {Object.values(RiskLevel).map(risk => (
                                        <label key={risk} className="flex items-center gap-2 dark:text-slate-300">
                                            <input type="checkbox" checked={filters.risk.includes(risk)} onChange={() => handleFilterChange('risk', risk)} /> {risk}
                                        </label>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 dark:text-slate-200">Category</h4>
                                    {Object.values(MutualFundCategory).map(cat => (
                                        <label key={cat} className="flex items-center gap-2 dark:text-slate-300">
                                            <input type="checkbox" checked={filters.category.includes(cat)} onChange={() => handleFilterChange('category', cat)} /> {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {filteredFunds.map(fund => <FundCard key={fund.id} fund={fund} onSelect={() => handleSelectFund(fund)} />)}
                        </div>
                    </div>
                );
            case 'fund-detail':
                if (!selectedFund) return <div>Fund not found. <button onClick={() => setActivePage('explore')}>Go back</button></div>;
                return (
                    <div className="space-y-6">
                        <button onClick={() => setActivePage('explore')} className="mb-4 text-primary-500 hover:underline">{'< Back to Explore'}</button>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{selectedFund.name} ({selectedFund.symbol})</h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-2">{selectedFund.description}</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                                <h3 className="font-bold mb-2 dark:text-white">Key Stats</h3>
                                <p className="dark:text-slate-300">AUM: ${selectedFund.aum}M</p>
                                <p className="dark:text-slate-300">NAV: ${selectedFund.nav.toFixed(2)}</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                                <h3 className="font-bold mb-2 dark:text-white">Returns</h3>
                                <p className="dark:text-slate-300">1Y: {selectedFund.returns['1Y']}%</p>
                                <p className="dark:text-slate-300">3Y: {selectedFund.returns['3Y']}%</p>
                                <p className="dark:text-slate-300">5Y: {selectedFund.returns['5Y']}%</p>
                            </div>
                             <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                                <h3 className="font-bold mb-2 dark:text-white">Top Holdings</h3>
                                <ul className="list-disc list-inside dark:text-slate-300">
                                    {selectedFund.topHoldings.map(h => <li key={h.name}>{h.name} ({h.percentage}%)</li>)}
                                </ul>
                            </div>
                        </div>
                        <PerformanceChart data={selectedFund.historicalData} />
                    </div>
                );
            case 'portfolio': return <h2 className="text-2xl font-bold">My Portfolio</h2>;
            case 'education': return (
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">Education Center</h2>
                    <div className="space-y-6">
                        {ARTICLES.map(article => (
                            <div key={article.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                                <h3 className="text-2xl font-semibold text-primary-600 dark:text-primary-400">{article.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">By {article.author} on {article.date}</p>
                                <p className="mt-4 text-slate-700 dark:text-slate-300">{article.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'users': return (
                 <div>
                    <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">User Management</h2>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 dark:bg-slate-700">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Name</th>
                                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Email</th>
                                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {USERS.map(user => (
                                    <tr key={user.id} className="border-b dark:border-slate-700">
                                        <td className="p-4 text-slate-800 dark:text-slate-200">{user.name}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">{user.email}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
            case 'about': return <AboutUs />;
            default: return <div>Page not found</div>;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
            <nav className="w-64 bg-white dark:bg-slate-800 shadow-md flex flex-col">
                <div className="p-4 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-primary-600">MFI</h2>
                </div>
                <ul className="flex-1 p-4 space-y-2">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activePage === item.page;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => setActivePage(item.page)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors ${
                                        isActive
                                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-semibold">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                 <div className="p-4 border-t dark:border-slate-700">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                       <p>Logged in as:</p>
                       <p className="font-bold text-slate-700 dark:text-slate-200">{currentUser.name}</p>
                       <p className="text-xs">{currentUser.role}</p>
                    </div>
                     <button
                        onClick={onLogout}
                        className="w-full mt-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                        Switch Role
                    </button>
                </div>
            </nav>
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;