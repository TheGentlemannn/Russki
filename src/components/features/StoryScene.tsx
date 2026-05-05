import type { StoryScenario } from '../../types/story.types';
import { useTranslation } from '../../hooks/useTranslation';
import { useStoryStore } from '../../store/useStoryStore';
import { DialogueBubble } from './DialogueBubble';
import { StoryChoices } from './StoryChoices';
import { StoryInventory } from './StoryInventory';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const StoryScene = ({ scenario }: { scenario: StoryScenario | null }) => {
  const { t, lang } = useTranslation();
  const { currentSession, isLoading, feedback, sendChoice, endSession } = useStoryStore();
  if (!scenario || !currentSession) return <Card><p>{t('chooseScenario')}</p></Card>;
  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_16rem]">
      <div className="rounded-lg border border-soviet-cream bg-soviet-lightcream">
        <header className="flex items-center justify-between border-b border-soviet-cream p-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{scenario.locationEmoji}</span>
            <div><h2 className="font-display text-2xl">{scenario.location}</h2><p className="text-sm text-soviet-charcoal/70">{scenario.title[lang]}</p></div>
          </div>
          <Button variant="ghost" onClick={endSession}>{t('close')}</Button>
        </header>
        <div className="max-h-[32rem] space-y-4 overflow-y-auto p-4">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-soviet-red font-display text-3xl text-white">НП</div>
          {currentSession.messages.map((message, index) => <DialogueBubble key={`${message.content}-${index}`} message={message} />)}
          {isLoading ? <p className="rounded-md bg-white p-4 font-semibold">{t('loading')}...</p> : null}
          {currentSession.isComplete ? <p className="rounded-md bg-green-50 p-4 font-bold text-green-800">{t('scenarioComplete')}: {currentSession.score}</p> : null}
        </div>
        {!currentSession.isComplete ? <div className="border-t border-soviet-cream p-4"><StoryChoices choices={currentSession.currentChoices} disabled={isLoading} feedback={feedback} onChoose={(choice) => void sendChoice(scenario, choice, lang)} /></div> : null}
      </div>
      <StoryInventory messages={currentSession.messages} />
    </section>
  );
};
