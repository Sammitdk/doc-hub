import femaleDoc from ".././assets/images/femaledoctor.gif";
import "../registerpatient.css";

const Main = () => {
  // fetch(
  //   "https://newsapi.org/v2/top-headlines?country=in&apiKey=fbcadf0918bf49f98fcd92f1ef17bbb3"
  // ).then((response) => {
  //   response.json().then((obj) => {
  //     console.log(obj.articles[0]);
  //   });
  // });
  return (
    <div>
      <img src={femaleDoc} alt="femaleDoc" />
    </div>
  );
};

export default Main;
