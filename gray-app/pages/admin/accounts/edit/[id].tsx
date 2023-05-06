import React from 'react';
import { useRouter } from 'next/router';
import AdminSidebarLayout from '@/layouts/AdminSidebarLayout';
import AccountForm from '@/Accounts/AccountForm';

const EditAccount = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
        <AccountForm pageType="edit" uid={id}/>
    </>
  )
}

EditAccount.getLayout = (
    page:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  ) => <AdminSidebarLayout>{page}</AdminSidebarLayout>;

export default EditAccount