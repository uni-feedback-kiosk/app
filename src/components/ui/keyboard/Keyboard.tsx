import { Grid, GridItem, useBoolean } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdBackspace,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardReturn,
  MdLanguage,
} from 'react-icons/md';
import { TbArrowBigUp, TbArrowBigUpFilled, TbArrowBigUpLineFilled } from 'react-icons/tb';
import Key from './Key';
import NumbersGrid from './NumbersGrid';

type Language = 'ru' | 'en';
type UppercaseStatus = 'off' | 'on' | 'once';

const layouts: Record<Language | 'symbols', string> = {
  en: "@1234567890!qwertyuiop-/?asdfghjkl:'zxcvbnm.,()",
  ru: 'ё1234567890!йцукенгшщзхъ?фывапролджэячсмитьбю.,',
  symbols: '@`#№&_—!^$₽%-|/\\?()<>+:;,[]{}*\'"=',
};

const Keyboard = ({ onDone }: { onDone: () => void }) => {
  const { t, i18n } = useTranslation();
  const [isShowingSymbols, { toggle: toggleSymbols }] = useBoolean();
  const [uppercase, setUppercase] = useState<UppercaseStatus>('off');
  const [language, setLanguage] = useState<Language>(i18n.language as Language);

  const shiftKeyIcon = useMemo(() => {
    switch (uppercase) {
      case 'on':
        return <TbArrowBigUpLineFilled />;
      case 'once':
        return <TbArrowBigUpFilled />;
      default:
        return <TbArrowBigUp />;
    }
  }, [uppercase]);

  const layout = useMemo(() => {
    if (isShowingSymbols) {
      return layouts.symbols;
    }
    if (uppercase !== 'off') {
      return layouts[language].toUpperCase();
    }
    return layouts[language];
  }, [isShowingSymbols, language, uppercase]);

  return (
    <Grid
      gap={2}
      templateColumns="repeat(13, 1fr)"
      templateRows="repeat(5, 1fr)"
      gridAutoFlow="row dense"
    >
      <Key colorScheme="gray" colStart={12} colSpan={2}>
        <MdBackspace />
      </Key>
      <Key colorScheme="gray" rowStart={3} colStart={13}>
        <MdKeyboardReturn />
      </Key>
      {!isShowingSymbols && (
        <Key
          colorScheme="gray"
          rowStart={4}
          colSpan={2}
          onClick={() => setUppercase(uppercase === 'off' ? 'once' : 'off')}
          onDoubleClick={() => setUppercase(uppercase === 'off' ? 'on' : 'off')}
          bgColor={uppercase !== 'off' ? 'gray.200' : undefined}
        >
          {shiftKeyIcon}
        </Key>
      )}
      <Key colorScheme="gray" rowStart={5} colSpan={2} onClick={toggleSymbols}>
        {isShowingSymbols ? t('lettersKeyContent', { lng: language }) : '?123'}
      </Key>
      <Key
        colorScheme="gray"
        rowStart={5}
        colStart={3}
        onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      >
        <MdLanguage />
      </Key>
      <Key rowStart={5} colStart={4} colEnd={10}>
        {' '}
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={10}>
        <MdKeyboardArrowLeft />
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={11}>
        <MdKeyboardArrowRight />
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={12} colSpan={2} onClick={onDone}>
        {t('doneKeyContent', { lng: language })}
      </Key>
      {isShowingSymbols && (
        <GridItem marginX="12.5%" colStart={6} colSpan={4} rowSpan={4}>
          <NumbersGrid />
        </GridItem>
      )}
      {[...layout].map((letter) => (
        <Key key="letter">{letter}</Key>
      ))}
    </Grid>
  );
};

export default Keyboard;