import React  from "react";
// import axios from "axios";

function Home() {

  // const getData = async () => {
  //   try {
  //     const res = await axios.post( "http://127.0.0.1:5000/api/user/get-user-ingo-by-id", {},   {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     ); 
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
