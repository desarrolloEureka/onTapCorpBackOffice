import { GetTemplate } from '@/firebase/user';
import { useLayoutEffect, useState, useEffect } from 'react';

const TemplateSelectorHook = (user: any) => {
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [template, setTemplate] = useState<any>();

  useLayoutEffect(() => {
    const temId = user?.templateData[0];
    if (temId) {
      setTemplateId(temId.id);
    }
  }, [user]);

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (templateId) {
        const data = await GetTemplate({ id: templateId, setId: setTemplateId });
        setTemplate(data || null);
      }
    };
    fetchTemplateData();
  }, [templateId]);

  return { currentTemplate: template };
};

export default TemplateSelectorHook;
