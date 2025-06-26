import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import './admin.css'

const Dashboard = ({ activeTab, children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setToggleSidebar(false);
            } 
        };
    
        handleResize(); // Check initial window size
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <main className="mainAdminWrapper">
             {/* <Sidebar activeTab={activeTab} /> */}
                <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar}/>

                <div className={toggleSidebar? "adminPageWrapper" : "adminPageWrapperClosed"}>
                    <div className="flex flex-col gap-6 sm:m-8 p-2 pb-6 overflow-x-hidden h-[90vh]">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
