import { Button, VStack } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import FormInput from './components/FormInput';

const NewRequest = () => {
  const { t } = useTranslation();

  return (
    <VStack spacing="8">
      <Header title={t('newRequestTitle')} />
      <VStack align="stretch" width="100%" spacing="8">
        <FormInput i18nPrefix="telegram" leftElement="@" />
        <FormInput i18nPrefix="subject" />
        <FormInput i18nPrefix="request" isMultiline />
        <Button leftIcon={<MdSend />} alignSelf="start">
          Send
        </Button>
      </VStack>
    </VStack>
  );
};

export default NewRequest;