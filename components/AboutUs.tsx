import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          About Mutual Fund Insight
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Your comprehensive guide to navigating the world of mutual funds.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 border-b-2 border-primary-200 dark:border-primary-800 pb-2">
          Our Mission
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Our mission is to demystify the world of mutual funds and empower investors, advisors, and analysts with the knowledge and tools they need to make informed financial decisions. We believe that with the right information, anyone can achieve their financial goals.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 border-b-2 border-primary-200 dark:border-primary-800 pb-2">
          What We Provide
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Detailed Fund Information:</strong> Access comprehensive data on a wide range of mutual funds, including performance history, top holdings, risk levels, and key statistics.
          </li>
          <li>
            <strong>Educational Resources:</strong> Learn the fundamentals of investing through our curated articles and guides, created by financial experts.
          </li>
          <li>
            <strong>Role-Based Dashboards:</strong> A tailored experience for every user. Whether you're an investor tracking your portfolio, a financial advisor managing content, a data analyst studying trends, or an admin overseeing the platform, you'll find the tools you need.
          </li>
          <li>
            <strong>AI-Powered Assistance:</strong> Get instant answers to your questions with our AI Financial Educator, designed to explain complex topics in simple terms.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 border-b-2 border-primary-200 dark:border-primary-800 pb-2">
          Our Team
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Mutual Fund Insight is powered by a dedicated team of professionals. Our Financial Advisors create insightful educational content, our Data Analysts ensure all performance data is accurate and up-to-date, and our administrative team works tirelessly to keep the platform running smoothly for all users.
        </p>
      </section>

      <footer className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-slate-600 dark:text-slate-400">
          Thank you for choosing Mutual Fund Insight. Start exploring today!
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
