import React, { Suspense } from 'react';
import type { SidebarTheme } from '../types/sidebar-themes';
import DynamoSidebar from '../sidebars/Dynamo';
import ModelosaurusSidebar from '../sidebars/ModelosaurusRefactored';
import CorporateSidebar from '../sidebars/CorporateRefactored';
import SakuraSidebar from '../sidebars/SakuraSimple';
import ERPSidebar from '../sidebars/ERPRefactored';

interface SidebarLivePreviewProps {
  theme: SidebarTheme;
}

const SidebarLivePreview = ({ theme }: SidebarLivePreviewProps) => {
  const renderSidebar = () => {
    const config = theme.config;
    
    switch (theme.id) {
      case 'modelosaurus':
        return <ModelosaurusSidebar config={config} previewMode={true} />;
      case 'dynamo':
        return <DynamoSidebar config={config} previewMode={true} />;
      case 'corporate':
        return <CorporateSidebar config={config} previewMode={true} />;
      case 'sakura':
        return <SakuraSidebar config={config} previewMode={true} />;
      case 'erp':
        return <ERPSidebar config={config} previewMode={true} />;
      default:
        return <DynamoSidebar config={config} />;
    }
  };

  return (
    <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 h-[28rem]">
      <Suspense fallback={
        <div className="flex items-center justify-center h-[28rem]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }>
        {renderSidebar()}
      </Suspense>
    </div>
  );
};

export default SidebarLivePreview;