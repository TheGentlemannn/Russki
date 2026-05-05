import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const OnboardingFlow = () => {
  const { t, lang, setLang } = useTranslation();
  const apiKey = useAppStore((state) => state.apiKey);
  const setApiKey = useAppStore((state) => state.setApiKey);
  const complete = useAppStore((state) => state.completeOnboarding);
  const done = useAppStore((state) => state.isOnboardingComplete);
  const [step, setStep] = useState(1);
  const [key, setKey] = useState(apiKey ?? '');
  if (done) return null;
  return (
    <Modal open title={step === 1 ? 'Добро пожаловать!' : t('onboarding.welcome')} onClose={complete}>
      {step === 1 ? <div className="space-y-4 text-center"><p className="font-display text-4xl text-soviet-red">Добро пожаловать!</p><p>{t('onboarding.welcome')}</p></div> : null}
      {step === 2 ? (
        <div className="space-y-4">
          <p className="font-semibold">{t('onboarding.chooseLanguage')}</p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={lang === 'en' ? 'primary' : 'ghost'}
              onClick={() => {
                setLang('en');
                setStep(3);
              }}
            >
              EN
            </Button>
            <Button
              variant={lang === 'es' ? 'primary' : 'ghost'}
              onClick={() => {
                setLang('es');
                setStep(3);
              }}
            >
              ES
            </Button>
          </div>
        </div>
      ) : null}
      {step === 3 ? (
        <div className="space-y-3">
          <label className="block font-semibold">{t('onboarding.enterKey')}</label>
          <input className="w-full rounded-md border border-soviet-cream px-3 py-2" value={key} onChange={(event) => setKey(event.target.value)} placeholder="sk-..." />
          <p className="text-sm text-soviet-charcoal/70">{t('onboarding.keyInfo')}</p>
        </div>
      ) : null}
      {step === 4 ? <p className="rounded-md bg-soviet-lightcream p-4 text-soviet-charcoal">{t('natashaIntro')}</p> : null}
      {step === 5 ? <p className="rounded-md bg-soviet-lightcream p-4 text-soviet-charcoal">{t('tour')}</p> : null}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => {
            if (step === 3 && key.trim()) setApiKey(key);
            if (step >= 5) complete();
            else setStep((value) => value + 1);
          }}
        >
          {step >= 5 ? t('onboarding.getStarted') : t('onboarding.next')}
        </Button>
      </div>
    </Modal>
  );
};
