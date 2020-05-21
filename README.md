# Foreword
In the daily battlefield of feature development I really did not have the mental capacity nor the opportunity to explore and hone
my skills. Since I was working recently almost exclusively with server side rendered React and Angular, I wanted to pay back some _skill debt_,
namely learning [Redux](https://redux.js.org/) while using Typescript and leveraging the latest hooks API from React.
I was also curious to try out new tools for doing layouts outside of [Bootstrap](https://getbootstrap.com/) so I decided to
give [Ant design](https://ant.design/) a try.

To see how they would grow in a larger application I wanted a more complicated problem than a to-do list, so I have settled at the
classic chat problem, because you need communication among scattered parts of the component tree. So you can't just prop drill around, you
would need to handle events. Namely the _main chat component_ needs all the messages of one particular chat, there is the _sidebar_ which needs
to know about all open chats to show the name of the participants and the last message sent, and finally the _notifications area_ should
output all the unread messages from all not open chats sent by other than the current user.

So the first goal was having a sandbox, but the second purpose of this experiment is to critically analyze the APIs of well-known libraries and
methods from a clean coding point of view.

[x][redux](https://redux.js.org/)
[x][overmind.js](https://overmindjs.org/)
[ ][mobx](https://mobx-react.js.org/)
[ ][satchel](https://github.com/microsoft/satcheljs)

# The sandbox app
It's a meat-and-potato chat app.

- there is a random message generator that sends message every 3 seconds; can't be controlled with the > and X buttons in the top right
- there is an implementation selector to choose your state manager
- there is a sidebar to switch between chats; the goal is to create the need of storing previous messages
- my goal was to keep the UI mostly the same and copy-paste the least amount; the current version might be improved but for now I think it is OK to have some minor duplicates.

## TODOs
1. I would clear up CSS, not to use `calc` for determining the height of the chatbox area (since I have reviewed my CSS basics I have understood how to make sure every container know its own height, therefore it is possible for them to know what is `overflow` which is needed for scrollbars)
1. With CSS cleared up and now the messages area is working as expected it is time to implement `scroll into view` functionality of _new messages_

## Constraints
Currently there's no real API it connects to, but I used a WebSocket mock library to get closer to a real life situation.

# Takeaways at this stage
## Regarding Redux
The "most mature and popular" of possible choices for `React` is definitely `Redux`. Of course it does the job of state management well, however it also locks in a lot of complexity; wrap this function into another function and then action creators, stringly-typed actions. Also it is not straightforward to use with `TypeScript`. In short I did not find the API elegant or intuitive, although the introduction of hooks the complexity shrank substantially. But see some examples and then compare it with `overmind.js`, you will see what I have meant.

### Hooks API vs `class`es with `connect`
So far I say the `hooks API` is way, way more intuitive than using `connect` function. Being `intuitive` is not 'comfort' nor a 'luxury'. It is shorter development cycles which means \$\$\$ and the fact you want to go to work next day as well. More on [why simplicity matters](https://dev.to/latobibor/how-spaghetti-code-finds-it-way-back-to-our-codebase-intro-lme) in my article.

So with the `hooks API`, if you wish to get something from the store? Use `useSelector`. Want to dispatch an event just like you did with a `MessageBus`? Use `useDispatch`. No need for using action binders to bind actions and then remember that which parameter of `connect` was
mapping states and which one was mapping dispatch functions, and then not to forget to invoke the return value _as well_ of `connect`.

## Overmind vs Redux
I am going to show you some comparisons and explain why I feel `overmind.js` is how the API of `redux` should have been built.

### Dealing with classes
In this example I want to grab some values from the _application state_, _dispatch some actions_ and have some _class member variables_ because I have some implementation details. Let's see amount of code and the clarity of Redux way.

```typescript
interface SocketControlsClassProps {
  intervalId: number;
}

interface Dispatchers {
  sendMessage: (message: MessageData) => void;
  changeMessageGenerationTo: (automaticallySendMessages: boolean) => void;
}

function mapDispatchToProps(dispatch: DispatchAction<CombinedActionType>): Dispatchers {
  return {
    sendMessage: (message: MessageData) => {
      /* ... */
    },
    changeMessageGenerationTo: (automaticallySendMessages: boolean) => {
      /* ... */
    },
  };
}

interface StateProps {
  automaticallySendMessages: boolean
}

function mapStateToProps({ automaticallySendMessages }: GlobalState): StateProps {
  return {
    automaticallySendMessages,
  };
}

// you can easily forget the order of parameters there is no logic of the order...
const connector = connect(mapStateToProps, mapDispatchToProps);

// I had to dig through many sources to find this approach... not trivial
type PropsFromRedux = ConnectedProps<typeof connector>;

class SocketControls extends React.Component<PropsFromRedux> implements SocketControlsClassProps {
  intervalId: number = 0;

  render() {
    // the first one is a prop coming the Redux store and the second one is a dispatcher and the third one is a component property
    // the sources of them are indistinguishable from each other
    const { automaticallySendMessages, changeMessageGenerationTo, additionalComponentProp } = this.props;
    /* ... */
  }
}

export const SocketControlsRedux = connector(SocketControls);
```

Working this out in `TypeScript` is not an easy task, and I still haven't found the right way to add `OwnProps` to the mixture. The way I have found it broke with the versions I have here. You might not work with `TypeScript` and this is not a problem to you, but there are other architectural problems here:
- just to grab some states I needed to define outside the class a lot of logic
- just to be able to use actions I also needed to define outside the class a lot of logic
- then all of them are squished into `this.props` where they are indistinguishable from each other; is this `prop` an `ownProp`? Or a `dispatcher`? Or a `state` prop?
- that means you have to go back and forth the source code and keep a lot of mental mapping in your head

Let's see the solution by `overmind.js`:

```typescript
interface SocketControlsClassProps {
  intervalId: number;
}

type PropsFromOvermind = {} & Connect;

class SocketControls extends React.Component<PropsFromOvermind> implements SocketControlsClassProps {
  intervalId: number = 0;

  render() {
    const { automaticallySendMessages } = this.props.overmind.state;
    const { changeMessageGenerationTo } = this.props.overmind.actions;
    /* ... */
  }
}

export const SocketControlsOvermind = connect(SocketControls);
```

I did not skip any important detail here. Yup. That's it! Super simple, types work out of the box (for a little setup fee; check `overmind/config` file) and even if you are unfamiliar with `overmind` you quickly understand where is `automaticallySendMessages` coming from. Super clean.

### Working with hooks and other observations
The improvement is not that huge if you are using `hooks`. As I have stated above, the way you handle `state` and `dispatch` in hooks is a lot closer how we humans think and work. But let's see some details:

**Redux version:**
```typescript
export function SideMenuRedux() {
  const dispatch = useDispatch<DispatchAction<SelectChatAction>>();

  function dispatchSelectedChat({ key }: DispatchSelectedChatProps) {
    dispatch({ type: Actions.SelectChat, chatId: key });
  }

  const chats = useSelector<GlobalState, MenuItemProps[]>(({chats} => { /* ... simplifications */}));
  const activeChatId = useSelector<GlobalState, string>(({activeChatId}) => activeChatId || '');

  /* ... */
}
```
Note the following:
1. I need to use an `enum` or a `string` to make a connection between `dispatch` and my action
1. If I want type safety I need to use a ton of type parameters; which is basically me teaching `react-redux` again what it forgot.
1. Note that just for grabbing a piece of state, I need to wrap everything in functions again and pass a function parameter.

**Overmind version:**
```typescript
export function SideMenuOvermind() {
  const { selectChat } = useOvermindActions();
  const { chats, activeChatId } = useOvermindState();

  function dispatchSelectedChat({ key }: DispatchSelectedChatProps) {
    selectChat(key);
  }

  /* ... */
}
```
Now note these:
1. I don't need no anonymous function nor type params here! Super clean, works as expected.
1. `selectChat` is a proper function and we know all its parameters out of the box

### Actions
If you wish to dig deeper in `overmind` let me tell you that we just scratched the surface! They also have [derived states](https://overmindjs.org/introduction#deriving-state) (which is a hell doing in redux; too many opinions over them, hacky solutions), they have simple solutions for scaling your app and also they have dev tool and everything. I don't want to look back at Redux.

### Surprises!
If you check an `overmind` _action_ you will note: "This does not look immutable at all!".
```typescript
export const changeProperty: Action<boolean> = ({ state }, value: string) => {
  state.property = value;
  // note the lack of {...state} destructuring!
};
```

However it is guarding you from your own mistakes, I wanted to sort chats somewhere outside of an action:
`state.chats.sort()...`

No complaint from `redux` but a huge error from `overmind` warning me that I am mutating state. 
I realized I forgot that `.sort()` actually mutates the array! So clear winner is `overmind` here.

## Regarding layout building with `antd`, `CSS modules` and `bootstrap`
After trying out a lot of different approaches I have now settled my choice at algorithmic designs, check this example: https://every-layout.dev/
The reasons behind this are the following:

### CSS is an exception based language
If you define your design primitives (containers, typography, etc.) well and you create a design system with them, you are able to leverage the algorithms in browsers to work out layout for you in all the crazy variations of resolutions we now have to deal with. In this architecture you are basically assisting your design system where it cannot solve your problem automatically by providing a very short amount of code to do so.
On the other side `bootstrap` is declarative, so you will be mostly adding utility classes to everthing. To learn more about why the fans of algorithmic design think it is not a good approach check [Too many utility classes](https://every-layout.dev/rudiments/global-and-local-styling/) paragraph.

### `antd` is a monster of everything; really hard to process documentation
I have felt really intimidated dealing with the massive, massive documentation of `antd`. Most of us think that great documentation can only be a blessing, however in this case I have struggled to get started, to understand the design choices they made and how is the best to follow them. Therefore I decided to use smaller `SCSS` libs and `React` components which I think I will be to understand and possibly expand better than `antd`.

# I invite you to contribute
As I wrote, my long term aim is to have an app that allows you to side-by-side evaluate the feel and performance of different state management
tools; the UI stays the same, the only difference how the components connect to the data they need.

So if you have an idea, a fix or a contribution please raise an issue :). Thanks!
