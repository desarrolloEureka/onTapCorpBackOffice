import useAuth from "@/firebase/auth";
import { getDocumentsByIdQuery } from "@/queries/documentsQueries";
import { useCallback, useEffect, useState } from "react";

const CompanyHook = () => {
    const { userData } = useAuth();

    const [data, setData] = useState<any>();

    const getCompanyData = useCallback(async () => {
        if (userData) {
            const companyData = await getDocumentsByIdQuery(
                "companies",
                userData.companyId,
            );
            setData(companyData);
        }
    }, [userData]);

    useEffect(() => {
        if (userData) {
            getCompanyData();
        }
    }, [userData]);

    return { data };
};

export default CompanyHook;
