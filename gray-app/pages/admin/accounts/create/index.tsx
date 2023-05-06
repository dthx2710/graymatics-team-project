import React from 'react'
import AdminSidebarLayout from '@/layouts/AdminSidebarLayout';
import AccountForm from '@/Accounts/AccountForm';

const CreateAccount = () => {
  return (
    <AccountForm pageType="create"/>
  )
}

CreateAccount.getLayout = (
    page:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  ) => <AdminSidebarLayout>{page}</AdminSidebarLayout>;

export default CreateAccount