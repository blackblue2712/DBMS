import React from 'react';
import SidebarWidgetItem from './SidebarWidgetItem';

const SidebarWidget = props => {
    return (
        <>
            <SidebarWidgetItem classIcon=""
                widgetContent={[<p key="1">The community is here to help you with specific coding algorithm, or language problems.</p>, <p key="2">Avoid asking opinion-based questions.</p>]}
            />
        </>
    )
}

export default SidebarWidget;