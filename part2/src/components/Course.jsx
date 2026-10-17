const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    ))}
  </div>
);

const Part = (props) => (
  <p key={props.part.id}>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => {
  var totalExercise = props.total.reduce(function (acc, parts) {
    return acc + parts.exercises;
  }, 0);
  console.log(totalExercise);

  return <p>total of {totalExercise}</p>;
};

function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </>
  );
}

export default Course;
/** */
