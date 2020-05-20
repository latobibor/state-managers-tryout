# Purpose of this repo
In the daily battlefield of feature development I really did not have the mental capacity nor the opportunity to explore and hone 
my skills. Since I was working recently almost exclusively with server side rendered React, I wanted to pay back some skill debt, 
namely learning [Redux](https://redux.js.org/) while using Typescript and leveraging the latest hooks API from React.
I was also curious to try out new tools for doing layouts outside of [Bootstrap](https://getbootstrap.com/) so I decided to 
give [Ant design](https://ant.design/) a try.

To see how they would grow in a larger application I wanted a more complicated problem than a to-do list, so I have settled at the 
classic chat problem, because you need communication among scattered parts of the component tree. So you can't just prop drill around, you
would need to handle events. Namely the main chat component needs all the messages of one particular chat, there is the sidebar which needs
needs to know about all open chats to show the name of the participants and the last message sent, and lastly, the notifications area should
output all the unread messages from all not open chats sent by other than the current user.

So the first goal was having a sandbox, but the second purpose of this experiment is to critically analyze the APIs of well-known libraries and
methods from a clean coding point of view.

## Longer term goals
The next step I want to make is to try out MobX and Satchel. If I'm still having a lot of time maybe an Angular version of this can be cool.
Why? To be able to compare ease of implementation, the amount of boilerplate, unit testing and of course seeing which solutions are 
performant enough (i.e. how many re-renders we are getting with the different approaches).

## Do you wish to contribute?
As I wrote, my long term aim is to have an app that allows you to side-by-side evaluate the feel and performance of different state management
strategies; the UI stays the same, the only difference how the components connect to the data they need.

So if you have an idea, a fix or a contribution please raise an issue :). Thanks!

## Constraints
Currently there's no real API it connects to, but I used a WebSocket mock library to get closer to a real life situation.

# Take aways at this stage

## Regarding Redux
### Hooks API vs classes with `connect`
So far I say the hooks API is way, way more intuitive than using `connect` function. And that's a huge thing when we talk about time wasted on just understanding someone else's solution. Being `intuitive` is not 'comfort' nor a 'luxury'. It is shorter development cycles.

So with the hook API, if you wish to get something from the store? Use `useSelector`. Want to dispatch an event just like you did with a `MessageBus`? Use `useDispatch`. No need for using action binders to bind actions and then remember that which parameter of `connect` was
mapping states and which one was mapping dispatch functions, and then not to forget to invoke the return value _as well_ of `connect`.

### Various things
#### Using a function to return an object
I hate this pattern:

```javascript
function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

From a clean coding point of view, we use functions to _do_ something usually. Every time I see a `()` I _expect_ it to have some kind of an 
effect. Just returning a plain old object is noise. "But what if I will later modify it to do more stuff?". Well then you add meaningful
stuff into later, now it is **YAGNI**! Also you can do this instead:

```javascript
function incrementAsync() {
  const incrementEvent = calculateEveryPropForMyIncrementEvent();

  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(incrementEvent);
    }, 1000);
  };
}
```

// WHY DO I NEED TO PASS dispatch EXTERNALLY?



## Regarding layout building with antd or bootstrap

## Just a bunch of links I have found useful while I was learning it
Using custom hooks to get rid of implementation details and boilerplate: https://levelup.gitconnected.com/refactoring-redux-into-react-hooks-6273647f9378

