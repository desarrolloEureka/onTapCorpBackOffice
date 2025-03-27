import { GetBackgroundImage, GetTemplate } from '@/firebase/user';
import { useLayoutEffect, useState, useEffect } from 'react';

const TemplateSelectorHook = (user: any, companyData: any) => {
  const [template, setTemplate] = useState<any>();
  const [background, setBackground] = useState<any>();

  const [templateId, setTemplateId] = useState<string | null>(null);
  const [backgroundId, setBackgroundId] = useState<string | undefined | null>(null);


  useLayoutEffect(() => {
    //const temId = user?.templateData[0];
    const dataCompany = Array.isArray(companyData?.templateData) ? companyData.templateData[0] : undefined;

    /*   if (temId) {
        setTemplateId(temId.id);
      } */

    if (dataCompany) {
      setTemplateId(dataCompany.id);
      setBackgroundId(dataCompany.background_id);
    }
  }, [companyData, user]);

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (templateId && backgroundId) {
        const data = await GetTemplate({ id: templateId, setId: setTemplateId });
        const databackground = await GetBackgroundImage({ id: backgroundId, setId: setBackgroundId });
        setTemplate(data || null);
        setBackground(databackground || null);
      }
    };
    fetchTemplateData();
  }, [backgroundId, templateId, companyData]);

  return { currentTemplate: template, currentBackground: background };
};

export default TemplateSelectorHook;
