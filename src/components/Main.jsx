import femaleDoc from ".././assets/images/femaledoctor.gif";

const Main = () => {
  const style = {
    position: "fixed",
    height: "300px",
    width: "300px",
    right: 0,
    top: 0,
  };
  return (
    <div>
      <img src={femaleDoc} alt="femaleDoc" style={style} />
    </div>
  );
};

export default Main;
