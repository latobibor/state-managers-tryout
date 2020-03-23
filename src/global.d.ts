// If you wish to import values from CSS modules (like classnames) and have code completion
// this declaration is your solution (see also: https://aleksandrhovhannisyan.github.io/blog/dev/how-to-set-up-react-typescript-ant-design-less-css-modules-and-eslint/)
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
