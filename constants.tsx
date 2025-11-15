
import { UserRole, User, MutualFund, Article, MutualFundCategory, RiskLevel } from './types';
import type { FC, SVGProps } from 'react';

export const IconLayoutDashboard: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);
export const IconSearch: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
export const IconBriefcase: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
export const IconBookOpen: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
export const IconUsers: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const IconFileText: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);
export const IconBarChart: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
);

export const USERS: User[] = [
  { id: 1, name: 'Admin User', role: UserRole.Admin, email: 'admin@mfi.com' },
  { id: 2, name: 'Investor User', role: UserRole.Investor, email: 'investor@mfi.com' },
  { id: 3, name: 'Advisor User', role: UserRole.FinancialAdvisor, email: 'advisor@mfi.com' },
  { id: 4, name: 'Analyst User', role: UserRole.DataAnalyst, email: 'analyst@mfi.com' },
];

const generateHistoricalData = (base: number, years: number, volatility: number) => {
    const data: { date: string; value: number }[] = [];
    let currentValue = base;
    for (let i = years * 12; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const fluctuation = (Math.random() - 0.5) * volatility;
        currentValue *= (1 + fluctuation);
        data.push({ date: date.toISOString().split('T')[0], value: parseFloat(currentValue.toFixed(2)) });
    }
    return data;
};

export const MUTUAL_FUNDS: MutualFund[] = [
    {
        id: 'MF001', name: 'BlueChip Growth Fund', symbol: 'BCGFX', category: MutualFundCategory.Equity, risk: RiskLevel.High,
        description: 'A growth fund focused on large-cap, well-established companies with a history of strong performance.',
        aum: 1500, nav: 250.75, returns: { '1Y': 22.5, '3Y': 18.2, '5Y': 15.1 },
        topHoldings: [{ name: 'Apple Inc.', percentage: 8.5 }, { name: 'Microsoft Corp.', percentage: 7.2 }, { name: 'Amazon.com Inc.', percentage: 5.8 }],
        historicalData: generateHistoricalData(100, 5, 0.05)
    },
    {
        id: 'MF002', name: 'Stable Income Bond Fund', symbol: 'SIBFX', category: MutualFundCategory.Debt, risk: RiskLevel.Low,
        description: 'Focuses on providing regular income through investment in high-quality corporate and government bonds.',
        aum: 800, nav: 110.20, returns: { '1Y': 5.5, '3Y': 4.8, '5Y': 4.2 },
        topHoldings: [{ name: 'US Treasury Note 2.5%', percentage: 12.0 }, { name: 'Verizon Communications Bond', percentage: 6.1 }, { name: 'JPMorgan Chase Bond', percentage: 5.5 }],
        historicalData: generateHistoricalData(100, 5, 0.01)
    },
    {
        id: 'MF003', name: 'Balanced Advantage Fund', symbol: 'BAFFX', category: MutualFundCategory.Hybrid, risk: RiskLevel.Medium,
        description: 'A balanced fund that invests in a mix of equity and debt to provide both growth and stability.',
        aum: 1200, nav: 180.50, returns: { '1Y': 15.8, '3Y': 12.1, '5Y': 10.5 },
        topHoldings: [{ name: 'Alphabet Inc.', percentage: 4.5 }, { name: 'HDFC Bank Ltd.', percentage: 4.2 }, { name: 'Infosys Ltd.', percentage: 3.8 }],
        historicalData: generateHistoricalData(100, 5, 0.03)
    },
    {
        id: 'MF004', name: 'Tech Innovators Fund', symbol: 'TIFEX', category: MutualFundCategory.Equity, risk: RiskLevel.High,
        description: 'A thematic fund investing in cutting-edge technology companies across the globe.',
        aum: 950, nav: 320.90, returns: { '1Y': 35.2, '3Y': 25.6, '5Y': 22.3 },
        topHoldings: [{ name: 'NVIDIA Corp.', percentage: 9.1 }, { name: 'Tesla Inc.', percentage: 6.8 }, { name: 'Meta Platforms Inc.', percentage: 5.4 }],
        historicalData: generateHistoricalData(100, 5, 0.08)
    },
    {
        id: 'MF005', name: 'Retirement Savings Plan', symbol: 'RSPFX', category: MutualFundCategory.SolutionOriented, risk: RiskLevel.Medium,
        description: 'A fund designed for long-term retirement planning with a lock-in period and tax benefits.',
        aum: 500, nav: 155.45, returns: { '1Y': 18.5, '3Y': 14.3, '5Y': 12.1 },
        topHoldings: [{ name: 'Reliance Industries', percentage: 7.0 }, { name: 'Tata Consultancy Services', percentage: 6.5 }, { name: 'HDFC Bank Ltd.', percentage: 5.9 }],
        historicalData: generateHistoricalData(100, 5, 0.04)
    }
];

export const ARTICLES: Article[] = [
    {
        id: 'ART01', title: 'Understanding Mutual Funds: A Beginner\'s Guide', author: 'Advisor User', authorRole: UserRole.FinancialAdvisor, date: '2023-10-15',
        summary: 'Learn the basics of mutual funds, how they work, and why they are a popular investment choice.',
        content: 'Mutual funds are a type of financial vehicle made up of a pool of money collected from many investors to invest in securities like stocks, bonds, money market instruments, and other assets.'
    },
    {
        id: 'ART02', title: 'Equity vs. Debt Funds: Which is Right for You?', author: 'Advisor User', authorRole: UserRole.FinancialAdvisor, date: '2023-10-22',
        summary: 'A deep dive into the two major categories of mutual funds and how to choose based on your risk appetite.',
        content: 'The choice between equity and debt funds hinges on your financial goals, investment horizon, and risk tolerance. Equity funds offer higher growth potential but come with higher risk, while debt funds offer lower but more stable returns.'
    }
];

export const NAV_ITEMS = {
  [UserRole.Investor]: [
    { name: 'Dashboard', page: 'dashboard', icon: IconLayoutDashboard },
    { name: 'Explore Funds', page: 'explore', icon: IconSearch },
    { name: 'My Portfolio', page: 'portfolio', icon: IconBriefcase },
    { name: 'Education', page: 'education', icon: IconBookOpen },
  ],
  [UserRole.FinancialAdvisor]: [
    { name: 'Dashboard', page: 'dashboard', icon: IconLayoutDashboard },
    { name: 'Explore Funds', page: 'explore', icon: IconSearch },
    { name: 'Content Management', page: 'content', icon: IconFileText },
  ],
  [UserRole.DataAnalyst]: [
    { name: 'Dashboard', page: 'dashboard', icon: IconLayoutDashboard },
    { name: 'Data & Trends', page: 'analysis', icon: IconBarChart },
    { name: 'Fund Management', page: 'funds', icon: IconBriefcase },
  ],
  [UserRole.Admin]: [
    { name: 'Dashboard', page: 'dashboard', icon: IconLayoutDashboard },
    { name: 'User Management', page: 'users', icon: IconUsers },
    { name: 'Content Overview', page: 'content', icon: IconFileText },
  ],
};
