import { MessageData } from './messages-data';
import { chatId1, chatId2, person1, person2 } from '../redux/mock-messages';

export function createMessage(isPerson1: boolean): MessageData {
  const body = resolveTemplate();

  return {
    chatId: isPerson1 ? chatId1 : chatId2,
    from: isPerson1 ? person1 : person2,
    time: new Date(),
    isRead: false,
    body,
  };
}

function resolveTemplate(): string {
  const index = Math.floor(Math.random() * templates.length);

  const { template, substitution } = templates[index];

  let resultTemplate = template;

  for (let i = 0; i < substitution; i++) {
    const wordIndex = Math.floor(Math.random() * words.length);
    resultTemplate = resultTemplate.replace(`{${i}}`, words[wordIndex]);
  }

  return resultTemplate;
}

type TemplateMessage = {
  template: string;
  substitution: number;
};

const templates: TemplateMessage[] = [
  {
    template: "Lol I can't be {0} because {1} is just {2}",
    substitution: 3,
  },
  {
    template: 'Truly, {0} does not mean that {1} is {2}',
    substitution: 3,
  },

  {
    template: 'Who knows? I think that {0} is a big {1}',
    substitution: 2,
  },

  {
    template: 'Well, {0} and whatnot.',
    substitution: 1,
  },

  {
    template: 'I am kinda getting {0} to tell the {1}',
    substitution: 2,
  },

  {
    template: 'Having eaten 1 {0}, I concluded that {1} should not be {2}',
    substitution: 3,
  },
];

const words: string[] = [
  'apple',
  'banana',
  'goat cheese',
  'stinky',
  'truth',
  'magnificient',
  'side',
  'duck',
  'liver',
  'pancake',
  'marmalade',
  'ice cream',
  'roi',
  'return on investment',
  'words',
  'swords',
];
