import "./App.css";
// import MyTest from "./components/learning-examples/TestsComponents";
// import ThirdTest from "./components/learning-examples/ThirdTest";
// import SecondTest from "./components/learning-examples/SecondTest";
import TodoApp from "./components/todo/TodoApp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/* <Counter /> */}
      <TodoApp />
    </div>
  );
}

// function LearningComponents() {
//   return (
//     <div className="LearningComponents">
//       Hello World!
//       <MyTest />
//       <SecondTest />
//       <ThirdTest />
//     </div>
//   );
// }
export default App;
