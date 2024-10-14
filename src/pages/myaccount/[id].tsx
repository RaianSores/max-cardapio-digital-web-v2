import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MyAccount from '@/components/MyAccount/MyAccount';

const MyAccountId: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            console.log('Mesa selecionada:', id);
        }
    }, [id]);
    return (
        <MyAccount />
    );
};

export default MyAccountId;